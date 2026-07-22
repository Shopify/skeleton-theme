import type { CurrencyCode, Country, Timezone, SellingPlan, Attribute, MailingAddress, Language, SubscribableSignalLike } from '../shared';
import type { ExtensionTarget } from '../../extension-targets';
import { Extension } from '../shared';
/**
 * A [metafield](/docs/apps/build/custom-data/metafields) attached to a Shopify resource, such as a product, variant, customer, or the shop. Metafields let merchants and apps store custom data beyond what Shopify provides by default.
 * @publicDocs
 */
export interface AppMetafield {
    /**
     * The identifier for the metafield within its namespace, such as `'ingredients'` or `'shipping_weight'`.
     */
    key: string;
    /**
     * The namespace that the metafield belongs to. Namespaces group related metafields and prevent naming collisions between different apps.
     */
    namespace: string;
    /**
     * The data stored in the metafield. The format depends on the `valueType`: a string for `'string'`, a number for `'integer'` or `'float'`, a boolean for `'boolean'`, or a serialized JSON object for `'json_string'`.
     */
    value: string | number | boolean;
    /**
     * The data type of the metafield value. Determines how to interpret the `value` field:
     *
     * - `'boolean'`: A `true` or `false` value.
     * - `'float'`: A decimal number.
     * - `'integer'`: A whole number.
     * - `'json_string'`: A serialized JSON object or array.
     * - `'string'`: A plain text value.
     */
    valueType: 'boolean' | 'float' | 'integer' | 'json_string' | 'string';
    /**
     * The metafield's [content type](/docs/apps/build/custom-data/metafields/list-of-data-types), which provides more specific type information than `valueType`. For example, `'single_line_text_field'`, `'number_integer'`, or `'json'`.
     */
    type: string;
}
/**
 * A [metafield](/docs/apps/build/custom-data/metafields) attached to the cart. Cart metafields are temporary and only persist for the duration of the checkout session.
 * @publicDocs
 */
export interface CartMetafield {
    /**
     * The identifier for the metafield within its namespace.
     */
    key: string;
    /**
     * The namespace that the metafield belongs to. Namespaces group related metafields and prevent naming collisions between different apps.
     */
    namespace: string;
    /**
     * The string value stored in the cart metafield. Unlike `AppMetafield`, cart metafield values are always strings.
     */
    value: string;
    /**
     * The metafield's [content type](/docs/apps/build/custom-data/metafields/list-of-data-types), which describes the structure and validation of the value. For example, `'single_line_text_field'` or `'json'`.
     */
    type: string;
}
/**
 * The Shopify resource that a metafield is attached to. Each entry identifies a specific resource by its type and globally-unique ID, so your extension can determine where the metafield data originates.
 * @publicDocs
 */
export interface AppMetafieldEntryTarget {
    /**
     * The kind of Shopify resource this metafield belongs to:
     *
     * - `'customer'`: The customer who placed the order.
     * - `'product'`: A product in the merchant's catalog.
     * - `'shop'`: The merchant's shop.
     * - `'variant'`: A specific variant of a product.
     * - `'company'`: A B2B company associated with the order.
     * - `'companyLocation'`: A location belonging to a B2B company.
     * - `'cart'`: The cart associated with the order.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company`, or `companyLocation`.
     */
    type: 'customer' | 'product' | 'shop' | 'variant' | 'company' | 'companyLocation' | 'cart' | 'order';
    /**
     * The globally-unique identifier of the Shopify resource, in [GID](https://shopify.dev/docs/api/usage/gids) format. Use this value to match the metafield to a specific resource in your extension or when querying the GraphQL API.
     *
     * @example 'gid://shopify/Product/123'
     */
    id: string;
}
/**
 * An entry that pairs a Shopify resource with one of its [metafields](/docs/apps/build/custom-data/metafields). Each entry contains a `target` identifying which resource the metafield belongs to and a `metafield` object with the actual data. Use `appMetafields` on the Order API to access these entries.
 * @publicDocs
 */
export interface AppMetafieldEntry {
    /**
     * The Shopify resource that this metafield is attached to, including the resource type (such as `'product'` or `'customer'`) and its globally-unique ID.
     *   */
    target: AppMetafieldEntryTarget;
    /**
     * The metafield data, including the namespace, key, value, and content type. Use the `namespace` and `key` together to uniquely identify the metafield within its resource.
     */
    metafield: AppMetafield;
}
/**
 * @publicDocs
 */
export type Version = string;
/**
 * @publicDocs
 */
export interface Currency {
    /**
     * The three-letter currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format, such as `'USD'`, `'EUR'`, or `'CAD'`.
     */
    isoCode: CurrencyCode;
}
/**
 * @publicDocs
 */
export interface Market {
    /**
     * A globally-unique identifier for the market in the format `gid://shopify/Market/<id>`.
     */
    id: string;
    /**
     * The human-readable, shop-scoped identifier for the market, such as `'us'` or `'eu'`. Merchants define these handles when configuring [Shopify Markets](/docs/apps/build/markets).
     */
    handle: string;
}
/**
 * Provides raw localization data only. The `i18n` translation and formatting
 * helpers from the Localization API aren't available on order status targets.
 * @publicDocs
 */
