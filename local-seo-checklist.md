# Local SEO checklist (off-site)

On-site work is in the repo. Rankings still depend on Google Business Profile, reviews, and citations.

## NAP (keep identical everywhere)

- Name: 9th Star Property Management
- Phone: (416) 834-3587
- Email: info@9thstarpropertymanagement.ca
- Website (canonical): https://9thstarpropertymanagement.ca (apex, no www)
- Address: service-area business (no public storefront). Do not invent a street address on GBP or citations.

## Google Business Profile

1. Primary category: Property management company
2. Secondary: Real estate service (only if accurate)
3. Service areas: Pickering, Ajax, Whitby, Oshawa, Clarington, Bowmanville, Courtice, Brooklin first. Add Scarborough / Toronto only if you truly serve them.
4. Services list matching site service pages
5. Hours matching site: Mon–Fri 9–6, Sat–Sun 9–5
6. Website field: https://9thstarpropertymanagement.ca
7. Photos: branded graphics + real property exteriors when available (no fake Unsplash luxury homes)
8. Weekly GBP posts linking to city or service pages
9. Ask real clients for Google reviews (never buy reviews, never post from foreign IPs)

## Citations / profiles

- Apple Business Connect
- Bing Places
- Facebook page
- Instagram
- LinkedIn company page
- YellowPages.ca
- Homestars (if you use it)

Use the same NAP string on every profile.

## Search Console + analytics

1. Verify https://9thstarpropertymanagement.ca in Google Search Console
2. Submit `/sitemap.xml`
3. Add GA4 ID to `siteConfig.ga4Id` in `src/lib/site.ts`
4. Add GSC verification token to `siteConfig.gscVerification`
5. Paste real GBP URL into `siteConfig.googleBusinessProfileUrl`

## 90-day ranking plan

### Days 1–30
- Finish GBP completeness (services, photos, posts)
- Collect 3 to 5 real Google reviews from actual owners/tenants
- Confirm FormSubmit activation for info@
- Post 4 GBP updates linking to Durham hub + top city pages

### Days 31–60
- Build citations above
- Publish 1 new landlord guide or FAQ expansion
- Internal link new GBP posts to `/property-management-oshawa`, `/whitby`, `/ajax`, `/pickering`
- Continue real review asks after successful lease-ups

### Days 61–90
- Compare Search Console queries for city + "property management"
- Strengthen pages that get impressions but low CTR (title/meta only)
- Add real listings to `content/listings.ts` when inventory exists
- Keep review velocity steady (1 to 2 real reviews per month beats a fake burst)

## Do not

- Fake reviews or review farms
- City-name-swap spam pages
- Promise #1 rankings from code alone
- Put a fake street address on a service-area GBP
