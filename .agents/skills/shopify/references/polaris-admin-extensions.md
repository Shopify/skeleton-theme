# Polaris Admin Extensions (part 1 of 2)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `polaris-admin-extensions.part2.md` — and you should read the ones relevant to your task.

**Validating this topic's output.**

`--target` is required — for example `admin.product-details.block.render`. The validator rejects an unknown target and lists the ones this surface supports **at the version you asked for** — targets change between versions, so that list is the answer, not a fixed catalogue. Searching "extension targets" also finds them.

---
You are an assistant that helps Shopify developers write UI Framework code to interact with the latest Shopify polaris-admin-extensions UI Framework version.

You should find all operations that can help the developer achieve their goal, provide valid UI Framework code along with helpful explanations.
Admin Extensions integrate into the Shopify admin at contextual locations for merchant workflows.
Admin actions are a UI extension that you can use to create transactional workflows within existing pages of the Shopify admin. Merchants can launch these UI extensions from the More actions menus on resource pages or from an index table's bulk action menu when one or more resources are selected. After the UI extensions are launched, they display as modals. After they're closed, the page updates with the changes from the action.

## Scope and deployment boundary

This guidance only scaffolds and edits Admin UI extension source code to meet the developer's request. It does not deploy or run the extension, access Shopify Admin, or interact with merchant data. The developer must explicitly deploy the app and install or update the extension before it can run in Shopify Admin. Any merchant-data access at runtime remains subject to the app's configured scopes, Shopify's authorization checks, and merchant approval.

## Validator constraints

Do not include HTML comments (`<!-- ... -->`) in the code — the validator treats them as invalid custom components.

## IMPORTANT : ALWAYS USE THE CLI TO SCAFFOLD A NEW EXTENSION

Shopify CLI generates templates that aligns with the latest available version and is not prone to errors. ALWAYS use the CLI Command to Scaffold a new Admin UI extension

CLI Command to Scaffold a new Admin Action Extension

```bash
shopify app generate extension --template admin_action --name my-admin-action
```

Admin blocks are built with UI extensions and enable your app to embed contextual information and inputs directly on resource pages in the Shopify admin. When a merchant has added them to their pages, these UI extensions display as cards inline with the other resource information. Merchants need to manually add and pin the block to their page in the Shopify admin before they can use it.
With admin blocks, merchants can view and modify information from your app and other data on the page simultaneously. To facilitate complex interactions and transactional changes, you can launch admin actions directly from admin blocks.

CLI Command to Scaffold a new Admin Block Extension:

```bash
shopify app generate extension --template admin_block --name my-admin-block
```

Admin link extensions let you direct merchants from pages in the Shopify admin to related, complex workflows in your app. For example, the Shopify Flow app has an admin link extension that directs merchants to a page of the app where they can run an automation for any order:

```bash
shopify app generate extension --template admin_link --name admin-link-extension
```

Admin print actions are a special form of UI extension designed to let your app print documents from key pages in the Shopify admin. Unlike typical actions provided by UI extensions, admin print actions are found under the Print menu on orders and product pages. Additionally, they contain special APIs to let your app display a preview of a document and print it.
CLI Command to Scaffold a new Admin Print Action Extension:

```bash
shopify app generate extension --template admin_print --name my-admin-print-extension
```

App Home UI extensions render your app's landing page — the page merchants land on when they open your app — as a Shopify-hosted Preact module rather than an iframe you host yourself. The target is `admin.app.home.render` and it requires API version `2026-07` or later. `s-page`, `s-app-nav`, and `s-modal` are available only at this target; `s-admin-action`, `s-admin-block`, and `s-admin-print-action` are not.

CLI Command to Scaffold a new App Home UI Extension (select **App home** when prompted):

```bash
shopify app generate extension
```

## Target APIs

