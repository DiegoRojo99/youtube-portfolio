import { YoutubeSearchDataItem } from '@/app/types/YouTube';
import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');

  if (!playlistId) {
    return NextResponse.json({ error: 'Missing playlistId parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${BASE_URL}?part=snippet&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=50`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch playlist from YouTube' }, { status: response.status });
    }

    const data = await response.json();
    const videos: YoutubeSearchDataItem = data.items;
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the playlist' }, { status: 500 });
  }
}