export interface OrderStatusLocalization {
    /**
     * The currency used to display money amounts on the **Order status** page. Use this value
     * to format prices and totals in the buyer's expected currency.
     */
    currency: SubscribableSignalLike<Currency>;
    /**
     * The buyer's time zone, derived from their browser or account settings. Use this value
     * to format dates and times relative to the buyer's local time.
     */
    timezone: SubscribableSignalLike<Timezone>;
    /**
     * The language the buyer sees on the **Order status** page. This reflects the language
     * selected by the buyer or determined by their browser settings, and may differ from
     * the languages your extension supports.
     */
    language: SubscribableSignalLike<Language>;
    /**
     * The best available language match for your extension based on the buyer's language.
     * If the buyer's language is `fr-CA` but your extension only supports `fr`, this
     * returns `fr`. If your extension doesn't support any variant of the buyer's language,
     * this falls back to your extension's default locale (the `.default.json` translation file).
     * Use this value to load the correct translation file for your extension.
     */
    extensionLanguage: SubscribableSignalLike<Language>;
    /**
     * The country associated with the order, carried over from the cart context where it was
     * used to contextualize the storefront experience. Use this value to display region-specific
     * content such as local support information or regional policies. The value is `undefined`
     * if the buyer's country is unknown.
     */
    country: SubscribableSignalLike<Country | undefined>;
    /**
     * The [market](/docs/apps/build/markets) associated with the order, carried
     * over from the cart context. Markets group countries and regions with shared pricing,
     * languages, and domains. The value is `undefined` if the market is unknown.
     */
    market: SubscribableSignalLike<Market | undefined>;
}
/**
 * The buyer's authentication status on the **Order status** page:
 *
 * - `'fully_authenticated'`: The buyer has logged in to their customer account.
 * - `'pre_authenticated'`: The buyer accessed the page via a direct link, such as from an order confirmation email, without logging in.
 * @publicDocs
 */
export type AuthenticationState = 'fully_authenticated' | 'pre_authenticated';
/**
 * @publicDocs
 */
