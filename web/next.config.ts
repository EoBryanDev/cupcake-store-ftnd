import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-3487eb3e73174ed99e160777dbdb7a0f.r2.dev",
      },
    ],
  },
};

export default nextConfig;
