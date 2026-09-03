import type { Metadata } from "next";
import { SeoPage } from "@/components/seo/seo-page";
import { buildMetadata } from "@/lib/seo/meta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <SeoPage
      eyebrow="Legal"
      title="Privacy policy"
      description="How 9th Star Property Management handles information submitted through this website."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy", path: "/privacy" },
      ]}
    >
      <p>Last updated: September 2026.</p>
      <p>
        This site is operated by {siteConfig.name}. Contact: {siteConfig.nap.email} or {siteConfig.nap.phoneDisplay}.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you submit a form, we may collect your name, email, phone number, property address or city, property type,
        unit count, and message. Tenant portal accounts use authentication and related account data needed to operate
        the portal.
      </p>
      <h2>How we use it</h2>
      <p>
        We use submitted information to respond to inquiries, provide property management services, improve the site,
        and meet legal obligations. We do not sell personal information.
      </p>
      <h2>Storage</h2>
      <p>
        Form submissions are delivered by email through FormSubmit. Tenant and admin portal data may be stored in
        Firebase.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        Analytics is not enabled on this site yet. If it is added later, pages may use cookies or similar technologies
        for measurement. You can control cookies through your browser settings.
      </p>
      <h2>Your choices</h2>
      <p>
        Email {siteConfig.nap.email} to request access, correction, or deletion of personal information we hold about
        you, subject to legal exceptions.
      </p>
    </SeoPage>
  );
}
