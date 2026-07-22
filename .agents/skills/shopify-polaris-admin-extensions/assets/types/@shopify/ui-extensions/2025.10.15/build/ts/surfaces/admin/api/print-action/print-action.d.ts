import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
import type { ResourcePickerApi } from '../resource-picker/resource-picker';
import type { PickerApi } from '../picker/picker';
/**
 * The `PrintActionExtensionApi` object provides methods for print action extensions that generate custom printable documents. Access the following properties on the `PrintActionExtensionApi` object to access selected resources and display picker dialogs for print configuration.
 * @publicDocs
 */
export interface PrintActionExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * An array of currently viewed or selected resource identifiers. Use this to access the IDs of items to include in the print document, such as selected orders or products.
     */
    data: Data;
    /**
     * Opens the [Resource Picker API](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/resource-picker-api) modal for selecting products, variants, or collections. Use this to let merchants choose additional resources to include in the print document.
     */
    resourcePicker: ResourcePickerApi;
    /**
     * Opens a custom [Picker API](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/picker-api) dialog for selecting from a list of custom options. Use this when you need merchants to choose print settings or document configurations.
     */
    picker: PickerApi;
}
//# sourceMappingURL=print-action.d.ts.map