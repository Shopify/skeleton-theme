# Shopify Theme Code Review Guide

You are reviewing a pull request on a Shopify theme. Your job is to identify issues that automated tools miss — bugs, performance problems, accessibility violations, security risks, and deviations from Shopify best practices. You have full access to the repository and should use surrounding context to understand whether changes are correct.

## How to use this guide

- **Focus on the diff.** Review the lines changed in the PR. Read surrounding code for context, but only comment on changes introduced by this PR.
- **Do not duplicate Theme Check.** Shopify's Theme Check linter runs in CI and catches syntax errors, deprecated tags/filters, missing templates, parser-blocking scripts, remote assets, translation key issues, and asset size violations. Do not flag issues that Theme Check already reports. Focus on what requires human judgment.
- **Severity levels.** Label each finding with one of:
  - **`[critical]`** — Security vulnerability, data loss risk, or broken core functionality (checkout, add-to-cart, variant selection). Must fix before merge.
  - **`[error]`** — Bug, accessibility violation, or significant performance regression. Should fix before merge.
  - **`[warning]`** — Best practice violation or potential issue that won't break anything today but creates risk. Fix soon.
  - **`[suggestion]`** — Style improvement, minor optimization, or alternative approach. Optional.
- **Be specific.** Reference file paths and line numbers. Show the problematic code and what the fix should look like. Explain *why* it matters.
- **Praise good work.** If the PR demonstrates particularly good patterns (proper accessibility, clean performance optimization, good use of Shopify APIs), call it out briefly.

---

## 1. Liquid

### 1.1 Performance

**N+1 data access in loops.** Flag any pattern that triggers repeated data fetches inside a loop. Common offenders:

- Accessing `all_products[handle]` inside a loop — each iteration triggers a separate lookup.
- Deep metafield access inside loops (e.g., `product.metafields.custom.x.value` for every product in a collection). Assign to a variable before the loop if the value doesn't change, or accept the cost if it does but note it.
- Nested loops over variants with metafield access.

```liquid
{% comment %} BAD: N+1 — separate data fetch per iteration {% endcomment %}
{% for handle in product_handles %}
  {{ all_products[handle].title }}
{% endfor %}

{% comment %} BETTER: Use collection.products which is batch-loaded {% endcomment %}
{% for product in collection.products %}
  {{ product.title }}
{% endfor %}
```

**`render` vs `include`.** Flag any use of `{% include %}`. It is deprecated, shares parent scope (which prevents rendering optimizations), and creates implicit coupling. The replacement is `{% render %}` with explicit variable passing.

Prefer `{% render 'snippet' for collection.products as product %}` over a manual `{% for %}` loop wrapping `{% render %}` — Shopify can batch-optimize the `for` variant internally.

**Unnecessary object access.** Flag repeated deep property chains. Assign to a variable once and reuse it.

```liquid
{% comment %} BAD: Repeated deep access {% endcomment %}
{{ product.metafields.custom.sizing_guide.value }}
{{ product.metafields.custom.sizing_guide.value | truncate: 100 }}

{% comment %} GOOD: Assign once {% endcomment %}
{% assign sizing_guide = product.metafields.custom.sizing_guide.value %}
{{ sizing_guide }}
{{ sizing_guide | truncate: 100 }}
```

**`capture` vs `assign`.** Flag `{% capture %}` used where `{% assign %}` suffices. `capture` processes an entire template block and is heavier. Use it only for conditional string building.

```liquid
{% comment %} BAD: capture for a simple value {% endcomment %}
{% capture my_var %}{{ product.title }}{% endcapture %}

{% comment %} GOOD {% endcomment %}
{% assign my_var = product.title %}
```

**Unpaginated collections.** Flag any `{% for product in collection.products %}` that is not wrapped in `{% paginate %}`. Without pagination, Shopify silently returns a maximum of 50 items. Always paginate, and use a reasonable page size (12-24 products).

```liquid
{% comment %} BAD: Silent 50-item cap, no pagination controls {% endcomment %}
{% for product in collection.products %}
  {% render 'product-card', product: product %}
{% endfor %}

{% comment %} GOOD {% endcomment %}
{% paginate collection.products by 12 %}
  {% for product in collection.products %}
    {% render 'product-card', product: product %}
  {% endfor %}
  {% if paginate.pages > 1 %}
    {% render 'pagination', paginate: paginate %}
  {% endif %}
{% endpaginate %}
```

