import { PageHero } from "@/components/page-hero";
import { siteImages } from "@/lib/site";

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        badge="Rentals"
        title="Available"
        description="Rental gallery coming next. Browse what we have listed across the GTA."
        image={siteImages.homes.modern}
      />
      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-7xl">
          <p className="prose-dek text-muted">Full property listings are on the way.</p>
        </div>
      </div>
    </>
  );
}
