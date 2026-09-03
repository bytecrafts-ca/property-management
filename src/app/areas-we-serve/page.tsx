import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { seoCities } from "@/lib/seo/durham-data";

export const metadata: Metadata = buildMetadata("/areas-we-serve");

export default function AreasWeServePage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-5xl">
        <p className="pill-label mb-4 inline-block">Service area</p>
        <h1 className="text-display-md mb-5">Areas we serve in Durham Region</h1>
        <p className="prose-dek mb-12 max-w-3xl text-muted">
          9th Star manages residential rentals across Durham Region and nearby east GTA communities. Start with your
          city page for local details.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {seoCities.map((city) => (
            <Link key={city.slug} href={city.path} className="rounded-[1.25rem] border border-line bg-surface p-6 hover:bg-soft">
              <h2 className="font-display text-2xl">{city.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{city.localNotes}</p>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">
          Also supporting owners connected to Newcastle, Scugog, Uxbridge, and nearby east GTA corridors.{" "}
          <Link href="/property-management-durham" className="link-underline">
            Read the Durham hub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
