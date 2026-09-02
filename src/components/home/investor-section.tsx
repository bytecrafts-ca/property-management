import Image from "next/image";
import Link from "next/link";
import { siteConfig, siteImages } from "@/lib/site";

export function InvestorSection() {
  return (
    <section className="border-b border-line bg-surface px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="card-photo relative aspect-[3/4]">
            <Image src={siteImages.homes.detached} alt="Residential home" fill unoptimized className="object-cover" sizes="300px" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="card-photo relative aspect-[4/3] flex-1">
              <Image src={siteImages.homes.living} alt="Rental interior" fill unoptimized className="object-cover" sizes="300px" />
            </div>
            <div className="card-photo relative aspect-[4/3] flex-1">
              <Image src={siteImages.homes.kitchen} alt="Kitchen" fill unoptimized className="object-cover" sizes="300px" />
            </div>
          </div>
        </div>

        <div>
          <span className="pill-label mb-6 inline-block">How it works</span>
          <h2 className="text-display-sm mb-6">Not a building manager. A rental manager.</h2>
          <p className="prose-dek text-muted mb-6">{siteConfig.dek}</p>
          <ul className="space-y-4 text-sm sm:text-base">
            {[
              "You own a house, duplex, triplex, or condo unit.",
              "We screen tenants and handle every complaint.",
              "We coordinate maintenance and collect rent.",
              "You receive a monthly report and one bill.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-surface hover:bg-ink/90"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
