# CORE-7: Configure and Test NPM Package

## Summary

Create `package.json` for npm publishing to GitHub Packages, replace Skeleton's README/CONTRIBUTING with our own, create CHANGELOG and PRUNING_STRATEGY docs, then validate the packaged theme via `npm pack` -> test install -> `shopify theme check`.

**Package name:** `@acadaca-shopify/acadaca-core-theme`
**Registry:** GitHub Packages (`https://npm.pkg.github.com`)

---

## Step 1: Create `package.json`

Create `package.json` with:
- `name`: `@acadaca-shopify/acadaca-core-theme`
- `version`: `1.0.0`
- `description`: Agency core Shopify theme (Skeleton + Horizon)
- `repository`: `github:acadaca-shopify/acadaca-core-theme`
- `publishConfig.registry`: `https://npm.pkg.github.com`
- `files` whitelist: all 8 theme directories + HORIZON_VERSION.md, LICENSE-SKELETON.md, LICENSE-HORIZON.md, PRUNING_STRATEGY.md
- `engines.node`: `>=18.0.0`

The `files` array controls what goes into the npm tarball. Exclusion patterns for `.DS_Store` and `node_modules` for safety. No `scripts` needed in the core package (scripts live in client repos).

## Step 2: Replace README.md

Replace Skeleton's README with one documenting:
- Package name and purpose (agency core theme)
- Architecture (Skeleton base + Horizon features)
- Installation instructions for client repos (`npm install` + `npm run install-core`)
- Update instructions (`npm update` + `npm run update-core`)
- What's included (file counts)
- Links to HORIZON_VERSION.md, CHANGELOG.md, .planning/ARCHITECTURE.md

## Step 3: Replace CONTRIBUTING.md

Replace Skeleton's CONTRIBUTING.md with agency-specific:
- What belongs in core vs. client repos
- Development workflow (feature branch -> develop -> PR -> main)
- Local dev setup (`shopify theme dev`)
- Validation (`shopify theme check`)
- Versioning rules (SemVer: major/minor/patch)
- Publishing process (`npm version` + tag push -> GitHub Actions)

## Step 4: Create CHANGELOG.md

Document v1.0.0:
- What's included (Skeleton + Horizon vanilla copy)
- Source SHAs
- Removed Skeleton sections (11 orphaned)
- Known: 2 upstream Horizon errors, 22 upstream warnings

## Step 5: Create PRUNING_STRATEGY.md

Per the execution plan:
- Goal: remove unused blocks after 6-12 months of real usage data
- Annual review process (every December)
- How to track usage across clients
- Archive strategy (`archived-blocks/`)
- Major version bump when removing features

## Step 6: Add `.npmrc` to `.gitignore`

Add `*.tgz` and ensure `.npmrc` won't get committed accidentally.

## Step 7: Test npm package

1. Run `npm pack` -> verify tarball created
2. Inspect tarball contents with `tar -tzf` -> verify correct dirs, no `.git/`, `.github/`, `.planning/`
3. Install in temp dir -> verify structure at `node_modules/@acadaca-shopify/acadaca-core-theme/`
4. Run `shopify theme check` on installed package -> verify passes (same 2 errors, 22 warnings as source)
5. Clean up temp dir and tarball

## Step 8: Commit and push

Stage: `package.json`, `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `PRUNING_STRATEGY.md`, `.gitignore`
Commit message: `chore: add npm package configuration and documentation`
Push to origin.

---

## Files Created/Modified

| File | Action | Description |
|---|---|---|
| `package.json` | Create | NPM package manifest |
| `README.md` | Replace | Agency core theme docs (replaces Skeleton's) |
| `CONTRIBUTING.md` | Replace | Agency dev workflow (replaces Skeleton's) |
| `CHANGELOG.md` | Create | v1.0.0 release notes |
| `PRUNING_STRATEGY.md` | Create | Block usage tracking and removal process |
| `.gitignore` | Modify | Add `*.tgz` |

## Acceptance Criteria (from Jira CORE-7)

- [ ] `package.json` created with correct name, version, publishConfig
- [ ] `"files"` whitelist includes all 8 theme directories + docs
- [ ] `"files"` excludes .DS_Store, node_modules, .git, .github
- [ ] `npm pack` creates tarball without errors
- [ ] Tarball contains correct directory structure
- [ ] Test install produces valid theme at `node_modules/@acadaca-shopify/acadaca-core-theme/`
- [ ] `shopify theme check` passes on installed package
- [ ] No Skeleton original README or package.json in tarball
