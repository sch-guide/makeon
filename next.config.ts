import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/blog/building-a-travel-photo-album-webapp",
        destination: "/blog/build-a-website-with-ai-without-coding",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
