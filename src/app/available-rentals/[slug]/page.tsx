import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import listings from "../../../../content/listings";
import { buildMetadata, absoluteUrl } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listings.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = listings.find((item) => item.slug === slug);
  if (!listing) return buildMetadata("/available-rentals");
  return {
    title: `${listing.neighbourhood} rental | 9th Star`,
    description: `${listing.beds} bed, ${listing.baths} bath rental in ${listing.neighbourhood}. Managed by 9th Star Property Management.`,
    alternates: { canonical: absoluteUrl(`/available-rentals/${listing.slug}`) },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = listings.find((item) => item.slug === slug);
  if (!listing) notFound();

  const image = listing.images[0];

  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Available rentals", path: "/available-rentals" },
            { name: listing.neighbourhood, path: `/available-rentals/${listing.slug}` },
          ]}
        />
        <p className="pill-label mb-4 mt-8 inline-block">
          {listing.status === "live" ? "Available" : "Portfolio"}
        </p>
        <h1 className="text-display-md mb-4">{listing.neighbourhood}</h1>
        <p className="prose-dek mb-8 text-muted">
          {listing.beds} bed · {listing.baths} bath · {listing.type}
          {listing.status === "live" && listing.rent ? ` · $${listing.rent}/mo` : ""}
        </p>
        {image ? (
          <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-[1.25rem]">
            <Image
              src={image}
              alt={`${listing.neighbourhood} rental managed by 9th Star Property Management`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        ) : null}
        <p className="leading-relaxed text-muted">
          Full street addresses for occupied homes are not published here. Contact us for current availability, tour
          scheduling, or owner management inquiries.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm text-surface">
            Ask about this home
          </Link>
          <Link href="/available-rentals" className="rounded-full border border-line px-6 py-3.5 text-center text-sm">
            All rentals
          </Link>
        </div>
      </div>
    </div>
  );
}
