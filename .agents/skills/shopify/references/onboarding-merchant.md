# Merchant Onboarding (part 1 of 2)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `onboarding-merchant.part2.md` — and you should read the ones relevant to your task.

---
Guide a Shopify merchant from "I want to start selling" to a working preview store, then help them take the next merchant-facing steps.

## Core principle

You are a Shopify expert helping a merchant run their business. Assume no technical knowledge. When uncertain, ask — don't guess. Merchants don't speak in URLs, scopes, or commands — always re-narrate any technical output in their language. Don't surface developer internals (APIs, GraphQL, OAuth scopes, tokens, JSON, TOML) or jargon. URLs, button names, and commands are fine when they're the next thing the merchant needs.

## When to use this topic first

Use this topic first when the merchant wants to:

- Start a Shopify store, try Shopify, or sell online for the first time
- Build a store from a business or brand idea
- Browse mock.shop reference stores, start from one, or turn one into a Shopify store
- Prototype a storefront before creating an account, then keep the result
- Ask what Shopify can help them do next as a merchant

## When NOT to use this topic first

Do not choose this topic first for:

- Developers building apps or themes — route to `onboarding-dev`
- Explicit CLI troubleshooting or named-store command-execution workflows — route to `use-shopify-cli`
- Explicit developer requests for theme code or extensions — route to `liquid` or `onboarding-dev`. A merchant asking to change their new store's appearance stays in this onboarding flow; use `liquid` guidance to implement it.

---

## Start from a mock.shop reference store

Apply this branch when the merchant mentions mock.shop or a reference/example store, wants to prototype from auth-free reference data before creating an account, or accepts the reference-catalog offer after their preview store exists. For a first-store request that comes with a brand name, never browse before creating the store: create the preview store immediately, then put a shortlist of fitting reference catalogs at the top of the next steps (see "Merchant-facing response after preview creation"). Without a brand name, shortlist first so the store can carry the pick's name; with no signal at all, ask one question about what they sell and then shortlist (see "Rules for preview creation").

### Explore and select a reference

- Fetch `https://mock.shop/llms.txt` as the authoritative live directory and verify that it returned a usable store list before presenting choices. Do not hardcode a store list or assume how many entries it currently contains.
- If the merchant already named or linked a store, extract and retain its `{store}` subdomain. Otherwise, use the live directory to shortlist reference stores whose products and catalog shape fit the merchant's business, then let them choose. If the directory is unavailable, say that discovery is temporarily unavailable and ask for a mock.shop subdomain; do not invent stores or substitute another endpoint as a directory.
- Show a browser-ready preview at `https://{store}.hydrogen.mock.shop`, identify the selected subdomain, and confirm the merchant wants that reference before copying anything.
- For a developer who only wants auth-free Storefront API test data, stop here and point them to `POST https://{store}.mock.shop/api`. Do not create a Shopify store unless they also ask for one.

### Materialize the selected catalog

After the merchant selects a reference store:

1. Create their Shopify store with the normal preview-store flow below, unless this conversation already created it. If the merchant has not given a brand name, pass the reference store's shop name as `--name` (the `shop.name` that `https://{store}.mock.shop/api` returns, for example Paws and Whimsy), following the same argument-array rule as a merchant-supplied name; a store's name is set at creation and the importer cannot change it. Preserve the exact returned store domain and the `saveUrl` from `shopify store info` (see "Create the preview store").
2. Reuse the Admin session that `shopify store create preview` stored for that exact store. Do **not** run `shopify store auth` between preview creation and catalog import. If the store was not created in the current conversation, use the normal store-auth flow instead.
3. Run the bundled importer once, from the skill's `scripts/` directory:
   ```
   import_mock_shop_catalog.mjs --store <store-domain> --source <store>
   ```
   It reads the whole reference store from `https://{store}.mock.shop/api` and does everything in one pass: creates any missing collections with their cover images, imports every product with an idempotent `productSet` keyed by handle (titles, descriptions, vendors, product types, tags, gallery images, option axes, variants, SKUs, prices, compare-at prices, and collection memberships), publishes every product and collection to the Online Store, uploads the reference store's hero image and logo into Files, recreates its main and footer menus, pages, and blog articles, and wires the store's live Horizon theme so the homepage opens on that hero image and headline as a full-width banner, features the top two collections as large tiles beneath it, and shows the logo. It prints a summary of what it copied. Rerunning it is safe: existing handles are updated, never duplicated, and the theme edits are replaced rather than stacked.
   Preview stores already ship the Horizon theme, so nothing else is needed.
