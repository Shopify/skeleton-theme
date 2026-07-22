import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
import type { ValidationError, SellingPlan, Attribute, MailingAddress, ShippingAddress } from '../shared';
import type { ExtensionTarget } from '../../targets';
import type { ApiVersion, Capability, CurrencyCode, Country, CountryCode, Timezone, GraphQLError, StorefrontApiVersion, LocalizedFieldKey } from '../../../../shared';
export type { ApiVersion, Capability } from '../../../../shared';
/**
 * A key-value storage object for the extension.
 *
 * Stored data is only available to this specific extension
 * and any of its instances.
 *
 * The storage backend is implemented with `localStorage` and
 * should persist across the buyer's checkout session.
 * However, data persistence isn't guaranteed.
 */
export interface Storage {
    /**
     * Read and return a stored value by key.
     *
     * The stored data is deserialized from JSON and returned as
     * its original primitive.
     *
     * Returns `null` if no stored data exists.
     */
    read<T = unknown>(key: string): Promise<T | null>;
    /**
     * Write stored data for this key.
     *
     * The data must be serializable to JSON.
     */
    write(key: string, data: any): Promise<void>;
    /**
     * Delete stored data by key.
     */
    delete(key: string): Promise<void>;
}
/**
 * The meta information about an extension target.
 */
export interface Extension<Target extends ExtensionTarget = ExtensionTarget> {
    /**
     * The API version that was set in the extension config file.
     *
     * @example '2024-07', '2024-10', '2025-01', '2025-04', 'unstable'
     */
    apiVersion: ApiVersion;
    /**
     * The allowed capabilities of the extension, defined
     * in your [shopify.extension.toml](https://shopify.dev/docs/api/checkout-ui-extensions/configuration) file.
     *
     * * [`api_access`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#api-access): the extension can access the Storefront API.
     *
     * * [`network_access`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#network-access): the extension can make external network calls.
     *
     * * [`block_progress`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#block-progress): the extension can block a customer's progress and the merchant has allowed this blocking behavior.
     *
     * * [`collect_buyer_consent.sms_marketing`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#collect-buyer-consent): the extension can collect customer consent for SMS marketing.
     *
     * * [`collect_buyer_consent.customer_privacy`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#collect-buyer-consent): the extension can register customer consent decisions that will be honored on Shopify-managed services.
     *
     * * [`iframe.sources`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#iframe): the extension can embed an external URL in an iframe.
     */
    capabilities: StatefulRemoteSubscribable<Capability[]>;
    /**
     * Information about the editor where the extension is being rendered.
     *
     * If the value is undefined, then the extension is not running in an editor.
     */
    editor?: Editor;
    /**
     * A Boolean to show whether your extension is currently rendered to the screen.
     *
     * Shopify might render your extension before it's visible in the UI,
     * typically to pre-render extensions that will appear on a later step of the
     * checkout.
     *
     * Your extension might also continue to run after the customer has navigated away
     * from where it was rendered. The extension continues running so that
     * your extension is immediately available to render if the customer navigates back.
     */
    rendered: StatefulRemoteSubscribable<boolean>;
    /**
     * The URL to the script that started the extension target.
     */
    scriptUrl: string;
    /**
     * The identifier that specifies where in Shopify’s UI your code is being
     * injected. This will be one of the targets you have included in your
     * extension’s configuration file.
     *
     * @example 'purchase.checkout.block.render'
     * @see https://shopify.dev/docs/api/checkout-ui-extensions/unstable/extension-targets-overview
     * @see https://shopify.dev/docs/apps/app-extensions/configuration#targets
     */
    target: Target;
    /**
     * The published version of the running extension target.
     *
     * For unpublished extensions, the value is `undefined`.
     *
     * @example 3.0.10
     */
    version?: string;
}
export interface Editor {
    /**
     * Indicates whether the extension is rendering in the checkout editor.
     */
    type: 'checkout';
}
/**
 * Metadata associated with the checkout.
 */
export interface Metafield {
    /**
     * The name of the metafield. It must be between 3 and 30 characters in
     * length (inclusive).
     */
    key: string;
    /**
     * A container for a set of metafields. You need to define a custom
     * namespace for your metafields to distinguish them from the metafields
     * used by other apps. This must be between 2 and 20 characters in length (inclusive).
     */
    namespace: string;
    /**
     * The information to be stored as metadata.
     */
    value: string | number;
    /** The metafield’s information type. */
    valueType: 'integer' | 'string' | 'json_string';
}
/**
 * Represents a custom metadata attached to a resource.
 */
export interface AppMetafield {
    /** The key name of a metafield. */
    key: string;
    /**
     * The namespace for a metafield.
     *
     * App owned metafield namespaces are returned using the `$app` format. See [app owned metafields](/docs/apps/build/custom-data/ownership#reserved-prefixes) for more information.
     */
    namespace: string;
    /** The value of a metafield. */
    value: string | number | boolean;
    /** The metafield’s information type. */
    valueType: 'boolean' | 'float' | 'integer' | 'json_string' | 'string';
    /** The metafield's type name. */
    type: string;
}
/**
 * Represents a custom metadata attached to a resource.
 */
export interface CartMetafield {
    /** The key name of a metafield. */
    key: string;
    /** The namespace for a metafield. */
    namespace: string;
    /** The value of a metafield. */
    value: string;
    /** The metafield's type name. */
    type: string;
}
/**
 * The metafield owner.
 */
export interface AppMetafieldEntryTarget {
    /**
     * The type of the metafield owner.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company` or `companyLocation`.
     */
    type: 'customer' | 'product' | 'shop' | 'shopUser' | 'variant' | 'company' | 'companyLocation' | 'cart';
    /** The numeric owner ID that is associated with the metafield. */
    id: string;
}
/**
 * A metafield associated with the shop or a resource on the checkout.
 */
