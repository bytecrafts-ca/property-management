import { PageHero } from "@/components/page-hero";
import { siteImages } from "@/lib/site";

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        badge="Homes"
        title="Our homes"
        description="Homes we manage and place tenants in across the GTA. Listing history coming next."
        image={siteImages.homes.modern}
      />
      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-7xl">
          <p className="prose-dek text-muted">Portfolio and listing history coming next.</p>
        </div>
      </div>
    </>
  );
}
