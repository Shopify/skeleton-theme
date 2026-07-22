import { type ReactNode } from 'react';
import type { LanguageCode, CountryCode } from './storefront-api-types.js';
export declare const defaultShopifyContext: ShopifyContextValue;
/**
 * The `<ShopifyProvider/>` component enables use of the `useShop()` hook. The component should wrap your app.
 */
export declare function ShopifyProvider({ children, ...shopifyConfig }: ShopifyProviderProps): JSX.Element;
/**
 * Provides access to the `shopifyConfig` prop of `<ShopifyProvider/>`. Must be a descendent of `<ShopifyProvider/>`.
 */
export declare function useShop(): ShopifyContextValue;
export interface ShopifyProviderBase {
    /** The globally-unique identifier for the Shop */
    storefrontId?: string;
    /** The full domain of your Shopify storefront URL (eg: the complete string of `{subdomain}.myshopify.com`). */
    storeDomain: string;
    /** The Storefront API public access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) documentation for more details. */
    storefrontToken: string;
    /** The Storefront API version. This should almost always be the same as the version Hydrogen React was built for. Learn more about Shopify [API versioning](https://shopify.dev/api/usage/versioning) for more details.  */
    storefrontApiVersion: string;
    /**
     * The code designating a country, which generally follows ISO 3166-1 alpha-2 guidelines. If a territory doesn't have a country code value in the `CountryCode` enum, it might be considered a subdivision of another country. For example, the territories associated with Spain are represented by the country code `ES`, and the territories associated with the United States of America are represented by the country code `US`.
     */
    countryIsoCode: CountryCode;
    /**
     * `ISO 369` language codes supported by Shopify.
     */
    languageIsoCode: LanguageCode;
    /**
     * Uses the current window.location.origin for Storefront API requests.
     * This requires setting up a proxy for Storefront API requests in your domain.
     */
    sameDomainForStorefrontApi?: boolean;
}
/**
 * Shopify-specific values that are used in various Hydrogen React components and hooks.
 */
export interface ShopifyProviderProps extends ShopifyProviderBase {
    /** React children to render. */
    children?: ReactNode;
}
export interface ShopifyContextValue extends ShopifyProviderBase, ShopifyContextReturn {
}
type ShopifyContextReturn = {
    /**
     * Creates the fully-qualified URL to your store's GraphQL endpoint.
     *
     * By default, it will use the config you passed in when creating `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getStorefrontApiUrl({...})`:
     *
     * - `storeDomain`
     * - `storefrontApiVersion`
     */
    getStorefrontApiUrl: (props?: GetStorefrontApiUrlProps) => string;
    /**
     * Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. This uses the public Storefront API token.
     *
     * By default, it will use the config you passed in when creating `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getPublicTokenHeaders({...})`:
     *
     * - `contentType`
     * - `storefrontToken`
     *
     */
    getPublicTokenHeaders: (props: GetPublicTokenHeadersProps) => Record<string, string>;
    /**
     * Creates the fully-qualified URL to your myshopify.com domain.
     *
     * By default, it will use the config you passed in when calling `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getShopifyDomain({...})`:
     *
     * - `storeDomain`
     */
    getShopifyDomain: (props?: GetShopifyDomainProps) => string;
};
type GetStorefrontApiUrlProps = {
    /** The host name of the domain (eg: `{shop}.myshopify.com`). */
    storeDomain?: string;
    /** The Storefront API version. This should almost always be the same as the version Hydrogen-UI was built for. Learn more about Shopify [API versioning](https://shopify.dev/api/usage/versioning) for more details. */
    storefrontApiVersion?: string;
};
type GetPublicTokenHeadersProps = {
    /**
     * Customizes which `"content-type"` header is added when using `getPrivateTokenHeaders()` and `getPublicTokenHeaders()`. When fetching with a `JSON.stringify()`-ed `body`, use `"json"`. When fetching with a `body` that is a plain string, use `"graphql"`. Defaults to `"json"`
     */
    contentType: 'json' | 'graphql';
    /** The Storefront API access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) documentation for more details. */
    storefrontToken?: string;
};
type GetShopifyDomainProps = {
    storeDomain?: string;
};
export {};