**Contextual APIs:** Customer Segment Template Extension API, Discount Function Settings API, Order Routing Rule API, Product Details Configuration API, Product Variant Details Configuration API, Purchase Options Card Configuration API, Validation Settings API
**Core APIs:** Action Extension API, Block Extension API, Print Action Extension API, Standard API
**Utility APIs:** Intents API, Picker API, Resource Picker API, Should Render API

## Component model by API version

The requested Admin UI Extensions API version determines which component model to use. API version takes precedence over wording in the user prompt.

- For `2025-07`, use **only React components** from `@shopify/ui-extensions-react/admin`. Do not generate Polaris web components (`<s-...>`) for `2025-07`.
- For every other version (`2025-10`, `2026-01`, `2026-04`, `2026-07`, `unstable`, etc.), use **only Polaris web components** with `s-*` tags. Do not import or use React components from `@shopify/ui-extensions-react/admin` for these versions.

## React imports (2025-07 only)

For `2025-07`, use React components from `@shopify/ui-extensions-react/admin` and add imports for every React component before validation. Do not use `s-*` web components for `2025-07`.

!!!! ADD IMPORTS FOR EVERYTHING YOU USE BEFORE VALIDATION !!!!
Example:

```ts
import React, { useState, useEffect } from "react";
import {
  reactExtension,
  useApi,
  AdminBlock,
  Banner,
  BlockStack,
  Box,
  Button,
  Divider,
  Heading,
  Icon,
} from "@shopify/ui-extensions-react/admin";
```

## React Component Examples (`@shopify/ui-extensions-react/admin`) — 2025-07 only

Use this React component list only when the Admin UI Extensions API version is `2025-07`. For every other Admin UI Extensions API version, use the Polaris web component list below instead. Do not use this React list for `2025-10`, `2026-01`, `2026-04`, `unstable`, or any other version.

These one-line examples enumerate every prop on each React component. Pick one valid value where the prop accepts a finite union; use a placeholder string (`"anyString"`) where it accepts any string.

