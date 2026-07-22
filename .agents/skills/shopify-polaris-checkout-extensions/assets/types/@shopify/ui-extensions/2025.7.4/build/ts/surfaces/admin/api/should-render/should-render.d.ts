import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
export interface ShouldRenderApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * Information about the currently viewed or selected items.
     */
    data: Data;
}
//# sourceMappingURL=should-render.d.ts.map