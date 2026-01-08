# Split Hero Section Plan

## Overview
A two-column hero section with image on one side and content on the other. Provides an alternative to full-bleed heroes with more room for text-heavy storytelling and a modern editorial aesthetic.

## Purpose
- Alternative hero layout for variety
- Better for text-heavy content (story pages, about pages)
- More readable than text-over-image
- Creates visual rhythm when alternating with full-bleed sections

## Features

### Core Features
1. **Two-Column Layout** - Image + content side by side
2. **Image Position** - Left or right
3. **Height Options** - Auto, medium, large, full viewport
4. **Content Blocks** - Subheading, heading, text, buttons
5. **Image Effects** - Optional parallax, reveal animation
6. **Mobile Stacking** - Image above or below content

### Design Variations
1. **Standard** - 50/50 split
2. **Wide Image** - 60/40 split (image larger)
3. **Wide Content** - 40/60 split (content larger)

## Settings

### Section Settings
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Image | image_picker | - | - |
| Image position | select | left, right | left |
| Split ratio | select | equal, wide-image, wide-content | equal |
| Height | select | auto, medium, large, full | large |
| Vertical alignment | select | top, center, bottom | center |
| Content alignment | select | left, center | left |
| Enable parallax | checkbox | - | false |
| Mobile image position | select | top, bottom | top |
| Color scheme | select | scheme-1, scheme-2 | scheme-1 |

### Block Settings
Standard content blocks (same as hero):
- Subheading (limit 1)
- Heading (limit 1)
- Text (limit 1)
- Button (limit 2)

## Schema Structure

```json
{
  "name": "Split hero",
  "class": "section-split-hero",
  "tag": "section",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "select",
      "id": "image_position",
      "label": "Image position",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "right", "label": "Right" }
      ],
      "default": "left"
    },
    {
      "type": "select",
      "id": "split_ratio",
      "label": "Split ratio",
      "options": [
        { "value": "equal", "label": "Equal (50/50)" },
        { "value": "wide-image", "label": "Wide image (60/40)" },
        { "value": "wide-content", "label": "Wide content (40/60)" }
      ],
      "default": "equal"
    },
    {
      "type": "select",
      "id": "height",
      "label": "Height",
      "options": [
        { "value": "auto", "label": "Auto" },
        { "value": "medium", "label": "Medium" },
        { "value": "large", "label": "Large" },
        { "value": "full", "label": "Full screen" }
      ],
      "default": "large"
    },
    ...
  ],
  "blocks": [
    {
      "type": "subheading",
      "name": "Subheading",
      "limit": 1,
      "settings": [
        { "type": "text", "id": "text", "label": "Text", "default": "New Arrival" }
      ]
    },
    {
      "type": "heading",
      "name": "Heading",
      "limit": 1,
      "settings": [
        { "type": "text", "id": "text", "label": "Heading", "default": "Split Hero" }
      ]
    },
    {
      "type": "text",
      "name": "Text",
      "limit": 1,
      "settings": [
        { "type": "richtext", "id": "text", "label": "Text" }
      ]
    },
    {
      "type": "button",
      "name": "Button",
      "limit": 2,
      "settings": [
        { "type": "text", "id": "label", "label": "Label", "default": "Shop Now" },
        { "type": "url", "id": "link", "label": "Link" },
        { "type": "select", "id": "style", "label": "Style", "options": [...] }
      ]
    }
  ],
  "presets": [
    {
      "name": "Split hero",
      "blocks": [
        { "type": "subheading" },
        { "type": "heading" },
        { "type": "text" },
        { "type": "button" }
      ]
    }
  ]
}
```

## HTML Structure

```html
<section class="split-hero split-hero--{{ image_position }} split-hero--{{ height }} {% render 'color-scheme', scheme: color_scheme %}">
  <div class="split-hero__grid split-hero__grid--{{ split_ratio }}">

    <!-- Image Side -->
    <div class="split-hero__media">
      <div class="split-hero__media-inner{% if parallax %} split-hero__media-inner--parallax{% endif %}">
        <img class="split-hero__image"
             src="{{ image | image_url: width: 1200 }}"
             alt="{{ image.alt }}"
             loading="eager"
             sizes="(min-width: 990px) 50vw, 100vw"
             srcset="...">
      </div>
    </div>

    <!-- Content Side -->
    <div class="split-hero__content split-hero__content--{{ vertical_alignment }} text-{{ content_alignment }}">
      <div class="split-hero__content-inner">

        {% for block in section.blocks %}
          {% case block.type %}
            {% when 'subheading' %}
              <p class="split-hero__subheading subheading">{{ block.settings.text }}</p>

            {% when 'heading' %}
              <h1 class="split-hero__heading h1">{{ block.settings.text }}</h1>

            {% when 'text' %}
              <div class="split-hero__text rte">{{ block.settings.text }}</div>

            {% when 'button' %}
              <div class="split-hero__buttons">
                <a href="{{ block.settings.link }}" class="btn btn--{{ block.settings.style }}">
                  {{ block.settings.label }}
                </a>
              </div>
          {% endcase %}
        {% endfor %}

      </div>
    </div>

  </div>
</section>
```

