import Link from "next/link";
import Image from "next/image";
import { siteConfig, siteImages } from "@/lib/site";

export function ResidentsStrip() {
  return (
    <section className="bg-surface px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[1.25rem] border border-line bg-soft lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
          <Image
            src={siteImages.homes.bedroom}
            alt="Rental home interior"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="px-6 pb-8 pt-2 lg:px-10 lg:py-10">
          <span className="pill-label mb-4 inline-block">For tenants</span>
          <h2 className="text-display-sm mb-4">Renting one of our homes?</h2>
          <p className="prose-dek text-muted mb-8">
            Submit maintenance requests or complaints through us. For floods, no heat, or lockouts, call. Do not wait on a form.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request"
              className="rounded-full bg-ink px-6 py-3.5 text-center text-sm font-medium text-surface hover:bg-ink/90"
            >
              Submit a request
            </Link>
            <a
              href={`tel:${siteConfig.contact.emergencyPhone}`}
              className="rounded-full border border-line px-6 py-3.5 text-center text-sm font-medium hover:bg-surface"
            >
              Call {siteConfig.contact.emergencyPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
