"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isBarePath } from "@/lib/bare-paths";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isBarePath(pathname)) return null;
  return <>{children}</>;
}
