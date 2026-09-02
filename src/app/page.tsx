import { HomePageClient } from "@/components/home/home-page-client";
import listings from "../../content/listings.json";

export default function HomePage() {
  const live = listings.filter((l) => l.status === "live");
  return <HomePageClient listings={live} />;
}
