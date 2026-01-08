# Header & Footer Enhancement Plan - Influence Theme

## Executive Summary

This document outlines the enhancements needed to elevate the header and footer from basic Skeleton functionality to premium Theme Store quality. The current implementation provides a solid foundation but lacks the sophistication, customization options, and required features expected of a premium fashion-forward theme.

---

## Current State Analysis

### Header (sections/header.liquid)
**Lines of Code:** ~390
**Current Features:**
- Sticky header with scroll detection
- Transparent mode (home page only)
- Logo with width control (50-250px) and center positioning
- 3-level mega menu (desktop)
- Mobile drawer navigation with accordion
- Search toggle (basic form, no predictive)
- Account icon (hidden on mobile)
- Cart icon with count badge

**Current Settings:**
- Menu selection
- Logo position (left/center)
- Logo width
- Enable sticky
- Enable transparent
- Show search
- Show account

### Announcement Bar (sections/announcement-bar.liquid)
**Lines of Code:** ~260
**Current Features:**
- Multiple announcements carousel
- Color scheme selection (2 options)
- Auto-rotate with speed control
- Optional links per announcement

### Footer (sections/footer.liquid)
**Lines of Code:** ~400
**Current Features:**
- Block-based columns (menu, text, newsletter)
- Social links from global settings
- Payment icons
- Country/language selectors (localization)
- Copyright with powered by link

**Current Blocks:**
- Menu (heading + link_list)
- Text (heading + richtext)
- Newsletter (heading + text + form)

---

## Gap Analysis: What's Missing for Premium

### Theme Store Requirements (Missing)

| Requirement | Status | Priority |
|------------|--------|----------|
| Predictive search | Missing | **Critical** |
| Multi-level menus (3+) | Partial (mega menu needs polish) | High |
| Follow on Shop button | Missing | **Critical** |
| Country/currency selector | Present | - |
| Language selector | Present | - |

### Premium Feature Gaps

#### Header
1. **Predictive Search** - Real-time search with product results, articles, pages, collections
2. **Enhanced Mega Menu** - Featured images, promotional blocks, collection cards
3. **Hide on Scroll** - Smart sticky behavior (hide on down, show on up)
4. **Secondary Navigation** - Utility nav above main header
5. **Wishlist Icon** - Heart icon for wishlist feature
6. **Multiple Menu Support** - Separate desktop/mobile menus
7. **Condensed Mode** - Option for smaller header on scroll
8. **Icon Style Options** - Filled vs outlined icons
9. **Badge Style Options** - Dot vs number for cart
10. **Social Links** - Option to show in header
11. **Promo Text** - Inline promotional text

#### Announcement Bar
1. **Dismissible** - Close button with cookie persistence
2. **Icon Support** - Icons before announcement text
3. **Countdown Timer** - Sale/promo countdown
4. **Scroll Behavior** - Option to scroll with page or stay fixed
5. **Rich Text** - Support for inline formatting
6. **Multiple Bar Support** - Stack multiple bars

#### Footer
1. **More Block Types:**
   - Image/Logo block
   - Contact info block
   - Store location block
   - Social links block (dedicated)
   - Custom HTML block
2. **Layout Options** - Different column arrangements (4-col, 3-col, 2-col, asymmetric)
3. **Mobile Accordion** - Collapsible columns on mobile
4. **Follow on Shop Button** - Using `login_button` filter
5. **Back to Top** - Smooth scroll button
6. **App Store Badges** - iOS/Android download links
7. **Trust Badges** - Security/certification icons
8. **Additional Color Schemes** - More than 2 options
9. **Border/Divider Options** - Section separation styling
10. **Spacing Controls** - Vertical padding options

---

## Implementation Plan

### Phase 1: Critical Requirements (Theme Store Compliance)

#### 1.1 Predictive Search
**File:** `sections/header.liquid` + new `snippets/predictive-search.liquid`

**Implementation:**
```liquid
{%- comment -%} Add to header search container {%- endcomment -%}
<predictive-search
  data-loading-text="{{ 'search.loading' | t }}"
>
  <form action="{{ routes.search_url }}" method="get" role="search">
    {%- comment -%} Input with predictive results dropdown {%- endcomment -%}
  </form>
  <div class="predictive-search__results" data-predictive-results>
    {%- comment -%} Products, Collections, Articles, Pages {%- endcomment -%}
  </div>
</predictive-search>
```

**Settings to Add:**
- Enable predictive search (checkbox)
- Show product vendor in results
- Show product price in results
- Number of results per type
- Search types (products, articles, pages, collections)

