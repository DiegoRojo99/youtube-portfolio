import React, { useEffect, useState } from 'react';
import SocialMediaCard from './SocialMediaCard';

type InstaStats = {
  url: string;
  name: string;
  image: string;
  description: string;
  screenName: string;
  usersCount: number;
};

const InstaCard: React.FC = () => {
  const [stats, setStats] = useState<InstaStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInstagramStats = async () => {
      try {
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching Instagram stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return <div>Failed to load Instagram stats</div>;
  }

  return (
    <SocialMediaCard
      logo="/assets/instagram-icon.png"
      link="https://www.instagram.com/santimercadal"
      username="@santimercadal"
      background='linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)'
      stats={new Map<string, number>([['Seguidores', stats.usersCount]])}
    />
  );
};

export default InstaCard;