
import { ShopifyGlobal } from '@shopify/app-bridge-types';
/**
 *
 * This hook returns the `shopify` global variable to use
 * App Bridge APIs such as `toast` and `resourcePicker`.
 *
 * @see {@link https://shopify.dev/docs/api/app-bridge-library/react-hooks/useappbridge}
 *
 * @example
 * ```jsx
 * import {useAppBridge} from '@shopify/app-bridge-react';
 * function GenerateBlogPostButton() {
 *   const shopify = useAppBridge();
 *
 *   function generateBlogPost() {
 *     // Handle generating
 *     shopify.toast.show('Blog post template generated');
 *   }
 *
 *   return <button onClick={generateBlogPost}>Generate Blog Post</button>;
 * }
 * ```
 *
 * @returns `shopify` variable or a Proxy that throws when incorrectly accessed when not in a browser context
 */
export declare function useAppBridge(): ShopifyGlobal;
//# sourceMappingURL=useAppBridge.d.ts.map