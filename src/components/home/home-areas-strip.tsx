import Link from "next/link";
import { seoCities } from "@/lib/seo/durham-data";

const featured = [
  "pickering",
  "ajax",
  "whitby",
  "oshawa",
  "clarington",
  "brooklin",
  "scarborough",
  "toronto",
] as const;

/** SEO + conversion strip: city money pages within 1 click from home. */
export function HomeAreasStrip() {
  const cities = seoCities.filter((c) => (featured as readonly string[]).includes(c.slug));

  return (
    <section className="border-t border-line bg-soft px-5 py-16 sm:px-8 md:px-10 md:py-20" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <p className="text-label text-muted mb-3">Serving Durham and the GTA</p>
        <h2 className="text-display-sm mb-4 max-w-2xl">Local property management where your rental sits</h2>
        <p className="prose-dek text-muted mb-10 max-w-2xl">
          Pickering through Clarington is our core. Scarborough and Toronto condo investors are welcome when you need
          unit-level management and clear reporting.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/property-management-durham"
            className="rounded-2xl border border-line bg-surface px-5 py-4 text-sm transition-colors hover:border-ink"
          >
            <span className="font-medium">Durham Region</span>
            <span className="mt-1 block text-muted">Full corridor hub</span>
          </Link>
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={city.path}
              className="rounded-2xl border border-line bg-surface px-5 py-4 text-sm transition-colors hover:border-ink"
            >
              <span className="font-medium">{city.name}</span>
              <span className="mt-1 block text-muted">{city.primaryKeyword}</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/areas-we-serve" className="link-underline">
            See all areas we serve
          </Link>
          {" · "}
          <Link href="/free-rental-analysis" className="link-underline">
            Get a free rental analysis
          </Link>
        </p>
      </div>
    </section>
  );
}
