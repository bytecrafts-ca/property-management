"use client";

import { siteConfig } from "@/lib/site";

function ReviewCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <article className="w-[260px] shrink-0 rounded-[1.15rem] border border-line bg-paper px-5 py-4 sm:w-[300px] sm:px-6 sm:py-5">
      <p className="text-sm leading-relaxed text-muted">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 border-t border-line pt-4">
        <p className="text-sm font-medium text-ink">{name}</p>
        <p className="text-label mt-1 text-muted">{role}</p>
      </div>
    </article>
  );
}

export function ReviewsMarquee() {
  const reviews = siteConfig.reviews;
  const loop = [...reviews, ...reviews];

  return (
    <section
      className="overflow-hidden border-y border-line bg-surface py-10 sm:py-12"
      data-nav="light"
      aria-label="Tenant and owner reviews"
    >
      <div className="mx-auto mb-6 max-w-7xl px-5 sm:px-8 md:px-10">
        <span className="pill-label inline-block">Reviews</span>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-surface to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-surface to-transparent sm:w-20" />

        <div className="reviews-marquee-track flex w-max gap-4 will-change-transform sm:gap-5">
          {loop.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              quote={review.quote}
              name={review.name}
              role={review.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
