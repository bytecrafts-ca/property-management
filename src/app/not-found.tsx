import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-3xl">
        <p className="pill-label mb-4 inline-block">404</p>
        <h1 className="text-display-md mb-5">Page not found</h1>
        <p className="prose-dek mb-10 text-muted">That page is not available. Head back home or contact us.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm text-surface">
            Home
          </Link>
          <Link href="/contact" className="rounded-full border border-line px-6 py-3.5 text-center text-sm">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
