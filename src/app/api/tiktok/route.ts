import { NextResponse } from 'next/server';

export async function GET() {

  // Rate limit solution
  const sampleStats = {    
    followingCount: 136,
    followerCount: 141,
    heartCount: 6724,
    videoCount: 203,
    diggCount: 0,
    heart: 6724
  }
  return NextResponse.json(
    sampleStats,
    { status: 200 }
  );

  const url = `https://tiktok-scraper7.p.rapidapi.com/user/info?user_id=${process.env.TIKTOK_USER_ID}`;
  if (!process.env.TIKTOK_USER_ID) {
    return NextResponse.json({ error: 'TikTok user ID is missing' }, { status: 500 });
  }

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.TIKTOK_RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch TikTok user info: ${response.status}`);
    }

    const result = await response.json();
    const stats = result.data.stats;
    console.log("TikTok user stats:", stats);
    return NextResponse.json(
      stats,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while fetching TikTok user info: ${error}` },
      { status: 500 }
    );
  }
}