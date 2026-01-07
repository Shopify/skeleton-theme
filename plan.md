# Influence Theme - Implementation Plan

## Overview
Transform the Skeleton theme into **Influence** - a fashion-forward, editorial-style Shopify theme for Theme Store submission. Single preset with monochromatic editorial aesthetic.

**Design Direction:** Bold minimalism meets editorial sophistication (Vogue/Harper's Bazaar inspired)
- Dramatic typography scale with serif headings
- Generous whitespace and asymmetric layouts
- Full-bleed cinematic imagery
- Subtle luxury animations
- Monochromatic black/white palette with strategic accents

---

## Phase 1: Design System Foundation

### Files to Modify
- [snippets/css-variables.liquid](snippets/css-variables.liquid) - Expand to full design system
- [assets/critical.css](assets/critical.css) - Editorial typography, grid system, utilities

### Files to Create
- `snippets/color-scheme.liquid` - Dynamic color scheme application
- `assets/theme.css` - Non-critical styles (loaded async)
- `assets/icons.svg` - SVG sprite (menu, cart, account, social, chevrons)

### Key Implementation
```
CSS Variables to add:
- Typography: --font-heading-*, --font-body-*, --font-size-xs through --font-size-display
- Spacing: --space-1 through --space-48 (8px base scale)
- Animation: --duration-*, --ease-* tokens
- Layout: --section-spacing, --grid-gap
- Colors: 4-color scheme (background, foreground, accent, muted)
```

---

## Phase 2: Settings Schema

### Files to Modify
- [config/settings_schema.json](config/settings_schema.json) - Complete rewrite
- [locales/en.default.schema.json](locales/en.default.schema.json) - Add translation keys

### Settings Structure
```
1. theme_info (Influence v1.0.0)
2. Logo & Favicon
3. Colors (4 scheme colors + sale/error)
4. Typography (heading font, body font, base size)
5. Layout (page width, margins, section spacing, grid gap)
6. Buttons (style, uppercase option)
7. Animations (enable, style: subtle/elegant/dramatic)
8. Social media links
9. Cart (type: page/drawer, notes, vendor)
```

---

## Phase 3: Layout & Navigation

### Files to Create
- `sections/announcement-bar.liquid` - Dismissible announcements
- `snippets/header-drawer.liquid` - Mobile navigation
- `snippets/mega-menu.liquid` - Desktop mega menu
- `snippets/icon.liquid` - Icon rendering helper

### Files to Modify
- [sections/header.liquid](sections/header.liquid) - Full rewrite with:
  - Sticky header with scroll behavior
  - Transparent/solid modes
  - Mega menu with images
  - Mobile drawer
  - Search, cart, account icons

- [sections/footer.liquid](sections/footer.liquid) - Multi-column with blocks:
  - Menu blocks
  - Newsletter block
  - Social links block
  - Rich text block
  - Country/language selectors
  - Payment icons

- [sections/header-group.json](sections/header-group.json) - Add announcement bar

---

## Phase 4: Hero & Marketing Sections

### Files to Create
- `sections/hero.liquid` - Full-bleed hero (image/video, overlay, multiple layouts)
- `sections/hero-split.liquid` - 50/50 split layout
- `sections/image-with-text.liquid` - Versatile content + image
- `sections/rich-text.liquid` - Editorial text with drop cap option
- `sections/video.liquid` - YouTube/Vimeo/hosted video
- `sections/image-banner.liquid` - Full-width with parallax option
- `sections/slideshow.liquid` - Image/content carousel

---

## Phase 5: Product Sections (CRITICAL)

### Files to Create
- `sections/main-product.liquid` - **Most critical file for Theme Store**
- `sections/featured-product.liquid` - Homepage product showcase
- `sections/product-recommendations.liquid` - Related products
- `sections/complementary-products.liquid` - "Complete the look"
- `sections/recently-viewed.liquid` - Recently viewed products
- `snippets/product-card.liquid` - Reusable product card
- `snippets/product-media.liquid` - Media gallery component
- `snippets/product-variant-picker.liquid` - Variant selector with swatches
- `snippets/price.liquid` - Price display component
- `snippets/quantity-input.liquid` - Quantity selector
- `assets/product.js` - Variant selection, AJAX cart, zoom

### Main Product Required Blocks
```
@app                    - App blocks support (REQUIRED)
title                   - Product title
price                   - Price with compare-at, sale badge
vendor                  - Product vendor
description             - Product description
variant_picker          - Dropdown/buttons/swatches
quantity_selector       - Quantity input
buy_buttons             - Add to cart + dynamic checkout (REQUIRED)
inventory               - Stock status
sku                     - SKU display
rating                  - Product rating
share                   - Social share
collapsible_tab         - Expandable content (shipping, returns)
popup                   - Size guide modal
complementary           - Complementary products
custom_liquid           - Custom Liquid block
```

### Product Features Required
- Media gallery with thumbnails, zoom, video support
- Selling plans / subscriptions
- Gift card recipient form
- Pickup availability
- Shop Pay Installments banner

---

## Phase 6: Collection & Discovery

### Files to Create
- `sections/main-collection.liquid` - Replace [sections/collection.liquid](sections/collection.liquid)
- `sections/collection-banner.liquid` - Collection header
- `sections/featured-collection.liquid` - Homepage collection
- `sections/collection-list.liquid` - Collection grid
- `snippets/facets.liquid` - Faceted filtering (REQUIRED)
- `snippets/collection-filters-drawer.liquid` - Mobile filters
- `snippets/active-filters.liquid` - Filter pills
- `snippets/pagination.liquid` - Numbered + infinite scroll
- `assets/collection.js` - AJAX filtering, sorting

### Faceted Filtering (Theme Store Requirement)
- Price range
- Availability
- Product type
- Vendor
- Tags/options
- Active filters display
- Clear all

---

## Phase 7: Content & Engagement

### Files to Create
- `sections/main-article.liquid` - Replace [sections/article.liquid](sections/article.liquid)
- `sections/main-blog.liquid` - Replace [sections/blog.liquid](sections/blog.liquid)
- `sections/blog-posts.liquid` - Homepage blog grid
- `sections/newsletter.liquid` - Email signup
- `sections/testimonials.liquid` - Customer reviews
- `sections/logo-list.liquid` - Brand/press logos
- `sections/contact-form.liquid` - Contact form
- `sections/faq.liquid` - FAQ accordion
- `snippets/article-card.liquid` - Blog card component
- `snippets/social-share.liquid` - Share buttons

### Modify
- [sections/custom-section.liquid](sections/custom-section.liquid) - Enhance as Custom Liquid section

---

## Phase 8: Cart & Checkout

### Files to Create
- `sections/main-cart.liquid` - Replace [sections/cart.liquid](sections/cart.liquid)
- `sections/cart-drawer.liquid` - Slide-out cart
- `sections/cart-upsell.liquid` - Cart recommendations
- `snippets/cart-line-item.liquid` - Line item component
- `snippets/free-shipping-bar.liquid` - Shipping threshold progress
- `assets/cart.js` - AJAX cart operations

### Cart Requirements
- Line items with image, title, variant, price
- Quantity adjustment
- Remove items
- Cart notes
- Subtotal
- Tax/shipping notes
- Checkout button
- Empty cart state

---

## Phase 9: Utility Pages & Customer Templates

### Files to Create
- `sections/main-search.liquid` - Replace [sections/search.liquid](sections/search.liquid)
- `sections/predictive-search.liquid` - Search suggestions
- `sections/main-404.liquid` - Replace [sections/404.liquid](sections/404.liquid)
- `sections/main-password.liquid` - Replace [sections/password.liquid](sections/password.liquid)
- `assets/search.js` - Predictive search

### Customer Templates (All Required)
```
templates/customers/account.json     + sections/main-account.liquid
templates/customers/login.json       + sections/main-login.liquid
templates/customers/register.json    + sections/main-register.liquid
templates/customers/order.json       + sections/main-order.liquid
templates/customers/addresses.json   + sections/main-addresses.liquid
templates/customers/reset_password.json + sections/main-reset-password.liquid
templates/customers/activate_account.json + sections/main-activate-account.liquid
```

### Other Templates
- `templates/page.contact.json` - Contact page template
- [templates/gift_card.liquid](templates/gift_card.liquid) - Enhance styling, QR code

---

## Phase 10: Preset & Polish

### Files to Modify
- [config/settings_data.json](config/settings_data.json) - Single "Influence" preset
- [locales/en.default.json](locales/en.default.json) - Complete translations
- All JSON templates - Demo section configurations

### Influence Preset
```json
{
  "type_heading_font": "cormorant_garamond_n4",
  "type_body_font": "assistant_n4",
  "scheme_1_background": "#FFFFFF",
  "scheme_1_foreground": "#1A1A1A",
  "scheme_1_accent": "#000000",
  "scheme_1_muted": "#757575"
}
```

---

## File Summary

### New Sections: 30+
Hero (2), Image/Video (4), Product (5), Collection (4), Content (8), Cart (3), Utility (4), Customer (7)

### New Snippets: 17+
color-scheme, header-drawer, mega-menu, icon, product-card, product-media, product-variant-picker, price, quantity-input, facets, filters-drawer, active-filters, pagination, article-card, social-share, cart-line-item, free-shipping-bar

### New Assets: 6
theme.css, icons.svg, product.js, collection.js, cart.js, search.js

### Modified Files: 15+
css-variables.liquid, critical.css, settings_schema.json, header.liquid, footer.liquid, all main section replacements

---

## Theme Store Critical Requirements Checklist

- [ ] 16+ JSON templates (including all customer templates)
- [ ] App blocks (`@app`) in main-product section
- [ ] Product blocks (price, vendor, description as separate blocks)
- [ ] Dynamic checkout buttons (enabled by default)
- [ ] Faceted filtering on collection + search
- [ ] Selling plans / subscriptions support
- [ ] Predictive search
- [ ] Custom Liquid section
- [ ] Header/Footer in section groups
- [ ] 4+ color settings
- [ ] Font picker for headings + body
- [ ] Lighthouse Performance: 60+
- [ ] Lighthouse Accessibility: 90+
- [ ] Gift card with QR code + Apple Wallet
- [ ] Country/language selectors

---

## Execution Order

1. **Foundation** - css-variables, critical.css, settings_schema (enables everything else)
2. **Layout** - header, footer, announcement bar (site-wide impact)
3. **Product** - main-product with all blocks (most critical for approval)
4. **Collection** - main-collection with faceted filtering (required)
5. **Cart** - main-cart + cart-drawer (required)
6. **Utility** - search, 404, password, customer templates (required)
7. **Content** - blog, article, newsletter, testimonials (enhance)
8. **Marketing** - hero, image sections, video (polish)
9. **Preset** - settings_data.json with demo content (final)
