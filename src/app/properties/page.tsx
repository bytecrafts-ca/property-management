import { PageHero } from "@/components/page-hero";
import { siteImages } from "@/lib/site";

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        badge="Homes"
        title="Available homes"
        description="Homes currently available for rent or for sale. Contact us to book a showing or ask about a listing."
        image={siteImages.homes.modern}
      />
      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-7xl">
          <p className="prose-dek text-muted">
            Browse homes available for rent or for sale. Reach out and we will confirm current availability and next
            steps.
          </p>
        </div>
      </div>
    </>
  );
}
