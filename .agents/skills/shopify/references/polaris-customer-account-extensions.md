# Polaris Customer Account Extensions

**Validating this topic's output.**

`--target` is required — for example `customer-account.order-status.block.render`. The validator rejects an unknown target and lists the ones this surface supports **at the version you asked for** — targets change between versions, so that list is the answer, not a fixed catalogue. Searching "extension targets" also finds them.

---
You are an assistant that helps Shopify developers write UI Framework code to interact with the latest Shopify polaris-customer-account-extensions UI Framework version.

You should find all operations that can help the developer achieve their goal, provide valid UI Framework code along with helpful explanations.
Customer account UI extensions let app developers build custom functionality that merchants can install at defined points on the Order index, Order status, and Profile pages in customer accounts.

## Validator constraints

Do not include HTML comments (`<!-- ... -->`) in the code — the validator treats them as invalid custom components.

CLI Command to Scaffold a new Customer Account UI Extension:

```bash
shopify app generate extension --template=customer_account_ui --name=my_customer_account_ui_extension
```

## Extension Targets (use these in shopify.extension.toml)

Targets decide what components/APIs can be used.
Search the developer documentation for target-specific documentation:

**Footer:**

- customer-account.footer.render-after

**Order index:**

- customer-account.order-index.announcement.render
- customer-account.order-index.block.render

**Order status:**

- customer-account.order-status.announcement.render
- customer-account.order-status.block.render
- customer-account.order-status.cart-line-item.render-after
- customer-account.order-status.cart-line-list.render-after
- customer-account.order-status.customer-information.render-after
- customer-account.order-status.fulfillment-details.render-after
- customer-account.order-status.payment-details.render-after
- customer-account.order-status.return-details.render-after
- customer-account.order-status.unfulfilled-items.render-after

**Order action menu:**

- customer-account.order.action.menu-item.render
- customer-account.order.action.render

**Full page:**

- customer-account.order.page.render
- customer-account.page.render

**Profile (Default):**

- customer-account.profile.addresses.render-after
- customer-account.profile.announcement.render
- customer-account.profile.block.render

**Profile (B2B):**

- customer-account.profile.company-details.render-after
- customer-account.profile.company-location-addresses.render-after
- customer-account.profile.company-location-payment.render-after
- customer-account.profile.company-location-staff.render-after

## APIs

**Available APIs:** Analytics, Authenticated Account, Customer Account API, Customer Privacy, Extension, Intents, Localization, Navigation, Storefront API, Session Token, Settings, Storage, Toast, Version
**Order Status API:** Addresses, Attributes, Authentication State, Buyer Identity, Cart Lines, Checkout Settings, Cost, Discounts, Gift Cards, Localization (Order Status API), Metafields, Note, Order, Require Login, Shop

## Guides

**Available guides:** Using Polaris web components, Configuration, Error handling, Upgrading to 2026-01

## App backend

When the extension makes authenticated calls to the app's own backend (using the Session Token API with the `network_access` capability), use Shopify's official library for the server language — these handle session token verification:

- Node.js: `@shopify/shopify-app-react-router` (recommended), `@shopify/shopify-app-remix`, or `@shopify/shopify-app-express`
- Ruby: `shopify_app` for Rails
- PHP (Laravel or any framework): `shopify-app-php`
- Python (Django or any framework): `shopify-app-python`

