# MVP 



Mobile navigation needs a bit more keyboard polish

sections/header.liquid toggles aria-expanded and aria-hidden, which is good.

But when the menu is open, there is no visible focus treatment on the summary trigger and no obvious keyboard close behavior like Escape handling.



- better styles overall

- Go through all templates again
- Clean up all code - particularly cart and pdp js
- html validation
- performance
- Review all Dawn settings & sections to see what we might want

# Templates https://shopify.dev/docs/storefronts/themes/architecture/templates

- Product
- Search
- Password
- Collection List
- Collection
- Cart
- Blog
- Article
- 404
- Gift Card
- Page

# Sections

- Cart drawer (should css/js go in global?)
- Mobile menu
- Announcement bar
- Category filtering

# Complex Functionality - create skills for

- Color swatches
- Predictive search
- Multiple currencies/markets
- Subscription app support
- Related products

# Various

- Make sure all section previews work
- Add to cart errors should be show on page rather than in js alert
- Potential global js - header.liquid
- Replace icons with consistent library
- Theme Blocks https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start?framework=liquid (deal with custom-section.liquid & blocks folder)
- Modify readme
- Work on performance https://shopify.dev/docs/storefronts/themes/best-practices - - defer css - use assets instead of inline? - https://shopify.dev/docs/storefronts/themes/best-practices/performance/defer-non-critical-resources
- html validation
- Remove comments from main layout file?
- Work on accessability https://shopify.dev/docs/storefronts/themes/best-practices
