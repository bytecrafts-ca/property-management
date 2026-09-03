import Link from "next/link";
import { SeoPage } from "@/components/seo/seo-page";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/seo/schema";
import { seoCities, type CitySlug } from "@/lib/seo/durham-data";
import { sharedFaqs } from "@/lib/content/faqs";

export function CityPageView({ slug }: { slug: CitySlug }) {
  const city = seoCities.find((item) => item.slug === slug);
  if (!city) return null;

  const nearby = seoCities.filter((item) => item.slug !== slug).slice(0, 3);
  const faqs = [
    {
      question: `Do you offer property management in ${city.name}?`,
      answer: `Yes. 9th Star provides residential rental property management in ${city.name} and across Durham Region.`,
    },
    {
      question: `What rentals do you manage in ${city.name}?`,
      answer: city.housingMix,
    },
    ...sharedFaqs.durham.slice(2),
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${city.name} Property Management`,
          description: `Residential property management services in ${city.name}, Ontario for landlords and investors.`,
          path: city.path,
          areaServed: [city.name],
        })}
      />
      <SeoPage
        eyebrow={`${city.name}, Durham Region`}
        title={`${city.name} Property Management`}
        description={`Local rental management for ${city.name} landlords. Tenant placement, screening, maintenance, and reporting from 9th Star.`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas-we-serve" },
          { name: city.name, path: city.path },
        ]}
        faqs={faqs}
      >
        <p>
          Looking for reliable <strong>{city.primaryKeyword}</strong>? 9th Star Property Management helps landlords and
          investors in {city.name} keep rentals occupied, maintained, and reported clearly.
        </p>
        <p>{city.localNotes}</p>

        <h2>Local notes for {city.name} landlords</h2>
        <p>
          {city.name} sits inside the broader Durham rental corridor, but owners still need city-specific judgment.
          Transit access, school demand, housing age, and condo versus detached mix all change how fast a unit leases
          and what maintenance looks like after move-in.
        </p>
        <p>
          If your {city.name} rental is vacant, start with pricing and condition, not blanket advertising. If it is
          occupied, prioritize response quality so good tenants renew.
        </p>

        <h2>Housing mix we see in {city.name}</h2>
        <p>{city.housingMix}</p>

        <h2>Neighbourhoods we commonly work around</h2>
        <p>
          Local knowledge matters when pricing and marketing a rental. In and around {city.name}, owners often ask about{" "}
          {city.neighbourhoods.join(", ")}.
        </p>

        <h2>What we handle for {city.name} owners</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Marketing and tenant placement when a unit is vacant</li>
          <li>Screening with income, credit, and reference checks</li>
          <li>Rent collection and monthly reporting</li>
          <li>Maintenance coordination with clear owner updates</li>
          <li>Lease renewals and day-to-day tenant communication</li>
        </ul>

        <h2>Common landlord concerns in {city.name}</h2>
        <ul className="list-disc space-y-2 pl-5">
          {city.landlordConcerns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Related services</h2>
        <p>
          Explore{" "}
          <Link href="/services/residential-property-management" className="link-underline">
            residential property management
          </Link>{" "}
          and{" "}
          <Link href="/services/tenant-placement" className="link-underline">
            tenant placement
          </Link>
          . For the full Durham picture, read our{" "}
          <Link href="/property-management-durham" className="link-underline">
            Durham Region property management
          </Link>{" "}
          hub.
        </p>

        <h2>Nearby communities</h2>
        <p>
          {nearby.map((item, index) => (
            <span key={item.slug}>
              {index > 0 ? " · " : ""}
              <Link href={item.path} className="link-underline">
                {item.name} property management
              </Link>
            </span>
          ))}
        </p>

        <h2>Get a free rental analysis for your {city.name} property</h2>
        <p>
          Tell us about your address or neighbourhood, property type, and current occupancy. Call{" "}
          <a href="tel:4168343587" className="link-underline">
            416-834-3587
          </a>{" "}
          or request an analysis online. No pressure. Clear next steps.
        </p>
      </SeoPage>
    </>
  );
}
