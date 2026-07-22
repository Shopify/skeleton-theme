import type { ExtensionTargets } from './targets';
export * from '../../extension';
export declare const extension: import("../../utilities/registration").ExtensionRegistrationFunctionWithRoot<ExtensionTargets>;
/**
 * Registers your UI Extension to run for the selected extension target.
 *
 * @param target The extension target you are registering for.
 *
 * @param implementation The function that will be called when Checkout begins rendering
 * your extension. This function is called with the API checkout provided to your
 * extension.
 *
 * @deprecated This is deprecated, use `extension` instead.
 */
export declare const extend: import("../../utilities/registration").ExtensionRegistrationFunctionWithRoot<ExtensionTargets>;
//# sourceMappingURL=extension.d.ts.map