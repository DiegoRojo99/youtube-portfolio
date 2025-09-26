
interface YoutubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    high?: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  categoryId?: string;
  resourceId?: {
    kind?: string;
    videoId?: string;
  },
}

interface YoutubeVideoContentDetails {
  id: string;
  snippet: YoutubeVideoSnippet;
}

interface YoutubeStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

type YoutubeSearchDataItem = {
  id: { videoId: string };
  snippet: YoutubeVideoSnippet;
};

type YoutubeVideoDetailsItem = {
  id: string;
  snippet: YoutubeVideoSnippet;
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  };
};

export {
  YoutubeVideoSnippet,
  YoutubeVideoContentDetails,
  YoutubeStats,
  YoutubeSearchDataItem,
  YoutubeVideoDetailsItem,
}