export interface AppMetafieldEntry {
    /**
     * The target that is associated to the metadata.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company` or `companyLocation`.
     */
    target: AppMetafieldEntryTarget;
    /** The metadata information. */
    metafield: AppMetafield;
}
export type Version = string;
export type CheckoutToken = string;
/**
 * This returns a translated string matching a key in a locale file.
 *
 * @example translate("banner.title")
 */
export interface I18nTranslate {
    <ReplacementType = string>(key: string, options?: Record<string, ReplacementType | string | number>): ReplacementType extends string | number ? string : (string | ReplacementType)[];
}
export interface I18n {
    /**
     * Returns a localized number.
     *
     * This function behaves like the standard `Intl.NumberFormat()`
     * with a style of `decimal` applied. It uses the buyer's locale by default.
     *
     * @param options.inExtensionLocale - if true, use the extension's locale
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
     * @param options.inExtensionLocale - if true, use the extension's locale
     */
    formatCurrency: (number: number | bigint, options?: {
        inExtensionLocale?: boolean;
    } & Intl.NumberFormatOptions) => string;
    /**
     * Returns a localized date value.
     *
     * This function behaves like the standard `Intl.DateTimeFormatOptions()` and uses
     * the buyer's locale by default. Formatting options can be passed in as
     * options.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat0
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
     *
     * @param options.inExtensionLocale - if true, use the extension's locale
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
     * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code.
     *
     * @example 'en' for English, or 'en-US' for English local to United States.
     * @see https://en.wikipedia.org/wiki/IETF_language_tag
     * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    isoCode: string;
}
export interface Currency {
    /**
     * The ISO-4217 code for this currency.
     * @see https://www.iso.org/iso-4217-currency-codes.html
     */
    isoCode: CurrencyCode;
}
export interface Market {
    /**
     * A globally-unique identifier for a market.
     */
    id: string;
    /**
     * The human-readable, shop-scoped identifier for the market.
     */
    handle: string;
}
export interface Localization {
    /**
     * The currency that the customer sees for money amounts in the checkout.
     */
    currency: StatefulRemoteSubscribable<Currency>;
    /**
     * The buyer’s time zone.
     */
    timezone: StatefulRemoteSubscribable<Timezone>;
    /**
     * The language the customer sees in the checkout.
     */
    language: StatefulRemoteSubscribable<Language>;
    /**
     * This is the customer's language, as supported by the extension.
     * If the customer's actual language is not supported by the extension,
     * then this is the language that is used for translations.
     *
     * For example, if the customer's language is 'fr-CA' but your extension
     * only supports translations for 'fr', then the `isoCode` for this
     * language is 'fr'. If your extension does not provide french
     * translations at all, then this value is the default locale for your
     * extension (that is, the one matching your .default.json file).
     */
    extensionLanguage: StatefulRemoteSubscribable<Language>;
    /**
     * The country context of the checkout. This value carries over from the
     * context of the cart, where it was used to contextualize the storefront
     * experience. It will update if the buyer changes the country of their
     * shipping address. If the country is unknown, then the value is undefined.
     */
    country: StatefulRemoteSubscribable<Country | undefined>;
    /**
     * The [market](https://shopify.dev/docs/apps/markets) context of the
     * checkout. This value carries over from the context of the cart, where it
     * was used to contextualize the storefront experience. It will update if the
     * buyer changes the country of their shipping address.  If the market is unknown,
     * then the value is undefined.
     */
    market: StatefulRemoteSubscribable<Market | undefined>;
}
export interface LocalizedField {
    key: LocalizedFieldKey;
    title: string;
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
     * teardown function will remove the interceptor.
     *
     * To block checkout progress, you must set the [block_progress](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#block-progress)
     * capability in your extension's configuration.
     *
     * If you do, then you're expected to inform the buyer why navigation was blocked,
     * either by passing validation errors to the checkout UI or rendering the errors in your extension.
     *
     * It is good practice to show a warning in the checkout editor when the merchant has not given permission for your extension
     * to block checkout progress.
     */
    intercept(interceptor: Interceptor): Promise<() => void>;
    /**
     * This subscribable value will be true if the buyer completed submitting their order.
     *
     * For example, when viewing the **Order status** page after submitting payment, the buyer will have completed their order.
     */
    completed: StatefulRemoteSubscribable<boolean>;
    /**
     * All possible steps a buyer can take to complete the checkout. These steps may vary depending on the type of checkout or the shop's configuration.
     */
    steps: StatefulRemoteSubscribable<BuyerJourneyStep[]>;
    /**
     * What step of checkout the buyer is currently on.
     */
    activeStep: StatefulRemoteSubscribable<BuyerJourneyStepReference | undefined>;
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
     * The handle that uniquely identifies the buyer journey step.
     */
    handle: BuyerJourneyStepHandle;
}
export interface BuyerJourneyStep {
    /**
     * The handle that uniquely identifies the buyer journey step.
     */
    handle: BuyerJourneyStepHandle;
    /**
     * The localized label of the buyer journey step.
     */
    label: string;
    /**
     * The url of the buyer journey step. This property leverages the `shopify:` protocol
     * E.g. `shopify:cart` or `shopify:checkout/information`.
     */
    to: string;
    /**
     * The disabled state of the buyer journey step. This value will be true if the buyer has not reached the step yet.
     *
     * For example, if the buyer has not reached the `shipping` step yet, `shipping` would be disabled.
     */
    disabled: boolean;
}
export interface StandardApi<Target extends ExtensionTarget = ExtensionTarget> {
    /**
     * The methods for interacting with [Web Pixels](https://shopify.dev/docs/apps/marketing), such as emitting an event.
     */
    analytics: Analytics;
    /**
     * Gift Cards that have been applied to the checkout.
     */
    appliedGiftCards: StatefulRemoteSubscribable<AppliedGiftCard[]>;
    /**
     * The cart instructions used to create the checkout and possibly limit extension capabilities.
     *
     * These instructions should be checked prior to performing any actions that may be affected by them.
     *
     * For example, if you intend to add a discount code via the `applyDiscountCodeChange` method,
     * check `discounts.canUpdateDiscountCodes` to ensure it's supported in this checkout.
     *
     * > Caution: As of version `2024-07`, UI extension code must check for instructions before calling select APIs in case those APIs are not available.
     *  See the [update guide](/docs/api/checkout-ui-extensions/apis/cart-instructions#examples) for more information.
     *
     */
    instructions: StatefulRemoteSubscribable<CartInstructions>;
    /**
     * The metafields requested in the
     * [`shopify.extension.toml`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration)
     * file. These metafields are updated when there's a change in the merchandise items
     * being purchased by the customer.
     *
     * App owned metafields are supported and are returned using the `$app` format. The fully qualified reserved namespace format such as `app--{your-app-id}[--{optional-namespace}]` is not supported. See [app owned metafields](/docs/apps/build/custom-data/ownership#reserved-prefixes) for more information.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    appMetafields: StatefulRemoteSubscribable<AppMetafieldEntry[]>;
    /**
     * The custom attributes left by the customer to the merchant, either in their cart or during checkout.
     */
    attributes: StatefulRemoteSubscribable<Attribute[] | undefined>;
    /**
     * All available payment options.
     */
    availablePaymentOptions: StatefulRemoteSubscribable<PaymentOption[]>;
    /**
     * Information about the buyer that is interacting with the checkout.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    buyerIdentity?: BuyerIdentity;
    /**
     * Provides details on the buyer's progression through the checkout.
     *
     * Refer to [buyer journey](https://shopify.dev/docs/api/checkout-ui-extensions/apis/buyer-journey#examples)
     * examples for more information.
     */
    buyerJourney: BuyerJourney;
    /**
     * Settings applied to the buyer's checkout.
     */
    checkoutSettings: StatefulRemoteSubscribable<CheckoutSettings>;
    /**
     * A stable ID that represents the current checkout.
     *
     * Matches the `token` field in the [WebPixel checkout payload](https://shopify.dev/docs/api/pixels/customer-events#checkout)
     * and the `checkout_token` field in the [REST Admin API `Order` resource](https://shopify.dev/docs/api/admin-rest/unstable/resources/order#resource-object).
     */
    checkoutToken: StatefulRemoteSubscribable<CheckoutToken | undefined>;
    /**
     * Details on the costs the buyer will pay for this checkout.
     */
    cost: CartCost;
    /**
     * A list of delivery groups containing information about the delivery of the items the customer intends to purchase.
     */
    deliveryGroups: StatefulRemoteSubscribable<DeliveryGroup[]>;
    /**
     * A list of discount codes currently applied to the checkout.
     */
    discountCodes: StatefulRemoteSubscribable<CartDiscountCode[]>;
    /**
     * Discounts that have been applied to the entire cart.
     */
    discountAllocations: StatefulRemoteSubscribable<CartDiscountAllocation[]>;
    /**
     * The meta information about the extension.
     */
    extension: Extension<Target>;
    /**
     * The identifier that specifies where in Shopify’s UI your code is being
     * injected. This will be one of the targets you have included in your
     * extension’s configuration file.
     *
     * @example 'purchase.checkout.block.render'
     * @see https://shopify.dev/docs/api/checkout-ui-extensions/unstable/extension-targets-overview
     * @see https://shopify.dev/docs/apps/app-extensions/configuration#targets
     *
     * @deprecated Deprecated as of version `2023-07`, use `extension.target` instead.
     */
    extensionPoint: Target;
    /**
     * Utilities for translating content and formatting values according to the current
     * [`localization`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/localization)
     * of the checkout.
     *
     * Refer to [`localization` examples](https://shopify.dev/docs/api/checkout-ui-extensions/apis/localization#examples)
     * for more information.
     */
    i18n: I18n;
    /**
     * A list of lines containing information about the items the customer intends to purchase.
     */
    lines: StatefulRemoteSubscribable<CartLine[]>;
    /**
     * The details about the location, language, and currency of the customer. For utilities to easily
     * format and translate content based on these details, you can use the
     * [`i18n`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/localization#standardapi-propertydetail-i18n)
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
    metafields: StatefulRemoteSubscribable<Metafield[]>;
    /**
     * A note left by the customer to the merchant, either in their cart or during checkout.
     */
    note: StatefulRemoteSubscribable<string | undefined>;
    /**
     * The method used to query the Storefront GraphQL API with a prefetched token.
     *
     * Refer to [Storefront API access examples](https://shopify.dev/docs/api/checkout-ui-extensions/apis/storefront-api) for more information.
     */
    query: <Data = unknown, Variables = Record<string, unknown>>(query: string, options?: {
        variables?: Variables;
        version?: StorefrontApiVersion;
    }) => Promise<{
        data?: Data;
        errors?: GraphQLError[];
    }>;
    /**
     * Payment options selected by the buyer.
     */
    selectedPaymentOptions: StatefulRemoteSubscribable<SelectedPaymentOption[]>;
    /**
     * The session token providing a set of claims as a signed JSON Web Token (JWT).
     *
     * The token has a TTL of 5 minutes.
     *
     * If the previous token expires, this value will reflect a new session token with a new signature and expiry.
     *
     * Refer to [session token examples](https://shopify.dev/docs/api/checkout-ui-extensions/apis/session-token) for more information.
     */
    sessionToken: SessionToken;
    /**
     * The settings matching the settings definition written in the
     * [`shopify.extension.toml`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration) file.
     *
     *  Refer to [settings examples](https://shopify.dev/docs/api/checkout-ui-extensions/apis/settings#examples) for more information.
     *
     * > Note: When an extension is being installed in the editor, the settings will be empty until
     * a merchant sets a value. In that case, this object will be updated in real time as a merchant fills in the settings.
     */
    settings: StatefulRemoteSubscribable<ExtensionSettings>;
    /**
     * The proposed customer shipping address. During the information step, the address
     * updates when the field is committed (on change) rather than every keystroke.
     * An address value is only present if delivery is required. Otherwise, the
     * subscribable value is undefined.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    shippingAddress?: StatefulRemoteSubscribable<ShippingAddress | undefined>;
    /**
     * The proposed customer billing address. The address updates when the field is
     * committed (on change) rather than every keystroke.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    billingAddress?: StatefulRemoteSubscribable<MailingAddress | undefined>;
    /** The shop where the checkout is taking place. */
    shop: Shop;
    /**
     * The key-value storage for the extension.
     *
     * It uses `localStorage` and should persist across the customer's current checkout session.
     *
     * > Caution: Data persistence isn't guaranteed and storage is reset when the customer starts a new checkout.
     *
     * Data is shared across all activated extension targets of this extension. In versions 2023-07 and earlier,
     * each activated extension target had its own storage.
     */
    storage: Storage;
    /**
     * Methods to interact with the extension’s UI.
     */
    ui: Ui;
    /**
     * The renderer version being used for the extension.
     *
     * @example 'unstable'
     */
    version: Version;
    /**
     * Customer privacy consent settings and a flag denoting if consent has previously been collected.
     */
    customerPrivacy: StatefulRemoteSubscribable<CustomerPrivacy>;
    /**
     * Allows setting and updating customer privacy consent settings and tracking consent metafields.
     *
     * > Note: Requires the [`customer_privacy` capability](https://shopify.dev/docs/api/checkout-ui-extensions/unstable/configuration#collect-buyer-consent) to be set to `true`.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    applyTrackingConsentChange: ApplyTrackingConsentChangeType;
    /**
     * The API for reading additional fields that are required in checkout under certain circumstances.
     * For example, some countries require additional fields for customs information or tax identification numbers.
     */
    localizedFields?: StatefulRemoteSubscribable<LocalizedField[]>;
}
export interface Ui {
    /**
     * Allows the extension to close an overlay programmatically.
     *
     * Supported overlay components are [Modal](/docs/api/checkout-ui-extensions/unstable/components/overlays/modal), [Sheet](/docs/api/checkout-ui-extensions/unstable/components/overlays/sheet) and [Popover](/docs/api/checkout-ui-extensions/unstable/components/overlays/popover).
     */
    overlay: Overlay;
}
interface Overlay {
    /**
     * Closes the overlay with the given ID.
     */
    close(overlayId: string): void;
}
export interface SessionToken {
    /**
     * Requests a session token that hasn't expired. You should call this method every
     * time you need to make a request to your backend in order to get a valid token.
     * This method will return cached tokens when possible, so you don’t need to worry
     * about storing these tokens yourself.
     */
    get(): Promise<string>;
}
export interface BuyerIdentity {
    /**
     * The buyer's customer account. The value is undefined if the buyer isn’t a
     * known customer for this shop or if they haven't logged in yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    customer: StatefulRemoteSubscribable<Customer | undefined>;
    /**
     * The email address of the buyer that is interacting with the cart.
     * The value is `undefined` if the app does not have access to customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    email: StatefulRemoteSubscribable<string | undefined>;
    /**
     * The phone number of the buyer that is interacting with the cart.
     * The value is `undefined` if the app does not have access to customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    phone: StatefulRemoteSubscribable<string | undefined>;
    /**
     * Provides details of the company and the company location that the business customer is purchasing on behalf of.
     * This includes information that can be used to identify the company and the company location that the business
     * customer belongs to.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    purchasingCompany: StatefulRemoteSubscribable<PurchasingCompany | undefined>;
}
/**
 * The information about a company that the business customer is purchasing on behalf of.
 */
export interface PurchasingCompany {
    /**
     * Includes information of the company that the business customer is purchasing on behalf of.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    company: Company;
    /**
     * Includes information of the company location that the business customer is purchasing on behalf of.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    location: CompanyLocation;
}
export interface Company {
    /**
     * The company ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    id: string;
    /**
     * The name of the company.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    name: string;
    /**
     * The external ID of the company that can be set by the merchant.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    externalId?: string;
}
export interface CompanyLocation {
    /**
     * The company location ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    id: string;
    /**
     * The name of the company location.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    name: string;
    /**
     * The external ID of the company location that can be set by the merchant.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    externalId?: string;
}
export interface AppliedGiftCard {
    /**
     * The last four characters of the applied gift card's code.
     */
    lastCharacters: string;
    /**
     * The amount of the applied gift card that will be used when the checkout is completed.
     */
    amountUsed: Money;
    /**
     * The current balance of the applied gift card prior to checkout completion.
     */
    balance: Money;
}
export interface Shop {
    /**
     * The shop ID.
     * @example 'gid://shopify/Shop/123'
     */
    id: string;
    /**
     * The name of the shop.
     */
    name: string;
    /**
     * The primary storefront URL.
     *
     * > Caution:
     * > As of version `2024-04` this value will no longer have a trailing slash.
     */
    storefrontUrl?: string;
    /**
     * The shop's myshopify.com domain.
     */
    myshopifyDomain: string;
}
export interface CartCost {
    /**
     * A `Money` value representing the subtotal value of the items in the cart at the current
     * step of checkout.
     */
    subtotalAmount: StatefulRemoteSubscribable<Money>;
    /**
     * A `Money` value representing the total shipping a buyer can expect to pay at the current
     * step of checkout. This value includes shipping discounts. Returns undefined if shipping
     * has not been negotiated yet, such as on the information step.
     */
    totalShippingAmount: StatefulRemoteSubscribable<Money | undefined>;
    /**
     * A `Money` value representing the total tax a buyer can expect to pay at the current
     * step of checkout or the total tax included in product and shipping prices. Returns
     * undefined if taxes are unavailable.
     */
    totalTaxAmount: StatefulRemoteSubscribable<Money | undefined>;
    /**
     * A `Money` value representing the minimum a buyer can expect to pay at the current
     * step of checkout. This value excludes amounts yet to be negotiated. For example,
     * the information step might not have delivery costs calculated.
     */
    totalAmount: StatefulRemoteSubscribable<Money>;
}
export interface CartLine {
    /**
     * These line item IDs are not stable at the moment, they might change after
     * any operations on the line items. You should always look up for an updated
     * ID before any call to `applyCartLinesChange` because you'll need the ID to
     * create a `CartLineChange` object.
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The merchandise being purchased.
     */
    merchandise: Merchandise;
    /**
     * The quantity of the merchandise being purchased.
     */
    quantity: number;
    /**
     * The details about the cost components attributed to the cart line.
     */
    cost: CartLineCost;
    /**
     * The line item additional custom attributes.
     */
    attributes: Attribute[];
    /**
     * Discounts applied to the cart line.
     */
    discountAllocations: CartDiscountAllocation[];
    /**
     * Sub lines of the merchandise line. If no sub lines are present, this will be an empty array.
     */
    lineComponents: CartLineComponentType[];
}
type CartLineComponentType = CartBundleLineComponent;
export interface CartBundleLineComponent {
    type: 'bundle';
    /**
     * A unique identifier for the bundle line component.
     *
     * This ID is not stable. If an operation updates the line items in any way, all IDs could change.
     *
     * @example 'gid://shopify/CartLineComponent/123'
     */
    id: string;
    /**
     * The merchandise of this bundle line component.
     */
    merchandise: Merchandise;
    /**
     * The quantity of merchandise being purchased.
     */
    quantity: number;
    /**
     * The cost attributed to this bundle line component.
     */
    cost: CartLineCost;
    /**
     * Additional custom attributes for the bundle line component.
     *
     * @example [{key: 'engraving', value: 'hello world'}]
     */
    attributes: Attribute[];
}
export interface CartLineCost {
    /**
     * The total amount after reductions the buyer can expect to pay that is directly attributable to a single
     * cart line.
     */
    totalAmount: Money;
}
export interface Money {
    /**
     * The price amount.
     */
    amount: number;
    /**
     * The ISO 4217 format for the currency.
     * @example 'CAD' for Canadian dollar
     */
    currencyCode: CurrencyCode;
}
export type Merchandise = ProductVariant;
export interface BaseMerchandise {
    /**
     * The merchandise ID.
     */
    id: string;
}
export interface ProductVariant extends BaseMerchandise {
    type: 'variant';
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/ProductVariant/123'
     */
    id: string;
    /**
     * The product variant’s title.
     */
    title: string;
    /**
     * The product variant's subtitle.
     */
    subtitle?: string;
    /**
     * Image associated with the product variant. This field falls back to the product
     * image if no image is available.
     */
    image?: ImageDetails;
    /**
     * List of product options applied to the variant.
     */
    selectedOptions: SelectedOption[];
    /**
     * The product object that the product variant belongs to.
     */
    product: Product;
    /**
     * Whether or not the product requires shipping.
     */
    requiresShipping: boolean;
    /**
     * The selling plan associated with the merchandise.
     */
    sellingPlan?: SellingPlan;
    /**
     * The product variant's sku.
     */
    sku?: string;
}
export interface Product {
    /**
     * A globally-unique identifier.
     */
    id: string;
    /**
     * The product’s vendor name.
     */
    vendor: string;
    /**
     * A categorization that a product can be tagged with, commonly used for filtering and searching.
     */
    productType: string;
}
export interface ImageDetails {
    /**
     * The image URL.
     */
    url: string;
    /**
     * The alternative text for the image.
     */
    altText?: string;
}
export interface SelectedOption {
    /**
     * The name of the merchandise option.
     */
    name: string;
    /**
     * The value of the merchandise option.
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
     * | `customOnsite` | A custom payment option that is processed through a checkout extension with a payments app. |
     */
    type: 'creditCard' | 'deferred' | 'local' | 'manualPayment' | 'offsite' | 'other' | 'paymentOnDelivery' | 'redeemable' | 'wallet' | 'customOnsite';
    /**
     * The unique handle for the payment option.
     *
     * This is not a globally unique identifier. It may be an identifier specific to the given checkout session or the current shop.
     */
    handle: string;
}
export type SelectedPaymentOption = PaymentOption;
export interface CartDiscountCode {
    /**
     * The code for the discount
     */
    code: string;
}
export type CartDiscountAllocation = CartCodeDiscountAllocation | CartAutomaticDiscountAllocation | CartCustomDiscountAllocation;
export interface CartDiscountAllocationBase {
    /**
     * The money amount that has been discounted from the order
     */
    discountedAmount: Money;
}
export interface CartCodeDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The code for the discount
     */
    code: string;
    /**
     * The type of the code discount
     */
    type: 'code';
}
export interface CartAutomaticDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The title of the automatic discount
     */
    title: string;
    /**
     * The type of the automatic discount
     */
    type: 'automatic';
}
export interface CartCustomDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The title of the custom discount
     */
    title: string;
    /**
     * The type of the custom discount
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
     * the buyer’s progress. The buyer typically needs to take some action
     * to resolve this issue and to move on to the next step.
     */
    behavior: 'block';
}
export type InterceptorRequest = InterceptorRequestAllow | InterceptorRequestBlock;
interface InterceptorRequestAllow {
    /**
     * Indicates that the interceptor will allow the buyer's journey to continue.
     */
    behavior: 'allow';
    /**
     * This callback is called when all interceptors finish. We recommend
     * setting errors or reasons for blocking at this stage, so that all the errors in
     * the UI show up at once.
     * @param result InterceptorResult with behavior as either 'allow' or 'block'
     */
    perform?(result: InterceptorResult): void | Promise<void>;
}
interface InterceptorRequestBlock {
    /**
     * Indicates that the interceptor will block the buyer's journey from continuing.
     */
    behavior: 'block';
    /**
     * The reason for blocking the interceptor request. This value isn't presented to
     * the buyer, so it doesn't need to be localized. The value is used only for Shopify’s
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
     * @param result InterceptorResult with behavior as either 'allow' or 'block'
     */
    perform?(result: InterceptorResult): void | Promise<void>;
}
export interface InterceptorProps {
    /**
     * Whether the interceptor has the capability to block a buyer's progress through
     * checkout. This ability might be granted by a merchant in differing checkout contexts.
     */
    canBlockProgress: boolean;
}
/**
 * A function for intercepting and preventing navigation on checkout. You can block
 * navigation by returning an object with
 * `{behavior: 'block', reason: InvalidResultReason.InvalidExtensionState, errors?: ValidationErrors[]}`.
 * If you do, then you're expected to also update some part of your UI to reflect the reason why navigation
 * was blocked, either by targeting checkout UI fields, passing errors to the page level or rendering the errors in your extension.
 */
