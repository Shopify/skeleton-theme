# TODO — Shopify Skeleton Theme + Vite (Post Pre-Core)

## 0) Status
- [x] Pre-core architecture baseline completed
- [x] Vite + Shopify integration stabilized
- [x] TS entrypoints structure finalized (`frontend/entrypoints/css` + `frontend/entrypoints/ts`)
- [x] Branch-linked deploy workflow documented
- [x] README and CLAUDE docs updated

---

## 1) Repository Hygiene (final pass before core features)
- [x] Review tracked/untracked files and confirm what must be committed
- [x] Confirm `.claude/` policy (team-shared vs local-only)
- [x] Confirm `.agents/` policy (likely local-only)
- [x] Ensure `.env` and `shopify.theme.toml` are ignored
- [x] Ensure only `.env.example` and `example.shopify.theme.toml` are committed

Acceptance:
- [x] Working tree clean and intentional
- [x] No sensitive/local files tracked

---

## 2) Quality Gates & CI
- [x] Verify CI runs: `typecheck`, `vite:build`, `theme-check`
- [x] Confirm CI runs on `push` + `pull_request`
- [x] Confirm no regressions in workflow after simplifications

Step 2 closure checklist:
- [x] Open a recent PR and confirm both checks are green:
  - `Typecheck and Build`
  - `Theme Check`
- [x] Enable branch protection on `main` and `staging` with required checks:
  - `Typecheck and Build`
  - `Theme Check`
- [x] Block merge when checks are pending/failing
- [ ] (Optional) Disable direct push to `main`

Acceptance:
- [x] All checks green on PR
- [x] Failing checks block merge

---

## 3) Dev/Build Workflow Consistency
- [x] Verify `bun run dev` (local) works consistently
- [x] Verify `bun run dev:remote` works for Shopify-domain preview (tunnel)
- [x] Verify `bun run build` generates all expected assets and `vite-tag` mappings
- [x] Confirm team uses full domain in `.env` (`*.myshopify.com`)

Acceptance:
- [x] Local + remote preview both reliable
- [x] No CORS/PNA blockers in normal flow

---

## 4) Block 3 — Core Features Rollout

### Phase 1 — PDP (Product)
- [x] Audit current PDP markup and data attributes
- [x] Implement variant selection state logic in `ts/product.ts`
- [x] Sync selected variant with URL and form inputs
- [x] Update price/media state on variant change (if media mapping exists)
- [x] Add add-to-cart UX states (loading, success, error)
- [x] Handle unavailable / sold-out variants correctly

Acceptance:
- [x] Variant change updates UI correctly
- [x] Add-to-cart works and shows clear status
- [x] No JS leakage outside PDP

### Phase 2 — Cart / Drawer
- [x] Implement drawer open/close and focus handling
- [x] Quantity update/remove flows with loading states
- [x] Empty cart state UX
- [x] Error handling and resilience

Acceptance:
- [x] Keyboard accessible drawer behavior
- [x] Cart updates reliable with clear feedback

### Phase 3 — Collection (PLP)
- [x] Implement sort behavior
- [x] Implement filters (base behavior first)
- [x] Add optional progressive loading only if needed

Acceptance:
- [x] Filters/sort stable and reversible
- [x] PLP JS isolated to collection templates

### Phase 4 — Search
- [x] Implement predictive search UI state
- [x] Implement results state handling
- [x] Graceful fallback when predictive endpoint unavailable

Acceptance:
- [x] Search interactions stable
- [x] No cross-template JS side effects

---

## 5) Performance & Loading Validation
- [x] Capture baseline metrics (Home, PDP, PLP): LCP, CLS, JS payload
- [x] Verify each template loads only `ts/theme.ts` + its own entrypoint
- [x] Add dynamic imports for heavy optional logic where useful

Acceptance:
- [x] No regressions vs baseline
- [x] Template-specific payload discipline maintained

---

## 6) Documentation Finalization
- [x] Keep README aligned with actual scripts and branch-linked workflow
- [x] Keep CLAUDE.md aligned with architecture and conventions
- [x] Add short “how to start new feature branch” section (optional)

Acceptance:
- [x] New team member can run project in <10 minutes

---

## 7) Git/Release Workflow
- [x] Enforce branch model: `feat/* -> staging -> main`
- [x] Before merging to `staging`/`main`, always run `bun run build`
- [x] Commit generated artifacts for branch-linked Shopify themes

Acceptance:
- [x] Shopify branch previews always reflect latest built assets

---

## 8) Nice-to-have (after core)
- [x] Add import alias usage examples (`@ts`, `@css`) in code/docs
- [x] Add lightweight linting strategy for TS/Liquid (if needed)
- [x] Add automated smoke checklist script (optional)
