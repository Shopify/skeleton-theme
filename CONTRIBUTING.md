# Contributing to acadaca-core-theme

## What Belongs in Core

- Universal features used across multiple client stores
- Shopify best practices and performance optimizations
- Reusable blocks, sections, and snippets
- Base styling and layout (CSS variables, typography, color schemes)
- Bug fixes and accessibility improvements

## What Stays in Client Repos

- Client-specific branding (custom colors, fonts, logos)
- Client-specific sections (e.g., `hanro-hero.liquid`)
- Third-party integrations (Klaviyo, Intelligems, etc.)
- Store-specific templates and configuration
- Custom CSS overrides (`assets/client-custom.css`)

## Development Workflow

### Setup

```bash
git clone git@github.com:acadaca-shopify/acadaca-core-theme.git
cd acadaca-core-theme
```

### Local Development

```bash
# Preview with Shopify CLI
shopify theme dev --store=your-dev-store.myshopify.com
```

### Making Changes

```bash
# Create feature branch
git checkout -b feature/description

# Make changes, then validate
shopify theme check

# Commit (conventional commits)
git commit -m "feat: add testimonials block"
git commit -m "fix: cart drawer scroll lock on mobile"
git commit -m "chore: update dependencies"

# Push and create PR to main
git push origin feature/description
```

### Commit Message Format

Use [conventional commits](https://www.conventionalcommits.org/):

- `feat:` - New feature (bumps minor version)
- `fix:` - Bug fix (bumps patch version)
- `chore:` - Maintenance (no version bump)
- `docs:` - Documentation only
- `BREAKING CHANGE:` in body - Breaking change (bumps major version)

### PR Process

1. Create feature branch from `main`
2. Make changes and validate with `shopify theme check`
3. Push branch and open PR
4. Get code review approval
5. Merge to `main`

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **Major** (2.0.0): Breaking changes, removed features. Clients must manually upgrade.
- **Minor** (1.1.0): New features, backward compatible. Clients auto-update with `^`.
- **Patch** (1.0.1): Bug fixes, performance improvements. Clients auto-update with `^`.

## Publishing

Publishing is automated via GitHub Actions (triggers on `v*` tags):

```bash
# After merging PR to main:
npm version patch   # 1.0.0 -> 1.0.1 (bug fix)
npm version minor   # 1.0.0 -> 1.1.0 (new feature)
npm version major   # 1.0.0 -> 2.0.0 (breaking change)

git push && git push --tags
# GitHub Actions publishes to GitHub Packages automatically
```

## Developer npm Authentication

One-time setup to install/publish packages:

```bash
# Add to ~/.npmrc (never commit this file)
@acadaca-shopify:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT

# Test
npm whoami --registry=https://npm.pkg.github.com
```

PAT scopes needed:
- All developers: `read:packages`, `repo`
- Release managers (1-2 seniors): additionally `write:packages`
