# 9th Star Property Management

Production SEO site for Durham Region and GTA landlord acquisition.

**Live domain:** https://9thstarpropertymanagement.ca (canonical apex, no www)  
**Stack:** Next.js App Router, TypeScript, Tailwind CSS, Firebase tenant portal, FormSubmit leads

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

## SEO optimization blitz (2026-09-16)

### Shipped on-site

- Canonical NAP in `src/lib/site.ts` with `napString`, phone `(416) 834-3587`, tel `+14168343587`
- Homepage metadata via `buildMetadata("/")`
- Skip-to-content + sticky mobile call bar
- Nav: Services, Areas, For Landlords, About, Contact + Call / Get a quote
- Home city cards linking money pages
- New pages: `/property-management-scarborough`, `/property-management-toronto`, `/for-investors`
- Redirects: `/get-a-quote` → `/free-rental-analysis`, `/services/rent-collection` and `/services/owner-reporting` → rent collection reporting
- Guide: `/guides/managing-rental-property-while-living-abroad`
- Footer NAP + expanded city links including Scarborough and Toronto
- 404 links to money pages
- Schema `areaServed` includes Scarborough, North York, Toronto
- Off-site checklist refreshed in `local-seo-checklist.md`

### Placeholders still empty (do not invent)

- `legalName`, `founded`
- `googleBusinessProfileUrl`
- `ga4Id`, `gscVerification`
- Street address (`addressDisplay` stays false for service-area GBP)

## Money pages and primary keywords

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
| `/property-management-scarborough/` | property management Scarborough |
| `/property-management-toronto/` | condo property management Toronto |
| `/services/residential-property-management/` | residential property management Durham |
| `/services/tenant-screening/` | tenant screening Ontario |
| `/services/tenant-placement/` | tenant placement Durham |
| `/for-landlords/` | landlord property management Durham |
| `/for-investors/` | investor property management Durham |
| `/free-rental-analysis/` | free rental analysis Durham |

## Conversion

- Owner lead form: `LeadForm` → FormSubmit → `/thank-you/`
- Also: `/api/leads` exists for optional persistence (ephemeral on Vercel filesystem)
- Sticky mobile call → `tel:+14168343587`
- Header Call + Get a quote

Activate FormSubmit by confirming the first email to `info@9thstarpropertymanagement.ca`.

## Local SEO (off-site)

See `local-seo-checklist.md`.

Top 5 remaining actions for rankings:

1. Finish GBP (photos, services, weekly posts, correct apex URL)
2. Collect real Google reviews from actual clients only
3. Verify Search Console + submit sitemap
4. Build citations with identical NAP (Apple, Bing, FB, LinkedIn, YellowPages)
5. Add GA4 and paste real GBP URL into `site.ts`

## Tenant portal

`/tenants/` and `/residents/` share the residents experience.  
`/maintenance-request/` redirects to `/request/`.  
`/pay-rent/` redirects to `/tenants/`.

## Deploy

Vercel from GitHub `bytecrafts-ca/property-management` (main).  
Configure apex ↔ www redirect at the host so only `https://9thstarpropertymanagement.ca` is indexed.
