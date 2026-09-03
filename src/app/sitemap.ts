import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { seoCities, seoServices } from "@/lib/seo/durham-data";
import { pageMeta } from "@/lib/seo/meta";
import { guides } from "@/lib/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = Object.values(pageMeta)
    .filter((page) => !page.noIndex)
    .map((page) => page.path);

  const cityPaths = seoCities.map((city) => city.path);
  const servicePaths = ["/services", ...seoServices.map((service) => service.path)];
  const guidePaths = ["/guides", ...guides.map((guide) => guide.path)];

  const all = Array.from(new Set([...staticPaths, ...cityPaths, ...servicePaths, ...guidePaths]));

  return all.map((path) => ({
    url: path === "/" ? siteConfig.domain : `${siteConfig.domain}${path.endsWith("/") ? path : `${path}/`}`,
    lastModified: new Date(),
    changeFrequency: path.includes("property-management") || path === "/" ? "weekly" : "monthly",
    priority: path === "/" || path === "/property-management-durham" ? 1 : path.includes("property-management-") ? 0.9 : 0.7,
  }));
}