**JavaScript:**
- Debounced input handler
- Fetch from `/search/suggest.json` endpoint
- Keyboard navigation (arrow keys, enter, escape)
- Loading states
- Focus trap

#### 1.2 Follow on Shop Button
**Files:** `sections/footer.liquid`, `snippets/follow-on-shop.liquid`

**Implementation:**
```liquid
{% render 'follow-on-shop', class: 'footer__follow-shop' %}

{%- comment -%} In snippet {%- endcomment -%}
{% form 'follow' %}
  {{ form | login_button: action: 'follow' }}
{% endform %}
```

**Placement Options:**
- Footer (required)
- Header (optional)
- Mobile drawer (optional)

#### 1.3 Mega Menu Polish
**Enhancements:**
- Featured image per column (image_picker in link menu metafields)
- Promotional block support
- View all link per column
- Animation improvements (staggered entry)
- Max columns setting
- Full-width vs contained option

---

### Phase 2: Premium Header Enhancements

#### 2.1 Smart Sticky Header
**File:** `sections/header.liquid`

**Behavior Options:**
- Always visible (current)
- Hide on scroll down, show on scroll up
- Reduce height on scroll
- Transparent until scroll

**New Settings:**
```json
{
  "type": "select",
  "id": "sticky_behavior",
  "label": "Sticky behavior",
  "options": [
    { "value": "always", "label": "Always visible" },
    { "value": "smart", "label": "Hide on scroll down" },
    { "value": "reduce", "label": "Reduce on scroll" },
    { "value": "none", "label": "Not sticky" }
  ],
  "default": "always"
}
```

**JavaScript Enhancement:**
```javascript
// Track scroll direction
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const direction = currentScrollY > lastScrollY ? 'down' : 'up';
  // Apply appropriate class
}, { passive: true });
```

#### 2.2 Secondary/Utility Navigation
**New Settings:**
```json
{
  "type": "header",
  "content": "Utility navigation"
},
{
  "type": "checkbox",
  "id": "show_utility_nav",
  "label": "Show utility navigation",
  "default": false
},
{
  "type": "link_list",
  "id": "utility_menu",
  "label": "Utility menu"
}
```

**Content Options:**
- Secondary menu links
- Contact info (phone, email)
- Store locator link
- Currency/language selectors (move from footer)

#### 2.3 Icon Customization
**New Settings:**
```json
{
  "type": "select",
  "id": "icon_style",
  "label": "Icon style",
  "options": [
    { "value": "outline", "label": "Outlined" },
    { "value": "solid", "label": "Solid" }
  ],
  "default": "outline"
},
{
  "type": "select",
  "id": "cart_badge_style",
  "label": "Cart badge style",
  "options": [
    { "value": "number", "label": "Show count" },
    { "value": "dot", "label": "Dot indicator" },
    { "value": "none", "label": "No indicator" }
  ],
  "default": "number"
}
```

#### 2.4 Mobile Drawer Enhancements
**Additions:**
- Featured collection/product at bottom
- Social links
- Account section with user name if logged in
- Currency/language selectors
- Search in drawer
- Promotional banner

**New Structure:**
```liquid
<div class="drawer" id="mobile-drawer">
  <div class="drawer__header">
    {%- comment -%} Close + Logo {%- endcomment -%}
  </div>

  <div class="drawer__search">
    {%- comment -%} Search form {%- endcomment -%}
  </div>

  <nav class="drawer__nav">
    {%- comment -%} Main navigation {%- endcomment -%}
  </nav>

  <div class="drawer__account">
    {%- comment -%} Account links {%- endcomment -%}
  </div>

  <div class="drawer__footer">
    {%- comment -%} Social, Currency, Language {%- endcomment -%}
  </div>

  <div class="drawer__promo">
    {%- comment -%} Optional promotional content {%- endcomment -%}
  </div>
</div>
```

---

### Phase 3: Announcement Bar Enhancements

#### 3.1 Dismissible Feature
**Implementation:**
```liquid
{%- if section.settings.enable_dismiss -%}
  <button
    type="button"
    class="announcement-bar__close"
    aria-label="{{ 'accessibility.close' | t }}"
    data-announcement-dismiss
  >
    {% render 'icon', icon: 'close', size: 'sm' %}
  </button>
{%- endif -%}
```

**JavaScript:**
```javascript
// Set cookie on dismiss
document.cookie = `announcement_dismissed_${sectionId}=true; max-age=${60*60*24*7}`; // 7 days
```

**New Settings:**
```json
{
  "type": "checkbox",
  "id": "enable_dismiss",
  "label": "Allow dismissing",
  "default": false
},
{
  "type": "range",
  "id": "dismiss_duration",
  "label": "Stay dismissed for (days)",
  "min": 1,
  "max": 30,
  "default": 7
}
```

