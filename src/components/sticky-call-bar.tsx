"use client";

import { siteConfig } from "@/lib/site";

/** Persistent mobile call CTA for owner conversion. Hidden on large screens where header Call exists. */
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 backdrop-blur md:hidden print:hidden">
      <a
        href={`tel:${siteConfig.nap.phoneTel}`}
        className="flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-medium text-surface"
        aria-label={`Call ${siteConfig.name} at ${siteConfig.nap.phoneDisplay}`}
      >
        Call {siteConfig.nap.phoneDisplay}
      </a>
    </div>
  );
}
