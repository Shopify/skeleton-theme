import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
import type { ResourcePickerApi } from '../resource-picker/resource-picker';
import type { PickerApi } from '../picker/picker';
export interface Navigation {
    /**
     * Navigate to a specific route.
     *
     * @example navigation.navigate('extension://my-admin-action-extension-handle')
     */
    navigate: (url: string | URL) => void;
}
export interface BlockExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Information about the currently viewed or selected items.
     */
    data: Data;
    /**
     * Provides methods to navigate to other features in the Admin. Currently, only navigation from an admin block to an admin action extension *on the same resource page* is supported.
     * For example, you can navigate from an admin block on the product details page (`admin.product-details.block.render`) to an admin action on the product details page (`admin.product-details.action.render`).
     */
    navigation: Navigation;
    /**
     * Renders the [Resource Picker](resource-picker), allowing users to select a resource for the extension to use as part of its flow.
     */
    resourcePicker: ResourcePickerApi;
    /**
     * Renders a custom [Picker](picker) dialog allowing users to select values from a list.
     */
    picker: PickerApi;
}
//# sourceMappingURL=block.d.ts.map