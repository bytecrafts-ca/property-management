import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get in touch"
        title="Contact"
        description="Tell us about your property. We will follow up with a clear quote and next steps."
        image={siteConfig.contact.heroImage}
      />
      <section className="bg-paper px-5 py-20 sm:px-8 sm:py-28 md:px-10" data-nav="light">
        <div className="mx-auto max-w-6xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
