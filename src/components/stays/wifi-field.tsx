"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type WifiFieldProps = {
  label: string;
  value: string;
  /** Optional grouped version for easier reading; the raw value is what gets copied. */
  display?: string;
  hint?: string;
};

export function WifiField({ label, value, display, hint }: WifiFieldProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-label text-muted mb-1.5">{label}</p>
          <p className="break-all font-mono text-xl font-medium tracking-wide text-ink sm:text-2xl">
            <span aria-hidden={display ? true : undefined}>{display ?? value}</span>
            {display && <span className="sr-only">{value.split("").join(" ")}</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            state === "copied" ? "bg-accent text-surface" : "bg-ink text-surface hover:bg-ink/85"
          )}
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {state === "copied" ? "Copied" : state === "failed" ? "Try again" : "Copy"}
        </button>
      </div>
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
      <p className="sr-only" aria-live="polite">
        {state === "copied" ? `${label} copied` : state === "failed" ? "Copy failed" : ""}
      </p>
    </div>
  );
}
