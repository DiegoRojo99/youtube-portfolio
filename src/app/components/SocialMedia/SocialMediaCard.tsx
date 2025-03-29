import React from 'react';
import './SocialMedia.css';
import Image from 'next/image';

interface SocialMediaCardProps {
  logo: string;
  username: string;
  link: string;
  backgroundColor: string;
  stats: Map<string, number>;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ logo, stats, backgroundColor }) => {
  return (
    <div className="social-media-card">
      <div className="card-inner">
        <div className="card-front" style={{backgroundColor: backgroundColor}}>
          <Image
            src={logo}
            alt="Social Media Logo"
            className="social-media-logo"
            width={100}
            height={100}
          />
        </div>
        <div className="card-back" style={{backgroundColor: backgroundColor}}>
          {
            Array.from(stats).map(([key, value]) => (
              <p key={key}>
                <span>{key}:</span> {value}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;