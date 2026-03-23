# AGENTS.md - AI Contributor Guide

This file is for any AI coding assistant (Claude, Codex, Cursor, etc.) working in this repository.

## Goal

- Keep the starter aligned with Shopify docs-first patterns.
- Keep TypeScript for behavior and Liquid for markup.
- Keep customization safe via stable `data-js` contracts.

## Non-Negotiable Rules

- Do not generate cart/minicart/search HTML strings in TS.
- Do not add `{% render 'vite-tag' %}` in sections/snippets.
- Keep entrypoint routing centralized in `layout/theme.liquid`.
- Keep API calls user-driven where required by this starter architecture.

## Where to Implement Changes

- Global bootstrap: `frontend/entrypoints/ts/theme.ts`
- Cart drawer logic: `frontend/entrypoints/ts/cart/drawer.ts`
- Cart page logic: `frontend/entrypoints/ts/cart/page.ts`
- Product logic: `frontend/entrypoints/ts/product.ts` + `frontend/entrypoints/ts/product/*`
- Collection logic: `frontend/entrypoints/ts/collection.ts`
- Search drawer logic: `frontend/entrypoints/ts/search/drawer.ts`
- Liquid markup: `sections/**`, `snippets/**`

## Shopify Patterns Required

- Cart mutations use bundled section rendering (`sections`, `sections_url`).
- Single section rendering (`?section_id=`) is used only where explicitly intended (e.g. drawer hydration).
- Locale-aware routes use `window.Shopify.routes.root`.

## Stable Data Contracts

- Cart drawer: `cart-drawer`, `cart-open`, `cart-close`, `cart-items`, `cart-empty`, `cart-subtotal`
- Cart page: `cart-page`, `cart-page-items`, `cart-page-empty`, `cart-page-footer`, `cart-page-subtotal`
- Product: `product-form`, `option-value`, `thumbnail`, `add-to-cart`, `cart-status`
- Collection: `collection-root`, `collection-controls`, `collection-products`, `collection-load-more`, `collection-quick-buy`
- Search drawer: `search-drawer`, `search-open`, `search-close`, `search-drawer-input`, `search-drawer-groups`

## Local Validation

Run these before considering work complete:

```bash
bun run typecheck
bun run build
```

If available in the environment:

```bash
theme-check
```

## Branch-Linked Shopify Reminder

For branches connected directly to a Shopify theme, generated assets must be committed:

- `assets/*`
- `assets/.vite/manifest.json`
- `snippets/vite-tag.liquid`

## Suggested Work Loop for AI

1. Read `CLAUDE.md`, `README.md`, and this file.
2. Edit TS behavior and Liquid markup in their correct layers.
3. Preserve `data-js` hooks unless intentionally migrating both TS + Liquid.
4. Run typecheck/build.
5. Update docs/todo when architecture contracts change.
