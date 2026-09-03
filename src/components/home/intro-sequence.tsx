"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { siteConfig, heroImage } from "@/lib/site";
import { BrandName } from "@/components/brand-name";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.body.style.overflow = "";
      setDone(true);
      onComplete();
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = "";
      setDone(true);
      onComplete();
    };

    const img = new Image();
    img.src = heroImage;

    const runIntro = () => {
      const counter = { val: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      });

      tl.set(overlayRef.current, { clipPath: "inset(0% 0 0% 0)" })
        .set(bgRef.current, { scale: 1.28, filter: "brightness(0.5) blur(8px)" })
        .set(progressRef.current, { scaleX: 0 })
        .set(lineRef.current, { scaleX: 0, opacity: 0 })

        .to(bgRef.current, { scale: 1.06, filter: "brightness(1) blur(0px)", duration: 2.4, ease: "power2.inOut" }, 0)
        .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.65, ease: "power2.out" }, 0.2)
        .to(progressRef.current, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0.4)
        .to(
          counter,
          {
            val: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.val));
            },
          },
          0.4
        )
        .fromTo(
          nameRef.current,
          { y: 56, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.05, ease: "power4.out" },
          0.55
        )
        .fromTo(
          taglineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 0.8, duration: 0.7, ease: "power3.out" },
          0.95
        )
        .to(contentRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" }, 2.3)
        .to(overlayRef.current, { clipPath: "inset(0% 0 100% 0)", duration: 1.15, ease: "power4.inOut" }, 2.35);

      timelineRef.current = tl;
    };

    if (img.complete) {
      runIntro();
    } else {
      img.onload = runIntro;
      img.onerror = runIntro;
    }

    const skip = () => {
      timelineRef.current?.progress(1, false);
      finish();
    };

    const onWheel = () => skip();
    const onTouch = () => skip();
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", " ", "Enter", "Escape"].includes(e.key)) skip();
    };
    const onClick = () => skip();

    overlayRef.current?.addEventListener("click", onClick);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      timelineRef.current?.kill();
      document.body.style.overflow = "";
      overlayRef.current?.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] cursor-pointer overflow-hidden" aria-hidden>
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImage} alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      </div>

      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-6"
      >
        <div
          ref={lineRef}
          className="mb-8 h-px w-20 origin-center bg-white/50 will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
        <p ref={nameRef} className="font-display text-center text-4xl text-white sm:text-5xl md:text-6xl">
          <BrandName />
        </p>
        <p ref={taglineRef} className="mt-4 max-w-md text-center text-sm text-white/80 sm:text-base">
          {siteConfig.tagline}
        </p>

        <div className="absolute bottom-10 left-1/2 w-full max-w-xs -translate-x-1/2 px-6 sm:bottom-14">
          <div className="mb-3 flex items-end justify-between text-label text-white/50">
            <span>Loading</span>
            <span>
              <span ref={counterRef}>0</span>%
            </span>
          </div>
          <div className="h-px overflow-hidden bg-white/15">
            <div
              ref={progressRef}
              className="h-full origin-left bg-white will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
