"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTheme((e.target.getAttribute("data-nav") as "dark" | "light") || "light");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    document.querySelectorAll("[data-nav]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const onDark = theme === "dark";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          onDark ? "text-surface" : "text-ink"
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm link-underline",
                  onDark ? "text-surface/85 hover:text-surface" : "text-muted hover:text-ink",
                  pathname === item.href && "opacity-60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {siteConfig.navActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  a.variant === "ghost" &&
                    (onDark
                      ? "border border-surface/30 hover:bg-surface/10"
                      : "border border-line hover:bg-soft"),
                  a.variant === "solid" &&
                    (onDark
                      ? "bg-surface text-ink hover:bg-surface/90"
                      : "bg-ink text-surface hover:bg-ink/90")
                )}
              >
                {a.label}
              </Link>
            ))}
          </div>

          <button type="button" className="p-2 lg:hidden" aria-label="Menu" onClick={() => setOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-surface">
            <div className="flex h-full flex-col px-5 py-4 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{siteConfig.name}</span>
                <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="p-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="mt-16 flex flex-col gap-5">
                {siteConfig.nav.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                    <Link href={item.href} className="text-display-md" onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 pb-8">
                {siteConfig.navActions.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full py-3 text-center text-sm",
                      a.variant === "solid" ? "bg-ink text-surface" : "border border-line"
                    )}
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
