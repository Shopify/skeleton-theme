import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
/**
 * The output returned by `should-render` extensions to control visibility.
 */
export interface ShouldRenderOutput {
    /** Whether to display the associated action extension. Return `true` to show the action, `false` to hide it. */
    display: boolean;
}
/**
 * The `ShouldRenderApi` object provides methods for controlling action extension visibility. Access the following properties on the `ShouldRenderApi` object to determine whether an associated action should appear based on the current context.
 */
export interface ShouldRenderApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /**
     * An array of currently viewed or selected resource identifiers. Use this data to determine whether the action extension should appear based on the current context.
     */
    data: Data;
}
//# sourceMappingURL=should-render.d.ts.map