export interface OrderStatusApi<Target extends ExtensionTarget> {
    /**
     * The gift cards that were applied to the order. Each gift card includes the last four
     * characters of the code, the amount used for this order, and the remaining balance.
     */
    appliedGiftCards: SubscribableSignalLike<AppliedGiftCard[]>;
    /**
     * The [metafields](/docs/apps/build/custom-data/metafields) requested in the
     * [`shopify.extension.toml`](/docs/apps/build/customer-accounts/metafields#create-the-metafield-definition)
     * file. Metafields are custom data fields that store additional information on Shopify resources
     * such as products, variants, customers, and the shop. These metafields are updated when there's
     * a change in the merchandise items being purchased by the customer.
     *
     * App owned metafields are supported and are returned using the `$app` format. The fully qualified reserved namespace format such as `app--{your-app-id}[--{optional-namespace}]` is not supported. See [app owned metafields](/docs/apps/build/metafields#app-owned-metafields) for more information.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) when accessing metafields attached to `customer`, `company`, or `companyLocation` resources.
     */
    appMetafields: SubscribableSignalLike<AppMetafieldEntry[]>;
    /**
     * The custom key-value pairs attached to the order by the customer or by other extensions
     * during cart or checkout. These are commonly used for delivery instructions, gift messages,
     * or other information the buyer provides. The value is `undefined` if no attributes were set.
     */
    attributes: SubscribableSignalLike<Attribute[] | undefined>;
    /**
     * The buyer who placed the order, including their customer account, email, phone number, and B2B purchasing company. Use this to personalize the **Order status** page or identify B2B orders.
     *
     * Reflects the customer account at the time the order was placed. Doesn't
     * update if account details change afterward.
     */
    buyerIdentity?: OrderStatusBuyerIdentity;
    /**
     * The checkout settings that were active when the buyer placed the order, such as
     * whether order notes and login are enabled.
     *
     * Returns the merchant's checkout configuration at the time of checkout.
     * Doesn't reflect updates made after the order was placed.
     */
    checkoutSettings: SubscribableSignalLike<CheckoutSettings>;
    /**
     * A breakdown of the costs for the order, including the subtotal, shipping, tax, and total amounts.
     */
    cost: CartCost;
    /**
     * A list of discount codes that the buyer entered during checkout and that were applied to the order.
     */
    discountCodes: SubscribableSignalLike<CartDiscountCode[]>;
    /**
     * The cart-level discount allocations applied to the order. A discount allocation represents
     * how a discount is distributed across the order. Each allocation includes the discounted
     * amount and one of the following types:
     *
     * - `CartCodeDiscountAllocation`: A discount the buyer applied by entering a code at checkout.
     * - `CartAutomaticDiscountAllocation`: A discount the merchant configured in Shopify admin to apply automatically.
     * - `CartCustomDiscountAllocation`: A discount created programmatically by a [Shopify Function](/docs/apps/build/functions).
     *
     * Returns order-level discounts only. For per-line discount allocations,
     * read from individual cart lines via the Cart Lines API.
     */
    discountAllocations: SubscribableSignalLike<CartDiscountAllocation[]>;
    /**
     * Metadata about the current extension, including its target, API version, and capabilities.
     */
    extension: Extension<Target>;
    /**
     * The identifier that specifies where in Shopify's UI your code is being injected. This will be one of the targets you have included in your extension's configuration file.
     *
     * @example 'customer-account.order-status.block.render'
     * Learn more about [targets](/docs/api/customer-account-ui-extensions/{API_VERSION}/targets) and [target configuration](/docs/api/customer-account-ui-extensions/{API_VERSION}#configuration).
     *
     * @deprecated Use `extension.target` instead.
     */
    extensionPoint: Target;
    /**
     * A list of line items in the order. Each line includes the merchandise, quantity, cost,
     * custom attributes, and discount allocations.
     */
    lines: SubscribableSignalLike<CartLine[]>;
    /**
     * The buyer's locale, currency, time zone, country, and market context for the order.
     * Use these values to adapt your extension's content to the buyer's region. For formatted
     * dates, numbers, and translated strings, use the [Localization API](/docs/api/customer-account-ui-extensions/{API_VERSION}/target-apis/platform-apis/localization-api)
     * instead.
     */
    localization: OrderStatusLocalization;
    /**
     * A note left by the customer to the merchant, either in their cart or during checkout.
     * The value is `undefined` if no note was provided.
     */
    note: SubscribableSignalLike<string | undefined>;
    /**
     * The order that was placed after checkout completion. Includes the order ID,
     * display name, confirmation number, and timestamps for processing and cancellation.
     * The value is `undefined` if the order hasn't been fully processed yet.
     */
    order: SubscribableSignalLike<Order | undefined>;
    /**
     * The token that identifies the checkout session used to create the order. Use this value
     * to correlate the order with analytics events or backend API calls. This matches the
     * `token` field in the [WebPixel checkout payload](/docs/api/pixels/customer-events#checkout).
     * The value is `undefined` if the checkout token is unavailable.
     */
    checkoutToken: SubscribableSignalLike<CheckoutToken | undefined>;
    /**
     * The shipping address that the buyer provided for the order. This is where physical goods
     * are delivered. The value is `undefined` if the order contains only digital products or
     * if a shipping address wasn't required.
     *
     * Reflects the state at the time the order was placed. Doesn't update if the
     * customer changes their account address afterward.
     */
    shippingAddress?: SubscribableSignalLike<MailingAddress | undefined>;
    /**
     * The billing address associated with the buyer's payment method for the order. The value
     * is `undefined` if the order doesn't have a billing address on file.
     *
     * Reflects the state at the time the order was placed. Doesn't update if the
     * customer changes their account address afterward.
     */
    billingAddress?: SubscribableSignalLike<MailingAddress | undefined>;
    /**
     * The shop where the order was placed. Includes the shop ID, name, primary
     * storefront URL, and myshopify.com domain.
     */
    shop: Shop;
    /**
     * The API version that the extension is using, such as `'2026-01'` or `'unstable'`. This corresponds to the version declared in your extension's configuration.
     *
     * @example 'unstable'
     */
    version: Version;
    /**
     * Triggers a login prompt if the customer is viewing a pre-authenticated **Order status** page.
     * Use this to require full authentication before displaying sensitive information in your extension.
     *
     * Triggers a login prompt for pre-authenticated buyers. Doesn't guarantee
     * the buyer completes the login. Handle the dismissal case in your code.
     */
    requireLogin: () => Promise<void>;
    /**
     * The buyer's current authentication level on the **Order status** page. Use this to determine whether to display sensitive information or prompt the buyer to log in.
     *
     * Read-only. The authentication level can't be changed programmatically.
     */
    authenticationState: SubscribableSignalLike<AuthenticationState>;
}
/**
 * Information about the buyer who placed the order.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data). The `customer` and `purchasingCompany` properties require level 1 access. The `email` and `phone` properties require level 2 access.
 * @publicDocs
 */
export interface OrderStatusBuyerIdentity {
    /**
     * The buyer's customer account, including their ID and whether they have accepted marketing.
     * The value is `undefined` if the buyer is a guest or hasn't logged in yet.
     */
    customer: SubscribableSignalLike<OrderStatusCustomer | undefined>;
    /**
     * The email address associated with the order. This is the email the buyer provided during
     * checkout for order confirmation and communication. The value is `undefined` if the app
     * doesn't have access to customer data.
     */
    email: SubscribableSignalLike<string | undefined>;
    /**
     * The phone number the buyer provided during checkout. The value is `undefined` if no phone
     * number was provided or the app doesn't have access to customer data.
     */
    phone: SubscribableSignalLike<string | undefined>;
    /**
     * The company and company location that a B2B (business-to-business) customer is purchasing
     * on behalf of. Use this to identify the business context of the order. The value is
     * `undefined` if the buyer isn't a B2B customer.
     */
    purchasingCompany: SubscribableSignalLike<OrderStatusPurchasingCompany | undefined>;
}
/**
 * Information about a company that the business customer is purchasing on behalf of.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
 * @publicDocs
 */
