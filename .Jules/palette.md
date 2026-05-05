## 2025-04-21 - Added Skip to Content Link
**Learning:** For a custom built Shopify theme, adding a 'skip to content' link via `layout/theme.liquid` requires placing it as the very first interactive element in the body, which requires manual integration with the custom styling and `#main-content` structure.
**Action:** When working on themes with custom headers and sections, remember to include skip links and implement visual focus management for accessibility.

## 2024-05-05 - Add to Cart Loading State Accessibility
**Learning:** In the product page (`sections/product.liquid`), the "Add to Cart" button logic entirely overwrote the button's inner HTML with an icon during an asynchronous network request. Because the icon was `aria-hidden="true"` and the text was removed, screen reader users lost all context about the button's state and purpose during loading.
**Action:** When creating asynchronous button loading states (like adding to cart), preserve the textual context or use an `aria-live` region, rather than solely replacing the entire content with a decorative loading spinner.
