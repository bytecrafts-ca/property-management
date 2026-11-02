"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StayPhoto, StayVideo } from "@/lib/stays";
import { cn } from "@/lib/utils";

type Slide = { kind: "video"; video: StayVideo } | { kind: "photo"; photo: StayPhoto };

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function StayGallery({
  photos,
  video,
  label,
}: {
  photos: StayPhoto[];
  video?: StayVideo;
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);

  const slides: Slide[] = [
    ...(video ? [{ kind: "video" as const, video }] : []),
    ...photos.map((photo) => ({ kind: "photo" as const, photo })),
  ];
  const last = slides.length - 1;
  const photoCount = photos.length;

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(last, next));
      // Chrome cancels smooth scrolling in a snap container while a video in it is playing.
      if (clamped !== 0) videoRef.current?.pause();
      const target = clamped * track.clientWidth;
      const start = track.scrollLeft;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
      // Some browsers silently drop smooth scrolls in snap containers; jump if it never started.
      window.setTimeout(() => {
        if (track.scrollLeft === start && start !== target) track.scrollTo({ left: target, behavior: "auto" });
      }, 150);
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
    if (index !== 0) videoRef.current?.pause();

    const strip = thumbsRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [index]);

  if (slides.length === 0) return null;

  const current = slides[index];
  const counter =
    current?.kind === "video"
      ? "Video tour"
      : `${index + 1 - (video ? 1 : 0)} / ${photoCount}`;

  const playVideo = () => {
    setVideoStarted(true);
    void videoRef.current?.play();
  };

  return (
    <div aria-roledescription="carousel" aria-label={`${label} photos and video`} role="region">
      <div className="relative overflow-hidden rounded-[1rem] bg-soft">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
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
          {slides.map((slide, i) =>
            slide.kind === "video" ? (
              <div
                key={slide.video.src}
                className="relative aspect-[4/3] w-full shrink-0 snap-center bg-ink sm:aspect-[16/9]"
                aria-roledescription="slide"
                aria-label="Video tour"
              >
                <video
                  ref={videoRef}
                  src={slide.video.src}
                  poster={slide.video.poster}
                  controls={videoStarted}
                  playsInline
                  preload="none"
                  onPlay={() => setVideoStarted(true)}
                  className="h-full w-full object-contain"
                />
                {!videoStarted && (
                  <button
                    type="button"
                    onClick={playVideo}
                    className="group absolute inset-0 flex items-center justify-center bg-black/15 transition-colors hover:bg-black/25"
                    aria-label={`Play ${label} video tour`}
                  >
                    <span className="flex items-center gap-3 rounded-full bg-surface/95 py-3 pl-4 pr-5 text-sm font-medium text-ink shadow-md transition-transform group-hover:scale-105 motion-reduce:transition-none">
                      <PlayIcon size={18} />
                      Watch the video tour
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <div
                key={slide.photo.large}
                className="aspect-[4/3] w-full shrink-0 snap-center sm:aspect-[16/9]"
                aria-roledescription="slide"
                aria-label={`Photo ${i + 1 - (video ? 1 : 0)} of ${photoCount}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.photo.large}
                  srcSet={`${slide.photo.thumb} 400w, ${slide.photo.large} 1440w`}
                  sizes="(min-width: 1152px) 1100px, 100vw"
                  alt={`${label}, photo ${i + 1 - (video ? 1 : 0)} of ${photoCount}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
            )
          )}
        </div>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-sm transition-opacity hover:bg-surface disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => goTo(index + 1)}
          disabled={index === last}
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-sm transition-opacity hover:bg-surface disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <p
          className={cn(
            "pointer-events-none absolute right-3 rounded-full bg-ink/75 px-3 py-1 text-xs text-surface",
            current?.kind === "video" && videoStarted ? "top-3" : "bottom-3"
          )}
          aria-live="polite"
        >
          {counter}
        </p>
      </div>

      <div
        ref={thumbsRef}
        className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]"
        aria-label="Choose a slide"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.kind === "video" ? slide.video.poster : slide.photo.thumb}
            type="button"
            onClick={() => goTo(i)}
            aria-label={slide.kind === "video" ? "Show video tour" : `Show photo ${i + 1 - (video ? 1 : 0)}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-opacity sm:h-16 sm:w-24",
              i === index ? "border-ink opacity-100" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.kind === "video" ? slide.video.poster : slide.photo.thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {slide.kind === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                <PlayIcon size={16} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
