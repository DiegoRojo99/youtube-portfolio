'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MonaLisa from '@/app/components/Loaders/MonaLisa';
  
const LatestYouTubeVideo: React.FC = () => {
  const [video, setVideo] = useState<YoutubeVideoContentDetails | null>(null);
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  if (loading) {
    return <MonaLisa />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!video) {
    return <div>No video available</div>;
  }

  return (
    <div>
    <a 
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black text-white shadow-md flex flex-col items-center justify-center mt-16 mx-16 
      hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg hover:cursor-pointer hover:shadow-lg">
        {
          video.snippet.thumbnails.maxres ? (
            <Image
              src={video.snippet.thumbnails.maxres.url}
              alt={video.snippet.title}
              width={video.snippet.thumbnails.maxres.width}
              height={video.snippet.thumbnails.maxres.height}
              className='rounded-lg'
            />
          ) : (
            <Image
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              width={video.snippet.thumbnails.high.width}
              height={video.snippet.thumbnails.high.height}
              className='rounded-lg'
            />
          )
        }
      </a>
      <h2 className="pt-2 text-lg sm:text-2xl md:text-3xl font-bold mt-4 mb-8 text-center">{video.snippet.title.toLocaleUpperCase()}</h2>
    </div>
  );
};

export default LatestYouTubeVideo;