export interface OrderStatusPurchasingCompany {
    /**
     * The company that the B2B customer is purchasing on behalf of, including the company ID, name, and optional external ID.
     */
    company: OrderStatusCompany;
    /**
     * The specific company location where the order is being placed, including the location ID, name, and optional external ID.
     */
    location: OrderStatusCompanyLocation;
}
/**
 * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
 * @publicDocs
 */
export interface OrderStatusCompany {
    /**
     * A globally-unique identifier for the company in the format `gid://shopify/Company/<id>`.
     */
    id: string;
    /**
     * The registered business name of the company, as configured by the merchant in Shopify admin.
     */
    name: string;
    /**
     * A merchant-defined external identifier for the company, often used to map to an ID in an external ERP or CRM system. The value is `undefined` if no external ID has been set.
     */
    externalId?: string;
}
/**
 * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
 * @publicDocs
 */
export interface OrderStatusCompanyLocation {
    /**
     * A globally-unique identifier for the company location in the format `gid://shopify/CompanyLocation/<id>`.
     */
    id: string;
    /**
     * The display name of the company location, such as a branch office or warehouse name.
     */
    name: string;
    /**
     * A merchant-defined external identifier for the company location, often used to map to an ID in an external ERP or CRM system. The value is `undefined` if no external ID has been set.
     */
    externalId?: string;
}
/**
 * @publicDocs
 */
export interface AppliedGiftCard {
    /**
     * The last four characters of the applied gift card's code. The full code isn't available for security reasons.
     */
    lastCharacters: string;
    /**
     * The amount of the applied gift card that was used for this order.
     */
    amountUsed: Money;
    /**
     * The remaining balance of the applied gift card after the order was placed.
     *
     * Reflects the remaining amount at the time the order was placed. Doesn't
     * update if the gift card is used for subsequent purchases.
     */
    balance: Money;
}
/**
 * @publicDocs
 */
export interface Shop {
    /**
     * A globally-unique identifier for the shop in the format `gid://shopify/Shop/<id>`.
     *
     * @example 'gid://shopify/Shop/123'
     */
    id: string;
    /**
     * The display name of the shop as configured by the merchant in Shopify admin.
     */
    name: string;
    /**
     * The primary storefront URL for the shop, such as `https://example.myshopify.com`. Use this to build links back to the merchant's online store.
     */
    storefrontUrl?: string;
    /**
     * The shop's unique `.myshopify.com` subdomain, such as `example.myshopify.com`. This domain is permanent and doesn't change even if the merchant adds a custom domain.
     */
    myshopifyDomain: string;
}
/**
 * @publicDocs
 */
export interface CartCost {
    /**
     * The sum of all line item prices before shipping and taxes are applied. Use this value
     * to display the base cost of the items the buyer purchased.
     */
    subtotalAmount: SubscribableSignalLike<Money>;
    /**
     * The total shipping cost for the order, after any shipping discounts have been applied.
     * The value is `undefined` if shipping costs haven't been calculated or aren't applicable
     * (for example, for digital-only orders).
     */
    totalShippingAmount: SubscribableSignalLike<Money | undefined>;
    /**
     * The total tax charged for the order. This may represent taxes added on top of item prices
     * or taxes already included in product and shipping prices, depending on the store's tax
     * configuration. The value is `undefined` if tax information is unavailable.
     */
    totalTaxAmount: SubscribableSignalLike<Money | undefined>;
    /**
     * The final amount the buyer paid for the order, including all line items, shipping, taxes,
     * and discounts. Gift cards and store credits are excluded from this total.
     */
    totalAmount: SubscribableSignalLike<Money>;
}
/**
 * @publicDocs
 */
export interface CartLine {
    /**
     * A unique identifier for the cart line in the format `gid://shopify/CartLine/<id>`. These IDs are not stable and may change after any operations on the line items, so avoid persisting them.
     *
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The product variant or other merchandise associated with this line item. Use this to access product details such as the title, image, SKU, and selected options.
     */
    merchandise: Merchandise;
    /**
     * The number of units of this merchandise that the buyer purchased.
     */
    quantity: number;
    /**
     * The cost breakdown for this line item, including the total price after any line-level discounts have been applied.
     */
    cost: CartLineCost;
    /**
     * Custom key-value pairs attached to this line item, such as engraving text, gift messages, or personalization options set by the buyer or an app during checkout.
     */
    attributes: Attribute[];
    /**
     * The list of discounts applied to this specific line item. Each allocation includes the discounted amount and the type of discount (`code`, `automatic`, or `custom`).
     */
    discountAllocations: CartDiscountAllocation[];
    /**
     * The individual components of a [bundle](/docs/apps/build/product-merchandising/bundles) line item. Each component represents a separate product within the bundle. Returns an empty array if the line item isn't a bundle.
     */
    lineComponents: CartLineComponentType[];
}
type CartLineComponentType = CartBundleLineComponent;
/**
 * @publicDocs
 */
