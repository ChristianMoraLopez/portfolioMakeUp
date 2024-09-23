
/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  images: {
    domains: [
      'media.discordapp.net',
      'www.pexels.com',
      'images.pexels.com',
      'via.placeholder.com',
      'instagram.fbog7-1.fna.fbcdn.net',
      'previews.dropbox.com'
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
        destination: 'https://portafoliomakeup-v1020iea.b4a.run/api/:path*',
      },
    ];
  },
};

export default nextConfig;