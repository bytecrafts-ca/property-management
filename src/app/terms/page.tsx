import type { Metadata } from "next";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/terms");

export default function TermsPage() {
  return (
    <SeoPage
      eyebrow="Legal"
      title="Terms of use"
      description="Terms for using 9thstarpropertymanagement.ca."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Terms", path: "/terms" },
      ]}
    >
      <p>Last updated: September 2026.</p>
      <p>
        By using this website you agree to these terms. The site is provided by {siteConfig.name} for general
        information about residential property management in Durham Region, Ontario.
      </p>
      <h2>No legal advice</h2>
      <p>
        Guides and articles on this site are educational only. They are not legal advice. For tenancy or tribunal
        matters, speak with a qualified professional.
      </p>
      <h2>Services</h2>
      <p>
        Submitting a form does not create a management contract. Any engagement starts only after written agreement
        between the parties.
      </p>
      <h2>Accuracy</h2>
      <p>
        We aim to keep information current. Market notes, sample content, and placeholders may change. Listings and
        availability can change without notice.
      </p>
      <h2>Limitation</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name} is not liable for damages arising from use of this
        website or reliance on its content.
      </p>
      <h2>Contact</h2>
      <p>
        Questions: {siteConfig.nap.email} or {siteConfig.nap.phoneDisplay}.
      </p>
    </SeoPage>
  );
}
