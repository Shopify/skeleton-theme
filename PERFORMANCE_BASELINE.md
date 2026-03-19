# Performance Baseline

Date: 2026-03-19

## Method

- Build command: `bun run build`
- Asset source: `assets/.vite/manifest.json` + Vite build output
- Template loading rule validation: `layout/theme.liquid` router inspection

## JS Payload Baseline (Built Assets)

- `ts/theme.ts`: `assets/theme-BHxQweo7.js` (2.39 kB, gzip 1.18 kB)
- `ts/product.ts`: `assets/product-DPYfuql-.js` (1.13 kB, gzip 0.57 kB)
- `ts/collection.ts`: `assets/collection-BkAueZBQ.js` (1.43 kB, gzip 0.61 kB)
- `ts/cart.ts`: `assets/cart-DAS8aBaw.js` (0.12 kB, gzip 0.13 kB)
- `ts/search.ts`: `assets/search-Dt-ufTnA.js` (2.43 kB, gzip 1.19 kB)
- cart drawer split chunk: `assets/drawer-HPI4d66D.js` (4.83 kB, gzip 1.95 kB)

## CSS Baseline

- `css/main.css`: `assets/main-CZyZ8laC.css` (25.02 kB, gzip 5.41 kB)

## Template-Specific Loading Validation

From `layout/theme.liquid`:

- Always loaded: `css/main.css`, `ts/theme.ts`
- Product: `ts/product.ts`
- Collection: `ts/collection.ts`
- Cart: `ts/cart.ts`
- Search: `ts/search.ts`

This keeps template payloads scoped to `theme + template entrypoint`.

## LCP/CLS Baseline

- Requires runtime capture against live/preview storefront pages (Home, PDP, PLP).
- Use Lighthouse/PageSpeed in browser context to collect and persist numeric baseline values.
