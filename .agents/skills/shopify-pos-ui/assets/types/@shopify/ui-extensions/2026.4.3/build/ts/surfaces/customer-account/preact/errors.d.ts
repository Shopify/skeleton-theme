import type { ExtensionTarget } from '../extension-targets';
export declare class CustomerAccountUIExtensionError extends Error {
    name: string;
}
export declare class ScopeNotGrantedError extends Error {
    name: string;
}
export declare class ExtensionHasNoMethodError extends Error {
    name: string;
    constructor(method: string, target: ExtensionTarget);
}
export declare class ExtensionHasNoFieldError extends Error {
    name: string;
    constructor(field: string, target: ExtensionTarget);
}
//# sourceMappingURL=errors.d.ts.map