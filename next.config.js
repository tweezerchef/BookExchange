/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nobe.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'books.google.com',
      },
    ],
  },
}

module.exports = nextConfig
