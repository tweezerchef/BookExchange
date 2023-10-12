/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'nobe.s3.us-east-2.amazonaws.com',
      'books.google.com',
      'i.imgur.com',
    ],
  },
}

module.exports = nextConfig
