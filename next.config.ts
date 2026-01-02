import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for optimal production deployment
  output: 'standalone',

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Compression and performance
  compress: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Headers for static asset caching
  async headers() {
    return [
      {
        source: '/logo-uny.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