#### 3.2 Block Enhancements
**New Block Settings:**
```json
{
  "type": "announcement",
  "name": "Announcement",
  "settings": [
    {
      "type": "inline_richtext",
      "id": "text",
      "label": "Text"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Link"
    },
    {
      "type": "select",
      "id": "icon",
      "label": "Icon",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "truck", "label": "Shipping" },
        { "value": "gift", "label": "Gift" },
        { "value": "tag", "label": "Sale" },
        { "value": "clock", "label": "Limited time" }
      ],
      "default": "none"
    }
  ]
}
```

#### 3.3 Countdown Timer (Promotional)
**New Block Type:**
```json
{
  "type": "countdown",
  "name": "Countdown",
  "limit": 1,
  "settings": [
    {
      "type": "text",
      "id": "text",
      "label": "Text before countdown",
      "default": "Sale ends in"
    },
    {
      "type": "text",
      "id": "end_date",
      "label": "End date and time",
      "info": "Format: YYYY-MM-DD HH:MM (24h)",
      "placeholder": "2025-12-31 23:59"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Link"
    }
  ]
}
```

---

### Phase 4: Footer Enhancements

#### 4.1 New Block Types

**Image Block:**
```json
{
  "type": "image",
  "name": "Image",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Link"
    },
    {
      "type": "range",
      "id": "image_width",
      "min": 50,
      "max": 200,
      "step": 10,
      "unit": "px",
      "default": 150,
      "label": "Image width"
    }
  ]
}
```

**Contact Block:**
```json
{
  "type": "contact",
  "name": "Contact info",
  "limit": 1,
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Contact us"
    },
    {
      "type": "text",
      "id": "phone",
      "label": "Phone number"
    },
    {
      "type": "text",
      "id": "email",
      "label": "Email address"
    },
    {
      "type": "textarea",
      "id": "address",
      "label": "Address"
    },
    {
      "type": "text",
      "id": "hours",
      "label": "Business hours"
    }
  ]
}
```

**Brand/Logo Block:**
```json
{
  "type": "brand",
  "name": "Brand",
  "limit": 1,
  "settings": [
    {
      "type": "checkbox",
      "id": "show_logo",
      "label": "Show logo",
      "default": true
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Brand description"
    },
    {
      "type": "checkbox",
      "id": "show_social",
      "label": "Show social links",
      "default": true
    }
  ]
}
```

#### 4.2 Mobile Accordion
**Implementation:**
```liquid
<details class="footer__column-accordion hide-desktop">
  <summary class="footer__column-header">
    {{ block.settings.heading }}
    {% render 'icon', icon: 'chevron-down', size: 'sm' %}
  </summary>
  <div class="footer__column-content">
    {%- comment -%} Column content {%- endcomment -%}
  </div>
</details>
```

**New Setting:**
```json
{
  "type": "checkbox",
  "id": "enable_accordion_mobile",
  "label": "Collapse columns on mobile",
  "default": true
}
```

#### 4.3 Layout Options
**New Settings:**
```json
{
  "type": "select",
  "id": "layout",
  "label": "Layout",
  "options": [
    { "value": "auto", "label": "Auto-fit columns" },
    { "value": "equal", "label": "Equal columns" },
    { "value": "first-wide", "label": "First column wide" },
    { "value": "last-wide", "label": "Last column wide" }
  ],
  "default": "auto"
}
```

#### 4.4 Back to Top Button
**Implementation:**
```liquid
{%- if section.settings.show_back_to_top -%}
  <button
    type="button"
    class="footer__back-to-top"
    aria-label="{{ 'accessibility.back_to_top' | t }}"
    data-back-to-top
  >
    {% render 'icon', icon: 'chevron-up' %}
  </button>
{%- endif -%}
```

---

## CSS Enhancements Required

### Header CSS Additions (theme.css)
```css
/* Smart sticky header states */
.header--hidden {
  transform: translateY(-100%);
}

.header--reduced {
  --header-height: 3.5rem;
}

.header--reduced .header__logo img {
  max-height: 2rem;
}

/* Predictive search */
.predictive-search {
  position: relative;
}

.predictive-search__results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-background);
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-lg);
  max-height: 60vh;
  overflow-y: auto;
  z-index: var(--z-dropdown);
}

/* Mega menu featured image */
.mega-menu__featured {
  aspect-ratio: 4/5;
  overflow: hidden;
}

.mega-menu__featured img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.mega-menu__column:hover .mega-menu__featured img {
  transform: scale(1.05);
}
```

