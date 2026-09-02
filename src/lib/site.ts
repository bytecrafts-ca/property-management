import { withBasePath } from "./base-path";

export const heroImage = withBasePath("/hero-bg.jpg");

export const siteImages = {
  toronto: {
    skyline: heroImage,
    cnTower:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
    waterfront:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  homes: {
    detached:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    living:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    kitchen:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    bedroom:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    porch:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    duplex:
      "https://images.unsplash.com/photo-1605276374101-dee0dd778822?auto=format&fit=crop&w=1200&q=80",
  },
} as const;

export const siteStats = [
  { value: 85, suffix: "+", label: "Homes under management", image: siteImages.homes.detached },
  { value: 340, suffix: "+", label: "Tenants screened", image: siteImages.homes.living },
  { value: 24, suffix: "hr", label: "Response to owners", image: siteImages.homes.kitchen },
  { value: 98, suffix: "%", label: "Rent collected on time", image: siteImages.homes.porch },
] as const;

export const siteServices = [
  {
    number: "01",
    title: "Tenant screening",
    description: "Credit, references, employment. We place tenants you can trust in your property.",
    image: siteImages.homes.living,
    href: "/contact",
  },
  {
    number: "02",
    title: "Rent collection",
    description: "We collect, deposit, and follow up. You see it on your monthly statement.",
    image: siteImages.homes.kitchen,
    href: "/contact",
  },
  {
    number: "03",
    title: "Complaints and issues",
    description: "Noise, damage, lease problems. Tenants call us. Not you.",
    image: siteImages.homes.bedroom,
    href: "/contact",
  },
  {
    number: "04",
    title: "Maintenance",
    description: "Repairs, vendors, emergencies. We dispatch and send you the receipt.",
    image: siteImages.homes.detached,
    href: "/contact",
  },
] as const;

export const siteConfig = {
  name: "[CLIENT_NAME]",
  fullName: "[CLIENT_NAME] Property Management",
  tagline: "Property management for investors who rent out residential homes.",
  heroHeadline: "You own the property. We run the rental.",
  heroSubhead:
    "Screening, complaints, maintenance, rent collection. One monthly bill. One report. For investors with houses, duplexes, and condo units across the GTA.",
  market: "Greater Toronto Area",
  dek: "You own a residential property. We screen tenants, handle complaints, coordinate repairs, and collect rent. You get a statement and one bill at the end of the month.",
  pinnedLines: ["WE RUN", "THE RENTAL.", "YOU GET", "THE REPORT."],
  pinnedHorizontal: "Screening. Complaints. One monthly bill.",
  contact: {
    phone: "[CLIENT_PHONE]",
    email: "[CLIENT_EMAIL]",
    address: "[CLIENT_ADDRESS]",
    emergencyPhone: "[CLIENT_EMERGENCY_PHONE]",
  },
  nav: [
    { label: "Rentals", href: "/properties" },
    { label: "Tenants", href: "/residents" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  navActions: [
    { label: "Get a quote", href: "/contact", variant: "ghost" as const },
    { label: "Request", href: "/request", variant: "solid" as const },
  ],
  stats: siteStats,
  services: siteServices,
  images: siteImages,
} as const;
