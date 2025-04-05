import { YoutubeVideoContentDetails } from "@/app/types/YouTube";
import Image from "next/image";

interface Props {
  video: YoutubeVideoContentDetails;
}

export default function YoutubeVideoCard({ video }: Props) {

  return (
    <div className="relative group w-64 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105">
      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
      {
        video.snippet.thumbnails.maxres ? (
          <Image
            src={video.snippet.thumbnails.maxres.url}
            alt={video.snippet.title}
            width={video.snippet.thumbnails.maxres.width}
            height={video.snippet.thumbnails.maxres.height}
            className='rounded-lg w-full object-cover'
          />
        ) : (
          <Image
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
            width={video.snippet.thumbnails.high.width}
            height={video.snippet.thumbnails.high.height}
            className='rounded-lg w-full object-cover'
          />
        )
      }
      </a>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {video.snippet.title}
      </div>
    </div>
  );
}
