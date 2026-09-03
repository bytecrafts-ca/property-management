import { PageHero } from "@/components/page-hero";
import { TenantRequestForm } from "@/components/request/tenant-request-form";
import { siteImages } from "@/lib/site";

export default function RequestPage() {
  return (
    <>
      <PageHero
        badge="Tenants"
        title="Submit a request"
        description="Maintenance, complaints, and unit issues. We respond quickly so small problems do not become big ones."
        image={siteImages.homes.requestHero}
      >
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <a
            href="#request-form"
            className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-white/90 sm:px-8"
          >
            Open the form
          </a>
          <a
            href="tel:4168343587"
            className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10 sm:px-8"
          >
            Emergency: 416-834-3587
          </a>
        </div>
      </PageHero>

      <section
        id="request-form"
        className="relative overflow-hidden bg-[#f3f1ec] px-5 py-20 sm:px-8 sm:py-28 md:px-10"
        data-nav="light"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 10% 0%, rgba(139,115,85,0.14), transparent 55%), radial-gradient(ellipse 55% 45% at 100% 20%, rgba(26,26,26,0.05), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="pill-label mb-4 inline-block">How it works</p>
            <h2 className="text-display-sm mb-4 text-3xl sm:text-4xl">A clear path when something breaks</h2>
            <p className="prose-dek text-muted">
              Fill out the form below for non-emergency issues. For floods, no heat, lockouts, or anything unsafe, call
              immediately.
            </p>
          </div>
          <TenantRequestForm />
        </div>
      </section>
    </>
  );
}
