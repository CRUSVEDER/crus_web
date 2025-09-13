// next.config.mjs
import createMDX from "@next/mdx";

const withMDX = createMDX({
  experimental: {
    mdxRs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Blog's avatar
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub profile images
      },
      {
        protocol: "https",
        hostname: "github.com", // fallback GitHub avatar redirect
      },
    ],
  },
};

export default withMDX(nextConfig);
