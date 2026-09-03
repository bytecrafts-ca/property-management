import type { Metadata } from "next";
import Link from "next/link";
import listings from "../../../content/listings";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata("/available-rentals");

export default function AvailableRentalsPage() {
  const homes = listings.filter((item) => item.status === "live");

  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <p className="pill-label mb-4 inline-block">Homes</p>
        <h1 className="text-display-md mb-5">Available homes</h1>
        {homes.length === 0 ? (
          <div className="max-w-2xl">
            <p className="prose-dek text-muted">
              Sorry, we do not have any properties available yet. Check back soon, or{" "}
              <Link href="/contact" className="link-underline">
                contact us
              </Link>{" "}
              if you are looking for something specific.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homes.map((home) => (
              <article key={home.id} className="rounded-[1.25rem] border border-line bg-surface p-6">
                <p className="text-label text-muted mb-2">Available</p>
                <h2 className="font-display text-2xl">
                  <Link href={`/available-rentals/${home.slug}`} className="hover:underline">
                    {home.neighbourhood || home.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {home.beds} bed · {home.baths} bath
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
