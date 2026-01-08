# Influence Theme - Section Audit & Recommendations

**Audit Date:** January 2026
**Theme Version:** Current Development
**Total Sections:** 45 files

---

## Executive Summary

The Influence theme has a strong foundation with **18 comprehensive, production-ready sections** covering core Shopify Theme Store requirements. The theme demonstrates editorial sophistication with features like a 3D product carousel and refined animations. However, several sections from the roadmap are missing, and there are opportunities to further differentiate this theme in the luxury fashion market.

### Quick Stats

| Category | Count | Notes |
|----------|-------|-------|
| Production-Ready | 18 | Full features, Theme Store compliant |
| Functional/Basic | 21+ | Template sections, minimal styling |
| Missing (Roadmap) | 6 | Critical gaps to address |
| Recommended New | 8+ | Fashion-forward differentiators |

---

## Part 1: Current Section Inventory

### Header Group (3 Sections)

#### 1. `header.liquid` - Status: COMPREHENSIVE
- **Purpose:** Main site navigation
- **Features:**
  - Sticky header with scroll detection
  - Transparent mode (homepage only)
  - Mega menu support (multi-level dropdowns)
  - Mobile drawer navigation
  - Logo positioning (left/center)
  - Search, account, cart icons
- **Settings:** Menu, logo position, logo width, sticky toggle, transparent toggle, search/account visibility
- **Grade:** A - Production ready

#### 2. `footer.liquid` - Status: COMPREHENSIVE
- **Purpose:** Site footer with navigation and newsletter
- **Features:**
  - Multi-column layout via blocks (menu, text, newsletter)
  - Social media links (7 platforms)
  - Payment icons
  - Country/currency selector
  - Language selector
- **Settings:** Color scheme, social visibility, payment icons, localization toggles
- **Grade:** A - Production ready

#### 3. `announcement-bar.liquid` - Status: COMPREHENSIVE
- **Purpose:** Promotional messaging bar
- **Features:**
  - Single or multi-announcement carousel
  - Auto-rotate with configurable speed
  - Optional links per announcement
  - Navigation arrows
- **Settings:** Color scheme, autoplay toggle, speed (3000-9500ms)
- **Grade:** A - Production ready

---

### Hero Sections (2 Sections)

#### 4. `hero.liquid` - Status: COMPREHENSIVE
- **Purpose:** Full-bleed hero section
- **Features:**
  - Image or video background (YouTube/Vimeo)
  - Parallax effect support
  - Multiple overlay styles (solid/gradient/vignette)
  - 9-position content placement
  - Animated scroll indicator
  - Height options (small/medium/large/full)
- **Blocks:** subheading, heading, text, button (limit 2)
- **Settings:** Image, video URL, height, position, overlay type/opacity, scroll indicator
- **Grade:** A - Editorial fashion-forward

#### 5. `product-carousel-3d.liquid` - Status: ADVANCED
- **Purpose:** 3D rotating product showcase
- **Features:**
  - Scroll-driven 3D carousel effect
  - Centered title overlay
  - Price and variant display
  - Mobile horizontal scroll fallback
  - Configurable radius (400-700px)
- **Settings:** Product picker, title, image count, CTA, height, radius, color scheme
- **Grade:** A+ - Unique differentiator

---

### Product Sections (3 Sections)

#### 6. `main-product.liquid` - Status: COMPREHENSIVE (Critical)
- **Purpose:** Full product page experience
- **Features:**
  - 17 block types supported
  - Dynamic checkout buttons (enabled by default)
  - Selling plans/subscriptions
  - Gift card recipient form
  - Pickup availability
  - Shop Pay Installments banner
  - Product swatches with color/images
  - Complementary products
  - @app blocks support
  - Media gallery (images, videos, 3D models)
  - Variant-specific images
  - Collapsible info tabs
  - Custom Liquid blocks
- **Blocks:** @app, title, vendor, price, description, variant_picker, quantity_selector, buy_buttons, inventory, pickup_availability, sku, rating, share, collapsible_tab, popup, complementary, custom_liquid, text, divider
- **Grade:** A - Theme Store compliant