### Footer CSS Additions
```css
/* Footer accordion mobile */
.footer__column-accordion summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
  border-bottom: var(--border-width) solid var(--border-color);
  cursor: pointer;
  list-style: none;
}

.footer__column-accordion[open] summary .icon {
  transform: rotate(180deg);
}

/* Back to top */
.footer__back-to-top {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  width: var(--touch-target-min);
  height: var(--touch-target-min);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-foreground);
  color: var(--color-background);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition: all var(--duration-fast) var(--ease-out);
  z-index: var(--z-fixed);
}

.footer__back-to-top.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

---

## Localization Additions (en.default.json)

```json
{
  "accessibility": {
    "back_to_top": "Back to top",
    "dismiss_announcement": "Dismiss announcement",
    "search_results": "Search results",
    "search_suggestions": "Search suggestions"
  },
  "search": {
    "products": "Products",
    "collections": "Collections",
    "articles": "Articles",
    "pages": "Pages",
    "view_all_products": "View all products",
    "view_all_results": "View all results",
    "popular_searches": "Popular searches"
  },
  "footer": {
    "follow_on_shop": "Follow on Shop"
  },
  "announcement": {
    "ends_in": "Ends in",
    "days": "days",
    "hours": "hours",
    "minutes": "min",
    "seconds": "sec"
  }
}
```

---

## Settings Schema Additions (settings_schema.json)

```json
{
  "name": "Header",
  "settings": [
    {
      "type": "header",
      "content": "Search"
    },
    {
      "type": "checkbox",
      "id": "enable_predictive_search",
      "label": "Enable predictive search",
      "default": true
    },
    {
      "type": "range",
      "id": "predictive_search_results",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4,
      "label": "Products to show"
    },
    {
      "type": "checkbox",
      "id": "predictive_search_show_vendor",
      "label": "Show vendor",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "predictive_search_show_price",
      "label": "Show price",
      "default": true
    }
  ]
}
```

---

## Implementation Priority

### Week 1: Critical (Theme Store Requirements)
1. Predictive search implementation
2. Follow on Shop button
3. Mega menu polish

### Week 2: Header Premium
1. Smart sticky behavior
2. Icon customization
3. Mobile drawer enhancements

### Week 3: Announcement & Footer
1. Dismissible announcement bar
2. New footer block types
3. Mobile accordion

### Week 4: Polish & Testing
1. CSS refinements
2. Animation tuning
3. Accessibility audit
4. Cross-browser testing

---

## Testing Checklist

### Header
- [ ] Sticky behavior works correctly
- [ ] Transparent mode only on designated pages
- [ ] Mega menu accessible via keyboard
- [ ] Predictive search returns results
- [ ] Search keyboard navigation (arrows, enter, escape)
- [ ] Mobile drawer opens/closes correctly
- [ ] Cart count updates with AJAX
- [ ] All links work correctly
- [ ] Focus states visible

### Announcement Bar
- [ ] Carousel rotates correctly
- [ ] Dismiss persists (cookie)
- [ ] Links work
- [ ] Accessible (aria attributes)

### Footer
- [ ] All blocks render correctly
- [ ] Mobile accordion works
- [ ] Social links open in new tab
- [ ] Payment icons display
- [ ] Localization selectors work
- [ ] Newsletter form submits
- [ ] Back to top scrolls smoothly

### Accessibility
- [ ] Color contrast passes (4.5:1 body, 3:1 icons)
- [ ] Touch targets >= 24x24px
- [ ] Keyboard navigation complete
- [ ] Screen reader friendly
- [ ] Focus visible on all interactive elements
- [ ] Skip to content link works

### Performance
- [ ] No layout shift on load
- [ ] Lazy load images where appropriate
- [ ] JavaScript deferred/async where possible
- [ ] CSS critical path optimized

---

## Files to Create/Modify

### New Files
- `snippets/predictive-search.liquid`
- `snippets/follow-on-shop.liquid`
- `snippets/mega-menu-column.liquid`
- `snippets/footer-accordion.liquid`
- `assets/predictive-search.js` (optional, can inline)

### Files to Modify
- `sections/header.liquid` - Major enhancements
- `sections/footer.liquid` - New blocks, accordion
- `sections/announcement-bar.liquid` - Dismissible, icons
- `assets/theme.css` - New component styles
- `locales/en.default.json` - New strings
- `config/settings_schema.json` - New global settings

---

## Notes

- All JavaScript should be vanilla ES6+ (no jQuery)
- CSS should use existing custom properties
- Maintain fashion-forward aesthetic throughout
- Test with design_mode for editor preview
- Respect reduced motion preferences
- Keep bundle size minimal
