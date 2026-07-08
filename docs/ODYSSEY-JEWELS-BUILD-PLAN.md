# Odyssey Jewels — Theme Build Plan

> **Tagline:** *Travel the World, Collect the World — Every Jewel Tells a Story.*
>
> This document translates the [OJ – Odyssey Jewels Web Timeline](https://docs.google.com/document/d/14x0lBh_xyqGfYKDEW3zwPg2JthE64zyl5WoszIA3utQ/edit) into a concrete technical build plan for the Shopify theme, grounded in this `skeleton-theme` codebase.
>
> **Status legend:** `[ ]` not started · `[~]` in progress · `[x]` done
> **Owner tags:** `@core` (our team / framework) · `@dev` (Upwork build-out devs) · `@client` (Gian & Angie) · `@app` (3rd-party app config)

---

## 1. Goal & Success Criteria

Build a **fully working, premium Shopify site live in ~90 days** (hard deadline before Christmas).

**Definition of done (Day 90):**
- [ ] Site live on production domain, password removed.
- [ ] Full catalog uploaded (~1,000–2,000 products), structured but staged.
- [ ] Only the **first drop** visible: **Oceania Collection** (~200 pieces) + part of **The Founders Collection** (formerly "Private Collection").
- [ ] Remaining collections staged and ready for region-by-region releases (7 Odyssey regions + 1 Founders).
- [ ] Core mechanics working: interactive world map, OJ Rewards, referral/affiliate, "sold = gone", region exclusivity.
- [ ] Influencer shortlist ready for activation.

---

## 2. Guiding Strategy

1. **We build the premium framework first.** Ship a custom, well-structured theme on top of this skeleton so the brand feels right. Then hand a documented, componentized theme to lower-cost Upwork devs for build-out, product upload, and technical grunt work.
2. **We project-manage, not hand-code everything.** Our value is architecture, brand, the "hero" custom features (world map, rewards logic), QA, and directing devs.
3. **Native-first, app-second, custom-last.** Prefer Shopify-native features → vetted apps → custom code, in that order, to hit the timeline. Reserve custom builds for the brand-defining pieces.

---

## 3. Current State — Skeleton Audit

This theme is Shopify's official **Skeleton Theme** (v0.1.0) — an intentionally minimal, best-practice starting point. What exists today:

```
assets/      critical.css, icon-account.svg, icon-cart.svg, shoppy-x-ray.svg
blocks/      group.liquid, text.liquid
config/      settings_data.json, settings_schema.json
layout/      theme.liquid, password.liquid
locales/     en.default.json, en.default.schema.json
sections/    header, footer, product, collection, collections, cart, blog,
             article, search, page, 404, password, custom-section, hello-world
snippets/    css-variables.liquid, image.liquid, meta-tags.liquid
templates/   index, product, collection, list-collections, blog, article,
             cart, page, search, 404, password, gift_card, (all JSON)
```

**Reality check:** Every section is currently bare-bones. For example, `sections/product.liquid` renders a raw image loop, title, price, description, and a plain variant `<select>` — no gallery, no rich schema, no blocks. **This is a foundation, not a theme.** Nearly everything below is net-new build work.

**Conventions to keep** (from `README.md`):
- Single-property settings → CSS variables; multi-property → CSS classes.
- Use `{% stylesheet %}` / `{% javascript %}` tags inside sections/blocks.
- Essential CSS lives in `assets/critical.css`.
- JSON templates + section/block schemas so merchants can customize.

---

## 4. Information Architecture

Core hierarchy from the brief: **Region → Country → City → Artisan**, with location and artisan story front and center. Note from client: product-level attribution is uncertain, so **story data lives primarily at Collection / Sub-collection level.**

### 4.1 Recommended Shopify mapping

| Concept | Shopify primitive | Notes |
|---|---|---|
| Region (e.g. Oceania) | **Collection** (or Metaobject) | Top of the drop calendar |
| Country / City | **Sub-collection** or collection metafields | Filter/facet within region |
| Artisan | **Metaobject** (`artisan`) | Bio, photo, city, linked products |
| The Founders Collection | **Collection** | Renamed from "Private"; partial drop |
| Product ↔ Region/Artisan | **Metafields** referencing metaobjects | Powers map + storytelling |

### 4.2 Metaobjects to define `@core`

- [ ] `region` — name, slug, hero media, story, map coordinates/SVG id, color theme, release status.
- [ ] `country` — name, region (ref), map id.
- [ ] `city` — name, country (ref), coordinates.
- [ ] `artisan` — name, photo, bio, city (ref), products (list ref).

### 4.3 Product metafields to define `@core`

- [ ] `custom.region` (ref → region)
- [ ] `custom.country` / `custom.city` (ref or text)
- [ ] `custom.artisan` (ref → artisan)
- [ ] `custom.is_one_of_a_kind` (boolean) — drives "sold = gone"
- [ ] `custom.collection_theme` (text) — region-themed styling/backgrounds
- [ ] `custom.story` (rich text) — per-product narrative when available

> A documented metafield/metaobject spec is a **hard dependency** for the CSV bulk upload — column headers must map 1:1 to these keys.

---

## 5. Design System

- [ ] **Palette:** Navy (primary) + Rose (accent). Define full scale in `config/settings_schema.json` and expose as CSS vars via `snippets/css-variables.liquid`.
- [ ] **Typography:** Premium pairing (display serif + clean sans). Set in theme settings; preload base weight (pattern already in `layout/theme.liquid`).
- [ ] **Logo:** Cleaned-up mark — separate "OJ" from wordmark, keep compass rose, remove busy background so it works for embroidery/small branding. `@client` to supply source; `@core` to produce SVG variants (full, mark-only, mono).
- [ ] **Tone:** Editorial, story-first, generous whitespace, large photography. "Every Jewel Tells a Story."
- [ ] **Design tokens doc:** spacing scale, radii, shadows, motion — documented so `@dev` stays consistent.

---

## 6. Theme Component Build-Out

Mapped to the skeleton's folders. Items marked `@core` are the premium framework we build; `@dev` items are handed off.

### 6.1 Global / Layout `@core`
- [ ] `layout/theme.liquid` — add skip links, header/footer groups, cart drawer mount, structured-data hooks, GTM/analytics slot.
- [ ] `snippets/css-variables.liquid` — full token set (Navy/Rose, spacing, type scale).
- [ ] `snippets/meta-tags.liquid` — Open Graph, Twitter, canonical, JSON-LD org/product.
- [ ] `assets/critical.css` — base grid, typography, buttons, header/footer critical styles.

### 6.2 Header & Navigation `@core`
- [ ] Clean navigation focused on **region-based collections** (Oceania, Founders, etc.) — not a deep Region→Country→City mega-menu. Country/city surface as filters on the collection page, not primary nav.
- [ ] Cart drawer (AJAX cart) — standard behavior; no special "sold = gone" logic needed here (handled by inventory, see §7.4).
- [ ] Predictive search.
- [ ] Account entry (ties to Rewards).

### 6.3 Homepage sections `@dev` (framework by `@core`)
- [ ] Hero (brand video + "Travel the World, Collect the World").
- [ ] Interactive World Map section (**hero custom feature** — see §7.1).
- [ ] Featured drop (Oceania) carousel/grid.
- [ ] "How it works" / storytelling band.
- [ ] Featured artisans.
- [ ] Rewards teaser.
- [ ] Newsletter signup.

### 6.4 Product page (PDP) — rebuild `sections/product.liquid` `@core`
- [ ] Media gallery (multi-image, angles, zoom, video).
- [ ] Region/country/city/artisan badges linking to story.
- [ ] Variant picker + robust add-to-cart, dynamic checkout.
- [ ] "One of a kind" indicator + sold-out → "gone" state.
- [ ] Artisan story block (from metaobject).
- [ ] Trust/shipping/returns accordion.
- [ ] Structured data (Product JSON-LD).
- [ ] Blockified so `@dev`/merchant can reorder.

### 6.5 Collection page (PLP) — rebuild `sections/collection.liquid` `@core`
- [ ] Region hero + collection story header.
- [ ] Faceted filtering (country, city, artisan, price, availability).
- [ ] Sort, pagination/infinite scroll.
- [ ] Sub-collection navigation.

### 6.6 Supporting pages `@dev`
- [ ] Collections index (`collections.liquid`) as a "regions of the world" gateway.
- [ ] Blog + article templates (storytelling / SEO content).
- [ ] Cart page + drawer parity.
- [ ] Search results with facets.
- [ ] Account pages (rewards, referrals, personal map).
- [ ] Static: About, Artisans, Returns/Repair policy, Contact, FAQ.
- [ ] 404, password/coming-soon (branded).

### 6.7 Reusable blocks/snippets `@core`
- [ ] `product-card` snippet (with region tag, one-of-a-kind flag).
- [ ] `artisan-card`, `region-card`.
- [ ] Rich `image`/media snippet upgrade (responsive, art direction).
- [ ] `rating`/`badge`/`button` primitives.

---

## 7. Feature Specifications

### 7.1 Interactive World Map ⭐ (core to the hook) `@core`
**Behavior (per client note):** customers should be encouraged to buy from *all* regions. On purchase from a region, that region shifts from **muted / B&W → full color** on the customer's personal map. Do **not** gate regions behind unlocks.
- [ ] Personal map on account page reflecting purchased regions (full color).
- [ ] Global/marketing map on homepage showing available regions + drop status.
- [ ] Data source: order line items → product `region` metafield → customer state.
- [ ] Tech: SVG world map + JS; persist state via customer metafields or app proxy.
- [ ] Gamification hooks: badges tied to regions (but **loyalty tiers are volume-based**, not region-gated — several years until all 7 regions exist).
- [ ] Decision: build in-theme (customer metafields) vs. lightweight app/app-proxy for reliable write-on-purchase.

### 7.2 OJ Rewards / Loyalty `@app` + `@core`
- [ ] Gem-themed collectible **tiers** based on **purchase volume**.
- [ ] **Badges** (can incorporate regions), unlockable benefits.
- [ ] Early access to **The Founders Collection**.
- [ ] Replaces discounting — preserve luxury feel (no coupon spam).
- [ ] Evaluate apps (Smile.io, Yotpo, Rivo, LoyaltyLion) vs. custom; theme integration + custom badge/map styling by `@core`.

### 7.3 Referral & Affiliate `@app`
- [ ] Multi-layer referral + affiliate program for organic growth.
- [ ] Evaluate **CJ.com** (client request) alongside standard affiliate apps (UpPromote, Refersion, GoAffPro).
- [ ] Referral surfaced in account + post-purchase.

### 7.4 "Sold = Gone" (one-of-a-kind) `@core`
Keep this simple — **inventory drives it, not custom logic.** One-of-a-kind pieces have quantity 1, so when inventory hits **0 the piece is gone**.
- [ ] Set unique pieces to inventory qty 1 with "stop selling when out of stock."
- [ ] Use Shopify's native out-of-stock handling; optionally auto-hide sold-out products from collections (Shopify setting / simple Flow).
- [ ] Theme shows a tasteful sold-out state on the product page for direct URL hits.
- [ ] No heavy custom double-sell logic required.

### 7.5 Bulk Inventory Upload `@dev` + `@core`
- [ ] Define **CSV/Excel template** with columns mapped to metafields/metaobjects (§4.3).
- [ ] Region, country, city, artisan, one-of-a-kind, theme, images per row.
- [ ] Shopify native CSV import + Matrixify (Excelify) for metafields/metaobjects at volume.
- [ ] Validation checklist before import; staged (hidden) except first drop.

### 7.6 AI Photo Background Pipeline `@core` + `@client`
Solves photography bottleneck at volume.
- [ ] Input: lightbox / Sony shots, white background, multiple angles per product.
- [ ] Flow: raw shots → Excel manifest → automation → consistent, **region-themed** backgrounds.
- [ ] **Month 1 test:** 10–30 products to validate quality/consistency before scaling.
- [ ] Output naming maps to product handle/SKU for bulk import.
- [ ] Tooling decision: which AI background service + batch script.

### 7.7 SEO / GEO / AEO `@core`
- [ ] **SEO** (search engines): semantic HTML, metafields, JSON-LD, sitemaps, fast Core Web Vitals, clean URLs.
- [ ] **AEO** (answer engines): FAQ schema, concise Q&A content for AI Overviews.
- [ ] **GEO** (generative engines): authoritative brand/story content so ChatGPT/Claude/Gemini cite OJ.
- [ ] Done throughout build; **post-launch report** + optimization pass based on findings.

### 7.8 Payments `@client` + `@core`
- [ ] Stripe / Shopify Payments.
- [ ] **Decision:** crypto payments yes/no + which provider.

---

## 8. Tech Stack

- **Platform:** Shopify (chosen over WordPress/WooCommerce for stability, inventory volume, bulk upload).
- **Theme:** Online Store 2.0, this skeleton as the base; Liquid + native `{% stylesheet %}`/`{% javascript %}`.
- **Data:** Metafields + Metaobjects for Region/Country/City/Artisan.
- **Bulk ops:** Matrixify for import/export at volume.
- **Automation:** Shopify Flow for "sold = gone", staging, tagging.
- **Apps:** Loyalty, Referral/Affiliate (TBD per §7).
- **Custom:** World map, storytelling components, brand framework.

---

## 9. Timeline (90 Days)

### Month 1 — Foundation & Branding
- [ ] Brand assets: simplified logo, Navy+Rose palette, fonts, brand guide. `@core` `@client`
- [ ] Set up Shopify store + build theme framework on skeleton. `@core`
- [ ] Define IA + metafields/metaobjects (Region→Country→City→Artisan). `@core`
- [ ] Wireframe key pages: home, collection, product, collection-story/sub-collections, membership/account. `@core`
- [ ] `@client` deliver Excel of all products, categorized by region/collection.
- [ ] Spec AI photo pipeline + run 10–30 product test (white bg, multi-angle, region bg). `@core` `@client`
- [ ] Vet & onboard build-out devs. `@core`
- [ ] Content inspiration + competitor/market analysis. `@core`
- [ ] **Milestone:** systems/processes working, brand locked, sitemap + theme framework + photo pipeline defined.

### Month 2 — Core Build
- [ ] Custom theme build on framework: home, PDP, PLP, upcoming collections, blog + article. `@dev` `@core`
- [ ] Interactive World Map (region color-on-purchase) in account. `@core`
- [ ] OJ Rewards (tiers, badges, Founders access) in account. `@app` `@core`
- [ ] Referral & affiliate system. `@app`
- [ ] SEO / GEO / AEO groundwork. `@core`
- [ ] Run AI photo pipeline on first collection; begin catalog upload (staged/hidden except first). `@dev`
- [ ] Email newsletters prepared. `@core`
- [ ] **Milestone:** theme built; map/rewards/referral working in staging; upload underway; first collection shot & processed; SEO/GEO/AEO started.

### Month 3 — Content, QA & Launch (Weeks 9–12)
- [ ] Finish uploading all products; only first collection set to "drop." `@dev`
- [ ] Embed brand video, product videos, storytelling videos. `@dev`
- [ ] Full QA: checkout, payments, rewards logic, referral tracking, world map, mobile, performance. `@core`
- [ ] Wire first-drop mechanics (region exclusivity, disappear-when-sold). `@core`
- [ ] Payment structure (Stripe + crypto?). `@client` `@core`
- [ ] Soft launch / private preview to early members. `@core`
- [ ] Social media strategy ready by launch (video/static content, calendar, accounts). `@client`
- [ ] **Milestone (Day 90):** site live, full catalog uploaded, first collection dropped.

### Parallel — Influencer & Engine Optimization (Weeks ~6–12)
- [ ] Build & vet influencer shortlist; prep outreach lists.
- [ ] SEO/GEO/AEO optimization during build; post-launch report + optimization.

---

## 10. What We Need From the Client `@client`

- [ ] **Product Excel/CSV** — all products, categorized by region/collection, with as much country/city/artisan attribution as exists.
- [ ] **Logo source files** (vector preferred) for cleanup.
- [ ] **Photography** — raw lightbox/Sony shots (white bg, multi-angle) for the pipeline.
- [ ] **Brand/story content** — region stories, artisan bios, brand video assets.
- [ ] **Policy content** — returns/repair, shipping, terms.
- [ ] **Decisions** — see §11.

---

## 11. Open Decisions

- [ ] Confirm **kickoff date** (3 months from July; hard date before Christmas).
- [ ] **First drop region** — Oceania first (Asia next); confirm Founders portion for launch.
- [ ] **Budget** — dev resourcing, apps, photo tooling.
- [ ] **Product info structure** + competitor/market analysis sign-off.
- [ ] **Returns / repair policy.**
- [ ] **Additional plugins?**
- [ ] **Crypto payments** yes/no + provider.
- [ ] Loyalty & affiliate: **app vs. custom** (incl. CJ.com evaluation).
- [ ] World map: **in-theme vs. app-proxy** persistence.
- [ ] Rename confirmation: **"Private Collection" → "The Founders Collection."**

---

## 12. Dev Resourcing & Handoff `@core`

To hand a clean build to Upwork devs:
- [ ] Component/section documentation + coding standards (follow skeleton conventions).
- [ ] Design system + Figma/wireframes.
- [ ] Metafield/metaobject spec + CSV template.
- [ ] Definition-of-done + QA checklist per page type.
- [ ] Staging store access + Git workflow (`shopify theme dev` / pull-request review).
- [ ] Clear scope split: `@core` owns framework + hero features; `@dev` owns build-out, uploads, page assembly.

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Photography at volume | Blocks launch | AI pipeline + Month-1 test to de-risk early |
| Incomplete artisan/product data | Weakens story | Story at collection level; enrich over time |
| Hard Christmas deadline | Scope creep | Native-first, phase non-critical features post-launch |
| World map complexity | Timeline slip | Ship marketing map first; personal map iteration |
| Bulk upload errors | Bad catalog | Matrixify + validation checklist + staged/hidden |
| App sprawl (loyalty/referral) | Cost + perf | Evaluate, pick one each, integrate cleanly |

---

## 14. Immediate Next Actions

1. [ ] Client confirms kickoff date, first drop region, and budget (§11).
2. [ ] `@client` sends product Excel + logo source + sample photos.
3. [ ] `@core` locks Navy+Rose palette and typography in theme settings.
4. [ ] `@core` defines metaobjects + product metafields (§4).
5. [ ] `@core` runs AI photo pipeline test on 10–30 products.
6. [ ] `@core` rebuilds PDP + PLP as the framework reference implementation.
7. [ ] `@core` posts Upwork roles and begins vetting `@dev`.
