export type Listing = {
  id: string;
  slug: string;
  title: string;
  address: string;
  unit: string;
  neighbourhood: string;
  type: string;
  beds: number;
  baths: number;
  rent?: number;
  images: string[];
  status: "live" | "history";
};

const listings: Listing[] = [];

export default listings;
