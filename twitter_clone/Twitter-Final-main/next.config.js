/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "help.twitter.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pngimg.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.livemint.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn0.iconfinder.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
