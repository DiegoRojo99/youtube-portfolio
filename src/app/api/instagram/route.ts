import { NextResponse } from "next/server";

const sampleData = {
  url: 'https://instagram.com/santimercadal',
  name: 'Santiago Mercadal',
  image: 'https://6f2859a7-8667-4b05-9978-a8922e29bf1f.selstorage.ru/INST:17841401970622875?time=1743336904',
  description: 'Cuenta de Diseño: @santimercadal.jpg\n' +
    'Co-fundador de @my_jail_brand\n' +
    '🔽Mi Canal de YouTube 🔽',
  screenName: 'santimercadal',
  usersCount: 371,
}

type InstaStats = {
  url: string;
  name: string;
  image: string;
  description: string;
  screenName: string;
  usersCount: number;
};

let cachedInstaStats: InstaStats | null = null;
let lastInstaFetchTime: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function GET() {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (cachedInstaStats && lastInstaFetchTime && now - lastInstaFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedInstaStats, { status: 200 });
  }
  
  if (process.env.NODE_ENV === 'development' || !process.env.INSTA_RAPIDAPI_KEY || !process.env.INSTA_USER_ID) {
    return NextResponse.json(sampleData, { status: 200 });
  }

  const url = `https://instagram-statistics-api.p.rapidapi.com/community?url=https%3A%2F%2Fwww.instagram.com%2F${process.env.INSTA_USER_ID}%2F&country=ES&language=es&currency=EUR`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.INSTA_RAPIDAPI_KEY,
      'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch Instagram statistics: ${response.status}`);
    }
    const result = await response.text();
    const jsonResult = JSON.parse(result);
    const instaStats = jsonResult.data as InstaStats;
    
    // Update cache
    cachedInstaStats = instaStats;
    lastInstaFetchTime = now;

    return NextResponse.json(instaStats, { status: 200 });
  } catch (error) {
    console.error('Error fetching Instagram stats:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram stats' }, { status: 500 });
  }
}