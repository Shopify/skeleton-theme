# Core Theme Source Documentation

Created: 2026-02-17

## Base (Skeleton)
- Repo: https://github.com/Shopify/skeleton-theme
- Commit: 04069e0feda9f7f8bda8df65ca5a22791c61c997

## Features (Horizon)
- Repo: https://github.com/Shopify/horizon
- Commit: a6a3484ce86dea3810290bad9c475847ba504c86

## Copied Components
- 94 blocks (blocks/)
- 39 sections (sections/ -- Horizon sections only)
- 116 assets (assets/)
- 95 snippets (snippets/)
- 13 templates (templates/)
- 51 locale files (locales/)
- Config: settings_schema.json and settings_data.json (Horizon replacements)
- Layout: theme.liquid (Horizon replacement)

## Removed Skeleton Sections
The following 11 original Skeleton sections were removed because Horizon
provides replacements and Horizon's locale files don't include the keys
these sections referenced:
- 404.liquid (replaced by main-404.liquid)
- article.liquid (replaced by main-blog-post.liquid)
- blog.liquid (replaced by main-blog.liquid)
- cart.liquid (replaced by main-cart.liquid)
- collection.liquid (replaced by main-collection.liquid)
- collections.liquid (replaced by main-collection-list.liquid)
- custom-section.liquid (replaced by section.liquid)
- page.liquid (replaced by main-page.liquid)
- product.liquid (replaced by product-information.liquid)
- search.liquid (replaced by search-header.liquid + search-results.liquid)
- hello-world.liquid (Skeleton demo section, no replacement needed)

## Notes
v1.0.0 is vanilla Horizon copy with orphaned Skeleton sections removed.
Future versions will add agency customizations.
