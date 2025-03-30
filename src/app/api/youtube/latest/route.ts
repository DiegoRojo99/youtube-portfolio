import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function GET() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return NextResponse.json(
      { error: 'Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in environment variables' },
      { status: 500 }
    );
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&order=date&maxResults=1`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from YouTube API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const latestVideo = data.items?.[0]?.snippet;

    if (!latestVideo) {
      return NextResponse.json(
        { error: 'No videos found for the specified channel' },
        { status: 404 }
      );
    }

    return NextResponse.json(latestVideo);
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching the latest video', details: (error as Error).message },
      { status: 500 }
    );
  }
}