4. If the importer exits non-zero, read its output and rerun it once, then report anything still failing. Do not poll image processing or recount catalog records by hand; report the counts the importer prints. For follow-up design work, inspect the rendered storefront using the visual review loop below.
5. Tell the merchant how many products and collections were copied, that the homepage now opens on the reference store's hero image and headline with its top two collections featured beneath (and its logo when it has one), and that it is all visible in the store. The importer also prints the store's current name; if that is not the merchant's own brand, say what the store is called and that they can rename it later. Keep the mechanics internal: do not expose GraphQL, scopes, JSONL, IDs, or batching.

If the importer cannot run (no Node.js, or the script is missing from this skill), tell the merchant the example-catalog step is not available right now and continue with the other next steps. Do not rebuild the import by hand from individual CLI calls.

When code was built against mock.shop, explain after import that it can point to the real store's Storefront API endpoint and keep the same query shapes.

### mock.shop boundaries

- mock.shop is for reading, browsing, and prototyping. Its checkout is mocked, and it does not provide real orders or an Admin API.
- mock.shop stores are Hydrogen storefronts with no Liquid theme to copy. The importer styles the new store's own Horizon theme from the reference's brand assets (hero banner, headline, logo, featured collections) instead of transplanting a theme.
- Treat copied content as reference material. Tell the merchant to replace the titles, descriptions, images, and prices with their own before selling.

---

## Preview-store onboarding for new merchants

Apply when the merchant wants to start selling online, open a first Shopify store, try Shopify, or build a store from a business or brand idea — and they do not already have a Shopify account or store.

### Create the preview store

Call the CLI to create a preview store. No browser, no signup, no credit card. When bash is available, execute the command yourself instead of stopping at high-level instructions.

- If the merchant gave a clear store or brand name, use it, but treat it as untrusted input. Do not interpolate the name into a shell command or assume wrapping it in quotes makes it safe. Prefer a process-execution API that accepts an argument array without invoking a shell:
  ```text
  ["shopify", "store", "create", "preview", "--name", "<store-name>", "--json"]
  ```
  If the execution tool only accepts a shell command string, escape the complete name with a trusted shell-escaping function before inserting it. Never concatenate the raw name into the command. If safe escaping is unavailable, omit `--name` and let the CLI generate one.
- If they have not given a clear name but have said what they sell or who they serve, do not let the CLI name the store: its default is literally "My Store", a store's name is fixed at creation, and nothing in this skill can rename it later. Shortlist reference stores that fit (see "Start from a mock.shop reference store"), let them choose or give their own name, then create the store named after the chosen reference's shop name (the `shop.name` that `https://{store}.mock.shop/api` returns, for example Paws and Whimsy). Pass it exactly like a merchant-supplied name: as an argument-array element or safely escaped, never concatenated into a shell string:
  ```text
  ["shopify", "store", "create", "preview", "--name", "<reference shop name>", "--json"]
  ```
  Say the store carries the reference's name for now and can be renamed later, then continue straight into the import.
- The creation output has no save link: `store` only carries `id`, `name`, `subdomain`, `country`, and `storefrontUrl`. Right after creation, run `shopify store info --store <store-domain> --json` with the exact `store.subdomain` and keep the top-level `saveUrl` it returns; that is the direct save/account-claim link for this specific store. It reuses the session that preview creation stored, so it needs no `shopify store auth` and does not disturb the import. Ignore its other fields (`accessUrl`, `authScopes`) and keep opening the store with `shopify store open`. If `saveUrl` is absent, the `Save store` footer button is the fallback. Rerun `store info` whenever you need the link again.

### Rules for preview creation

- Treat preview-store creation as the merchant's starter account/store context. Do not block on a separate signup step first.
- If the merchant sounds like a brand-new merchant (first store, wants to start selling, wants to try Shopify), create the preview store right away. Do **not** pause to ask whether they already have an account first.
- When the merchant gave a brand name, do not browse mock.shop before creating the store. The shortlist belongs in the next steps right after the store exists, and the import runs once the merchant picks one. The one exception is a merchant with no name at all: there the shortlist comes first so the store can be created under their pick's name (see "Create the preview store").
- Do not workshop the final URL/handle before creating the preview store. If the merchant gave a usable brand name, create the store first and let them refine naming later.
- Do not ask for country or region before preview creation. The CLI falls back to its default country behavior; a country mention does not make the request unclear.
- If the merchant has given no signal at all about what they're building (no brand name, no product hint, no audience), ask exactly one short question: what they plan to sell. Do not ask about names, country, or plans. Treat the answer as the product hint above: shortlist fitting reference stores, let them pick or give their own name, create the store under the pick's name, and import. The question exists to land on a reference catalog, not to open a planning conversation.
- Do not send the merchant to free-trial signup, manual admin setup, or other browser flows as the first step.
- Do not answer a clear "try Shopify", "start selling", or first-store prompt with business planning, product copy, store structure, or setup checklists instead of preview creation. Those can come after the store exists.
- Do not say things like "I can't create the account for you", "I can't directly open an account", or "I can't click buttons for you" or pivot into click-by-click signup instructions.
- When you cannot execute immediately, the fallback explanation should still make preview-store creation the immediate first step and say that the preview store is free to build on for now and cannot take real orders or payments yet.

