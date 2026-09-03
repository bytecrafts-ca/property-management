import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

type Faq = { question: string; answer: string };

type SeoPageProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: { name: string; path: string }[];
  children: React.ReactNode;
  faqs?: ReadonlyArray<Faq>;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export function SeoPage({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  faqs,
  ctaHref = "/free-rental-analysis",
  ctaLabel = "Get a free rental analysis",
  className,
}: SeoPageProps) {
  return (
    <div className={cn("bg-paper", className)} data-nav="light">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {faqs?.length ? <JsonLd data={faqSchema(faqs)} /> : null}

      <section className="border-b border-line bg-surface px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow ? <p className="pill-label mb-4 inline-block">{eyebrow}</p> : null}
          <h1 className="text-display-md max-w-4xl">{title}</h1>
          {description ? <p className="prose-dek mt-5 max-w-2xl text-muted">{description}</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={ctaHref}
              className="rounded-full bg-ink px-6 py-3.5 text-center text-sm font-medium text-surface hover:bg-ink/90"
              data-cta="seo-hero-primary"
            >
              {ctaLabel}
            </Link>
            <a
              href="tel:4168343587"
              className="rounded-full border border-line px-6 py-3.5 text-center text-sm font-medium hover:bg-soft"
              data-cta="seo-hero-call"
            >
              Call 416-834-3587
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 md:px-10">
        <article className="seo-prose space-y-6 text-[1.05rem] leading-relaxed text-ink/90">{children}</article>

        {faqs?.length ? (
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="text-display-sm mb-8 text-3xl">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-line pb-6">
                  <h3 className="mb-2 text-lg font-medium">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
