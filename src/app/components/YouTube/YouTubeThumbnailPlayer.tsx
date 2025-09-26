'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import React from 'react';
import './YouTube.css';
import MonaLisa from '../Loaders/MonaLisa';

const YouTubeThumbnailPlayer: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <MonaLisa />;
  return (
    <div className="video-player">
      <iframe
        className='rounded-lg'
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${video.id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>
    </div>
  );
};

export default YouTubeThumbnailPlayer;