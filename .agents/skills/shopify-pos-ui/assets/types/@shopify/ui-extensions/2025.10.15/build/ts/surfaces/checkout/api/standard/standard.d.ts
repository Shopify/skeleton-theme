import type { ValidationError, SellingPlan, Attribute, MailingAddress, ShippingAddress } from '../shared';
import type { ExtensionTarget } from '../../extension-targets';
import type { ApiVersion, Capability, CurrencyCode, Country, CountryCode, Timezone, GraphQLError, StorefrontApiVersion, LocalizedFieldKey } from '../../../../shared';
import type { SubscribableSignalLike } from '../../shared';
export type { ApiVersion, Capability } from '../../../../shared';
/**
 * Key-value storage for a specific extension. Use storage to save
 * preferences or cached data that should survive page reloads without
 * requiring a backend call. Stored data is only available to this
 * specific extension. The storage backend is implemented with
 * `localStorage` and data persistence isn't guaranteed.
 */
export interface Storage {
    /**
     * Read and return a stored value by key.
     *
     * The stored data is deserialized from JSON and returned as
     * its original type.
     *
     * Returns the stored value for the given key, or `null` when no value
     * exists. Doesn't throw on a missing key.
     */
    read<T = unknown>(key: string): Promise<T | null>;
    /**
     * Write stored data for this key.
     *
     * The data must be serializable to JSON.
     */
    write(key: string, data: any): Promise<void>;
    /**
     * Deletes a previously stored value by key.
     */
    delete(key: string): Promise<void>;
}
/**
 * Metadata about the running extension, including its API version, target,
 * capabilities, and editor context. Use this to read configuration details or
 * conditionally render content based on where the extension is running.
 */
export interface Extension<Target extends ExtensionTarget = ExtensionTarget> {
    /**
     * The API version that was set in the extension config file.
     *
     * @example '2024-10', '2025-01', '2025-04', '2025-07', '2025-10'
     */
    apiVersion: ApiVersion;
    /**
     * The allowed capabilities of the extension, defined in your
     * [`shopify.extension.toml`](/docs/api/checkout-ui-extensions/{API_VERSION}/configuration) file.
     */
    capabilities: SubscribableSignalLike<Capability[]>;
    /**
     * Information about the editor where the extension is being rendered.
     *
     * If the value is undefined, then the extension isn't running in an editor.
     */
    editor?: Editor;
    /**
     * A Boolean to show whether your extension is currently rendered to the screen.
     *
     * Shopify might render your extension before it's visible in the UI,
     * typically to pre-render extensions that appear on a later step of the
     * checkout.
     *
     * Your extension might also continue to run after the customer has navigated away
     * from where it was rendered. The extension continues running so that
     * your extension is immediately available to render if the customer navigates back.
     */
    rendered: SubscribableSignalLike<boolean>;
    /**
     * The URL to the script that started the extension target.
     */
    scriptUrl: string;
    /**
     * The identifier that specifies where in Shopify's UI your code is being
     * injected. This is one of the targets you've included in your
     * extension's configuration file.
     *
     * @example 'purchase.checkout.block.render'
     * @see https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/extension-targets-overview
     * @see https://shopify.dev/docs/apps/app-extensions/configuration#targets
     */
    target: Target;
    /**
     * The published version of the running extension target.
     *
     * For unpublished extensions, the value is `undefined`.
     *
     * Don't use this property as a stable identifier in development environments.
     * It becomes available only after the extension is published.
     *
     * @example 3.0.10
     */
    version?: string;
}
/**
 * Information about the editor environment when an extension is rendered
 * inside the checkout editor. The value is `undefined` when the extension
 * is not rendering in an editor.
 */
export interface Editor {
    /**
     * Indicates whether the extension is rendering in the [checkout editor](https://shopify.dev/docs/apps/checkout). Always `'checkout'`.
     */
    type: 'checkout';
}
/**
 * Metadata associated with the checkout. See the [metafields documentation](https://shopify.dev/docs/apps/build/custom-data/metafields) for more information on how metafields work.
 */
export interface Metafield {
    /**
     * The name of the metafield.
     *
     * @example 'delivery_instructions'
     */
    key: string;
    /**
     * A container for a set of metafields. You need to define a custom
     * namespace for your metafields to distinguish them from the metafields
     * used by other apps.
     *
     * @example 'my_app'
     */
    namespace: string;
    /**
     * The information to be stored as metadata.
     */
    value: string | number;
    /**
     * The metafield's information type.
     *
     * - `'integer'`: A whole number value.
     * - `'string'`: A plain text value.
     * - `'json_string'`: A JSON-encoded string value.
     */
    valueType: 'integer' | 'string' | 'json_string';
}
/**
 * Represents a custom [metafield](https://shopify.dev/docs/apps/build/custom-data/metafields) attached to a resource such as a product, variant, customer, or shop.
 */
export interface AppMetafield {
    /**
     * The identifier for the metafield within its namespace, such as `'ingredients'` or `'shipping_weight'`.
     */
    key: string;
    /**
     * The namespace that the metafield belongs to. Namespaces group related metafields and prevent naming collisions between different apps.
     *
     * App owned metafield namespaces are returned using the `$app` format. See [app owned metafields](https://shopify.dev/docs/apps/build/custom-data/ownership#reserved-prefixes) for more information.
     */
    namespace: string;
    /**
     * The value of a metafield, stored as a string regardless of the underlying type. For JSON metafields, parse the string to access structured data.
     */
    value: string;
    /**
     * The metafield's information type.
     *
     * - `'boolean'`: A true or false value.
     * - `'float'`: A decimal number value.
     * - `'integer'`: A whole number value.
     * - `'json_string'`: A JSON-encoded string value.
     * - `'string'`: A plain text value.
     */
    valueType: 'boolean' | 'float' | 'integer' | 'json_string' | 'string';
    /**
     * The metafield's [type name](https://shopify.dev/docs/apps/build/custom-data/metafields/list-of-data-types), such as `'single_line_text_field'` or `'json'`. This is the full type identifier, whereas `valueType` is a simplified category.
     */
    type: string;
}
/**
 * Represents a custom metadata attached to the cart. Unlike `AppMetafield`, cart metafield values are always strings and don't include a `valueType` discriminator.
 *
 * Cart [metafields](https://shopify.dev/docs/apps/build/custom-data/metafields) are set by extensions using `applyMetafieldChange()` and can be copied to order metafields at order creation time.
 */
export interface CartMetafield {
    /**
     * The key name of a metafield, such as `'delivery_instructions'` or `'gift_message'`. Together with `namespace`, this uniquely identifies the metafield on the cart.
     */
    key: string;
    /**
     * The namespace for a metafield, such as `'custom'` or `'my_app'`. Together with `key`, this uniquely identifies the metafield on the cart.
     */
    namespace: string;
    /**
     * The string value stored in the cart metafield. Unlike `AppMetafield`, cart metafield values are always strings.
     */
    value: string;
    /**
     * The metafield's [type name](https://shopify.dev/docs/apps/build/custom-data/metafields/list-of-data-types), such as `'single_line_text_field'` or `'json'`.
     */
    type: string;
}
/**
 * The Shopify resource that a metafield is attached to. Each entry identifies a specific resource by its type and globally-unique ID, so you can trace where the data comes from.
 */
export interface AppMetafieldEntryTarget {
    /**
     * The kind of Shopify resource this metafield belongs to:
     *
     * - `'customer'`: The customer who placed the order.
     * - `'product'`: A product in the merchant's catalog.
     * - `'shop'`: The merchant's shop.
     * - `'shopUser'`: A staff member or collaborator account on the shop.
     * - `'variant'`: A specific variant of a product.
     * - `'company'`: A [B2B](https://shopify.dev/docs/apps/build/b2b) company associated with the order.
     * - `'companyLocation'`: A location belonging to a [B2B](https://shopify.dev/docs/apps/build/b2b) company.
     * - `'cart'`: The cart associated with the checkout.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company` or `companyLocation`.
     */
    type: 'customer' | 'product' | 'shop' | 'shopUser' | 'variant' | 'company' | 'companyLocation' | 'cart';
    /**
     * The globally-unique identifier of the Shopify resource, in [GID](https://shopify.dev/docs/api/usage/gids) format. Use this value to match the metafield to a specific resource in your extension or when querying the [Storefront API](https://shopify.dev/docs/api/storefront).
     *
     * @example 'gid://shopify/Product/123'
     */
    id: string;
}
/**
 * An entry that pairs a Shopify resource with one of its [metafields](https://shopify.dev/docs/apps/build/custom-data/metafields). Each entry contains a `target` identifying which resource the metafield belongs to and a `metafield` object with the actual data.
 */