```jsx
<AdminAction title="anyString" loading primaryAction={<Button>Save</Button>} secondaryAction={<Button>Cancel</Button>} />
<AdminBlock title="anyString" collapsedSummary="anyString" />
<AdminPrintAction src="anyString" />
<Badge id="anyString" accessibilityLabel="anyString" tone="info" size="base" icon="CheckIcon" iconPosition="start" />
<Banner id="anyString" title="anyString" tone="info" dismissible onDismiss={() => {}} primaryAction={<Button>OK</Button>} secondaryAction={<Button>Cancel</Button>} />
<BlockStack id="anyString" accessibilityLabel="anyString" accessibilityRole="main" gap="base" blockGap="base" rowGap="base" blockSize={0} minBlockSize={0} maxBlockSize={0} inlineSize={0} minInlineSize={0} maxInlineSize={0} padding="base" paddingBlock="base" paddingBlockStart="base" paddingBlockEnd="base" paddingInline="base" paddingInlineStart="base" paddingInlineEnd="base" inlineAlignment="start" blockAlignment="start" />
<Box accessibilityRole="main" blockSize={0} minBlockSize={0} maxBlockSize={0} inlineSize={0} minInlineSize={0} maxInlineSize={0} padding="base" paddingBlock="base" paddingBlockStart="base" paddingBlockEnd="base" paddingInline="base" paddingInlineStart="base" paddingInlineEnd="base" display="auto" />
<Button id="anyString" accessibilityLabel="anyString" disabled variant="primary" tone="default" lang="en" href="https://example.com" to="https://example.com" download target="_self" onClick={() => {}} onPress={() => {}} onBlur={() => {}} onFocus={() => {}} />
<Checkbox id="anyString" accessibilityLabel="anyString" checked disabled error="anyString" label="anyString" name="anyString" value={false} onChange={(value) => {}} />
<ChoiceList name="anyString" disabled error="anyString" readOnly defaultValue="anyString" value="anyString" multiple choices={[{ id: "anyString", label: "anyString" }]} onChange={(value) => {}} />
<ColorPicker id="anyString" allowAlpha value="#000000" onChange={(value) => {}} />
<CustomerSegmentTemplate title="anyString" description="anyString" query="anyString" queryToInsert="anyString" dependencies={{}} createdOn="2026-05-25T00:00:00Z" />
<DateField id="anyString" label="anyString" name="anyString" error="anyString" disabled readOnly value="2026-05-25" yearMonth={{ year: 2026, month: 5 }} defaultYearMonth={{ year: 2026, month: 5 }} onFocus={() => {}} onBlur={() => {}} onChange={(value) => {}} onInput={(value) => {}} onYearMonthChange={(yearMonth) => {}} />
<DatePicker yearMonth={{ year: 2026, month: 5 }} defaultYearMonth={{ year: 2026, month: 5 }} disabled readOnly selected="2026-05-25" onChange={(selected) => {}} onYearMonthChange={(yearMonth) => {}} />
<Divider direction="inline" />
<EmailField id="anyString" label="anyString" name="anyString" placeholder="anyString" value="anyString" error="anyString" disabled readOnly required maxLength={100} minLength={0} autocomplete="email" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
<Form id="anyString" onSubmit={() => {}} onReset={() => {}} />
<FunctionSettings onSave={() => {}} onError={(errors) => {}} />
<Heading id="anyString" size={1} />
<HeadingGroup />
<Icon id="anyString" accessibilityLabel="anyString" tone="inherit" size="base" name="ChecklistMajor" />
<Image id="anyString" accessibilityRole="decorative" accessibilityLabel="anyString" loading="eager" source="https://example.com/img.png" onLoad={() => {}} onError={() => {}} />
<InlineStack id="anyString" accessibilityLabel="anyString" accessibilityRole="main" gap="base" blockGap="base" rowGap="base" columnGap="base" inlineGap="base" blockSize={0} minBlockSize={0} maxBlockSize={0} inlineSize={0} minInlineSize={0} maxInlineSize={0} padding="base" paddingBlock="base" paddingBlockStart="base" paddingBlockEnd="base" paddingInline="base" paddingInlineStart="base" paddingInlineEnd="base" inlineAlignment="start" blockAlignment="start" />
<InternalCustomerSegmentTemplate title="anyString" description="anyString" icon="CategoriesIcon" query="anyString" queryToInsert="anyString" dependencies={{}} createdOn="2026-05-25T00:00:00Z" category="firstTimeBuyers" />
<InternalLocationList locationGroups={[]} onMoveGroup={(oldIndex, newIndex) => {}} onRenameGroup={(id, name) => {}} onDeleteGroup={(id) => {}} onMoveTag={(tagId, oldGroupIndex, newGroupIndex) => {}} onCreateGroup={(id) => {}} />
<Link id="anyString" accessibilityLabel="anyString" href="https://example.com" to="https://example.com" tone="default" lang="en" target="_self" onClick={() => {}} onPress={() => {}} />
<MoneyField id="anyString" label="anyString" name="anyString" placeholder="anyString" value={0} error="anyString" disabled readOnly required maxLength={100} minLength={0} max={1000} min={0} step={1} suffix="anyString" autocomplete="transaction-amount" currencyCode="USD" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
<NumberField id="anyString" label="anyString" name="anyString" placeholder="anyString" value={0} error="anyString" disabled readOnly required maxLength={100} minLength={0} max={1000} min={0} step={1} inputMode="decimal" suffix="anyString" autocomplete="one-time-code" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
<Paragraph id="anyString" fontSize="base" fontWeight="base" textOverflow="ellipsis" fontStyle="normal" />
<PasswordField id="anyString" label="anyString" name="anyString" placeholder="anyString" value="anyString" error="anyString" disabled readOnly required maxLength={100} minLength={0} autocomplete="new-password" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
<Pressable id="anyString" accessibilityRole="main" accessibilityLabel="anyString" href="https://example.com" to="https://example.com" tone="default" lang="en" target="_self" blockSize={0} minBlockSize={0} maxBlockSize={0} inlineSize={0} minInlineSize={0} maxInlineSize={0} padding="base" paddingBlock="base" paddingBlockStart="base" paddingBlockEnd="base" paddingInline="base" paddingInlineStart="base" paddingInlineEnd="base" display="auto" onClick={() => {}} onPress={() => {}} />
<ProgressIndicator id="anyString" accessibilityLabel="anyString" size="small-200" tone="inherit" variant="spinner" />
<Section accessibilityLabel="anyString" heading="anyString" padding="base" />
<Select id="anyString" label="anyString" name="anyString" placeholder="anyString" value="anyString" error="anyString" disabled readOnly required options={[{ label: "anyString", value: "anyString", disabled: false }, { label: "anyString", disabled: false, options: [{ label: "anyString", value: "anyString" }] }]} onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} />
<Text id="anyString" fontWeight="base" textOverflow="ellipsis" fontVariant="numeric" fontStyle="normal" accessibilityRole="strong" />
<TextArea id="anyString" label="anyString" name="anyString" placeholder="anyString" value="anyString" error="anyString" disabled readOnly required maxLength={100} minLength={0} rows={4} autocomplete="name" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
<TextField id="anyString" label="anyString" name="anyString" placeholder="anyString" value="anyString" error="anyString" disabled readOnly required maxLength={100} minLength={0} suffix="anyString" autocomplete="name" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
<URLField id="anyString" label="anyString" name="anyString" placeholder="anyString" value="https://example.com" error="anyString" disabled readOnly required maxLength={100} minLength={0} autocomplete="url" onBlur={() => {}} onChange={(value) => {}} onFocus={() => {}} onInput={(value) => {}} />
```

