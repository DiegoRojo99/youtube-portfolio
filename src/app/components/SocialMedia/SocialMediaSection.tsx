import React from 'react';
import Image from 'next/image';
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
      link: 'https://instagram.com/santimercadal',
    },
  ];

  return (
    <div className="social-media-section">
      {socialMediaData.map((media, index) => (
        <div className="social-media-content" key={`social-media-${index}`} style={{ backgroundImage: `url(${media.backgroundImage})` }}>
            <a
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-media-column"
            >
              <div className="social-media-logo-container">
                <Image src={media.logo} alt={`${media.name} logo`} width={100} height={100} className="social-media-logo" />
              </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaSection;