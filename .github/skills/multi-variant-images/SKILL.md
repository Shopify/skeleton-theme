---
name: multi-variant-images
description: "Use when: implementing Shopify product galleries that switch by variant, using variant metafields with product-image fallback, and hide/show or Swiper logic in a Shopify theme."
---

# Shopify variant image gallery pattern

Use this when a product needs different gallery images for different variants while still falling back to the default product gallery when a variant has no custom images.

## Recommended metafield setup

Create a variant metafield:

- Namespace: `custom`
- Key: `variant_gallery`
- Type: `list.file_reference`

This lets each variant store multiple gallery images. If the variant has no images, fall back to the product's normal `product.images` list.

## Liquid pattern

Use the selected variant first, then fallback to product images:

```liquid
{% assign selected_variant = product.selected_or_first_available_variant %}
{% assign variant_gallery_images = selected_variant.metafields.custom.variant_gallery.value %}

{% if variant_gallery_images == blank %}
  {% assign variant_gallery_images = product.images %}
{% endif %}
```

Use that list for the main gallery and the thumbnail gallery.

## DOM-first approach for JS toggling

When the product needs a fast variant switch without rebuilding the gallery from scratch, render all variant image slides up front and switch visibility with JavaScript.

Recommended pattern:

- each slide includes `data-variant-id` and a variant-local image index
- hide all non-matching variant slides
- reveal only the selected variant slides
- update the main gallery and thumbnail gallery together
- keep a safe fallback to `product.images` when no variant gallery exists

Example structure:

```liquid
<div class="product-gallery swiper">
  <div class="swiper-wrapper">
    {% for variant in product.variants %}
      {% assign variant_images = variant.metafields.custom.variant_gallery.value %}
      {% if variant_images == blank %}
        {% assign variant_images = product.images %}
      {% endif %}

      {% for image in variant_images %}
        <div
          class="swiper-slide product-gallery-slide"
          data-variant-id="{{ variant.id }}"
          data-image-index="{{ forloop.index0 }}"
          {% if variant.id != selected_variant.id %}hidden{% endif %}
        >
          {% render 'image-pdp', image: image %}
        </div>
      {% endfor %}
    {% endfor %}
  </div>
</div>
```

## JavaScript guidance

Keep the JS simple:

1. Select the active variant from the product form or option selectors.
2. Find the matching slides for that variant.
3. Hide all other slides.
4. Rebuild or refresh the Swiper instance if needed.
5. Jump to slide 0 for the selected variant.

Avoid:

- using a global slide index across all variants
- calculating thumbnail targets from hidden slides from other variants
- leaving stale Swiper state from a previous variant selection

## Safe fallback rules

- If no metafield value exists: use `product.images`
- If a variant has only one image: still render it in the same gallery pattern
- If variant selectors change, re-run the gallery sync and maintain the product price update

## Good implementation choices for this repo

This theme uses a minimal section + snippet pattern and Swiper for product galleries. This variant-gallery pattern fits well with that structure.

Prefer:

- template-level logic in the product section
- a simple DOM-first hide/show model for low complexity
- variant metadata kept in Shopify instead of custom app logic

## Example checklist

- [ ] Variant metafield created in Shopify
- [ ] Fallback to `product.images` is implemented
- [ ] Selected variant gallery renders in DOM
- [ ] JS hides non-selected variants
- [ ] Thumbnail click logic targets the correct slide
- [ ] Swiper is refreshed after variant change
- [ ] Product price logic still works with option selectors

## Notes

This is a theme-only solution. It does not assume a custom app or external proxy. It is best for a single store theme or storefront pattern where variant-specific gallery images are controlled in Shopify admin.
