/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  reactStrictMode: true,
  images: {
    domains: [
      "nobe.s3.us-east-2.amazonaws.com",
      "books.google.com",
      "i.imgur.com",
    ],
  },
};

module.exports = nextConfig;
