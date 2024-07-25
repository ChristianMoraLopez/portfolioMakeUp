import path from 'path';

/** @type {import('next').NextConfig} */
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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://portafoliomakeup-hkwusnxq.b4a.run/api/:path*',
      },
    ];
  },
};

export default nextConfig;