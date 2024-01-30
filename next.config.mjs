/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3333"
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.ygoprodeck.com',
            port: '',
            pathname: '/images/**',
          },
        ],
      },
    reactStrictMode: false
};

export default nextConfig;
