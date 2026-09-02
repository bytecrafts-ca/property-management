"use client";

import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

type Listing = {
  id: string;
  slug: string;
  address: string;
  neighbourhood: string;
  beds: number;
  baths: number;
  rent: number;
  images: string[];
};

export function FeaturedUnits({ listings }: { listings: Listing[] }) {
  if (!listings.length) return null;

  return (
    <section className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="pill-label mb-4 inline-block">Available rentals</span>
            <h2 className="text-display-md">Homes we are placing tenants in.</h2>
          </div>
          <Link href="/properties" className="text-sm link-underline shrink-0">
            View all
          </Link>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar sm:gap-6">
          {listings.map((l) => (
            <Link
              key={l.id}
              href={`/properties/${l.slug}`}
              className="group w-[85vw] shrink-0 snap-start sm:w-[400px]"
            >
              <div className="card-photo relative aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src={l.images[0]}
                  alt={l.address}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 85vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-surface px-3 py-1 text-label">
                  Available
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-label text-surface/70">{l.neighbourhood}</p>
                  <h3 className="mt-1 font-display text-2xl text-surface">{l.address}</h3>
                  <p className="mt-2 text-sm text-surface/80">
                    {l.beds} bed · {l.baths} bath · {formatCurrency(l.rent)}/mo
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
