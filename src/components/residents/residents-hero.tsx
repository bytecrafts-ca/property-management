"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroImage, siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

type ResidentsHeroProps = {
  onLogin: () => void;
};

export function ResidentsHero({ onLogin }: ResidentsHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    gsap.set(bgRef.current, { scale: 1.06 });
    gsap.fromTo(copyRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          if (bgRef.current) gsap.set(bgRef.current, { scale: 1.06 + self.progress * 0.05 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { tenants } = siteConfig;

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[72svh] w-full overflow-hidden sm:min-h-[78svh]"
      data-nav="dark"
      style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div ref={bgRef} aria-hidden className="absolute inset-0 z-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="" className="h-full w-full object-cover object-center" fetchPriority="high" />
      </div>
      <div aria-hidden className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-black/20 to-black/55" />

      <div
        ref={copyRef}
        className="relative z-[2] flex min-h-[72svh] flex-col justify-end px-5 pb-16 pt-28 sm:min-h-[78svh] sm:px-8 sm:pb-20 md:px-10 lg:justify-center lg:pb-0"
      >
        <div className="mx-auto w-full max-w-7xl">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-label text-white backdrop-blur-sm">
            {tenants.label}
          </span>
          <h1 className="text-display-lg max-w-3xl text-white">{tenants.headline}</h1>
          <p className="prose-dek mt-5 max-w-xl text-white/90 sm:mt-6">{tenants.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={onLogin}
              className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-white/90 sm:px-8"
            >
              Tenant login
            </button>
            <a
              href={`tel:${siteConfig.contact.emergencyPhone}`}
              className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 sm:px-8"
            >
              {tenants.emergencyCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
