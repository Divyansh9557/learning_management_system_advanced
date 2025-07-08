import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Adjust as needed
    },
  },
   images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
