import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/thank-you");

export default function ThankYouPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-2xl text-center">
        <p className="pill-label mb-4 inline-block">Received</p>
        <h1 className="text-display-md mb-5">Thanks. We got your message.</h1>
        <p className="prose-dek mb-10 text-muted">
          Someone from 9th Star will follow up shortly. If your rental is vacant or you need a same-day reply, call now.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.nap.phoneTel}`}
            className="rounded-full bg-ink px-6 py-3.5 text-sm text-surface"
            data-cta="thank-you-call"
          >
            Call {siteConfig.nap.phoneDisplay}
          </a>
          <Link href="/property-management-durham" className="rounded-full border border-line px-6 py-3.5 text-sm">
            Durham property management
          </Link>
        </div>
        <p className="mt-10 text-xs text-muted">
          Tracking note: fire GA4 generate_lead / Google Ads conversion on this page after IDs are live.
        </p>
      </div>
    </div>
  );
}
