import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/reviews");

export default function ReviewsPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-4xl">
        <p className="pill-label mb-4 inline-block">Reviews</p>
        <h1 className="text-display-md mb-5">Reviews</h1>
        <p className="prose-dek mb-12 text-muted">Feedback from owners and tenants.</p>
        <div className="space-y-6">
          {siteConfig.reviews.map((review) => (
            <figure key={review.name + review.quote.slice(0, 24)} className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-8">
              <blockquote className="text-lg leading-relaxed">“{review.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium">{review.name}</span>
                <span className="text-muted"> · {review.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
