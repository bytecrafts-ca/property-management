"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroImage } from "@/lib/site";
import { useIntroReady } from "@/components/intro-provider";

gsap.registerPlugin(ScrollTrigger);

const HERO_BASE_SCALE = 1.06;

type PageHeroProps = {
  badge?: string;
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
  showScroll?: boolean;
};

export function PageHero({
  badge,
  title,
  description,
  image = heroImage,
  children,
  showScroll = true,
}: PageHeroProps) {
  const introReady = useIntroReady();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    gsap.set(bgRef.current, { scale: HERO_BASE_SCALE });

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
    if (!introReady || enteredRef.current || !copyRef.current) return;
    enteredRef.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(copyRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(copyRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
  }, [introReady]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("nav-theme-sync"));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
      data-nav="dark"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div ref={bgRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
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

      <div className="relative z-[2] flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 md:px-10 lg:justify-center lg:pb-0">
        <div
          ref={copyRef}
          className="mx-auto w-full max-w-7xl lg:max-w-3xl"
          style={introReady ? undefined : { opacity: 0 }}
        >
          {badge && (
            <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-label text-white backdrop-blur-sm sm:mb-6">
              {badge}
            </span>
          )}
          <h1 className="text-display-lg max-w-4xl text-white">{title}</h1>
          {description && <p className="prose-dek mt-5 max-w-xl text-white/90 sm:mt-6">{description}</p>}
          {children}
        </div>

        {showScroll && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-8"
            style={introReady ? undefined : { opacity: 0 }}
          >
            <p className="text-label text-white/50">Scroll</p>
          </div>
        )}
      </div>
    </section>
  );
}
