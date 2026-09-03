import type { Metadata } from "next";
import Link from "next/link";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/about");

export default function AboutPage() {
  return (
    <SeoPage
      eyebrow="About"
      title="About 9th Star Property Management"
      description="Residential rental management for Durham Region landlords and investors."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]}
    >
      <p>
        9th Star Property Management helps owners run residential rentals across Durham Region. We focus on houses,
        duplexes, townhomes, and condo units.
      </p>
      <p>
        The work is practical: place good tenants, answer issues, collect rent, and report clearly. Owners stay informed
        without living inside every ticket.
      </p>
      <p>Hours: {siteConfig.hours}</p>
      <p>
        Prefer Durham Region. If your property is elsewhere in the GTA,{" "}
        <Link href="/contact" className="link-underline">
          contact us
        </Link>{" "}
        anyway. We will tell you honestly if we can take it on.
      </p>
      <p>
        Or request a{" "}
        <Link href="/free-rental-analysis" className="link-underline">
          free rental analysis
        </Link>
        .
      </p>
    </SeoPage>
  );
}
