import { cn } from "@/lib/utils";

type BrandNameProps = {
  className?: string;
  /** Nav and tight spaces: "9th Star" only */
  compact?: boolean;
};

export function BrandName({ className, compact = false }: BrandNameProps) {
  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>
        9<span className="relative -top-[0.35em] text-[0.58em] font-semibold leading-none">TH</span>
      </span>
      <span className="ml-[0.35em]">{compact ? "Star" : "Star Property Management"}</span>
    </span>
  );
}

export const brandPlainName = "9th Star Property Management";
