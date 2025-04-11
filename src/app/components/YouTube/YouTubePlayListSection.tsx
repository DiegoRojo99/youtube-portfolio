'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import React, { useEffect, useState } from 'react';
import YoutubeVideoCard from './YoutubeVideoCard';
import './YouTube.css';

interface YouTubePlayListSectionProps {
  playlistId: string;
  title: string;
  imageUrl: string;
  textColor: string;
}
const YouTubePlayListSection: React.FC<YouTubePlayListSectionProps> = ({playlistId, title, imageUrl, textColor}) => {
  const [videos, setVideos] = useState<YoutubeVideoContentDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const response = await fetch('/api/youtube/playlist?playlistId=' + playlistId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } 
      catch (err) {
        console.error('Error fetching playlist videos:', err);
        setError('Failed to load playlist videos.');
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [playlistId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="playlist-section px-4 py-8 mb-2" style={{ backgroundImage: `url(${imageUrl})`, color: textColor }}>
      <div className='playlist-text'>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {/* <p className="mb-4">Explore our curated playlist of videos.</p> */}
      </div>
      <div className="playlist-scroll">
        {videos.map((video) => (
          <YoutubeVideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default YouTubePlayListSection;