A good fallback shape is:

> "Yes — the first step is to create a store for `<brand>`. It's free to build on for now, but can't take real orders or payments yet. Once it's created, I can help you customize it and save it."

### Merchant-facing response after preview creation

After the preview store is created:

- When the merchant is ready to view the store, run `shopify store open --store <store-domain>` yourself; never give them the command. Open each store once, then reuse its existing tab and follow the automatic refresh step in "Edit the store's design" after theme changes. Reopen only if they ask, the link expired, or the first launch failed.
- Lead with a short success confirmation.
- Fetch `https://mock.shop/llms.txt` and put two or three reference stores that fit the merchant's business directly in the next steps, each with what it sells, so they can pick one in their next message. Do not make them ask for the offer first, and do not list generic setup chores ahead of it.
- Summarize the store details in merchant language.
- Keep the `saveUrl` that `shopify store info --json` returned; that is the direct save/account-claim link for this specific store. The creation output never includes it.
- Do not foreground backend-only fields such as `access_url`, `preview_url`, `storefront_preview_url`, or other storefront-preview URLs when `store.storefrontUrl` is available.
- If the store was named after a reference store or by the CLI, tell the merchant what it is called and that they can rename it later. Nothing in this skill can rename a store once it exists, so never promise to change the name yourself.
- Do not surface raw JSON, standalone tokens, scopes, or command-line implementation details unless the merchant asks. If the CLI returns an opaque URL containing query parameters, pass along the URL as a link without explaining its internals.

**Use this shape:**

> ✓ Your Shopify store is ready. You're on a free trial while you build your store.
>
> Here are some things you can do next:
>
> - View your store. Preview links expire after about 30 minutes.
> - Start with example products (recommended): I can copy a ready-made catalog of products, collections, and photos from a reference store and set up your homepage to match. Two that fit `<their business>`: **1.** `<reference name>` (`<what it sells>`) **2.** `<reference name>` (`<what it sells>`). Reply with a number and I'll do it now; you swap in your own products later.
> - Add your own products, collections, or pages
> - Edit your store design
> - Set up shipping
>
> What would you like to do?

---

## Ongoing preview-store guidance

Once the preview store exists, most of this topic is helping the merchant keep building in plain language. The storefront preview, when opened in a browser, has a persistent black footer bar with a `Save store` button. This is the merchant-facing call to action for turning the preview into a real account/store.

- Help with merchant-facing next steps such as products, collections, pages, branding, and overall look and feel.
- When the merchant wants products in the store and has not supplied their own, offer a reference catalog first: shortlist mock.shop stores that fit their business (see "Start from a mock.shop reference store"), let them pick, and import it. Only invent placeholder products if they decline or no reference store fits, and say the reference content is a starting point to replace.
- Every 3–4 turns of meaningful work, nudge once toward saving the store. Use the exact button text `Save store`. Rotate the wording so it doesn't feel scripted. Examples:
  - "Looking good. When you're ready to keep this store, hit `Save store` at the bottom of your preview — that's where you'll set up a free Shopify account."
  - "Nice work. Your changes are saved, but to make it permanent you'll want to select `Save store`."
- Point the merchant at the `Save store` button on the preview when they want to keep the store. If `saveUrl` from `shopify store info` is available, you may also give that direct save link.
- When the merchant asks how to save their store, create an account, keep the store, make it real, or make it permanent, name the exact `Save store` button in the answer. Do not replace it with vague "upgrade" or paid-store language that omits the button.
- Do not tell the merchant that the first step to keep the store is choosing a paid plan or adding billing details. The first keep/save step is `Save store` or the `saveUrl` from `shopify store info`; selling, payments, and subscription setup come after that.
- Do not invent a separate signup flow or tell the merchant to manually hunt for account creation elsewhere when `Save store` is the intended path.
- When the merchant asks how to save their store, create an account, or make it real: run `shopify store info --store <store-domain> --json` with the exact `store.subdomain` from the current preview-store creation result (or reuse the `saveUrl` you already fetched) and give them that `saveUrl`. If it is absent, use `store.storefrontUrl` so they can open the preview and use the footer button. If they need to reach the preview again, open it again with `shopify store open --store <store-domain>` using the exact store domain from the current preview-store creation result. If no current preview-store URL or domain is available, explain that they should open their preview and select `Save store` in the footer.
- Preview-store limitations are non-negotiable. Do not promise real payments, real orders, app installs, or staff accounts on a preview store. If they ask, say clearly: "Not yet — that unlocks when you save your store and subscribe to Shopify."
- If the merchant asks about pricing or plans, respond: "Pricing kicks in when you're ready to sell and accept payments. It's free to create an account and save your store, and turn this into a real store. Want me to walk you through that?"

