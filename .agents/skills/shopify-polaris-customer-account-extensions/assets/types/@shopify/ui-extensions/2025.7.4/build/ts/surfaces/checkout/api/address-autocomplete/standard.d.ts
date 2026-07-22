import type { Analytics, AppMetafieldEntry, Capability, CheckoutToken, Currency, Editor, ExtensionSettings, I18n, Language, Market, Metafield, SessionToken, Shop, Storage, Version } from '../standard/standard';
import type { Attribute, MailingAddress } from '../shared';
import type { ApiVersion, Country, GraphQLError, StorefrontApiVersion, Timezone } from '../../../../shared';
export interface AddressAutocompleteStandardApi<Target extends 'purchase.address-autocomplete.suggest' | 'purchase.address-autocomplete.format-suggestion'> {
    /**
     * The metafields requested in the
     * [`shopify.extension.toml`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration)
     * file. These metafields are updated when there's a change in the merchandise items
     * being purchased by the customer.
     *
     * App owned metafields are supported and are returned using the `$app` format. The fully qualified reserved namespace format such as `app--{your-app-id}[--{optional-namespace}]` is not supported. See [app owned metafields](/docs/apps/build/custom-data/ownership#reserved-prefixes) for more information.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * > Tip:
     * > Cart metafields are only available on carts created via the Storefront API version `2023-04` or later.*
     */
    appMetafields: AppMetafieldEntry[];
    /**
     * The methods for interacting with [Web Pixels](https://shopify.dev/docs/apps/marketing), such as emitting an event.
     */
    analytics: Analytics;
    /**
     * The custom attributes left by the customer to the merchant, either in their cart or during checkout.
     */
    attributes: Attribute[] | undefined;
    /**
     * The proposed customer billing address. The address updates when the field is
     * committed (on change) rather than every keystroke.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    billingAddress?: MailingAddress | undefined;
    /**
     * A stable ID that represents the current checkout.
     *
     * Matches the `token` field in the [WebPixel checkout payload](https://shopify.dev/docs/api/pixels/customer-events#checkout)
     * and the `checkout_token` field in the [REST Admin API `Order` resource](https://shopify.dev/docs/api/admin-rest/unstable/resources/order#resource-object).
     */
    checkoutToken: CheckoutToken | undefined;
    /**
     * The meta information about the extension.
     */
    extension: Extension<Target>;
    /**
     * Utilities for translating content and formatting values according to the current
     * [`localization`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/localization)
     * Type 'RunnableExtensionInstance<keyof RunnableExtensionTargets>' is not assignable to type 'ExtensionInstance<Target>'.
     *
     * Refer to [`localization` examples](https://shopify.dev/docs/api/checkout-ui-extensions/apis/localization#examples)
     * for more information.
     */
    i18n: I18n;
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
     * They are shared by all extensions running on checkout, and
     * persist for as long as the customer is working on this checkout.
     *
     * Once the order is created, you can query these metafields using the
     * [GraphQL Admin API](https://shopify.dev/docs/admin-api/graphql/reference/orders/order#metafield-2021-01)
     */
    metafields: Metafield[];
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
     * > Note: The settings are empty when an extension is being installed in the [checkout editor](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-editor).
  
     */
    settings: ExtensionSettings;
    /**
     * The proposed customer shipping address. During the information step,
     * the address updates when the field is committed (on change) rather than every keystroke.
     *
     * > Note: An address value is only present if delivery is required. Otherwise, the subscribable value is undefined.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    shippingAddress?: MailingAddress | undefined;
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
     * The runner version being used for the extension.
     *
     * @example 'unstable'
     */
    version: Version;
}
interface Extension<Target extends 'purchase.address-autocomplete.suggest' | 'purchase.address-autocomplete.format-suggestion'> {
    /**
     * The API version that was set in the extension config file.
     *
     * @example '2023-07', '2023-10', '2024-01', '2024-04', 'unstable'
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
    capabilities: Capability[];
    /**
     * The information about the editor where the extension is being rendered.
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
     *
     * If the extension is not capable of rendering UI components, then the value will always be false.
     */
    rendered: boolean;
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
interface Localization {
    /**
     * The currency that the customer sees for money amounts in the checkout.
     */
    currency: Currency;
    /**
     * The buyer’s time zone.
     */
    timezone: Timezone;
    /**
     * The language the customer sees in the checkout.
     */
    language: Language;
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
    extensionLanguage: Language;
    /**
     * The country context of the checkout. This value carries over from the
     * context of the cart, where it was used to contextualize the storefront
     * experience. If the country is unknown, then the value is undefined.
     */
    country: Country | undefined;
    /**
     * The [market](https://shopify.dev/docs/apps/markets) context of the
     * checkout. This value carries over from the context of the cart, where it
     * was used to contextualize the storefront experience. If the market is unknown,
     * then the value is undefined.
     */
    market: Market | undefined;
}
export {};
//# sourceMappingURL=standard.d.ts.map