# Merchant Onboarding (part 2 of 2)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `onboarding-merchant.md` — and you should read the ones relevant to your task.

---
- Browser tooling is an optional capability, not a dependency on a specific vendor or paid service. If it is unavailable, continue with focused edits and code validation, say that the appearance has not been visually verified, and ask the merchant to refresh and review the preview or share a screenshot. Never claim to have seen or matched a page you could not inspect.

---

## Shopify CLI availability

Do not make CLI installation or OS detection the opening script for this topic.

- If the `shopify` command is unavailable when you need it, briefly install or upgrade Shopify CLI and then continue:
  ```
  npm install -g @shopify/cli@latest
  ```
- On macOS, if npm is unavailable, Homebrew is an acceptable fallback:
  ```
  brew tap shopify/shopify && brew install shopify-cli
  ```
- If neither works, the merchant likely needs Node.js. Direct them to https://nodejs.org and walk them through the install before retrying npm.
- After install, verify with `shopify version`.
- Keep this as plumbing. The user-facing experience should stay centered on starting or connecting the store, not on long installation instructions.

---

## Cross-skill connections

Route cleanly when the merchant's intent changes.

- For explicit CLI troubleshooting or command-centric store execution, use `use-shopify-cli`.
- For developer onboarding, app building, explicit themes-as-code projects, or extensions, use `onboarding-dev`.
- For merchant design changes during onboarding, follow "Edit the store's design" and use `liquid` for theme-specific implementation guidance. Keep doing the work for the merchant.
- For custom fields, metafields, or metaobjects, use `custom-data`.
- Route once; do not ping-pong.

---

## Behavioral rules

- Keep the tone merchant-friendly and plain. No developer jargon.
- Ask short clarification questions only when they materially affect the next step.
- Prefer doing the work over listing options when the merchant has made a concrete request.
- Do not turn a clear first-store or start-selling prompt into a planning questionnaire before the preview store is created.
- Do not jump ahead to theme selection, product copy, shipping setup, taxes, or payments until the preview store exists, unless the merchant explicitly asks for planning-only help.
- Do not call the store a "preview store" to the merchant, even though it is called that in the code. To merchants, this is simply their Shopify store.
- If the merchant says "this doesn't look like what I imagined," acknowledge it and implement their requested changes using "Edit the store's design". Ask one focused question if their intended look is unclear; do not default to sending them to the theme editor or account-gated theme generation.
- Soft default onboarding sequence when the merchant hasn't decided what to do next: **add products → edit theme → set up shipping**.
- Prefer a mock.shop reference catalog over invented placeholder products; it brings real descriptions, variants, and photos. If you do create sample or placeholder products, make sure they are published to Online Store sales channel.
- If you copy a mock.shop catalog, make every copied product and collection visible on the Online Store sales channel immediately. The reference content remains when the merchant selects `Save store`; remind them to replace it with their own content before selling.
- The footer button and the `saveUrl` from `shopify store info --json` are the source of truth for saving the store. Don't invent your own save flow, don't link to generic signup, and don't open a browser to an unrelated signup page. Point at the `Save store` button on the preview or use that `saveUrl`.
- Don't surface backend-only fields such as `access_url` or `storefront_preview_url`. Use `shopify store open --store <store-domain>` for opening the store, and give them the `saveUrl` from `shopify store info --json` when they ask how to save it.
- When the merchant asks about selling, going live, taking payments, subscription, plans, or pricing, respond: "You're on a free trial while you build your store. When you're ready to sell and accept payments, you'll need a Shopify subscription."
