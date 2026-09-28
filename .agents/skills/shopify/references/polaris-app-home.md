# Polaris App Home

**Validating this topic's output.**

For Polaris App Home, pass the version from the Polaris CDN script tag: `--version 1` for the stable major-track URLs `polaris.js` and `polaris-1.js`, `--version 1.0` for `polaris-1.0.js`, or `--version 1.1-rc` for `polaris-1.1-rc.js`. Major pins resolve to the latest stable minor in that major; release candidates must be selected by their exact minor. Shopify.dev aliases such as `v1`, `v1.0`, and `v1.1` are accepted too. Omit to use the latest stable catalog version.

---
You are an assistant that helps Shopify developers write UI Framework code to interact with the latest Shopify polaris-app-home UI Framework version.

You should find all operations that can help the developer achieve their goal, provide valid UI Framework code along with helpful explanations.
Polaris App Home has a set of ready to use UI design patterns and templates for common use cases that you can use to build your app.

version: v1.0

## Scope: the iframe App Home model

This topic covers App Home built on the **iframe** model — a web app you host and deploy yourself, embedded in the Shopify admin, rendered with `@shopify/polaris-types` web components and driven by App Bridge.

It does **not** cover **App Home UI extensions**: the Shopify-hosted `admin.app.home.render` extension target, built with Preact and `@shopify/ui-extensions`. Switch to the `polaris-admin-extensions` topic for that target. The two surfaces expose different component sets, so code written for one fails validation against the other; `s-form`, for instance, exists on the extension target and not here. Signals that the developer means the extension: a `shopify.extension.toml` whose `module` points at `admin.app.home.render`, an extension-only app with no backend to deploy, or an Admin UI Extensions API version such as `2026-07`.

## APIs

**Available APIs:** App, Config, Environment, Resource Fetching, ID Token, Intents, Loading, Modal API, Navigation, Picker, POS, Print, Resource Picker, Reviews, Save Bar, Scanner, Scopes, Share, Support, Toast, User, Web Vitals
**React Hooks:** useAppBridge

## Patterns

**Compositions:** Account connection, App card, Callout card, Empty state, Footer help, Index table, Interstitial nav, Media card, Metrics card, Resource list, Setup guide
**Templates:** Details, Homepage, Index, Settings

## Guides

**Available guides:** Using Polaris web components

Components available for Polaris App Home.
These examples have all the props available for the component. Some example values for these props are provided.
Refer to the developer documentation to find all valid values for a prop. Ensure the component is available for the target you are using.

```tsx
<s-avatar
  initials="JD"
  src="https://example.com/avatar.jpg"
  size="base"
  alt="Jane Doe"
></s-avatar>
<s-badge tone="success" color="base" icon="check-circle" size="base"
  >Fulfilled</s-badge
>
<s-banner heading="Important" tone="info" dismissible>Message content</s-banner>
<s-box padding="base" background="subdued" border="base" borderRadius="base"
  >Content</s-box
>
<s-button variant="primary" tone="auto" icon="save" type="submit"
  >Save</s-button
>
<s-button-group gap="base"
  ><s-button variant="primary">Save</s-button
  ><s-button variant="secondary">Cancel</s-button></s-button-group
>
<s-checkbox label="Accept terms" name="terms" value="accepted"></s-checkbox>
<s-chip color="base" accessibilityLabel="Tag">Category</s-chip>
<s-choice-list label="Options" name="options"
  ><s-choice value="1">Option 1</s-choice
  ><s-choice value="2">Option 2</s-choice></s-choice-list
>
<s-clickable href="/products/42" padding="base" background="subdued"
  >Click area</s-clickable
>
<s-clickable-chip color="strong" removable accessibilityLabel="Filter"
  >Active</s-clickable-chip
>
<s-color-field
  label="Brand color"
  name="brandColor"
  value="#FF5733"
  alpha
></s-color-field>
<s-color-picker name="bgColor" value="#3498DB" alpha></s-color-picker>
<s-date-field
  label="Start date"
  name="startDate"
  value="2025-06-15"
  allow="2025--"
  required
></s-date-field>
<s-date-picker
  type="single"
  name="selectedDate"
  value="2025-03-01"
></s-date-picker>
<s-divider direction="inline" color="base"></s-divider>
<s-drop-zone
  label="Upload file"
  name="file"
  accept=".jpg,.png"
  multiple
></s-drop-zone>
<s-email-field
  label="Email"
  name="email"
  placeholder="you@example.com"
  autocomplete="email"
  required
></s-email-field>
<s-grid gridTemplateColumns="1fr 1fr" gap="base"
  ><s-box>Col 1</s-box><s-box>Col 2</s-box></s-grid
>
<s-heading>Section Title</s-heading>
<s-icon type="cart" tone="auto" color="base" size="base"></s-icon>
<s-image
  src="https://example.com/image.png"
  alt="Description"
  aspectRatio="16/9"
  objectFit="cover"
  loading="lazy"
></s-image>
<s-link href="https://example.com" tone="auto">Link text</s-link>
<s-button commandFor="actions-menu" icon="menu-vertical"></s-button>
<s-menu id="actions-menu" accessibilityLabel="Actions"
  ><s-button icon="edit" variant="tertiary">Edit</s-button></s-menu
>
<s-modal id="my-modal" heading="Title" size="base"
  ><s-text>Modal content</s-text></s-modal
>
<s-money-field
  label="Amount"
  name="amount"
  min={0}
  max={999999}
></s-money-field>
<s-number-field
  label="Quantity"
  name="qty"
  min={1}
  max={100}
  step={1}
  inputMode="numeric"
></s-number-field>
<s-ordered-list
  ><s-list-item>First</s-list-item
  ><s-list-item>Second</s-list-item></s-ordered-list
>
<s-page heading="Products" inlineSize="base"
  ><s-section heading="All products"
    ><s-text>Content</s-text></s-section
  ></s-page
>
<s-paragraph tone="neutral" color="subdued">Body text content</s-paragraph>
<s-password-field
  label="Password"
  name="password"
  autocomplete="current-password"
  minLength={8}
  required
></s-password-field>
<s-popover id="pop" inlineSize="300px"
  ><s-box padding="base"><s-text>Popover content</s-text></s-box></s-popover
>
<s-query-container containerName="main">Content</s-query-container>
<s-search-field
  label="Search"
  name="query"
  placeholder="Search..."
  labelAccessibilityVisibility="exclusive"
></s-search-field>
<s-section heading="Section" padding="base"
  ><s-text>Section content</s-text></s-section
>
<s-select label="Choose" name="choice" placeholder="Select..."
  ><s-option value="a">A</s-option><s-option value="b">B</s-option></s-select
>
<s-spinner size="base" accessibilityLabel="Loading"></s-spinner>
<s-stack direction="inline" gap="base" alignItems="center"
  ><s-text>Item 1</s-text><s-text>Item 2</s-text></s-stack
>
<s-switch label="Enable" name="enabled" checked></s-switch>
<s-table variant="auto"
  ><s-table-header-row
    ><s-table-header listSlot="primary">Name</s-table-header
    ><s-table-header listSlot="labeled" format="currency"
      >Price</s-table-header
    ></s-table-header-row
  ><s-table-body
    ><s-table-row
      ><s-table-cell>Item</s-table-cell
      ><s-table-cell>$25</s-table-cell></s-table-row
    ></s-table-body
  ></s-table
>
<s-text type="strong" tone="success" color="base">Styled text</s-text>
<s-text-area
  label="Description"
  name="desc"
  rows={4}
  maxLength={500}
></s-text-area>
<s-text-field
  label="Name"
  name="name"
  placeholder="Enter name"
  icon="product"
  required
></s-text-field>
<s-thumbnail
  src="https://example.com/thumb.jpg"
  alt="Product"
  size="small"
></s-thumbnail>
<s-icon type="info" interestFor="my-tip"></s-icon
><s-tooltip id="my-tip">Hover for info</s-tooltip>
<s-unordered-list
  ><s-list-item>Item A</s-list-item
  ><s-list-item>Item B</s-list-item></s-unordered-list
>
<s-url-field
  label="Website"
  name="url"
  autocomplete="url"
  placeholder="https://..."
></s-url-field>
```

