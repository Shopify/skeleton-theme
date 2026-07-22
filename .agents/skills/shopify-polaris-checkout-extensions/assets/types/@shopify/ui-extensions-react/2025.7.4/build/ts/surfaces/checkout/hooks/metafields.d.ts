import type { Metafield, MetafieldChange, MetafieldChangeResult, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
interface MetafieldsFilters {
    namespace: string;
    key?: string;
}
/**
 * Returns the current array of `metafields` applied to the checkout.
 * You can optionally filter the list.
 * @arg {MetafieldsFilters} - filter the list of returned metafields
 */
export declare function useMetafields<Target extends RenderExtensionTarget = RenderExtensionTarget>(filters?: MetafieldsFilters): Metafield[];
/**
 * Returns a function to mutate the `metafields` property of the checkout.
 */
export declare function useApplyMetafieldsChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: MetafieldChange) => Promise<MetafieldChangeResult>;
export {};
//# sourceMappingURL=metafields.d.ts.map