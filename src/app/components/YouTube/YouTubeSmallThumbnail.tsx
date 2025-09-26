import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import Image from 'next/image';
import React from 'react';

const YouTubeSmallThumbnail: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
  const thumbnails = video.snippet?.thumbnails;
  if (!thumbnails || Object.keys(thumbnails).length === 0) return <></>;

  const thumbnail =
    thumbnails.maxres ||
    thumbnails.high ||
    thumbnails.medium ||
    thumbnails.default;
  if (!thumbnail) return <></>;

  return (
    <a 
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black text-white shadow-md flex flex-col items-center justify-center m-4 rounded-lg
      hover:scale-105 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg">
        
      <Image
        src={thumbnail.url}
        alt={video.snippet.title}
        width={thumbnail.width}
        height={thumbnail.height}
        className='rounded-lg'
      />
    </a>
  );
};

export default YouTubeSmallThumbnail;