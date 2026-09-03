import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { guides } from "@/lib/content/guides";

export const metadata: Metadata = buildMetadata("/guides");

export default function GuidesIndexPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-4xl">
        <p className="pill-label mb-4 inline-block">Guides</p>
        <h1 className="text-display-md mb-5">Landlord guides for Durham Region</h1>
        <p className="prose-dek mb-12 text-muted">
          Practical articles for owners comparing managers, fees, screening, and vacancy decisions in Durham.
        </p>
        <div className="space-y-5">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.path}
              className="block rounded-[1.25rem] border border-line bg-surface p-6 hover:bg-soft"
            >
              <h2 className="font-display text-2xl">{guide.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{guide.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
