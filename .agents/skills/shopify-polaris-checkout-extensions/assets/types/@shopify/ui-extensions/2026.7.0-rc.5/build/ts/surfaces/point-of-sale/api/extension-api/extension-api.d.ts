import type { ApiVersion } from '../../../../shared';
/**
 * The Extension API lets you read metadata about the currently running
 * extension. Use it to implement version-aware behaviour or to identify which
 * target is active when the same extension module is registered against
 * multiple targets. Access these properties through `shopify.extension`.
 *
 * @example
 * <caption>Read the API version and active target</caption>
 * <description>Display the configured API version and the active extension target. Use `shopify.extension.apiVersion` for version-aware logic and `shopify.extension.target` when a single module handles multiple targets.</description>
 * ```jsx
 * const Extension = () => {
 *   const {apiVersion, target} = shopify.extension;
 *   return (
 *     <s-page heading="Extension Info">
 *       <s-stack direction="block">
 *         <s-text>API Version: {apiVersion}</s-text>
 *         <s-text>Target: {target}</s-text>
 *       </s-stack>
 *     </s-page>
 *   );
 * };
 * ```
 * @publicDocs
 */
export interface ExtensionApiContent<T> {
    /**
     * The API version that was set in the extension configuration file.
     *
     * @example '2026-01', '2026-04'
     */
    apiVersion: ApiVersion;
    /**
     * The extension target that is currently running, as configured in the
     * extension's `shopify.extension.toml` file.
     *
     * @example 'pos.home.tile.render', 'pos.home.modal.render'
     */
    target: T;
}
/**
 * The `ExtensionApi` object provides metadata about the currently running
 * extension, including the configured API version and the active extension
 * target. Access these properties through `shopify.extension`.
 * @publicDocs
 */
export interface ExtensionApi<T> {
    extension: ExtensionApiContent<T>;
}
//# sourceMappingURL=extension-api.d.ts.map