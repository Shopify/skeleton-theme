import type { ExtensionTarget } from '@shopify/ui-extensions/checkout';
export declare class CheckoutUIExtensionError extends Error {
    name: string;
}
export declare class ScopeNotGrantedError extends Error {
    name: string;
}
export declare class ExtensionHasNoMethodError extends Error {
    name: string;
    constructor(method: string, target: ExtensionTarget);
}
export declare class ExtensionHasNoTargetError extends Error {
    name: string;
    constructor(method: string, target: ExtensionTarget);
}
//# sourceMappingURL=errors.d.ts.map