export interface AppMetafieldEntry {
    /**
     * The Shopify resource that this metafield is attached to, including the resource type (such as `'product'` or `'customer'`) and its globally-unique ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company` or `companyLocation`.
     */
    target: AppMetafieldEntryTarget;
    /**
     * The metafield data, including the namespace, key, value, and content type. Use the `namespace` and `key` together to uniquely identify the metafield within its resource.
     */
    metafield: AppMetafield;
}
export type Version = string;
export type CheckoutToken = string;
/**
 * Translates a key from your extension's locale files into a localized string.
 * Supports interpolation with placeholder replacements and pluralization
 * via the special `count` option.
 */
export interface I18nTranslate {
    <ReplacementType = string>(key: string, options?: Record<string, ReplacementType | string | number>): ReplacementType extends string | number ? string : (string | ReplacementType)[];
}
/**
 * Utilities for translating strings, formatting currencies, numbers,
 * and dates according to the buyer's locale. Use the I18n API alongside
 * the Localization API to build fully localized extensions.
 */
export interface I18n {
    /**
     * Returns a localized number.
     *
     * This function behaves like the standard `Intl.NumberFormat()`
     * with a style of `decimal` applied. It uses the buyer's locale by default.
     *
     * @param options.inExtensionLocale - If true, uses the extension's locale.
     */
    formatNumber: (number: number | bigint, options?: {
        inExtensionLocale?: boolean;
    } & Intl.NumberFormatOptions) => string;
    /**
     * Returns a localized currency value.
     *
     * This function behaves like the standard `Intl.NumberFormat()`
     * with a style of `currency` applied. It uses the buyer's locale by default.
     *
     * @param options.inExtensionLocale - If true, uses the extension's locale.
     */
    formatCurrency: (number: number | bigint, options?: {
        inExtensionLocale?: boolean;
    } & Intl.NumberFormatOptions) => string;
    /**
     * Returns a localized date value.
     *
     * This function behaves like the standard [`Intl.DateTimeFormat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) and uses
     * the buyer's locale by default. Formatting [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options) can be passed in as
     * options.
     *
     * @param options.inExtensionLocale - If true, uses the extension's locale.
     */
    formatDate: (date: Date, options?: {
        inExtensionLocale?: boolean;
    } & Intl.DateTimeFormatOptions) => string;
    /**
     * Returns translated content in the buyer's locale,
     * as supported by the extension.
     *
     * - `options.count` is a special numeric value used in pluralization.
     * - The other option keys and values are treated as replacements for interpolation.
     * - If the replacements are all primitives, then `translate()` returns a single string.
     * - If replacements contain UI components, then `translate()` returns an array of elements.
     */
    translate: I18nTranslate;
}
export interface Language {
    /**
     * The [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language tag that identifies the language. This is a standardized code that might include a base language and an optional region subtag separated by a dash. For example, `'en'` represents English and `'en-US'` represents English as used in the United States. The region subtag follows the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) standard.
     */
    isoCode: string;
}
export interface Currency {
    /**
     * The three-letter currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format, such as `'USD'`, `'EUR'`, or `'CAD'`.
     */
    isoCode: CurrencyCode;
}
/**
 * A [Shopify Market](https://shopify.dev/docs/apps/build/markets) that represents a group of one or more regions for international selling.
 */
export interface Market {
    /**
     * A globally-unique identifier for the market in the format `gid://shopify/Market/<id>`.
     */
    id: string;
    /**
     * The human-readable, shop-scoped identifier for the market, such as `'us'` or `'eu'`. Merchants define these handles when configuring [Shopify Markets](https://shopify.dev/docs/apps/build/markets).
     */
    handle: string;
}
/**
 * The buyer's language, country, currency, and timezone context. Use this
 * to adapt your extension to the buyer's region and display localized content.
 */
export interface Localization {
    /**
     * The currency that the buyer sees for money amounts in the checkout. Use this value to format prices and totals in the buyer's expected currency.
     */
    currency: SubscribableSignalLike<Currency>;
    /**
     * The buyer's time zone, based on their browser or account settings. Use this value to format dates and times relative to the buyer's local time.
     */
    timezone: SubscribableSignalLike<Timezone>;
    /**
     * The language the buyer sees in the checkout. This reflects the language selected by the buyer or determined by their browser settings, and might differ from the languages your extension supports.
     */
    language: SubscribableSignalLike<Language>;
    /**
     * The best available language match for your extension based on the buyer's language. If the buyer's language is `'fr-CA'` but your extension supports only `'fr'`, this returns `'fr'`. If your extension doesn't support any variant of the buyer's language, this falls back to your extension's default locale (the `.default.json` translation file). Use this value to load the correct translation file for your extension.
     */
    extensionLanguage: SubscribableSignalLike<Language>;
    /**
     * The country context of the checkout, carried over from the cart. It updates when the buyer changes their shipping address country. Use this value to display region-specific content such as local support information or regional policies. The value is `undefined` if the buyer's country is unknown.
     *
     * Derived from the buyer's shipping address. Returns `undefined` until the
     * buyer enters a shipping address.
     */
    country: SubscribableSignalLike<Country | undefined>;
    /**
     * The [market](/docs/apps/build/markets) context of the checkout,
     * carried over from the cart context. Markets group countries and
     * regions with shared pricing, languages, and domains. The market
     * context updates when the buyer changes the country of their
     * shipping address. The value is `undefined` if the market is unknown.
     *
     * @deprecated Merchants now manage which extensions load for each
     * market, so extensions no longer need to check this value.
     */
    market: SubscribableSignalLike<Market | undefined>;
}
export interface LocalizedField {
    /**
     * The identifier for the localized field, indicating the type of information
     * collected (for example, a tax credential or shipping credential for a
     * specific country).
     */
    key: LocalizedFieldKey;
    /**
     * The localized display label for the field, suitable for rendering in the UI.
     *
     * @example 'CPF/CNPJ' for a Brazilian tax credential
     */
    title: string;
    /**
     * The current value entered by the buyer for this field.
     */
    value: string;
}
/**
 * Provides details on the buyer's progression through the checkout.
 */
export interface BuyerJourney {
    /**
     * Installs a function for intercepting and preventing progress on checkout.
     *
     * This returns a promise that resolves to a teardown function. Calling the
     * teardown function removes the interceptor.
     *
     * To block checkout progress, you must set the [block_progress](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/configuration#block-progress)
     * capability in your extension's configuration.
     *
     * If you do, then you're expected to inform the buyer why navigation was blocked,
     * either by passing validation errors to the checkout UI or rendering the errors in your extension.
     *
     * If the merchant hasn't allowed your extension to block checkout progress, show a warning in the [checkout editor](https://shopify.dev/docs/apps/build/checkout/test-checkout-ui-extensions#test-the-extension-in-the-checkout-editor).
     */
    intercept(interceptor: Interceptor): Promise<() => void>;
    /**
     * Whether the buyer has completed submitting their order. When `true`, the buyer is on the order status page after submitting payment. When `false`, the buyer is still in the checkout flow.
     */
    completed: SubscribableSignalLike<boolean>;
    /**
     * All possible steps the buyer can take to complete checkout. These steps vary depending on whether the checkout is one-page or three-page, and on the shop's configuration.
     */
    steps: SubscribableSignalLike<BuyerJourneyStep[]>;
    /**
     * The step of checkout the buyer is currently on. The value is `undefined` if the current step can't be determined.
     */
    activeStep: SubscribableSignalLike<BuyerJourneyStepReference | undefined>;
}
/**
 * | handle  | Description  |
 * |---|---|
 * | `cart`  |  The cart page.  |
 * | `checkout`  |  A one-page checkout, including Shop Pay.  |
 * | `information`  |  The contact information step of a three-page checkout.  |
 * | `shipping`  |  The shipping step of a three-page checkout.  |
 * | `payment`  |  The payment step of a three-page checkout.  |
 * | `review`  |  The step after payment where the buyer confirms the purchase. Not all shops are configured to have a review step.  |
 * | `thank-you`  |  The page displayed after the purchase, thanking the buyer.  |
 * | `unknown` |  An unknown step in the buyer journey.  |
 */
type BuyerJourneyStepHandle = 'cart' | 'checkout' | 'information' | 'shipping' | 'payment' | 'review' | 'thank-you' | 'unknown';
/**
 * What step of checkout the buyer is currently on.
 */
