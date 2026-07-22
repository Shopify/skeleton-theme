import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import { ApplyMetafieldChange } from './metafields';
import { DiscountFunctionSettingsData, DiscountsApi } from './launch-options';
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
    /** The `discounts` object provides reactive access to discount configuration, including discount classes and the discount method. Use the signals to read current values and the update functions to modify discount classes in your settings UI. These values automatically update when changed by the merchant or system. */
    discounts: DiscountsApi;
}
//# sourceMappingURL=discount-function-settings.d.ts.map