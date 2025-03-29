import React, { useEffect, useState } from 'react';
import SocialMediaCard from './SocialMediaCard';

interface YoutubeStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

const YoutubeCard: React.FC = () => {
  const [stats, setStats] = useState<YoutubeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchYoutubeStats = async () => {
      try {
        const response = await fetch('/api/youtube');
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube stats');
        }
        const data: YoutubeStats = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching YouTube stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYoutubeStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return <div>Failed to load YouTube stats</div>;
  }

  return (
    <SocialMediaCard
      logo="/assets/youtube-icon.png"
      followers={stats.subscriberCount}
      views={stats.viewCount}
      link="https://www.youtube.com/@santimercadal"
      username="@santimercadal"
      backgroundColor="#FF0000"
    />
  );
};

export default YoutubeCard;