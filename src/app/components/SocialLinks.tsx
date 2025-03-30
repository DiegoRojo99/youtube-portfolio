'use client';
import React from 'react';
import YoutubeCard from './SocialMedia/YoutubeCard';
import TikTokCard from './SocialMedia/TikTokCard';
import InstaCard from './SocialMedia/InstaCard';

const SocialLinks: React.FC = () => {
  return (
    <div className="bg-white text-black flex flex-col items-center justify-center">
      {/* <h1 className="text-3xl font-bold text-center mt-8 mb-4">Redes Sociales</h1> */}
      <div className="flex flex-wrap justify-center mt-4 mb-8">
        <YoutubeCard />
        <TikTokCard />
        <InstaCard />
      </div>
    </div>
  );
};

export default SocialLinks;