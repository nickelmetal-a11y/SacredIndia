/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-slot'],
  },
};

module.exports = nextConfig;
