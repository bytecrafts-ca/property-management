export type KeywordPage = {
  path: string;
  primary: string;
  secondary: string[];
  intent: "commercial" | "informational" | "navigational";
  internalLinks: string[];
};

export const keywordMap: KeywordPage[] = [
  {
    path: "/",
    primary: "property management Durham Region",
    secondary: ["Durham property management", "property managers Durham Ontario"],
    intent: "commercial",
    internalLinks: ["/property-management-durham", "/services", "/free-rental-analysis", "/areas-we-serve"],
  },
  {
    path: "/property-management-durham",
    primary: "property management Durham Region",
    secondary: [
      "Durham property management",
      "property management company Durham",
      "rental property management Durham",
      "best property management company Durham Region",
    ],
    intent: "commercial",
    internalLinks: [
      "/property-management-pickering",
      "/property-management-ajax",
      "/property-management-whitby",
      "/property-management-oshawa",
      "/services/residential-property-management",
      "/free-rental-analysis",
    ],
  },
  {
    path: "/property-management-pickering",
    primary: "property management Pickering",
    secondary: ["Pickering property management company", "condo property management Pickering"],
    intent: "commercial",
    internalLinks: ["/services/condo-property-management", "/services/tenant-placement", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-ajax",
    primary: "property management Ajax",
    secondary: ["Ajax property management", "rental management company Ajax"],
    intent: "commercial",
    internalLinks: ["/services/residential-property-management", "/services/tenant-screening", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-whitby",
    primary: "property management Whitby",
    secondary: ["Whitby property managers", "landlord property management Whitby"],
    intent: "commercial",
    internalLinks: ["/services/investor-property-management", "/services/maintenance-coordination", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-oshawa",
    primary: "property management Oshawa",
    secondary: ["Oshawa property management company", "tenant placement Oshawa"],
    intent: "commercial",
    internalLinks: ["/services/tenant-placement", "/services/tenant-screening", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-clarington",
    primary: "property management Clarington",
    secondary: ["Clarington rental management", "hire a property manager Clarington"],
    intent: "commercial",
    internalLinks: ["/services/residential-property-management", "/services/rent-collection-financial-reporting", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-bowmanville",
    primary: "property management Bowmanville",
    secondary: ["Bowmanville property managers", "rental property management Bowmanville"],
    intent: "commercial",
    internalLinks: ["/services/tenant-placement", "/services/maintenance-coordination", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-courtice",
    primary: "property management Courtice",
    secondary: ["Courtice property management", "landlord property management Courtice"],
    intent: "commercial",
    internalLinks: ["/services/residential-property-management", "/services/lease-renewals-evictions", "/property-management-durham", "/contact"],
  },
  {
    path: "/property-management-brooklin",
    primary: "property management Brooklin",
    secondary: ["Brooklin property management", "Whitby Brooklin rental management"],
    intent: "commercial",
    internalLinks: ["/services/condo-property-management", "/services/investor-property-management", "/property-management-durham", "/contact"],
  },
];

export function getKeywordForPath(path: string) {
  return keywordMap.find((item) => item.path === path);
}
