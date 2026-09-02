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
    description: "Noise, damage, lease problems. We respond fast and handle it. Tenants call us. Not you.",
    image: siteImages.homes.bedroom,
    href: "/contact",
  },
  {
    number: "04",
    title: "Maintenance",
    description: "Repairs, vendors, emergencies. We dispatch quickly and send you the receipt.",
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
  ourStory: {
    label: "Our story",
    headline: "We started as owners.",
    paragraphs: [
      "Our work in real estate began with our own holdings. Over the years we acquired residential properties and managed them ourselves, from daily tenant issues to major renovations aimed at stronger rental income, cash flow, and long-term value.",
      "That is the experience we now extend to other investors. End-to-end management: tenant placement, day-to-day operations, compliance, form filings, capital projects, and clear monthly reporting. A modest share of rent for a portfolio that runs without you on the ground.",
      "We built this for Canadian investors who live abroad or cannot manage the rental themselves. You stay informed. We carry the work.",
      "We hold the same standard for the people living in those homes. Tenants get fast responses, clear communication, and issues handled properly. That keeps people happy, turnover low, and rentals stable for the owners we serve.",
    ],
    caption: "Full-service management for owners who want the rental handled, not another job added to their week.",
    cta: "Talk to us",
    image: siteImages.homes.duplex,
  },
  tenants: {
    label: "For tenants",
    headline: "Good homes. Good service.",
    body: "We manage properties for owners, and we manage the rental experience for the people living in them with the same care. Maintenance requests answered quickly. Complaints handled properly. Clear communication when something needs attention.",
    note: "That is why so many of our tenants stay. When you rent one of our homes, you are not left waiting.",
    cta: "Submit a request",
    emergencyCta: "Call for emergencies",
  },
  contact: {
    phone: "[CLIENT_PHONE]",
    email: "[CLIENT_EMAIL]",
    address: "[CLIENT_ADDRESS]",
    emergencyPhone: "[CLIENT_EMERGENCY_PHONE]",
  },
  nav: [
    { label: "Rentals", href: "/properties" },
    { label: "Tenants", href: "/residents" },
    { label: "Contact", href: "/contact" },
  ],
  navActions: [
    { label: "Get a quote", href: "/contact", variant: "ghost" as const },
    { label: "Request", href: "/request", variant: "solid" as const },
  ],
  services: siteServices,
  images: siteImages,
} as const;
