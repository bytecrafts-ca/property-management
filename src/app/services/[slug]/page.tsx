import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoPage } from "@/components/seo/seo-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/meta";
import { serviceSchema } from "@/lib/seo/schema";
import { seoCities, seoServices } from "@/lib/seo/durham-data";
import { pageMeta } from "@/lib/seo/meta";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return seoServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = seoServices.find((item) => item.slug === slug);
  if (!service) return {};
  pageMeta[service.path] = {
    path: service.path,
    title: `${service.title} in Durham | 9th Star`,
    description: service.summary,
  };
  return buildMetadata(service.path, {
    title: `${service.title} in Durham | 9th Star`,
    description: service.summary,
    path: service.path,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = seoServices.find((item) => item.slug === slug);
  if (!service) notFound();

  const cities = seoCities.slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.summary,
          path: service.path,
        })}
      />
      <SeoPage
        eyebrow="Durham Region services"
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: service.path },
        ]}
      >
        <p>
          9th Star provides <strong>{service.primaryKeyword}</strong> for landlords and investors across Durham Region.
        </p>
        {service.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        <h2>What this service covers</h2>
        <p>{service.summary}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Clear owner updates when decisions are needed</li>
          <li>Documented process from inquiry through monthly reporting</li>
          <li>Local vendor coordination across Durham communities</li>
          <li>Support for houses, duplexes, townhomes, and condo units</li>
        </ul>
        <h2>Where we deliver this service</h2>
        <p>
          {cities.map((city, index) => (
            <span key={city.slug}>
              {index > 0 ? ", " : ""}
              <Link href={city.path} className="link-underline">
                {city.name}
              </Link>
            </span>
          ))}
          , and the rest of{" "}
          <Link href="/property-management-durham" className="link-underline">
            Durham Region
          </Link>
          .
        </p>
        <h2>Next step for owners</h2>
        <p>
          Request a{" "}
          <Link href="/free-rental-analysis" className="link-underline">
            free rental analysis
          </Link>{" "}
          or call{" "}
          <a href="tel:4168343587" className="link-underline">
            416-834-3587
          </a>
          .
        </p>
      </SeoPage>
    </>
  );
}
