import type { Metafield } from '../api/standard/standard';
import type { MetafieldChange, MetafieldChangeResult } from '../api/checkout/checkout';
import type { RenderExtensionTarget } from '../extension-targets';
interface MetafieldsFilters {
    namespace: string;
    key?: string;
}
/**
 * Returns the current array of `metafields` applied to the checkout.
 * You can optionally filter the list.
 * @arg {MetafieldsFilters} - filter the list of returned metafields
 * @deprecated `useMetafields` is deprecated. Use `useAppMetafields` with cart metafields instead.
 * @publicDocs
 */
export declare function useMetafields<Target extends RenderExtensionTarget = RenderExtensionTarget>(filters?: MetafieldsFilters): Metafield[];
/**
 * Returns a function to mutate the `metafields` property of the checkout.
 * @publicDocs
 */
export declare function useApplyMetafieldsChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: MetafieldChange) => Promise<MetafieldChangeResult>;
export {};
//# sourceMappingURL=metafields.d.ts.map