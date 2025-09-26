'use client';
import { YoutubeVideoContentDetails } from '@/app/types/YouTube';
import React, { useEffect, useState } from 'react';
import ErrorWarning from '../Extras/Error';
import YoutubeCarrousel from './YoutubeCarrousel';
import './YouTube.css';

interface YouTubePlayListSectionProps {
  playlistId: string;
  title: string;
  imageUrl: string;
  textColor: string;
}

function publicVideoCheck(video: YoutubeVideoContentDetails): boolean {
  // Check if the video is public by verifying the presence of snippet and title
  if (!video?.snippet) return false;
  if (!video.snippet.thumbnails) return false;
  if (Object.keys(video.snippet.thumbnails).length === 0) return false;
  if (!video.snippet.title) return false;
  if (video.snippet.title === 'Private Video') return false;
  return true;
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
  if (error) return <ErrorWarning title={error ?? "Test error"} />;
  if (videos.length === 0) return <></>;
  
  // Filter out videos without a snippet or title or thumbnails
  const publicVideos = videos.filter(publicVideoCheck);
  if (publicVideos.length === 0) return <></>;

  return (
    <section
      className="playlist-section mb-2"
      style={{ color: textColor, backgroundImage: `url(${imageUrl})`, backgroundSize: 'contain' }}
    >
      <div className="fade-overlay"></div>
      <div className="relative z-10">
        <div className="playlist-text">
          <h1 className="text-4xl font-bold mb-4">
            {title.toLocaleUpperCase()}
          </h1>
        </div>
        <YoutubeCarrousel videos={publicVideos} />
      </div>
    </section>
  );
};

export default YouTubePlayListSection;