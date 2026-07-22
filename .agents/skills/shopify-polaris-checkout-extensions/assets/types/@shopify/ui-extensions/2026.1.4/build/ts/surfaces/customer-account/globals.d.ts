import { Navigation } from './api';
import type { ExtensionTargets } from './extension-targets';
export interface ShopifyGlobal {
    extend<ExtensionTarget extends keyof ExtensionTargets>(target: ExtensionTarget, extend: ExtensionTargets[ExtensionTarget]): void;
    reload(): void;
}
declare global {
    const navigation: Navigation;
}
//# sourceMappingURL=globals.d.ts.map