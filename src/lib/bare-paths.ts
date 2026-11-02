/** Guest-facing pages that render without the intro, nav, footer, or call bar. */
const barePaths = new Set(["/wifi"]);

export function isBarePath(pathname: string | null) {
  if (!pathname) return false;
  return barePaths.has(pathname.replace(/\/$/, "") || "/");
}
