# CLAUDE.md - Fashion-Forward Shopify Theme

## Project Overview

This project is a premium Shopify theme built on the **Skeleton Theme** foundation, targeting the Shopify Theme Store. The theme draws inspiration from **Prestige** but pushes further into high-fashion, editorial aesthetics.

**Theme Codename:** *Influence*
**Target Market:** Luxury fashion, designer brands, high-end accessories, curated boutiques
**Design Philosophy:** Bold minimalism meets editorial sophistication

---

## Vision & Design Direction

### Core Aesthetic
- **Editorial fashion magazine** feel - think Vogue, Harper's Bazaar
- **Bold typography** with dramatic scale contrasts
- **Generous whitespace** that lets products breathe
- **Asymmetric layouts** that feel curated, not templated
- **Subtle, refined animations** that convey luxury (no gimmicks)
- **Monochromatic palettes** with strategic accent colors
- **Full-bleed imagery** with cinematic aspect ratios

### Differentiation from Prestige
| Prestige | Influence |
|----------|-----------|
| Classic luxury | Contemporary fashion-forward |
| Balanced symmetry | Intentional asymmetry |
| Traditional grid | Editorial/magazine layouts |
| Subtle typography | Bold typographic statements |
| Standard product cards | Editorial product presentations |
| Conventional navigation | Fashion-week inspired navigation |

---

## Technical Foundation

### Base Theme
- **Skeleton Theme v0.1.0** (required for new Theme Store submissions)
- No Dawn or Horizon code permitted
- All code must be original or from Skeleton

### Directory Structure
```
skeleton-influence/
├── assets/           # CSS, SVGs, fonts (no SCSS)
├── blocks/           # Reusable nested components
├── config/           # settings_schema.json, settings_data.json
├── layout/           # theme.liquid, password.liquid
├── locales/          # en.default.json, schema translations
├── sections/         # Full-width modular components
├── snippets/         # Reusable Liquid fragments
└── templates/        # JSON templates (OS 2.0)
```

---

## Theme Store Requirements Checklist

### 1. Required Templates
All must be JSON format (except noted):
- [ ] `theme.liquid` (layout)
- [ ] `404.json`
- [ ] `article.json`
- [ ] `blog.json`
- [ ] `cart.json`
- [ ] `collection.json`
- [ ] `index.json`
- [ ] `list-collections.json`
- [ ] `page.json`
- [ ] `page.contact.json`
- [ ] `password.json`
- [ ] `product.json`
- [ ] `search.json`
- [ ] `gift_card.liquid` (special Liquid template)
- [ ] `settings_data.json`
- [ ] `settings_schema.json`

### 2. Required Features
- [ ] **Sections Everywhere** - All templates support sections
- [ ] **Discounts** - Display on cart, checkout, order templates
- [ ] **Accelerated checkout buttons** - Product + Cart pages (enabled by default)
- [ ] **Faceted search filtering** - Collection + Search pages
- [ ] **Gift cards** - With Apple Wallet, QR code support
- [ ] **Image focal points** - Respect focal point settings
- [ ] **Social sharing images** - page_image object
- [ ] **Country/currency selector** - For international selling
- [ ] **Language selector** - Multi-language support
- [ ] **Multi-level menus** - Nested dropdown navigation
- [ ] **Newsletter forms** - Email collection
- [ ] **Pickup availability** - Product page
- [ ] **Related product recommendations** - Product page
- [ ] **Complementary product recommendations** - Product page
- [ ] **Predictive search** - With search template
- [ ] **Selling plans/subscriptions** - Cart + Customer pages
- [ ] **Shop Pay Installments** - Product page banner
- [ ] **Unit pricing** - Collection, Product, Cart, Customer pages
- [ ] **Variant images** - Show on variant selection
- [ ] **Follow on Shop button** - Using login_button filter
- [ ] **Product swatches** - Using swatch.image and swatch.color
- [ ] **Gift card recipient** - form.email, form.name, form.message, send_on

### 3. Section & Block Requirements
- [ ] **Custom Liquid section** - Available on all templates
- [ ] **Header/Footer in section groups** - Dynamic reordering
- [ ] **Product page blocks** - Price, vendor, description as separate blocks
- [ ] **App blocks support** - @app blocks in product sections
- [ ] **Custom Liquid blocks** - Where app blocks are appropriate

### 4. Performance & Accessibility Targets
- [ ] **Lighthouse Performance:** Minimum 60 (desktop + mobile)
- [ ] **Lighthouse Accessibility:** Minimum 90 (desktop + mobile)
- [ ] **Color contrast:** 4.5:1 body text, 3:1 large text/icons
- [ ] **Touch targets:** Minimum 24x24 CSS pixels
- [ ] **Keyboard navigation:** Full support with visible focus states
- [ ] **Valid HTML:** No markup errors
- [ ] **Alt text:** All images use image.alt or image_tag alt

### 5. Browser Support
**Desktop:**
- Safari (latest 2)
- Chrome (latest 3)
- Firefox (latest 3)
- Edge (latest 2)

**Mobile:**
- Mobile Safari (latest 2)
- Chrome Mobile (latest 3)
- Samsung Internet (latest 2)

**Webviews:**
- Instagram, Facebook, Pinterest (latest)

---

## Design System

### Typography
Use Shopify's font_picker setting type. Load bold, italic, bold-italic variants via font_modify filter.

**Suggested Pairings (fashion-forward):**
- Headings: Didone serif (high contrast) or geometric sans
- Body: Clean, readable sans-serif
- Accent: Display font for editorial moments

### Color System
Minimum 4 colors required. Each background needs corresponding foreground.

**Recommended Palette Structure:**
- Primary background (light)
- Primary foreground (dark)
- Secondary background (accent)
- Secondary foreground
- Accent color
- Sale/error color

