import type { Metafield } from '@shopify/ui-extensions/checkout';
interface MetafieldFilter {
    namespace: string;
    key: string;
}
/**
 * Returns a single filtered `Metafield` or `undefined`.
 * @arg {MetafieldFilter} - filter the list of returned metafields to a single metafield
 */
export declare function useMetafield(filters: MetafieldFilter): Metafield | undefined;
export {};
//# sourceMappingURL=metafield.d.ts.map