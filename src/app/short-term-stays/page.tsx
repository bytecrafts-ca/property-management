import type { Metadata } from "next";
import { StaysTabs } from "@/components/stays/stays-tabs";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/meta";
import { shortTermStays, stayArea, stayBasics, stayGettingAround, stayRules } from "@/lib/stays";
import { getStayPhotos } from "@/lib/stays-photos";

export const metadata: Metadata = buildMetadata("/short-term-stays");

function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-[15px] leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ink/50" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ShortTermStaysPage() {
  const photoLists = await Promise.all(shortTermStays.map((stay) => getStayPhotos(stay.propertyId)));
  const photosByProperty = Object.fromEntries(
    shortTermStays.map((stay, i) => [stay.propertyId, photoLists[i]])
  );

  return (
    <div className="bg-paper px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32 md:px-10" data-nav="light">
      <div className="mx-auto max-w-6xl">
        <p className="pill-label mb-4 inline-block">Short term stays · Whitby</p>
        <h1 className="text-display-md mb-5">Short term stays in Whitby</h1>
        <p className="prose-dek mb-10 max-w-2xl text-muted sm:mb-12">
          Three private suites in one downtown Whitby home. Book a single suite, or the whole house for up to 12.
          Steps to the 401 and a walk to Whitby GO.
        </p>

        <StaysTabs photosByProperty={photosByProperty} />

        <section className="mt-16 grid gap-10 border-t border-line pt-12 sm:mt-20 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5">Your stay</h2>
            <InfoList items={stayBasics} />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-5">House rules</h2>
            <InfoList items={stayRules} />
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-12 sm:mt-20">
          <h2 className="font-display text-2xl sm:text-3xl mb-2">The area</h2>
          <p className="prose-dek mb-8 max-w-2xl text-muted">
            A quiet residential street in downtown Whitby, close to Brock Street, the GO train, and the 401.
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stayArea.map((group) => (
              <div key={group.title}>
                <h3 className="text-label text-muted mb-4">{group.title}</h3>
                <InfoList items={group.items} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-12 sm:mt-20">
          <h2 className="font-display text-2xl sm:text-3xl mb-5">Getting around</h2>
          <div className="max-w-3xl">
            <InfoList items={stayGettingAround} />
          </div>
        </section>

        <p className="mt-16 text-sm text-muted">
          Questions before you book? Call{" "}
          <a href={`tel:${siteConfig.nap.phoneTel}`} className="link-underline text-ink">
            {siteConfig.nap.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.nap.email}`} className="link-underline text-ink">
            {siteConfig.nap.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
