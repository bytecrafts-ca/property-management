"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { ourStory } = siteConfig;

  return (
    <section
      ref={sectionRef}
      className="border-b border-line bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10"
      data-nav="light"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div ref={copyRef}>
          <span className="pill-label mb-6 inline-block">{ourStory.label}</span>
          <h2 className="text-display-sm mb-8 max-w-lg">{ourStory.headline}</h2>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-[1.0625rem] sm:leading-[1.75]">
            {ourStory.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full border border-line bg-surface px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-soft"
          >
            {ourStory.cta}
          </Link>
        </div>

        <div ref={imageRef} className="relative">
          <div className="card-photo relative aspect-[4/5] sm:aspect-[5/6]">
            <Image
              src={ourStory.image}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{ourStory.caption}</p>
        </div>
      </div>
    </section>
  );
}
