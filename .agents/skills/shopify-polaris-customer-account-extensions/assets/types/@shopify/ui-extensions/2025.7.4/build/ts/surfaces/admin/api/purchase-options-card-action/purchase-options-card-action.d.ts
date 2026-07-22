import { ActionExtensionApi } from '../action/action';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
export interface PurchaseOptionsCardConfigurationApi<ExtensionTarget extends AnyExtensionTarget> extends ActionExtensionApi<ExtensionTarget> {
    data: {
        selected: {
            id: string;
            sellingPlanId?: string;
        }[];
    };
}
//# sourceMappingURL=purchase-options-card-action.d.ts.map