"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StayPhoto } from "@/lib/stays";
import { cn } from "@/lib/utils";

export function StayGallery({ photos, label }: { photos: StayPhoto[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const last = photos.length - 1;

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(last, next));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: clamped * track.clientWidth, behavior: reduced ? "auto" : "smooth" });
    },
    [last]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [index]);

  if (photos.length === 0) return null;

  return (
    <div aria-roledescription="carousel" aria-label={`${label} photos`} role="region">
      <div className="relative overflow-hidden rounded-[1rem] bg-soft">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <div
              key={photo.large}
              className="aspect-[4/3] w-full shrink-0 snap-center sm:aspect-[16/9]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${photos.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.large}
                srcSet={`${photo.thumb} 400w, ${photo.large} 1440w`}
                sizes="(min-width: 1152px) 1100px, 100vw"
                alt={`${label}, photo ${i + 1} of ${photos.length}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-sm transition-opacity hover:bg-surface disabled:opacity-0 sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
          disabled={index === last}
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-sm transition-opacity hover:bg-surface disabled:opacity-0 sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <p
          className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/75 px-3 py-1 text-xs text-surface"
          aria-live="polite"
        >
          {index + 1} / {photos.length}
        </p>
      </div>

      <div
        ref={thumbsRef}
        className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]"
        aria-label="Choose a photo"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.thumb}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-opacity sm:h-16 sm:w-24",
              i === index ? "border-ink opacity-100" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
