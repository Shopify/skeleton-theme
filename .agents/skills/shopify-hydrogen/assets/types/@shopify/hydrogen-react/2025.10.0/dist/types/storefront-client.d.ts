export type StorefrontClientProps = {
    /** The host name of the domain (eg: `{shop}.myshopify.com`). */
    storeDomain?: string;
    /** The Storefront API delegate access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) and [delegate access token](https://shopify.dev/apps/auth/oauth/delegate-access-tokens) documentation for more details. */
    privateStorefrontToken?: string;
    /** The Storefront API access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) documentation for more details. */
    publicStorefrontToken?: string;
    /** The Storefront API version. This should almost always be the same as the version Hydrogen React was built for. Learn more about Shopify [API versioning](https://shopify.dev/api/usage/versioning) for more details.  */
    storefrontApiVersion?: string;
    /**
     * Customizes which `"content-type"` header is added when using `getPrivateTokenHeaders()` and `getPublicTokenHeaders()`. When fetching with a `JSON.stringify()`-ed `body`, use `"json"`. When fetching with a `body` that is a plain string, use `"graphql"`. Defaults to `"json"`
     *
     * Can also be customized on a call-by-call basis by passing in `'contentType'` to both `getPrivateTokenHeaders({...})` and `getPublicTokenHeaders({...})`, for example: `getPublicTokenHeaders({contentType: 'graphql'})`
     */
    contentType?: 'json' | 'graphql';
};
/**
 * The `createStorefrontClient()` function creates helpers that enable you to quickly query the Shopify Storefront API.
 *
 * When used on the server, it is recommended to use the `privateStorefrontToken` prop. When used on the client, it is recommended to use the `publicStorefrontToken` prop.
 */
export declare function createStorefrontClient({ storeDomain, privateStorefrontToken, publicStorefrontToken, storefrontApiVersion, contentType, }: StorefrontClientProps): StorefrontClientReturn;
export declare function getPublicTokenHeadersRaw(contentType: 'graphql' | 'json', storefrontApiVersion: string, accessToken: string): {
    'content-type': string;
    'X-SDK-Variant': string;
    'X-SDK-Variant-Source': string;
    'X-SDK-Version': string;
    'X-Shopify-Storefront-Access-Token': string;
};
type OverrideTokenHeaderProps = Partial<Pick<StorefrontClientProps, 'contentType'>>;
type StorefrontClientReturn = {
    /**
     * Creates the fully-qualified URL to your myshopify.com domain.
     *
     * By default, it will use the config you passed in when calling `createStorefrontClient()`. However, you can override the following settings on each invocation of `getShopifyDomain({...})`:
     *
     * - `storeDomain`
     */
    getShopifyDomain: (props?: Partial<Pick<StorefrontClientProps, 'storeDomain'>>) => string;
    /**
     * Creates the fully-qualified URL to your store's GraphQL endpoint.
     *
     * By default, it will use the config you passed in when calling `createStorefrontClient()`. However, you can override the following settings on each invocation of `getStorefrontApiUrl({...})`:
     *
     * - `storeDomain`
     * - `storefrontApiVersion`
     */
    getStorefrontApiUrl: (props?: Partial<Pick<StorefrontClientProps, 'storeDomain' | 'storefrontApiVersion'>>) => string;
    /**
     * Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. This method uses the private Server-to-Server token which reduces the chance of throttling but must not be exposed to clients. Server-side calls should prefer using this over `getPublicTokenHeaders()`.
     *
     * By default, it will use the config you passed in when calling `createStorefrontClient()`. However, you can override the following settings on each invocation of `getPrivateTokenHeaders({...})`:
     *
     * - `contentType`
     * - `privateStorefrontToken`
     * - `buyerIp`
     *
     * Note that `contentType` defaults to what you configured in `createStorefrontClient({...})` and defaults to `'json'`, but a specific call may require using `graphql`. When using `JSON.stringify()` on the `body`, use `'json'`; otherwise, use `'graphql'`.
     */
    getPrivateTokenHeaders: (props?: OverrideTokenHeaderProps & Pick<StorefrontClientProps, 'privateStorefrontToken'> & {
        /**
         * The client's IP address. Passing this to the Storefront API when using a server-to-server token will help improve your store's analytics data.
         */
        buyerIp?: string;
    }) => Record<string, string>;
    /**
     * Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. This method uses the public token which increases the chance of throttling but also can be exposed to clients. Server-side calls should prefer using `getPublicTokenHeaders()`.
     *
     * By default, it will use the config you passed in when calling `createStorefrontClient()`. However, you can override the following settings on each invocation of `getPublicTokenHeaders({...})`:
     *
     * - `contentType`
     * - `publicStorefrontToken`
     *
     * Note that `contentType` defaults to what you configured in `createStorefrontClient({...})` and defaults to `'json'`, but a specific call may require using `graphql`. When using `JSON.stringify()` on the `body`, use `'json'`; otherwise, use `'graphql'`.
     */
    getPublicTokenHeaders: (props?: OverrideTokenHeaderProps & Pick<StorefrontClientProps, 'publicStorefrontToken'>) => Record<string, string>;
};
export {};
