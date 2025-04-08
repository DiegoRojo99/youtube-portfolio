import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import Image from 'next/image';
import React from 'react';
import './YouTube.css';

const YouTubeThumbnail: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
  return (
    <a className="latest-video-card" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
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
  );
};

export default YouTubeThumbnail;