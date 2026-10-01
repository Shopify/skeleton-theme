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

The tag works like `{% render %}`, but renders `blocks/name.liquid`. Every
named parameter is available as a plain variable inside the block. If its name
matches a setting declared in the block's schema, it also sets
`block.settings.<id>`. A parameter with no matching schema setting is only a
variable.

For example, the container schema declares `alignment`, but not `tag`:

```liquid
{% block 'container', alignment: 'center', tag: 'div' %}
  {{ page.content }}
{% endblock %}
```

Inside the container, both `alignment` and `block.settings.alignment` return
`center`; `tag` returns `div` and does not create `block.settings.tag`. Continue
to use `block.settings.<id>` for schema-backed controls in block implementations.
`class` is an ordinary parameter with no special platform behavior.

`{% doc %}` documents parameters; it does not declare, validate, or bind them.
A parameter documented only in LiquidDoc is read as a plain variable and does
not become a schema setting. Use `{% schema %}` for merchant-editable controls.
Inline literal arrays are supported in `{% block %}` arguments, as shown by
`tips` in `templates/index.liquid`; `{% render %}` and `{% partial %}` do not
accept inline literal arrays.

The content between `{% block %}` and `{% endblock %}` is available inside the
block as `{{ content }}`. Always include the closing `{% endblock %}` tag,
even when the call has no body content. The body is rendered in the caller's
scope; it cannot read the callee's settings or local assignments. Prefer body
content for display-only text and markup instead of adding `title`, `body`, or
`heading` parameters. Add parameters when the block needs data or must change
how it renders.

Executable `{% block %}` tags are allowed only in `layout/` and `templates/`.
Keep child calls in the caller-owned body, never in block or snippet
implementations. LiquidDoc examples may show block calls, but must be authored
in a layout or template when used.

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
fresh server-rendered tip. Import `partials` from
`@shopify/partial-rendering`. Use `refresh()` to fetch and apply regions from
the current page URL, or `fetch()` followed by `apply()` when you need control
over the request URL, method, body, or when the update appears. Fetch related
regions together so one response keeps them synchronized. Build request URLs
from the current page URL or Liquid `routes.*` to preserve locale and market
routing.

`apply()` preserves focus, text selection, form values, and scroll position.
It also preserves input, textarea, and select values when returned markup
changes them: explicitly update server-adjusted controls after applying the
partial (for example, a cart quantity corrected by inventory validation).
Cancel stale requests with an `AbortSignal`, use `aria-busy` while loading,
announce meaningful results in a live region, and restore transient DOM state
such as open disclosures. Read URL state from `window.location.search` so
shared links and browser navigation produce the same result.

The `{% partial %}` tag renders on the storefront only when
`shop.features.agentic_editor_enabled?` is on and the page is served by
StorefrontRenderer; otherwise the storefront raises `Unknown tag 'partial'`.

## Blocks

Every block must:

- Start with a `{% doc %}` header with typed params.
- Include a `{% schema %}` tag without `presets`.
- Document each named parameter that the block reads, such as `tag` or `class`.
- Document `content` in LiquidDoc and indicate whether it is required or
  optional: `@param {string} content` or `@param {string} [content]`. For
  self-contained blocks, describe that callers must leave the body empty.
- Render `{{ content }}` where caller-supplied body content belongs.
  Self-contained blocks may omit the outlet and use an empty caller body.
- Keep executable child block calls in layouts or templates.
- Keep `{{ block.shopify_attributes }}` on the root element so the theme editor
  can identify the block.

Skeleton keeps `.theme-check.yml` as a pristine
`extends: theme-check:recommended` with **zero overrides**. Fix Theme Check
errors in the Liquid instead of adding configuration exceptions.

Current blocks: `container`, `hello-world`, `header`, `footer`,
`liquid-tips`.

## Theme map

```
blocks/               container, hello-world, header, footer, liquid-tips
templates/            *.liquid page structure (no JSON templates)
layout/               theme.liquid document shell: header/footer container blocks + <main>
snippets/             internal utilities (css-variables, image, meta-tags)
assets/               CSS, JavaScript, and other static assets
```
