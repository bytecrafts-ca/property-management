import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.path} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden>/</span>}
            {index === items.length - 1 ? (
              <span className="text-ink">{item.name}</span>
            ) : (
              <Link href={item.path} className="link-underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
