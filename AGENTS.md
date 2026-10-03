# Glow Verve Theme Agent Guide

A minimal Shopify theme that defines page structure directly in Liquid. This
file lists the repository conventions that aren't obvious from an individual
file. The code is the source of truth.

## Non-negotiables when editing this theme

- **Standard Liquid only:** the store's theme parser rejects any file that
  uses an unreleased tag, and a rejected `layout/theme.liquid` makes the theme
  unpublishable ("missing required file"). Do not use the preview
  `{% block %}` or `{% partial %}` tags. Local Theme Check may accept tags the
  store does not, so passing Theme Check is not proof a file will upload.
- **No sections:** no `sections/` folder, no `{% section %}`/`{% sections %}`
  tags, no JSON templates.
- **No Liquid-embedded assets:** no `{% stylesheet %}`, no `{% javascript %}`.
  All CSS and JavaScript live in `assets/`.
- **Direct Liquid templates:** templates render page content from snippets
  and inline markup.
- **Template-owned containers:** each `templates/*.liquid` file wraps its page
  content in one or more `<section class="block-container">` elements, one per
  vertical slice (add tone or spacing classes such as `tone-surface` or
  `block-container--flush`). `layout/theme.liquid` wraps only the header and
  footer in their own `<div class="block-container">` and renders
  `content_for_layout` in a plain `<main>`. Exceptions with
  `{% layout none %}`: `gift_card.liquid` manages its own document, and
  `cart.drawer.liquid` / `search.predictive.liquid` are fragments that
  `assets/theme.js` fetches with `?view=drawer` / `?view=predictive`.
- **Whitespace matters:** include whitespace between an HTML tag name and a
  following Liquid delimiter (`<li {% ... %}`, not `<li{% ... %}`).
- **Translated UI only:** every user-facing string uses a literal
  `{{ 'key' | t }}` call.
- **Shopify routes for storefront URLs:** use Liquid `routes.*` for every
  storefront path; never hardcode `/cart`, `/search`, or `/collections`.

## Page structure

```
layout/theme.liquid    → announcement-bar + .block-container (header) + <main> content_for_layout + .block-container (footer) + cart-drawer
layout/password.liquid → <main> content_for_layout
templates/*.liquid     → <section class="block-container"> → snippets / inline HTML
```

## Merchant settings

Without sections or theme blocks, every merchant-editable control is a theme
setting in `config/settings_schema.json` (Brand, Typography, Layout, Colors,
Announcement bar, Header, Home page, Footer). Snippets read them from the
global `settings` object. Add new controls there rather than hardcoding
content.

## Snippets

- Start every snippet with a `{% doc %}` header documenting each parameter it
  reads, plus an `@example`.
- `{% render %}` gives a snippet its own scope: pass everything it needs
  (`product`, headings, limits) as parameters. Global objects such as
  `settings`, `routes`, `cart`, and `collections` are available directly.
- Translate strings before passing them in (`assign heading = 'key' | t`,
  then `heading: heading`).

Skeleton keeps `.theme-check.yml` as a pristine
`extends: theme-check:recommended` with **zero overrides**. Fix Theme Check
errors in the Liquid instead of adding configuration exceptions.

## Glow Verve brand conventions

- Colours are theme settings (`background`, `foreground`, `surface`, `accent`,
  `product_tile`) exposed as `--color-*` tokens in `snippets/css-variables.liquid`.
  Never hardcode brand colours in CSS; the palette is changing with the new
  packaging. `config/settings_data.json` ships two theme styles: "Brand
  guidelines" (cream `#F7EBCD`, tan `#DFAB52`, black) and "Packaging 2026"
  (yellow `#F4E604`).
- Logos come from `settings.logo`, `settings.logo_mark` and
  `settings.logo_stacked` (images in Content > Files). Never alter them.
- Headings use `--font-heading--family` (Alifira when its file URL is set,
  otherwise the heading font picker); body copy uses Montserrat.
- Storefront JavaScript lives in `assets/theme.js` as progressive enhancement:
  the bag drawer, predictive search, and sticky mobile add-to-bag all fall
  back to plain links and form posts without it. Fetch server-rendered HTML
  (alternate `view` templates) rather than formatting prices in JavaScript.
- Product pages read optional `custom.*` metafields: `subtitle`,
  `key_ingredient`, `when_to_use`, `format`, `directions`, `ingredients`,
  `caution`. `Ingredient_*` product tags are the fallback for key ingredients.
  Product cards derive AM/PM routine badges from `when_to_use` by matching
  the whole words "AM" and "PM". Each card is tinted with its Skin Lab
  element colour (first `custom.concerns` value; the colour map lives in
  `snippets/product-card.liquid` and must match the orbs in
  `templates/index.liquid`). The card title link is stretched over the card;
  interactive controls inside it need `z-index: 2`.
- The home page quiz is "The Skin Lab" (`assets/skin-lab.css`, loaded only by
  `templates/index.liquid`): answers are element orbs orbiting a flask that
  fills with each answer's colour, modelled on the mazenonline magnetic
  ingredients lab. Orb colours are fixed design tokens in the template, not
  brand settings. Tap/click pours an orb in immediately; keyboard users move
  with arrow keys and confirm with Next. Honour `prefers-reduced-motion`.
- Interactive features (skin quiz, routine builder, "Your routine", "Your
  match" badges, recently viewed) live in `assets/routine.js`. It reads the
  JSON catalogue from `snippets/product-catalog-json.liquid`, which takes its
  routine data from the `custom.concerns`, `custom.layer_order` and
  `custom.conflicts_with` metafields. Personal state stays in the visitor's
  localStorage only (`glowverve:quiz`, `glowverve:routine`, `glowverve:recent`).
  Sections it drives are server-rendered with `hidden` and revealed by the
  script; add new translated strings to the catalogue's `strings` object.
- To check that Liquid will upload before merging, zip the theme folders,
  upload the zip with `stagedUploadsCreate`, and create a `DEVELOPMENT`
  theme with `themeCreate`; any file missing from the new theme was rejected.

## Theme map

```
templates/            *.liquid page structure (no JSON templates)
layout/               theme.liquid document shell, password.liquid
snippets/             announcement-bar, header, footer, cart-drawer, cart-drawer-content,
                      collection-filters, product-grid, product-card, product-catalog-json,
                      price, image, meta-tags, css-variables
assets/               CSS, JavaScript, and other static assets
config/               settings_schema.json (all merchant controls), settings_data.json (theme styles)
```
