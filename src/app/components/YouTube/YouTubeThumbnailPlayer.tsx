import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import React from 'react';
import './YouTube.css';

const YouTubeThumbnailPlayer: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
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