export interface CartBundleLineComponent {
    /**
     * The type of line component. Always `'bundle'` for bundle line components.
     */
    type: 'bundle';
    /**
     * A unique identifier for this component within the bundle, in the format `gid://shopify/CartLineComponent/<id>`. This ID isn't stable and may change after any operation that updates the line items.
     *
     * @example 'gid://shopify/CartLineComponent/123'
     */
    id: string;
    /**
     * The product variant included in this bundle component. Use this to display product details for individual items within a bundle.
     */
    merchandise: Merchandise;
    /**
     * The number of units of this component included in the bundle.
     */
    quantity: number;
    /**
     * The cost breakdown for this bundle component, representing the portion of the bundle price attributed to this item.
     */
    cost: CartLineCost;
    /**
     * Custom key-value pairs attached to this bundle component, such as personalization options specific to this item within the bundle.
     *
     * @example [{key: 'engraving', value: 'hello world'}]
     */
    attributes: Attribute[];
}
/**
 * @publicDocs
 */
export interface CartLineCost {
    /**
     * The total price the buyer pays for this line item after all line-level discounts have been applied, but before order-level discounts, taxes, and shipping.
     */
    totalAmount: Money;
}
/**
 * @publicDocs
 */
export interface Money {
    /**
     * The decimal amount of the price. For example, `29.99` represents twenty-nine dollars and ninety-nine cents.
     */
    amount: number;
    /**
     * The three-letter currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format.
     *
     * @example 'CAD' for Canadian dollar
     */
    currencyCode: CurrencyCode;
}
/**
 * @publicDocs
 */
export type Merchandise = ProductVariant;
/**
 * @publicDocs
 */
export interface BaseMerchandise {
    /**
     * A globally-unique identifier for the merchandise.
     */
    id: string;
}
/**
 * @publicDocs
 */
export interface ProductVariant extends BaseMerchandise {
    /**
     * The type of merchandise. Always `'variant'` for product variants.
     */
    type: 'variant';
    /**
     * A globally-unique identifier for the product variant in the format `gid://shopify/ProductVariant/<id>`.
     *
     * @example 'gid://shopify/ProductVariant/123'
     */
    id: string;
    /**
     * The display title of the product variant, such as "Small" or "Red / Large". This is the variant-specific label, not the parent product title.
     */
    title: string;
    /**
     * The stock keeping unit (SKU) assigned to this variant by the merchant, used for inventory tracking. The value is `undefined` if no SKU has been set.
     */
    sku?: string;
    /**
     * A secondary description for the variant that provides additional context, such as a color or size combination. The value is `undefined` if no subtitle is available.
     */
    subtitle?: string;
    /**
     * The image associated with this product variant. Falls back to the parent product's featured image if the variant doesn't have its own image.
     */
    image?: ImageDetails;
    /**
     * The list of product options that define this variant, such as size and color. Each entry contains the option name and the selected value.
     */
    selectedOptions: SelectedOption[];
    /**
     * The parent product that this variant belongs to. Use this to access the product title, vendor, and type.
     */
    product: Product;
    /**
     * Whether this product variant requires physical shipping. Returns `false` for digital products, gift cards, and services.
     */
    requiresShipping: boolean;
    /**
     * The selling plan associated with this merchandise, such as a subscription or pre-order plan. The value is `undefined` if the item was purchased without a selling plan.
     */
    sellingPlan?: SellingPlan;
}
/**
 * @publicDocs
 */
export interface Product {
    /**
     * A globally-unique identifier for the product in the format `gid://shopify/Product/<id>`.
     */
    id: string;
    /**
     * The name of the product's vendor or manufacturer, as set by the merchant in Shopify admin.
     */
    vendor: string;
    /**
     * A merchant-defined categorization for the product, such as "Accessories" or "Clothing". Commonly used for filtering and organizing products in a storefront.
     */
    productType: string;
}
/**
 * @publicDocs
 */
export interface ImageDetails {
    /**
     * The fully-qualified URL of the image. Use this to render the product or variant image in your extension.
     */
    url: string;
    /**
     * The alternative text description of the image, used for accessibility. The value is `undefined` if the merchant hasn't set alt text for the image.
     */
    altText?: string;
}
/**
 * @publicDocs
 */
export interface SelectedOption {
    /**
     * The name of the product option, such as "Size", "Color", or "Material".
     */
    name: string;
    /**
     * The selected value for this option, such as "Medium", "Blue", or "Cotton".
     */
    value: string;
}
/**
 * A payment option presented to the buyer.
 * @publicDocs
 */
export interface PaymentOption {
    /**
     * The type of the payment option.
     *
     * Shops can be configured to support many different payment options. Some options are only available to buyers in specific regions.
     *
     * | Type  | Description  |
     * |---|---|
     * | `creditCard`  |  A vaulted or manually entered credit card.  |
     * | `deferred`  |  A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment at a later time.  |
     * | `local`  |  A [local payment option](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market  |
     * | `manualPayment`  |  A manual payment option such as an in-person retail transaction.  |
     * | `offsite`  |  A payment processed outside of Shopify's checkout, excluding integrated wallets.  |
     * | `other`  |  Another type of payment not defined here.  |
     * | `paymentOnDelivery`  |  A payment that will be collected on delivery.  |
     * | `redeemable`  |  A redeemable payment option such as a gift card or store credit.  |
     * | `wallet`  |  An integrated wallet such as PayPal, Google Pay, Apple Pay, etc.  |
     * | `customOnsite` | A custom payment option that's processed through a checkout extension with a payments app. |
     */
    type: 'creditCard' | 'deferred' | 'local' | 'manualPayment' | 'offsite' | 'other' | 'paymentOnDelivery' | 'redeemable' | 'wallet' | 'customOnsite';
    /**
     * A session-scoped identifier for this payment option. This handle isn't globally unique — it is specific to the current checkout session or the shop.
     */
    handle: string;
}
/**
 * A payment option selected by the buyer.
 * @publicDocs
 */
