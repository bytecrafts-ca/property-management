import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoPage } from "@/components/seo/seo-page";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/meta";
import { articleSchema } from "@/lib/seo/schema";
import { getGuide, guides } from "@/lib/content/guides";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata(guide.path, {
    title: `${guide.title} | 9th Star`,
    description: guide.description,
    path: guide.path,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: guide.title,
          description: guide.description,
          path: guide.path,
          datePublished: guide.datePublished,
        })}
      />
      <SeoPage
        eyebrow="Landlord guide"
        title={guide.title}
        description={guide.description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: guide.path },
        ]}
      >
        {guide.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>Related pages</h2>
        <p>
          <Link href="/property-management-durham" className="link-underline">
            Durham Region property management
          </Link>
          {" · "}
          <Link href="/free-rental-analysis" className="link-underline">
            Free rental analysis
          </Link>
          {" · "}
          <Link href="/for-landlords" className="link-underline">
            For landlords
          </Link>
        </p>
      </SeoPage>
    </>
  );
}
