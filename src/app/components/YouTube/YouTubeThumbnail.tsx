'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import Image from 'next/image';
import React, { useState } from 'react';
import './YouTube.css';
import YouTubeThumbnailPlayer from './YouTubeThumbnailPlayer';

const YouTubeThumbnail: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
  const [playVideo, setPlayVideo] = useState(false);
  if(playVideo) return <YouTubeThumbnailPlayer video={video} />;

  const thumbnails = video.snippet?.thumbnails;
  if (!thumbnails || Object.keys(thumbnails).length === 0) return <></>;
  const thumbnail =
    thumbnails.maxres ||
    thumbnails.high ||
    thumbnails.medium ||
    thumbnails.default;
  if (!thumbnail) return <></>;

  return (
    <div className="latest-video-card" onClick={() => setPlayVideo(true)}>
      <Image
        src={thumbnail.url}
        alt={video.snippet.title}
        width={thumbnail.width}
        height={thumbnail.height}
        className='rounded-lg'
      />
    </div>
  );
};

export default YouTubeThumbnail;