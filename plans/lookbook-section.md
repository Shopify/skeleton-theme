# Lookbook / Hotspot Section Plan

## Overview
A shoppable image section with product hotspots that allow customers to "shop the look" directly from editorial imagery. This is a critical fashion feature that enables the editorial-to-commerce experience.

## Purpose
- Allow merchants to tag products on lifestyle/editorial images
- Create an interactive "shop the look" experience
- Bridge editorial content with commerce
- Essential for fashion themes - lets customers see products styled together

## Features

### Core Features
1. **Background Image** - Full-width or contained editorial image
2. **Product Hotspots** - Clickable pins positioned on the image
3. **Hotspot Cards** - Product info popup when hotspot is clicked/hovered
4. **Quick Add** - Optional add to cart from the hotspot card
5. **Multiple Images** - Support for multiple lookbook images (carousel)

### Interaction Design
- Hotspot pins pulse subtly to indicate interactivity
- Click/tap opens product card overlay
- Card shows: product image, title, price, variant selector, add to cart
- Click outside card closes it
- Keyboard accessible (tab through hotspots)

## Settings

### Section Settings
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Heading | text | - | "Shop the Look" |
| Heading alignment | select | left, center | center |
| Image | image_picker | - | - |
| Image aspect ratio | select | landscape, portrait, square, original | landscape |
| Hotspot style | select | minimal, numbered, icon | minimal |
| Hotspot color | select | light, dark, accent | light |
| Card position | select | auto, left, right | auto |
| Enable quick add | checkbox | - | true |
| Color scheme | select | scheme-1, scheme-2 | scheme-1 |

### Block Settings (Hotspot Block)
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Product | product | - | - |
| Horizontal position | range | 0-100% | 50 |
| Vertical position | range | 0-100% | 50 |
| Label (optional) | text | - | - |

## Schema Structure

```json
{
  "name": "Lookbook",
  "class": "section-lookbook",
  "tag": "section",
  "settings": [...],
  "blocks": [
    {
      "type": "hotspot",
      "name": "Product hotspot",
      "settings": [...]
    }
  ],
  "presets": [
    {
      "name": "Lookbook",
      "blocks": [
        { "type": "hotspot" },
        { "type": "hotspot" }
      ]
    }
  ]
}
```

## HTML Structure

```html
<section class="lookbook">
  <div class="container">
    <h2 class="lookbook__heading">Shop the Look</h2>

    <div class="lookbook__wrapper">
      <div class="lookbook__media">
        <img class="lookbook__image" src="..." alt="...">

        <!-- Hotspots -->
        <button class="lookbook__hotspot"
                style="--hotspot-x: 25%; --hotspot-y: 40%;"
                data-hotspot-index="0"
                aria-expanded="false">
          <span class="lookbook__hotspot-pulse"></span>
          <span class="lookbook__hotspot-dot"></span>
        </button>

        <!-- Product Card (positioned relative to hotspot) -->
        <div class="lookbook__card" data-card-index="0" hidden>
          <div class="lookbook__card-media">
            <img src="..." alt="...">
          </div>
          <div class="lookbook__card-content">
            <h3 class="lookbook__card-title">Product Title</h3>
            <p class="lookbook__card-price">$99.00</p>
            <a href="/products/..." class="lookbook__card-link">View Product</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS Approach

```css
.lookbook__wrapper {
  position: relative;
  max-width: var(--page-max-width);
  margin-inline: auto;
}

.lookbook__media {
  position: relative;
  overflow: hidden;
}

.lookbook__hotspot {
  position: absolute;
  left: var(--hotspot-x);
  top: var(--hotspot-y);
  transform: translate(-50%, -50%);
  /* Styling for the hotspot button */
}

.lookbook__hotspot-pulse {
  /* Animated pulse ring */
  animation: hotspotPulse 2s ease-out infinite;
}

.lookbook__card {
  position: absolute;
  /* Card positioning logic */
  z-index: 10;
}
```

## JavaScript Requirements

```javascript
// Hotspot interaction
- Click handler for hotspots
- Card positioning (keep in viewport)
- Close card on click outside
- Close card on Escape key
- Handle multiple cards (only one open at a time)
- Touch device support
```

## Accessibility

- Hotspots are `<button>` elements with `aria-expanded`
- Cards have `role="dialog"` and proper focus management
- Keyboard navigation: Tab through hotspots, Enter to open, Escape to close
- Screen reader: Announce product name when hotspot focused
- Respect `prefers-reduced-motion` for animations

## Mobile Behavior

- Hotspots remain clickable (not hover-dependent)
- Cards may slide up from bottom (drawer style) on very small screens
- Cards should not overflow viewport
- Pinch-to-zoom disabled on lookbook image to prevent accidental zooming

## Performance

- Lazy load the lookbook image
- Product images in cards loaded on demand (when card opens)
- Use `will-change: transform` sparingly for animations
- Consider IntersectionObserver for animation triggers

## Localization Keys

```json
{
  "sections": {
    "lookbook": {
      "name": "Lookbook",
      "settings": {
        "heading": { "label": "Heading" },
        "image": { "label": "Image" },
        "aspect_ratio": { "label": "Image aspect ratio" },
        "hotspot_style": { "label": "Hotspot style" },
        "enable_quick_add": { "label": "Enable quick add" }
      },
      "blocks": {
        "hotspot": {
          "name": "Product hotspot",
          "settings": {
            "product": { "label": "Product" },
            "horizontal_position": { "label": "Horizontal position" },
            "vertical_position": { "label": "Vertical position" }
          }
        }
      }
    }
  }
}
```

## Editor Experience

- Hotspot positions should be easy to adjust via range sliders
- Preview should show hotspot positions updating in real-time
- Consider: Visual positioning in theme editor (future enhancement)

## Testing Checklist

- [ ] Hotspots position correctly at all screen sizes
- [ ] Cards open/close properly
- [ ] Cards stay within viewport bounds
- [ ] Quick add works with variants
- [ ] Keyboard navigation complete
- [ ] Screen reader announces appropriately
- [ ] Works on touch devices
- [ ] Animations respect reduced motion
- [ ] No layout shift on interaction
