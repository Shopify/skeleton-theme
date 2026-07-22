import type { RenderExtensionTarget, AppMetafieldEntryTarget, Metafield, AppMetafieldEntry } from '@shopify/ui-extensions/checkout';
interface AppMetafieldFilters {
    id?: AppMetafieldEntryTarget['id'];
    type?: AppMetafieldEntryTarget['type'];
    /**
     * To filter for app owned metafields, use the `$app` format. The fully qualified reserved namespace format such as `app--{your-app-id}[--{optional-namespace}]` is not supported.
     *
     * See [app owned metafields](/docs/apps/build/custom-data/ownership#reserved-prefixes) for more information.
     */
    namespace?: Metafield['namespace'];
    key?: Metafield['key'];
}
/**
 * Returns the metafields configured with `shopify.extension.toml`.
 * @arg {AppMetafieldFilters} - filter the list of returned metafields
 */
export declare function useAppMetafields<Target extends RenderExtensionTarget = RenderExtensionTarget>(filters?: AppMetafieldFilters): AppMetafieldEntry[];
export {};
//# sourceMappingURL=app-metafields.d.ts.map