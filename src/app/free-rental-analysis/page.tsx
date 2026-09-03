import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { LeadForm } from "@/components/forms/lead-form";
import { Nap } from "@/components/seo/nap";

export const metadata: Metadata = buildMetadata("/free-rental-analysis");

export default function FreeRentalAnalysisPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="pill-label mb-4 inline-block">Owners</p>
          <h1 className="text-display-md mb-5">Free rental analysis</h1>
          <p className="prose-dek mb-8 text-muted">
            Share your Durham Region property details. We follow up with pricing notes, vacancy considerations, and
            whether full management makes sense for your situation.
          </p>
          <Nap className="space-y-1 text-sm" />
        </div>
        <LeadForm source="free-rental-analysis" />
      </div>
    </div>
  );
}
