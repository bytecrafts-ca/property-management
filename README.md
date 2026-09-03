# 9th Star Property Management

Production SEO site for Durham Region landlord acquisition.

**Live domain:** https://9thstarpropertymanagement.ca  
**Stack:** Next.js App Router, TypeScript, Tailwind CSS, Firebase tenant portal

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build
npm start
```

## Client placeholders (`src/lib/site.ts`)

Replace before calling the site "fully launched" for local SEO:

- `legalName`
- `founded`
- `hours`
- `googleBusinessProfileUrl`
- `ga4Id`
- `gscVerification`
- `nap.address` (only if you publish a real address; keep `addressDisplay` false otherwise)

Phone and email are already set to production values used on the live site.

## SEO architecture

Money pages:

| URL | Primary keyword |
| --- | --- |
| `/` | property management Durham Region |
| `/property-management-durham/` | Durham property management |
| `/property-management-pickering/` | property management Pickering |
| `/property-management-ajax/` | property management Ajax |
| `/property-management-whitby/` | property management Whitby |
| `/property-management-oshawa/` | property management Oshawa |
| `/property-management-clarington/` | property management Clarington |
| `/property-management-bowmanville/` | property management Bowmanville |
| `/property-management-courtice/` | property management Courtice |
| `/property-management-brooklin/` | property management Brooklin |

Supporting conversion + authority:

- Services under `/services/`
- Owners: `/for-landlords/`, `/free-rental-analysis/`, `/pricing/`, `/how-it-works/`
- Guides under `/guides/`
- Areas hub: `/areas-we-serve/`
- Contact + NAP: `/contact/`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

Keyword map: `src/lib/seo/keywords.ts`  
Meta map: `src/lib/seo/meta.ts`  
Schema helpers: `src/lib/seo/schema.ts`

## Lead forms

Owner lead form posts to `/api/leads` and redirects to `/thank-you/`.  
Leads append to `content/leads.json` (gitignored). On Vercel, filesystem writes are ephemeral. For production persistence, connect email or a database next.

## Tenant portal

`/tenants/` uses Firebase auth. Legacy `/residents/` redirects here.  
`/request/` redirects to `/maintenance-request/`.  
`/properties/` redirects to `/available-rentals/`.

## Local SEO (off-site)

See `local-seo-checklist.md`. Ranking #1 in Durham requires GBP, reviews, citations, and consistent NAP in addition to this site.

## 90-day ranking plan

### Weeks 1–2

- Launch site on the live domain with HTTPS
- Claim/optimize Google Business Profile
- Submit sitemap in Google Search Console
- Start first 10 citation listings with identical NAP
- Confirm call tracking and form thank-you page

### Weeks 3–6

- Publish 1 landlord guide per week (or refresh existing guides with local examples)
- Request Google reviews from happy landlords after resolved work
- Post weekly on GBP
- Fix any crawl/index issues found in Search Console

### Weeks 7–12

- Reinforce top city pages with unique FAQs, photos, and internal links from new content
- Expand pages that already show impressions
- Build local links (chambers, partners, sponsorships)
- Compare rank for Tier S keywords: Durham + Pickering/Ajax/Whitby/Oshawa/Clarington/Bowmanville

## Analytics notes

1. Set `ga4Id` in `src/lib/site.ts` and inject GA4 in `layout.tsx` when ready
2. Convert `/thank-you/` into a GA4 `generate_lead` event
3. Mark tel: CTAs with `data-cta` attributes already present for click tracking
4. In Google Ads, create conversions for form submit and calls

## Deploy

Configured for Vercel. Push to the connected GitHub repo to redeploy. Keep Cloudflare SSL Full (strict) if proxying DNS.

## Content rules

- No fake reviews, licenses, case studies, or rent stats
- Mark SAMPLE content clearly
- No em dashes in copy
- Primary audience is landlords and investors, not tenants first
