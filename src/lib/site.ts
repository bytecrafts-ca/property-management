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
    modern:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    contactHero:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85",
    // Same signature hero used on home/residents so request feels on-brand
    requestHero: heroImage,
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

export const siteReviews = [
  {
    quote:
      "My family and I lived in one of Azfar’s properties for four years until we were able to purchase our own home. Azfar was a great landlord and was very attentive. He was easy to communicate with and if there was ever a problem with the property, he would be quick to send out help or even come fix the problem himself. Overall a pleasant experience.",
    name: "Michelle Potvin",
    role: "Former tenant",
  },
  {
    quote: "We have rented with them for three years. Issues get handled properly and communication is always clear.",
    name: "Daniel K.",
    role: "Tenant, Riverside",
  },
  {
    quote: "I live in Dubai. They handle everything from tenant calls to form filings. I just read the monthly report.",
    name: "Amir H.",
    role: "Property owner",
  },
  {
    quote: "Fast replies, fair handling, and tenants who actually want to stay. That makes my job as an owner simple.",
    name: "Priya N.",
    role: "Property owner",
  },
  {
    quote: "Had a heating issue in January. Called once and it was sorted the same day. Could not ask for more.",
    name: "James T.",
    role: "Tenant, Beaches",
  },
  {
    quote: "Professional from screening through move-in. They treat tenants well and that shows in how long people stay.",
    name: "Elena R.",
    role: "Tenant, Midtown",
  },
  {
    quote: "Our fridge stopped working on a Friday night. They had a repair booked before noon the next day.",
    name: "Marcus L.",
    role: "Tenant, Danforth",
  },
  {
    quote: "Clear monthly statements, no surprises, and tenants who renew. Exactly what I needed from a manager.",
    name: "Helen W.",
    role: "Property owner",
  },
] as const;

export const siteConfig = {
  name: "9th Star Property Management",
  brandShort: "9th Star",
  legalName: "[CLIENT_LEGAL_NAME]",
  fullName: "9th Star Property Management",
  domain: "https://9thstarpropertymanagement.ca",
  tagline: "Property management for investors who rent out residential homes.",
  heroHeadline: "You own the property. We run the rental.",
  heroSubhead:
    "Screening, complaints, maintenance, rent collection. One monthly bill. One report. For investors with houses, duplexes, and condo units across the GTA.",
  market: "Greater Toronto Area",
  founded: "[YEAR]",
  hours: "[CLIENT_HOURS]",
  googleBusinessProfileUrl: "[GBP_URL]",
  ga4Id: "[GA4_ID]",
  gscVerification: "[GSC_VERIFICATION]",
  dek: "You own a residential property. We screen tenants, handle complaints, coordinate repairs, and collect rent. You get a statement and one bill at the end of the month.",
  pinnedLines: ["WE RUN", "THE RENTAL.", "YOU GET", "THE REPORT."],
  pinnedHorizontal: "Screening. Complaints. One monthly bill.",
  ourStory: {
    label: "Our story",
    headline: "We started as owners.",
    paragraphs: [
      "Our work in real estate began with our own holdings. Over the years we acquired residential properties and managed them ourselves, from daily tenant issues to major renovations aimed at stronger rental income, cash flow, and capital appreciation.",
      "That is the experience we now extend to other investors. End-to-end management: tenant placement, day-to-day operations, compliance, form filings, capital projects, and clear monthly reporting. A modest share of rent for a portfolio that runs without you on the ground.",
      "We built this for investors who live abroad or cannot manage the rental themselves. You stay informed. We carry the work.",
      "We hold the same standard for the tenants living in our properties. Tenants get fast responses, clear communication, and issues handled immediately. That keeps tenants happy, turnover low, and rentals stable for the owners we serve.",
    ],
    caption: "Full-service management for owners who want the rental handled, not another job added to their week.",
    cta: "Talk to us",
    image: siteImages.homes.modern,
  },
  tenants: {
    label: "For tenants",
    headline: "Good homes. Good service.",
    body: "We manage properties for owners, and we manage the rental experience for the tenants living in our properties with the same care. Maintenance requests answered quickly. Complaints handled properly. Clear communication when something needs attention.",
    note: "That is why so many of our tenants stay. When you rent one of our homes, you are not left waiting.",
    cta: "Submit a request",
    emergencyCta: "Call for emergencies",
  },
  contact: {
    phone: "416-834-3587",
    email: "info@9thstarpropertymanagement.ca",
    address: "",
    emergencyPhone: "416-834-3587",
    heroImage: siteImages.homes.contactHero,
  },
  nap: {
    name: "9th Star Property Management",
    phoneDisplay: "416-834-3587",
    phoneTel: "4168343587",
    email: "info@9thstarpropertymanagement.ca",
    address: "[CLIENT_STREET], [CLIENT_CITY], ON [POSTAL]",
    addressDisplay: false,
  },
  serviceAreaLabel: "Durham Region",
  serviceAreaCities: [
    "Pickering",
    "Ajax",
    "Whitby",
    "Oshawa",
    "Clarington",
    "Bowmanville",
    "Courtice",
    "Brooklin",
    "Newcastle",
    "Scugog",
    "Uxbridge",
  ],
  nav: [
    { label: "Homes", href: "/properties" },
    { label: "Tenants", href: "/residents" },
    { label: "Contact", href: "/contact" },
  ],
  navActions: [
    { label: "Get a quote", href: "/contact", variant: "ghost" as const },
    { label: "Request", href: "/request", variant: "solid" as const },
  ],
  services: siteServices,
  reviews: siteReviews,
  images: siteImages,
} as const;
