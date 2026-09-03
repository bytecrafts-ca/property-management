import { siteImages } from "@/lib/site";

export const seoCities = [
  {
    slug: "pickering",
    name: "Pickering",
    path: "/property-management-pickering",
    primaryKeyword: "property management Pickering",
    neighbourhoods: ["Downtown Pickering", "Rouge Park", "Highbush", "Duffin Heights", "Liverpool", "Rosebank"],
    housingMix:
      "Detached homes near the lake, townhomes inland, and condo inventory around the Town Centre and GO corridor.",
    localNotes:
      "Pickering landlords often deal with GO-commuter tenant demand and lake-adjacent pricing pressure. Units near the Town Centre and Liverpool tend to lease faster when priced to the corridor, not to Toronto asking rents.",
    landlordConcerns: [
      "Pricing correctly against Ajax and Scarborough competition",
      "Condo board rules and special assessments",
      "Turnover near transit nodes",
    ],
  },
  {
    slug: "ajax",
    name: "Ajax",
    path: "/property-management-ajax",
    primaryKeyword: "property management Ajax",
    neighbourhoods: ["Downtown Ajax", "Audley North", "Hermitage", "Lakeside", "Nottingham", "South Ajax"],
    housingMix: "Family detached stock, newer townhouse communities, and a growing mix of purpose-built and condo rentals.",
    localNotes:
      "Ajax sees steady demand from families who want Durham schools and a manageable commute. Vacant homes sit longer when owners overprice after renovations without checking current Ajax comps.",
    landlordConcerns: [
      "Family tenant screening and lease length",
      "Yard and exterior maintenance in detached stock",
      "Winter heating and older mechanicals",
    ],
  },
  {
    slug: "whitby",
    name: "Whitby",
    path: "/property-management-whitby",
    primaryKeyword: "property management Whitby",
    neighbourhoods: [
      "Downtown Whitby",
      "Brooklin adjacent Whitby",
      "Williamsburg",
      "Pringle Creek",
      "Port Whitby",
      "Lynde Creek",
    ],
    housingMix: "Established detached neighbourhoods, waterfront-adjacent rentals, and mid-density townhomes.",
    localNotes:
      "Whitby owners often want hands-off management while keeping long-term tenants. Port Whitby and downtown stock attract different renter profiles, so listing strategy has to match the street, not the town average.",
    landlordConcerns: [
      "Long-term tenant retention",
      "Waterfront vs inland rent expectations",
      "Maintenance response for older homes",
    ],
  },
  {
    slug: "oshawa",
    name: "Oshawa",
    path: "/property-management-oshawa",
    primaryKeyword: "property management Oshawa",
    neighbourhoods: ["Downtown Oshawa", "North Oshawa", "Lakeview", "Kedron", "Vanier", "Farewell"],
    housingMix: "Student and workforce rentals near campus and hospitals, plus family homes in North Oshawa and Kedron.",
    localNotes:
      "Oshawa rental demand is mixed. Student-heavy pockets need tighter screening and clearer house rules. Family areas need different pricing and marketing. One generic listing approach fails both.",
    landlordConcerns: [
      "Tenant screening quality",
      "Unit wear in higher-turnover areas",
      "Clear communication when issues escalate",
    ],
  },
  {
    slug: "clarington",
    name: "Clarington",
    path: "/property-management-clarington",
    primaryKeyword: "property management Clarington",
    neighbourhoods: ["Bowmanville", "Courtice", "Newcastle", "Orono", "Wilmot Creek", "Samuel Williams"],
    housingMix:
      "Mostly detached and townhomes across Bowmanville, Courtice, and Newcastle, with fewer condo towers than west Durham.",
    localNotes:
      "Clarington landlords often live farther from the property. Response time and local vendor coverage matter more than slick apps. Courtice and Bowmanville rentals need local pricing, not Whitby assumptions.",
    landlordConcerns: [
      "Distance management for out-of-town owners",
      "Vendor coverage east of Oshawa",
      "Accurate rent setting by community",
    ],
  },
  {
    slug: "bowmanville",
    name: "Bowmanville",
    path: "/property-management-bowmanville",
    primaryKeyword: "property management Bowmanville",
    neighbourhoods: ["Downtown Bowmanville", "Northglen", "Soper Creek", "Waverley", "Maple Grove", "Liberty"],
    housingMix: "Family detached homes, newer subdivisions, and limited multi-residential inventory.",
    localNotes:
      "Bowmanville leases well to households that want space and a quieter pace than west Durham. Owners who leave a vacant house sitting at last year's rent lose weeks of income.",
    landlordConcerns: [
      "Vacancy cost on larger homes",
      "Exterior and seasonal maintenance",
      "Finding reliable long-term tenants",
    ],
  },
  {
    slug: "courtice",
    name: "Courtice",
    path: "/property-management-courtice",
    primaryKeyword: "property management Courtice",
    neighbourhoods: ["South Courtice", "North Courtice", "Trulls Road area", "Townline", "Bloor corridor", "Prestonvale"],
    housingMix: "Primarily suburban detached and townhomes with strong family renter demand.",
    localNotes:
      "Courtice is a practical rental market. Clean presentation, fair rent, and fast issue handling keep good tenants longer than flashy listing photos alone.",
    landlordConcerns: [
      "Family-oriented screening",
      "Keeping maintenance tickets moving",
      "Avoiding long vacancies between leases",
    ],
  },
  {
    slug: "brooklin",
    name: "Brooklin",
    path: "/property-management-brooklin",
    primaryKeyword: "property management Brooklin",
    neighbourhoods: ["Brooklin Village", "Ashburn Road area", "Winchester", "Carnwith", "St. Thomas", "Baldwin"],
    housingMix: "Newer community feel with detached homes and townhomes popular with family renters.",
    localNotes:
      "Brooklin attracts renters who want Whitby-area amenities with a village feel. Newer builds still need warranty coordination and clear owner communication when defects show up.",
    landlordConcerns: [
      "Builder warranty coordination",
      "HOA or community rules where applicable",
      "Pricing newer homes against older Whitby stock",
    ],
  },
] as const;

