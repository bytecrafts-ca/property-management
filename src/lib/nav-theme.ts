const NAV_PROBE_Y = 56;

export function syncNavTheme(): "dark" | "light" {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
  if (sections.length === 0) return "light";

  const modeFor = (el: HTMLElement) => (el.getAttribute("data-nav") === "dark" ? "dark" : "light");

  if (window.scrollY < 8) {
    for (const el of sections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 1 && rect.bottom > NAV_PROBE_Y) {
        return modeFor(el);
      }
    }
  }

  for (const el of sections) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= NAV_PROBE_Y && rect.bottom > NAV_PROBE_Y) {
      return modeFor(el);
    }
  }

  for (const el of sections) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom > 0) {
      return modeFor(el);
    }
  }

  return "light";
}

export const darkHeroPaths = new Set(["/", "/residents", "/properties", "/contact", "/request"]);

export function navThemeForPath(pathname: string): "dark" | "light" {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return darkHeroPaths.has(normalized) ? "dark" : "light";
}
