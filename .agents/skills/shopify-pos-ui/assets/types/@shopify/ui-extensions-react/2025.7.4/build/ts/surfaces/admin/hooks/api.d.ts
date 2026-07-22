import { RenderExtensionTarget, ApiForRenderExtension } from '@shopify/ui-extensions/admin';
/**
 * Returns the full API object that was passed in to your
 * extension when it was created.
 */
export declare function useApi<ID extends RenderExtensionTarget = RenderExtensionTarget>(_target?: ID): ApiForRenderExtension<ID>;
/**
 * Returns the full API object that was passed in to your
 * extension when it was created.
 * @deprecated you shoud be importing useApi instead
 */
export declare function useExtensionApi<ID extends RenderExtensionTarget = RenderExtensionTarget>(): ApiForRenderExtension<ID>;
//# sourceMappingURL=api.d.ts.map