### Spacing System
Use CSS custom properties for consistent spacing scale:
```css
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 4rem;
--space-2xl: 8rem;
```

### Grid System
Fashion-forward layouts using CSS Grid:
- Full-bleed hero sections
- Asymmetric product grids
- Magazine-style article layouts
- Generous margins (use --min-page-margin)

---

## Section Roadmap

### Header Sections
- [ ] **Header** - Sticky, minimal, with mega menu support
- [ ] **Announcement bar** - Dismissible, animated

### Hero Sections
- [ ] **Full-bleed hero** - Video/image with text overlay
- [ ] **Split hero** - Image + text side-by-side
- [ ] **Editorial hero** - Magazine-style with multiple images

### Product Sections
- [ ] **Featured product** - With all blocks, app blocks
- [ ] **Product grid** - Asymmetric option
- [ ] **Product carousel** - Horizontal scroll
- [ ] **Lookbook** - Hotspots on images

### Collection Sections
- [ ] **Collection banner** - Full-width with filters
- [ ] **Collection grid** - With pagination, sorting, filtering
- [ ] **Featured collections** - Grid/carousel

### Content Sections
- [ ] **Rich text** - Editorial typography
- [ ] **Image with text** - Multiple layout options
- [ ] **Image gallery** - Masonry/grid options
- [ ] **Video** - YouTube/Vimeo/hosted
- [ ] **Testimonials** - Carousel/grid
- [ ] **Logo list** - Brand partners
- [ ] **Newsletter** - Email signup
- [ ] **Contact form** - Styled form
- [ ] **Custom Liquid** - Required

### Footer Sections
- [ ] **Footer** - Multi-column, social, payment icons, menus

---

## Code Standards

### Liquid
- Use `routes` object for all URLs
- Never modify `content_for_header`
- Use `request.locale.iso_code` for lang attribute
- Use `rel="nofollow"` on Shopify domain links
- Support `request.design_mode` for editor preview

### CSS
- **No SCSS** - Native CSS only (.css or .css.liquid)
- **No minification** - Shopify handles this
- Use CSS custom properties for theming
- Mobile-first responsive design
- Use `{% stylesheet %}` for scoped section styles

### JavaScript
- ES6+ syntax (unminified)
- No jQuery dependency
- Vanilla JS preferred
- Third-party libraries must be licensed

### Images
- Use responsive image strategy
- Lazy loading for below-fold images
- Support focal points
- Use image_url filter for optimization

### Assets
- Protocol-relative URLs only
- No hardcoded http/https
- Host all scripts on Shopify (except approved third-party)

---

## SEO Requirements

- [ ] Title, meta description, canonical URL in all templates
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (especially products)
- [ ] No robots.txt.liquid template

---

## Settings Terminology

Use these Shopify-approved terms:

| Use | Don't Use |
|-----|-----------|
| home page | homepage |
| heading | title |
| subheading | sub-heading |
| signup | sign-up |
| navigation | menus |
| cart type | Ajax cart |
| color | colour |
| center | centre |

**Text style:** Sentence case, no ampersands, active voice, American English.

---

## Demo Store Requirements

- Fully realistic content (no Lorem Ipsum)
- Professional, high-quality imagery
- Products that match fashion/luxury positioning
- All sections populated with meaningful content
- Inspiring merchant experience

---

## Preset Strategy

**Required:** One preset must share theme name ("Influence")

**Suggested Presets (3 total):**
1. **Influence** - Core black/white editorial aesthetic
2. **Runway** - Bolder, more colorful fashion-week vibe
3. **Atelier** - Softer, artisanal luxury feel

Each preset: 1-2 words, under 30 characters, unique from other themes.

---

## Development Workflow

### Local Development
```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Start development server
shopify theme dev --store your-store.myshopify.com
```

### Quality Checks
```bash
# Run Theme Check linter
shopify theme check

# Test Lighthouse scores
# Use benchmark dataset for consistent testing
```

### Before Submission
1. Run Theme Check - fix all errors
2. Test all templates with real content
3. Verify Lighthouse scores (Performance 60+, Accessibility 90+)
4. Test on all required browsers
5. Test keyboard navigation
6. Verify color contrast ratios
7. Check mobile responsiveness
8. Test in Instagram/Facebook/Pinterest webviews

---

## File Naming Conventions

- Sections: `section-name.liquid` (kebab-case)
- Snippets: `snippet-name.liquid` (kebab-case)
- Blocks: `block-name.liquid` (kebab-case)
- Templates: `template.json` or `template.type.json`
- Assets: `descriptive-name.css`, `descriptive-name.js`

---

## Prohibited

- Dawn or Horizon derived code
- SCSS files
- Minified CSS/JS (except ES6+ and third-party)
- External script hosting (except approved libraries)
- App-dependent functionality
- Fake urgency/scarcity tactics
- Designer credits or affiliate links
- config/markets.json file

---

## Resources

- [Skeleton Theme](https://github.com/shopify/skeleton-theme)
- [Theme Store Requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check)
- [Performance Best Practices](https://shopify.dev/docs/storefronts/themes/best-practices/performance)
- [Accessibility Best Practices](https://shopify.dev/docs/storefronts/themes/best-practices/accessibility)
- [Color System Best Practices](https://shopify.dev/docs/storefronts/themes/best-practices/design/color-system)

---

## Notes for Claude

When working on this theme:
1. Always check existing Skeleton code before creating new files
2. Maintain the minimalist, fashion-forward aesthetic
3. Prioritize performance - every KB matters
4. Test accessibility as you build
5. Use semantic HTML
6. Keep settings organized and clearly labeled
7. Follow Shopify terminology exactly
8. Support all required features before adding extras
