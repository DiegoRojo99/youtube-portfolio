'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import React, { useEffect, useState } from 'react';
import YoutubeVideoCard from './YoutubeVideoCard';

const YouTubePlayListSection: React.FC<{playlistId: string, title: string}> = ({playlistId, title}) => {
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
    <section className="px-4 py-8 mb-2">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {videos.map((video) => (
          <YoutubeVideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default YouTubePlayListSection;