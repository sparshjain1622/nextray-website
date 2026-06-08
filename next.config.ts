import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.nextray-tech.com",
      },
      {
        protocol: "https",
        hostname: "www.nextray-tech.com",
      },
    ],
  },
};

export default nextConfig;
