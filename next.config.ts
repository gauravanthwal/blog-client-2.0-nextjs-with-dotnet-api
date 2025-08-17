import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fastly.picsum.photos'], // Add your allowed image domains here
  }
};

export default nextConfig;
