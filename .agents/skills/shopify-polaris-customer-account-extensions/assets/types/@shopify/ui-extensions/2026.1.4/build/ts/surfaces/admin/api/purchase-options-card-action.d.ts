import { ActionExtensionApi } from './action/action';
import type { ExtensionTarget as AnyExtensionTarget } from '../extension-targets';
/**
 * The `PurchaseOptionsCardConfigurationApi` object provides methods for action extensions that interact with purchase options and selling plans. Access the following properties on the `PurchaseOptionsCardConfigurationApi` object to work with selected products and their associated subscription configurations.
 *
 * @publicDocs
 */
export interface PurchaseOptionsCardConfigurationApi<ExtensionTarget extends AnyExtensionTarget> extends ActionExtensionApi<ExtensionTarget> {
    /** Selected purchase option data including product and selling plan identifiers. */
    data: {
        /** Array of selected items with their product IDs and optional selling plan IDs for subscription configurations. */
        selected: {
            /** The product or variant identifier. */
            id: string;
            /** The associated selling plan identifier, if a subscription option is selected. */
            sellingPlanId?: string;
        }[];
    };
}
//# sourceMappingURL=purchase-options-card-action.d.ts.map