## Polaris Web Components (all versions except 2025-07)

Use these Polaris web components only for Admin UI Extensions versions other than `2025-07`. Do not use `s-*` web components for `2025-07`.

**Actions:** Button, ButtonGroup, Clickable, ClickableChip, Link, Menu
**Feedback and status indicators:** Badge, Banner, Spinner
**Forms:** Checkbox, ChoiceList, ColorField, ColorPicker, DateField, DatePicker, EmailField, Form, FunctionSettings, MoneyField, NumberField, PasswordField, SearchField, Select, Switch, TextArea, TextField, URLField
**Layout and structure:** Box, Divider, Grid, OrderedList, QueryContainer, Section, Stack, Table, UnorderedList
**Media and visuals:** Avatar, Icon, Image, Thumbnail
**Settings and templates:** AdminAction, AdminBlock, AdminPrintAction
**App Home target only:** AppNav, Modal, Page
**Typography and content:** Chip, Heading, Paragraph, Text, Tooltip

## Components available for Admin UI extensions (all versions except 2025-07).

Use these `s-*` examples only for versions other than `2025-07`. For `2025-07`, use the React examples above instead.

These examples have all the props available for the component. Some example values for these props are provided.
Refer to the developer documentation to find all valid values for a prop. Ensure the component is available for the target you are using.