#### 7. `featured-collection.liquid` - Status: MODERATE
- **Purpose:** Display products from a collection
- **Features:**
  - Collection grid display
  - View all link
  - Configurable columns (2-4)
- **Settings:** Heading, subheading, collection picker, product count, columns, color scheme
- **Grade:** B - Functional but basic

#### 8. `product-recommendations.liquid` - Status: COMPREHENSIVE
- **Purpose:** AI-powered related products
- **Features:**
  - Shopify recommendation engine
  - AJAX loading
  - Responsive grid
- **Settings:** Heading, alignment, product count, columns (desktop/mobile), color scheme
- **Grade:** A - Uses native Shopify AI

---

### Collection Sections (2 Sections)

#### 9. `main-collection.liquid` - Status: COMPREHENSIVE (Critical)
- **Purpose:** Full collection page with filtering
- **Features:**
  - Faceted search filtering (list, price range, boolean)
  - Active filter tags with removal
  - Product sorting
  - Grid/List view toggle
  - Pagination
  - Product count display
  - Sidebar and drawer filter layouts
  - Sticky filters option
  - Color swatches in filters
- **Settings:** Header visibility, image, description, filters (type, sticky), sorting, view toggle, products per page, columns, color scheme
- **Grade:** A - Theme Store compliant

#### 10. `collection-list.liquid` - Status: MODERATE
- **Purpose:** Display all collections
- **Features:**
  - Collections grid display
  - Product count per collection
  - Responsive layout
- **Settings:** Heading, alignment, image ratio, count toggle, columns, color scheme
- **Grade:** B - Basic collection listing

---

### Content Sections (6 Sections)

#### 11. `rich-text.liquid` - Status: COMPREHENSIVE
- **Purpose:** Editorial text content
- **Features:**
  - Drop cap support (fashion-magazine style)
  - Multiple text styles (body/large)
  - Narrow width option for readability
- **Blocks:** subheading, heading, text, button
- **Settings:** Alignment, text style, narrow toggle, drop cap, color scheme
- **Grade:** A - Editorial focus

#### 12. `image-with-text.liquid` - Status: COMPREHENSIVE
- **Purpose:** Two-column layout with image
- **Features:**
  - Image position toggle (left/right)
  - 4:5 aspect ratio (portrait)
  - Responsive stacking
- **Blocks:** subheading, heading, text, button
- **Settings:** Image, position, alignment, color scheme
- **Grade:** A - Versatile layout

#### 13. `newsletter.liquid` - Status: COMPREHENSIVE (Critical)
- **Purpose:** Email signup form
- **Features:**
  - Customer email collection
  - Success/error messaging
  - Privacy disclaimer
  - Button customization
- **Blocks:** subheading, heading, text, form
- **Settings:** Alignment, narrow toggle, color scheme
- **Grade:** A - Theme Store required

#### 14. `contact-form.liquid` - Status: COMPREHENSIVE (Critical)
- **Purpose:** Contact page form
- **Features:**
  - Required fields: name, email, message
  - Optional fields: phone, subject
  - Success/error handling
- **Settings:** Heading, content, alignment, field toggles, button width, color scheme
- **Grade:** A - Theme Store required

#### 15. `testimonials.liquid` - Status: COMPREHENSIVE
- **Purpose:** Customer reviews/quotes
- **Features:**
  - Star rating display (0-5)
  - Author image, name, title
  - Carousel or grid layout
  - Touch-friendly navigation
- **Blocks:** testimonial (unlimited)
- **Settings:** Heading, alignment, layout, columns, color scheme
- **Grade:** A - Both layouts supported

#### 16. `custom-liquid.liquid` - Status: BASIC (Critical)
- **Purpose:** Merchant custom code
- **Features:**
  - Liquid code input field
  - Color scheme wrapper
- **Settings:** Liquid code, color scheme
- **Grade:** B - Minimal but required

---

### Blog Sections (3 Sections)

#### 17. `main-blog.liquid` - Status: BASIC
- **Purpose:** Blog post listing
- **Grade:** C - Needs enhancement

