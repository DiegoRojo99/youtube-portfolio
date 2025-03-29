import React from 'react';
import './SocialMedia.css';

interface SocialMediaCardProps {
  logo: string;
  username: string;
  link: string;
  backgroundColor: string;
  stats: Map<string, number>;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ logo, stats, username, link, backgroundColor }) => {
  return (
    <div className="social-media-card">
      <div className="card-inner">
        <div className="card-front">
          <img src={logo} alt="Social Media Logo" className="social-media-logo" />
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