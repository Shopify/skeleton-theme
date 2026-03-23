# TODO - Shopify Skeleton Theme (Docs-First Optimization)

## North Star
- [ ] Keep this starter aligned with Shopify documentation first
- [ ] Use Section Rendering/Bundled Section Rendering as the default dynamic UI pattern
- [ ] Keep customization easy for future themes (logic reusable, markup editable in Liquid)

---

## Core Architecture Principles (Non-negotiable)
- [x] No HTML template strings in TS for cart and minicart flows
- [x] Cart and minicart UI updates driven by Section Rendering responses
- [x] No API calls without user interaction
- [x] Loading states without layout shift (pulse + overlay)
- [x] Document the "TS logic only, Liquid markup only" rule in contributor docs

---

## 1) P0 - Section Rendering Foundation

### Contract and utilities
- [x] Create a shared utility for section parsing/replacement (avoid duplicated logic in cart/drawer)
- [x] Standardize null-section fallback strategy (Shopify docs: sections can return `null`)
- [x] Standardize bundled request payload (`sections`, `sections_url`) across all cart mutations

### Robustness
- [x] Add request sequencing guard for rapid quantity interactions (prevent out-of-order UI state)
- [x] Ensure cart count, subtotal, and item list always remain synchronized after updates
- [x] Validate graceful fallback when section fetch fails (recoverable error + safe redirect only when necessary)

Acceptance:
- [x] Every cart UI update path uses section rendering response as source of truth
- [x] Rapid interactions do not produce stale UI
- [x] `null`/failed section responses are handled predictably

---

## 2) P0 - Shopify Docs Parity

### Cart API parity
- [x] Audit `cart/change.js` usage against Shopify Ajax Cart docs
- [x] Confirm locale-aware URL handling for all fetches
- [x] Confirm `sections_url` is always valid and starts with `/`

### Section Rendering parity
- [x] Validate `?section_id=` flow for single-section refresh where applicable
- [x] Validate bundled sections behavior for cart mutations
- [x] Add explicit handling for sections that return `null` while response status is `200`

Acceptance:
- [x] Implementation matches documented Shopify patterns for cart and section rendering
- [x] Edge cases from docs are covered in code paths

---

## 3) P0 - PDP Media Reliability

### Variant/media behavior
- [x] Fix regression: selected color + size change must not hide/remove first image
- [x] Change media only when target variant has `featured_media`
- [x] If variant has no dedicated media, keep current color media context

### Validation
- [x] Validate `data-variant-media` mapping for shared media across variants
- [x] Stress test rapid option changes (no blank gallery, no wrong image jumps)
- [x] Compare with Dawn behavior (`assets/product-info.js`, `snippets/product-media-gallery.liquid`)

Acceptance:
- [x] No media disappearance on size-only changes
- [x] Color/media transitions remain consistent and predictable

---

## 4) P1 - PLP (Collection) with Same Mindset

### State integrity
- [x] Keep filters/sort fully reflected in URL params
- [x] Keep browser history behavior stable and reversible
- [x] Ensure clear/reset state is deterministic

### UX and performance
- [x] Keep loading/empty/error states explicit without CLS regressions
- [x] Reduce unnecessary DOM work during filter/sort interactions
- [x] Compare lifecycle behavior with Dawn (`assets/facets.js`)

Acceptance:
- [x] PLP interactions are stable across refresh/back/forward
- [ ] Mobile filter UX has no regressions

---

## 5) P1 - Predictive Search Drawer (Docs-First)

### UX and interaction model
- [x] Add search trigger in header (`data-js="search-open"`) with drawer behavior aligned to cart (open/close/overlay/ESC/focus trap)
- [x] Open search as right-side aside with inline search field and predictive results panel
- [x] Keep close behavior consistent across close button, overlay click, and Escape
- [x] Restore focus to trigger on drawer close

### Shopify docs parity (Ajax Predictive Search)
- [x] Use `/search/suggest.json` with locale-aware base URL (`window.Shopify.routes.root`)
- [x] Use documented resources params (`resources[type]`, `resources[limit]`, `resources[options][unavailable_products]`)
- [x] Keep graceful fallback when predictive endpoint is unavailable (full search submit still works)
- [x] Ensure no predictive API request before user interaction (drawer open + input length threshold)

