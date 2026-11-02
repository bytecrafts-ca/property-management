export const hospitableSiteUuid = "a3214232-0765-4ea0-86fb-2d53ab1de8d4";

export type StayPhoto = {
  thumb: string;
  large: string;
};

export type ShortTermStay = {
  slug: string;
  tabLabel: string;
  name: string;
  details: string;
  intro: string;
  facts: string[];
  space: string[];
  goodToKnow: string[];
  propertyId: string;
};

export const shortTermStays: ShortTermStay[] = [
  {
    slug: "3-bedroom-main",
    tabLabel: "Main floor",
    name: "Main floor, 3 bedrooms",
    details: "3 bed · 1.5 bath · sleeps 6",
    intro: "The entire main floor of a downtown Whitby bungalow, with your own front door, private deck, and backyard.",
    facts: ["Sleeps 6", "3 queen bedrooms", "1.5 baths", "Private deck", "Parking"],
    space: [
      "3 bedrooms, queen bed in each",
      "Full bath with soaker tub, plus a powder room",
      "Chef's kitchen with a quartz island that seats 3",
      "Full-size stainless appliances and dishwasher",
      "Pans, knives, dishes, coffee maker, kettle, toaster",
      "In-unit washer and dryer",
      "Open living and dining with a 55\" smart TV",
      "Primary bedroom opens to a large private deck",
      "Backyard is yours",
      "White oak floors, pot lights, slat feature wall",
      "Fast Wi-Fi, central air and heat",
    ],
    goodToKnow: [
      "Your own front door with a smart lock",
      "The 2 lower suites use a separate side entrance. No shared door, hallway, kitchen, or laundry",
      "3 steps up to the porch, then no stairs inside",
      "Quiet hours 10 pm to 8 am",
      "Garage and backyard shed are not for guest use",
    ],
    propertyId: "2541373",
  },
  {
    slug: "2-bedroom",
    tabLabel: "2 bedroom suite",
    name: "2 bedroom suite",
    details: "2 bed · 1 bath · sleeps 4",
    intro: "A private, self-contained lower-level suite with a full kitchen and your own keypad door.",
    facts: ["Sleeps 4", "2 queen bedrooms", "1 bath", "Full kitchen", "Parking"],
    space: [
      "2 bedrooms, queen bed in each",
      "Full kitchen: fridge, stove, oven, microwave",
      "Pans, knives, dishes, coffee maker, kettle, toaster",
      "New bathroom with glass walk-in shower and LED mirror",
      "Open living area with sofa, armchair, and smart TV",
      "Pot lights, wide-plank floors",
      "Fast Wi-Fi, central air and heat",
    ],
    goodToKnow: [
      "Side door on the driveway side, then your own keypad door marked 2",
      "Side entry is shared with the studio. The shared washer and dryer are there",
      "No interior connection to the main floor",
      "Lower level, one flight down. Standard windows for the level, well lit with pot lights",
      "You may hear normal household sounds from upstairs during the day",
      "No backyard. The deck belongs to the main floor",
      "Quiet hours 10 pm to 8 am",
    ],
    propertyId: "2541372",
  },
  {
    slug: "studio",
    tabLabel: "Studio",
    name: "Studio",
    details: "Queen bed · 1 bath · sleeps 2",
    intro: "A private lower-level studio with its own bathroom, kitchenette, and keypad door.",
    facts: ["Sleeps 2", "Queen bed", "1 bath", "Kitchenette", "Parking"],
    space: [
      "Queen bed",
      "Kitchenette: full-size fridge, microwave, toaster oven, coffee maker, kettle. No stove",
      "Sink, dishes, cutlery, knives",
      "New bathroom with glass walk-in shower",
      "Sofa, armchair, smart TV",
      "Pot lights, wide-plank floors",
      "Fast Wi-Fi, central air and heat",
    ],
    goodToKnow: [
      "Side door on the driveway side, then your own keypad door marked 1",
      "Side entry is shared with the 2 bedroom suite. The shared washer and dryer are there",
      "No interior connection to the main floor",
      "Lower level, one flight down. Standard windows for the level, well lit with pot lights",
      "You may hear normal household sounds from upstairs during the day",
      "No backyard. The deck belongs to the main floor",
      "Quiet hours 9 pm to 8 am",
    ],
    propertyId: "2541374",
  },
  {
    slug: "whole-home",
    tabLabel: "Whole home",
    name: "Whole home, 3 private suites",
    details: "6 bed · 3.5 bath · sleeps 12",
    intro:
      "All 3 suites under one roof for families and groups. Each suite has its own door, kitchen or kitchenette, and bathroom.",
    facts: ["Sleeps 12", "6 queen bedrooms", "3.5 baths", "2 kitchens + kitchenette", "Deck and backyard"],
    space: [
      "6 bedrooms, queen bed in each",
      "3.5 bathrooms",
      "2 full kitchens plus a kitchenette",
      "2 laundry sets",
      "Smart lock on every suite's door",
      "Main floor (sleeps 6): 3 bedrooms, full bath and powder room, chef's kitchen, private deck",
      "Lower 2 bedroom (sleeps 4): full kitchen, glass shower bath, living area with smart TV",
      "Lower studio (sleeps 2): queen bed, kitchenette with no stove, glass shower bath",
      "Large deck and backyard",
      "Driveway parking plus free street parking",
    ],
    goodToKnow: [
      "Main floor has its own front door. The lower suites share a side entry, then a keypad door into each",
      "Main floor is 3 steps up to the porch with no stairs inside. Lower suites are one flight down",
      "Quiet hours 9 pm to 8 am",
      "Garage and backyard shed are not for guest use",
    ],
    propertyId: "2541375",
  },
];

