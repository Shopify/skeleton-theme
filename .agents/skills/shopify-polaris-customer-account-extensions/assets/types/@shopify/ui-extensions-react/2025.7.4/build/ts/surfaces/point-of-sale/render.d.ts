import type { ReactElement } from 'react';
import type { ExtensionTargets, RenderExtensionTarget, ApiForRenderExtension } from '@shopify/ui-extensions/point-of-sale';
/**
 * Registers your React-based UI Extension to run for the selected extension target.
 * Additionally, this function will automatically provide the extension API as React
 * context, which you can access anywhere in your extension by using the `useApi()`
 * hook.
 *
 * @param target The extension target you are registering for. You can see a full list
 * of the available targets in our [developer documentation](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#placements).
 *
 * @param render The function that will be called when Checkout begins rendering
 * your extension. This function is called with the API checkout provided to your
 * extension, and must return a React element that will be rendered into the extension
 * target you specified. Alternatively, it can return a promise for a React element,
 * which allows you to perform initial asynchronous work like fetching data from your
 * own backend.
 */
export declare function reactExtension<Target extends RenderExtensionTarget>(target: Target, render: (api: ApiForRenderExtension<Target>) => ReactElement<any> | Promise<ReactElement<any>>): ExtensionTargets[Target];
/**
 * Registers your React-based UI Extension to run for the selected extension target.
 * Additionally, this function will automatically provide the extension API as React
 * context, which you can access anywhere in your extension by using the `useApi()`
 * hook.
 *
 * @param target The extension target you are registering for. You can see a full list
 * of the available targets in our [developer documentation](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#placements).
 *
 * @param render The function that will be called when Checkout begins rendering
 * your extension. This function is called with the API checkout provided to your
 * extension, and must return a React element that will be rendered into the extension
 * target you specified. Alternatively, it can return a promise for a React element,
 * which allows you to perform initial asynchronous work like fetching data from your
 * own backend.
 *
 * @deprecated This is deprecated. Use `reactExtension` instead.
 */
export declare function render<Target extends RenderExtensionTarget>(target: Target, render: (api: ApiForRenderExtension<Target>) => ReactElement<any>): ExtensionTargets[Target];
export declare function extractComponentName(componentStack: string): string;
//# sourceMappingURL=render.d.ts.map