### Performance and resilience
- [x] Debounce input and cancel stale requests (`AbortController`)
- [x] Prevent out-of-order render on rapid typing
- [x] Keep loading/error states without layout shift (reserved result area + subtle loader)
- [x] Keep drawer fully functional on mobile and desktop

### Starter customization surface
- [x] Keep markup in Liquid and behavior in TS (same cart/minicart architecture rule)
- [x] Define stable data attributes contract for search drawer elements
- [x] Document safe customization points (layout, item card markup, result grouping)

Acceptance:
- [x] Search drawer opens/closes accessibly and predictably
- [x] Predictive results are fast, cancellable, and stable under rapid input
- [x] Full search remains available as fallback path
- [x] No API calls happen before user interaction

---

## 6) P1 - Accessibility and UX Hardening

- [x] Verify keyboard-first flows for cart page, minicart dialog, and PDP ATC
- [x] Verify live region messaging for success/error/cart updates
- [x] Verify focus restore paths after dialog close and failed actions
- [x] Keep loading communication visual + accessible without visible status text shifts

Acceptance:
- [x] Core interactive flows are accessible with keyboard and screen readers

---

## 7) P1 - Starter Customization Surface

### Theme-extensible design
- [x] Document stable data attributes used by TS modules (public contract)
- [x] Document which Liquid blocks are safe to customize without breaking logic
- [x] Keep behavior modules isolated so teams can swap markup/styles safely

### Documentation updates
- [x] Update `CLAUDE.md` with docs-first section-rendering conventions
- [x] Add README section: "Customization without breaking core cart flows"
- [x] Add `AGENTS.md` guide for generic AI contributors

Acceptance:
- [x] New theme implementations can customize markup/styles without changing core JS logic

---

## 8) Quality Gates (Continuous)

- [x] `bun run typecheck`
- [x] `bun run build`
- [ ] `theme-check`
- [ ] Manual smoke checks: PDP, PLP, cart page, minicart
- [ ] Verify network: no cart/recommendation API call before first user interaction

Acceptance:
- [ ] Checks pass and behavior is validated after each milestone

---

## Priority Snapshot

### P0 (now)
- [x] Section Rendering foundation and null/failure hardening
- [x] Full Shopify docs parity for cart + section rendering flows
- [x] PDP variant-media reliability fix

### P1 (next)
- [ ] PLP state/performance stabilization
- [x] Predictive search drawer (header trigger + aside + docs parity)
- [x] Accessibility hardening across templates
- [x] Starter customization contract + documentation

### P2 (later)
- [ ] UX polish and final cleanup

---

## P0 Definition of Done (Execution Checklist)

### DoD - 1) Section Rendering Foundation
- [x] All cart and drawer updates use section HTML returned by API (no custom HTML assembly in TS)
- [x] Shared section replace helper is used in both cart page and drawer modules
- [x] Request sequencing guard prevents stale UI on rapid `+/-/remove` clicks
- [x] `cart-count`, totals, and line items stay synchronized after every mutation
- [x] `null` section payload is handled with visible recoverable error and no broken UI

Verify:
- [x] Rapid click stress test on cart page keeps consistent quantities/totals
- [x] Rapid click stress test in drawer keeps consistent quantities/totals

### DoD - 2) Shopify Docs Parity
- [x] `cart/change.js` payload includes `sections` and `sections_url` where UI re-render is required
- [x] `sections_url` always starts with `/` and is locale-safe
- [x] Single section refresh (`?section_id=`) is used only for user-triggered drawer hydration
- [x] Section rendering null-response behavior matches docs and is covered in fallback flow

Verify:
- [x] Network payloads inspected and match Shopify docs fields
- [x] Error simulation confirms graceful behavior on failed/invalid section response

### DoD - 3) PDP Media Reliability
- [x] Size change does not reset/remove first image when variant lacks `featured_media`
- [x] Color change updates media only when dedicated media exists
- [x] Thumbnail visibility remains coherent with active media context
- [x] No blank gallery states during rapid option switching

Verify:
- [x] Manual QA matrix: color -> size -> color, including variants with and without media
- [x] Behavior compared against Dawn expectations on equivalent scenarios