The full list of official libraries and app templates lives at [shopify.dev/docs/api/libraries-and-templates](https://shopify.dev/docs/api/libraries-and-templates).

Components available for customer account UI extensions.
These examples have all the props available for the component. Some example values for these props are provided.
Refer to the developer documentation to find all valid values for a prop. Ensure the component is available for the target you are using.

```html
<s-abbreviation title="HTML">HTML</s-abbreviation>
<s-announcement>Important update content</s-announcement>
<s-avatar
  initials="JD"
  src="https://example.com/avatar.jpg"
  size="base"
  alt="Jane Doe"
></s-avatar>
<s-badge tone="critical" color="base" icon="alert-circle" size="base"
  >Overdue</s-badge
>
<s-banner heading="Notice" tone="info" dismissible collapsible
  >Message content</s-banner
>
<s-box padding="base" background="subdued" border="base" borderRadius="base"
  >Content</s-box
>
<s-button variant="primary" tone="auto" type="submit">Save</s-button>
<s-button-group
  ><s-button variant="primary">Save</s-button
  ><s-button variant="secondary">Cancel</s-button></s-button-group
>
<s-checkbox label="Accept terms" name="terms" value="accepted"></s-checkbox>
<s-chip accessibilityLabel="Tag">Category</s-chip>
<s-choice-list label="Options" name="options"
  ><s-choice value="1">Option 1</s-choice
  ><s-choice value="2">Option 2</s-choice></s-choice-list
>
<s-clickable href="/orders/42" padding="base" background="subdued"
  >Click area</s-clickable
>
<s-clickable-chip removable accessibilityLabel="Filter"
  >Active</s-clickable-chip
>
<s-clipboard-item text="ABC123" />
<s-consent-checkbox
  label="Sign up for SMS"
  name="consent"
  policy="sms-marketing"
></s-consent-checkbox>
<s-consent-phone-field
  label="Phone"
  name="phone"
  policy="sms-marketing"
></s-consent-phone-field>
<s-customer-account-action heading="Return items"
  ><s-text>Action content</s-text></s-customer-account-action
>
<s-date-field
  label="Start date"
  name="startDate"
  value="2025-06-15"
  required
></s-date-field>
<s-date-picker
  type="single"
  name="selectedDate"
  value="2025-03-01"
></s-date-picker>
<s-details
  ><s-summary>More info</s-summary
  ><s-text>Expandable content</s-text></s-details
>
<s-divider direction="inline"></s-divider>
<s-drop-zone
  label="Upload file"
  name="file"
  accept=".jpg,.png"
  multiple
></s-drop-zone>
<s-email-field
  label="Email"
  name="email"
  autocomplete="email"
  required
></s-email-field>
<s-form
  ><s-text-field label="Name" name="name"></s-text-field
  ><s-button type="submit">Submit</s-button></s-form
>
<s-grid gridTemplateColumns="1fr 1fr" gap="base"
  ><s-grid-item><s-text>Col 1</s-text></s-grid-item
  ><s-grid-item><s-text>Col 2</s-text></s-grid-item></s-grid
>
<s-heading>Section Title</s-heading>
<s-icon type="cart" tone="auto" size="base"></s-icon>
<s-image
  src="https://example.com/image.png"
  alt="Description"
  aspectRatio="16/9"
  objectFit="cover"
  loading="lazy"
></s-image>
<s-image-group totalItems="6"
  ><s-image src="https://example.com/1.jpg" alt="Image 1"></s-image
  ><s-image src="https://example.com/2.jpg" alt="Image 2"></s-image
></s-image-group>
<s-link href="https://example.com" tone="auto">Link text</s-link>
<s-map
  apiKey="KEY"
  latitude="{43.65}"
  longitude="{-79.38}"
  zoom="{12}"
  accessibilityLabel="Store location"
  ><s-map-marker
    latitude="{43.65}"
    longitude="{-79.38}"
    accessibilityLabel="Store"
  ></s-map-marker
></s-map>
<s-button commandFor="actions-menu"></s-button>
<s-menu id="actions-menu" accessibilityLabel="Actions"
  ><s-button variant="secondary">Edit</s-button></s-menu
>
<s-modal id="my-modal" heading="Title" size="base"
  ><s-text>Modal content</s-text></s-modal
>
<s-money-field
  label="Amount"
  name="amount"
  min="{0}"
  max="{999999}"
></s-money-field>
<s-number-field
  label="Quantity"
  name="qty"
  min="{1}"
  max="{100}"
  step="{1}"
  inputMode="numeric"
></s-number-field>
<s-ordered-list
  ><s-list-item>First</s-list-item
  ><s-list-item>Second</s-list-item></s-ordered-list
>
<s-page heading="Orders" subheading="Manage orders"
  ><s-section heading="All orders"><s-text>Content</s-text></s-section></s-page
>
<s-paragraph tone="neutral" color="subdued">Body text content</s-paragraph>
<s-password-field
  label="Password"
  name="password"
  autocomplete="current-password"
  minLength="8"
  required
></s-password-field>
<s-payment-icon type="visa" accessibilityLabel="Visa"></s-payment-icon>
<s-phone-field label="Phone" name="phone" autocomplete="tel"></s-phone-field>
<s-popover id="pop" inlineSize="300px"
  ><s-box padding="base"><s-text>Popover content</s-text></s-box></s-popover
>
<s-press-button accessibilityLabel="Favorite" pressed>★</s-press-button>
<s-product-thumbnail
  src="https://example.com/product.jpg"
  alt="Blue T-Shirt"
  size="base"
></s-product-thumbnail>
<s-progress
  value="{75}"
  max="{100}"
  tone="auto"
  accessibilityLabel="75% complete"
></s-progress>
<s-qr-code
  content="https://example.com"
  size="base"
  border="base"
  accessibilityLabel="Scan to visit"
></s-qr-code>
<s-query-container containerName="main">Content</s-query-container>
<s-scroll-box blockSize="200px" overflow="auto" padding="base"
  >Scrollable content</s-scroll-box
>
<s-section heading="Details"><s-text>Section content</s-text></s-section>
<s-select label="Choose" name="choice"
  ><s-option value="a">A</s-option><s-option value="b">B</s-option></s-select
>
<s-sheet id="my-sheet" heading="Details"
  ><s-text>Sheet content</s-text></s-sheet
>
<s-skeleton-paragraph content="Loading text..."></s-skeleton-paragraph>
<s-spinner size="base" accessibilityLabel="Loading"></s-spinner>
<s-stack direction="inline" gap="base" alignItems="center"
  ><s-text>Item 1</s-text><s-text>Item 2</s-text></s-stack
>
<s-switch label="Enable" name="enabled" checked></s-switch>
<s-text type="strong" tone="success" color="base">Styled text</s-text>
<s-text-area
  label="Description"
  name="desc"
  rows="{4}"
  maxLength="{500}"
></s-text-area>
<s-text-field label="Name" name="name" icon="profile" required></s-text-field>
<s-time dateTime="2025-03-15T10:30:00Z">March 15, 2025</s-time>
<s-icon type="info" interestFor="my-tip"></s-icon
><s-tooltip id="my-tip">Hover for info</s-tooltip>
<s-unordered-list
  ><s-list-item>Item A</s-list-item
  ><s-list-item>Item B</s-list-item></s-unordered-list
>
<s-url-field label="Website" name="url" autocomplete="url"></s-url-field>
```

## Imports

Use the Preact entry point:

```tsx
import "@shopify/ui-extensions/preact";
import { render } from "preact";
```

### Polaris web components (`s-banner`, `s-badge`, etc.)

Polaris web components are custom HTML elements with an `s-` prefix. These are globally registered and require **no import statement**. Use them directly as JSX tags:

```tsx
// No import needed — s-banner, s-badge, s-button, etc. are globally available
<s-banner tone="info">Welcome back</s-banner>
<s-badge tone="neutral">Order placed</s-badge>
```

When the user asks for Polaris web components (e.g. `s-banner`, `s-badge`, `s-button`, `s-text`), use the web component tag syntax above.

**Web component attribute rules:**

- Use **camelCase** attribute names: `alignItems`, `paddingBlock`, `borderRadius` — NOT kebab-case (`align-items`, `padding-block`)
- **Boolean attributes** (`disabled`, `loading`, `dismissible`, `checked`, `defaultChecked`, `required`) accept shorthand or `{expression}`:
  - ✅ `<s-checkbox checked={isSelected} />`, `<s-button disabled>`, `<s-banner dismissible>`
- **String keyword attributes** (`padding`, `gap`, `direction`, `tone`, `variant`, `size`, `background`, `alignItems`) must be string values — never shorthand or `{true}`:
  - ✅ `<s-box padding="base">`, `<s-stack gap="loose" direction="block">`, `<s-badge tone="neutral">`
  - ❌ `<s-box padding>`, `<s-stack gap={true}>` — boolean shorthand on string props fails TypeScript
