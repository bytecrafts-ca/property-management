import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata("/maintenance-request");

export default function MaintenanceRequestPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-3xl">
        <p className="pill-label mb-4 inline-block">Tenants</p>
        <h1 className="text-display-md mb-5">Submit a maintenance request</h1>
        <p className="prose-dek mb-8 text-muted">
          For non-urgent requests, use the tenant portal after login. For floods, no heat, lockouts, or anything urgent,
          call immediately.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/tenants" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm text-surface">
            Tenant login
          </Link>
          <a href="tel:4168343587" className="rounded-full border border-line px-6 py-3.5 text-center text-sm">
            Emergency: 416-834-3587
          </a>
        </div>
      </div>
    </div>
  );
}
