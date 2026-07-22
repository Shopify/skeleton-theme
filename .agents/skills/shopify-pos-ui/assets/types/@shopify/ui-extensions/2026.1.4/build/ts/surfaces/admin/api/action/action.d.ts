import type { StandardRenderingExtensionApi } from '../standard/standard-rendering';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
/**
 * The `ActionExtensionApi` object provides methods for action extensions that render in modal overlays. Access the following properties on the `ActionExtensionApi` object to interact with the current context, control the modal, and display picker dialogs.
 *
 * @publicDocs
 */
export interface ActionExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardRenderingExtensionApi<ExtensionTarget> {
    /**
     * Closes the extension modal. Use this when your extension completes its task or the merchant wants to exit. Equivalent to clicking the close button in the overlay corner.
     */
    close: () => void;
    /**
     * An array of currently viewed or selected resource identifiers. Use this to access the IDs of items in the current context, such as selected products in an index page or the product being viewed on a details page. The available IDs depend on the extension target and user interactions.
     */
    data: Data;
}
//# sourceMappingURL=action.d.ts.map