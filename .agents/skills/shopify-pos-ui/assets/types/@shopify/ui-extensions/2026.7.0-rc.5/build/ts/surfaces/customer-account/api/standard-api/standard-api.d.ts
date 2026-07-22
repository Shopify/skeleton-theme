import { Extension, I18n, Storage, Language, Country, AuthenticatedAccount, GraphQLError, StorefrontApiVersion, SessionToken, Analytics, CustomerPrivacy, ApplyTrackingConsentChangeType, ToastApi, Intents, SubscribableSignalLike } from '../shared';
import type { ExtensionTarget } from '../../extension-targets';
/**
 * The merchant-defined setting values for the extension.
 * @publicDocs
 */
export interface ExtensionSettings {
    [key: string]: string | number | boolean | undefined;
}
/**
 * The following APIs are provided to all extension targets.
 * @publicDocs
 */
export interface StandardApi<Target extends ExtensionTarget = ExtensionTarget> {
    /**
     * The identifier that specifies where in Shopify’s UI your code is being
     * injected. This will be one of the [targets](/docs/api/customer-account-ui-extensions/{API_VERSION}/configuration#targets) you have included in your
     * extension’s configuration file. For more information, refer to the [extension targets overview](/docs/api/customer-account-ui-extensions/{API_VERSION}/extension-targets-overview).
     *
     * @example 'customer-account.order-status.block.render'
     *
     * @deprecated Use `extension.target` instead.
     */
    extensionPoint: Target;
    /**
     * Metadata about the extension, including its target, version, and editor context. Use this to conditionally render content based on where the extension is running.
     */
    extension: Extension;
    /**
     * The logged-in customer's account information, including their customer ID and B2B company details. Use this to personalize your extension based on who is viewing the page.
     */
    authenticatedAccount: AuthenticatedAccount;
    /**
     * The API version your extension is running against. Use this to conditionally enable features or handle breaking changes when your extension supports multiple API versions.
     *
     * @example 'unstable'
     */
    version: Version;
    /**
     * The buyer's language, country, and locale context. Use this to adapt your extension to the buyer's region and display localized content.
     */
    localization: Localization;
    /**
     * Utilities for translating strings, formatting currencies, numbers, and dates according to the buyer's locale. Use this alongside `localization` to build fully localized extensions.
     */
    i18n: I18n;
    /**
     * Key-value storage that persists across customer sessions for this extension target. Use this to store preferences, dismiss states, or cached data without requiring a backend call.
     */
    storage: Storage;
    /**
     * Authenticates requests between your extension and your app backend. Call `get()` to retrieve a signed JWT containing the customer ID, shop domain, and expiration time, then verify it server-side. For more information, refer to the [Session Token API](/docs/api/customer-account-ui-extensions/{API_VERSION}/target-apis/platform-apis/session-token-api).
     */
    sessionToken: SessionToken;
    /**
     * Tracks custom events and sends visitor information to [web pixels](/docs/apps/build/marketing-analytics/pixels). Use `publish()` to emit events and `visitor()` to submit visitor data.
     *
     * > Note: Requires [connecting a third-party domain](https://help.shopify.com/en/manual/domains/add-a-domain/connecting-domains/connect-domain-customer-account) to Shopify for your customer account pages.
     */
    analytics: Analytics;
    /**
     * Invokes built-in Shopify workflows for managing customer account resources. Use intents to trigger native modals and flows, such as replacing a payment method on a subscription contract, without building the UI yourself.
     */
    intents: Intents;
    /**
     * Merchant-defined configuration values for your extension, as specified in the [settings definition](/docs/api/customer-account-ui-extensions/{API_VERSION}/configuration#settings-definition) of your `shopify.extension.toml` file. Settings update in real time as merchants edit them in the extension editor. The value is empty until a merchant sets it.
     */
    settings: SubscribableSignalLike<ExtensionSettings>;
    /**
     * Displays brief, non-blocking messages at the bottom of the page to confirm actions or report errors. Use noun + past tense verb format (for example, `Changes saved`). For persistent messages, use a [Banner](/docs/api/customer-account-ui-extensions/{API_VERSION}/ui-components/feedback-and-status-indicators/banner) component instead.
     */
    toast: ToastApi;
    /**
     * Queries the [Storefront GraphQL API](/docs/api/storefront) directly from your extension using a prefetched token. Use this to fetch product data, collection details, or other storefront information without routing requests through your app backend.
     *
     * Requires the [`api_access` capability](/docs/api/customer-account-ui-extensions/{API_VERSION}/configuration#api-access).
     */
    query: <Data = unknown, Variables = {
        [key: string]: unknown;
    }>(query: string, options?: {
        variables?: Variables;
        version?: StorefrontApiVersion;
    }) => Promise<{
        data?: Data;
        errors?: GraphQLError[];
    }>;
    /**
     * The buyer's current privacy consent settings, including their consent decisions for analytics, marketing, and data sale, whether a consent banner should be displayed, and whether the buyer is in a region that requires specific opt-out controls. Use this to read the buyer's consent state and determine how to display privacy-related UI.
     */
    customerPrivacy: SubscribableSignalLike<CustomerPrivacy>;
    /**
     * Applies updated tracking consent preferences for the buyer, including their decisions for analytics, marketing, and data sale, along with any custom tracking consent [metafields](/docs/apps/build/custom-data/metafields). Returns a promise that resolves with the result of the consent update.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires the [`collect_buyer_consent` capability](/docs/apps/build/customer-accounts/capabilities#collect-buyer-consent) and access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    applyTrackingConsentChange: ApplyTrackingConsentChangeType;
}
/**
 * @publicDocs
 */
export interface CompanyLocationApi {
    locationId: string;
}
/**
 * @publicDocs
 */
export interface FulfillmentApi {
    /**
     * Id of a single fulfillment.
     */
    fulfillmentId: string;
}
/**
 * @publicDocs
 */
export interface ReturnApi {
    /**
     * Id of a single return.
     */
    returnId: string;
}
/**
 * @publicDocs
 */
export interface OrderApi {
    orderId: string;
}
/**
 * The buyer's language, country, and locale context in customer accounts. Properties on this interface are subscribable and update automatically when the buyer changes their country.
 * @publicDocs
 */
export interface Localization {
    /**
     * The language the buyer sees in the customer account hub.
     */
    language: SubscribableSignalLike<Language>;
    /**
     * The buyer's language, as supported by the extension. If the buyer's actual language isn't supported, this falls back to the closest match or the extension's default locale (the one matching your `.default.json` file).
     *
     * For example, if the buyer's language is `'fr-CA'` but your extension only supports `'fr'`, then `isoCode` is `'fr'`. If your extension doesn't provide French translations at all, this returns the default locale.
     */
    extensionLanguage: SubscribableSignalLike<Language>;
    /**
     * The buyer's country in customer accounts. Updates automatically if the buyer changes their country. The value is `undefined` if the country is unknown.
     */
    country: SubscribableSignalLike<Country | undefined>;
}
/**
 * An enumerated value representing the type of navigation.
 * @publicDocs
 */
export type NavigationTypeString = 'push' | 'replace' | 'traverse';
/**
 * Options passed to `Navigation.navigate()` to control history behavior and attach state to the navigation entry.
 * @publicDocs
 */
export interface NavigationNavigateOptions {
    /**
     * Developer-defined information to be stored in the associated NavigationHistoryEntry once the navigation is complete, retrievable via getState().
     */
    state?: unknown;
    /**
     * An enumerated value that sets the history behavior of this navigation.
     */
    history: 'auto' | 'push' | 'replace';
}
/**
 * A single entry in the navigation history stack. Each entry has a unique key, a URL, and optional developer-defined state.
 * @publicDocs
 */
export interface NavigationHistoryEntry {
    /**
     * A unique, platform-generated identifier for this entry's position in the history stack. This value identifies the slot, not the content.
     */
    key: string;
    /**
     * The URL associated with this history entry, or `null` if unavailable.
     */
    url: string | null;
    /**
     * Returns a clone of the developer-defined state associated with this history entry.
     */
    getState(): unknown;
}
/**
 * Options for `Navigation.updateCurrentEntry()`. Use this to update the state of the current history entry without triggering a navigation.
 * @publicDocs
 */
export interface NavigationUpdateCurrentEntryOptions {
    /**
     * Developer-defined state to associate with the current navigation history entry.
     */
    state: unknown;
}
/**
 * The event object passed to `currententrychange` listeners when the current navigation entry changes.
 * @publicDocs
 */
export interface NavigationCurrentEntryChangeEvent {
    /**
     * The type of navigation that caused the change: `'push'`, `'replace'`, or `'traverse'`.
     */
    navigationType?: NavigationTypeString;
    /**
     * The history entry the buyer navigated away from.
     */
    from: NavigationHistoryEntry;
}
/**
 * Navigates between pages in customer accounts, including other extensions and host pages. Full-page extensions also get access to the current navigation entry and history state.
 * @publicDocs
 */
export interface Navigation {
    /**
     * Navigates to a URL, updating any provided state in the history entries list. Supports [custom protocols](/docs/api/customer-account-ui-extensions/{API_VERSION}#custom-protocols) for navigating within customer accounts.
     */
    navigate: NavigateFunction;
    /**
     * The current navigation history entry, representing the page the buyer is viewing. Only available in full-page extensions.
     */
    currentEntry: NavigationHistoryEntry;
    /**
     * Updates the state of the current history entry without triggering a navigation. Use this when the state change is independent of a page transition, such as saving form progress.
     */
    updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void;
    /**
     * Registers a listener that fires whenever the current navigation entry changes, such as when the buyer navigates to a different page.
     */
    addEventListener(type: 'currententrychange', cb: (event: NavigationCurrentEntryChangeEvent) => void): void;
    /**
     * Removes a previously registered `currententrychange` listener.
     */
    removeEventListener(type: 'currententrychange', cb: (event: NavigationCurrentEntryChangeEvent) => void): void;
}
/**
 * A callable function that navigates to a URL within customer accounts. Accepts a destination URL and optional navigation options.
 * @publicDocs
 */
export interface NavigateFunction {
    /**
     * Navigates to a specific URL, updating any provided state in the history entries list.
     * @param url The destination URL to navigate to.
     */
    (url: string, options?: NavigationNavigateOptions): void;
}
/**
 * The API version string your extension is running against, such as `'2026-04-rc'` or `'unstable'`.
 * @publicDocs
 */
export type Version = string;
//# sourceMappingURL=standard-api.d.ts.map