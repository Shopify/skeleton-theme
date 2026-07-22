import type { ReactElement } from 'react';
import type { ExtensionTargets, RenderExtensionTarget, ApiForRenderExtension } from '@shopify/ui-extensions/admin';
/**
 * Registers your React-based UI Extension to run for the selected extension point.
 * Additionally, this function will automatically provide the extension API as React
 * context, which you can access anywhere in your extension by using the `useApi()`
 * hook.
 *
 * @param target The extension target you are registering for. This extension
 * target must be a `RenderExtensionTarget`;
 * @param render The function that will be called when Admin begins rendering
 * your extension. This function is called with the API Admin provided to your
 * extension, and must return a React element that will be rendered into the extension
 * point you specified.
 */
export declare function reactExtension<ExtensionTarget extends RenderExtensionTarget>(target: ExtensionTarget, render: (api: ApiForRenderExtension<ExtensionTarget>) => Promise<ReactElement<any>> | ReactElement<any>): ExtensionTargets[ExtensionTarget];
export { reactExtension as render };
//# sourceMappingURL=render.d.ts.map