interface BuyerJourneyStepReference {
    /**
     * The handle identifying which step the buyer is on, such as `'information'`,
     * `'shipping'`, or `'payment'`. See `BuyerJourneyStepHandle` for all values.
     */
    handle: BuyerJourneyStepHandle;
}
export interface BuyerJourneyStep {
    /**
     * The handle that uniquely identifies the buyer journey step, such as `'information'`, `'shipping'`, or `'payment'`.
     */
    handle: BuyerJourneyStepHandle;
    /**
     * The localized label of the buyer journey step, suitable for rendering in navigation UI.
     */
    label: string;
    /**
     * The URL of the buyer journey step, using the `shopify:` protocol.
     *
     * @example 'shopify:cart'
     * @example 'shopify:checkout/information'
     */
    to: string;
    /**
     * Whether this step is disabled. When `true`, the buyer hasn't reached this step yet and can't navigate to it. When `false`, the step is accessible.
     *
     * For example, if the buyer hasn't reached the `shipping` step yet, then `shipping` is disabled.
     */
    disabled: boolean;
}
/** @publicDocs */
export interface StandardApi<Target extends ExtensionTarget = ExtensionTarget> {
    /**
     * Tracks custom events and sends visitor information to
     * [Web Pixels](https://shopify.dev/docs/apps/marketing). Use `publish()` to emit events
     * and `visitor()` to submit buyer contact details.
     */
    analytics: Analytics;
    /**
     * The gift cards that have been applied to the checkout. Each entry includes
     * the last four characters of the gift card code, the amount used at
     * checkout, and the card's remaining balance.
     */
    appliedGiftCards: SubscribableSignalLike<AppliedGiftCard[]>;
    /**
     * The cart instructions used to create the checkout and possibly limit extension capabilities.
     *
     * These instructions should be checked before performing any actions that might be affected by them.
     *
     * For example, if you intend to add a discount code via the `applyDiscountCodeChange` method,
     * check `discounts.canUpdateDiscountCodes` to ensure it's supported in this checkout.
     *
     * > Caution: Check cart instructions before calling select APIs, as
     * > some may not be available. See the
     * > [Cart Instructions API](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#examples)
     * > for more information.
     *
     */
    instructions: SubscribableSignalLike<CartInstructions>;
    /**
     * The metafields requested in the
     * [`shopify.extension.toml`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/configuration)
     * file. These metafields are updated when there's a change in the merchandise items
     * being purchased by the customer.
     *
     * App owned metafields are supported and are returned using the `$app` format. The fully qualified reserved namespace format such as `app--{your-app-id}[--{optional-namespace}]` isn't supported. See [app owned metafields](https://shopify.dev/docs/apps/build/custom-data/ownership#reserved-prefixes) for more information.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    appMetafields: SubscribableSignalLike<AppMetafieldEntry[]>;
    /**
     * The custom key-value attributes attached to the cart or checkout. These are set by the buyer or by an extension using `applyAttributeChange()`. The list is empty if no attributes have been added.
     */
    attributes: SubscribableSignalLike<Attribute[]>;
    /**
     * All payment options available to the buyer for this checkout, such as
     * credit cards, wallets, and local payment methods. The list depends on
     * the shop's payment configuration and the buyer's region.
     *
     * The set of payment options can change when the buyer updates their
     * address or cart, so subscribe to changes rather than reading once
     * during initialization. Each option exposes `handle` and `type` only.
     * Provider names, logos, fees, and installment terms aren't available.
     */
    availablePaymentOptions: SubscribableSignalLike<PaymentOption[]>;
    /**
     * Information about the buyer that's interacting with the checkout. The property is available only if the extension has access to protected customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    buyerIdentity?: BuyerIdentity;
    /**
     * Provides details on the buyer's progression through the checkout and lets you intercept navigation to validate data before the buyer continues.
     *
     * Refer to [buyer journey](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/buyer-journey#examples)
     * examples for more information.
     */
    buyerJourney: BuyerJourney;
    /**
     * Settings applied to the buyer's checkout.
     */
    checkoutSettings: SubscribableSignalLike<CheckoutSettings>;
    /**
     * A stable ID that represents the current checkout.
     *
     * The value is `undefined` when the checkout hasn't been created on the server yet.
     *
     * Use this to correlate checkout sessions across your extension, web pixels, and backend systems.
     *
     * This matches the `data.checkout.token` field in a [checkout-related WebPixel event](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started#properties-propertydetail-data)
     * and the `checkout_token` field in the [REST Admin API `Order` resource](https://shopify.dev/docs/api/admin-rest/unstable/resources/order#resource-object).
     *
     * Can be `undefined`. Handle the `undefined` state before using the value.
     */
    checkoutToken: SubscribableSignalLike<CheckoutToken | undefined>;
    /**
     * The cost breakdown for the current checkout, including subtotal, shipping, tax, and total amounts. These values update as the buyer progresses through checkout and costs like shipping and tax are calculated.
     */
    cost: CartCost;
    /**
     * The delivery groups for this checkout. Each group contains one or more cart lines and the available delivery options (shipping, pickup point, or pickup location) for those items.
     *
     * Empty until the buyer enters enough address information for Shopify to
     * calculate shipping rates.
     */
    deliveryGroups: SubscribableSignalLike<DeliveryGroup[]>;
    /**
     * The discount codes currently applied to the checkout. The list is empty if no discount codes have been applied. Use `applyDiscountCodeChange()` to add or remove codes.
     */
    discountCodes: SubscribableSignalLike<CartDiscountCode[]>;
    /**
     * The discount allocations applied to the entire cart, including automatic discounts, code-based discounts, and custom discounts from [Shopify Functions](https://shopify.dev/docs/apps/build/functions). Each allocation indicates how much was discounted and how the discount was triggered.
     */
    discountAllocations: SubscribableSignalLike<CartDiscountAllocation[]>;
    /**
     * Metadata about the running extension, including the current target, API version,
     * capabilities, and editor context. Use this to conditionally render content
     * based on where the extension is running.
     */
    extension: Extension<Target>;
    /**
     * The identifier that specifies where in Shopify's UI your code is being
     * injected. This is one of the targets you've included in your
     * extension's configuration file.
     *
     * @example 'purchase.checkout.block.render'
     * @see https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/extension-targets-overview
     * @see https://shopify.dev/docs/apps/app-extensions/configuration#targets
     *
     * @deprecated Use `extension.target` instead.
     */
    extensionPoint: Target;
    /**
     * Utilities for translating strings, formatting currencies, numbers, and dates
     * according to the buyer's locale. Use alongside
     * [`localization`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/localization)
     * to build fully localized extensions.
     */
    i18n: I18n;
    /**
     * The list of line items the buyer intends to purchase. Each entry includes the merchandise, quantity, cost, and any custom attributes. Use `applyCartLinesChange()` to add, remove, or update line items.
     */
    lines: SubscribableSignalLike<CartLine[]>;
    /**
     * The buyer's language, country, currency, and timezone context. For
     * formatting and translation helpers, use the
     * [`i18n`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/localization#properties-propertydetail-i18n)
     * object instead.
     */
    localization: Localization;
    /**
     * The metafields that apply to the current checkout.
     *
     * Metafields are stored locally on the client and are applied to the order object after the checkout completes.
     *
     * These metafields are shared by all extensions running on checkout, and
     * persist for as long as the customer is working on this checkout.
     *
     * Once the order is created, you can query these metafields using the
     * [GraphQL Admin API](https://shopify.dev/docs/admin-api/graphql/reference/orders/order#metafield-2021-01)
     *
     * > Tip:
     * > Cart metafields are only available on carts created via the Storefront API version `2023-04` or later.
     */
    metafields: SubscribableSignalLike<Metafield[]>;
    /**
     * A note left by the customer to the merchant, either in their cart or during checkout.
     *
     * The value is `undefined` if the buyer hasn't entered a note. Use this to display or react to order-level instructions such as delivery preferences or gift messages.
     */
    note: SubscribableSignalLike<string | undefined>;
    /**
     * The method used to query the Storefront GraphQL API with a prefetched token.
     *
     */
    query: <Data = unknown, Variables = Record<string, unknown>>(query: string, options?: {
        variables?: Variables;
        version?: StorefrontApiVersion;
    }) => Promise<{
        data?: Data;
        errors?: GraphQLError[];
    }>;
    /**
     * The payment options the buyer has currently selected. This updates as
     * the buyer changes their payment method. The array can contain multiple
     * entries when the buyer splits payment across methods (for example, a
     * gift card and a credit card).
     *
     * Each option exposes `handle` and `type` only. Provider names, logos,
     * fees, and installment terms aren't available.
     */
    selectedPaymentOptions: SubscribableSignalLike<SelectedPaymentOption[]>;
    /**
     * The session token providing a set of claims as a signed JSON Web Token (JWT).
     *
     * The token has a TTL of five minutes.
     *
     * If the previous token expires, this value reflects a new session token with a new signature and expiry.
     *
     * Learn more about [session tokens](/docs/apps/build/authentication-authorization/session-tokens).
     */
    sessionToken: SessionToken;
    /**
     * The settings matching the settings definition written in the
     * [`shopify.extension.toml`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/configuration) file.
     *
     *  Refer to [settings examples](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/settings#examples) for more information.
     *
     * > Note: When an extension is being installed in the editor, the settings are empty until
     * a merchant sets a value. In that case, this object updates in real time as a merchant fills in the settings.
     */
    settings: SubscribableSignalLike<ExtensionSettings>;
    /**
     * The proposed customer shipping address. During the information step, the address
     * updates when the field is committed (on change) rather than every keystroke.
     * The property is available only if the extension has access to protected customer
     * data. When available, the subscribable value is `undefined` if delivery isn't required.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    shippingAddress?: SubscribableSignalLike<ShippingAddress | undefined>;
    /**
     * The proposed customer billing address. The address updates when the field is
     * committed (on change) rather than every keystroke. The property is available only
     * if the extension has access to protected customer data. The subscribable value is
     * `undefined` if the billing address hasn't been provided yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    billingAddress?: SubscribableSignalLike<MailingAddress | undefined>;
    /**
     * The store where the checkout is taking place, including the shop name,
     * storefront URL, `.myshopify.com` subdomain, and a globally-unique ID.
     */
    shop: Shop;
    /**
     * Key-value storage that persists across page loads within the current checkout
     * session. Data is shared across all activated targets associated with
     * this extension.
     *
     * > Caution: Data persistence isn't guaranteed and storage is cleared when the
     * buyer starts a new checkout.
     */
    storage: Storage;
    /**
     * The renderer version being used for the extension.
     *
     * @example '2025-10'
     */
    version: Version;
    /**
     * Customer privacy consent settings and a flag denoting if consent has previously been collected.
     */
    customerPrivacy: SubscribableSignalLike<CustomerPrivacy>;
    /**
     * Enables setting and updating customer privacy consent settings and tracking consent metafields.
     *
     * > Note: Requires the [`collect_buyer_consent` capability](/docs/apps/build/customer-accounts/capabilities#collect-buyer-consent) to be set to `true`.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    applyTrackingConsentChange: ApplyTrackingConsentChangeType;
    /**
     * Additional region-specific fields required during checkout, such as tax identification numbers (Brazil's CPF/CNPJ) or customs credentials. The property is available only if the extension has access to protected customer data. The array is empty if the current checkout doesn't require any localized fields.
     */
    localizedFields?: SubscribableSignalLike<LocalizedField[]>;
}
/**
 * Authenticates requests between your extension and your app backend.
 * Use session tokens to verify the identity of the buyer and the shop
 * context when making server-side API calls. The token is a signed JWT
 * that contains claims such as the customer ID, shop domain, and expiration.
 *
 * The `sub` claim in the decoded token is present only when the buyer is
 * logged in and the app has permission to read customer accounts. Absent for
 * anonymous buyers.
 */
