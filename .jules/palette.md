## 2024-04-22 - Improved Interactive States and Focus Accessibility
**Learning:** The "Quick Add" button optimistically showed "Adicionado ✓" before the network request completed, leading to poor UX if the request failed or was slow. The wishlist button lacked semantic state (`aria-pressed`), and the global stylesheet was missing a visible focus indicator for keyboard users.
**Action:** Ensure async operations have clear loading states (`aria-busy="true"` and text updates) before indicating success. Always include `aria-pressed` for toggle buttons, and establish a clear `:focus-visible` baseline in `critical.css`.

## 2026-04-23 - Dynamic Element ARIA Consistency
**Learning:** Dynamically generated DOM elements (e.g., from AJAX cart updates) often miss ARIA attributes that were present in the initial server-rendered HTML, causing accessibility regressions on interaction.
**Action:** Always ensure client-side rendering logic mirrors the same accessibility attributes (like `aria-label` and `aria-hidden`) as the server-side templates.

## 2024-04-24 - Accessibility and Interactive States
**Learning:** Add-to-cart button missed communicating async loading to screen readers, and wishlist button lacked `aria-pressed` semantic state for its toggle functionality.
**Action:** Ensure async action buttons have `aria-busy="true"` added during requests and removed after completion/failure. Add `aria-pressed` and toggle it correctly for buttons acting as switches.

## $(date +%Y-%m-%d) - Unique ID Generation in Shopify Accordions
**Learning:** When generating `id` attributes in Shopify for accessible linking (like `aria-controls`), relying purely on loop indices (`{{ forloop.index }}`) is insufficient because sections can be rendered multiple times on a page, causing ID collisions.
**Action:** Always prefix dynamically generated IDs with `{{ section.id }}` (e.g., `id="accordion-{{ section.id }}-{{ forloop.index }}"`) to ensure global uniqueness and prevent accessibility regressions on pages with duplicate sections.
## 2024-04-25 - Interactive Elements Accessibility
**Learning:** Several interactive elements like `pdp__swatch`, `pdp__size-btn`, and `pdp__qty-btn` in the product page were missing `:focus-visible` styles, making keyboard navigation difficult. They only had hover or active state styles.
**Action:** Always append `:focus-visible` states to `assets/critical.css` for custom UI interactive elements that act as buttons or radios but are not native inputs.
## 2024-04-26 - ARIA hidden for Icon Ligatures
**Learning:** Screen readers might inappropriately announce the text content of icon ligatures (e.g., "shopping_bag" or "close" inside a `<span class="material-symbols-outlined">`) when they are meant to be purely decorative. This can happen even if they are nested inside an interactive element with a proper `aria-label`.
**Action:** Always add `aria-hidden="true"` to icon ligatures used within labeled buttons, links, or adjacent to descriptive text to ensure screen readers focus only on the intended semantic meaning.
## 2026-05-01 - ARIA hidden for Icon Ligatures
**Learning:** Screen readers might inappropriately announce the text content of icon ligatures (e.g., "shopping_bag" or "close" inside a `<span class="material-symbols-outlined">`) when they are meant to be purely decorative. This can happen even if they are nested inside an interactive element with a proper `aria-label`.
**Action:** Always add `aria-hidden="true"` to icon ligatures used within labeled buttons, links, or adjacent to descriptive text to ensure screen readers focus only on the intended semantic meaning.
