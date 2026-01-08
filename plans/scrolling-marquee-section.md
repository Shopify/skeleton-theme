# Scrolling Marquee Section Plan

## Overview
A continuous horizontal scrolling text banner that creates a high-fashion, runway-inspired aesthetic. Used by brands like Balenciaga, Off-White, and other fashion-forward retailers for announcements, brand messaging, or decorative visual elements.

## Purpose
- Create high-fashion visual impact
- Display scrolling announcements or brand messaging
- Add dynamic movement between static sections
- Runway/editorial aesthetic differentiator

## Features

### Core Features
1. **Continuous Scroll** - Seamless infinite loop animation
2. **Multiple Text Items** - Support multiple messages that scroll together
3. **Speed Control** - Configurable scroll speed
4. **Direction** - Left-to-right or right-to-left
5. **Pause on Hover** - Optional pause interaction
6. **Divider Icons** - Separators between text items

### Visual Options
1. **Text Size** - Small, medium, large, extra-large
2. **Font Style** - Body font or heading font
3. **Text Transform** - Normal, uppercase, italic
4. **Stroke Text** - Outline-only text option (high fashion)

## Settings

### Section Settings
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Speed | range | 10-60 (seconds per loop) | 30 |
| Direction | select | left, right | left |
| Pause on hover | checkbox | - | true |
| Text size | select | small, medium, large, xl | large |
| Font | select | body, heading | heading |
| Text transform | select | none, uppercase, italic | uppercase |
| Enable stroke text | checkbox | - | false |
| Divider | select | none, dot, star, dash, custom | dot |
| Custom divider | text | - | "✦" |
| Spacing | select | compact, normal, spacious | normal |
| Color scheme | select | scheme-1, scheme-2 | scheme-1 |

### Block Settings (Text Item)
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Text | text | - | "Marquee Text" |
| Link | url | - | - |

## Schema Structure

```json
{
  "name": "Scrolling marquee",
  "class": "section-marquee",
  "tag": "section",
  "settings": [
    {
      "type": "range",
      "id": "speed",
      "label": "Animation duration",
      "info": "Time in seconds for one complete scroll",
      "min": 10,
      "max": 60,
      "step": 5,
      "default": 30,
      "unit": "s"
    },
    {
      "type": "select",
      "id": "direction",
      "label": "Scroll direction",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "right", "label": "Right" }
      ],
      "default": "left"
    },
    {
      "type": "checkbox",
      "id": "pause_on_hover",
      "label": "Pause on hover",
      "default": true
    },
    {
      "type": "select",
      "id": "text_size",
      "label": "Text size",
      "options": [
        { "value": "small", "label": "Small" },
        { "value": "medium", "label": "Medium" },
        { "value": "large", "label": "Large" },
        { "value": "xl", "label": "Extra large" }
      ],
      "default": "large"
    },
    {
      "type": "select",
      "id": "font",
      "label": "Font",
      "options": [
        { "value": "body", "label": "Body" },
        { "value": "heading", "label": "Heading" }
      ],
      "default": "heading"
    },
    {
      "type": "select",
      "id": "text_transform",
      "label": "Text style",
      "options": [
        { "value": "none", "label": "Normal" },
        { "value": "uppercase", "label": "Uppercase" },
        { "value": "italic", "label": "Italic" }
      ],
      "default": "uppercase"
    },
    {
      "type": "checkbox",
      "id": "enable_stroke",
      "label": "Stroke text (outline only)",
      "default": false
    },
    {
      "type": "select",
      "id": "divider",
      "label": "Divider between items",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "dot", "label": "Dot (•)" },
        { "value": "star", "label": "Star (✦)" },
        { "value": "dash", "label": "Dash (—)" },
        { "value": "custom", "label": "Custom" }
      ],
      "default": "star"
    },
    {
      "type": "text",
      "id": "custom_divider",
      "label": "Custom divider",
      "info": "Used when divider is set to Custom",
      "default": "✦"
    },
    {
      "type": "select",
      "id": "spacing",
      "label": "Item spacing",
      "options": [
        { "value": "compact", "label": "Compact" },
        { "value": "normal", "label": "Normal" },
        { "value": "spacious", "label": "Spacious" }
      ],
      "default": "normal"
    },
    {
      "type": "select",
      "id": "color_scheme",
      "label": "Color scheme",
      "options": [
        { "value": "scheme-1", "label": "Scheme 1" },
        { "value": "scheme-2", "label": "Scheme 2" }
      ],
      "default": "scheme-2"
    }
  ],
  "blocks": [
    {
      "type": "text",
      "name": "Text item",
      "settings": [
        {
          "type": "text",
          "id": "text",
          "label": "Text",
          "default": "Marquee Text"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link (optional)"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Scrolling marquee",
      "blocks": [
        { "type": "text", "settings": { "text": "Free Shipping on Orders $100+" } },
        { "type": "text", "settings": { "text": "New Collection Available" } },
        { "type": "text", "settings": { "text": "Sign Up for 10% Off" } }
      ]
    }
  ]
}
```

