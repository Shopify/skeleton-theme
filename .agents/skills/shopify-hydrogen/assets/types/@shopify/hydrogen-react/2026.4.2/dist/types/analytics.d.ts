import type { ClientBrowserParameters, ShopifyAnalytics } from './analytics-types.js';
/**
 * Set user and session cookies and refresh the expiry time. If `event.payload.hasUserConsent` is false, no analytics event will happen.
 * @param event - The analytics event.
 * @param shopDomain - The Online Store domain to sent Shopify analytics under the same
 *   top level domain.
 * @publicDocs
 */
export declare function sendShopifyAnalytics(event: ShopifyAnalytics, shopDomain?: string): Promise<void>;
/**
 * If executed on server, this method will return empty string for each field.
 * @publicDocs
 */
export declare function getClientBrowserParameters(): ClientBrowserParameters;
