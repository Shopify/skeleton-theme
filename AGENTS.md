# Skeleton Theme Agent Guide

A minimal Shopify theme that defines page structure directly in Liquid. This
file lists the repository conventions that aren't obvious from an individual
file. The code is the source of truth.

## Non-negotiables when editing this theme

- **No sections:** no `sections/` folder, no `{% section %}`/`{% sections %}`
  tags, no JSON templates, no schema `presets`.
- **No Liquid-embedded assets:** no `{% stylesheet %}`, no `{% javascript %}`.
  All CSS lives in `assets/critical.css`.
- **Direct Liquid templates:** templates render page content from blocks,
  snippets, and inline markup. Don't introduce a section for markup that is
  used by only one page.
- **Container-owned layout:** both `layout/theme.liquid` and
  `layout/password.liquid` wrap `content_for_layout` in the `container` block,
  which owns the outer layout element, so templates render their content
  directly with no per-template container. The only exception is
  `gift_card.liquid` (`{% layout none %}`): with no layout there is no
  layout-owned container, so it manages its own structure.
- **Whitespace matters:** include whitespace between an HTML tag name and a
  following Liquid delimiter (`<li {% ... %}`, not `<li{% ... %}`).
- **Translated UI only:** every user-facing string uses a literal
  `{{ 'key' | t }}` call.
- **Shopify routes for storefront URLs:** use Liquid `routes.*` for every
  storefront path; never hardcode `/cart`, `/search`, or `/collections`.

## Page structure

```
layout/theme.liquid    → {% block 'container' %} → header, content_for_layout, footer
layout/password.liquid → {% block 'container' %} → content_for_layout
templates/*.liquid     → blocks / snippets / inline HTML (rendered in the container)
```

Both `layout/theme.liquid` and `layout/password.liquid` wrap
`content_for_layout` in the `container` block, so every template with a layout
renders inside one layout-owned container. In `theme.liquid` the `header` and
`footer` blocks are nested inside that container alongside `content_for_layout`.
Each template shows its page content directly — blocks, snippets, or HTML —
with no per-template container wrapper.

## The block tag

```liquid
{% block 'name', named_parameter: value %}
  Body content
{% endblock %}
```

The tag works like `{% render %}`, but renders `blocks/name.liquid`. Named
parameters are ordinary Liquid values that the block file can read. Set schema
setting values with `block.settings.<id>: value`, and pass any other parameter
that the block accepts, such as `tag` or `class`.

The content between `{% block %}` and `{% endblock %}` is available inside the
block as `{{ block.content }}`. Always include the closing `{% endblock %}` tag,
even when the call has no body content.

## The partial tag

```liquid
{% partial 'name' %}...{% endpartial %}
```

Partials name inline regions of server-rendered HTML. JavaScript can request a
region by name and replace the matching region in the DOM. The name in the
Liquid template and the name in JavaScript must match.

The `liquid-tips` block is the theme's canonical partial-refresh example: its
tip sentence lives in a `{% partial 'liquid-tip' %}` region, and
`assets/liquid-tips.js` calls `partials.refresh("liquid-tip")` to swap in a
fresh server-rendered tip.

The `{% partial %}` tag renders on the storefront only when
`shop.features.agentic_editor_enabled?` is on and the page is served by
StorefrontRenderer; otherwise the storefront raises `Unknown tag 'partial'`.

## Blocks

Every block must:

- Start with a `{% doc %}` header with typed params.
- Include a `{% schema %}` tag without `presets`.
- Document each named parameter that the block reads, such as `tag` or `class`.
- Render `{{ block.content }}` where caller-supplied body content belongs.
- Keep `{{ block.shopify_attributes }}` on the root element so the theme editor
  can identify the block.

Skeleton keeps `.theme-check.yml` as a pristine
`extends: theme-check:recommended` with **zero overrides**. Fix Theme Check
errors in the Liquid instead of adding configuration exceptions.

Blocks without a leading underscore can be rendered from any template or
block. A leading underscore, as in `_private`, marks a block that belongs to a
specific parent or context.

Current blocks: `container`, `hello-world`, `text`, `header`, `footer`,
`liquid-tips`.

## Theme map

```
blocks/               container, hello-world, text, header, footer, liquid-tips
templates/            *.liquid page structure (no JSON templates)
layout/               theme.liquid document shell with header/footer blocks
snippets/             internal utilities (css-variables, image, meta-tags)
assets/critical.css   all theme CSS
```
