import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "property-management";

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: "export" as const } : {}),
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Canonical host: apex (non-www). Configure matching redirect in Vercel/DNS too.
  async redirects() {
    if (isGithubPages) return [];
    return [
      {
        source: "/get-a-quote",
        destination: "/free-rental-analysis/",
        permanent: true,
      },
      {
        source: "/get-a-quote/",
        destination: "/free-rental-analysis/",
        permanent: true,
      },
      {
        source: "/services/rent-collection",
        destination: "/services/rent-collection-financial-reporting/",
        permanent: true,
      },
      {
        source: "/services/rent-collection/",
        destination: "/services/rent-collection-financial-reporting/",
        permanent: true,
      },
      {
        source: "/services/owner-reporting",
        destination: "/services/rent-collection-financial-reporting/",
        permanent: true,
      },
      {
        source: "/services/owner-reporting/",
        destination: "/services/rent-collection-financial-reporting/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
