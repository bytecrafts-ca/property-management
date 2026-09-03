"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, heroImage } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const HERO_BASE_SCALE = 1.06;

type HeroSectionProps = {
  introReady?: boolean;
};

export function HeroSection({ introReady = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    gsap.set(bgRef.current, {
      scale: HERO_BASE_SCALE,
      filter: "brightness(1)",
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, { scale: HERO_BASE_SCALE + self.progress * 0.06 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!introReady || enteredRef.current) return;
    enteredRef.current = true;

    const copyEls = [badgeRef.current, headlineRef.current, subheadRef.current, ctaRef.current, scrollRef.current];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(bgRef.current, { scale: HERO_BASE_SCALE, filter: "brightness(1)" });

    if (reduced) {
      gsap.set(copyEls, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(copyEls, { opacity: 0, y: 24 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.55 }, 0)
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.08)
      .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.16)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55 }, 0.24)
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.32);

    return () => {
      tl.kill();
    };
  }, [introReady]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
      data-nav="dark"
      style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/10 to-black/50"
      />

      <div className="relative z-[2] flex min-h-[100svh] flex-col justify-center px-5 py-28 sm:px-8 md:px-10">
        <div className="mx-auto w-full max-w-7xl lg:max-w-3xl">
          <span
            ref={badgeRef}
            className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-label text-white backdrop-blur-sm sm:mb-6"
            style={introReady ? undefined : { opacity: 0 }}
          >
            For investors
          </span>
          <h1
            ref={headlineRef}
            className="text-display-lg max-w-4xl text-white"
            style={introReady ? undefined : { opacity: 0 }}
          >
            {siteConfig.heroHeadline}
          </h1>
          <p
            ref={subheadRef}
            className="prose-dek mt-5 max-w-xl text-white/90 sm:mt-6"
            style={introReady ? undefined : { opacity: 0 }}
          >
            {siteConfig.heroSubhead}
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            style={introReady ? undefined : { opacity: 0 }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-white/90 sm:px-8"
            >
              Get a quote
            </Link>
            <Link
              href="/properties"
              className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 sm:px-8"
            >
              Our homes
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8"
          style={introReady ? undefined : { opacity: 0 }}
        >
          <p className="text-label text-white/50">Scroll</p>
        </div>
      </div>
    </section>
  );
}