export interface SelectedPaymentOption {
    /**
     * The handle of the payment option the buyer selected, corresponding to a `PaymentOption.handle` value.
     *
     * See [availablePaymentOptions](/docs/api/customer-account-ui-extensions/{API_VERSION}/target-apis/order-apis/payments-api).
     */
    handle: string;
}
/**
 * @publicDocs
 */
export interface CartDiscountCode {
    /**
     * The discount code string that the buyer entered during checkout, such as "SAVE10" or "FREESHIP". Use this to display which discount codes were applied to the order.
     */
    code: string;
}
/**
 * A discount allocation represents a single discount applied to a specific line item or the overall order.
 * When a discount applies to an order, Shopify splits the total discount amount across the affected line items
 * as individual allocations. For example, a "10% off your order" discount is distributed proportionally across
 * each line item rather than appearing as one lump sum.
 *
 * There are three types of discount allocations:
 * - `CartCodeDiscountAllocation`: A discount applied using a code the buyer entered at checkout (for example, "SAVE10").
 * - `CartAutomaticDiscountAllocation`: A discount the merchant configured in Shopify admin to apply automatically without a code.
 * - `CartCustomDiscountAllocation`: A discount created programmatically by a [Shopify Function](/docs/apps/build/functions).
 * @publicDocs
 */
export type CartDiscountAllocation = CartCodeDiscountAllocation | CartAutomaticDiscountAllocation | CartCustomDiscountAllocation;
/**
 * The base properties shared by all discount allocation types.
 * @publicDocs
 */
export interface CartDiscountAllocationBase {
    /**
     * The monetary value that was deducted from the line item or order total by this discount allocation.
     */
    discountedAmount: Money;
}
/**
 * A discount allocation for a discount that was applied using a code the buyer entered at checkout.
 * @publicDocs
 */
export interface CartCodeDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The discount code string that the buyer entered during checkout, such as "SAVE10" or "FREESHIP".
     */
    code: string;
    /**
     * The type of this discount allocation. Always `'code'` for discounts applied using a code entered by the buyer.
     */
    type: 'code';
}
/**
 * A discount allocation for a discount that the merchant configured to apply automatically in Shopify admin, without the buyer needing to enter a code.
 * @publicDocs
 */
export interface CartAutomaticDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The merchant-defined title of the automatic discount as displayed to the buyer, such as "Summer Sale 10% Off".
     */
    title: string;
    /**
     * The type of this discount allocation. Always `'automatic'` for discounts configured to apply automatically without a code.
     */
    type: 'automatic';
}
/**
 * A discount allocation for a discount created by a [Shopify Function](/docs/apps/build/functions), such as a custom discount logic app.
 * @publicDocs
 */
export interface CartCustomDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The title of the custom discount as defined by the Shopify Function that created it.
     */
    title: string;
    /**
     * The type of this discount allocation. Always `'custom'` for discounts created by a Shopify Function.
     */
    type: 'custom';
}
/**
 * Information about a customer who has previously purchased from this shop.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data). The `id`, `image`, `acceptsMarketing`, and `storeCreditAccounts` properties require level 1 access. The `email`, `phone`, `fullName`, `firstName`, and `lastName` properties require level 2 access.
 * @publicDocs
 */
export interface OrderStatusCustomer {
    /**
     * A globally-unique identifier for the customer in the format `gid://shopify/Customer/<id>`. 'gid://shopify/Customer/123'
     */
    id: string;
    /**
     * The email address associated with the customer's account. The value is `undefined` if the app doesn't have the required access level.
     */
    email?: string;
    /**
     * The phone number associated with the customer's account. The value is `undefined` if no phone number is on file or the app doesn't have the required access level.
     */
    phone?: string;
    /**
     * The customer's full name, typically a combination of first and last name. The value is `undefined` if the app doesn't have the required access level.
     */
    fullName?: string;
    /**
     * The customer's first name. The value is `undefined` if the app doesn't have the required access level.
     */
    firstName?: string;
    /**
     * The customer's last name. The value is `undefined` if the app doesn't have the required access level.
     */
    lastName?: string;
    /**
     * The customer's profile image, such as a Gravatar avatar. Use this to personalize the extension UI for the logged-in buyer.
     */
    image: ImageDetails;
    /**
     * Whether the customer has opted in to receiving marketing communications from the merchant, such as email campaigns and promotional offers.
     */
    acceptsMarketing: boolean;
    /**
     * The store credit accounts owned by this customer that can be used as payment during checkout. Each account has a balance representing available store credit.
     *
     * @private
     */
    storeCreditAccounts: StoreCreditAccount[];
}
/**
 * A string token that uniquely identifies the checkout session used to create the order.
 * @publicDocs
 */
