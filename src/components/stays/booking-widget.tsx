"use client";

import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";

const LOADER_SRC = "https://cdn.hsptb.com/direct-booking-widget/widget-loader.prod.js";
const LOAD_TIMEOUT_MS = 15000;

declare global {
  interface Window {
    __hospitableWidgetLoaderInit?: Promise<unknown>;
  }
}

type Status = "loading" | "ready" | "error";

/**
 * The Hospitable loader only mounts one widget per page (it exits if #booking-iframe exists)
 * and keeps a global init promise, so a previous mount must be fully torn down first.
 */
export function BookingWidget({ siteUuid, propertyId }: { siteUuid: string; propertyId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `booking-${useId().replace(/:/g, "")}`;
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const markReady = () => {
      if (!cancelled) setStatus("ready");
    };

    const timeout = window.setTimeout(() => {
      if (!cancelled && !container.querySelector("iframe")) setStatus("error");
    }, LOAD_TIMEOUT_MS);

    const settle = async () => {
      for (let i = 0; i < 5 && window.__hospitableWidgetLoaderInit; i += 1) {
        try {
          await window.__hospitableWidgetLoaderInit;
        } catch {
          break;
        }
      }
    };

    const inject = () =>
      new Promise<boolean>((resolve) => {
        const script = document.createElement("script");
        script.src = LOADER_SRC;
        script.async = true;
        script.dataset.siteUuid = siteUuid;
        script.dataset.propertyId = propertyId;
        script.dataset.theme = "multi";
        script.dataset.container = containerId;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        container.appendChild(script);
      });

    // A loader from a tab the user already left can still run and hold the global init lock,
    // which makes our loader exit without mounting. Retry once that stale init settles.
    const mount = async () => {
      for (let attempt = 0; attempt < 3; attempt += 1) {
        await settle();
        if (cancelled || container.querySelector("iframe")) return;

        container.replaceChildren();
        document.getElementById("booking-iframe")?.remove();

        const loaded = await inject();
        if (cancelled) return;
        if (!loaded) {
          setStatus("error");
          return;
        }
      }
    };

    const observer = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");
      if (!iframe) return;
      iframe.addEventListener("load", markReady, { once: true });
      observer.disconnect();
    });
    observer.observe(container, { childList: true });

    void mount();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      observer.disconnect();
      container.replaceChildren();
    };
  }, [siteUuid, propertyId, containerId]);

  return (
    <div className={status === "ready" ? "relative" : "relative min-h-[520px]"}>
      {status !== "ready" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[1rem] bg-soft/60 px-6 text-center"
          role="status"
          aria-live="polite"
        >
          {status === "loading" ? (
            <>
              <span
                aria-hidden
                className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink motion-reduce:animate-none"
              />
              <p className="text-sm text-muted">Loading availability…</p>
            </>
          ) : (
            <>
              <p className="max-w-sm text-sm text-muted">
                The booking calendar did not load. Refresh the page, or call us and we will book it for you.
              </p>
              <a
                href={`tel:${siteConfig.nap.phoneTel}`}
                className="rounded-full bg-ink px-5 py-2.5 text-sm text-surface hover:bg-ink/90"
              >
                Call {siteConfig.nap.phoneDisplay}
              </a>
            </>
          )}
        </div>
      )}
      <div ref={containerRef} id={containerId} className="w-full" />
    </div>
  );
}
