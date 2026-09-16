import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="bg-paper px-5 pb-28 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-3xl">
        <p className="pill-label mb-4 inline-block">404</p>
        <h1 className="text-display-md mb-5">Page not found</h1>
        <p className="prose-dek mb-8 text-muted">
          That page is not available. Use one of the links below or call{" "}
          <a href={`tel:${siteConfig.nap.phoneTel}`} className="link-underline">
            {siteConfig.nap.phoneDisplay}
          </a>
          .
        </p>
        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm text-surface">
            Home
          </Link>
          <Link href="/free-rental-analysis" className="rounded-full border border-line px-6 py-3.5 text-center text-sm">
            Free rental analysis
          </Link>
          <Link href="/contact" className="rounded-full border border-line px-6 py-3.5 text-center text-sm">
            Contact
          </Link>
        </div>
        <p className="text-label text-muted mb-3">Money pages</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/property-management-durham" className="link-underline">
              Durham Region property management
            </Link>
          </li>
          <li>
            <Link href="/property-management-oshawa" className="link-underline">
              Oshawa property management
            </Link>
          </li>
          <li>
            <Link href="/property-management-whitby" className="link-underline">
              Whitby property management
            </Link>
          </li>
          <li>
            <Link href="/property-management-ajax" className="link-underline">
              Ajax property management
            </Link>
          </li>
          <li>
            <Link href="/property-management-pickering" className="link-underline">
              Pickering property management
            </Link>
          </li>
          <li>
            <Link href="/services" className="link-underline">
              Services
            </Link>
          </li>
          <li>
            <Link href="/for-landlords" className="link-underline">
              For landlords
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
