import type { ExtensionTarget } from '../extension-targets';
import type { ApiVersion, Capability, CurrencyCode, Timezone, Country, CountryCode, GraphQLError, StorefrontApiVersion } from '../../../shared';
import type { SubscribableSignalLike } from '../../checkout/shared';
export { ApiVersion, Capability, CurrencyCode, Timezone, Country, CountryCode, GraphQLError, StorefrontApiVersion, SubscribableSignalLike, };
/**
 * Persists key-value data across customer sessions for a specific extension target. Use storage to save preferences, dismiss states, or cached data that should survive page reloads without requiring a backend call.
 *
 * Stored data is only available to this specific app but can be shared across multiple extension targets. The storage backend is implemented with `localStorage` and data persistence isn't guaranteed.
 * @publicDocs
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
 * A language identifier following the [BCP-47 standard](https://en.wikipedia.org/wiki/IETF_language_tag).
 * @publicDocs
 */
export interface Language {
    /**
     * The [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language tag that identifies the language. This is a standardized code that may include a base language and an optional region subtag separated by a dash. For example, `'en'` represents English and `'en-US'` represents English as used in the United States. The region subtag follows the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) standard.
     *
     * @example 'en' for English, or 'en-US' for English local to United States.
     */
    isoCode: string;
}
/**
 * Translates a key from your extension's locale files into a localized string. Supports interpolation with placeholder replacements and pluralization via a `count` option.
 * @publicDocs
 */
export interface I18nTranslate {
    /**
     * This returns a translated string matching a key in a locale file.
     *
     * @example translate("banner.title")
     */
    <ReplacementType = string>(key: string, options?: {
        [placeholderKey: string]: ReplacementType | string | number;
    }): ReplacementType extends string | number ? string : (string | ReplacementType)[];
}
/**
 * Utilities for translating strings, formatting currencies, numbers, and dates according to the buyer's locale. Use the I18n API alongside the Localization API to build fully localized extensions.
 * @publicDocs
 */
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
     * Returns a localized date value. Behaves like the standard `Intl.DateTimeFormat()` and uses the buyer's locale by default.
     *
     * Learn more about [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) and its [formatting options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options).
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
/**
 * Metadata about the running extension, including its API version, target, capabilities, and editor context. Use this to read configuration details or conditionally render content based on where the extension is running.
 * @publicDocs
 */
