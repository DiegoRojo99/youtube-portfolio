'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import Image from 'next/image';
import React, { useState } from 'react';
import './YouTube.css';
import YouTubeThumbnailPlayer from './YouTubeThumbnailPlayer';

const YouTubeThumbnail: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if(playVideo) {
    return <YouTubeThumbnailPlayer video={video} />;
  }

  return (
    <div className="latest-video-card"onClick={() => setPlayVideo(true)}>
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
    </div>
  );
};

export default YouTubeThumbnail;