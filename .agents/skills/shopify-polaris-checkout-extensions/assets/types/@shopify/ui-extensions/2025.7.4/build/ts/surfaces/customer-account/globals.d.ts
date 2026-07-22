import type { ExtensionTargets } from './targets';
export interface ShopifyGlobal {
    extend<ExtensionTarget extends keyof ExtensionTargets>(target: ExtensionTarget, extend: ExtensionTargets[ExtensionTarget]): void;
    reload(): void;
}
declare global {
    const shopify: ShopifyGlobal;
}
//# sourceMappingURL=globals.d.ts.map