import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { ResidentsClient } from "@/components/residents/residents-client";

export const metadata: Metadata = buildMetadata("/tenants");

export default function TenantsPage() {
  return <ResidentsClient />;
}