export interface Extension<Target extends ExtensionTarget = ExtensionTarget> {
    /**
     * The API version that was set in the extension config file.
     *
     * @example '2023-04', '2023-07'
     */
    apiVersion: ApiVersion;
    /**
     * The allowed capabilities of the extension, defined in your
     * [`shopify.extension.toml`](/docs/api/customer-account-ui-extensions/{API_VERSION}/configuration) file.
     */
    capabilities: SubscribableSignalLike<Capability[]>;
    /**
     * Information about the editor where the extension is being rendered.
     *
     * The value is undefined if the extension isn't rendering in an editor.
     */
    editor?: Editor;
    /**
     * Whether your extension is currently rendered to the screen.
     *
     * Shopify might render your extension before it's visible in the UI,
     * typically to pre-render extensions that will appear on a later page.
     *
     * Your extension might also continue to run after the buyer has navigated away
     * from where it was rendered. The extension continues running so that
     * it's immediately available if the buyer navigates back.
     */
    rendered: SubscribableSignalLike<boolean>;
    /**
     * The URL to the script that started the extension target.
     */
    scriptUrl: string;
    /**
     * The identifier that specifies where in Shopify’s UI your code is being
     * injected. This will be one of the [targets](/docs/api/customer-account-ui-extensions/{API_VERSION}/configuration#targets) you have included in your
     * extension’s configuration file. For more information, refer to the [extension targets overview](/docs/api/customer-account-ui-extensions/{API_VERSION}/extension-targets-overview).
     *
     * @example 'customer-account.order-status.block.render'
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
/**
 * Information about the editor environment when an extension is rendered inside the editor. The value is `undefined` when the extension is not rendering in an editor.
 * @publicDocs
 */
export interface Editor {
    /**
     * Indicates whether the extension is rendering in the checkout editor.
     */
    type: 'checkout';
}
export type ValueOrPromise<T> = T extends PromiseLike<any> ? T : T | Promise<T>;
/**
 * A selling plan represents a recurring or deferred purchasing option for a product, such as a [subscription](/docs/apps/build/purchase-options/subscriptions), pre-order, or try-before-you-buy arrangement. Selling plans are configured by the merchant and define how and when the buyer is charged.
 * @publicDocs
 */
export interface SellingPlan {
    /**
     * A globally-unique identifier for the selling plan in the format `gid://shopify/SellingPlan/<id>`. Use this to reference the specific selling plan associated with a line item.
     *
     * @example 'gid://shopify/SellingPlan/1'
     */
    id: string;
}
/**
 * @publicDocs
 */
export interface Attribute {
    /**
     * The identifier for the attribute. Use this to distinguish between different custom attributes on a line item or order.
     *
     * @example 'engraving_text'
     */
    key: string;
    /**
     * The value associated with the attribute key. This contains the buyer-provided or app-set data for the custom attribute.
     *
     * Attribute values are always strings. If structured data was stored during
     * checkout, parse it on read with `JSON.parse()`.
     *
     * @example 'Happy Birthday!'
     */
    value: string;
}
/**
 * A mailing address associated with the order, such as a shipping or billing address.
 *
 * @publicDocs
 */
export interface MailingAddress {
    /**
     * The buyer's full name, typically a combination of first and last name. This value is `undefined` if the buyer didn't provide a name.
     *
     * @example 'John Doe'
     */
    name?: string;
    /**
     * The buyer's first name. Use this alongside `lastName` when you need to display or process name parts separately.
     *
     * @example 'John'
     */
    firstName?: string;
    /**
     * The buyer's last name. Use this alongside `firstName` when you need to display or process name parts separately.
     *
     * @example 'Doe'
     */
    lastName?: string;
    /**
     * The company or organization name associated with the address. This value is `undefined` if the buyer didn't provide a company name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Shopify'
     */
    company?: string;
    /**
     * The first line of the street address, including the street number and name.
     *
     * @example '151 O'Connor Street'
     */
    address1?: string;
    /**
     * The second line of the street address, such as an apartment number, suite, or unit. This value is `undefined` if the buyer didn't provide a second address line.
     *
     * @example 'Ground floor'
     */
    address2?: string;
    /**
     * The city, town, or village of the address.
     *
     * @example 'Ottawa'
     */
    city?: string;
    /**
     * The postal code or ZIP code of the address, used for mail sorting and delivery routing.
     *
     * @example 'K2P 2L8'
     */
    zip?: string;
    /**
     * The two-letter country code in [ISO 3166 Alpha-2](https://www.iso.org/iso-3166-country-codes.html) format.
     *
     * @example 'CA' for Canada.
     */
    countryCode?: CountryCode;
    /**
     * The province, state, prefecture, or region code of the address. The format varies by country.
     *
     * @example 'ON' for Ontario.
     */
    provinceCode?: string;
    /**
     * The phone number associated with the address, typically in international format. This value is `undefined` if the buyer didn't provide a phone number.
     *
     * @example '+1 613 111 2222'.
     */
    phone?: string;
}
/**
 * @publicDocs
 */
export interface AuthenticatedAccount {
    /**
     * The company that the authenticated B2B customer belongs to, including the company ID and location. The value is `undefined` if the customer isn't authenticated or isn't a B2B customer.
     */
    purchasingCompany: SubscribableSignalLike<PurchasingCompany | undefined>;
    /**
     * The authenticated customer's account information. The value is `undefined` if the customer isn't logged in.
     */
    customer: SubscribableSignalLike<Customer | undefined>;
}
/**
 * The authenticated customer's account, identified by a globally-unique ID.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
 * @publicDocs
 */
export interface Customer {
    /**
     * A globally-unique identifier for the customer in the format `gid://shopify/Customer/<id>`.
     *
     * @example 'gid://shopify/Customer/123'
     */
    id: string;
}
/**
 * @publicDocs
 */
export interface PurchasingCompany {
    /**
     * The company that the authenticated B2B customer is associated with.
     */
    company: Company;
    /**
     * The specific company location associated with the authenticated B2B customer. The value is `undefined` if no location is set.
     */
    location?: CompanyLocation;
}
/**
 * @publicDocs
 */
export interface Company {
    /**
     * A globally-unique identifier for the company in the format `gid://shopify/Company/<id>`.
     */
    id: string;
}
/**
 * @publicDocs
 */
export interface CompanyLocation {
    /**
     * A globally-unique identifier for the company location in the format `gid://shopify/CompanyLocation/<id>`.
     */
    id: string;
}
/**
 * Authenticates requests between your extension and your app backend. Use session tokens to verify the identity of the customer and the shop context when making server-side API calls. The token includes claims such as the customer ID, shop domain, and expiration time.
 * @publicDocs
 */
export interface SessionToken {
    /**
     * Requests a session token that hasn't expired. Call this method every
     * time you make a request to your backend to get a valid token.
     * Cached tokens are returned when possible, so you don’t need to store them yourself.
     */
    get(): Promise<string>;
}
/**
 * Tracks custom events and sends visitor information to [web pixels](/docs/apps/build/marketing-analytics/pixels). Use the Analytics API to emit analytics events from your extension, such as tracking product views, button clicks, or conversion funnels.
 * @publicDocs
 */
export interface Analytics {
    /**
     * Emit an analytics event to web pixels. The event name and data are forwarded to all registered pixels on the page.
     */
    publish(name: string, data: Record<string, unknown>): Promise<boolean>;
    /**
     * Submits visitor contact information (email or phone) to the shop backend. This data is sent to Shopify and is not propagated to web pixels on the page.
     */
    visitor(data: {
        email?: string;
        phone?: string;
    }): Promise<VisitorResult>;
}
/**
 * The result returned by `Analytics.visitor()`. Check the `type` property to determine whether the submission succeeded or failed.
 * @publicDocs
 */
export type VisitorResult = VisitorSuccess | VisitorError;
/**
 * Returned when visitor information was validated and submitted successfully.
 * @publicDocs
 */
export interface VisitorSuccess {
    /**
     * Indicates that the visitor information was validated and submitted.
     */
    type: 'success';
}
/**
 * Returned when visitor information is invalid and wasn't submitted. Contains a `message` with details about what went wrong.
 * @publicDocs
 */
export interface VisitorError {
    /**
     * Indicates that the visitor information is invalid and wasn't submitted.
     * Examples are using the wrong data type or missing a required property.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It's not localized, and therefore shouldn't be presented directly
     * to the buyer.
     */
    message: string;
}
/**
 * @publicDocs
 */
export interface AllowedProcessing {
    /**
     * Whether analytics data can be collected about how the buyer interacts with the shop, based on their consent, merchant configuration, and location.
     */
    analytics: boolean;
    /**
     * Whether marketing data can be collected for attribution, targeted advertising, and promotional communications.
     */
    marketing: boolean;
    /**
     * Whether preference data can be collected, such as the buyer's language, currency, and sizing choices.
     */
    preferences: boolean;
    /**
     * Whether data can be shared with or sold to third parties, typically for behavioral advertising purposes.
     */
    saleOfData: boolean;
}
/**
 * @publicDocs
 */
export interface VisitorConsent {
    /**
     * Whether the visitor has consented to analytics tracking. `true` means consent was granted, `false` means denied, and `undefined` means no decision has been made.
     */
    analytics?: boolean;
    /**
     * Whether the visitor has consented to marketing and targeted advertising. `true` means consent was granted, `false` means denied, and `undefined` means no decision has been made.
     */
    marketing?: boolean;
    /**
     * Whether the visitor has consented to storing preferences such as language and currency. `true` means consent was granted, `false` means denied, and `undefined` means no decision has been made.
     */
    preferences?: boolean;
    /**
     * Whether the visitor has opted out of the sale or sharing of their data with third parties. `true` means opted out, `false` means not opted out, and `undefined` means no decision has been made.
     */
    saleOfData?: boolean;
}
/**
 * @publicDocs
 */
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
/**
 * @publicDocs
 */
export interface TrackingConsentMetafieldChange {
    /**
     * The identifier for the tracking consent metafield to update.
     */
    key: string;
    /**
     * The new value to store in the metafield. Set to `null` to delete the metafield.
     */
    value: string | null;
}
/**
 * The consent change payload passed to `applyTrackingConsentChange`. Includes the visitor's updated consent decisions for analytics, marketing, preferences, and data sale, along with any custom tracking consent metafields.
 * @publicDocs
 */
export interface VisitorConsentChange extends VisitorConsent {
    /**
     * Custom tracking consent metafield data to save alongside the standard consent categories. Use metafields to store app-specific consent granularity beyond the built-in categories.
     *
     * If a metafield's value is `null`, that metafield is deleted.
     *
     * @example `[{key: 'granularAnalytics', value: 'true'}, {key: 'granularMarketing', value: 'false'}]`
     */
    metafields?: TrackingConsentMetafieldChange[];
    /**
     * The type of consent change. Always `'changeVisitorConsent'`.
     */
    type: 'changeVisitorConsent';
}
/**
 * A function that applies updated tracking consent preferences for the buyer. Accepts a `VisitorConsentChange` object containing the buyer's consent decisions and returns a promise that resolves with a `TrackingConsentChangeResult` indicating whether the update succeeded or failed.
 * @publicDocs
 */
export type ApplyTrackingConsentChangeType = (visitorConsent: VisitorConsentChange) => Promise<TrackingConsentChangeResult>;
/**
 * @publicDocs
 */
export interface CustomerPrivacyRegion {
    /**
     * The buyer's country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. The value is `undefined` if geolocation failed.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'CA' for Canada, 'US' for United States, 'GB' for Great Britain, or undefined if geolocation failed.
     */
    countryCode?: CountryCode;
    /**
     * The buyer's province, state, or region code in [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) format. The value is `undefined` if geolocation failed or only the country was detected.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'ON' for Ontario, 'ENG' for England, 'CA' for California, or undefined if geolocation failed or only the country was detected.
     */
    provinceCode?: string;
}
/**
 * @publicDocs
 */
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
     * The visitor's current privacy consent decisions for each category.
     * @example `true` — the customer has actively granted consent, `false` — the customer has actively denied consent, or `undefined` — the customer hasn't yet made a decision.
     */
    visitorConsent: VisitorConsent;
    /**
     * Whether a consent banner should be displayed when the page loads. This is determined by the visitor's current consent state, the merchant's [region visibility settings](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings#add-a-cookie-banner), and the visitor's geographic location. Use this as the initial visibility state for your consent banner UI.
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
     * Requires level 1 access to protected customer data. `undefined` without
     * that access. Regional compliance logic can't run without it.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    region?: CustomerPrivacyRegion;
}
/**
 * The result returned by `applyTrackingConsentChange`. Either a `TrackingConsentChangeResultSuccess` if the consent preferences were saved, or a `TrackingConsentChangeResultError` if the update failed.
 * @publicDocs
 */
export type TrackingConsentChangeResult = TrackingConsentChangeResultSuccess | TrackingConsentChangeResultError;
/**
 * Returned when the tracking consent update succeeds. Check the `type` property to confirm the result before proceeding.
 * @publicDocs
 */
export interface TrackingConsentChangeResultSuccess {
    /**
     * The result type. Always `'success'` for a successful consent update.
     */
    type: 'success';
}
/**
 * Returned when the tracking consent update fails. Contains an error `message` with details about what went wrong.
 * @publicDocs
 */
export interface TrackingConsentChangeResultError {
    /**
     * The result type. Always `'error'` for a failed consent update.
     */
    type: 'error';
    /**
     * A developer-facing message explaining why the consent update failed. This message isn't localized and shouldn't be displayed directly to the buyer.
     */
    message: string;
}
/**
 * A handle returned by `ToastApi.show()`. Call `hide()` to dismiss the toast notification programmatically.
 * @publicDocs
 */
export interface ToastApiResult {
    /**
     * Dismisses the toast notification.
     */
    hide: () => void;
}
/**
 * Displays brief, non-blocking notification messages to the customer. Use the Toast API to confirm successful actions, report errors, or surface contextual feedback without interrupting the customer workflow.
 * @publicDocs
 */
export interface ToastApi {
    /**
     * Show a toast notification with the given message. Returns a handle with a `hide()` method to dismiss the toast programmatically.
     */
    show: (content: string) => Promise<ToastApiResult>;
}
/**
 * Options for URL-based invocations.
 *
 * When invoking via URL syntax, `action` and `type` are parsed from the
 * string. This companion type captures the remaining optional fields that can
 * be provided alongside the URL.
 * @publicDocs
 */
export interface IntentQueryOptions {
    /**
     * The resource identifier for edit actions (such as `gid://shopify/SubscriptionContract/123`).
     */
    value?: string;
    /**
     * Optional input payload passed to the intent. Used to seed forms or supply parameters. The accepted shape is intent-specific. For example, replacing a payment method on a subscription contract requires `{ field: 'paymentMethod' }`.
     */
    data?: Record<string, unknown>;
}
/**
 * Allowed actions that can be performed by an intent.
 *
 * Common actions include:
 * - `'create'`: Initiate creation of a new resource.
 * - `'open'`: Modify an existing resource.
 * @publicDocs
 */
export type IntentAction = 'create' | 'open' | string;
/**
 * Structured description of an intent to invoke.
 *
 * Use this object form when programmatically composing an intent at runtime.
 * It pairs an action (verb) with a resource type and optional inputs.
 * @publicDocs
 */
export interface IntentQuery extends IntentQueryOptions {
    /**
     * Verb describing the operation to perform on the target resource.
     *
     * Common values include `create` and `open`. The set of
     * allowed verbs is intent-specific; unknown verbs will fail validation.
     */
    action: IntentAction;
    /**
     * The resource type (such as `shopify/SubscriptionContract`).
     */
    type: string;
}
/**
 * Successful intent completion.
 *
 * - `code` is always `'ok'`
 * - `data` contains the output payload
 * @publicDocs
 */
export interface SuccessIntentResponse {
    /**
     * Always `'ok'` for a successful response.
     */
    code: 'ok';
    /**
     * Validated output payload produced by the workflow.
     *
     * The shape is intent-specific. Consumers should narrow by `code === 'ok'` before accessing.
     */
    data: Record<string, unknown>;
}
/**
 * Failed intent completion.
 *
 * - `code` is always `'error'`
 * - `message` summarizes the failure
 * - `issues` optionally provides structured details for validation or
 *   field-specific problems following the Standard Schema convention
 *
 * @publicDocs
 */
export interface ErrorIntentResponse {
    /**
     * Set to `'error'` when present. This property is optional.
     */
    code?: 'error';
    /**
     * A human-readable summary of the failure.
     */
    message?: string;
    /**
     * Structured details for validation or field-specific problems, following the Standard Schema convention.
     */
    issues?: {
        /**
         * The path to the field with the issue.
         */
        path?: string[];
        /**
         * The error message for the issue.
         */
        message?: string;
    }[];
}
/**
 * User dismissed or closed the workflow without completing it.
 *
 * Distinct from `error`: no failure occurred, the activity was simply
 * abandoned by the user.
 * @publicDocs
 */
export interface ClosedIntentResponse {
    /**
     * Always `'closed'` when the user dismissed the workflow without completing it.
     */
    code: 'closed';
}
/**
 * Result of an intent activity.
 *
 * Discriminated union representing all possible completion outcomes for an
 * invoked intent.
 * @publicDocs
 */
export type IntentResponse = SuccessIntentResponse | ErrorIntentResponse | ClosedIntentResponse;
/**
 * Activity handle for tracking intent workflow progress.
 * @publicDocs
 */
export interface IntentActivity {
    /**
     * A Promise that resolves when the intent workflow completes, returning the response.
     */
    complete: Promise<IntentResponse>;
}
/**
 * Invokes built-in Shopify workflows for managing customer account resources. Use the Intents API to trigger native Shopify modals and flows, such as replacing a payment method on a subscription contract, without building the UI yourself.
 *
 * Intents pair an `action` (verb) with a resource `type` and optional `value`
 * and `data` to request a workflow.
 * @publicDocs
 */
export interface Intents {
    /**
     * Triggers a built-in Shopify workflow by passing a structured intent object. Specify an `action` (such as `'open'`), a resource `type`, and an optional `value` identifying the resource. Returns a promise that resolves to an `IntentActivity` you can use to track completion.
     *
     * @param query - Structured intent description, including `action` and `type`.
     * @returns A promise for an {@link IntentActivity} that completes with an
     *          {@link IntentResponse}.
     *
     * @example
     * ```javascript
     * const activity = await shopify.intents.invoke(
     *   {
     *     action: 'open',
     *     type: 'shopify/SubscriptionContract',
     *     value: 'gid://shopify/SubscriptionContract/69372608568',
     *     data: { field: 'paymentMethod' },
     *   }
     * );
     * ```
     */
    invoke(query: IntentQuery): Promise<IntentActivity>;
    /**
     * Triggers a built-in Shopify workflow using a URL string in the format `action:type[,value][?params]`. Use this overload when composing intents from dynamic strings rather than structured objects.
     *
     * @param intentURL - Intent in URL form, such as `'open:shopify/SubscriptionContract,gid://shopify/SubscriptionContract/123'`.
     * @param options - Optional supplemental inputs such as `value` or `data`.
     * @returns A promise for an {@link IntentActivity} that completes with an
     *          {@link IntentResponse}.
     *
     * @example
     * ```javascript
     * // Using query string syntax
     * const activity = await shopify.intents.invoke('open:shopify/SubscriptionContract,gid://shopify/SubscriptionContract/69372608568?field=paymentMethod');
     *
     * // Or using a query string and options
     * const activity = await shopify.intents.invoke(
     *   'open:shopify/SubscriptionContract',
     *   {
     *    value: 'gid://shopify/SubscriptionContract/69372608568',
     *    data: { field: 'paymentMethod' },
     *   }
     * );
     * const response = await activity.complete;
     * ```
     */
    invoke(intentURL: string, options?: IntentQueryOptions): Promise<IntentActivity>;
}
//# sourceMappingURL=shared.d.ts.map