export type CheckoutToken = string;
/**
 * Settings describing the behavior of the buyer's checkout.
 * @publicDocs
 */
export interface CheckoutSettings {
    /**
     * The type of order created when checkout is completed:
     *
     * - `'DRAFT_ORDER'`: A draft order that must be manually reviewed and finalized by the merchant before it is processed.
     * - `'ORDER'`: A standard order that's immediately processed and visible in Shopify admin.
     */
    orderSubmission: 'DRAFT_ORDER' | 'ORDER';
    /**
     * The payment terms configured by the merchant for B2B orders, such as net-30 or net-60. The value is `undefined` if no payment terms are configured.
     */
    paymentTermsTemplate?: PaymentTermsTemplate;
    /**
     * Settings that control how the shipping address behaves during checkout, such as whether the buyer can edit the address.
     */
    shippingAddress: ShippingAddressSettings;
}
/**
 * Settings describing the behavior of the shipping address.
 * @publicDocs
 */
export interface ShippingAddressSettings {
    /**
     * Whether the buyer is allowed to edit the shipping address during checkout. When `false`, the shipping address is locked and can't be changed, which is common for B2B orders with a predefined ship-to address.
     */
    isEditable: boolean;
}
/**
 * A payment terms template configured by the merchant, defining when payment is due for B2B orders. Common examples include "Net 30" (due in 30 days) or "Due on receipt".
 * @publicDocs
 */
export interface PaymentTermsTemplate {
    /**
     * A globally-unique identifier for the payment terms template in the format `gid://shopify/PaymentTermsTemplate/<id>`.
     * @example 'gid://shopify/PaymentTermsTemplate/1'
     */
    id: string;
    /**
     * The name of the payment terms translated to the buyer's current language, such as "Net 30" or "Due on receipt". See [localization.language](/docs/api/customer-account-ui-extensions/{API_VERSION}/apis/localization#properties-propertydetail-localization).
     */
    name: string;
    /**
     * The due date for payment in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (`YYYY-MM-DDTHH:mm:ss.sssZ`). The value is `undefined` if the payment terms don't have a fixed due date.
     */
    dueDate?: string;
    /**
     * The number of days the buyer has to pay after the order is placed, such as `30` for "Net 30" terms. The value is `undefined` if the payment terms are not net-based.
     */
    dueInDays?: number;
}
/**
 * A store credit account owned by the customer. Store credit is a form of payment that merchants can issue to customers for returns, refunds, or promotional purposes.
 * @publicDocs
 */
export interface StoreCreditAccount {
    /**
     * A globally-unique identifier for the store credit account in the format `gid://shopify/StoreCreditAccount/<id>`.
     * @example 'gid://shopify/StoreCreditAccount/1'
     */
    id: string;
    /**
     * The remaining balance available in this store credit account. This reflects the amount that can still be applied toward purchases.
     */
    balance: Money;
}
/**
 * A group of cart lines that share the same set of delivery options. For example, physical items may form one delivery group while digital items form another.
 * @publicDocs
 */
export interface DeliveryGroup {
    /**
     * The cart lines included in this delivery group. Each reference contains the ID of the associated cart line.
     */
    targetedCartLines: CartLineReference[];
    /**
     * The list of delivery options the buyer can choose from for this group, such as standard shipping, express shipping, or local pickup.
     */
    deliveryOptions: DeliveryOption[];
    /**
     * The delivery option that the buyer selected for this group. The value is `undefined` if no option has been selected yet.
     */
    selectedDeliveryOption?: DeliveryOptionReference;
    /**
     * The purchase type for this delivery group. `'oneTimePurchase'` for standard orders, or `'subscription'` for items on a recurring delivery schedule.
     */
    groupType: DeliveryGroupType;
    /**
     * Whether physical delivery is required for the items in this group. Returns `false` for digital products, services, or other items that don't need shipping.
     */
    isDeliveryRequired: boolean;
}
/**
 * The purchase type for a delivery group: `'oneTimePurchase'` for standard orders or `'subscription'` for recurring deliveries.
 * @publicDocs
 */
export type DeliveryGroupType = 'oneTimePurchase' | 'subscription';
/**
 * A reference to a cart line within a delivery group, identified by the cart line's ID.
 * @publicDocs
 */
export interface CartLineReference {
    /**
     * The ID of the cart line that belongs to this delivery group, matching a `CartLine.id` value.
     */
    id: string;
}
/**
 * A reference to the delivery option selected by the buyer for a delivery group.
 * @publicDocs
 */
export interface DeliveryOptionReference {
    /**
     * The handle of the selected delivery option, matching a `DeliveryOption.handle` value.
     */
    handle: string;
}
/**
 * The base properties shared by all delivery option types, including shipping, local pickup, and pickup point options.
 * @publicDocs
 */
export interface DeliveryOption {
    /**
     * A unique identifier for this delivery option within the checkout session. Use this handle to match against `DeliveryOptionReference.handle`.
     */
    handle: string;
    /**
     * The display name of the delivery option shown to the buyer, such as "Standard Shipping" or "Express Delivery". The value is `undefined` if no title is set.
     */
    title?: string;
    /**
     * Additional details about the delivery option, such as estimated delivery time or service level. The value is `undefined` if no description is set.
     */
    description?: string;
}
/**
 * A delivery option where items are shipped to the buyer's address, either via a carrier (`'shipping'`) or through a local delivery service (`'local'`).
 * @publicDocs
 */
