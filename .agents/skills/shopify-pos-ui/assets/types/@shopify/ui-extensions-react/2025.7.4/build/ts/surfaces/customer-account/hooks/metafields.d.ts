import type { Metafield, RenderOrderStatusExtensionTarget } from '@shopify/ui-extensions/customer-account';
interface MetafieldsFilters {
    namespace: string;
    key?: string;
}
/**
 * Returns the current array of `metafields` applied to the checkout.
 * You can optionally filter the list.
 * @arg {MetafieldsFilters} - filter the list of returned metafields
 */
export declare function useMetafields<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(filters?: MetafieldsFilters): Metafield[];
export {};
//# sourceMappingURL=metafields.d.ts.map