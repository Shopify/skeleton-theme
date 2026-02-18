# Changelog

All notable changes to `@acadaca-shopify/acadaca-core-theme` will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-02-18

### Added
- Initial release: Skeleton theme structure + full Horizon feature copy
- 94 blocks from Horizon (all reusable theme blocks)
- 39 sections from Horizon (main-404, main-blog, main-cart, main-collection, main-page, product-information, header, footer, hero, carousel, etc.)
- 116 assets (CSS, JS, SVG icons)
- 95 snippets (product-card, price, media, slideshow, etc.)
- 13 templates (404, article, blog, cart, collection, index, list-collections, page, page.contact, password, product, search)
- 51 locale files
- Horizon config (settings_schema.json, settings_data.json)
- Horizon layout (theme.liquid)
- NPM package configuration for GitHub Packages
- Source provenance documentation (HORIZON_VERSION.md)
- Dual MIT licenses (Skeleton + Horizon)

### Removed
- 11 orphaned Skeleton sections replaced by Horizon equivalents (404, article, blog, cart, collection, collections, custom-section, page, product, search, hello-world)

### Source
- **Skeleton**: [Shopify/skeleton-theme@04069e0](https://github.com/Shopify/skeleton-theme/commit/04069e0feda9f7f8bda8df65ca5a22791c61c997)
- **Horizon**: [Shopify/horizon@a6a3484](https://github.com/Shopify/horizon/commit/a6a3484ce86dea3810290bad9c475847ba504c86)

### Known Issues
- 2 `UniqueStaticBlockId` errors in `sections/header.liquid` (upstream Horizon design pattern using variant-based blocks)
- 22 warnings from Horizon's own code (theme check static analysis limitations with `{% render %}` variable passing)
