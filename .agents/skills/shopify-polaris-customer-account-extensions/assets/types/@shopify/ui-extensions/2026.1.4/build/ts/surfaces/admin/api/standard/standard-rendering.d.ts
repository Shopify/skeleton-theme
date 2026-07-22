import type { PickerApi } from '../picker/picker';
import type { ResourcePickerApi } from '../resource-picker/resource-picker';
import type { StandardApi } from './standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
export interface StandardRenderingExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Opens the [resource picker](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/resource-picker-api) modal for selecting products, variants, or collections. Returns the selected resources when the user confirms their selection, or undefined if they cancel.
     */
    resourcePicker: ResourcePickerApi;
    /**
     * Opens a custom selection dialog with your app-specific data. Use the [Picker API](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/picker-api) to define the picker's heading, items, headers, and selection behavior. Returns a Promise that resolves to a `Picker` object with a `selected` property for accessing the merchant's selection.
     */
    picker: PickerApi;
}
//# sourceMappingURL=standard-rendering.d.ts.map