export type Interceptor = (interceptorProps: InterceptorProps) => InterceptorRequest | Promise<InterceptorRequest>;
/**
 * Information about a customer who has previously purchased from this shop.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
 */
export interface Customer {
    /**
     * Customer ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'gid://shopify/Customer/123'
     */
    id: string;
    /**
     * The email of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    email?: string;
    /**
     * The phone number of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    phone?: string;
    /**
     * The full name of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    fullName?: string;
    /**
     * The first name of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    firstName?: string;
    /**
     * The last name of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    lastName?: string;
    /**
     * The image associated with the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    image: ImageDetails;
    /**
     * Defines if the customer email accepts marketing activities.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * > Caution: This field is deprecated and will be removed in a future version. Use `acceptsEmailMarketing` or `acceptsSmsMarketing` instead.
     *
     * @deprecated Use `acceptsEmailMarketing` or `acceptsSmsMarketing` instead.
     */
    acceptsMarketing: boolean;
    /**
     * Defines if the customer accepts email marketing activities.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    acceptsEmailMarketing: boolean;
    /**
     * Defines if the customer accepts SMS marketing activities.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    acceptsSmsMarketing: boolean;
    /**
     * The Store Credit Accounts owned by the customer and usable during the checkout process.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @private
     */
    storeCreditAccounts: StoreCreditAccount[];
    /**
     * The number of previous orders made by this customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    ordersCount: number;
}
/**
 * Settings describing the behavior of the buyer's checkout.
 */
export interface CheckoutSettings {
    /**
     * The type of order that will be created once the buyer completes checkout.
     */
    orderSubmission: 'DRAFT_ORDER' | 'ORDER';
    /**
     * Represents the merchant configured payment terms.
     */
    paymentTermsTemplate?: PaymentTermsTemplate;
    /**
     * Settings describing the behavior of the shipping address.
     */
    shippingAddress: ShippingAddressSettings;
}
/**
 * Settings describing the behavior of the shipping address.
 */
export interface ShippingAddressSettings {
    /**
     * Describes whether the buyer can ship to any address during checkout.
     */
    isEditable: boolean;
}
/**
 * Represents the payment terms template object.
 */
export interface PaymentTermsTemplate {
    /**
     * A globally-unique ID.
     * @example 'gid://shopify/PaymentTermsTemplate/1'
     */
    id: string;
    /**
     * The name of the payment terms translated to the buyer's current language. Refer to [localization.language](https://shopify.dev/docs/api/checkout-ui-extensions/apis/localization#standardapi-propertydetail-localization).
     */
    name: string;
    /**
     * The due date for net payment terms as a ISO 8601 formatted string `YYYY-MM-DDTHH:mm:ss.sssZ`.
     */
    dueDate?: string;
    /**
     * The number of days between the issued date and due date if using net payment terms.
     */
    dueInDays?: number;
}
/**
 * Information about a Store Credit Account.
 */
export interface StoreCreditAccount {
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/StoreCreditAccount/1'
     */
    id: string;
    /**
     * The current balance of the Store Credit Account.
     */
    balance: Money;
}
/**
 * The merchant-defined setting values for the extension.
 */
export type ExtensionSettings = Record<string, string | number | boolean | undefined>;
export interface Analytics {
    /**
     * Publish method to emit analytics events to [Web Pixels](https://shopify.dev/docs/apps/marketing).
     */
    publish(name: string, data: Record<string, unknown>): Promise<boolean>;
    /**
     * A method for capturing details about a visitor on the online store.
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
     * Examples are using the wrong data type or missing a required property.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It's **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
/**
 * Represents the delivery information and options available for one or
 * more cart lines.
 */
export interface DeliveryGroup {
    /**
     * The unique identifier of the delivery group. On the Thank You page this value is undefined.
     */
    id?: string;
    /**
     * The cart line references associated to the delivery group.
     */
    targetedCartLines: CartLineReference[];
    /**
     * The delivery options available for the delivery group.
     */
    deliveryOptions: DeliveryOption[];
    /**
     * The selected delivery option for the delivery group.
     */
    selectedDeliveryOption?: DeliveryOptionReference;
    /**
     * The type of the delivery group.
     */
    groupType: DeliveryGroupType;
    /**
     * Whether delivery is required for the delivery group.
     */
    isDeliveryRequired: boolean;
}
/**
 * The possible types of a delivery group.
 */
export type DeliveryGroupType = 'oneTimePurchase' | 'subscription';
/**
 * Represents a reference to a cart line.
 */
export interface CartLineReference {
    /**
     * The unique identifier of the referenced cart line.
     */
    id: string;
}
/**
 * Represents a reference to a delivery option.
 */
export interface DeliveryOptionReference {
    /**
     * The unique identifier of the referenced delivery option.
     */
    handle: string;
}
export type DeliveryOption = ShippingOption | PickupPointOption | PickupLocationOption;
/**
 * Represents a base interface for a single delivery option.
 */
export interface DeliveryOptionBase {
    /**
     * The unique identifier of the delivery option.
     */
    handle: string;
    /**
     * The title of the delivery option.
     */
    title?: string;
    /**
     * The description of the delivery option.
     */
    description?: string;
    /**
     * The code of the delivery option.
     */
    code: string;
    /**
     * The metafields associated with this delivery option.
     */
    metafields: Metafield[];
}
/**
 * Represents a delivery option that is a shipping option.
 */
export interface ShippingOption extends DeliveryOptionBase {
    /**
     * The type of this delivery option.
     */
    type: 'shipping' | 'local';
    /**
     * Information about the carrier.
     */
    carrier: ShippingOptionCarrier;
    /**
     * The cost of the delivery.
     */
    cost: Money;
    /**
     * The cost of the delivery including discounts.
     */
    costAfterDiscounts: Money;
    /**
     * Information about the estimated delivery time.
     */
    deliveryEstimate: DeliveryEstimate;
}
export interface DeliveryEstimate {
    /**
     * The estimated time in transit for the delivery in seconds.
     */
    timeInTransit?: NumberRange;
}
export interface ShippingOptionCarrier {
    /**
     * The name of the carrier.
     */
    name?: string;
}
export interface PickupPointOption extends DeliveryOptionBase {
    /**
     * The type of this delivery option.
     */
    type: 'pickupPoint';
    /**
     * Information about the carrier that ships to the pickup point.
     */
    carrier: PickupPointCarrier;
    /**
     * The cost to ship to this pickup point.
     */
    cost: Money;
    /**
     * The cost to ship to this pickup point including discounts.
     */
    costAfterDiscounts: Money;
    /**
     * The location details of the pickup point.
     */
    location: PickupPointLocation;
}
export interface PickupLocationOption extends DeliveryOptionBase {
    /**
     * The type of this delivery option.
     */
    type: 'pickup';
    /**
     * The location details of the pickup location.
     */
    location: PickupLocation;
}
interface PickupLocation {
    /**
     * The name of the pickup location.
     */
    name?: string;
    /**
     * The address of the pickup location.
     */
    address: MailingAddress;
}
interface PickupPointLocation {
    /**
     * The name of the pickup point.
     */
    name?: string;
    /**
     * The unique identifier of the pickup point.
     */
    handle: string;
    /**
     * The address of the pickup point.
     */
    address: MailingAddress;
}
interface PickupPointCarrier {
    /**
     * The code identifying the carrier.
     */
    code?: string;
    /**
     * The name of the carrier.
     */
    name?: string;
}
export interface NumberRange {
    /**
     * The lower bound of the number range.
     */
    lower?: number;
    /**
     * The upper bound of the number range.
     */
    upper?: number;
}
/**
 * Represents a DeliveryGroup with expanded reference fields and full details.
 */
export interface DeliveryGroupDetails extends DeliveryGroup {
    /**
     * The selected delivery option for the delivery group.
     */
    selectedDeliveryOption?: DeliveryOption;
    /**
     * The cart lines associated to the delivery group.
     */
    targetedCartLines: CartLine[];
}
export interface AllowedProcessing {
    /**
     * Can collect customer analytics about how the shop was used and interactions made on the shop.
     */
    analytics: boolean;
    /**
     * Can collect customer preference for marketing, attribution and targeted advertising from the merchant.
     */
    marketing: boolean;
    /**
     * Can collect customer preferences such as language, currency, size, and more.
     */
    preferences: boolean;
    /**
     * Can collect customer preference for sharing data with third parties, usually for behavioral advertising.
     */
    saleOfData: boolean;
}
export interface VisitorConsent {
    /**
     * Visitor consents to recording data to understand how customers interact with the site.
     */
    analytics?: boolean;
    /**
     * Visitor consents to ads and marketing communications based on customer interests.
     */
    marketing?: boolean;
    /**
     * Visitor consent to remembering customer preferences, such as country or language, to personalize visits to the website.
     */
    preferences?: boolean;
    /**
     * Opts the visitor out of data sharing / sales.
     */
    saleOfData?: boolean;
}
export interface TrackingConsentMetafield {
    /**
     * The name of the metafield. It must be between 3 and 30 characters in
     * length (inclusive).
     */
    key: string;
    /**
     * The information to be stored as metadata.
     *
     * @example 'any string', '', or a stringified JSON object
     */
    value: string;
}
export interface TrackingConsentMetafieldChange {
    /**
     * The name of the metafield. It must be between 3 and 30 characters in
     * length (inclusive).
     */
    key: string;
    /**
     * The information to be stored as metadata. If the value is `null`, the metafield will be deleted.
     *
     * @example 'any string', `null`, or a stringified JSON object
     */
    value: string | null;
}
export interface VisitorConsentChange extends VisitorConsent {
    /**
     * Tracking consent metafield data to be saved.
     *
     * If the value is `null`, the metafield will be deleted.
     *
     * @example `[{key: 'granularAnalytics', value: 'true'}, {key: 'granularMarketing', value: 'false'}]`
     */
    metafields?: TrackingConsentMetafieldChange[];
    type: 'changeVisitorConsent';
}
export type ApplyTrackingConsentChangeType = (visitorConsent: VisitorConsentChange) => Promise<TrackingConsentChangeResult>;
export interface CustomerPrivacyRegion {
    /**
     * The [ISO 3166 Alpha-2 format](https://www.iso.org/iso-3166-country-codes.html) for the buyer's country.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'CA' for Canada, 'US' for United States, 'GB' for Great Britain, or undefined if geolocation failed.
     */
    countryCode?: CountryCode;
    /**
     * The buyer's province code, such as state, province, prefecture, or region.
     *
     * Province codes can be found by clicking on the `Subdivisions assigned codes` column for countries listed [here](https://en.wikipedia.org/wiki/ISO_3166-2).
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'ON' for Ontario, 'ENG' for England, 'CA' for California, or undefined if geolocation failed or only the country was detected.
     */
    provinceCode?: string;
}
export interface CustomerPrivacy {
    /**
     * An object containing flags for each consent property denoting whether they can be processed based on visitor consent, merchant configuration, and user location.
     */
    allowedProcessing: AllowedProcessing;
    /**
     * Stored tracking consent metafield data.
     *
     * @example `[{key: 'analyticsType', value: 'granular'}, {key: 'marketingType', value: 'granular'}]`, or `[]`
     */
    metafields: TrackingConsentMetafield[];
    /**
     * An object containing the customer's current privacy consent settings.
     * *
     * @example `true` — the customer has actively granted consent, `false` — the customer has actively denied consent, or `undefined` — the customer has not yet made a decision.
     */
    visitorConsent: VisitorConsent;
    /**
     * Whether a consent banner should be displayed by default when the page loads. Use this as the initial open/expanded state of the consent banner.
     *
     * This is determined by the visitor's current privacy consent, the shop's [region visibility configuration](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings#add-a-cookie-banner) settings, and the region in which the visitor is located.
     */
    shouldShowBanner: boolean;
    /**
     * Whether the visitor is in a region requiring data sale opt-outs.
     */
    saleOfDataRegion: boolean;
    /**
     * Details about the visitor's current location for use in evaluating if more granular consent controls should render.
     *
     * @example `{countryCode: 'CA', provinceCode: 'ON'}` for a visitor in Ontario, Canada; `{countryCode: 'US', provinceCode: undefined}` for a visitor in the United States if geolocation fails to detect the state; or `undefined` if neither country nor province is detected or geolocation fails.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    region?: CustomerPrivacyRegion;
}
export type TrackingConsentChangeResult = TrackingConsentChangeResultSuccess | TrackingConsentChangeResultError;
/**
 * The returned result of a successful tracking consent preference update.
 */
export interface TrackingConsentChangeResultSuccess {
    /**
     * The type of the `TrackingConsentChangeResultSuccess` API.
     */
    type: 'success';
}
/**
 * The returned result of an unsuccessful tracking consent preference update
 * with a message detailing the type of error that occurred.
 */
export interface TrackingConsentChangeResultError {
    /**
     * The type of the `TrackingConsentChangeResultError` API.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
export interface CartInstructions {
    /**
     * Cart instructions related to cart attributes.
     */
    attributes: AttributesCartInstructions;
    /**
     * Cart instructions related to delivery.
     */
    delivery: DeliveryCartInstructions;
    /**
     * Cart instructions related to discounts.
     */
    discounts: DiscountsCartInstructions;
    /**
     * Cart instructions related to cart lines.
     */
    lines: CartLinesCartInstructions;
    /**
     * Cart instructions related to metafields.
     */
    metafields: MetafieldsCartInstructions;
    /**
     * Cart instructions related to notes.
     */
    notes: NotesCartInstructions;
}
export interface AttributesCartInstructions {
    /**
     * Indicates whether or not cart attributes can be updated.
     */
    canUpdateAttributes: boolean;
}
export interface DeliveryCartInstructions {
    /**
     * Indicates whether a buyer can select a custom address.
     *
     * When true, this implies extensions can update the delivery address.
     */
    canSelectCustomAddress: boolean;
}
export interface DiscountsCartInstructions {
    /**
     * Indicates whether or not discount codes can be updated.
     */
    canUpdateDiscountCodes: boolean;
}
export interface CartLinesCartInstructions {
    /**
     * Indicates whether or not new cart lines can be added.
     */
    canAddCartLine: boolean;
    /**
     * Indicates whether or not cart lines can be removed.
     */
    canRemoveCartLine: boolean;
    /**
     * Indicates whether or not cart lines can be updated.
     */
    canUpdateCartLine: boolean;
}
export interface MetafieldsCartInstructions {
    /**
     * Indicates whether or not cart metafields can be added or updated.
     */
    canSetCartMetafields: boolean;
    /**
     * Indicates whether or not cart metafields can be deleted.
     */
    canDeleteCartMetafield: boolean;
}
export interface NotesCartInstructions {
    /**
     * Indicates whether or not notes can be updated.
     */
    canUpdateNote: boolean;
}
//# sourceMappingURL=standard.d.ts.map