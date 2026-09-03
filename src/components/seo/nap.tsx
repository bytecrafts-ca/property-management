import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Nap({ className = "" }: { className?: string }) {
  return (
    <div className={className} itemScope itemType="https://schema.org/RealEstateAgent">
      <p className="font-medium" itemProp="name">
        {siteConfig.nap.name}
      </p>
      <p>
        <a href={`tel:${siteConfig.nap.phoneTel}`} className="link-underline" itemProp="telephone">
          {siteConfig.nap.phoneDisplay}
        </a>
      </p>
      <p>
        <a href={`mailto:${siteConfig.nap.email}`} className="link-underline" itemProp="email">
          {siteConfig.nap.email}
        </a>
      </p>
      {siteConfig.nap.addressDisplay ? (
        <p className="text-muted" itemProp="address">
          {siteConfig.nap.address}
        </p>
      ) : (
        <p className="text-muted">Serving {siteConfig.serviceAreaLabel}, Ontario</p>
      )}
      <p className="mt-2 text-sm">
        <Link href="/areas-we-serve" className="link-underline">
          View areas we serve
        </Link>
      </p>
    </div>
  );
}