export interface SessionToken {
    /**
     * Requests a session token that hasn't expired. You should call this method every
     * time you need to make a request to your backend in order to get a valid token.
     * This method returns cached tokens when possible, so you don't need to worry
     * about storing these tokens yourself.
     */
    get(): Promise<string>;
}
/**
 * Information about the buyer who is completing the checkout.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data). The `customer` and `purchasingCompany` properties require level 1 access. The `email` and `phone` properties require level 2 access.
 */
export interface BuyerIdentity {
    /**
     * The buyer's customer account, including their ID and whether they've accepted marketing. The value is `undefined` if the buyer isn't a
     * known customer for this shop or if they haven't logged in yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    customer: SubscribableSignalLike<Customer | undefined>;
    /**
     * The email address the buyer provided during checkout. The value is `undefined` if the app doesn't have access to customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    email: SubscribableSignalLike<string | undefined>;
    /**
     * The phone number the buyer provided during checkout. The value is `undefined` if no phone number was provided or the app doesn't have access to customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    phone: SubscribableSignalLike<string | undefined>;
    /**
     * The company and company location that a B2B (business-to-business) customer is purchasing on behalf of. Use this to identify the business context of the order. The value is `undefined` if the buyer isn't a B2B customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    purchasingCompany: SubscribableSignalLike<PurchasingCompany | undefined>;
}
/**
 * The company and location that the [B2B](https://shopify.dev/docs/apps/build/b2b) customer is purchasing on behalf of. This is present only when the buyer is logged in as a business customer.
 */
export interface PurchasingCompany {
    /**
     * The company the B2B customer belongs to.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    company: Company;
    /**
     * The specific company location associated with this B2B purchase.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    location: CompanyLocation;
}
export interface Company {
    /**
     * A globally-unique identifier for the company in the format `gid://shopify/Company/<id>`.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'gid://shopify/Company/123'
     */
    id: string;
    /**
     * The company's display name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    name: string;
    /**
     * A merchant-defined external identifier for the company. The value is `undefined` if the merchant hasn't set one.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    externalId?: string;
}
export interface CompanyLocation {
    /**
     * A globally-unique identifier for the company location in the format `gid://shopify/CompanyLocation/<id>`.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'gid://shopify/CompanyLocation/123'
     */
    id: string;
    /**
     * The display name of the company location.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    name: string;
    /**
     * A merchant-defined external identifier for the company location. The value is `undefined` if the merchant hasn't set one.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    externalId?: string;
}
export interface AppliedGiftCard {
    /**
     * The last four characters of the applied gift card's code. The full code isn't exposed for security reasons. Use this value to display which card is applied.
     */
    lastCharacters: string;
    /**
     * The amount of the applied gift card that's used when the checkout is completed. This might be less than `balance` if the order total is lower than the card's remaining balance.
     */
    amountUsed: Money;
    /**
     * The current balance of the applied gift card before checkout completion. This reflects the full remaining value on the card, not just the amount being applied to this order.
     */
    balance: Money;
}
/**
 * Metadata about the merchant's store, including its name, storefront
 * URL, `.myshopify.com` subdomain, and a globally-unique ID.
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
     * The primary storefront URL for the shop, such as `'https://example.myshopify.com'`. Use this to build links back to the merchant's online store.
     */
    storefrontUrl?: string;
    /**
     * The shop's unique `.myshopify.com` subdomain, such as `'example.myshopify.com'`. This domain is permanent and doesn't change even if the merchant adds a custom domain.
     */
    myshopifyDomain: string;
}
export interface CartCost {
    /**
     * The sum of all line item prices at the current step of checkout, before shipping and taxes are applied. Use this value to display the base cost of the items the buyer purchased.
     */
    subtotalAmount: SubscribableSignalLike<Money>;
    /**
     * The total shipping cost after shipping discounts have been applied. The value is `undefined` if shipping hasn't been calculated yet, such as when the buyer is still on the information step.
     *
     * `undefined` until the buyer selects a shipping method (typically after the
     * information step).
     */
    totalShippingAmount: SubscribableSignalLike<Money | undefined>;
    /**
     * The total tax the buyer can expect to pay, or the total tax already included in product and shipping prices (for tax-inclusive regions). The value is `undefined` if taxes haven't been calculated yet.
     *
     * `undefined` when taxes haven't been calculated or aren't available for the
     * buyer's region.
     */
    totalTaxAmount: SubscribableSignalLike<Money | undefined>;
    /**
     * The minimum total at the current step of checkout. Costs not yet calculated, such as shipping on the information step, aren't included. Gift cards and store credits are excluded from this total.
     */
    totalAmount: SubscribableSignalLike<Money>;
}
export interface CartLine {
    /**
     * A unique identifier for the cart line in the format `gid://shopify/CartLine/<id>`. This ID isn't stable and can change after any cart operation, so avoid persisting it. Always look up the current ID before calling `applyCartLinesChange()`, because you'll need it to create a `CartLineChange` object.
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
     * Custom key-value attributes attached to this cart line, such as gift messages or engraving text. Use `applyCartLinesChange()` to update these values.
     */
    attributes: Attribute[];
    /**
     * Discounts applied to this cart line, including code-based, automatic, and custom discounts. Each allocation shows the discounted amount and how the discount was triggered.
     */
    discountAllocations: CartDiscountAllocation[];
    /**
     * The individual components of a [bundle](https://shopify.dev/docs/apps/build/product-merchandising/bundles) line item. Each component represents a separate product within the bundle. Returns an empty array if the line item isn't a bundle.
     */
    lineComponents: CartLineComponentType[];
    /**
     * The parent line item that this line belongs to, or `null` if this is a
     * top-level line item. Used to identify lines added as children of a bundle
     * or other grouped product.
     */
    parentRelationship: CartLineParentRelationship | null;
}
export interface CartLineParentRelationship {
    /**
     * The parent cart line that a cart line is associated with.
     */
    parent: {
        /**
         * These line item IDs aren't stable at the moment, and they might change after
         * any operations on the line items. Always look up an updated
         * ID before any call to `applyCartLinesChange` because you'll need the ID to
         * create a `CartLineChange` object.
         * @example 'gid://shopify/CartLine/123'
         */
        id: string;
    };
}
type CartLineComponentType = CartBundleLineComponent;
/**
 * An individual component within a bundled cart line. Each `CartLine` that represents a bundle has a `lineComponents` array containing these components.
 */
