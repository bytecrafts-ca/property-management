import { PageHero } from "@/components/page-hero";
import { siteImages } from "@/lib/site";

export default function RequestPage() {
  return (
    <>
      <PageHero
        badge="Tenants"
        title="Submit a request"
        description="Log maintenance or complaint requests for your unit. We respond quickly."
        image={siteImages.homes.kitchen}
      />
      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-4xl">
          <p className="prose-dek text-muted">Tenant request form coming next.</p>
        </div>
      </div>
    </>
  );
}
