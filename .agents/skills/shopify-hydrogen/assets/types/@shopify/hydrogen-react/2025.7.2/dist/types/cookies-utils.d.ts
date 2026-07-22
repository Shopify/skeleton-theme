import { ShopifyCookies } from './analytics-types.js';
export declare function buildUUID(): string;
export declare function hexTime(): string;
/**
 * Gets the values of _shopify_y and _shopify_s cookies from the provided cookie string.
 * @deprecated Use getTrackingValues instead.
 */
export declare function getShopifyCookies(cookies: string): ShopifyCookies;
