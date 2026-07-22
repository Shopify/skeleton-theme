import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import { ApplyMetafieldChange } from './metafields';
import { ValidationData } from './launch-options';
export interface ValidationSettingsApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Applies a change to the validation settings.
     */
    applyMetafieldChange: ApplyMetafieldChange;
    data: ValidationData;
}
//# sourceMappingURL=validation-settings.d.ts.map