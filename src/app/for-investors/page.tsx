import type { Metadata } from "next";
import Link from "next/link";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/for-investors", {
  title: `Investor Property Management Durham & GTA | ${siteConfig.brandShort}`,
  description:
    "Hands-off residential property management for investors with rentals in Durham and the GTA. Screening, rent collection, maintenance, and clear reporting.",
  path: "/for-investors",
});

export default function ForInvestorsPage() {
  return (
    <SeoPage
      eyebrow="For investors"
      title="Investor property management for Durham and GTA rentals"
      description="Built for owners who hold houses, duplexes, and condo units and want the rental run without living in their inbox."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "For investors", path: "/for-investors" },
      ]}
    >
      <p>
        If you bought a rental as an investment, you should not become the unpaid after-hours dispatcher. 9th Star
        Property Management runs screening, tenant communication, maintenance coordination, and rent collection so you
        get a monthly report instead of a stream of texts.
      </p>

      <h2>Who this is for</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Owners with 1 to 5 residential doors in Durham or the eastern GTA</li>
        <li>Investors who live outside the area or abroad</li>
        <li>Condo unit owners who need board-aware lease-ups</li>
        <li>Landlords tired of vacancy drag and weak screening</li>
      </ul>

      <h2>What you get</h2>
      <p>
        Local coverage for Pickering, Ajax, Whitby, Oshawa, Clarington, Brooklin, and nearby markets. Toronto and
        Scarborough condo investors are welcome when unit-level management is the fit. You stay in control of spend
        decisions. We carry the day-to-day work.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link href="/services/tenant-placement" className="link-underline">
            Tenant placement
          </Link>{" "}
          and{" "}
          <Link href="/services/tenant-screening" className="link-underline">
            screening
          </Link>
        </li>
        <li>
          <Link href="/services/rent-collection-financial-reporting" className="link-underline">
            Rent collection and reporting
          </Link>
        </li>
        <li>
          <Link href="/services/maintenance-coordination" className="link-underline">
            Maintenance coordination
          </Link>
        </li>
        <li>
          <Link href="/services/investor-property-management" className="link-underline">
            Investor-focused management
          </Link>
        </li>
      </ul>

      <h2>Start with a rental analysis</h2>
      <p>
        Tell us the city, property type, and whether the unit is vacant or occupied. Call{" "}
        <a href={`tel:${siteConfig.nap.phoneTel}`} className="link-underline">
          {siteConfig.nap.phoneDisplay}
        </a>{" "}
        or submit the form below.
      </p>

      <div className="pt-8">
        <LeadForm source="for-investors" />
      </div>
    </SeoPage>
  );
}
