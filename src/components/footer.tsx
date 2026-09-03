import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { BrandName } from "@/components/brand-name";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface px-5 py-16 sm:px-8 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <p className="text-display-sm mb-4">
              <BrandName />
            </p>
            <p className="prose-dek text-muted">{siteConfig.tagline}</p>
          </div>
          <div>
            <p className="text-label text-muted mb-4">Contact</p>
            <div className="space-y-2 text-sm">
              <p><a href={`tel:${siteConfig.contact.phone}`} className="link-underline">{siteConfig.contact.phone}</a></p>
              <p><a href={`mailto:${siteConfig.contact.email}`} className="link-underline">{siteConfig.contact.email}</a></p>
              <p className="text-muted">{siteConfig.contact.address}</p>
            </div>
          </div>
          <div>
            <p className="text-label text-muted mb-4">Links</p>
            <nav className="space-y-2 text-sm">
              {siteConfig.nav.map((n) => (
                <p key={n.href}><Link href={n.href} className="link-underline">{n.label}</Link></p>
              ))}
              <p><Link href="/request" className="link-underline">Tenant request</Link></p>
            </nav>
          </div>
        </div>
        <p className="mt-14 text-xs text-muted">© {year} {siteConfig.fullName}</p>
      </div>
    </footer>
  );
}