## `s-grid` vs. inline `s-stack`

Use `s-grid` when form controls and actions must stay aligned in columns. A form control (`s-text-field`, `s-select`, `s-money-field`, …) fills the inline size it's given and has no width prop, so one field in an inline `s-stack` takes the whole row and pushes every sibling onto its own row — at any window width, not just narrow ones. Reach for `s-stack direction="inline"` only for content that sizes to itself: badges, chips, buttons, text, icons.

```tsx
// ✅ Columns are explicit, so the field can't push the action off the row
<s-grid gridTemplateColumns="1fr auto" gap="base" alignItems="end">
  <s-text-field label="Discount code" name="code"></s-text-field>
  <s-button variant="primary">Apply</s-button>
</s-grid>
// ❌ <s-stack direction="inline"> — the field fills the row and Apply lands underneath it
```

## Imports

Apps on the iframe App Home model use `@shopify/app-bridge-types` for App Bridge APIs and `@shopify/polaris-types` for Polaris component types. Do not import `@shopify/ui-extensions` here — that package belongs to App Home UI extensions and the other extension surfaces. Never import from `@shopify/polaris`, `@shopify/polaris-react`, `@shopify/polaris-web-components`, or any other non-existent package.

```ts
import { useAppBridge } from "@shopify/app-bridge-react";
```

### Polaris web components (`s-page`, `s-badge`, etc.)

Polaris web components are custom HTML elements with an `s-` prefix. These are globally registered and require **no import statement**. Use them directly as JSX tags:

```tsx
// No import needed — s-page, s-badge, s-button, s-box, etc. are globally available
<s-page title="Dashboard">
  <s-badge tone="success">Active</s-badge>
</s-page>
```

When the user asks for Polaris web components (e.g. `s-page`, `s-badge`, `s-button`, `s-box`), use the web component tag syntax above.

**Web component attribute rules:**

- Use **camelCase** prop names: `alignItems`, `gridTemplateColumns`, `borderRadius` — NOT hyphenated (`align-items`, `grid-template-columns`)
- **Boolean attributes** (`disabled`, `loading`, `dismissible`, `checked`, `defaultChecked`, `required`, `removable`, `alpha`, `multiple`) accept shorthand or `{expression}`:
  - ✅ `<s-button disabled>`, `<s-switch checked={isEnabled} />`, `<s-banner dismissible>`
- **String keyword attributes** (`padding`, `gap`, `direction`, `tone`, `variant`, `size`, `background`, `alignItems`, `inlineSize`) must be string values — never shorthand or `{true}`:
  - ✅ `<s-box padding="base">`, `<s-stack gap="loose" direction="block">`, `<s-badge tone="success">`
  - ❌ `<s-box padding>`, `<s-stack gap={true}>` — boolean shorthand on string props fails TypeScript
