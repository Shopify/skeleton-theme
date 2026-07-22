import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import { ApplyMetafieldChange } from './metafields';
import { ValidationData } from './launch-options';
/**
 * The `ValidationSettingsApi` object provides methods for configuring cart and checkout validation functions. Access the following properties on the `ValidationSettingsApi` object to manage validation settings and metafields.
 */
export interface ValidationSettingsApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Updates or removes [metafields](/docs/apps/build/metafields) that store validation function configuration. Use this to save merchant settings for your validation function.
     */
    applyMetafieldChange: ApplyMetafieldChange;
    /** The validation being configured and its associated [metafields](/docs/apps/build/metafields) storing function settings. */
    data: ValidationData;
}
//# sourceMappingURL=validation-settings.d.ts.map