# Skeleton Theme Agent Guide

A minimal Shopify Liquid theme built on block-first agentic composition. This
file captures the dialect an external coding agent is most likely to miss. Code
is the source of truth.

## Non-negotiables when editing this theme

- **No sections:** no `sections/` folder, no `{% section %}`/`{% sections %}`
  tags, no JSON templates, no schema `presets`.
- **No Liquid-embedded assets:** no `{% stylesheet %}`, no `{% javascript %}`.
  All CSS lives in `assets/critical.css`.
- **Block-first composition:** templates compose page content directly from
  blocks, snippets, and inline markup. Do not introduce single-use page
  sections.
- **Container-owned layout:** each page region is wrapped in the `container`
  block, which owns the outer layout element.
- **Whitespace matters:** include whitespace between an HTML tag name and a
  following Liquid delimiter (`<li {% ... %}`, not `<li{% ... %}`).
- **Translated UI only:** every user-facing string uses a literal
  `{{ 'key' | t }}` call.
- **Shopify routes for storefront URLs:** use Liquid `routes.*` for every
  storefront path; never hardcode `/cart`, `/search`, or `/collections`.

## Composition model

```
templates/*.liquid → {% block 'container' %} → blocks / snippets / inline markup
```

Templates are the composition root. `container` is the block every template composes.

## The block tag

```liquid
{% block 'name', kwargs %}body{% endblock %}
```

- Renders `blocks/name.liquid` inline; the body flows to `{{ block.content }}`
  inside that block.
- **Never self-closing** — always paired with `{% endblock %}`.
- Kwargs pass the `tag` param and dotted settings overrides
  (`block.settings.<id>: value`).
- The dialect also defines reserved `class`/`attributes` kwargs, but skeleton's
  plain-CSS blocks do not declare them (see Blocks below).

## The partial tag

```liquid
{% partial 'name' %}...{% endpartial %}
```

Partials are named inline regions — not files — that client JavaScript can
fetch and patch for server-backed DOM updates. Partial names are contracts with
that JS.

**Skeleton intentionally omits partials.** It has no JS-refetched dynamic
region, so introducing a partial would mean introducing client JS that the
minimalism guardrail forbids. Add one only when a genuine dynamic region needs
it.

## Blocks

Required shape:
- A `{% doc %}` header with typed params and a `{% schema %}` tag **without
  `presets`**.
- Declare only block-specific `@param`s such as `tag`. Do **not** declare the
  reserved `class`/`attributes` kwargs as `@param`.
- Render `{{ block.content }}` where the block composes caller-supplied body.
- Keep `{{ block.shopify_attributes }}` on the root element for editor support.

Skeleton keeps `.theme-check.yml` as a pristine
`extends: theme-check:recommended` with **zero overrides**. Blocks parameterize
via `tag` + `block.settings.*` and rely on `{{ block.shopify_attributes }}` —
no reserved-name workaround is needed.

Public blocks are usable anywhere; a leading underscore (`_private`) marks
context-specific sub-components.

Current blocks: `container`, `hello-world`, `text`, `header`, `footer`.

## Theme map

```
blocks/               container, hello-world, text, header, footer
templates/            *.liquid composition roots (no JSON)
layout/               theme.liquid shell composing header/footer blocks
snippets/             internal utilities (css-variables, image, meta-tags)
assets/critical.css   all theme CSS
```
