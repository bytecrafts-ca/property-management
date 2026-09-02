"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site";
import { IntroSequence } from "@/components/home/intro-sequence";
import { HeroSection } from "@/components/home/hero-section";
import { PinnedFillText, PinnedFillWord } from "@/components/home/pinned-fill-text";
import { InvestorSection } from "@/components/home/investor-section";
import { StatsGrid } from "@/components/home/stats-grid";
import { ServiceCards } from "@/components/home/service-cards";
import { FeaturedUnits } from "@/components/home/featured-units";
import { ResidentsStrip } from "@/components/home/residents-strip";

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
  const [introDone, setIntroDone] = useState(false);
  const refreshed = useRef(false);

  useEffect(() => {
    if (introDone && !refreshed.current) {
      refreshed.current = true;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [introDone]);

  return (
    <>
      {!introDone && <IntroSequence onComplete={() => setIntroDone(true)} />}
      <HeroSection introReady={introDone} />
      <InvestorSection />
      <PinnedFillText lines={[...siteConfig.pinnedLines]} variant="light" />
      <StatsGrid />
      <ServiceCards />
      <FeaturedUnits listings={listings} />
      <PinnedFillWord word="SIMPLE" subtitle="One property. One manager. One bill at the end of the month." />
      <ResidentsStrip />
      <PinnedFillText lines={[siteConfig.pinnedHorizontal]} variant="light" direction="horizontal" />
    </>
  );
}

gsap.registerPlugin(ScrollTrigger);
