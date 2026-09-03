import type { Metadata } from "next";
import Link from "next/link";
import listings from "../../../content/listings.json";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata("/available-rentals");

export default function AvailableRentalsPage() {
  const homes = listings.filter((item) => item.status === "live" || item.status === "history");

  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <p className="pill-label mb-4 inline-block">Homes</p>
        <h1 className="text-display-md mb-5">Available rentals and managed homes</h1>
        <p className="prose-dek mb-12 max-w-3xl text-muted">
          Current openings and portfolio examples. For privacy, occupied homes are shown by neighbourhood rather than
          full street address unless actively listed for rent.
        </p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {homes.map((home) => (
            <article key={home.id} className="rounded-[1.25rem] border border-line bg-surface p-6">
              <p className="text-label text-muted mb-2">{home.status === "live" ? "Available" : "Managed portfolio"}</p>
              <h2 className="font-display text-2xl">
                <Link href={`/available-rentals/${home.slug}`} className="hover:underline">
                  {home.neighbourhood}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">
                {home.beds} bed · {home.baths} bath
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Full street addresses for occupied homes are not published here. Contact us for current availability.
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm">
          Owners:{" "}
          <Link href="/free-rental-analysis" className="link-underline">
            request a rental analysis
          </Link>
          . Tenants:{" "}
          <Link href="/tenants" className="link-underline">
            go to the tenant portal
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
