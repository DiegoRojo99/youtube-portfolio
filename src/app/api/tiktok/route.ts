import { TikTokStats } from '@/app/types/TikTok';
import { NextResponse } from 'next/server';

let cachedStats: TikTokStats | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function GET() {
  const now = Date.now();

  // Return cached data if it's still valid
  if (cachedStats && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedStats, { status: 200 });
  }

  // Sample stats to avoid unnecessary API calls
  const sampleStats = {
    followingCount: 136,
    followerCount: 141,
    heartCount: 6724,
    videoCount: 203,
    diggCount: 0,
    heart: 6724,
  };

  if (process.env.NODE_ENV === 'development' || !process.env.TIKTOK_USER_ID || !process.env.TIKTOK_RAPIDAPI_KEY) {
    return NextResponse.json(sampleStats, { status: 200 });
  }

  const url = `https://tiktok-scraper7.p.rapidapi.com/user/info?user_id=${process.env.TIKTOK_USER_ID}`;
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

    // Update cache
    cachedStats = stats;
    lastFetchTime = now;

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while fetching TikTok user info: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}