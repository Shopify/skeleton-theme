type UseShopifyCookiesOptions = CoreShopifyCookiesOptions & {
    /**
     * If set to `false`, Shopify cookies will be removed.
     * If set to `true`, Shopify unique user token cookie will have cookie expiry of 1 year.
     * Defaults to false.
     **/
    hasUserConsent?: boolean;
    /**
     * The domain scope of the cookie. Defaults to empty string.
     **/
    domain?: string;
    /**
     * The checkout domain of the shop. Defaults to empty string. If set, the cookie domain will check if it can be set with the checkout domain.
     */
    checkoutDomain?: string;
    /**
     * If set to `true`, it skips modifying the deprecated shopify_y and shopify_s cookies.
     */
    ignoreDeprecatedCookies?: boolean;
};
/**
 * Sets the `shopify_y` and `shopify_s` cookies in the browser based on user consent
 * for backward compatibility support.
 *
 * If `fetchTrackingValues` is true, it makes a request to Storefront API
 * to fetch or refresh Shopiy analytics and marketing cookies and tracking values.
 * Generally speaking, this should only be needed if you're not using Hydrogen's
 * built-in analytics components and hooks that already handle this automatically.
 * For example, set it to `true` if you are using `hydrogen-react` only with
 * a different framework and still need to make a same-domain request to
 * Storefront API to set cookies.
 *
 * If `ignoreDeprecatedCookies` is true, it skips setting the deprecated cookies entirely.
 * Useful when you only want to use the newer tracking values and not rely on the deprecated ones.
 *
 * @returns `true` when cookies are set and ready.
 */
export declare function useShopifyCookies(options?: UseShopifyCookiesOptions): boolean;
type CoreShopifyCookiesOptions = {
    storefrontAccessToken?: string;
    fetchTrackingValues?: boolean;
    checkoutDomain?: string;
};
export {};
