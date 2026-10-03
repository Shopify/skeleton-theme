# Glow Verve Shopify theme

Storefront theme for **Glow Verve**, Korean formulated skincare. It is built on
Shopify's Skeleton theme (direct Liquid templates, no sections) with a clean,
clinical layout inspired by theordinary.com, styled to the Glow Verve brand
guidelines.

## Pages

| Template | What it shows |
| --- | --- |
| `index` | Hero, shop-by-concern links, serum grid, brand story, 4-step routine, AM/PM pairing guide |
| `product` | Gallery, add to bag, key facts, description split into accordions, related serums |
| `collection` / `search` | Product grid with sort and pagination |
| `cart` | Line items, quantity update, subtotal, checkout |
| `page`, `blog`, `article`, `404`, `password`, `gift_card` | Brand-styled content pages |

## Brand settings (Online Store > Themes > Customize > Theme settings)

- **Brand:** primary logo, logo mark ("g"), stacked logo, favicon. The preset
  points at `Gold_Logo.png`, `Gold_Mark.png` and `Gold_Stacked.png` in
  Content > Files.
- **Typography:** heading font (Playfair Display stands in for Alifira) and
  Montserrat for body copy. To use the licensed Alifira face, upload its
  `.woff2` file to Content > Files and paste the URL into *Brand heading font
  file URL*.
- **Colors:** background, foreground, surface (cream), accent (tan), and
  product image background. Two theme styles ship in
  `config/settings_data.json`: *Brand guidelines* and *Packaging 2026* (new
  yellow `#F4E604`), so the palette can be switched when the new packaging
  launches.

## Product content (optional metafields)

Product pages work from the product description alone. When any of these
`custom` namespace metafields exist, they add extra rows and accordions:

| Key | Type | Used for |
| --- | --- | --- |
| `subtitle` | single line text | Claim line on cards and above the title (e.g. "Minimizes enlarged pores") |
| `key_ingredient` | single line text | "Key ingredients" fact (falls back to `Ingredient_*` tags) |
| `when_to_use` | single line text | "When to use" fact (e.g. "PM only") |
| `format` | single line text | "Format" fact (defaults to "Serum") |
| `directions` | rich text | Directions accordion |
| `ingredients` | multi-line text | Full INCI list accordion |
| `caution` | rich text | Caution accordion |

## Development

```bash
shopify theme dev --store glowverve-vtubbwry.myshopify.com
shopify theme check
```

See `AGENTS.md` for the repository conventions (no sections, assets only in
`assets/`, every UI string translated, `routes.*` for storefront URLs).
