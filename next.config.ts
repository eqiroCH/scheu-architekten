import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/info", destination: "/buero", permanent: true },
      { source: "/project/:slug", destination: "/projekte/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
