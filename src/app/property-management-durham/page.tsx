import type { Metadata } from "next";
import Link from "next/link";
import { SeoPage } from "@/components/seo/seo-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/meta";
import { serviceSchema } from "@/lib/seo/schema";
import { sharedFaqs } from "@/lib/content/faqs";
import { seoCities } from "@/lib/seo/durham-data";

export const metadata: Metadata = buildMetadata("/property-management-durham");

export default function DurhamPropertyManagementPage() {
  const faqs = [...sharedFaqs.durham, ...sharedFaqs.fees];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Durham Region Property Management",
          description:
            "Full-service residential property management across Durham Region for landlords and investors.",
          path: "/property-management-durham",
        })}
      />
      <SeoPage
        eyebrow="Durham Region, Ontario"
        title="Property Management in Durham Region"
        description="Full-service rental management for landlords and investors across Pickering, Ajax, Whitby, Oshawa, Clarington, and nearby communities."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Durham property management", path: "/property-management-durham" },
        ]}
        faqs={faqs}
      >
        <p>
          9th Star Property Management is a <strong>property management company in Durham Region</strong> built for
          owners of houses, duplexes, townhomes, and condo units. We focus on residential rentals, not building-wide
          condo corporation management.
        </p>
        <p>
          If you own a rental in Pickering, Ajax, Whitby, Oshawa, Bowmanville, Courtice, Brooklin, or elsewhere in
          Durham, the job is the same: keep a good tenant in place, handle issues quickly, and give you a clear monthly
          picture of money in and money out.
        </p>

        <h2>Who we help</h2>
        <p>
          Local landlords who are tired of after-hours calls. Investors who live in the GTA, elsewhere in Canada, or
          abroad. Small portfolio owners who want one manager instead of juggling vendors and applicants alone.
        </p>

        <h2>What Durham property management includes with 9th Star</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Rent-ready prep guidance and listing strategy for vacant homes</li>
          <li>Tenant placement and screening</li>
          <li>Lease paperwork and move-in coordination</li>
          <li>Rent collection and follow-up</li>
          <li>Maintenance coordination with owner updates</li>
          <li>Renewals and day-to-day tenant communication</li>
          <li>Monthly reporting you can read without decoding</li>
        </ul>

        <h2>Why local coverage matters</h2>
        <p>
          Durham is not one rental market. A condo near Pickering Town Centre, a family home in Ajax, a Whitby
          waterfront rental, and an Oshawa unit near campus attract different tenants and need different pricing. Using
          one Toronto average is how vacancies drag on.
        </p>
        <p>
          Local vendor relationships also matter. When heat fails in Clarington, response time is the product. Software
          alone does not fix that.
        </p>

        <h2>Durham corridor realities owners should plan for</h2>
        <p>
          West Durham (Pickering and Ajax) often competes with Scarborough and east Toronto renters who want more space
          for the money. Pricing has to respect that competition without racing to the bottom.
        </p>
        <p>
          Central Durham (Whitby and Oshawa) mixes long-term family demand with pockets of higher turnover. Screening
          quality and lease clarity matter more here than glossy listing copy.
        </p>
        <p>
          East Durham (Clarington, Bowmanville, Courtice, Newcastle) rewards reliable local response. Many owners live
          farther away. A manager who cannot get a vendor to Bowmanville quickly is not managing the asset.
        </p>

        <h2>Neighbourhood-level thinking beats city averages</h2>
        <p>
          Inside each city, streets differ. Downtown Whitby stock is not identical to Brooklin. North Oshawa family
          homes are not identical to campus-adjacent rentals. Liverpool and Town Centre Pickering draw different renter
          profiles than quieter inland pockets.
        </p>
        <p>
          When a unit sits vacant, the first job is pricing and presentation for that micro-market. Posting everywhere
          with the wrong ask just creates noise.
        </p>

        <h2>Cities we serve</h2>
        <p>
          {seoCities.map((city, index) => (
            <span key={city.slug}>
              {index > 0 ? " · " : ""}
              <Link href={city.path} className="link-underline">
                {city.name} property management
              </Link>
            </span>
          ))}
        </p>

        <h2>Services owners ask for most</h2>
        <p>
          Explore{" "}
          <Link href="/services/residential-property-management" className="link-underline">
            residential property management
          </Link>
          ,{" "}
          <Link href="/services/condo-property-management" className="link-underline">
            condo property management
          </Link>
          ,{" "}
          <Link href="/services/tenant-placement" className="link-underline">
            tenant placement
          </Link>
          , and{" "}
          <Link href="/services/investor-property-management" className="link-underline">
            investor property management
          </Link>
          .
        </p>

        <h2>What good Durham property management looks like in practice</h2>
        <p>
          A vacant Ajax townhome gets cleaned, priced against current comps, listed with accurate photos, and shown on a
          real schedule. Applications are screened before keys move. The owner sees who applied and why a candidate is
          recommended or declined.
        </p>
        <p>
          An occupied Whitby house gets a maintenance path tenants will actually use. Urgent issues are triaged. Routine
          work is scheduled. Invoices and updates show up in reporting instead of disappearing into text threads.
        </p>
        <p>
          A condo unit in Pickering gets board-aware move-in planning so the tenancy does not start with elevator and
          rule conflicts. That prevents week-one friction that turns into year-long complaints.
        </p>

        <h2>Fees overview for Durham landlords</h2>
        <p>
          Most residential management in Ontario is priced as a percentage of rent, sometimes with separate placement
          fees on turnover. We explain inclusions before you sign. For a plain-language overview, read{" "}
          <Link href="/pricing" className="link-underline">
            property management fees in Durham
          </Link>{" "}
          and our guide on{" "}
          <Link href="/guides/property-management-fees-ontario" className="link-underline">
            Ontario management fees
          </Link>
          .
        </p>

        <h2>Proof and process</h2>
        <p>
          Owners want fewer surprises. Tenants want a real response path. That is the standard we manage to. Read{" "}
          <Link href="/how-it-works" className="link-underline">
            how it works
          </Link>{" "}
          and{" "}
          <Link href="/reviews" className="link-underline">
            reviews
          </Link>
          .
        </p>

        <h2>Talk to a Durham property manager</h2>
        <p>
          Request a{" "}
          <Link href="/free-rental-analysis" className="link-underline">
            free rental analysis
          </Link>{" "}
          or call{" "}
          <a href="tel:4168343587" className="link-underline">
            416-834-3587
          </a>
          . Tell us the city, property type, and whether the unit is occupied or vacant.
        </p>
      </SeoPage>
    </>
  );
}