export interface CartBundleLineComponent {
    /**
     * Identifies this as a bundle line component. This is currently the only component type.
     */
    type: 'bundle';
    /**
     * A unique identifier for this component within the bundle, in the format `gid://shopify/CartLineComponent/<id>`. This ID isn't stable and might change after any operation that updates the line items.
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
     * The cost breakdown for this bundle component, including the total amount after any per-item discounts.
     */
    cost: CartLineCost;
    /**
     * Custom key-value pairs attached to this bundle component, such as personalization options specific to this item within the bundle.
     *
     * @example [{key: 'engraving', value: 'hello world'}]
     */
    attributes: Attribute[];
}
export interface CartLineCost {
    /**
     * The total price the buyer pays for this line item after all line-level discounts have been applied, but before order-level discounts, taxes, and shipping.
     */
    totalAmount: Money;
}
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
export type Merchandise = ProductVariant;
export interface BaseMerchandise {
    /**
     * A globally unique identifier for the merchandise.
     *
     * @example 'gid://shopify/ProductVariant/123'
     */
    id: string;
}
export interface ProductVariant extends BaseMerchandise {
    /**
     * Identifies the merchandise as a product variant. This is currently the only merchandise type in checkout.
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
     * A secondary description for the variant that provides additional context, such as a color or size combination. The value is `undefined` if no subtitle is available.
     */
    subtitle?: string;
    /**
     * The image associated with the product variant. Falls back to the product image if the variant doesn't have its own. The value is `undefined` if neither the variant nor the product has an image.
     */
    image?: ImageDetails;
    /**
     * The product options applied to this variant, such as size, color, or material. Each entry contains the option name and the selected value.
     */
    selectedOptions: SelectedOption[];
    /**
     * The parent product that this variant belongs to. Use this to access the product's ID, vendor, and type.
     */
    product: Product;
    /**
     * Whether this product variant requires physical shipping. When `true`, the buyer must provide a shipping address. Returns `false` for digital products, gift cards, and services.
     */
    requiresShipping: boolean;
    /**
     * The [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions) associated with this variant, such as a subscription or pre-order plan. The value is `undefined` if the item isn't being purchased through a selling plan.
     */
    sellingPlan?: SellingPlan;
    /**
     * The stock keeping unit (SKU) assigned to this variant by the merchant, used for inventory tracking. The value is `undefined` if no SKU has been set.
     */
    sku?: string;
}
export interface Product {
    /**
     * A globally-unique identifier for the product in the format `gid://shopify/Product/<id>`.
     *
     * @example 'gid://shopify/Product/123'
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
export interface ImageDetails {
    /**
     * The fully-qualified URL of the image. Use this to render the product or variant image in your extension.
     */
    url: string;
    /**
     * The alternative text for the image, used for accessibility. The value is `undefined` if the merchant hasn't provided alt text.
     */
    altText?: string;
}
export interface SelectedOption {
    /**
     * The name of the product option, such as "Color" or "Size".
     *
     * @example 'Size'
     */
    name: string;
    /**
     * The selected value for the product option, such as "Red" or "Large".
     *
     * @example 'Large'
     */
    value: string;
}
/**
 * A payment option presented to the buyer.
 */
export interface PaymentOption {
    /**
     * The type of the payment option.
     *
     * Shops can be configured to support many different payment options. Some options are available only to buyers in specific regions.
     *
     * | Type  | Description  |
     * |---|---|
     * | `creditCard`  |  A vaulted or manually entered credit card.  |
     * | `deferred`  |  A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment at a later time.  |
     * | `local`  |  A [local payment option](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market  |
     * | `manualPayment`  |  A manual payment option such as an in-person retail transaction.  |
     * | `offsite`  |  A payment processed outside of Shopify's checkout, excluding integrated wallets.  |
     * | `other`  |  Another type of payment not defined here.  |
     * | `paymentOnDelivery`  |  A payment collected on delivery.  |
     * | `redeemable`  |  A redeemable payment option such as a gift card or store credit.  |
     * | `wallet`  |  An integrated wallet such as PayPal, Google Pay, or Apple Pay.  |
     * | `customOnsite` | A custom payment option that's processed through a checkout extension with a payments app. |
     */
    type: 'creditCard' | 'deferred' | 'local' | 'manualPayment' | 'offsite' | 'other' | 'paymentOnDelivery' | 'redeemable' | 'wallet' | 'customOnsite';
    /**
     * A session-scoped identifier for this payment option. This handle isn't globally unique; it's specific to the current checkout session or the shop.
     */
    handle: string;
}
/**
 * A payment option that the buyer has actively selected. This is the same shape as `PaymentOption` and appears in `selectedPaymentOptions`.
 */
export type SelectedPaymentOption = PaymentOption;
export interface CartDiscountCode {
    /**
     * The discount code string entered by the buyer during checkout or applied programmatically, such as `"SAVE10"` or `"FREESHIP"`. Use this to display which discount codes were applied.
     */
    code: string;
}
/**
 * A discount allocation applied to the cart. Use the `type` property to determine how the discount was triggered:
 *
 * - `CartCodeDiscountAllocation` (`type: 'code'`): Triggered by a discount code the buyer entered.
 * - `CartAutomaticDiscountAllocation` (`type: 'automatic'`): Applied automatically based on merchant-configured rules.
 * - `CartCustomDiscountAllocation` (`type: 'custom'`): Applied by a [Shopify Function](https://shopify.dev/docs/api/functions/latest/discount).
 */
export type CartDiscountAllocation = CartCodeDiscountAllocation | CartAutomaticDiscountAllocation | CartCustomDiscountAllocation;
export interface CartDiscountAllocationBase {
    /**
     * The monetary value that was deducted from the line item or order total by this discount allocation.
     */
    discountedAmount: Money;
}
export interface CartCodeDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The discount code string that the buyer entered during checkout, such as `"SAVE10"` or `"FREESHIP"`.
     */
    code: string;
    /**
     * Identifies this as a code-based discount, triggered by a discount code the buyer entered at checkout.
     */
    type: 'code';
}
export interface CartAutomaticDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The merchant-defined title of the automatic discount as displayed to the buyer, such as "Summer Sale 10% Off".
     */
    title: string;
    /**
     * Identifies this as an automatic discount, applied based on merchant-configured rules without a code.
     */
    type: 'automatic';
}
export interface CartCustomDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The title of the custom discount, typically applied by a [Shopify Function](https://shopify.dev/docs/api/functions/latest/discount).
     */
    title: string;
    /**
     * Identifies this as a custom discount applied by a [Shopify Function](https://shopify.dev/docs/api/functions/latest/discount).
     */
    type: 'custom';
}
type InterceptorResult = InterceptorResultAllow | InterceptorResultBlock;
interface InterceptorResultAllow {
    /**
     * Indicates that the buyer was allowed to progress through checkout.
     */
    behavior: 'allow';
}
interface InterceptorResultBlock {
    /**
     * Indicates that some part of the checkout UI intercepted and prevented
     * the buyer's progress. The buyer typically needs to take some action
     * to resolve this issue and to move on to the next step.
     */
    behavior: 'block';
}
export type InterceptorRequest = InterceptorRequestAllow | InterceptorRequestBlock;
interface InterceptorRequestAllow {
    /**
     * Indicates that the interceptor allows the buyer's journey to continue.
     */
    behavior: 'allow';
    /**
     * This callback is called when all interceptors finish. We recommend
     * setting errors or reasons for blocking at this stage, so that all the errors in
     * the UI show up at once.
     *
     * Runs after all intercept results are collected. Use it for local state
     * updates such as setting an error flag. By the time it runs, the navigation
     * decision is final, so blocking logic belongs in the intercept handler
     * itself, not here.
     * @param result InterceptorResult with behavior as either 'allow' or 'block'
     */
    perform?(result: InterceptorResult): void | Promise<void>;
}
interface InterceptorRequestBlock {
    /**
     * Indicates that the interceptor blocks the buyer's journey from continuing.
     */
    behavior: 'block';
    /**
     * The reason for blocking the interceptor request. This value isn't presented to
     * the buyer, so it doesn't need to be localized. The value is used only for Shopify's
     * own internal debugging and metrics.
     */
    reason: string;
    /**
     * Used to pass errors to the checkout UI, outside your extension's UI boundaries.
     */
    errors?: ValidationError[];
    /**
     * This callback is called when all interceptors finish. We recommend
     * setting errors or reasons for blocking at this stage, so that all the errors in
     * the UI show up at once.
     *
     * Runs after all intercept results are collected. Use it for local state
     * updates such as setting an error flag. By the time it runs, the navigation
     * decision is final, so blocking logic belongs in the intercept handler
     * itself, not here.
     * @param result InterceptorResult with behavior as either 'allow' or 'block'
     */
    perform?(result: InterceptorResult): void | Promise<void>;
}
export interface InterceptorProps {
    /**
     * Whether the interceptor can block the buyer's progress through checkout. When `true`, the merchant has granted your extension the `block_progress` capability. When `false`, you can still validate but can't prevent the buyer from continuing.
     */
    canBlockProgress: boolean;
}
/**
 * A function for intercepting and preventing navigation on checkout. You can block
 * navigation by returning an object with
 * `{behavior: 'block', reason: 'your reason here', errors?: ValidationError[]}`.
 * If you do, then you're expected to also update some part of your UI to reflect the reason why navigation
 * was blocked, either by targeting checkout UI fields, passing errors to the page level, or rendering the errors in your extension.
 */
