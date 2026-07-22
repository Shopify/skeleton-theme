import type { ExtensionTargets } from './extension-targets';
/** @publicDocs */
export interface ShopifyGlobal {
    extend<ExtensionTarget extends keyof ExtensionTargets>(target: ExtensionTarget, extend: () => ExtensionTargets[ExtensionTarget]['output']): void;
    reload(): void;
}
declare global {
    const shopify: ShopifyGlobal;
}
//# sourceMappingURL=globals.d.ts.map