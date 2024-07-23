/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  images: {
    domains: [
      'media.discordapp.net',
      'images.pexels.com',
      'via.placeholder.com',
      'instagram.fbog7-1.fna.fbcdn.net',
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('src');
    return config;
  },
};

export default nextConfig;
