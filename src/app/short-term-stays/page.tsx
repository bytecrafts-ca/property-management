import type { Metadata } from "next";
import { StaysTabs } from "@/components/stays/stays-tabs";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata("/short-term-stays");

export default function ShortTermStaysPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-6xl">
        <p className="pill-label mb-4 inline-block">Short term stays</p>
        <h1 className="text-display-md mb-5">Short term stays</h1>
        <p className="prose-dek mb-10 max-w-2xl text-muted sm:mb-12">
          The same furnished places we list on Airbnb, booked directly with us. Pick a unit, choose your dates, and
          book online.
        </p>

        <StaysTabs />

        <p className="mt-10 text-sm text-muted">
          Questions before you book? Call{" "}
          <a href={`tel:${siteConfig.nap.phoneTel}`} className="link-underline text-ink">
            {siteConfig.nap.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.nap.email}`} className="link-underline text-ink">
            {siteConfig.nap.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
