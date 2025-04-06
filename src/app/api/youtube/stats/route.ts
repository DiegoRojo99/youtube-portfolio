import { NextResponse } from 'next/server';

export async function GET() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  const YOUTUBE_API_URL = `${process.env.YOUTUBE_BASE_URL}/channels`;

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ error: 'YouTube API key is missing' }, { status: 500 });
  }

  const channelStatsUrl = `${YOUTUBE_API_URL}?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
  try {
    const statsResponse = await fetch(channelStatsUrl);
    if (!statsResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch channel statistics from YouTube API' }, { status: statsResponse.status });
    }

    const statsData = await statsResponse.json();
    return NextResponse.json(statsData.items[0].statistics, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error: `An error occurred while fetching channel statistics ${error}` }, { status: 500 });
  }
}