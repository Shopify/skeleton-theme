import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
import type { ResourcePickerApi } from '../resource-picker/resource-picker';
import type { PickerApi } from '../picker/picker';
/**
 * The `ActionExtensionApi` object provides methods for action extensions that render in modal overlays. Access the following properties on the `ActionExtensionApi` object to interact with the current context, control the modal, and display picker dialogs.
 * @publicDocs
 */
export interface ActionExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Closes the extension modal. Use this when your extension completes its task or the merchant wants to exit. Equivalent to clicking the close button in the overlay corner.
     */
    close: () => void;
    /**
     * An array of currently viewed or selected resource identifiers. Use this to access the IDs of items in the current context, such as selected products in an index page or the product being viewed on a details page. The available IDs depend on the extension target and user interactions.
     */
    data: Data;
    /**
     * Opens the [Resource Picker](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/resource-picker-api) modal for selecting products, variants, or collections. Use this to let merchants choose resources that your extension needs to work with.
     */
    resourcePicker: ResourcePickerApi;
    /**
     * Opens a custom [Picker](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/picker-api) dialog for selecting from a list of custom options. Use this when you need merchants to choose from app-specific data that isn't a standard Shopify resource.
     */
    picker: PickerApi;
}
//# sourceMappingURL=action.d.ts.map