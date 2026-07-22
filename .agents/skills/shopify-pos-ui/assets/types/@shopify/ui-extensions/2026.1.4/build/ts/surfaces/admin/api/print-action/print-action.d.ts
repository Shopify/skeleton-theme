import type { StandardRenderingExtensionApi } from '../standard/standard-rendering';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
/**
 * The `PrintActionExtensionApi` object provides methods for print action extensions that generate custom printable documents. Access the following properties on the `PrintActionExtensionApi` object to access selected resources and display picker dialogs for print configuration.
 *
 * @publicDocs
 */
export interface PrintActionExtensionApi<ExtensionTarget extends AnyExtensionTarget> extends StandardRenderingExtensionApi<ExtensionTarget> {
    /**
     * An array of currently viewed or selected resource identifiers. Use this to access the IDs of items to include in the print document, such as selected orders or products.
     */
    data: Data;
}
//# sourceMappingURL=print-action.d.ts.map