**Loop optimization.** Flag logic inside loops that doesn't depend on the loop variable — it should be moved outside the loop. Flag missing `limit` on loops where only a subset is needed.

### 1.2 Encoding and XSS prevention

**The `| json` filter in JavaScript contexts.** This is the single most important security rule in Shopify theme development. Flag any Liquid value embedded in a `<script>` tag or inline JavaScript that does not use the `| json` filter. Without it, a product title containing `"; alert('xss'); //` breaks out of the string literal.

```liquid
{% comment %} CRITICAL: XSS vulnerability {% endcomment %}
<script>
  const title = "{{ product.title }}";
</script>

{% comment %} SAFE {% endcomment %}
<script>
  const title = {{ product.title | json }};
  const productData = {{ product | json }};
</script>
```

This applies to any Liquid value in JavaScript — product titles, descriptions, settings values, translation strings, metafield values, customer data, and anything else originating from user or merchant input.

**URL encoding.** Flag Liquid values used in URL query parameters without `| url_encode` or `| url_param_escape`.

```liquid
{% comment %} BAD {% endcomment %}
<a href="/search?q={{ search_term }}">

{% comment %} GOOD {% endcomment %}
<a href="/search?q={{ search_term | url_encode }}">
```

**`| escape` in attribute contexts.** While `{{ }}` output is auto-HTML-escaped, use `| escape` for clarity in security-sensitive attribute values, particularly `alt`, `title`, and `data-*` attributes containing user-controlled content.

**`| strip_html` before `| truncate`.** When outputting user-generated content (product descriptions, blog content) as plain text (e.g., in meta descriptions or tooltips), strip HTML first. Truncating HTML can break tags and leave open elements.

### 1.3 Conventions and common mistakes

**Truthy/falsy gotchas.** In Liquid, empty strings `""` and `0` are truthy. Only `nil` and `false` are falsy. Flag code that checks `{% if variable %}` when the intent is to check for a non-empty value. Use `{% if variable != blank %}` to cover nil, false, and empty strings.

```liquid
{% comment %} MISLEADING: Empty string passes this check {% endcomment %}
{% if product.metafields.custom.subtitle %}
  {{ product.metafields.custom.subtitle }}
{% endif %}

{% comment %} CORRECT {% endcomment %}
{% if product.metafields.custom.subtitle != blank %}
  {{ product.metafields.custom.subtitle }}
{% endif %}
```

**`section.settings` vs `block.settings`.** Flag code inside a `{% for block in section.blocks %}` loop that reads from `section.settings` when it should read from `block.settings`, or vice versa.

**Whitespace control.** Flag `{%-` and `-%}` inconsistency in logic tags. Logic tags (`assign`, `if`, `for`, `render`, etc.) should generally use whitespace-trimming delimiters to avoid excess whitespace in HTML output. Output tags (`{{ }}`) in inline contexts may or may not need trimming depending on context.

**Hardcoded strings.** Flag any user-facing English text that is not wrapped in the `| t` filter. All merchant-visible and customer-visible strings must use translation keys from locale files. Similarly, flag schema `"label"`, `"name"`, `"info"`, and `"default"` values that don't use the `t:` prefix.

**Variable scoping with `render`.** `{% render %}` creates an isolated scope. Flag code that appears to rely on variables from the parent template being available inside a rendered snippet without being explicitly passed.

**`default` filter for fallbacks.** Prefer `{{ value | default: 'fallback' }}` over `{% if value != blank %}{{ value }}{% else %}fallback{% endif %}` when the logic is a simple fallback.

---

## 2. JavaScript

### 2.1 Philosophy: Minimal JavaScript

Shopify themes should use as little JavaScript as possible. Prefer HTML/CSS-first solutions:

- Native `<details>`/`<summary>` for disclosure patterns (accordions, collapsible content)
- Native `<dialog>` for modals
- CSS scroll-snap for carousels
- CSS `:hover` and `:focus` for interactive states
- CSS transitions/animations over JavaScript-driven animation