## HTML Structure

```html
<section class="marquee section {% render 'color-scheme', scheme: color_scheme %}"
         style="--marquee-duration: {{ speed }}s;"
         {% if pause_on_hover %}data-pause-on-hover{% endif %}>

  <div class="marquee__track marquee__track--{{ direction }}" aria-hidden="true">
    <!-- Content duplicated for seamless loop -->
    <div class="marquee__content">
      {% for block in section.blocks %}
        {% if block.settings.link != blank %}
          <a href="{{ block.settings.link }}" class="marquee__item">
            {{ block.settings.text }}
          </a>
        {% else %}
          <span class="marquee__item">{{ block.settings.text }}</span>
        {% endif %}

        {% if divider != 'none' %}
          <span class="marquee__divider" aria-hidden="true">{{ divider_char }}</span>
        {% endif %}
      {% endfor %}
    </div>

    <!-- Duplicate for seamless loop -->
    <div class="marquee__content">
      {% for block in section.blocks %}
        {% if block.settings.link != blank %}
          <a href="{{ block.settings.link }}" class="marquee__item">
            {{ block.settings.text }}
          </a>
        {% else %}
          <span class="marquee__item">{{ block.settings.text }}</span>
        {% endif %}

        {% if divider != 'none' %}
          <span class="marquee__divider" aria-hidden="true">{{ divider_char }}</span>
        {% endif %}
      {% endfor %}
    </div>
  </div>

  <!-- Screen reader accessible version -->
  <div class="visually-hidden">
    {% for block in section.blocks %}
      <p>{{ block.settings.text }}</p>
    {% endfor %}
  </div>

</section>
```

## CSS Approach

```css
.marquee {
  overflow: hidden;
  padding: var(--space-4) 0;
  white-space: nowrap;
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-scroll var(--marquee-duration, 30s) linear infinite;
}

.marquee__track--right {
  animation-direction: reverse;
}

/* Pause on hover */
[data-pause-on-hover]:hover .marquee__track {
  animation-play-state: paused;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
    justify-content: center;
  }
  .marquee__content:not(:first-child) {
    display: none;
  }
}

.marquee__content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.marquee__item {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}

.marquee__item:hover {
  text-decoration: underline;
}

.marquee__divider {
  display: inline-block;
  opacity: 0.5;
}

/* Text sizes */
.marquee--small { font-size: var(--font-size-sm); }
.marquee--medium { font-size: var(--font-size-lg); }
.marquee--large { font-size: clamp(1.5rem, 4vw, 2.5rem); }
.marquee--xl { font-size: clamp(2rem, 6vw, 4rem); }

/* Font styles */
.marquee--heading { font-family: var(--font-heading-family); }
.marquee--body { font-family: var(--font-body-family); }

/* Text transforms */
.marquee--uppercase {
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.marquee--italic { font-style: italic; }

/* Stroke text effect */
.marquee--stroke .marquee__item {
  color: transparent;
  -webkit-text-stroke: 1px currentColor;
  text-stroke: 1px currentColor;
}

.marquee--stroke.marquee--large .marquee__item,
.marquee--stroke.marquee--xl .marquee__item {
  -webkit-text-stroke: 2px currentColor;
  text-stroke: 2px currentColor;
}

/* Spacing options */
.marquee--compact .marquee__item,
.marquee--compact .marquee__divider {
  padding-inline: var(--space-4);
}

.marquee--normal .marquee__item,
.marquee--normal .marquee__divider {
  padding-inline: var(--space-6);
}

.marquee--spacious .marquee__item,
.marquee--spacious .marquee__divider {
  padding-inline: var(--space-10);
}

/* Animation keyframes */
@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

## JavaScript Requirements

```javascript
// Minimal JS - mostly CSS-driven
// Only needed for:
// 1. Pause on hover (can be CSS-only with [data-pause-on-hover]:hover)
// 2. Dynamic speed adjustment in theme editor

