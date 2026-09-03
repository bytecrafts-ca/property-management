import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo/meta";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName || siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.nap.email,
    telephone: siteConfig.nap.phoneDisplay,
    areaServed: siteConfig.serviceAreaCities.map((city) => ({
      "@type": "City",
      name: `${city}, Ontario`,
    })),
  };
}

export function localBusinessSchema() {
  const base = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.nap.name,
    url: siteConfig.domain,
    image: absoluteUrl(siteConfig.images.homes.detached),
    telephone: siteConfig.nap.phoneDisplay,
    email: siteConfig.nap.email,
    priceRange: "$$",
    areaServed: siteConfig.serviceAreaCities.map((city) => ({
      "@type": "City",
      name: `${city}, Ontario`,
    })),
    sameAs: siteConfig.googleBusinessProfileUrl.startsWith("http")
      ? [siteConfig.googleBusinessProfileUrl]
      : undefined,
  };

  if (!siteConfig.nap.addressDisplay) {
    return {
      ...base,
      address: {
        "@type": "PostalAddress",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    };
  }

  return {
    ...base,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.nap.address,
      addressRegion: "ON",
      addressCountry: "CA",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.domain}/guides?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "RealEstateAgent",
      name: siteConfig.name,
    },
    areaServed: (input.areaServed ?? siteConfig.serviceAreaCities).map((city) => ({
      "@type": "City",
      name: `${city}, Ontario`,
    })),
    url: absoluteUrl(input.path),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