Flag JavaScript that reimplements what HTML or CSS provides natively (e.g., a custom accordion when `<details>` would work, or JS-driven show/hide when CSS can handle it).

### 2.2 Web components

Shopify's Horizon theme (and this theme's base) uses native Web Components (custom elements) as the core JavaScript architecture. When reviewing JavaScript:

- **Custom element registration guard.** Every `customElements.define()` call should be guarded against double-registration:
  ```javascript
  if (!customElements.get('my-component')) {
    customElements.define('my-component', MyComponent);
  }
  ```
- **Lifecycle correctness.** Verify that `connectedCallback()` sets up state and listeners, and `disconnectedCallback()` cleans them up (removes listeners, disconnects observers, aborts pending fetches).
- **Explicit data passing.** Components should receive data via attributes, properties, or the `refs` system — not by reaching into the global scope or other components' internals.
- **`updatedCallback()`.** Components that participate in Section Rendering API updates should implement `updatedCallback()` to handle re-renders correctly (the section's DOM gets morphed, and components need to respond).

### 2.3 Script loading

All component scripts must use `type="module"` with `fetchpriority="low"`. ES modules are deferred by default, which is correct.

Flag:
- Scripts without `type="module"` or without `defer`/`async` (parser-blocking). Theme Check also catches this, but flag it if you see it in new JS file additions.
- Scripts loaded unconditionally that are only needed on specific pages. Use conditional loading:
  ```liquid
  {% if template == 'product' %}
    <script src="{{ 'sticky-add-to-cart.js' | asset_url }}" type="module" fetchpriority="low"></script>
  {% endif %}
  ```
- Large inline `<script>` blocks. Small critical inline JS (e.g., preventing layout shift) is acceptable. Large inline blocks should be extracted to files.
- External script sources (non-Shopify CDN). All first-party scripts must be served via `asset_url` through Shopify's CDN.

### 2.4 Section Rendering API

When JavaScript updates page content in response to user actions (variant selection, cart update, filtering), it should use the Section Rendering API:

1. Fetch the section HTML from the server with `?section_id=` parameter
2. Parse with `DOMParser`
3. Update the DOM using morphing (diffing), not `innerHTML` assignment

Flag:
- Direct `innerHTML` assignment for section updates — it destroys DOM state (focus, scroll position, form values, animation state). Morphing preserves these.
- Missing `AbortController` on fetches — if a user rapidly changes variants, previous in-flight requests should be aborted.
- Missing error handling on fetch calls.

### 2.5 DOM manipulation

- **`yieldToMainThread()` before expensive operations.** Long-running synchronous code blocks the main thread. Use `scheduler.yield()` (with fallback) or `requestAnimationFrame` for expensive operations.
- **Read/write batching.** Flag code that interleaves DOM reads (e.g., `getBoundingClientRect()`) and writes (e.g., setting `style` properties) — this causes layout thrashing. Batch all reads, then all writes.
- **Event listener cleanup.** Listeners added in `connectedCallback()` or equivalent must be removed in `disconnectedCallback()`. Flag listeners added without corresponding cleanup.
- **`AbortController` for fetch.** Any component that makes fetch requests should use `AbortController` and abort pending requests in `disconnectedCallback()`.

### 2.6 No jQuery

Flag any use of jQuery (`$()`, `jQuery()`, `$.ajax`, etc.) or the inclusion of jQuery as a dependency. All jQuery patterns have native equivalents. jQuery adds ~90KB of unnecessary weight and conflicts with the web component architecture.

### 2.7 Cart and variant operations

- **Cart operations must use Shopify's AJAX API** (`/cart/add.js`, `/cart/update.js`, `/cart/change.js`). Flag any cart operations that don't go through these endpoints.
- **Variant selection should update the URL** via `history.replaceState()` with the `?variant=` parameter, so the selected variant is shareable and bookmarkable.
- **Error states must be handled.** Flag cart add/update operations that don't handle error responses (out of stock, quantity limits, etc.) with user-visible feedback.
- **ARIA live regions** should announce cart updates and errors to screen readers.

---

## 3. CSS

### 3.1 Custom properties for theming

The theme uses CSS custom properties generated from Liquid settings for colors, typography, and layout. When reviewing CSS:

- **Use custom properties for colors, not hardcoded values.** Flag any hardcoded color values (`#fff`, `rgb(0,0,0)`, etc.) in section or component CSS. All colors should reference the color scheme system (e.g., `var(--color-foreground)`, `var(--color-background)`).
- **Color scheme pairings.** Every background color must have a corresponding foreground/text color. Flag CSS that sets a background without ensuring text on that background is readable.
- **RGB component pattern.** For alpha transparency, the theme exposes `--color-*-rgb` variables for use with `rgb()`: `rgb(var(--color-foreground-rgb) / 0.5)`. Don't use `opacity` on the entire element when only the color needs transparency.

### 3.2 Responsive design

The theme uses a mobile-first approach with a primary breakpoint at `750px`.

- **Use the established breakpoint.** Flag media queries using arbitrary breakpoints unless there's a specific reason.
- **Guard hover effects.** Hover interactions must be wrapped in `@media (any-pointer: fine)` to avoid sticky hover states on touch devices. Combine with `(prefers-reduced-motion: no-preference)` for animated hovers.
  ```css
  /* GOOD */
  @media (any-pointer: fine) and (prefers-reduced-motion: no-preference) {
    .card:hover { transform: translateY(-2px); }
  }
  ```
- **Use `matchMedia()` in JavaScript**, not `resize` event listeners, for responsive behavior.

### 3.3 Specificity and architecture

- **Avoid `!important`.** Flag any use of `!important`. If specificity needs overriding, refactor the selector structure. The only acceptable use is utility classes that must always win (e.g., `.visually-hidden`).
- **Flat specificity.** Prefer class selectors over deeply nested selectors. Flag selectors with more than 3 levels of nesting.
- **No ID selectors for styling.** IDs have high specificity and are for JavaScript hooks and anchor links only.
- **Data attributes for state.** Use `[data-active="true"]` over `.is-active` toggle classes. Data attributes are more explicit and self-documenting.

### 3.4 Logical properties

The theme uses CSS logical properties (`margin-block-start`, `padding-inline`, `inline-size`, etc.) for RTL language support. Flag new CSS that uses directional properties (`margin-left`, `padding-right`, etc.) where logical equivalents exist.

| Physical property | Logical equivalent |
|---|---|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `width` / `height` | `inline-size` / `block-size` |
| `top` / `bottom` | `inset-block-start` / `inset-block-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `margin-top` / `margin-bottom` | `margin-block-start` / `margin-block-end` |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |

### 3.5 Reduced motion

Flag any animation or transition that does not respect `prefers-reduced-motion`. All CSS animations and transitions should either:
- Be wrapped in `@media (prefers-reduced-motion: no-preference) { ... }`
- Or have a `@media (prefers-reduced-motion: reduce) { ... }` override that disables/simplifies the motion

### 3.6 No pre-minified CSS

Shopify's CDN automatically minifies CSS and JS files served through `asset_url`. Flag:
- Minified first-party CSS or JS files committed to the repo — they should be human-readable source.
- Sass/SCSS files in `/assets` — Shopify does not compile Sass. Use plain CSS.
- CSS `@import` statements — they create additional HTTP requests. Use separate `stylesheet_tag` references or combine files.

### 3.7 `will-change` usage

Flag permanent `will-change` declarations in CSS. `will-change` should be added dynamically before an animation starts and removed after it completes. Permanent `will-change` wastes GPU memory.

---

## 4. Sections and schema

### 4.1 Architecture

- **Sections are self-contained.** Flag sections that rely on global state, variables from other sections, or assumptions about what other sections exist on the page. Each section renders independently for caching purposes.
- **`{{ section.shopify_attributes }}`** must be present on the outermost wrapper element of every section, for the theme editor to function.
- **`{{ block.shopify_attributes }}`** must be present on every block's wrapper element, for click-to-select in the theme editor.
- **`section.id` for unique identifiers.** Flag hardcoded IDs that could collide when multiple instances of a section exist on the same page. Use `{{ section.id }}` to generate unique DOM IDs.
- **Sections cannot nest sections.** Flag any `{% section %}` tag inside a section file.
- **Snippets vs sections.** If code is being added as a section but has no schema/settings and is only rendered from one place, it should probably be a snippet. Conversely, if a snippet is growing complex and needs merchant-configurable settings, it should be promoted to a section or use theme blocks.

### 4.2 Schema design

**Setting labels.** All labels must use:
- **Sentence case**: "Color scheme" not "Color Scheme"
- **Shopify terminology**: "Collection" not "category", "Heading" not "title" (for editable headings), "Show/Hide" for checkboxes, "Enable/Disable" for feature toggles

**Setting types.** Flag misuse of setting types:
- `radio` for 2-4 options, `select` for 5+
- `range` for numeric values with clear min/max/step (spacing, counts, opacity)
- `color_scheme` for section color configuration — not individual `color` pickers (unless the section genuinely needs a one-off color outside the scheme system)
- `image_picker` for images, not `url` with an image URL
- `richtext` for merchant-editable content that needs formatting, `inline_richtext` for single-line formatted text (bold/italic only), `text` for plain strings

**Defaults and info.** Flag settings without sensible `default` values — sections should look good immediately when added to a page. Use `"info"` to guide merchants on how settings work.

**Grouping.** Related settings should be grouped under `"type": "header"` dividers in the schema.

**Block design:**
- Include `"limit"` on block types when unbounded blocks would break the layout
- Set `"max_blocks"` on the section when there's a practical upper bound
- Include `@app` block type in key sections (product, cart, collection) to support app integrations:
  ```json
  { "type": "@app" }
  ```

### 4.3 Presets

- **Dynamic sections must have presets** to appear in the "Add section" picker. Flag dynamic sections missing `"presets"`.
- **Main content sections should NOT have presets.** Sections like `main-product` or `main-collection` are static — they're referenced by the JSON template directly.
- **Presets should include default blocks** so the section isn't empty when a merchant adds it. Flag presets with no blocks if the section relies on blocks for content.

### 4.4 JSON templates

- **All templates should be JSON** (except `gift_card.liquid` which must remain Liquid). Flag new `.liquid` template files — they should be `.json`.
- **Section keys in `"order"` must match keys in `"sections"`.** Flag mismatches.
- **`"type"` must reference an existing section filename** (without `.liquid`).

---

## 5. Accessibility

This is the highest-value area for code review. Theme Check catches almost none of these.

### 5.1 Semantic HTML

- **Use semantic elements.** Flag `<div>` or `<span>` used where a semantic element is appropriate: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`, `<button>`, `<time>`, `<address>`.
- **Clickable `<div>` or `<span>`.** Flag any non-interactive element with a click handler. If it triggers an action, it should be a `<button>`. If it navigates, it should be an `<a>` with an `href`.
- **`<a>` without `href`.** Flag anchor tags without `href` — they should be `<button>` elements instead.
- **`<a href="#">`.** Flag this pattern — it indicates a missing navigation target. Use `<button>` for actions.
- **Heading hierarchy.** Flag heading levels that skip (e.g., `<h1>` followed by `<h3>` with no `<h2>`). Be mindful that sections compose into pages, so a section using `<h2>` is generally correct (the page `<h1>` is typically the product title or page title).
- **Lists for groups.** Navigation links, product options, and tag lists should use `<ul>`/`<ol>` with `<li>`, not bare `<div>` or `<span>` groups.
- **Tables for tabular data.** Cart line items and order details that are displayed as tables should use `<table>` with `<thead>`, `<th scope="col">`, and `<th scope="row">`.

### 5.2 ARIA

- **Don't use ARIA when HTML suffices.** Flag `role="button"` on a `<button>`, `role="link"` on an `<a>`, or `role="navigation"` on a `<nav>`. The semantic element already provides the role.
- **`aria-expanded` must toggle.** Flag `aria-expanded` attributes that exist in the HTML but are never toggled by JavaScript. If a disclosure widget has `aria-expanded="false"`, the JavaScript must set it to `"true"` when opened.
- **`aria-label` on non-interactive elements.** Flag `aria-label` on `<div>`, `<span>`, or other non-interactive elements — it's generally not useful and may be ignored by assistive tech. Use `aria-label` on interactive elements (buttons, links, inputs) and landmark elements (`<nav>`).
- **Distinct `aria-label` on multiple `<nav>` elements.** When a page has multiple `<nav>` elements (main navigation, footer navigation, pagination, breadcrumbs), each must have a distinct `aria-label` so screen reader users can differentiate them.
- **`aria-live` for dynamic updates.** Flag dynamic content changes (cart count updates, search results loading, filter application, error messages appearing) that don't have an `aria-live` region to announce the change. Use `aria-live="polite"` for non-urgent updates and `aria-live="assertive"` for error messages.
- **`aria-hidden="true"` on decorative elements.** SVG icons that accompany visible text should have `aria-hidden="true"` and `focusable="false"`. Icons that are the sole content of a button need `aria-label` on the button instead.
- **`aria-current="page"` on active navigation links.** The current page's nav link should have this attribute.

### 5.3 Keyboard navigation

- **All interactive elements must be keyboard accessible.** Flag custom interactive elements (dropdowns, carousels, modals, tabs, color swatches) that don't handle keyboard events. At minimum: Enter/Space for activation, Escape for dismissal, Arrow keys for navigation within widgets.
- **No positive `tabindex`.** Flag `tabindex="1"` or any positive value — it disrupts natural tab order. Only `tabindex="0"` (add to tab order) and `tabindex="-1"` (programmatically focusable, not in tab order) are acceptable.
- **No keyboard traps.** Verify that Tab always moves forward through the page. The only exception is focus trapping within an open modal dialog, which is correct behavior (but must release the trap when the modal closes).
- **Visible focus indicators.** Flag any `outline: none` or `outline: 0` without a replacement focus style. All focusable elements must have a visible `:focus-visible` indicator.

### 5.4 Focus management

- **Modal/drawer open:** Focus must move to the first focusable element inside (or the close button).
- **Modal/drawer close:** Focus must return to the trigger element that opened it.
- **Content removal:** When an element is removed (e.g., cart item deleted), focus must move to a logical nearby element — not get lost on `<body>`.
- **Dynamic content updates:** After AJAX content updates (Section Rendering API), if focus was inside the updated region, it should be preserved or moved to an appropriate element.

Flag any modal, drawer, or popup implementation that doesn't handle focus management on open and close.

### 5.5 Images and media

- **All `<img>` tags must have an `alt` attribute.** Informative images need descriptive alt text. Decorative images need `alt=""` (empty, not missing).
- **Product/collection images should fall back to the resource title** when `image.alt` is blank. Merchants often upload images without alt text.
  ```liquid
  {{ image | image_url: width: 800 | image_tag:
     alt: image.alt | default: product.title | escape }}
  ```
- **Background images for meaningful content.** Flag CSS `background-image` used for content that conveys information. Background images are invisible to screen readers. Use `<img>` tags instead.
- **SVG accessibility.** Standalone informational SVGs need `role="img"` and `aria-label`. Decorative SVGs need `aria-hidden="true"` and `focusable="false"`.

### 5.6 Forms

- **Every input must have a label.** Flag `<input>`, `<select>`, and `<textarea>` elements without an associated `<label>` (either wrapping or linked via `for`/`id`). If the label is visually hidden, use the `.visually-hidden` class on the `<label>` element — do not use `aria-label` on the input (labels have broader assistive tech support).
- **Error messages must be associated.** Flag error messages that aren't linked to their field via `aria-describedby`. Error containers should use `aria-live="polite"` or `role="alert"`.
- **Required fields.** Use the `required` attribute on mandatory form fields, plus a visual indicator.
- **`autocomplete` attributes.** Flag identity/address/payment form fields missing `autocomplete` attributes — they improve both accessibility and UX.

### 5.7 Color and contrast

- **Color must not be the sole indicator.** Flag UI that uses color alone to convey meaning (e.g., red text for errors without an icon or prefix, green/red for in-stock/out-of-stock without text). Always pair color with text, icons, or patterns.
- **Contrast ratios.** While you cannot compute exact contrast ratios in code review, flag obviously low-contrast combinations: light gray text on white backgrounds, white text on bright colors, or any text color set without considering the background color scheme.
- **Touch targets.** Interactive elements should be at least 44x44 CSS pixels. Flag tiny buttons, links, or swatch elements that are clearly below this threshold.

### 5.8 Reduced motion

Flag animations and transitions that do not respect `prefers-reduced-motion`. This includes both CSS (covered in section 3.5) and JavaScript animations. JavaScript should check `window.matchMedia('(prefers-reduced-motion: reduce)')` before running animations.

---

## 6. Performance

### 6.1 Images

- **Use Shopify's image CDN.** All images must go through the `image_url` filter with explicit `width` (and optionally `height`). Flag raw image URLs or images served from external domains.
- **Responsive images.** Product grids, hero banners, and any image that varies by viewport should use `image_tag` with `widths` and `sizes` attributes for proper srcset generation.
  ```liquid
  {{ product.featured_image | image_url: width: 1200 | image_tag:
     widths: '300,600,900,1200',
     sizes: '(min-width: 750px) 50vw, 100vw',
     loading: 'lazy' }}
  ```
- **Lazy loading.** All images below the fold must use `loading: 'lazy'`. The first visible image (hero/banner) should use `loading: 'eager'` with `fetchpriority: 'high'`. Flag hero images with lazy loading — it delays LCP.
- **Width and height attributes.** `image_tag` adds these automatically (preventing layout shift). If using manual `<img>` tags, flag missing `width`/`height` attributes.
- **Empty image fallbacks.** Flag `image_url` calls without checking whether the image exists. Use placeholder SVGs when no image is available:
  ```liquid
  {% if product.featured_image != blank %}
    {{ product.featured_image | image_url: width: 800 | image_tag: loading: 'lazy' }}
  {% else %}
    {{ 'placeholder' | placeholder_svg_tag }}
  {% endif %}
  ```

### 6.2 Fonts

- **`font-display: swap`** on all `@font-face` declarations. Flag `font-display: block` or missing `font-display` — it causes invisible text during font loading (FOIT).
- **Limit font preloads.** Maximum 2 preloaded fonts in the layout `<head>`. More than that defeats the purpose of preloading.
- **Use Shopify's font library** via `font_picker` settings and `font_face`/`font_url` filters. Flag external font services (Google Fonts CDN, Adobe Fonts) loaded via `<link>` tags — they add DNS lookups and connection overhead. Custom fonts loaded from `/assets` are acceptable when the Shopify font library doesn't have the required font, but should use WOFF2 format for optimal file size.
- **Limit font weights/styles.** Each variant (weight + style combination) is a separate file download. Flag themes loading 5+ font variants when the design only uses 2-3.

### 6.3 Critical rendering path

- **Limit preloads to 2-3 per page.** Flag pages with more than 3 `<link rel="preload">` resources — over-preloading is counterproductive.
- **Non-critical CSS.** Section-specific stylesheets that aren't needed above the fold can be deferred:
  ```liquid
  <link rel="stylesheet" href="{{ 'section-slideshow.css' | asset_url }}" media="print" onload="this.media='all'">
  ```
- **Inline critical JS sparingly.** Small inline scripts for preventing layout shift (e.g., setting header height CSS variables) are acceptable. Large inline scripts should be extracted to files.

### 6.4 Asset optimization

- **No external CDNs for first-party assets.** All CSS, JS, images, and fonts must be hosted in `/assets` and served via Shopify's CDN through `asset_url`. Flag external URLs for first-party resources.
- **Asset size budgets.** Be aware of Theme Check thresholds: CSS files should be under 100KB, JS files under 10KB (compressed). Flag new files that are significantly larger than existing ones without justification.
- **No unused assets.** If a PR removes a feature or refactors code, flag orphaned CSS/JS files that are no longer referenced.

### 6.5 Liquid rendering

- **Section output limit.** Each section has a 50KB Liquid output limit. Flag sections with excessive loops or deeply nested rendering that could approach this limit.
- **Minimize Liquid in tight loops.** Move conditional logic outside loops when the condition doesn't depend on the loop variable. Minimize whitespace inside loops with `{%- -%}` trimming.
- **Use `{% liquid %}` for logic blocks.** When a sequence of Liquid tags contains no HTML output between them, use a single `{% liquid %}` block for cleaner, slightly more efficient rendering.

---

## 7. SEO

### 7.1 Meta tags

- **`<title>` tag.** Verify pages have appropriate, unique title tags. Product pages should include the product title. Collection pages should include the collection title. Paginated pages should include the page number.
- **Meta description.** Flag templates or sections that override or duplicate `<meta name="description">`. The theme should set this once in the layout based on `page_description`.
- **Canonical URL.** Verify `<link rel="canonical" href="{{ canonical_url }}">` is present once per page (in the layout). Flag duplicate canonical tags.

### 7.2 Structured data (JSON-LD)

- **Use Shopify's `| structured_data` filter** for products and articles rather than manually constructing JSON-LD. The filter stays current with Google's requirements.
- **Validate JSON-LD syntax.** Theme Check does not validate structured data content. Flag malformed JSON in `<script type="application/ld+json">` blocks.
- **Content must match visible page content.** Flag structured data that includes information not visible on the page — Google penalizes this.
- **Organization schema.** Verify the theme includes Organization schema site-wide (typically in the header section).
- **Use `https://schema.org`** as the `@context` value, not `http://schema.org`.

### 7.3 Open Graph and social

- **Required OG tags** on all pages: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`.
- **Product-specific OG tags**: `og:price:amount`, `og:price:currency`.
- **Image dimensions.** `og:image:width` and `og:image:height` should accompany `og:image` — they help social platforms render previews faster.
- **Escape all values.** Flag OG tag content that isn't escaped with `| escape`.

---

## 8. Security

Beyond the XSS prevention covered in section 1.2, watch for:

- **Sensitive data in HTML/JS.** Flag any output of customer data (emails, addresses, order details) that isn't on an authenticated page. Verify that customer data in Liquid is only rendered within `{% if customer %}` blocks on customer account templates.
- **Shopify routes.** Use `{{ routes.cart_url }}`, `{{ routes.cart_add_url }}`, `{{ routes.search_url }}`, etc. instead of hardcoded paths like `/cart`, `/cart/add.js`, `/search`. Hardcoded paths break for stores with custom prefixes or localized URLs.
- **CSRF protection.** Shopify forms should not bypass Shopify's built-in CSRF protection. Flag custom forms that POST to Shopify endpoints without using Shopify's `<form>` patterns.
- **No secrets in theme code.** Flag API keys, tokens, passwords, or credentials committed to theme files. Third-party API keys (analytics, search services) that are intended to be public are acceptable but should be set via theme settings, not hardcoded.

---

## 9. Theme editor compatibility

- **Settings must reflect immediately.** Flag changes that require a page reload to take effect in the theme editor. Section settings should render their effect through Liquid that re-renders when the setting changes.
- **`{{ section.shopify_attributes }}` and `{{ block.shopify_attributes }}`** are required on section and block wrappers (reiterated here because missing them breaks the editor).
- **No JavaScript that breaks in the editor.** The theme editor runs in an iframe context. Flag JavaScript that uses `window.top`, `parent.window`, or makes assumptions about not being in an iframe.
- **Dynamic sources compatibility.** Don't make assumptions about where settings values come from — merchants can connect text, image, and URL settings to dynamic sources (metafields, metaobjects) through the editor. Handle nil/blank values gracefully.

---

## 10. General code quality

These are baseline quality checks, not Shopify-specific:

- **No `console.log` in production code.** Flag leftover debug logging. Use the Performance API (`performance.mark`, `performance.measure`) for intentional instrumentation.
- **No commented-out code.** Flag blocks of commented-out code. Dead code should be removed, not preserved in comments. Git history preserves it if needed.
- **File naming conventions.** All filenames must use `kebab-case`: `product-card.liquid`, `featured-collection.css`. Flag camelCase, PascalCase, or snake_case filenames.
- **Variable naming.** Liquid variables should use `snake_case`. JavaScript should use `camelCase` for variables/functions and `PascalCase` for classes/components.
- **Error handling for external dependencies.** Flag code that assumes metafields, metaobjects, third-party app data, or optional Shopify features always exist. Always check for nil/blank and provide graceful fallbacks.
