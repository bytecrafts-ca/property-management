"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { BookingWidget } from "@/components/stays/booking-widget";
import { hospitableSiteUuid, shortTermStays } from "@/lib/stays";
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

export function StaysTabs() {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => ""
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = shortTermStays.find((stay) => stay.slug === hash) ?? shortTermStays[0];

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
              <span className="block font-display text-lg leading-tight sm:text-xl">{stay.name}</span>
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
        className="mt-6 rounded-[1.25rem] border border-line bg-surface p-4 sm:p-6"
      >
        <div className="mb-5 flex flex-col gap-1 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">{active.name}</h2>
            <p className="mt-1 text-sm text-muted">{active.summary}</p>
          </div>
          <p className="text-label text-muted">{active.details}</p>
        </div>
        <BookingWidget key={active.propertyId} siteUuid={hospitableSiteUuid} propertyId={active.propertyId} />
      </div>
    </div>
  );
}
