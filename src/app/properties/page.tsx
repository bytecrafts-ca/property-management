import { PageHero } from "@/components/page-hero";
import { siteImages } from "@/lib/site";
import Link from "next/link";
import listings from "../../../content/listings";

export default function PropertiesPage() {
  const available = listings.filter((item) => item.status === "live");

  return (
    <>
      <PageHero
        badge="Homes"
        title="Available homes"
        description="Homes currently available for rent or for sale. Contact us to book a showing or ask about a listing."
        image={siteImages.homes.modern}
      />
      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-7xl">
          {available.length === 0 ? (
            <div className="max-w-2xl">
              <p className="prose-dek text-muted">
                Sorry, we do not have any properties available at the moment. Check back soon, or contact us if you are
                looking for something specific.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm text-surface hover:bg-ink/90"
              >
                Contact us
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {available.map((home) => (
                <article key={home.id} className="rounded-[1.25rem] border border-line bg-surface p-6">
                  <p className="text-label text-muted mb-2">Available</p>
                  <h2 className="font-display text-2xl">{home.neighbourhood || home.title}</h2>
                  <p className="mt-2 text-sm text-muted">
                    {home.beds} bed · {home.baths} bath
                    {home.rent ? ` · $${home.rent}/mo` : ""}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
