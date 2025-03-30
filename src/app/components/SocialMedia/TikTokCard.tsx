import React, { useEffect, useState } from 'react';
import SocialMediaCard from './SocialMediaCard';

interface TikTokStats {
  followingCount: number;
  followerCount: number;
  heartCount: number;
  videoCount: number;
  diggCount: number;
  heart: number;
}

const TikTokCard: React.FC = () => {
  const [stats, setStats] = useState<TikTokStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTikTokStats = async () => {
      try {
        const response = await fetch('/api/tiktok');
        if (!response.ok) {
          throw new Error('Failed to fetch TikTok stats');
        }
        const data: TikTokStats = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching TikTok stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTikTokStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return <div>Failed to load TikTok stats</div>;
  }

  return (
    <SocialMediaCard
      logo="/assets/tiktok-icon.svg"
      link="https://www.tiktok.com/@smercadal"
      username="@santimercadal"
      background='#000000'
      stats={new Map<string, number>([
        ['Seguidores', stats.followerCount],
        ['Likes', stats.heartCount],
        ['Videos', stats.videoCount],
      ])}
    />
  );
};

export default TikTokCard;