export const stayBasics = [
  "Self check-in with a smart lock. Door codes are sent 3 days before check-in",
  "Check-in 3 pm, checkout 11 am. Early check-in or late checkout when the calendar allows, just ask",
  "Your host lives nearby and replies within minutes",
  "No visits during your stay unless you ask or there is an emergency",
  "Hotel-weight linens and blackout curtains in every suite",
  "Prices include all fees. No hidden fees",
];

export const stayRules = [
  "No parties or events",
  "No smoking or vaping inside",
  "No pets",
  "Exterior cameras on the front, side entrance, and backyard. None indoors",
];

export const stayArea = [
  {
    title: "Walkable",
    items: [
      "Brock Street pubs and restaurants: The Vault Gastropub, Tap and Tankard, 12welve Bistro, Thai Mountain, Sam's Kitchen",
      "Brock Street Brewing Co",
      "Tim Hortons, Sunset Grill, Makimono Sushi",
      "Shoppers Drug Mart, Antonio's Italian Deli, Caldenese Bakery, Navona Pizzeria",
      "Whitby GO Station and Durham Region Transit",
    ],
  },
  {
    title: "5 to 10 min by car",
    items: [
      "Downtown Whitby Four Corners, library, farmers' market",
      "Iroquois Park Sports Centre and the Abilities Centre",
      "Whitby Harbour, Port Whitby Marina, Waterfront Trail, Heydenshore beach",
      "Whitby Mall, Costco, Metro, Walmart, LCBO",
      "Durham College Whitby Campus, Lakeridge Health Whitby",
      "Lynde Shores Conservation Area, Oshawa Centre",
    ],
  },
  {
    title: "10 to 20 min",
    items: [
      "Thermëa Spa Village",
      "Lakeridge Health Oshawa and Durham Regional Cancer Centre",
      "Ontario Tech University, Durham College Oshawa, Trent University Durham",
      "Tribute Communities Centre (Oshawa Generals, concerts)",
      "OPG Darlington",
      "Casino Ajax, Pickering Casino Resort, Toronto Zoo",
    ],
  },
  {
    title: "Toronto and airports",
    items: [
      "Union Station: 58 min direct on the GO train",
      "Downtown Toronto: about an hour by car",
      "Scarborough Town Centre: 25 min",
      "Pearson Airport: about 45 min by car, or GO to Union then UP Express",
      "Oshawa Executive Airport: 15 min",
    ],
  },
];

export const stayGettingAround = [
  "Whitby GO is a walk from the house. Lakeshore East line, trains every 30 min, first train 5:07 am, last train home 12:20 am",
  "Highway 401, Exit 410 (Brock St) is 2 min from the driveway. Highways 412 and 407 are 10 min",
  "Durham Region Transit stops on Consumers Dr and Brock St S",
  "Uber and Lyft pick up in 5 to 10 min",
];
