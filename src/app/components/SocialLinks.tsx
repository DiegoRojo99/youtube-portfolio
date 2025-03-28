import React from 'react';

interface SocialLink {
  id: number;
  name: string;
  logo: string;
  followers: number;
  videos: number;
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: 'YouTube',
    logo: '/assets/youtube-icon.png',
    followers: 12000,
    videos: 150,
  },
  {
    id: 2,
    name: 'Twitter',
    logo: '/assets/twitter-icon.png',
    followers: 8000,
    videos: 0,
  },
  {
    id: 3,
    name: 'Instagram',
    logo: '/assets/instagram-icon.png',
    followers: 15000,
    videos: 0,
  },
];

const SocialLinkCard: React.FC<SocialLink> = ({ name, logo, followers, videos }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center 
      transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <img src={logo} alt={`${name} logo`} className="w-16 h-16 mb-4" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">Followers: {followers}</p>
      {videos > 0 && <p className="text-gray-600">Videos: {videos}</p>}
    </div>
  );
};

const SocialLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {socialLinks.map((link) => <SocialLinkCard key={link.id} {...link} />)}
    </div>
  );
};

export default SocialLinks;