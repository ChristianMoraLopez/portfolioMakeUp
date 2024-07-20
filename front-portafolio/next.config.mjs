/** @type {import('next').NextConfig} */

import path from 'path';


const nextConfig = {
  images: {
    domains: ['media.discordapp.net', 'images.pexels.com', 'via.placeholder.com'],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('src');
    return config;
  },
};

export default nextConfig;
