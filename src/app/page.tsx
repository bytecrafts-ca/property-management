import type { Metadata } from "next";
import { HomePageClient } from "@/components/home/home-page-client";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata("/");

export default function HomePage() {
  return <HomePageClient />;
}
