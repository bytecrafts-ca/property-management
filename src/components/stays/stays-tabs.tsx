"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { BookingWidget } from "@/components/stays/booking-widget";
import { StayGallery } from "@/components/stays/stay-gallery";
import { hospitableSiteUuid, shortTermStays, type StayPhoto } from "@/lib/stays";
import { cn } from "@/lib/utils";

const HASH_EVENT = "stays-hash-change";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-label text-muted mb-4">{title}</h3>
      <ul className="space-y-2.5 text-[15px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ink/50" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StaysTabs({ photosByProperty }: { photosByProperty: Record<string, StayPhoto[]> }) {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => ""
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = shortTermStays.find((stay) => stay.slug === hash) ?? shortTermStays[0];
  const photos = photosByProperty[active.propertyId] ?? [];

  const select = (slug: string) => {
    window.history.replaceState(null, "", `#${slug}`);
    window.dispatchEvent(new Event(HASH_EVENT));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = shortTermStays.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(shortTermStays[next].slug);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Choose a stay" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {shortTermStays.map((stay, index) => {
          const selected = stay.slug === active.slug;
          return (
            <button
              key={stay.slug}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${stay.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${stay.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(stay.slug)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "rounded-[1rem] border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-5",
                selected ? "border-ink bg-ink text-surface" : "border-line bg-surface hover:border-ink/40"
              )}
            >
              <span className="block font-display text-lg leading-tight sm:text-xl">{stay.tabLabel}</span>
              <span className={cn("mt-1.5 block text-sm", selected ? "text-surface/75" : "text-muted")}>
                {stay.details}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.slug}`}
        aria-labelledby={`tab-${active.slug}`}
        className="mt-6 rounded-[1.25rem] border border-line bg-surface p-3 sm:p-6"
      >
        <StayGallery key={active.slug} photos={photos} video={active.video} label={active.name} />

        <div className="mt-8 grid gap-10 px-1 sm:px-0 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
          <div className="lg:col-start-1">
            <p className="text-label text-muted mb-2">Downtown Whitby</p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">{active.name}</h2>
            <p className="prose-dek mt-3 text-muted">{active.intro}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Quick facts">
              {active.facts.map((fact) => (
                <li key={fact} className="rounded-full border border-line px-3 py-1.5 text-sm">
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="rounded-[1rem] border border-line p-3 sm:p-4">
              <p className="mb-1 px-1 font-display text-xl">Check dates and book</p>
              <p className="mb-3 px-1 text-sm text-muted">All fees included. No hidden fees.</p>
              <BookingWidget key={active.propertyId} siteUuid={hospitableSiteUuid} propertyId={active.propertyId} />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-start-1 lg:grid-cols-1 xl:grid-cols-2">
            <DetailList title="The space" items={active.space} />
            <DetailList title="Good to know" items={active.goodToKnow} />
          </div>
        </div>
      </div>
    </div>
  );
}
