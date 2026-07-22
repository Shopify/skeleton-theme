import type { ClientBrowserParameters, ShopifyAnalytics } from './analytics-types.js';
/**
 * Set user and session cookies and refresh the expiry time
 * @param event - The analytics event.
 * @param shopDomain - The Online Store domain to sent Shopify analytics under the same
 *   top level domain.
 */
export declare function sendShopifyAnalytics(event: ShopifyAnalytics, shopDomain?: string): Promise<void>;
export declare function getClientBrowserParameters(): ClientBrowserParameters;
