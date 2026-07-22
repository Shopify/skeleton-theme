import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import { ApplyMetafieldChange } from './metafields';
import { DiscountFunctionSettingsData } from './launch-options';
/**
 * The `DiscountFunctionSettingsApi` object provides methods for configuring discount functions. Access the following properties on the `DiscountFunctionSettingsApi` object to manage function settings and metafields.
 */
export interface DiscountFunctionSettingsApi<ExtensionTarget extends AnyExtensionTarget> extends Omit<BlockExtensionApi<ExtensionTarget>, 'data'> {
    /**
     * Updates or removes [metafields](/docs/apps/build/metafields) that store discount function configuration. Use this to save merchant settings for your discount function.
     */
    applyMetafieldChange: ApplyMetafieldChange;
    /** The discount being configured and its associated [metafields](/docs/apps/build/metafields) storing function settings. */
    data: DiscountFunctionSettingsData;
}
//# sourceMappingURL=discount-function-settings.d.ts.map