## CSS Approach

```css
.split-hero {
  width: 100%;
}

/* Height options */
.split-hero--auto { min-height: auto; }
.split-hero--medium { min-height: 60vh; }
.split-hero--large { min-height: 80vh; }
.split-hero--full { min-height: 100vh; min-height: 100svh; }

/* Grid layout */
.split-hero__grid {
  display: grid;
  min-height: inherit;
}

@media (min-width: 990px) {
  .split-hero__grid {
    grid-template-columns: 1fr 1fr;
  }

  .split-hero__grid--wide-image {
    grid-template-columns: 1.5fr 1fr;
  }

  .split-hero__grid--wide-content {
    grid-template-columns: 1fr 1.5fr;
  }

  /* Image position swap */
  .split-hero--right .split-hero__media {
    order: 2;
  }
}

/* Media side */
.split-hero__media {
  position: relative;
  overflow: hidden;
  min-height: 50vh;
}

@media (min-width: 990px) {
  .split-hero__media {
    min-height: 100%;
  }
}

.split-hero__media-inner {
  position: absolute;
  inset: 0;
}

.split-hero__media-inner--parallax {
  inset: -10%;
  will-change: transform;
}

.split-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content side */
.split-hero__content {
  display: flex;
  padding: var(--space-12) var(--page-margin);
}

@media (min-width: 990px) {
  .split-hero__content {
    padding: var(--space-16) var(--space-12);
  }
}

.split-hero__content--top { align-items: flex-start; }
.split-hero__content--center { align-items: center; }
.split-hero__content--bottom { align-items: flex-end; }

.split-hero__content-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 32rem;
}

/* Typography */
.split-hero__subheading {
  font-size: var(--font-size-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.split-hero__heading {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  text-wrap: balance;
}

.split-hero__text {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  opacity: 0.85;
}

.split-hero__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

/* Mobile stacking */
@media (max-width: 989px) {
  .split-hero--mobile-image-bottom .split-hero__media {
    order: 2;
  }

  .split-hero__media {
    min-height: 40vh;
  }
}
```

## JavaScript Requirements

```javascript
// Optional parallax effect
if (section.classList.contains('split-hero--parallax')) {
  const mediaInner = section.querySelector('.split-hero__media-inner');

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const scrollProgress = -rect.top / (rect.height + window.innerHeight);
    const parallaxOffset = scrollProgress * 100; // 10% of oversized image
    mediaInner.style.transform = `translateY(${parallaxOffset}px)`;
  };

  // Use IntersectionObserver to only run when visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  observer.observe(section);
}
```

## Accessibility

- Heading hierarchy: Use `<h1>` only if first section on page, otherwise `<h2>`
- Image alt text from Shopify's image.alt
- Focus visible on buttons
- Color contrast maintained in both color schemes
- Reduced motion: Disable parallax

## Mobile Behavior

- Stacks vertically (image top or bottom configurable)
- Image gets min-height of 40vh
- Content padding reduced
- Full-height option adjusts to 85vh on mobile

## Performance

- Image loaded eagerly if above fold
- Responsive srcset for image optimization
- Parallax uses CSS transforms (GPU accelerated)
- IntersectionObserver for scroll listener efficiency

## Localization Keys

```json
{
  "sections": {
    "split_hero": {
      "name": "Split hero",
      "settings": {
        "image": { "label": "Image" },
        "image_position": {
          "label": "Image position",
          "options": {
            "left": "Left",
            "right": "Right"
          }
        },
        "split_ratio": {
          "label": "Split ratio",
          "options": {
            "equal": "Equal (50/50)",
            "wide_image": "Wide image (60/40)",
            "wide_content": "Wide content (40/60)"
          }
        },
        "height": {
          "label": "Section height",
          "options": {
            "auto": "Auto",
            "medium": "Medium",
            "large": "Large",
            "full": "Full screen"
          }
        },
        "vertical_alignment": { "label": "Vertical alignment" },
        "enable_parallax": { "label": "Enable parallax effect" },
        "mobile_image_position": {
          "label": "Mobile image position",
          "options": {
            "top": "Top",
            "bottom": "Bottom"
          }
        }
      },
      "blocks": {
        "subheading": { "name": "Subheading" },
        "heading": { "name": "Heading" },
        "text": { "name": "Text" },
        "button": { "name": "Button" }
      }
    }
  }
}
```

## Testing Checklist

- [ ] Image displays correctly on left and right
- [ ] All split ratios work
- [ ] Height options render properly
- [ ] Vertical alignment works
- [ ] Content alignment works
- [ ] Parallax effect smooth (when enabled)
- [ ] Mobile stacking correct
- [ ] Mobile image position toggle works
- [ ] Buttons render with correct styles
- [ ] Text content blocks display properly
- [ ] Placeholder shown when no image
- [ ] Responsive images load appropriate sizes
- [ ] Reduced motion disables parallax
- [ ] Color schemes apply correctly