#### 18. `main-article.liquid` - Status: BASIC
- **Purpose:** Single blog post
- **Grade:** C - Needs enhancement

#### 19. `blog-posts.liquid` - Status: UNKNOWN
- **Purpose:** Featured blog posts
- **Grade:** ? - Needs review

---

### Cart Sections (2 Sections)

#### 20. `main-cart.liquid` - Status: BASIC
- **Purpose:** Cart page
- **Grade:** B - Functional

#### 21. `cart-drawer.liquid` - Status: UNKNOWN
- **Purpose:** Slide-out cart
- **Grade:** ? - Needs review

---

### Utility Sections (10+ Sections)

| Section | Purpose | Status |
|---------|---------|--------|
| `main-search.liquid` | Search results | Basic |
| `main-page.liquid` | Generic pages | Basic |
| `main-404.liquid` | 404 error page | Basic |
| `main-account.liquid` | Account dashboard | Basic |
| `main-login.liquid` | Login page | Basic |
| `main-register.liquid` | Registration | Basic |
| `main-addresses.liquid` | Address management | Basic |
| `main-order.liquid` | Order details | Basic |
| `main-reset-password.liquid` | Password reset | Basic |
| `main-activate-account.liquid` | Account activation | Basic |
| `password.liquid` | Store password page | Basic |
| `faq.liquid` | FAQ accordion | Unknown |

---

## Part 2: Missing Sections (From Roadmap)

### Critical Missing Sections

#### 1. Split Hero Section
- **Priority:** HIGH
- **Purpose:** Alternative hero with image + text side-by-side
- **Fashion Value:** Creates visual variety, allows more text-heavy storytelling
- **Suggested Features:**
  - Image position (left/right)
  - Height options
  - Content blocks (heading, text, buttons)
  - Optional reveal animation
  - Mobile: Stack with image on top

#### 2. Image Gallery / Masonry Section
- **Priority:** HIGH
- **Purpose:** Multi-image grid with various layouts
- **Fashion Value:** Essential for lookbooks, campaign imagery, brand storytelling
- **Suggested Features:**
  - Layout options: grid, masonry, asymmetric
  - Image blocks with captions
  - Lightbox/modal view
  - Lazy loading
  - Hover effects (zoom, overlay)

#### 3. Video Section (Standalone)
- **Priority:** HIGH
- **Purpose:** Dedicated video content section
- **Fashion Value:** Runway footage, brand films, product videos
- **Suggested Features:**
  - YouTube/Vimeo/hosted video support
  - Autoplay (muted) option
  - Custom poster image
  - Caption/description text
  - Full-width and contained options
  - Loop toggle

#### 4. Lookbook / Hotspot Section
- **Priority:** HIGH
- **Purpose:** Shoppable image with product hotspots
- **Fashion Value:** THE defining fashion feature - shop-the-look
- **Suggested Features:**
  - Product hotspot pins (draggable in editor)
  - Hotspot click reveals product card
  - Multiple images/slides
  - Quick add from hotspot
  - Animated pin indicators

#### 5. Logo List / Brand Partners Section
- **Priority:** MEDIUM
- **Purpose:** Display brand/publication logos
- **Fashion Value:** "As seen in" press mentions, brand collaborations
- **Suggested Features:**
  - Logo image blocks
  - Carousel or grid layout
  - Grayscale with color on hover
  - Optional links
  - Heading/subheading

#### 6. Product Grid Section (Curated)
- **Priority:** MEDIUM
- **Purpose:** Hand-picked product grid (not collection-based)
- **Fashion Value:** Curated edits, "Staff Picks", cross-collection features
- **Suggested Features:**
  - Individual product picker (not collection)
  - Asymmetric layout option
  - Featured/large tile option
  - Quick add support

---

## Part 3: Recommended New Sections (Fashion Differentiators)

### 1. Editorial Spread Section
- **Priority:** HIGH
- **Purpose:** Magazine-style multi-image layout with text
- **Fashion Value:** Creates the editorial/magazine feel that differentiates Influence
- **Suggested Features:**
  - Asymmetric 2-3 image layout
  - Large display typography
  - Pull quote styling
  - Overlap effects
  - Full-bleed option
