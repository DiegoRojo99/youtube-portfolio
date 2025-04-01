
interface YoutubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard: { url: string; width: number; height: number };
    maxres: { url: string; width: number; height: number };
  };
  categoryId?: string;
}

interface YoutubeVideoContentDetails {
  id: string;
  snippet: VideoSnippet;
}

interface YoutubeStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export {
  YoutubeVideoSnippet,
  YoutubeVideoContentDetails,
  YoutubeStats
}