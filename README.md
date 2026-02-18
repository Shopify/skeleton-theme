# @acadaca-shopify/acadaca-core-theme

Acadaca's core Shopify theme, published as a private npm package. Built on Shopify's [Skeleton](https://github.com/Shopify/skeleton-theme) theme (structure) with all [Horizon](https://github.com/Shopify/horizon) features copied in.

## Architecture

Client repos install this package as a dependency, then use install/update scripts to copy theme files to the repo root (required for Shopify's GitHub integration).

```
Client repo root (Shopify reads from here)
├── assets/          ← copied from core + client additions
├── blocks/          ← copied from core + client additions
├── sections/        ← copied from core + client additions
├── ...
├── node_modules/
│   └── @acadaca-shopify/acadaca-core-theme/   ← source
├── scripts/
│   ├── install-core.js   ← initial copy
│   └── update-core.js    ← version updates
└── .core-version         ← tracks installed version
```

## For Client Repos

### Installation

```bash
npm install @acadaca-shopify/acadaca-core-theme
npm run install-core
```

### Updating

```bash
npm update @acadaca-shopify/acadaca-core-theme
npm run update-core
git status  # review changes
```

The update script overwrites all core files. Git merge preserves client customizations.

## What's Included

| Directory | Count | Source |
|-----------|-------|--------|
| blocks/ | 94 | Horizon |
| sections/ | 39 | Horizon |
| assets/ | 116 | Horizon |
| snippets/ | 95 | Horizon |
| templates/ | 13 | Horizon |
| locales/ | 51 | Horizon |
| config/ | 2 | Horizon |
| layout/ | 1 | Horizon |

## For Core Developers

### Local Development

```bash
shopify theme dev --store=your-dev-store.myshopify.com
```

### Validation

```bash
shopify theme check
```

### Publishing

Handled by GitHub Actions on tag push (see CORE-8). Manual process:

```bash
npm version patch|minor|major
git push && git push --tags
# GitHub Actions publishes to GitHub Packages
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full development workflow.

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development and contribution guidelines
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [HORIZON_VERSION.md](./HORIZON_VERSION.md) - Source provenance (Skeleton + Horizon SHAs)
- [PRUNING_STRATEGY.md](./PRUNING_STRATEGY.md) - Block usage tracking and removal process
- [.planning/ARCHITECTURE.md](./.planning/ARCHITECTURE.md) - Full system architecture

## License

Based on Shopify's Skeleton theme and Horizon theme, both MIT licensed.
See [LICENSE-SKELETON.md](./LICENSE-SKELETON.md) and [LICENSE-HORIZON.md](./LICENSE-HORIZON.md).