```html
<s-admin-action heading="Edit product" loading>Content</s-admin-action>
<s-admin-block heading="Custom Fields" collapsedSummary="3 fields configured">Content</s-admin-block>
<s-admin-print-action src="https://example.com/invoice.pdf"></s-admin-print-action>
<s-app-nav><s-link href="/settings">Settings</s-link></s-app-nav>
<s-avatar initials="JD" src="https://example.com/avatar.jpg" size="base" alt="Jane Doe"></s-avatar>
<s-badge tone="success" color="base" icon="check-circle" size="base">Fulfilled</s-badge>
<s-banner heading="Important notice" tone="info" dismissible hidden>Message content</s-banner>
<s-box accessibilityLabel="Container" accessibilityRole="group" accessibilityVisibility="visible" background="subdued" blockSize="auto" border="base" borderColor="base" borderRadius="base" borderStyle="solid" borderWidth="base" display="auto" inlineSize="100%" maxBlockSize="500px" maxInlineSize="100%" minBlockSize="100px" minInlineSize="50px" overflow="hidden" padding="base" paddingBlock="large" paddingBlockStart="base" paddingBlockEnd="base" paddingInline="large" paddingInlineStart="base" paddingInlineEnd="base">Content</s-box>
<s-button accessibilityLabel="Save product" disabled command="--show" commandFor="my-modal" icon="save" interestFor="my-tooltip" lang="en" loading type="submit" tone="auto" variant="primary" target="_self" href="https://example.com" download="file.csv" inlineSize="fill">Save</s-button>
<s-button-group gap="base" accessibilityLabel="Actions"><s-button slot="primary-action" variant="primary">Save</s-button><s-button slot="secondary-actions">Cancel</s-button></s-button-group>
<s-checkbox accessibilityLabel="Accept" checked defaultChecked details="Required" error="Must accept" label="Accept terms" required name="terms" disabled value="accepted" indeterminate defaultIndeterminate></s-checkbox>
<s-chip color="base" accessibilityLabel="Category">Electronics</s-chip>
<s-choice-list details="Pick shipping" disabled error="Required" label="Shipping method" labelAccessibilityVisibility="exclusive" multiple name="shipping" values={["standard"]}><s-choice value="standard" selected defaultSelected disabled accessibilityLabel="Standard shipping">Standard</s-choice><s-choice value="express">Express</s-choice></s-choice-list>
<s-clickable accessibilityLabel="View product" command="--show" commandFor="detail-modal" disabled download="file.pdf" href="/products/42" interestFor="tip" lang="en" loading target="_self" type="button" padding="base" background="subdued" borderRadius="base">Content</s-clickable>
<s-clickable-chip color="base" accessibilityLabel="Filter" removable hidden href="/filter" disabled command="--show" commandFor="chip-menu" interestFor="chip-tip">Active</s-clickable-chip>
<s-color-field name="brandColor" value="#FF5733" defaultValue="#000000" disabled label="Brand color" labelAccessibilityVisibility="exclusive" placeholder="Pick color" readOnly required error="Invalid" details="Brand color" autocomplete="off" alpha></s-color-field>
<s-color-picker alpha value="#3498DB" defaultValue="#000000" name="accent"></s-color-picker>
<s-date-field name="startDate" value="2025-06-15" defaultValue="2025-01-01" disabled label="Start date" labelAccessibilityVisibility="exclusive" placeholder="YYYY-MM-DD" readOnly required error="Invalid date" details="Event start" autocomplete="bday" allow="2025--" allowDays="1,2,3,4,5" disallow="2025-12-25" disallowDays="0,6" view="2025-06" defaultView="2025-01"></s-date-field>
<s-date-picker type="range" value="2025-03-01" defaultValue="2025-01-01" name="dateRange" defaultView="2025-06" view="2025-03" allow="2025--" disallow="2025-12-25" allowDays="1,2,3,4,5" disallowDays="0,6"></s-date-picker>
<s-divider direction="inline" color="base"></s-divider>
<s-drop-zone accept=".jpg,.png" accessibilityLabel="Upload images" disabled error="File too large" label="Product images" labelAccessibilityVisibility="exclusive" multiple name="images" required value="file.jpg"></s-drop-zone>
<s-email-field name="email" value="test@example.com" defaultValue="user@shop.com" disabled label="Email" labelAccessibilityVisibility="exclusive" placeholder="you@example.com" readOnly required error="Invalid email" details="Contact email" autocomplete="email" maxLength="100" minLength="5"></s-email-field>
<s-form id="my-form"><s-text-field label="Name" name="name"></s-text-field><s-button type="submit">Submit</s-button></s-form>
<s-function-settings id="my-settings"><s-number-field label="Min order" name="minAmount" min={0}></s-number-field></s-function-settings>
<s-grid gridTemplateColumns="1fr 2fr" gridTemplateRows="auto" alignItems="center" justifyItems="start" placeItems="center" alignContent="start" justifyContent="space-between" placeContent="center" gap="base" rowGap="large" columnGap="base" padding="base" background="subdued"><s-grid-item gridColumn="1 / 3" gridRow="1" padding="base">Col 1</s-grid-item><s-grid-item>Col 2</s-grid-item></s-grid>
<s-heading accessibilityRole="presentation" accessibilityVisibility="visible" lineClamp="2">Page Title</s-heading>
<s-icon type="cart" tone="success" color="base" size="base" interestFor="cart-tip"></s-icon>
<s-image src="https://example.com/product.jpg" srcSet="img-1x.jpg 1x, img-2x.jpg 2x" sizes="(max-width: 600px) 100vw, 50vw" alt="Product" loading="lazy" accessibilityRole="presentation" inlineSize="100%" aspectRatio="16/9" objectFit="cover" border="base" borderColor="base" borderRadius="base" borderStyle="solid" borderWidth="base"></s-image>
<s-link accessibilityLabel="Docs" command="--show" commandFor="help-modal" interestFor="link-tip" download="report.csv" href="https://shopify.dev" lang="en" target="_self" tone="auto">Shopify Docs</s-link>
<s-menu id="actions-menu" accessibilityLabel="Product actions"><s-button variant="tertiary" icon="edit">Edit</s-button><s-button variant="tertiary" icon="delete" tone="critical">Delete</s-button></s-menu>
<s-modal id="confirm" heading="Delete" padding="base" size="base">Sure?</s-modal>
<s-money-field name="price" value="29.99" defaultValue="0" disabled label="Price" labelAccessibilityVisibility="exclusive" placeholder="0.00" readOnly required error="Required" details="Product price" autocomplete="off" max={999999} min={0}></s-money-field>
<s-number-field name="qty" value="10" defaultValue="1" disabled label="Quantity" labelAccessibilityVisibility="exclusive" placeholder="0" readOnly required error="Invalid" details="Enter quantity" autocomplete="off" inputMode="numeric" max={100} min={1} prefix="#" step={1} suffix="units"></s-number-field>
<s-ordered-list><s-list-item>First</s-list-item><s-list-item>Second</s-list-item></s-ordered-list>
<s-page heading="FAQ manager" inlineSize="base">Content</s-page>
<s-paragraph accessibilityVisibility="visible" fontVariantNumeric="tabular-nums" tone="neutral" dir="ltr" color="subdued" lineClamp="3">Body text content</s-paragraph>
<s-password-field name="password" value="secret123" defaultValue="" disabled label="Password" labelAccessibilityVisibility="exclusive" placeholder="Enter password" readOnly required error="Too short" details="Min 8 chars" autocomplete="current-password" maxLength="128" minLength="8"></s-password-field>
<s-query-container containerName="main">Content</s-query-container>
<s-search-field name="query" value="blue shirt" defaultValue="" disabled label="Search" labelAccessibilityVisibility="exclusive" placeholder="Search products" readOnly required error="No results" details="Search catalog" autocomplete="off" maxLength="200" minLength="1"></s-search-field>
<s-section accessibilityLabel="Details" heading="Product details" padding="base">Content</s-section>
<s-select disabled name="status" value="active" details="Pick status" error="Required" label="Status" labelAccessibilityVisibility="exclusive" placeholder="Select status" required icon="product"><s-option-group disabled label="States"><s-option value="active" disabled selected defaultSelected>Active</s-option><s-option value="draft">Draft</s-option></s-option-group></s-select>
<s-spinner accessibilityLabel="Loading products" size="base"></s-spinner>
<s-stack direction="inline" justifyContent="space-between" alignItems="center" alignContent="start" gap="base" rowGap="large" columnGap="base" padding="base" background="subdued"><s-text>Item 1</s-text><s-text>Item 2</s-text></s-stack>
<s-switch accessibilityLabel="Toggle" checked defaultChecked details="Enable feature" error="Required" label="Active" required name="active" disabled value="on" labelAccessibilityVisibility="exclusive"></s-switch>
```
