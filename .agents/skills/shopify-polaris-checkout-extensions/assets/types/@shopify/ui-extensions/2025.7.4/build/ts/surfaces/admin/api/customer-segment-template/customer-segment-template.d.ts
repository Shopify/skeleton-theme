import type { StandardApi } from '../standard/standard';
import type { I18n } from '../../../../api';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
export interface CustomerSegmentTemplateApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    i18n: I18n;
    /** @private */
    __enabledFeatures: string[];
}
//# sourceMappingURL=customer-segment-template.d.ts.map