'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface VideoSnippet {
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

interface VideoContentDetails {
  id: string;
  snippet: VideoSnippet;
}

const LatestYouTubeVideo: React.FC = () => {
  const [video, setVideo] = useState<VideoContentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const response = await fetch('/api/youtube/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch the latest video');
        }
        const data = await response.json();
        setVideo(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!video) {
    return <div>No video available</div>;
  }

  return (
    <div className="bg-black text-white py-8 px-4 shadow-md flex flex-col items-center justify-center">
      <Image
        src={video.snippet.thumbnails.maxres.url}
        alt={video.snippet.title}
        width={video.snippet.thumbnails.maxres.width}
        height={video.snippet.thumbnails.maxres.height}
        className='rounded-lg'
      />
      <h2 className="pt-2 text-lg sm:text-2xl md:text-3xl font-bold mt-4">{video.snippet.title.toLocaleUpperCase()}</h2>
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className='mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out'
      >
        Watch on YouTube
      </a>
    </div>
  );
};

export default LatestYouTubeVideo;