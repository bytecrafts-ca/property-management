import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { guides } from "@/lib/content/guides";

export const metadata: Metadata = buildMetadata("/blog");

export default function BlogPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-4xl">
        <p className="pill-label mb-4 inline-block">Blog</p>
        <h1 className="text-display-md mb-5">Landlord notes from Durham</h1>
        <p className="prose-dek mb-12 max-w-2xl text-muted">
          Longer landlord education lives in Guides. Use this index for updates and the same articles linked from blog
          URLs when needed.
        </p>
        <ul className="space-y-5">
          {guides.map((guide) => (
            <li key={guide.slug} className="border-b border-line pb-5">
              <Link href={guide.path} className="text-xl font-medium link-underline">
                {guide.title}
              </Link>
              <p className="mt-2 text-sm text-muted">{guide.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
