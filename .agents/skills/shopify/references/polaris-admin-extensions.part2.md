# Polaris Admin Extensions (part 2 of 2)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `polaris-admin-extensions.md` — and you should read the ones relevant to your task.

---
```html
<s-table loading paginate hasPreviousPage hasNextPage variant="auto"><s-table-header-row><s-table-header listSlot="primary">Product</s-table-header><s-table-header listSlot="labeled" format="currency">Price</s-table-header></s-table-header-row><s-table-body><s-table-row clickDelegate="first-cell"><s-table-cell>Blue T-Shirt</s-table-cell><s-table-cell>$29.99</s-table-cell></s-table-row></s-table-body></s-table>
<s-text accessibilityVisibility="visible" dir="ltr" color="subdued" type="strong" tone="success" fontVariantNumeric="tabular-nums" interestFor="text-tip">Styled text</s-text>
<s-text-area name="description" value="A great product" defaultValue="" disabled label="Description" labelAccessibilityVisibility="exclusive" placeholder="Enter description" readOnly required error="Too short" details="Product description" autocomplete="off" maxLength="500" minLength="10" rows={4}></s-text-area>
<s-text-field disabled name="title" value="Blue T-Shirt" defaultValue="Untitled" details="Product name" error="Required" label="Title" labelAccessibilityVisibility="exclusive" placeholder="Enter title" readOnly required autocomplete="off" icon="product" maxLength="255" minLength="1" prefix="SKU-" suffix="™"></s-text-field>
<s-thumbnail src="https://example.com/thumb.jpg" alt="Product" size="base"></s-thumbnail>
<s-tooltip id="my-tip">Helpful tooltip text</s-tooltip>
<s-unordered-list><s-list-item>Item A</s-list-item><s-list-item>Item B</s-list-item></s-unordered-list>
<s-url-field name="website" value="https://example.com" defaultValue="https://" disabled label="Website" labelAccessibilityVisibility="exclusive" placeholder="https://example.com" readOnly required error="Invalid URL" details="Store URL" autocomplete="url" maxLength="2000" minLength="10"></s-url-field>
```

## Web component imports (all versions except 2025-07)

For versions other than `2025-07`, use the Preact entry point:

```ts
import "@shopify/ui-extensions/preact";
import { render } from "preact";
```

### Polaris web components (`s-admin-action`, `s-badge`, etc.)

Polaris web components are custom HTML elements with an `s-` prefix. These are globally registered and require **no import statement**. Use them directly as JSX tags. Do not use these `s-*` web components for `2025-07`:

```tsx
// No import needed — s-admin-action, s-badge, s-button, etc. are globally available
<s-admin-action heading="My Action">
  <s-button slot="primary-action">Submit</s-button>
  <s-button slot="secondary-actions">Cancel</s-button>
</s-admin-action>
```

For versions other than `2025-07`, when the user asks for Polaris web components (e.g. `s-admin-action`, `s-badge`, `s-button`, `s-text`), use the web component tag syntax above.

**Web component attribute rules:**

- Use **camelCase** attribute names: `alignItems`, `paddingBlock`, `borderRadius` — NOT kebab-case (`align-items`, `padding-block`)
- **Boolean attributes** (`disabled`, `loading`, `dismissible`, `hidden`, `required`, `checked`, `defaultChecked`) accept shorthand or `{expression}`:
  - ✅ `<s-button disabled loading>`, `<s-banner dismissible>`, `<s-checkbox checked={isChecked} />`
- **String keyword attributes** (`padding`, `gap`, `direction`, `tone`, `variant`, `size`, `background`, `alignItems`) must be string values — never shorthand or `{true}`:
  - ✅ `<s-box padding="base">`, `<s-stack gap="loose" direction="block">`, `<s-badge tone="success">`
  - ❌ `<s-box padding>`, `<s-stack gap={true}>` — boolean shorthand on string props fails TypeScript
