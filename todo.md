# TODO - Shopify Skeleton Theme

## Status Snapshot
- [x] P0 complete: section rendering foundation, Shopify docs parity, PDP media reliability
- [x] P1 mostly complete: PLP stability, predictive search drawer, accessibility hardening, customization docs
- [ ] Final P1 verification pass pending (mobile PLP + quality/network checks)

---

## Now (Top Priority)

### 1) PLP final mobile verification
- [ ] Verify mobile filter UX has no regressions (open/close/apply/clear/back-forward)

Acceptance:
- [ ] PLP interactions are stable on mobile across refresh/back/forward

### 2) Quality gates and behavior checks
- [x] `bun run typecheck`
- [x] `bun run build`
- [ ] `theme-check` (if available locally)
- [ ] Manual smoke checks: PDP, PLP, cart page, minicart, search drawer
- [x] Verify network: no cart/recommendation API call before first user interaction

Acceptance:
- [ ] Checks pass and behavior is validated after the final pass

Notes:
- `theme-check` is currently unavailable in this environment (`command not found` / local CLI dependency issue)

---

## Next

### P2 - UX polish and cleanup
- [ ] Final cleanup pass (copy consistency, minor interaction polish, remove dead notes)

---

## Completed Archive (Condensed)

### Architecture and docs-first contracts
- [x] TS behavior and Liquid markup split documented and enforced
- [x] Stable `data-js` contracts documented for cart, product, collection, search
- [x] AI contributor guides updated (`CLAUDE.md`, `AGENTS.md`, `README.md`)

### Cart and section rendering
- [x] Shared section rendering utility implemented and reused
- [x] Cart page and drawer updates driven by bundled section rendering responses
- [x] `sections_url` normalization and locale-aware routes validated
- [x] `null`/invalid section responses handled with recoverable UI fallback
- [x] Request sequencing guard added for rapid quantity/remove actions

### PDP media reliability
- [x] Variant/media behavior aligned to Dawn expectations
- [x] No media disappearance on size-only changes
- [x] Rapid option-switch handling avoids blank gallery states

### PLP and search drawer
- [x] Collection interactions stabilized (URL/history/state, deterministic clear/reset)
- [x] Predictive search drawer added (open/close, focus trap, ESC, restore focus)
- [x] Predictive API integration follows docs (`/search/suggest.json`, resources params)
- [x] Debounce + `AbortController` + stale-response guards implemented

### Accessibility hardening
- [x] Keyboard-first flows verified for core cart/search/product interactions
- [x] Live-region and error/status communication improved without layout shift