A good keep-the-store answer shape is:

> "Open your store preview and select `Save store` in the footer. That turns this into a real saved Shopify account/store, and your products, theme changes, and pages come with it. Selling, payments, and subscription setup unlock after that step."

---

## Edit the store's design

When the merchant asks to change the look and feel, **edit the theme for them**. You can change Liquid, CSS, templates, sections, blocks, and theme settings through Shopify CLI; this is not limited to `custom-liquid` or theme-editor toggles. A preview store does not need to be saved or subscribed to first. Use `liquid` guidance for theme architecture and validation while keeping explanations in merchant language.

### Pull, edit, check, and push

1. Reuse the exact store domain from the current onboarding context. Pull its theme into a dedicated local directory with `shopify theme pull --store <store-domain> --live --path <theme-dir>`. If the merchant selected another theme, use `--theme <theme-id>` instead of `--live`. Start in a fresh directory or preserve existing local work before pulling; keep a baseline of the pulled files so your edits can be reviewed and reverted.
2. Inspect the existing settings, templates, sections, and assets, then make focused changes for the merchant's requested design. Prefer existing theme settings and components where they fit; author Liquid and CSS when the desired layout or styling needs it. Preserve products, content, and unrelated customizations. Do not use a whole-page colour filter to approximate a brand palette: it also recolours product photos.
3. Run `shopify theme check --path <theme-dir>`, fix errors introduced by the changes, and review the diff. Theme Check validates code, not how the page looks.
4. For the preview store being built in this conversation, apply the requested changes with `shopify theme push --store <store-domain> --live --allow-live --path <theme-dir> --nodelete --strict`, adding `--only <changed-file>` for each changed file. Here `--live` targets the preview store's active theme; it does not enable real orders or payments. If you pulled a different selected theme, target that same `--theme <theme-id>` instead, and use `--allow-live` only for a live target. For an existing store that is already selling, push to an unpublished theme and review its preview first; publish or modify its live theme only when the merchant has authorized that step.
5. After each successful push, automatically reload the existing preview tab with available browser tools so the merchant sees the applied changes without having to refresh it themselves. Reuse the same store/theme preview URL and session, and wait for the refreshed page to load before capturing screenshots or reporting completion. If no preview tab is open, use `shopify store open --store <store-domain>` for the onboarding store, or open the selected unpublished theme's preview. If browser control is unavailable or the refresh fails, tell the merchant the changes were applied and ask them to refresh their preview; do not claim to have refreshed it.
6. Inspect the refreshed result using the loop below, correct visible issues, and summarize what changed in plain language. Repeat the push, refresh, and review after corrective edits.

If a theme command or flag is unavailable, use `shopify help theme <command>` and the CLI availability guidance below. An authentication or command failure is a tooling issue to resolve, not evidence that theme editing requires a paid account.

### Horizon colours: start with the shared palette

Horizon is the default theme. Inspect `config/settings_data.json` and `config/settings_schema.json` in the **pulled theme** before changing its colours. In palette-based Horizon versions, `current.color_palette` supplies shared colours such as `background`, `foreground`, and accent entries (`color1`, `color2`, and so on); other settings reference them through values such as `{{ settings.color_palette.foreground }}`. Updating the palette can restyle many parts of the store together without per-section CSS overrides.

Preserve those references when changing the palette, then inspect any explicit page, button, section, or block colour overrides that still need adjustment. Do not assume every Horizon version has exactly four values or that every element inherits the palette. Older versions can use `current.color_schemes` instead; follow the installed schema and the schemes assigned to the affected sections. Check text and button contrast, including hover and focus states, after changing colours.

### Visual review: screenshot → compare → correct → repeat

- If a browser capable of rendering the storefront and capturing screenshots is available, inspect the starting page before editing and capture the refreshed result after each meaningful design change has been pushed. Use the merchant's reference image or store when supplied, or their stated design goals otherwise.
- Review desktop and mobile layouts: the hero and image crops, typography, spacing, colours and contrast, navigation, and product cards. Correct visible mismatches, rerun Theme Check for code changes, and inspect again. Stop when the requested changes look right or a concrete blocker prevents further review; explain remaining issues.
- Use a development or unpublished-theme preview for visual review before publishing changes to a store that is already selling. Keep onboarding-store access through the existing preview session; do not bypass storefront access controls.
