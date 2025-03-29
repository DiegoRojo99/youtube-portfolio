import React from 'react';
import './SocialMedia.css';

interface SocialMediaCardProps {
  logo: string;
  followers: number;
  views: number;
  username: string;
  link: string;
  backgroundColor: string;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ logo, followers, views, username, link, backgroundColor }) => {
  return (
    <div className="social-media-card">
      <div className="card-inner">
        <div className="card-front">
          <img src={logo} alt="Social Media Logo" className="social-media-logo" />
        </div>
        <div className="card-back" style={{backgroundColor: backgroundColor}}>
          <p><span>Followers:</span> {followers}</p>
          <p><span>Views:</span> {views}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;