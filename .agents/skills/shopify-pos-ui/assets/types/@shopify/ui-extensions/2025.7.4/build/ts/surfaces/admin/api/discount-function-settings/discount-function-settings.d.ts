import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import { ApplyMetafieldChange } from './metafields';
import { DiscountFunctionSettingsData } from './launch-options';
export interface DiscountFunctionSettingsApi<ExtensionTarget extends AnyExtensionTarget> extends Omit<BlockExtensionApi<ExtensionTarget>, 'data'> {
    /**
     * Applies a change to the discount function settings.
     */
    applyMetafieldChange: ApplyMetafieldChange;
    data: DiscountFunctionSettingsData;
}
//# sourceMappingURL=discount-function-settings.d.ts.map