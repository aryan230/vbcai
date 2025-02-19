import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any domain
      },
    ],
    domains: ["example.com"], // You can specify specific domains if needed
    dangerouslyAllowSVG: true, // Allow SVG images
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Optionally also ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