// Optional: Recalculate animation if blocks change in editor
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    // Reinitialize marquee if needed
  });
}
```

## Accessibility

- Scrolling content has `aria-hidden="true"` (since it repeats)
- Static, screen-reader accessible version provided
- Links are accessible and focusable
- Pause on hover allows reading
- `prefers-reduced-motion`: Animation stops, shows centered static text
- Color contrast must meet WCAG requirements

## Mobile Behavior

- Same scrolling behavior on mobile
- Touch does not pause (no hover state)
- Font sizes scale down appropriately via clamp()
- Still readable at mobile sizes

## Performance

- Pure CSS animation (GPU-accelerated transform)
- No JavaScript required for core functionality
- `will-change: transform` applied
- Minimal DOM (just duplicated content for seamless loop)

## Localization Keys

```json
{
  "sections": {
    "marquee": {
      "name": "Scrolling marquee",
      "settings": {
        "speed": {
          "label": "Animation duration",
          "info": "Time in seconds for one complete scroll"
        },
        "direction": {
          "label": "Scroll direction",
          "options": {
            "left": "Left",
            "right": "Right"
          }
        },
        "pause_on_hover": { "label": "Pause on hover" },
        "text_size": {
          "label": "Text size",
          "options": {
            "small": "Small",
            "medium": "Medium",
            "large": "Large",
            "xl": "Extra large"
          }
        },
        "font": {
          "label": "Font",
          "options": {
            "body": "Body",
            "heading": "Heading"
          }
        },
        "text_transform": {
          "label": "Text style",
          "options": {
            "none": "Normal",
            "uppercase": "Uppercase",
            "italic": "Italic"
          }
        },
        "enable_stroke": { "label": "Stroke text (outline only)" },
        "divider": {
          "label": "Divider between items",
          "options": {
            "none": "None",
            "dot": "Dot (•)",
            "star": "Star (✦)",
            "dash": "Dash (—)",
            "custom": "Custom"
          }
        },
        "custom_divider": {
          "label": "Custom divider",
          "info": "Used when divider is set to Custom"
        },
        "spacing": {
          "label": "Item spacing",
          "options": {
            "compact": "Compact",
            "normal": "Normal",
            "spacious": "Spacious"
          }
        }
      },
      "blocks": {
        "text": {
          "name": "Text item",
          "settings": {
            "text": { "label": "Text" },
            "link": { "label": "Link (optional)" }
          }
        }
      }
    }
  }
}
```

## Design Inspiration

- **Balenciaga** - Large stroke text, minimal dividers
- **Off-White** - Bold uppercase, high contrast
- **Ssense** - Clean, fast scrolling announcements
- **Jacquemus** - Playful, colorful marquees

## Testing Checklist

- [ ] Animation runs smoothly (no jank)
- [ ] Seamless loop (no gap/jump)
- [ ] Direction toggle works
- [ ] Speed adjustment works
- [ ] Pause on hover works
- [ ] All text sizes render properly
- [ ] Stroke text effect works
- [ ] All divider options display
- [ ] Custom divider works
- [ ] Links are clickable and styled
- [ ] Reduced motion shows static text
- [ ] Screen reader gets accessible content
- [ ] Mobile displays correctly
- [ ] Color schemes apply properly
- [ ] Works in theme editor
