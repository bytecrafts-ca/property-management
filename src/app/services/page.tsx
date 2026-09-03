import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/meta";
import { seoServices } from "@/lib/seo/durham-data";

export const metadata: Metadata = buildMetadata("/services");

export default function ServicesPage() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <p className="pill-label mb-4 inline-block">Services</p>
        <h1 className="text-display-md mb-5">Property management services in Durham</h1>
        <p className="prose-dek mb-12 max-w-3xl text-muted">
          Residential rental management for Durham Region landlords. Choose a service to see how we handle placement,
          screening, maintenance, and reporting.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {seoServices.map((service) => (
            <Link
              key={service.slug}
              href={service.path}
              className="group overflow-hidden rounded-[1.25rem] border border-line bg-surface"
            >
              <div className="relative aspect-[16/9]">
                <Image src={service.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
