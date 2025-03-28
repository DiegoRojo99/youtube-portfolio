import React from 'react';
import Image from 'next/image';

interface SocialMediaCardProps {
  logo: string;
  followers: number;
  videos: number;
  views: number;
  name: string;
  onFollow: () => void;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ logo, followers, videos, views, name, onFollow }) => {
  return (
    <div style={styles.card}>
      <Image 
        src={logo}
        alt={`${name} logo`}
        width={96}
        height={96}
        style={styles.logo}
        priority
      />
      <div style={styles.followers}>
        <strong style={styles.bold}>{followers}</strong> seguidores
      </div>
      <div style={styles.followers}>
        <strong style={styles.bold}>{videos}</strong> videos
      </div>
      <div style={styles.followers}>
        <strong style={styles.bold}>{views}</strong> visualizaciones
      </div>
      <div style={styles.name}>{name}</div>
      <button style={styles.button} onClick={onFollow}>
        Subscribete
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center' as const,
    minWidth: '320px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  logo: {
    width: 'auto',
    height: '96px',
    margin: '0 auto 16px auto',
    boxShadow: '0 11px 14px 0 rgba(255, 25, 0, 0.51)',
    borderRadius: '32px',
  },
  followers: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#333',
  },
  bold: {
    fontWeight: 'bold' as const,
  },
  name: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
};

export default SocialMediaCard;