import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "vvvfnvcalaqdruydejxz.supabase.co"
      }
    ]
  }
};

export default nextConfig;
