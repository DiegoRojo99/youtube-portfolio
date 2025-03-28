'use client';
import React, { useEffect, useState } from 'react';
import SocialMediaCard from './SocialMediaCard';

type YoutubeStats = {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
};

const SocialLinks: React.FC = () => {
  const [youtubeStats, setYoutubeStats] = useState<YoutubeStats | null>(null);

  useEffect(() => {
    const fetchSocialMediaStats = async () => {
      const res = await fetch('/api/youtube');
      const data = await res.json();
      setYoutubeStats(data);
    };

    fetchSocialMediaStats();
  }, []);

  return (
    <div className="bg-white text-black flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Redes Sociales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 justify-around">
        <SocialMediaCard 
          logo="/assets/youtube-icon.png"
          followers={youtubeStats?.subscriberCount ?? 0}
          videos={youtubeStats?.videoCount ?? 0}
          views={youtubeStats?.viewCount ?? 0}
          name="YouTube"
          onFollow={() => window.open('https://www.youtube.com/@santimercadal', '_blank')}
        />
      </div>
    </div>
  );
};

export default SocialLinks;