export type Interceptor = (interceptorProps: InterceptorProps) => InterceptorRequest | Promise<InterceptorRequest>;
/**
 * Information about a customer who has previously purchased from this shop.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
 */
export interface Customer {
    /**
     * An identifier for the customer in the format `gid://shopify/Customer/<id>`. This value is unique per shop.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'gid://shopify/Customer/123'
     */
    id: string;
    /**
     * The email address associated with the customer's account. The value is `undefined` if the app doesn't have the required access level.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    email?: string;
    /**
     * The phone number associated with the customer's account. The value is `undefined` if no phone number is on file or the app doesn't have the required access level.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    phone?: string;
    /**
     * The customer's full name, typically a combination of first and last name. The value is `undefined` if the app doesn't have the required access level.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    fullName?: string;
    /**
     * The customer's first name. The value is `undefined` if the app doesn't have the required access level.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    firstName?: string;
    /**
     * The customer's last name. The value is `undefined` if the app doesn't have the required access level.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    lastName?: string;
    /**
     * The customer's profile image, such as a Gravatar avatar. Use this to personalize the extension UI for the logged-in buyer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    image: ImageDetails;
    /**
     * Whether the customer has opted in to receiving marketing communications from the merchant, such as email campaigns and promotional offers.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * > Caution: This field is deprecated and will be removed in a future version. Use `acceptsEmailMarketing` or `acceptsSmsMarketing` instead.
     *
     * @deprecated Use `acceptsEmailMarketing` or `acceptsSmsMarketing` instead.
     */
    acceptsMarketing: boolean;
    /**
     * Whether the customer has opted in to email marketing.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    acceptsEmailMarketing: boolean;
    /**
     * Whether the customer has opted in to SMS marketing.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    acceptsSmsMarketing: boolean;
    /**
     * The store credit accounts owned by this customer that can be used as payment during checkout. Each account has a balance representing available store credit.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @private
     */
    storeCreditAccounts: StoreCreditAccount[];
    /**
     * The number of orders the customer has previously placed with this shop.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    ordersCount: number;
}
/**
 * Settings describing the behavior of the buyer's checkout.
 */
export interface CheckoutSettings {
    /**
     * The type of order created when the buyer completes checkout.
     *
     * - `'DRAFT_ORDER'`: The checkout creates a draft order that the merchant must manually confirm before fulfillment. Common for B2B checkouts with deferred payment terms.
     * - `'ORDER'`: The checkout creates a confirmed order immediately upon completion.
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
 */
export interface ShippingAddressSettings {
    /**
     * Whether the buyer is allowed to edit the shipping address during checkout. When `false`, the shipping address is locked and can't be changed, which is common for B2B orders with a predefined ship-to address.
     */
    isEditable: boolean;
}
/**
 * A payment terms template configured by the merchant, defining when payment is due for B2B orders. Common examples include "Net 30" (due in 30 days) or "Due on receipt".
 */
export interface PaymentTermsTemplate {
    /**
     * A globally-unique identifier for the payment terms template in the format `gid://shopify/PaymentTermsTemplate/<id>`.
     *
     * @example 'gid://shopify/PaymentTermsTemplate/1'
     */
    id: string;
    /**
     * The name of the payment terms translated to the buyer's current language, such as "Net 30" or "Due on receipt".
     */
    name: string;
    /**
     * The due date for payment in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (`YYYY-MM-DDTHH:mm:ss.sssZ`). The value is `undefined` if the payment terms don't have a fixed due date.
     */
    dueDate?: string;
    /**
     * The number of days the buyer has to pay after the order is placed, such as `30` for "Net 30" terms. The value is `undefined` if the payment terms aren't net-based.
     */
    dueInDays?: number;
}
/**
 * A store credit account owned by the customer. Store credit is a form of payment that merchants can issue to customers for returns, refunds, or promotional purposes.
 */
export interface StoreCreditAccount {
    /**
     * A globally-unique identifier for the store credit account in the format `gid://shopify/StoreCreditAccount/<id>`.
     *
     * @example 'gid://shopify/StoreCreditAccount/1'
     */
    id: string;
    /**
     * The remaining balance available in this store credit account. This reflects the amount that can still be applied toward purchases.
     */
    balance: Money;
}
/**
 * The merchant-defined setting values for the extension.
 */
export type ExtensionSettings = Record<string, string | number | boolean | undefined>;
/**
 * Tracks custom events and sends visitor information to
 * [Web Pixels](https://shopify.dev/docs/apps/marketing). Use `publish()` to emit events
 * and `visitor()` to submit buyer contact details.
 */
export interface Analytics {
    /**
     * Publishes a custom event to [Web Pixels](https://shopify.dev/docs/apps/marketing).
     * Returns `true` when the event is successfully dispatched.
     *
     * The Promise resolves to `true` when the event was dispatched. The boolean
     * indicates dispatch confirmation only. It doesn't indicate whether any
     * specific web pixel processed the event.
     */
    publish(name: string, data: Record<string, unknown>): Promise<boolean>;
    /**
     * Submits buyer contact details for attribution and analytics purposes.
     */
    visitor(data: {
        email?: string;
        phone?: string;
    }): Promise<VisitorResult>;
}
/**
 * Represents a visitor result.
 */
export type VisitorResult = VisitorSuccess | VisitorError;
/**
 * Represents a successful visitor result.
 */
export interface VisitorSuccess {
    /**
     * Indicates that the visitor information was validated and submitted.
     */
    type: 'success';
}
/**
 * Represents an unsuccessful visitor result.
 */
export interface VisitorError {
    /**
     * Indicates that the visitor information is invalid and wasn't submitted.
     * Common causes include using the wrong data type or omitting a required property.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     */
    message: string;
}
/**
 * A group of cart lines that share the same set of delivery options. For example, physical items might form one delivery group while digital items form another.
 */
export interface DeliveryGroup {
    /**
     * A unique identifier for the delivery group. The value is `undefined` if the underlying delivery line doesn't have an ID assigned.
     */
    id?: string;
    /**
     * The cart lines that belong to this delivery group. Each reference contains the cart line's `id`, which you can match against `lines` to get the full cart line details.
     */
    targetedCartLines: CartLineReference[];
    /**
     * The delivery options available for this group, including shipping, pickup point, and pickup location options. The buyer selects one of these to determine how their items are delivered.
     */
    deliveryOptions: DeliveryOption[];
    /**
     * The delivery option the buyer has selected for this group. The value is `undefined` if the buyer hasn't selected a delivery option yet. Contains a `handle` you can match against `deliveryOptions` entries.
     */
    selectedDeliveryOption?: DeliveryOptionReference;
    /**
     * Whether this group contains items for a one-time purchase or a subscription.
     * Subscription delivery groups might have different shipping options. See `DeliveryGroupType` for possible values.
     */
    groupType: DeliveryGroupType;
    /**
     * Whether physical delivery is required for the items in this group.
     * Digital-only groups don't require delivery.
     */
    isDeliveryRequired: boolean;
}
/**
 * The possible types of a delivery group.
 *
 * - `'oneTimePurchase'`: Items bought as a single, non-recurring purchase.
 * - `'subscription'`: Items bought through a [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions) that results in recurring deliveries.
 */
export type DeliveryGroupType = 'oneTimePurchase' | 'subscription';
/**
 * A reference to a cart line within a delivery group, identified by the cart line's ID.
 */
export interface CartLineReference {
    /**
     * The unique identifier of the referenced cart line. Match this against `CartLine.id` from the `lines` property to get the full line item details.
     */
    id: string;
}
/**
 * A reference to the delivery option selected by the buyer for a delivery group.
 */
export interface DeliveryOptionReference {
    /**
     * The unique identifier of the referenced delivery option. Match this against `DeliveryOption.handle` from the `deliveryOptions` array to get the full option details.
     */
    handle: string;
}
/**
 * A delivery option available to the buyer. Use the `type` property to determine which kind of option it is:
 *
 * - `ShippingOption` (`type: 'shipping' | 'local'`): Items shipped by a carrier or delivered locally by the merchant.
 * - `PickupPointOption` (`type: 'pickupPoint'`): Items shipped to a third-party collection point for the buyer to pick up.
 * - `PickupLocationOption` (`type: 'pickup'`): Items picked up directly from a merchant's store or warehouse.
 */
export type DeliveryOption = ShippingOption | PickupPointOption | PickupLocationOption;
/**
 * Represents a base interface for a single delivery option.
 */
export interface DeliveryOptionBase {
    /**
     * The unique identifier of the delivery option. Use this to match against `DeliveryOptionReference.handle` or `DeliverySelectionGroup` entries.
     */
    handle: string;
    /**
     * The merchant-facing or carrier-provided display name for the delivery
     * option, such as "Standard Shipping" or "Express".
     */
    title?: string;
    /**
     * Additional details about the delivery option provided by the carrier
     * or merchant, such as estimated delivery windows or service level notes.
     */
    description?: string;
    /**
     * The carrier service code or rate identifier for this delivery option.
     */
    code: string;
    /**
     * Custom [metafields](https://shopify.dev/docs/apps/build/custom-data/metafields) attached to this delivery option by the carrier or a [Shopify Function](https://shopify.dev/docs/apps/build/functions). Use these to display additional information about the option.
     */
    metafields: Metafield[];
}
/**
 * Represents a delivery option that's a shipping option.
 */
export interface ShippingOption extends DeliveryOptionBase {
    /**
     * Identifies the delivery method. `'shipping'` means items are shipped by a carrier. `'local'` means the merchant handles delivery themselves, for example same-day local delivery.
     */
    type: 'shipping' | 'local';
    /**
     * Information about the carrier providing this shipping option, including the carrier's display name.
     */
    carrier: ShippingOptionCarrier;
    /**
     * The cost of this delivery option before any shipping discounts are applied. Compare with `costAfterDiscounts` to show savings.
     */
    cost: Money;
    /**
     * The cost of this delivery option after shipping discounts have been applied. This is the price the buyer actually pays for shipping.
     */
    costAfterDiscounts: Money;
    /**
     * The estimated delivery time for this shipping option. Use the `timeInTransit` range to display an estimated arrival window to the buyer.
     */
    deliveryEstimate: DeliveryEstimate;
}
export interface DeliveryEstimate {
    /**
     * The estimated time in transit for the delivery, expressed as a range
     * in seconds. Undefined when the carrier doesn't provide an estimate.
     * When present, either the lower or upper bound of the range might still
     * be omitted.
     */
    timeInTransit?: NumberRange;
}
export interface ShippingOptionCarrier {
    /**
     * The display name of the shipping carrier, such as "Canada Post" or "UPS". The value is `undefined` if the carrier name isn't available.
     */
    name?: string;
}
export interface PickupPointOption extends DeliveryOptionBase {
    /**
     * Identifies this as a pickup point option, where items are shipped to a third-party collection point for the buyer to pick up.
     */
    type: 'pickupPoint';
    /**
     * Information about the carrier that ships items to this pickup point, including the carrier's name and code.
     */
    carrier: PickupPointCarrier;
    /**
     * The cost of this delivery option before any shipping discounts are applied. Compare with `costAfterDiscounts` to show savings.
     */
    cost: Money;
    /**
     * The cost of this delivery option after shipping discounts have been applied. This is the price the buyer actually pays for shipping.
     */
    costAfterDiscounts: Money;
    /**
     * The physical location where the buyer picks up their order, including the address and display name of the collection point.
     */
    location: PickupPointLocation;
}
export interface PickupLocationOption extends DeliveryOptionBase {
    /**
     * Identifies this as a pickup location option, where the buyer picks up items directly from a merchant's store or warehouse.
     */
    type: 'pickup';
    /**
     * The merchant's store or warehouse where the buyer picks up their order, including the address and display name.
     */
    location: PickupLocation;
}
interface PickupLocation {
    /**
     * The merchant-defined display name of the pickup location, such as a
     * store name or warehouse label.
     */
    name?: string;
    /**
     * The physical address of the pickup location.
     */
    address: MailingAddress;
}
interface PickupPointLocation {
    /**
     * The display name of the pickup point, such as the name of the locker
     * or collection point.
     */
    name?: string;
    /**
     * The unique identifier of the pickup point.
     */
    handle: string;
    /**
     * The physical address of the pickup point.
     */
    address: MailingAddress;
}
interface PickupPointCarrier {
    /**
     * The carrier's unique identifier code, used to distinguish between
     * different carriers that deliver to pickup points.
     */
    code?: string;
    /**
     * The display name of the carrier that delivers to this pickup point.
     */
    name?: string;
}
export interface NumberRange {
    /**
     * The lower bound of the range. Undefined if only an upper bound is
     * provided.
     */
    lower?: number;
    /**
     * The upper bound of the range. Undefined if only a lower bound is
     * provided.
     */
    upper?: number;
}
/**
 * Represents a DeliveryGroup with expanded reference fields and full details.
 */
export interface DeliveryGroupDetails extends DeliveryGroup {
    /**
     * The full delivery option the buyer has selected for this group, with all cost and carrier details included. The value is `undefined` if the buyer hasn't selected an option yet. Unlike `DeliveryGroup.selectedDeliveryOption`, which is a reference, this contains the complete `DeliveryOption` object.
     */
    selectedDeliveryOption?: DeliveryOption;
    /**
     * The full cart line objects associated with this delivery group, with all merchandise and cost details included. Unlike `DeliveryGroup.targetedCartLines`, which contains references, this contains the complete `CartLine` objects.
     */
    targetedCartLines: CartLine[];
}
export interface AllowedProcessing {
    /**
     * Whether analytics data can be collected based on the visitor's consent,
     * the merchant's privacy configuration, and the visitor's region. Analytics
     * data includes how the shop was used and what interactions occurred.
     *
     * Whether analytics data can be collected right now. Combines the buyer's
     * consent, the merchant's privacy configuration, and the buyer's region into
     * a single boolean. Check this flag, not `visitorConsent.analytics`, before
     * calling `shopify.analytics.publish()`.
     */
    analytics: boolean;
    /**
     * Whether marketing data can be collected based on the visitor's consent,
     * the merchant's privacy configuration, and the visitor's region. Marketing
     * data includes attribution and targeted advertising preferences.
     *
     * Whether marketing data can be collected right now. Combines the buyer's
     * consent, the merchant's privacy configuration, and the buyer's region into
     * a single boolean. Check this flag, not `visitorConsent.marketing`, before
     * performing marketing-related data collection.
     */
    marketing: boolean;
    /**
     * Whether preference data can be collected based on the visitor's consent,
     * the merchant's privacy configuration, and the visitor's region. Preference
     * data includes language, currency, and sizing choices.
     *
     * Whether preference data can be collected right now. Combines the buyer's
     * consent, the merchant's privacy configuration, and the buyer's region into
     * a single boolean. Check this flag, not `visitorConsent.preferences`,
     * before storing or reading buyer preference data.
     */
    preferences: boolean;
    /**
     * Whether data can be shared with third parties based on the visitor's
     * consent, the merchant's privacy configuration, and the visitor's region.
     * This typically applies to behavioral advertising data.
     *
     * Whether buyer data can be shared with or sold to third parties right now.
     * Combines the buyer's consent, the merchant's privacy configuration, and
     * the buyer's region into a single boolean. Check this flag, not
     * `visitorConsent.saleOfData`, before sharing or selling buyer data with
     * third parties.
     */
    saleOfData: boolean;
}
export interface VisitorConsent {
    /**
     * The visitor's consent for analytics tracking. `true` means the visitor
     * actively granted consent, `false` means actively denied, and `undefined`
     * means no decision has been made yet.
     */
    analytics?: boolean;
    /**
     * The visitor's consent for marketing and targeted advertising. `true` means
     * the visitor actively granted consent, `false` means actively denied, and
     * `undefined` means no decision has been made yet.
     */
    marketing?: boolean;
    /**
     * The visitor's consent for storing preferences such as language and currency.
     * `true` means the visitor actively granted consent, `false` means actively
     * denied, and `undefined` means no decision has been made yet.
     */
    preferences?: boolean;
    /**
     * The visitor's consent for the sale or sharing of their personal data with
     * third parties. `true` means the visitor actively granted consent, `false`
     * means actively denied, and `undefined` means no decision has been made yet.
     */
    saleOfData?: boolean;
}
export interface TrackingConsentMetafield {
    /**
     * The identifier for the tracking consent metafield, such as `'analyticsType'` or `'marketingType'`.
     */
    key: string;
    /**
     * The value stored in the tracking consent metafield, such as `'granular'` or a stringified JSON object.
     */
    value: string;
}
export interface TrackingConsentMetafieldChange {
    /**
     * The identifier for the tracking consent metafield to update.
     */
    key: string;
    /**
     * The new value to store in the metafield. Set to `null` to delete the metafield.
     *
     * Consent metafield values are strings, not booleans. Pass `null` to delete
     * a tracking consent metafield.
     */
    value: string | null;
}
export interface VisitorConsentChange extends VisitorConsent {
    /**
     * Tracking consent metafield data to be saved.
     *
     * If the value is `null`, the metafield is deleted.
     *
     * @example `[{key: 'granularAnalytics', value: 'true'}, {key: 'granularMarketing', value: 'false'}]`
     */
    metafields?: TrackingConsentMetafieldChange[];
    /**
     * Identifies this as a visitor consent change. This is the only supported change type for `applyTrackingConsentChange()`.
     */
    type: 'changeVisitorConsent';
}
export type ApplyTrackingConsentChangeType = (visitorConsent: VisitorConsentChange) => Promise<TrackingConsentChangeResult>;
export interface CustomerPrivacyRegion {
    /**
     * The buyer's country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. The value is `undefined` if geolocation failed.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'CA' for Canada, 'US' for United States, 'GB' for Great Britain
     */
    countryCode?: CountryCode;
    /**
     * The buyer's province, state, or region code in [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) format. The value is `undefined` if geolocation failed or only the country was detected.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'ON' for Ontario, 'ENG' for England, 'CA' for California
     */
    provinceCode?: string;
}
export interface CustomerPrivacy {
    /**
     * Flags indicating whether each type of data processing is permitted, based on the visitor's consent, the merchant's privacy configuration, and the visitor's geographic location.
     */
    allowedProcessing: AllowedProcessing;
    /**
     * The tracking consent metafields that have been stored for this visitor. These contain app-specific consent data beyond the standard categories.
     *
     * @example `[{key: 'analyticsType', value: 'granular'}, {key: 'marketingType', value: 'granular'}]`, or `[]`
     */
    metafields: TrackingConsentMetafield[];
    /**
     * The visitor's current privacy consent settings. Each property represents a consent category and is `true` (actively granted), `false` (actively denied), or `undefined` (no decision made yet).
     */
    visitorConsent: VisitorConsent;
    /**
     * Whether a consent banner should be displayed by default when the page loads. Use this as the initial open/expanded state of the consent banner.
     *
     * This is determined by the visitor's current privacy consent, the shop's [region visibility configuration](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings#add-a-cookie-banner) settings, and the region in which the visitor is located.
     */
    shouldShowBanner: boolean;
    /**
     * Whether the visitor is located in a region that requires an explicit opt-out option for the sale or sharing of personal data, such as California (CCPA) or other jurisdictions with similar regulations.
     */
    saleOfDataRegion: boolean;
    /**
     * The visitor's geographic location, used to determine whether more granular consent controls should be displayed based on regional privacy regulations.
     *
     * @example `{countryCode: 'CA', provinceCode: 'ON'}` for a visitor in Ontario, Canada; `{countryCode: 'US', provinceCode: undefined}` for a visitor in the United States if geolocation fails to detect the state; or `undefined` if neither country nor province is detected or geolocation fails.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    region?: CustomerPrivacyRegion;
}
export type TrackingConsentChangeResult = TrackingConsentChangeResultSuccess | TrackingConsentChangeResultError;
/**
 * The returned result of a successful tracking consent preference update.
 */
export interface TrackingConsentChangeResultSuccess {
    /**
     * Indicates that the tracking consent update was applied successfully.
     */
    type: 'success';
}
/**
 * The returned result of an unsuccessful tracking consent preference update
 * with a message detailing the type of error that occurred.
 */
export interface TrackingConsentChangeResultError {
    /**
     * Indicates that the tracking consent update couldn't be applied. Check the `message` property for details.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     */
    message: string;
}
export interface CartInstructions {
    /**
     * Whether the extension can update custom attributes using `applyAttributeChange()`.
     */
    attributes: AttributesCartInstructions;
    /**
     * Whether the extension can modify the shipping address using `applyShippingAddressChange()`.
     */
    delivery: DeliveryCartInstructions;
    /**
     * Whether the extension can add or remove discount codes using `applyDiscountCodeChange()`.
     */
    discounts: DiscountsCartInstructions;
    /**
     * Whether the extension can add, remove, or update cart lines using `applyCartLinesChange()`.
     */
    lines: CartLinesCartInstructions;
    /**
     * Whether the extension can add, update, or delete cart metafields using `applyMetafieldChange()`.
     */
    metafields: MetafieldsCartInstructions;
    /**
     * Whether the extension can update the order note using `applyNoteChange()`.
     */
    notes: NotesCartInstructions;
}
export interface AttributesCartInstructions {
    /**
     * Whether attributes can be updated using `applyAttributeChange()`. When
     * `false`, the checkout configuration doesn't allow attribute changes.
     * Even when `true`, calls to `applyAttributeChange()` can still fail
     * during accelerated checkout (Apple Pay, Google Pay).
     */
    canUpdateAttributes: boolean;
}
export interface DeliveryCartInstructions {
    /**
     * Whether the shipping address can be modified using
     * `applyShippingAddressChange()`. When `false`, the buyer is using an
     * accelerated checkout flow (Apple Pay, Google Pay) where the address
     * can't be changed.
     */
    canSelectCustomAddress: boolean;
}
export interface DiscountsCartInstructions {
    /**
     * Whether discount codes can be updated using `applyDiscountCodeChange()`.
     * When `false`, the checkout configuration doesn't allow discount code
     * changes. Even when `true`, calls to `applyDiscountCodeChange()` can
     * still fail during accelerated checkout (Apple Pay, Google Pay).
     */
    canUpdateDiscountCodes: boolean;
}
export interface CartLinesCartInstructions {
    /**
     * Whether new cart lines can be added using `applyCartLinesChange()`. When
     * `false`, the checkout configuration doesn't allow adding lines (for
     * example, draft orders). Even when `true`, calls can still fail during
     * accelerated checkout (Apple Pay, Google Pay).
     */
    canAddCartLine: boolean;
    /**
     * Whether cart lines can be removed using `applyCartLinesChange()`. When
     * `false`, the checkout configuration doesn't allow removing lines.
     * Even when `true`, calls can still fail during accelerated checkout.
     */
    canRemoveCartLine: boolean;
    /**
     * Whether cart lines can be updated using `applyCartLinesChange()`. When
     * `false`, the checkout configuration doesn't allow updating lines.
     * Even when `true`, calls can still fail during accelerated checkout.
     */
    canUpdateCartLine: boolean;
}
export interface MetafieldsCartInstructions {
    /**
     * Whether the extension can add or update cart metafields using
     * `applyMetafieldChange()`.
     */
    canSetCartMetafields: boolean;
    /**
     * Whether the extension can delete cart metafields using
     * `applyMetafieldChange()`.
     */
    canDeleteCartMetafield: boolean;
}
export interface NotesCartInstructions {
    /**
     * Whether the order note can be updated using `applyNoteChange()`. When
     * `false`, the checkout configuration doesn't allow note changes. Even
     * when `true`, calls to `applyNoteChange()` can still fail during
     * accelerated checkout (Apple Pay, Google Pay).
     */
    canUpdateNote: boolean;
}
//# sourceMappingURL=standard.d.ts.map