- **Inspiration:** Vogue editorial layouts, Acne Studios

### 2. Countdown / Event Section
- **Priority:** MEDIUM
- **Purpose:** Product launch or sale countdown
- **Fashion Value:** Creates urgency for drops, runway releases
- **Suggested Features:**
  - Date/time picker
  - Countdown display (days, hours, minutes, seconds)
  - Background image/color
  - CTA button
  - "Notify me" email capture
- **Note:** Must avoid fake urgency - use for real events only

### 3. Before/After Comparison Slider
- **Priority:** LOW
- **Purpose:** Side-by-side image comparison
- **Fashion Value:** Material quality, styling transformations
- **Suggested Features:**
  - Two image pickers
  - Draggable comparison slider
  - Vertical/horizontal orientation
  - Label overlays

### 4. Scrolling Text Marquee
- **Priority:** MEDIUM
- **Purpose:** Continuous scrolling text announcement
- **Fashion Value:** High-fashion runway aesthetic, bold branding
- **Suggested Features:**
  - Text content field
  - Speed control
  - Font size options
  - Pause on hover
  - Multiple text items
- **Inspiration:** Balenciaga, Off-White websites

### 5. Team / About Section
- **Priority:** LOW
- **Purpose:** Brand team or founder showcase
- **Fashion Value:** Brand story, artisan craftsmanship narrative
- **Suggested Features:**
  - Team member blocks (image, name, role, bio)
  - Grid or carousel layout
  - Social links per member
  - Quote/testimonial option

### 6. Size Guide Section
- **Priority:** MEDIUM
- **Purpose:** Dedicated sizing information
- **Fashion Value:** Critical for fashion - reduces returns
- **Suggested Features:**
  - Size chart table
  - Measurement guide images
  - Unit toggle (cm/inches)
  - Fit guide text
  - Accordion by category

### 7. Store Locator Section
- **Priority:** LOW
- **Purpose:** Physical store locations
- **Fashion Value:** Luxury brands often have flagship stores
- **Suggested Features:**
  - Location blocks with address
  - Map integration (or static image)
  - Hours of operation
  - Contact info per location

### 8. Instagram Feed Section
- **Priority:** MEDIUM
- **Purpose:** Social proof and user-generated content
- **Fashion Value:** Essential for fashion brands - shows community
- **Suggested Features:**
  - Instagram handle input
  - Grid of recent posts
  - Link to Instagram profile
  - Hashtag display
- **Note:** Requires third-party app integration (mention in docs)

---

## Part 4: Settings Recommendations

### Global Settings Enhancements

#### Typography (Current: Basic)
**Add:**
- Accent/display font picker (for editorial moments)
- Letter-spacing controls (fashion loves tracked-out type)
- Text transform options (uppercase headers)
- Line height fine-tuning

#### Colors (Current: 2 schemes)
**Add:**
- Third color scheme option (for variety)
- Accent color picker (independent of schemes)
- Sale/discount color
- Gradient options

#### Layout (Current: Basic)
**Add:**
- Section vertical spacing presets (compact/default/spacious)
- Border/divider style options
- Max content width for text
- Asymmetric grid toggle

#### Animation (Current: Basic)
**Add:**
- Entrance animation options (fade, slide, scale)
- Scroll-triggered animations
- Reduced motion support (accessibility)
- Parallax intensity control

### Section-Specific Setting Gaps

#### Header
- Mega menu column count
- Mega menu featured image/product
- Announcement bar integration toggle
- Search style (icon only, bar, overlay)

#### Footer
- Column count options
- Bottom bar layout options
- Back to top button

#### Hero
- Ken Burns (slow zoom) effect
- Text animation entrance
- Mobile-specific image option
- Color overlay color picker

#### Product Page
- Image zoom style (hover, click, lightbox)
- Sticky add-to-cart bar
- Recently viewed products
- Size chart popup trigger

#### Collection
- Infinite scroll option
- Quick view popup
- Compare products feature
- Saved filters

