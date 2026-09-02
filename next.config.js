const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-slot'],
  },
};

module.exports = nextConfig;
