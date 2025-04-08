'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import React, { useEffect, useState } from 'react';
import MonaLisa from '@/app/components/Loaders/MonaLisa';
import YouTubeThumbnail from './YouTubeThumbnail';
import './YouTube.css';
  
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
    <div className='latest-video-section'>
      <YouTubeThumbnail video={video} />
      <h2 className="pt-2 text-lg sm:text-2xl md:text-3xl font-bold mt-4 mb-8 text-center">
        {video.snippet.title.toLocaleUpperCase()}
      </h2>
    </div>
  );
};

export default LatestYouTubeVideo;