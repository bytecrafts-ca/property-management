import { siteConfig } from "@/lib/site";

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const brand = siteConfig.brandShort;

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    path: "/",
    title: "Property Management in Durham Region | 9th Star",
    description:
      "Durham Region property management for landlords in Pickering, Ajax, Whitby, Oshawa, and Clarington. Get a free rental analysis.",
  },
  "/property-management-durham": {
    path: "/property-management-durham",
    title: "Durham Region Property Management | 9th Star",
    description:
      "Full-service rental property management across Durham Region. Tenant placement, screening, maintenance, and reporting for local landlords.",
  },
  "/areas-we-serve": {
    path: "/areas-we-serve",
    title: `Areas We Serve in Durham | ${brand}`,
    description:
      "Property management across Pickering, Ajax, Whitby, Oshawa, Clarington, Bowmanville, Courtice, Brooklin, and nearby Durham communities.",
  },
  "/services": {
    path: "/services",
    title: `Property Management Services in Durham | ${brand}`,
    description:
      "Residential and condo rental management, tenant placement, screening, maintenance, rent collection, and investor support in Durham Region.",
  },
  "/for-landlords": {
    path: "/for-landlords",
    title: `Landlord Property Management Durham | ${brand}`,
    description:
      "Hire a Durham property manager for tenant placement, day-to-day operations, and clear monthly reporting. Talk to 9th Star.",
  },
  "/free-rental-analysis": {
    path: "/free-rental-analysis",
    title: `Free Rental Analysis Durham | ${brand}`,
    description:
      "Request a free rental analysis for your Durham Region property. Pricing guidance, vacancy risk notes, and next steps from 9th Star.",
  },
  "/pricing": {
    path: "/pricing",
    title: `Property Management Fees Durham | ${brand}`,
    description:
      "How property management pricing works in Durham Region. Transparent fee structure discussion for houses, duplexes, and condo units.",
  },
  "/how-it-works": {
    path: "/how-it-works",
    title: `How Property Management Works | ${brand}`,
    description:
      "See how 9th Star onboards Durham landlords, places tenants, handles maintenance, and reports every month.",
  },
  "/available-rentals": {
    path: "/available-rentals",
    title: `Available Homes | ${brand}`,
    description:
      "Browse homes currently available for rent or sale with 9th Star Property Management across Durham Region.",
  },
  "/tenants": {
    path: "/tenants",
    title: `Tenant Portal and Support | ${brand}`,
    description:
      "Tenant login, maintenance requests, and support for renters in 9th Star managed homes across Durham Region.",
  },
  "/maintenance-request": {
    path: "/maintenance-request",
    title: `Submit a Maintenance Request | ${brand}`,
    description:
      "Log a maintenance or complaint request for your rental. Emergencies should call 416-834-3587 right away.",
  },
  "/about": {
    path: "/about",
    title: `About 9th Star Property Management | Durham`,
    description:
      "Learn how 9th Star manages residential rentals for Durham Region landlords and investors.",
  },
  "/reviews": {
    path: "/reviews",
    title: `Reviews | ${brand}`,
    description:
      "Read tenant and owner feedback for 9th Star Property Management. Real reviews labeled clearly. Sample reviews marked as sample.",
  },
  "/faq": {
    path: "/faq",
    title: `Property Management FAQ Durham | ${brand}`,
    description:
      "Answers for Durham landlords on fees, screening, vacancies, condo rules, and how 9th Star manages rentals.",
  },
  "/contact": {
    path: "/contact",
    title: `Contact 9th Star Property Management`,
    description:
      "Contact 9th Star for Durham Region property management. Call 416-834-3587 or request a free rental analysis.",
  },
  "/guides": {
    path: "/guides",
    title: `Landlord Guides for Durham | ${brand}`,
    description:
      "Practical landlord guides on choosing a property manager, fees, screening, vacancies, and Ontario basics.",
  },
  "/blog": {
    path: "/blog",
    title: `Blog | ${brand}`,
    description: "Updates and landlord notes from 9th Star Property Management in Durham Region.",
  },
  "/privacy": {
    path: "/privacy",
    title: `Privacy Policy | ${brand}`,
    description: "Privacy policy for 9thstarpropertymanagement.ca.",
  },
  "/terms": {
    path: "/terms",
    title: `Terms of Use | ${brand}`,
    description: "Terms of use for 9thstarpropertymanagement.ca.",
  },
  "/thank-you": {
    path: "/thank-you",
    title: `Thank You | ${brand}`,
    description: "Thanks for contacting 9th Star Property Management.",
    noIndex: true,
  },
};

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return siteConfig.domain;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${siteConfig.domain}${withSlash}`;
}

export function buildMetadata(path: string, overrides?: Partial<PageMeta>) {
  const base = pageMeta[path];
  const title = overrides?.title ?? base?.title ?? `${siteConfig.name}`;
  const description = overrides?.description ?? base?.description ?? siteConfig.tagline;
  const canonical = absoluteUrl(overrides?.path ?? path);
  const noIndex = overrides?.noIndex ?? base?.noIndex;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website" as const,
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
