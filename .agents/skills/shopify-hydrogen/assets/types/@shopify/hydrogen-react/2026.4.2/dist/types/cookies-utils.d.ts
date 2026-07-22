import { ShopifyCookies } from './analytics-types.js';
export declare function buildUUID(): string;
export declare function hexTime(): string;
/**
 * Gets the values of _shopify_y and _shopify_s cookies from the provided cookie string. If the Shopify cookies doesn't exist, this method will return an empty string for each missing cookie.
 * @deprecated Use getTrackingValues instead.
 * @publicDocs
 */
export declare function getShopifyCookies(cookies: string): ShopifyCookies;
