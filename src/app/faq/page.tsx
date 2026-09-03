import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { sharedFaqs } from "@/lib/content/faqs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata("/faq");

export default function FaqPage() {
  const faqs = [
    ...sharedFaqs.durham,
    ...sharedFaqs.fees,
    ...sharedFaqs.process,
    ...sharedFaqs.cities,
    ...sharedFaqs.tenants,
  ];

  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-3xl">
        <p className="pill-label mb-4 inline-block">FAQ</p>
        <h1 className="text-display-md mb-12">Property management FAQ for Durham landlords</h1>
        <div className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-line pb-8">
              <h2 className="text-xl font-medium">{faq.question}</h2>
              <p className="mt-3 leading-relaxed text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
