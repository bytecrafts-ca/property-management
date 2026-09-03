import { siteConfig } from "@/lib/site";

export function StickyCallButton() {
  return (
    <a
      href={`tel:${siteConfig.nap.phoneTel}`}
      className="fixed bottom-4 right-4 z-40 rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface shadow-lg sm:hidden"
      data-cta="sticky-mobile-call"
    >
      Call now
    </a>
  );
}
