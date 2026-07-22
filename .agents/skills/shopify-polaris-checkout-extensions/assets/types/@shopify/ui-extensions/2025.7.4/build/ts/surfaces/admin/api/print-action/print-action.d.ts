import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
import type { ResourcePickerApi } from '../resource-picker/resource-picker';
import type { PickerApi } from '../picker/picker';
export interface PrintActionExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Information about the currently viewed or selected items.
     */
    data: Data;
    /**
     * Renders the [Resource Picker](resource-picker), allowing users to select a resource for the extension to use as part of its flow.
     */
    resourcePicker: ResourcePickerApi;
    /**
     * Renders a custom [Picker](picker) dialog allowing users to select values from a list.
     */
    picker: PickerApi;
}
//# sourceMappingURL=print-action.d.ts.map