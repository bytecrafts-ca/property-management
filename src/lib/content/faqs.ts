export const sharedFaqs = {
  durham: [
    {
      question: "Do you manage rentals across all of Durham Region?",
      answer:
        "Yes. We manage residential rentals in Pickering, Ajax, Whitby, Oshawa, Clarington, Bowmanville, Courtice, Brooklin, and nearby communities.",
    },
    {
      question: "What property types do you manage?",
      answer:
        "Houses, duplexes, townhomes, and condo units owned by landlords and investors. Building-wide condo corporation management is a different service and not our focus.",
    },
    {
      question: "How do I get started?",
      answer:
        "Request a free rental analysis or call 416-834-3587. We review the property, discuss goals, and outline onboarding steps.",
    },
    {
      question: "Do you help with vacant units?",
      answer:
        "Yes. We handle pricing guidance, marketing, showings, screening, and lease-up for vacant Durham rentals.",
    },
    {
      question: "Can you manage if I live outside Durham?",
      answer:
        "Yes. Many owners live in Toronto, elsewhere in Ontario, or abroad. Local vendor coverage and clear reporting matter more than living next door.",
    },
    {
      question: "Do you only work with large portfolios?",
      answer:
        "No. We work with owners of a single rental and owners with multiple Durham units. Scope is confirmed before onboarding.",
    },
    {
      question: "How fast do you respond to owner questions?",
      answer:
        "We aim for prompt replies during business hours. Emergencies affecting habitability are prioritized. Exact response commitments are confirmed in your agreement.",
    },
    {
      question: "Is 9th Star a Durham-focused company?",
      answer:
        "Yes. The public site and operations focus on Durham Region and nearby east GTA communities where we can respond reliably.",
    },
  ],
  fees: [
    {
      question: "How much do property managers charge in Durham?",
      answer:
        "Fees are usually a percentage of rent and depend on services and property type. Ask for a written quote. Online ranges without an inspection are only estimates.",
    },
    {
      question: "Is there a placement fee?",
      answer:
        "Some management agreements include placement in the monthly fee. Others bill placement separately on turnover. We explain this before you sign.",
    },
    {
      question: "What is included in monthly management?",
      answer:
        "Typical inclusions are rent collection, tenant communication, maintenance coordination, and reporting. Confirm renewals, inspections, and tribunal support in writing.",
    },
    {
      question: "Do condo units cost more to manage?",
      answer:
        "Sometimes. Board rules, status certificates, and elevator bookings add steps. Pricing depends on the unit and building requirements.",
    },
    {
      question: "Can I get a free rental analysis first?",
      answer:
        "Yes. Use the free rental analysis form. You get pricing guidance and next steps without a hard sell.",
    },
  ],
  tenants: [
    {
      question: "How do tenants submit maintenance requests?",
      answer:
        "Tenants can use the tenant portal or maintenance request page. For floods, no heat, or lockouts, call 416-834-3587 immediately.",
    },
    {
      question: "How do tenants pay rent?",
      answer:
        "Follow the method in your lease or tenant portal. Contact us if you need current payment instructions.",
    },
    {
      question: "Can tenants tour available rentals online?",
      answer:
        "Yes. Browse available rentals on the site, then contact us to schedule a showing for live listings.",
    },
  ],
  process: [
    {
      question: "What happens after I hire 9th Star?",
      answer:
        "Onboarding usually includes property details, condition notes, rent strategy, listing if vacant, screening, lease, and ongoing management with monthly reporting.",
    },
    {
      question: "Who handles emergency repairs?",
      answer:
        "Urgent habitability issues are triaged quickly and assigned to vendors. Owners are updated on scope and cost according to the agreement.",
    },
    {
      question: "Do you handle lease renewals?",
      answer:
        "Yes. We track end dates, discuss options with owners, and process renewals or notices under Ontario rules. This is operational support, not legal advice.",
    },
    {
      question: "Can you help with notices or evictions?",
      answer:
        "We can support documentation and process coordination. Tribunal outcomes and legal strategy require qualified professional advice when needed.",
    },
  ],
  cities: [
    {
      question: "Do you manage condos in Pickering and Ajax?",
      answer:
        "Yes. Unit-level condo rental management is available in Pickering, Ajax, Whitby, Oshawa, and other Durham cities we serve.",
    },
    {
      question: "Do you cover Bowmanville and Courtice?",
      answer:
        "Yes. Clarington communities including Bowmanville and Courtice are part of our service area.",
    },
    {
      question: "Is Brooklin included?",
      answer:
        "Yes. Brooklin and nearby Whitby-area communities are covered for residential rental management.",
    },
  ],
} as const;

export type FaqItem = { question: string; answer: string };
