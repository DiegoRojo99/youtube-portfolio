import React from 'react';
import './SocialMedia.css';

const SocialMediaSection: React.FC = () => {
  const socialMediaData = [
    {
      name: 'YouTube',
      logo: '/assets/youtube-icon.png',
      backgroundImage: '/avatar.jpg',
      link: 'https://youtube.com/@santimercadal',
    },
    {
      name: 'TikTok',
      logo: '/assets/tiktok-icon.svg',
      backgroundImage: '/dark-photo.jpeg',
      link: 'https://tiktok.com/@smercadal',
    },
    {
      name: 'Instagram',
      logo: '/assets/instagram-icon.png',
      backgroundImage: '/retrato-japones.jpeg',
      link: 'https://instagram.com/smercadal',
    },
  ];

  return (
    <div className="social-media-section">
      {socialMediaData.map((media, index) => (
        <div className="social-media-content" key={`social-media-${index}`} style={{ backgroundImage: `url(${media.backgroundImage})` }}>
            <a
              key={index}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-column"
            >
              <div className="social-media-logo-container">
                <img src={media.logo} alt={`${media.name} logo`}/>
              </div>
              <p className="social-media-text">{media.name}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaSection;