import type { Metadata } from "next";
import Link from "next/link";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = buildMetadata("/for-landlords");

export default function ForLandlordsPage() {
  return (
    <SeoPage
      eyebrow="For landlords"
      title="Landlord property management in Durham"
      description="Hire a local manager for tenant placement, maintenance coordination, rent collection, and clear reporting."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "For landlords", path: "/for-landlords" },
      ]}
    >
      <p>
        If you own a rental in Durham Region and want fewer day-to-day interruptions, 9th Star is built for that job.
        We work with owners of houses, duplexes, townhomes, and condo units.
      </p>
      <h2>What owners usually want</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>A vetted tenant and fewer vacancies</li>
        <li>Someone else taking the first maintenance call</li>
        <li>Rent collected and reported monthly</li>
        <li>A manager who knows Pickering through Clarington, not only downtown Toronto averages</li>
      </ul>
      <h2>Useful next reads</h2>
      <p>
        <Link href="/guides/should-i-hire-a-property-manager-in-durham" className="link-underline">
          Should I hire a property manager in Durham?
        </Link>
        {" · "}
        <Link href="/pricing" className="link-underline">
          How pricing works
        </Link>
        {" · "}
        <Link href="/how-it-works" className="link-underline">
          How it works
        </Link>
      </p>
      <div className="pt-8">
        <LeadForm source="for-landlords" />
      </div>
    </SeoPage>
  );
}
