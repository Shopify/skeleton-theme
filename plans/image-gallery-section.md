# Image Gallery Section Plan

## Overview
A flexible multi-image gallery section with various layout options including grid, masonry, and asymmetric arrangements. Essential for campaign imagery, brand storytelling, and editorial content.

## Purpose
- Display multiple images in visually compelling arrangements
- Support campaign/lookbook photography
- Create editorial magazine-style layouts
- Optional lightbox for full-screen viewing

## Features

### Core Features
1. **Multiple Layout Options** - Grid, masonry, asymmetric
2. **Image Blocks** - Individual image entries with optional captions
3. **Lightbox/Modal** - Full-screen image viewing
4. **Aspect Ratio Control** - Consistent or natural image ratios
5. **Hover Effects** - Zoom, overlay, caption reveal

### Layout Types
1. **Grid** - Equal-size cells, configurable columns
2. **Masonry** - Pinterest-style, images keep natural aspect ratio
3. **Asymmetric** - Editorial layout with varied cell sizes (e.g., 1 large + 2 small)

## Settings

### Section Settings
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Heading | text | - | "" |
| Heading alignment | select | left, center | center |
| Layout | select | grid, masonry, asymmetric | grid |
| Columns (desktop) | range | 2-4 | 3 |
| Columns (mobile) | range | 1-2 | 2 |
| Gap | select | none, small, medium, large | medium |
| Image aspect ratio | select | portrait, landscape, square, natural | natural |
| Enable lightbox | checkbox | - | true |
| Hover effect | select | none, zoom, overlay, caption | zoom |
| Full width | checkbox | - | false |
| Color scheme | select | scheme-1, scheme-2 | scheme-1 |

### Block Settings (Image Block)
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Image | image_picker | - | - |
| Caption | text | - | "" |
| Link | url | - | - |
| Size (asymmetric only) | select | small, medium, large | medium |

## Schema Structure

```json
{
  "name": "Image gallery",
  "class": "section-image-gallery",
  "tag": "section",
  "settings": [...],
  "blocks": [
    {
      "type": "image",
      "name": "Image",
      "settings": [
        { "type": "image_picker", "id": "image" },
        { "type": "text", "id": "caption" },
        { "type": "url", "id": "link" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Image gallery",
      "blocks": [
        { "type": "image" },
        { "type": "image" },
        { "type": "image" },
        { "type": "image" }
      ]
    }
  ]
}
```

## HTML Structure

```html
<section class="image-gallery section">
  <div class="container">
    <h2 class="image-gallery__heading section-heading">Gallery Title</h2>

    <div class="image-gallery__grid image-gallery__grid--{{ layout }}"
         style="--gallery-columns: 3; --gallery-gap: var(--space-4);">

      <figure class="image-gallery__item">
        <a href="#" class="image-gallery__link" data-lightbox>
          <div class="image-gallery__media">
            <img class="image-gallery__image" src="..." alt="..." loading="lazy">
            <div class="image-gallery__overlay">
              <span class="image-gallery__zoom-icon">+</span>
            </div>
          </div>
          <figcaption class="image-gallery__caption">Caption text</figcaption>
        </a>
      </figure>

      <!-- More items... -->
    </div>
  </div>

  <!-- Lightbox Modal -->
  <div class="image-gallery__lightbox" id="gallery-lightbox" hidden>
    <button class="image-gallery__lightbox-close" aria-label="Close">×</button>
    <button class="image-gallery__lightbox-prev" aria-label="Previous">‹</button>
    <button class="image-gallery__lightbox-next" aria-label="Next">›</button>
    <div class="image-gallery__lightbox-content">
      <img src="" alt="" class="image-gallery__lightbox-image">
      <p class="image-gallery__lightbox-caption"></p>
    </div>
  </div>
</section>
```

## CSS Approach

### Grid Layout
```css
.image-gallery__grid--grid {
  display: grid;
  grid-template-columns: repeat(var(--gallery-columns), 1fr);
  gap: var(--gallery-gap);
}
```

### Masonry Layout (CSS only)
```css
.image-gallery__grid--masonry {
  columns: var(--gallery-columns);
  column-gap: var(--gallery-gap);
}

.image-gallery__grid--masonry .image-gallery__item {
  break-inside: avoid;
  margin-bottom: var(--gallery-gap);
}
```

### Asymmetric Layout
```css
.image-gallery__grid--asymmetric {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: var(--gallery-gap);
}

.image-gallery__item--large {
  grid-column: span 2;
  grid-row: span 2;
}

.image-gallery__item--medium {
  grid-column: span 2;
}
```

### Hover Effects
```css
/* Zoom effect */
.image-gallery--hover-zoom .image-gallery__image {
  transition: transform var(--duration-slow) var(--ease-out);
}
.image-gallery--hover-zoom .image-gallery__link:hover .image-gallery__image {
  transform: scale(1.05);
}

/* Overlay effect */
.image-gallery__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  transition: background var(--duration-normal);
}
.image-gallery__link:hover .image-gallery__overlay {
  background: rgba(0,0,0,0.3);
}
```

## JavaScript Requirements

```javascript
// Lightbox functionality
- Open lightbox on image click
- Navigate with arrow keys and buttons
- Close on Escape or click outside
- Preload adjacent images
- Touch swipe support
- Prevent body scroll when open
```

## Accessibility

- Images must have alt text (from image.alt or block setting)
- Lightbox uses `role="dialog"` with `aria-modal="true"`
- Focus trapped in lightbox when open
- Keyboard: Arrow keys navigate, Escape closes
- Screen reader announces image index (e.g., "Image 3 of 8")
- Reduced motion: Disable zoom/transitions

## Mobile Behavior

- 2 columns max on mobile (or 1 for full-bleed)
- Lightbox goes full-screen
- Swipe gestures for lightbox navigation
- Gap reduces on mobile

## Performance

- All images lazy loaded (`loading="lazy"`)
- Lightbox images loaded on demand
- Use `srcset` for responsive images
- Consider placeholder blur-up effect

## Localization Keys

```json
{
  "sections": {
    "image_gallery": {
      "name": "Image gallery",
      "settings": {
        "layout": {
          "label": "Layout",
          "options": {
            "grid": "Grid",
            "masonry": "Masonry",
            "asymmetric": "Asymmetric"
          }
        },
        "hover_effect": {
          "label": "Hover effect",
          "options": {
            "none": "None",
            "zoom": "Zoom",
            "overlay": "Overlay",
            "caption": "Caption reveal"
          }
        },
        "enable_lightbox": { "label": "Enable lightbox" }
      },
      "blocks": {
        "image": {
          "name": "Image",
          "settings": {
            "caption": { "label": "Caption" },
            "link": { "label": "Link" }
          }
        }
      }
    }
  },
  "accessibility": {
    "gallery_image": "Image {{ index }} of {{ total }}",
    "gallery_lightbox_close": "Close gallery",
    "gallery_lightbox_prev": "Previous image",
    "gallery_lightbox_next": "Next image"
  }
}
```

## Testing Checklist

- [ ] All three layouts render correctly
- [ ] Columns adjust on different screen sizes
- [ ] Lightbox opens and navigates properly
- [ ] Keyboard navigation works
- [ ] Focus management in lightbox correct
- [ ] Images lazy load
- [ ] Hover effects work
- [ ] Links work (when no lightbox)
- [ ] Touch swipe works in lightbox
- [ ] No cumulative layout shift
- [ ] Accessible to screen readers
