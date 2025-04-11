import { YoutubeVideoContentDetails } from "@/app/types/YouTube";
import Image from "next/image";

interface Props {
  video: YoutubeVideoContentDetails;
}

export default function YoutubeVideoCard({ video }: Props) {
  if (!video?.snippet) return <></>;

  return (
    <div className="w-72 flex-shrink-0 cursor-pointer transition-transform duration-300 group">
      <a
        href={`https://www.youtube.com/watch?v=${video.snippet?.resourceId?.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2"
      >
        <div className="relative">
          <Image
            src={
              video.snippet.thumbnails.maxres
                ? video.snippet.thumbnails.maxres.url
                : video.snippet.thumbnails.high.url
            }
            alt={video.snippet.title}
            width={
              video.snippet.thumbnails.maxres
                ? video.snippet.thumbnails.maxres.width
                : video.snippet.thumbnails.high.width
            }
            height={
              video.snippet.thumbnails.maxres
                ? video.snippet.thumbnails.maxres.height
                : video.snippet.thumbnails.high.height
            }
            className="rounded-lg w-full object-cover"
          />
        </div>
      </a>

      <p className="mt-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {video.snippet.title}
      </p>
    </div>
  );
}