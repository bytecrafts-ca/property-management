import type { Metadata } from "next";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata("/how-it-works");

export default function HowItWorksPage() {
  return (
    <SeoPage
      eyebrow="Process"
      title="How property management works with 9th Star"
      description="From onboarding to monthly reporting, here is the owner process for Durham Region rentals."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "How it works", path: "/how-it-works" },
      ]}
    >
      <h2>1. Property review</h2>
      <p>We review the home or condo unit, current occupancy, and your goals for rent, tenant quality, and involvement.</p>
      <h2>2. Setup</h2>
      <p>Agreements, onboarding details, photos if needed, and a plan for vacancy or existing tenancy handoff.</p>
      <h2>3. Placement or day-to-day management</h2>
      <p>If vacant, we market and screen. If occupied, we take over communication, rent collection, and maintenance intake.</p>
      <h2>4. Ongoing operations</h2>
      <p>Tenants get a response path. You get updates and monthly reporting without chasing every detail.</p>
    </SeoPage>
  );
}
