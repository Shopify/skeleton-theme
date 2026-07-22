import type { MetafieldChange, MetafieldChangeResult } from '../api/checkout/checkout';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns a function to mutate the `metafields` property of the checkout.
 * @publicDocs
 */
export declare function useApplyMetafieldsChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: MetafieldChange) => Promise<MetafieldChangeResult>;
//# sourceMappingURL=metafields.d.ts.map