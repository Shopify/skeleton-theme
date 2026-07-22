import { RenderExtensionTarget, ApiForRenderExtension } from '../extension-targets';
/**
 * Returns the full API object that was passed in to your extension when it was created.
 * Depending on the extension target, this object can contain different properties.
 */
export declare function useApi<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ApiForRenderExtension<Target>;
/**
 * Returns the full API object that was passed in to your extension when it was created.
 * Depending on the extension target, this object can contain different properties.
 *
 * > Caution: This is deprecated, use `useApi` instead.
 *
 * @deprecated This is deprecated, use `useApi` instead.
 */
export declare function useExtensionApi<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ApiForRenderExtension<Target>;
//# sourceMappingURL=api.d.ts.map