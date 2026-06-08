import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function originFromEnv(url: string | undefined, fallback: string): string {
  try {
    return new URL(url || fallback).origin;
  } catch {
    return fallback;
  }
}

const apiOrigin = originFromEnv(
  process.env.NEXT_PUBLIC_API_URL,
  "http://localhost:4000"
);
const siteOrigin = originFromEnv(
  process.env.NEXT_PUBLIC_SITE_URL,
  "http://localhost:3000"
);

/** Allow Render/Vercel free subdomains + local dev in CSP */
const extraConnectOrigins = [
  apiOrigin,
  siteOrigin,
  "http://localhost:4000",
  "http://127.0.0.1:4000",
  "http://localhost:3000",
  "https://*.onrender.com",
  "https://*.vercel.app",
].join(" ");

function apiRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    { protocol: "https", hostname: "**.onrender.com" },
    { protocol: "http", hostname: "localhost", port: "4000" },
    { protocol: "http", hostname: "127.0.0.1", port: "4000" },
  ];
  try {
    const { hostname, protocol } = new URL(apiOrigin);
    if (hostname && hostname !== "localhost") {
      patterns.push({
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
      });
    }
  } catch {
    /* ignore */
  }
  try {
    const { hostname } = new URL(siteOrigin);
    if (hostname && !hostname.includes("localhost")) {
      patterns.push({ protocol: "https", hostname });
    }
  } catch {
    /* ignore */
  }
  return patterns;
}

const nextConfig: NextConfig = {
  transpilePackages: ["@nextray/shared"],
  /* Default bottom-left overlaps admin sidebar Sign Out — move to bottom-right */
  devIndicators: {
    position: "bottom-right",
  },
  turbopack: {
    root: monorepoRoot,
  },
  async redirects() {
    return [
      {
        source: "/Downlight/six_watt",
        destination: "/products/indoor/6-watt-down-light",
        permanent: true,
      },
      {
        source: "/Our_Associates",
        destination: "/associates",
        permanent: true,
      },
      {
        source: "/Contact_us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Gallery",
        destination: "/gallery/projects",
        permanent: true,
      },
      {
        source: "/Gallery/events",
        destination: "/gallery/events",
        permanent: true,
      },
      {
        source: "/Our_Strength/infrastructure",
        destination: "/strength/infrastructure",
        permanent: true,
      },
      {
        source: "/Our_Strength/our_presence",
        destination: "/strength/our-presence",
        permanent: true,
      },
      {
        source: "/Streetlight/street_light",
        destination: "/products/outdoor/25-watt-street-light",
        permanent: true,
      },
      {
        source: "/Downlight/twelve_watt",
        destination: "/products/indoor/12-watt-down-light",
        permanent: true,
      },
      {
        source: "/Downlight/eighteen_watt",
        destination: "/products/indoor/18-watt-down-light",
        permanent: true,
      },
      {
        source: "/Downlight/twenty_four_watt",
        destination: "/products/indoor/24-watt-down-light",
        permanent: true,
      },
      {
        source: "/Downlight/fourty_watt",
        destination: "/products/indoor/40-watt-down-light",
        permanent: true,
      },
      {
        source: "/Downlight/fourty_watt2",
        destination: "/products/indoor/40-watt-clean-room-down-light",
        permanent: true,
      },
      {
        source: "/Downlight/sixty_watt",
        destination: "/products/indoor/60-watt-clean-room-down-light",
        permanent: true,
      },
      {
        source: "/Streetlight/p_series",
        destination: "/products/outdoor/p-series-street-light",
        permanent: true,
      },
      {
        source: "/Floodlight/Down_choke",
        destination: "/products/outdoor/down-choke",
        permanent: true,
      },
      {
        source: "/Floodlight/back_choke",
        destination: "/products/outdoor/back-choke",
        permanent: true,
      },
      {
        source: "/Powertronics/powertronics",
        destination: "/products/powertronics/isolated",
        permanent: true,
      },
      {
        source: "/Powertronics/non_isolated",
        destination: "/products/powertronics/non-isolated",
        permanent: true,
      },
    ];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: ${extraConnectOrigins}`,
      "font-src 'self' data:",
      `connect-src 'self' ${extraConnectOrigins}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, no-cache" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: apiRemotePatterns(),
  },
};

export default nextConfig;
