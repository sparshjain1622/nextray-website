import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/Downlight/six_watt",
        destination: "/products/indoor/6-watt-down-light",
        permanent: true,
      },
    ];
  },
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
