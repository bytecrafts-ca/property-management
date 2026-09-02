"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  lines: string[];
  variant?: "dark" | "light";
  subtitle?: string;
  scrollHeight?: string;
  direction?: "vertical" | "horizontal";
};

export function PinnedFillText({
  lines,
  variant = "dark",
  subtitle,
  scrollHeight,
  direction = "vertical",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const height = scrollHeight || (mobile ? "220vh" : "320vh");

    if (wrapRef.current) wrapRef.current.style.height = height;

    if (!wrapRef.current || !fillRef.current) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        fillRef.current!.style.setProperty("--p", "100%");
        if (subRef.current) subRef.current.style.opacity = "1";
        if (lineRef.current) lineRef.current.style.width = "100%";
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        fillRef.current,
        { "--p": "0%" },
        { "--p": "100%", ease: "none", duration: 1 }
      );

      if (lineRef.current) {
        tl.fromTo(lineRef.current, { width: "0%" }, { width: "100%", ease: "none", duration: 1 }, 0);
      }

      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.15 }, 0.75);
      }
    }, wrapRef);

    return () => ctx.revert();
  }, [scrollHeight, lines]);

  const bg = variant === "dark" ? "bg-ink" : "bg-surface";
  const base = variant === "dark" ? "text-ink-soft" : "text-line";
  const fill = variant === "dark" ? "text-paper" : "text-ink";
  const subColor = variant === "dark" ? "text-paper/55" : "text-muted";

  const clipStyle =
    direction === "vertical"
      ? { clipPath: "inset(0 0 calc(100% - var(--p, 0%)) 0)" }
      : { clipPath: "inset(0 calc(100% - var(--p, 0%)) 0 0)" };

  return (
    <section ref={wrapRef} className="relative" data-nav={variant}>
      <div className={`sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden ${bg}`}>
        <div className="w-full px-5 sm:px-8 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative">
              <div className={`text-display-xl select-none ${base}`} aria-hidden="true">
                {lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>

              <div
                ref={fillRef}
                className={`absolute inset-0 text-display-xl select-none ${fill}`}
                style={clipStyle}
              >
                {lines.map((line) => (
                  <div key={`fill-${line}`}>{line}</div>
                ))}
              </div>
            </div>

            <div ref={lineRef} className={`mt-6 h-px w-0 ${variant === "dark" ? "bg-paper/30" : "bg-ink/20"}`} />

            {subtitle && (
              <p ref={subRef} className={`prose-dek mt-8 opacity-0 ${subColor}`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PinnedFillWord({ word, subtitle }: { word: string; subtitle?: string }) {
  return (
    <PinnedFillText
      lines={[word]}
      variant="light"
      direction="horizontal"
      subtitle={subtitle}
    />
  );
}
