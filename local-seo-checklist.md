# Local SEO checklist (off-site)

Use this after the website is live at https://9thstarpropertymanagement.ca.

Do not invent citations or reviews. Complete each item with real business details.

## Google Business Profile (highest leverage)

- [ ] Claim or create GBP for **9th Star Property Management**
- [ ] Set primary category: **Property management company**
- [ ] Add secondary category only if accurate (for example Real estate agency)
- [ ] Service area business: cover Pickering, Ajax, Whitby, Oshawa, Clarington, Bowmanville, Courtice, Brooklin, Newcastle, Scugog, Uxbridge
- [ ] NAP must match website exactly:
  - Name: 9th Star Property Management
  - Phone: 416-834-3587
  - Email: info@9thstarpropertymanagement.ca
  - Address: only publish a real address if you want a storefront pin. If service-area only, keep address hidden consistently on site and GBP
- [ ] Hours: replace `[CLIENT_HOURS]` in `src/lib/site.ts` and mirror on GBP
- [ ] Description: natural Durham + city language (Pickering, Ajax, Whitby, Oshawa, Clarington). No keyword stuffing
- [ ] Services list: match website service pages
- [ ] Photos: real managed homes, exterior/interior, team if available (no fake stock as "our portfolio")
- [ ] Website URL: https://9thstarpropertymanagement.ca
- [ ] Booking/CTA: link to `/free-rental-analysis/`
- [ ] Weekly GBP posts for 8 weeks (vacancy tips, city notes, fee education, review asks)

## Reviews

- [ ] Ask past/current landlords for Google reviews only after a good outcome
- [ ] Script: "If you were happy with how we handled [property/city], would you leave a short Google review? Here is the link: [GBP_URL]"
- [ ] Never buy reviews. Never post fake SAMPLE reviews to Google
- [ ] Reply to every review within 48 hours

## Citations (create only real listings)

Use identical NAP everywhere:

`9th Star Property Management | 416-834-3587 | info@9thstarpropertymanagement.ca | [address if published]`

Priority directories:

- [ ] Yellow Pages
- [ ] Yelp
- [ ] Homestars
- [ ] Nextdoor Business
- [ ] BBB (if applicable)
- [ ] Ajax Chamber / Pickering Board of Trade / Whitby Chamber / Oshawa Chamber (where eligible)
- [ ] Canadian business directories you actually qualify for

Skip anything that requires fake credentials.

## Search Console + Analytics

- [ ] Add GA4 ID in `src/lib/site.ts` (`ga4Id`) and install tag
- [ ] Add Search Console verification meta (`gscVerification`)
- [ ] Submit sitemap: `https://9thstarpropertymanagement.ca/sitemap.xml`
- [ ] Inspect homepage, Durham hub, and each city money page
- [ ] Monitor queries weekly after week 3

## Conversion tracking

- [ ] GA4 events: `generate_lead` on `/thank-you/`, `click_to_call` on tel links
- [ ] Google Ads call + form conversions once ads run
- [ ] Optional call tracking number only if it still syncs to GBP carefully (avoid NAP split)

## Local links (weeks 7–12)

- [ ] Partner with local vendors (HVAC, plumbing) for reciprocal mentions where natural
- [ ] Community sponsorships in Durham with a website mention
- [ ] Landlord education posts linking to city + service pages
