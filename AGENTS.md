# Skeleton Theme Agent Guide

A minimal Shopify theme that defines page structure directly in Liquid. This
file lists the repository conventions that aren't obvious from an individual
file. The code is the source of truth.

## Non-negotiables when editing this theme

- **No sections:** no `sections/` folder, no `{% section %}`/`{% sections %}`
  tags, no JSON templates, no schema `presets`.
- **No Liquid-embedded assets:** no `{% stylesheet %}`, no `{% javascript %}`.
  All CSS and JavaScript live in `assets/`.
- **Direct Liquid templates:** templates render page content from blocks,
  snippets, and inline markup. Don't introduce a section for markup that is
  used by only one page.
- **Template-owned containers:** each `templates/*.liquid` file is the
  composition root and wraps its page content in one or more `container`
  blocks — one per vertical slice. `layout/theme.liquid` wraps only the
  `header` and `footer` blocks in their own `container` blocks and renders
  `content_for_layout` in a plain `<main>`; `layout/password.liquid` renders
  `content_for_layout` in a plain `<main>`, and its template owns the
  container. The exception is `gift_card.liquid` (`{% layout none %}`): it
  manages its own document structure.
- **Whitespace matters:** include whitespace between an HTML tag name and a
  following Liquid delimiter (`<li {% ... %}`, not `<li{% ... %}`).
- **Translated UI only:** every user-facing string uses a literal
  `{{ 'key' | t }}` call.
- **Shopify routes for storefront URLs:** use Liquid `routes.*` for every
  storefront path; never hardcode `/cart`, `/search`, or `/collections`.

## Page structure

```
layout/theme.liquid    → {% block 'container' %} (header) + <main> content_for_layout + {% block 'container' %} (footer)
layout/password.liquid → <main> content_for_layout
templates/*.liquid     → {% block 'container' %} → blocks / snippets / inline HTML
```

Neither layout wraps `content_for_layout` in a `container` block; each renders
it in a plain `<main>`. In `theme.liquid` the `header` and `footer` blocks each
get their own `container` block. Every template is the composition root and
wraps its page content in one or more `container` blocks — a template may hold
any number of containers, one per vertical slice.

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

Current blocks: `container`, `hello-world`, `text`, `header`, `footer`,
`liquid-tips`.

## Theme map

```
blocks/               container, hello-world, text, header, footer, liquid-tips
templates/            *.liquid page structure (no JSON templates)
layout/               theme.liquid document shell: header/footer container blocks + <main>
snippets/             internal utilities (css-variables, image, meta-tags)
assets/               CSS, JavaScript, and other static assets
```
