# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is **@acadaca-shopify/acadaca-core-theme** — Acadaca's base Shopify theme, published as a private npm package to GitHub Packages. Client themes install this as a dependency and copy theme files to their repo root. Changes here propagate downstream to all client stores.

Built on Shopify's Skeleton theme (structure) with Horizon theme features copied in. Skeleton is tracked as `upstream` remote; Horizon is not tracked (copied once at v1.0.0, maintained independently).

## Commands

```bash
shopify theme dev --store=your-dev-store.myshopify.com   # local dev with live reload
shopify theme check                                       # lint (the only validation tool)
```

There is no build system, test runner, or CSS preprocessor. Shopify's CDN minifies assets at serve time.

Publishing is automated via GitHub Actions on `v*` tags — see CONTRIBUTING.md for the full release flow.

## Git workflow

- **Never commit directly to `main`.** Always use feature branches: `feature/CORE-{ticket}-{description}`
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `BREAKING CHANGE:`
- Jira project key: `CORE`
- No `gh` CLI available — use git directly for branch/push operations

## Code review

Code reviews follow **REVIEW.md** in this repo. It covers Liquid, JavaScript, CSS, accessibility, performance, SEO, security, and theme editor compatibility. Use it as the authoritative reference when reviewing PRs.

Client themes may also have a **REVIEW-local.md** with store-specific additions.

## Architecture decisions

**No build step.** All CSS and JS are plain source files in `assets/`. Shopify's CDN handles minification. No Sass, no bundler, no TypeScript.

**Web components.** JavaScript uses native custom elements extending a `Component` base class (`component.js`). Components use `connectedCallback`/`disconnectedCallback` lifecycle, a `refs` system for DOM queries, and `updatedCallback` for Section Rendering API re-renders.

**Section Rendering API for dynamic updates.** When user actions require content updates (variant selection, cart changes, filtering), fetch server-rendered HTML via `?section_id=` and morph the DOM. Never use `innerHTML` for section updates.

**CSS custom properties for theming.** Colors, typography, and spacing come from Liquid settings rendered as CSS variables in `theme-styles-variables.liquid`. Use `var(--color-*)` — never hardcode colors.

**Logical properties for RTL.** Use `margin-inline-start` not `margin-left`, `block-size` not `height`, etc.

**Mobile-first responsive.** Primary breakpoint at `750px`. Use `@media (min-width: 750px)`.

## Conventions

- **All user-facing strings** must use the `| t` filter with keys from `locales/en.default.json`. Schema labels use `t:` prefix.
- **Liquid values in JavaScript** must use `| json` filter to prevent XSS. No exceptions.
- **`{% render %}` only** — never `{% include %}`. Pass variables explicitly.
- **Whitespace trimming** (`{%- -%}`) on all logic tags.
- **`{{ section.id }}`** for DOM IDs — never hardcode IDs that could collide across section instances.
- **`{{ section.shopify_attributes }}`** on every section wrapper. **`{{ block.shopify_attributes }}`** on every block wrapper.
- **Kebab-case filenames.** Blocks and internal snippets prefixed with `_` (e.g., `_header-logo.liquid`).
- **Scripts use `type="module"` with `fetchpriority="low"`.**
- **Guard hover effects** with `@media (any-pointer: fine)`.
- **Respect `prefers-reduced-motion`** on all animations/transitions.
- **Shopify route objects** (`{{ routes.cart_url }}`, etc.) — never hardcode paths like `/cart`.

## Theme Check baseline

Running `shopify theme check` produces known findings from upstream Horizon code:
- 2 errors: `UniqueStaticBlockId` in `sections/header.liquid` (by design — variant-based blocks)
- ~22 warnings: false positives from Horizon patterns

These are not bugs from our work. New findings beyond this baseline should be investigated.

## What belongs in core vs client repos

**Core** (this repo): Universal features, base styling, Horizon blocks/sections, shared snippets, accessibility and performance improvements, bug fixes applicable to all stores.

**Client repos**: Store-specific branding, client-specific sections (e.g., `hanro-hero.liquid`), third-party integrations, custom CSS overrides (`client-custom.css`), store-specific templates.

See CORE.md for the full breakdown and update workflow.
