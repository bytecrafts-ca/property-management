"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteServices } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll("[data-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <span className="pill-label mb-6 inline-block">Our services</span>
        <h2 className="text-display-sm mb-12 max-w-2xl sm:mb-16">
          What you pay us to handle.
        </h2>

        <div ref={ref} className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {siteServices.map((s) => (
            <Link key={s.number} href={s.href} data-card className="group card-photo block bg-surface">
              <div className="relative aspect-[16/10]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-label text-muted mb-2">{s.number}</p>
                  <h3 className="font-display text-xl sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted sm:text-base">{s.description}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:bg-ink group-hover:text-surface">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
