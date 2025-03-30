import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

type searchDataItem = {
  id: { videoId: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
  };
};

type videoDetailsItem = {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  };
};

// Helper function to parse YouTube duration (ISO 8601) to seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = match?.[1] ? parseInt(match[1]) : 0;
  const minutes = match?.[2] ? parseInt(match[2]) : 0;
  const seconds = match?.[3] ? parseInt(match[3]) : 0;
  return hours * 3600 + minutes * 60 + seconds;
}

// Helper function to check if a video is a Short
function isShortVideo(video: videoDetailsItem): boolean {
  // Check duration (Shorts are <= 60 seconds)
  if (video.contentDetails?.duration) {
    const durationSec = parseDuration(video.contentDetails.duration);
    if (durationSec <= 60) return true;
  }

  // Check for #shorts in title or description
  const title = video.snippet?.title?.toLowerCase() || '';
  const description = video.snippet?.description?.toLowerCase() || '';
  return title.includes('#shorts') || description.includes('#shorts');
}

export async function GET() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return NextResponse.json(
      { error: 'Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in environment variables' },
      { status: 500 }
    );
  }

  try {
    // First, search for videos
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from YouTube API' },
        { status: searchResponse.status }
      );
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json(
        { error: 'No videos found for the specified channel' },
        { status: 404 }
      );
    }

    // Get video IDs for all found videos
    const videoIds = searchData.items.map((item: searchDataItem) => item.id.videoId).join(',');

    // Get video details (including duration)
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,contentDetails`;
    const detailsResponse = await fetch(detailsUrl);

    if (!detailsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch video details from YouTube API' },
        { status: detailsResponse.status }
      );
    }

    const detailsData = await detailsResponse.json();

    // Filter out Shorts and get the latest non-Short video
    const regularVideos = detailsData.items.filter((video: videoDetailsItem) => !isShortVideo(video));
    
    if (regularVideos.length === 0) {
      return NextResponse.json(
        { error: 'No regular videos found (only Shorts available)' },
        { status: 404 }
      );
    }

    // Return the latest non-Short video
    return NextResponse.json(regularVideos[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching the latest video', details: (error as Error).message },
      { status: 500 }
    );
  }
}