export interface ShippingOption extends DeliveryOption {
    /**
     * The delivery method. `'shipping'` for carrier-based delivery to the buyer's address, or `'local'` for same-day or local courier delivery.
     */
    type: 'shipping' | 'local';
    /**
     * The shipping carrier responsible for delivering the items, such as USPS, FedEx, or a custom carrier.
     */
    carrier: ShippingOptionCarrier;
    /**
     * The original shipping cost before any discounts are applied.
     */
    cost: Money;
    /**
     * The final shipping cost after any shipping discounts have been applied. Compare with `cost` to determine the discount amount.
     */
    costAfterDiscounts: Money;
    /**
     * The estimated delivery timeline, including the expected time in transit.
     */
    deliveryEstimate: DeliveryEstimate;
}
/**
 * @publicDocs
 */
export interface DeliveryEstimate {
    /**
     * The estimated transit time for the delivery, expressed as a range in seconds. For example, a range of `259200` to `432000` represents 3 to 5 days.
     */
    timeInTransit?: NumberRange;
}
/**
 * @publicDocs
 */
export interface ShippingOptionCarrier {
    /**
     * The display name of the shipping carrier, such as "USPS", "FedEx", or "Canada Post". The value is `undefined` if the carrier name is unavailable.
     */
    name?: string;
}
/**
 * @publicDocs
 */
export interface PickupPointOption extends DeliveryOption {
    /**
     * The delivery method. Always `'pickupPoint'` for pickup point options.
     */
    type: 'pickupPoint';
    /**
     * The carrier responsible for shipping items to the pickup point location.
     */
    carrier: PickupPointCarrier;
    /**
     * The original cost to ship items to this pickup point before any discounts.
     */
    cost: Money;
    /**
     * The final cost to ship to this pickup point after discounts have been applied.
     */
    costAfterDiscounts: Money;
    /**
     * The physical location of the pickup point, including its name, address, and unique handle.
     */
    location: PickupPointLocation;
}
/**
 * @publicDocs
 */
export interface PickupLocationOption extends DeliveryOption {
    /**
     * The delivery method. Always `'pickup'` for merchant pickup location options.
     */
    type: 'pickup';
    /**
     * The physical location where the buyer can pick up their order, including the store name and address.
     */
    location: PickupLocation;
}
/**
 * @publicDocs
 */
export interface PickupLocation {
    /**
     * The display name of the pickup location, such as the store or warehouse name. The value is `undefined` if no name is set.
     */
    name?: string;
    /**
     * The physical mailing address of the pickup location where the buyer collects their order.
     */
    address: MailingAddress;
}
/**
 * @publicDocs
 */
export interface PickupPointLocation {
    /**
     * The display name of the pickup point, such as a locker location or partner store name. The value is `undefined` if no name is set.
     */
    name?: string;
    /**
     * A unique identifier for this pickup point within the carrier's network.
     */
    handle: string;
    /**
     * The physical mailing address of the pickup point.
     */
    address: MailingAddress;
}
/**
 * @publicDocs
 */
export interface PickupPointCarrier {
    /**
     * A code that uniquely identifies the carrier within Shopify's system, such as a SCAC code. The value is `undefined` if no code is available.
     */
    code?: string;
    /**
     * The display name of the carrier that operates this pickup point network. The value is `undefined` if the carrier name is unavailable.
     */
    name?: string;
}
/**
 * @publicDocs
 */
export interface NumberRange {
    /**
     * The minimum value of the range. The value is `undefined` if there's no lower bound.
     */
    lower?: number;
    /**
     * The maximum value of the range. The value is `undefined` if there's no upper bound.
     */
    upper?: number;
}
/**
 * Information about an order that was placed.
 * @publicDocs
 */
export interface Order {
    /**
     * A globally-unique identifier for the order in the format `gid://shopify/Order/<id>`. Use this to reference the order in the [GraphQL Admin API](/docs/api/admin-graphql).
     *
     * @example 'gid://shopify/Order/1'
     */
    id: string;
    /**
     * The merchant-facing order number prefixed with `#`, such as `#1001`. This is the human-readable identifier displayed to both the merchant in Shopify admin and the buyer on the **Order status** page and in email confirmations.
     *
     * @example '#1000'
     */
    name: string;
    /**
     * The date and time when the order was cancelled, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. The value is `undefined` if the order hasn't been cancelled. Use this to conditionally display cancellation details to the buyer.
     */
    cancelledAt?: string;
    /**
     * A randomly generated alphanumeric identifier for the order that the buyer can use when contacting the merchant about their purchase. This is always present for orders created in 2024 and onwards. For older orders, this value may be `undefined`.
     */
    confirmationNumber?: string;
    /**
     * The date and time when the order was processed, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. An order is processed after the buyer completes checkout and the payment is captured, at which point the order becomes visible in Shopify admin.
     */
    processedAt?: string;
}
export {};
//# sourceMappingURL=order-status.d.ts.map