import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/thank-you"],
    },
    sitemap: `${siteConfig.domain}/sitemap.xml`,
    // Prefer apex host (middleware enforces www → apex)
    host: siteConfig.domain.replace(/^https?:\/\//, ""),
  };
}
