import type { RenderOrderStatusExtensionTarget } from '../extension-targets';
import type { AppMetafield, AppMetafieldEntryTarget, AppMetafieldEntry } from '../api';
interface AppMetafieldFilters {
    id?: AppMetafieldEntryTarget['id'];
    type?: AppMetafieldEntryTarget['type'];
    namespace?: AppMetafield['namespace'];
    key?: AppMetafield['key'];
}
/**
 * Returns the metafields configured with `shopify.ui.extension.toml`.
 * @arg {AppMetafieldFilters} - filter the list of returned metafields
 */
export declare function useAppMetafields<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(filters?: AppMetafieldFilters): AppMetafieldEntry[];
export {};
//# sourceMappingURL=app-metafields.d.ts.map