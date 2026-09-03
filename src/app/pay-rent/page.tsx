import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata("/pay-rent"),
  title: `Pay Rent | ${siteConfig.brandShort}`,
  description: "Pay rent instructions for tenants in 9th Star managed homes. Portal login preferred.",
};

export default function PayRentPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-3xl">
        <p className="pill-label mb-4 inline-block">Tenants</p>
        <h1 className="text-display-md mb-5">Pay rent</h1>
        <p className="prose-dek mb-8 text-muted">
          Most tenants pay through the method listed in their lease or tenant portal. If you need your current payment
          instructions, log in or contact us.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/tenants" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm text-surface">
            Tenant portal
          </Link>
          <a
            href={`mailto:${siteConfig.nap.email}`}
            className="rounded-full border border-line px-6 py-3.5 text-center text-sm"
          >
            Email {siteConfig.nap.email}
          </a>
        </div>
        <p className="mt-8 text-sm text-muted">
          External payment link placeholder: add your e-transfer or portal URL here when ready.
        </p>
      </div>
    </div>
  );
}