---

## Part 5: Priority Implementation Roadmap

### Phase 1: Critical (Theme Store Readiness)
1. **Lookbook/Hotspot Section** - Fashion essential
2. **Image Gallery Section** - Basic content need
3. **Video Section** - Content variety
4. **Split Hero** - Layout variety

### Phase 2: Differentiation (Fashion-Forward)
5. **Editorial Spread Section** - Unique to Influence
6. **Scrolling Marquee** - High-fashion aesthetic
7. **Logo List** - Brand credibility
8. **Product Grid (Curated)** - Merchandising flexibility

### Phase 3: Enhancement (Polish)
9. **Countdown/Event Section** - Launch support
10. **Size Guide Section** - Reduce returns
11. **Before/After Slider** - Visual storytelling
12. **Team/About Section** - Brand story

### Phase 4: Advanced (Stretch Goals)
13. Store Locator
14. Instagram Feed (app-dependent)
15. Advanced search with visual results

---

## Part 6: Competitive Analysis Notes

### What Top Fashion Themes Have

| Feature | Prestige | Broadcast | Impulse | Influence |
|---------|----------|-----------|---------|-----------|
| Lookbook/Hotspots | Yes | No | Yes | **MISSING** |
| Video Section | Yes | Yes | Yes | **MISSING** |
| Image Gallery | Yes | Yes | Yes | **MISSING** |
| Marquee Text | No | No | Yes | **MISSING** |
| Split Hero | Yes | Yes | No | **MISSING** |
| 3D Carousel | No | No | No | **YES** |
| Drop Cap Text | No | No | No | **YES** |
| Mega Menu | Yes | Yes | Yes | **YES** |
| Sticky Header | Yes | Yes | Yes | **YES** |

### Influence Unique Advantages
1. 3D Product Carousel - No competitor has this
2. Editorial typography (drop caps)
3. Vignette overlay option
4. Scroll indicator animation

### Gaps vs Competition
1. Lookbook is table-stakes for fashion - must add
2. Video section expected
3. Image gallery for campaigns
4. Marquee for high-fashion edge

---

## Part 7: Technical Debt & Quality Notes

### Sections Needing Enhancement

1. **main-cart.liquid** - Add:
   - Cart upsell products
   - Gift wrapping option
   - Delivery date picker
   - Cart notes styling

2. **main-blog.liquid** - Add:
   - Featured post highlight
   - Category filtering
   - Author display
   - Read time estimate

3. **main-article.liquid** - Add:
   - Social sharing buttons
   - Author bio
   - Related posts
   - Table of contents

4. **main-search.liquid** - Verify:
   - Predictive search integration
   - Filter by type
   - Empty state design

5. **Password page** - Add:
   - Email signup
   - Social links
   - Brand imagery

### Accessibility Checks Needed
- [ ] All sections meet 4.5:1 contrast ratio
- [ ] Touch targets minimum 24x24px
- [ ] Keyboard navigation tested
- [ ] Screen reader testing
- [ ] Focus states visible
- [ ] Reduced motion support

### Performance Considerations
- [ ] Lazy load images below fold
- [ ] Defer non-critical JavaScript
- [ ] Optimize CSS delivery
- [ ] Test Lighthouse scores (target: 60+ performance, 90+ accessibility)

---

## Conclusion

The Influence theme has a solid foundation with excellent core sections. The 3D carousel and editorial typography features provide unique differentiation. However, to be competitive in the fashion theme market, the following are essential:

**Must Have (Before Launch):**
1. Lookbook/Hotspot section
2. Image Gallery section
3. Video section
4. Split Hero section

**Should Have (Strong Launch):**
5. Editorial Spread section (unique differentiator)
6. Scrolling Marquee
7. Logo List
8. Enhanced cart features

**Nice to Have (Post-Launch):**
9. Countdown section
10. Size Guide
11. Additional global settings

With these additions, Influence will be well-positioned as a premium fashion theme that goes beyond Prestige in editorial sophistication while meeting all Theme Store requirements.

---

*Document generated from comprehensive codebase audit*
