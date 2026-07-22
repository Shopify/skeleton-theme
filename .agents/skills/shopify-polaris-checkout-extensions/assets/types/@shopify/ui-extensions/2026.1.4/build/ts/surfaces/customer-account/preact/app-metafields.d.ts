import type { RenderOrderStatusExtensionTarget } from '../extension-targets';
import type { AppMetafieldEntryTarget, Metafield, AppMetafieldEntry } from '../api';
interface AppMetafieldFilters {
    id?: AppMetafieldEntryTarget['id'];
    type?: AppMetafieldEntryTarget['type'];
    namespace?: Metafield['namespace'];
    key?: Metafield['key'];
}
/**
 * Returns the metafields configured with `shopify.ui.extension.toml`.
 * @arg {AppMetafieldFilters} - filter the list of returned metafields
 */
export declare function useAppMetafields<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(filters?: AppMetafieldFilters): AppMetafieldEntry[];
export {};
//# sourceMappingURL=app-metafields.d.ts.map