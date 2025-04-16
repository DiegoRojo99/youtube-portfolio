import React, { useRef } from 'react';
import YoutubeVideoCard from './YoutubeVideoCard';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import './YoutubeCarrousel.css';

const YoutubeCarrousel: React.FC<{videos: YoutubeVideoContentDetails[]}> = ({ videos }) => {
  const carrouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carrouselRef.current) {
      carrouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carrouselRef.current) {
      carrouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleDrag = (e: React.MouseEvent) => {
    const carrousel = carrouselRef.current;
    if (!carrousel) return;

    const startX = e.pageX;
    const scrollLeft = carrousel.scrollLeft;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - startX;
      carrousel.scrollLeft = scrollLeft - x;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="youtube-carrousel-container">
      <button className="arrow left-arrow" onClick={scrollLeft}>
        &#8249;
      </button>
      <div
        className="youtube-carrousel"
        ref={carrouselRef}
        onMouseDown={handleDrag}
      >
        {videos.map((video) => (
          <YoutubeVideoCard key={video.id} video={video} />
        ))}
        {videos.map((video) => (
          <YoutubeVideoCard key={`dupe-${video.id}`} video={video} />
        ))}
      </div>
      <button className="arrow right-arrow" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default YoutubeCarrousel;