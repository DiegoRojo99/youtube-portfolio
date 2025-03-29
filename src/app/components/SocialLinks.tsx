'use client';
import React, { useEffect, useState } from 'react';
import YoutubeCard from './SocialMedia/YoutubeCard';

type YoutubeStats = {
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
};

const SocialLinks: React.FC = () => {
  return (
    <div className="bg-white text-black flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Redes Sociales</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <YoutubeCard />
      </div>
    </div>
  );
};

export default SocialLinks;