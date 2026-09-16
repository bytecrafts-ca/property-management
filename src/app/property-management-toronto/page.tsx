import type { Metadata } from "next";
import { CityPageView } from "@/components/seo/city-page-view";
import { buildMetadata } from "@/lib/seo/meta";
import { seoCities } from "@/lib/seo/durham-data";

const city = seoCities.find((item) => item.slug === "toronto")!;

export const metadata: Metadata = buildMetadata(city.path, {
  title: `Toronto Condo Property Management | 9th Star`,
  description: `Unit-level condo and residential property management for Toronto investors. Screening, rent collection, maintenance coordination, and clear monthly reporting.`,
  path: city.path,
});

export default function Page() {
  return <CityPageView slug="toronto" />;
}
