import type { Metadata } from "next";
import { CityPageView } from "@/components/seo/city-page-view";
import { buildMetadata } from "@/lib/seo/meta";
import { seoCities } from "@/lib/seo/durham-data";

const city = seoCities.find((item) => item.slug === "oshawa")!;

export const metadata: Metadata = buildMetadata(city.path, {
  title: `${city.name} Property Management Company | 9th Star`,
  description: `Professional property management in ${city.name}, Ontario. Tenant placement, screening, maintenance, and reporting for local landlords.`,
  path: city.path,
});

export default function Page() {
  return <CityPageView slug="oshawa" />;
}
