# Core Theme Development Guide

## What Belongs in Core

Core contains universal features shared across all client stores:

- All Horizon blocks and sections (the base feature set)
- Universal snippets (product-card, price, media, etc.)
- Base CSS and JavaScript (critical.css, base.css, component.js, etc.)
- Settings schema and default config
- Layout templates
- Locale files
- Performance optimizations and accessibility improvements
- Bug fixes that apply to all clients

## What Stays in Client Repos

Client repos contain store-specific customizations:

- Client branding (custom colors, fonts, logos)
- Client-specific sections (e.g., `hanro-hero.liquid`)
- Client-specific CSS overrides (e.g., `assets/client-custom.css`)
- Third-party integrations (Klaviyo, Intelligems, etc.)
- Store-specific templates and template customizations
- Client-specific blocks
- Modified core files (tracked via Git diff)

## Contribution Workflow

### Adding Features to Core

1. Create a feature branch from `main`
2. Develop the feature with `shopify theme dev`
3. Validate with `shopify theme check`
4. Commit using [conventional commits](https://www.conventionalcommits.org/)
5. Push branch and open PR to `main`
6. Get code review approval
7. Merge to `main`

### Publishing a Release

After merging to `main`:

```bash
npm version patch   # Bug fix: 1.0.0 -> 1.0.1
npm version minor   # New feature: 1.0.0 -> 1.1.0
npm version major   # Breaking change: 1.0.0 -> 2.0.0

git push && git push --tags
# GitHub Actions publishes to GitHub Packages automatically
```

### Versioning Rules

This package follows [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.x): Bug fixes, performance improvements. Clients auto-update with `^`.
- **Minor** (1.x.0): New blocks, sections, features. Backward compatible. Clients auto-update with `^`.
- **Major** (x.0.0): Removed features, breaking schema changes. Clients must manually upgrade.

### When to Bump What

| Change | Version | Example |
|--------|---------|---------|
| Fix CSS bug in product card | Patch | `npm version patch` |
| Add new testimonials block | Minor | `npm version minor` |
| Improve cart drawer performance | Patch | `npm version patch` |
| Add new section with settings | Minor | `npm version minor` |
| Remove 20 unused blocks | Major | `npm version major` |
| Restructure settings schema | Major | `npm version major` |

## How Client Updates Work

1. Client runs `npm update @acadaca-shopify/acadaca-core-theme`
2. Client runs `npm run update-core` (copies new files to root, overwrite: true)
3. Git detects changes to core files
4. If client customized a file that core also updated: merge conflict
5. Developer resolves conflict (keeps both client customizations + core updates)
6. Commit and push -> Shopify auto-syncs

## Upstream Tracking

### Skeleton (Structure)
- Remote: `upstream` -> `github.com/Shopify/skeleton-theme`
- Updates: Rarely (annual or less). Skeleton is structural only.
- Process: `git fetch upstream` -> review -> merge if applicable

### Horizon (Features)
- **Not tracked as upstream.** Horizon code was copied once at v1.0.0.
- We own and maintain all copied features independently.
- Security fixes from Horizon: manually ported if applicable.
- Source version documented in `HORIZON_VERSION.md`.

## Related Documentation

- [README.md](./README.md) - Package overview and usage
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development setup and PR process
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [HORIZON_VERSION.md](./HORIZON_VERSION.md) - Source provenance
- [PRUNING_STRATEGY.md](./PRUNING_STRATEGY.md) - Block removal process
- [.planning/ARCHITECTURE.md](./.planning/ARCHITECTURE.md) - Full system architecture
