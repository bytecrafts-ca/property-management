import type { Metadata } from "next";
import Link from "next/link";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";
import { sharedFaqs } from "@/lib/content/faqs";

export const metadata: Metadata = buildMetadata("/pricing");

export default function PricingPage() {
  return (
    <SeoPage
      eyebrow="Pricing"
      title="Property management fees in Durham"
      description="How residential management pricing usually works, and what to ask before you compare quotes."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
      ]}
      faqs={sharedFaqs.fees}
    >
      <p>
        Most Ontario residential property managers charge a percentage of collected rent. Some also charge a placement
        fee when a unit turns over. Exact numbers depend on services, property type, and portfolio size.
      </p>
      <p>
        We do not publish a fake one-size fee online. You get a clear written quote after we understand the property.
      </p>
      <h2>What to compare besides the percentage</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>What is included in the monthly fee</li>
        <li>Placement and leasing costs on vacancy</li>
        <li>Maintenance markup policies</li>
        <li>Reporting quality and response commitments</li>
      </ul>
      <p>
        Read the longer explainer:{" "}
        <Link href="/guides/property-management-fees-ontario" className="link-underline">
          property management fees in Ontario
        </Link>
        .
      </p>
    </SeoPage>
  );
}
