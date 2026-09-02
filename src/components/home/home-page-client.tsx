"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site";
import { useIntroReady } from "@/components/intro-provider";
import { HeroSection } from "@/components/home/hero-section";
import { PinnedFillText, PinnedFillWord } from "@/components/home/pinned-fill-text";
import { InvestorSection } from "@/components/home/investor-section";
import { OurStorySection } from "@/components/home/our-story-section";
import { ReviewsMarquee } from "@/components/home/reviews-marquee";
import { ServiceCards } from "@/components/home/service-cards";
import { FeaturedUnits } from "@/components/home/featured-units";
import { ResidentsStrip } from "@/components/home/residents-strip";

gsap.registerPlugin(ScrollTrigger);

type Listing = {
  id: string;
  slug: string;
  address: string;
  neighbourhood: string;
  beds: number;
  baths: number;
  rent: number;
  images: string[];
};

export function HomePageClient({ listings }: { listings: Listing[] }) {
  const introReady = useIntroReady();
  const refreshed = useRef(false);

  useEffect(() => {
    if (introReady && !refreshed.current) {
      refreshed.current = true;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [introReady]);

  return (
    <>
      <HeroSection introReady={introReady} />
      <InvestorSection />
      <PinnedFillText lines={[...siteConfig.pinnedLines]} variant="light" />
      <OurStorySection />
      <ReviewsMarquee />
      <ServiceCards />
      <FeaturedUnits listings={listings} />
      <PinnedFillWord word="SIMPLE" subtitle="One property. One manager. One bill at the end of the month." />
      <ResidentsStrip />
      <PinnedFillText lines={[siteConfig.pinnedHorizontal]} variant="light" direction="horizontal" />
    </>
  );
}
