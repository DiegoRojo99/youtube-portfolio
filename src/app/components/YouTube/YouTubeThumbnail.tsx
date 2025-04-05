import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import Image from 'next/image';
import React from 'react';

const YouTubeThumbnail: React.FC<{ video: YoutubeVideoContentDetails }> = ({ video }) => {
  return (
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
  );
};

export default YouTubeThumbnail;