export const seoServices = [
  {
    slug: "residential-property-management",
    title: "Residential property management",
    path: "/services/residential-property-management",
    primaryKeyword: "residential property management Durham",
    summary: "Full management for houses, duplexes, and condo units owned by Durham landlords and investors.",
    image: siteImages.homes.detached,
    body: [
      "Residential property management in Durham Region means running the rental like an operating asset, not a weekend chore. We cover tenant communication, rent follow-up, maintenance coordination, and reporting for houses, duplexes, townhomes, and individual condo units.",
      "Owners stay informed on decisions that affect spend and occupancy. Day-to-day tickets do not need to land on your phone at midnight unless you want that level of involvement.",
      "This service is built for Durham landlords who want local coverage across Pickering, Ajax, Whitby, Oshawa, and Clarington communities.",
    ],
  },
  {
    slug: "condo-property-management",
    title: "Condo property management",
    path: "/services/condo-property-management",
    primaryKeyword: "condo property management Durham",
    summary: "Unit-level condo rental management, board rule compliance, and tenant coordination.",
    image: siteImages.homes.living,
    body: [
      "Condo property management for Durham investors is unit-level rental management, not condo corporation board management. We help owners lease units, screen tenants, and stay aligned with building rules that affect move-ins, renovations, and occupancy.",
      "Pickering and Ajax condo stock near GO nodes behaves differently from quieter Whitby or Oshawa buildings. Listing strategy and tenant expectations should match the building, not a generic GTA template.",
      "We coordinate with tenants on board requirements and keep owners updated when status certificates, elevator bookings, or rule changes affect the rental.",
    ],
  },
  {
    slug: "tenant-placement",
    title: "Tenant placement",
    path: "/services/tenant-placement",
    primaryKeyword: "tenant placement Durham",
    summary: "Marketing, showings, applications, and lease-up for vacant Durham rentals.",
    image: siteImages.homes.porch,
    body: [
      "Tenant placement in Durham starts with honest pricing. Overpricing a vacant Whitby or Bowmanville home to match last year's hopes usually costs more than a management fee.",
      "We prepare listing materials, market the home, handle showings, collect applications, and move qualified applicants through screening to lease signing.",
      "If your unit is empty now, speed and accuracy matter. Empty months compound fast along the Pickering to Clarington corridor.",
    ],
  },
  {
    slug: "tenant-screening",
    title: "Tenant screening",
    path: "/services/tenant-screening",
    primaryKeyword: "tenant screening Ontario",
    summary: "Credit, income, references, and employment checks before you hand over keys.",
    image: siteImages.homes.kitchen,
    body: [
      "Tenant screening protects cash flow more than almost any other landlord habit. We review applications for income strength, credit patterns, employment, and rental references before recommending approval.",
      "Ontario landlords need a consistent process. Rushing because someone offers cash up front is how bad tenancies start.",
      "Screening supports placement across Durham cities and pairs with clear lease onboarding once an applicant is approved.",
    ],
  },
  {
    slug: "maintenance-coordination",
    title: "Maintenance coordination",
    path: "/services/maintenance-coordination",
    primaryKeyword: "rental maintenance Durham",
    summary: "Work orders, vetted vendors, and clear owner updates when something breaks.",
    image: siteImages.homes.bedroom,
    body: [
      "Maintenance coordination is the difference between a managed rental and an owner who is still the after-hours dispatcher. Tenants report issues through a clear path. We triage urgency and assign vendors.",
      "Durham coverage matters when heat fails in Courtice or a leak hits an Ajax townhome. Local vendor timing beats a distant call centre script.",
      "Owners get updates on scope and cost according to the management agreement, so surprises stay limited.",
    ],
  },
  {
    slug: "rent-collection-financial-reporting",
    title: "Rent collection and reporting",
    path: "/services/rent-collection-financial-reporting",
    primaryKeyword: "rent collection property management Durham",
    summary: "Rent follow-up, deposits, and monthly statements you can actually read.",
    image: siteImages.homes.modern,
    body: [
      "Rent collection and reporting should be boring in the best way. Tenants know how to pay. Late rent gets follow-up. Owners receive statements that show what came in and what went out.",
      "Clear ledgers help Durham landlords make decisions on repairs, renewals, and whether a unit is performing.",
      "If you cannot read a sample statement, ask for one before you sign any management agreement.",
    ],
  },
  {
    slug: "lease-renewals-evictions",
    title: "Lease renewals and notices",
    path: "/services/lease-renewals-evictions",
    primaryKeyword: "lease renewals Durham landlords",
    summary: "Renewals, notices, and process support. Not legal advice. Clear owner updates.",
    image: siteImages.homes.duplex,
    body: [
      "Lease renewals keep good tenants in place and reduce vacancy cost. We track end dates, discuss options with owners, and process renewals under Ontario rules.",
      "When a tenancy becomes contested, process discipline matters. We can support notices and documentation. Tribunal strategy and legal advice belong with a qualified professional.",
      "This page is operational information for Durham landlords, not legal advice.",
    ],
  },
  {
    slug: "investor-property-management",
    title: "Investor property management",
    path: "/services/investor-property-management",
    primaryKeyword: "investor property management Durham",
    summary: "Hands-off management for owners who live abroad or hold multiple Durham rentals.",
    image: siteImages.homes.detached,
    body: [
      "Investor property management is for owners who need a Durham operator, not another inbox full of tenant texts. Whether you hold one Oshawa rental or several homes across Ajax and Whitby, the goal is consistent process and clear reporting.",
      "Out-of-town and overseas owners especially need local eyes for make-ready work, vendor quality, and vacancy pricing.",
      "Ask us for portfolio-friendly onboarding if you are adding Durham doors over time.",
    ],
  },
] as const;

export type CitySlug = (typeof seoCities)[number]["slug"];
export type ServiceSlug = (typeof seoServices)[number]["slug"];

export const serviceAreaCities = [
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
] as const;
