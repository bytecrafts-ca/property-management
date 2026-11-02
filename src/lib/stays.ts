export const hospitableSiteUuid = "a3214232-0765-4ea0-86fb-2d53ab1de8d4";

export type ShortTermStay = {
  slug: string;
  name: string;
  details: string;
  summary: string;
  propertyId: string;
};

export const shortTermStays: ShortTermStay[] = [
  {
    slug: "2-bedroom",
    name: "2 bedroom unit",
    details: "2 bed · 1 bath",
    summary: "Room for a small family or two couples.",
    propertyId: "2541372",
  },
  {
    slug: "1-bedroom",
    name: "1 bedroom unit",
    details: "1 bed · 1 bath",
    summary: "A quiet place for solo trips or couples.",
    propertyId: "2541374",
  },
  {
    slug: "3-bedroom-main",
    name: "3 bedroom main floor",
    details: "3 bed · 1.5 bath",
    summary: "The main floor, with space to spread out.",
    propertyId: "2541373",
  },
  {
    slug: "whole-home",
    name: "Whole home",
    details: "Entire house",
    summary: "The full house for bigger groups and family visits.",
    propertyId: "2541375",
  },
];
