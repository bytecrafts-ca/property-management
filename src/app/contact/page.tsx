import { PageHero } from "@/components/page-hero";
import { siteImages } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get in touch"
        title="Contact"
        description="Tell us about your property. We will follow up with a clear quote and next steps."
        image={siteImages.homes.porch}
      />
      <div className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-4xl">
          <p className="prose-dek text-muted">Contact form coming next.</p>
        </div>
      </div>
    </>
  );
}
