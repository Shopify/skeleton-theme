import type { Metafield } from '../api';
interface MetafieldFilter {
    namespace: string;
    key: string;
}
/**
 * Returns a single filtered `Metafield` or `undefined`.
 * @arg {MetafieldFilter} - filter the list of returned metafields to a single metafield
 * @deprecated `useMetafield` is deprecated. Use `useAppMetafields` instead.
 */
export declare function useMetafield(filters: MetafieldFilter): Metafield | undefined;
export {};
//# sourceMappingURL=metafield.d.ts.map