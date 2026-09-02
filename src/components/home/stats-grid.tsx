"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteStats } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const obj = { n: 0 };
    gsap.to(obj, {
      n: value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(obj.n)}${suffix}`;
      },
    });
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-stat-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
      }
    );
  }, []);

  return (
    <section className="bg-surface px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
      <div className="mx-auto max-w-7xl">
        <span className="pill-label mb-6 inline-block">By the numbers</span>
        <h2 className="text-display-sm mb-12 max-w-2xl sm:mb-16">
          Residential properties. Real investors.
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {siteStats.map((stat) => (
            <article key={stat.label} data-stat-card className="card-photo group relative aspect-[16/10]">
              <Image
                src={stat.image}
                alt=""
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="font-display text-4xl text-surface sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-surface/85">{stat.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
