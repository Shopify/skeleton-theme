import type { RenderOrderStatusExtensionTarget } from '../extension-targets';
import type { CartLine } from '../api';
/**
 * Returns the current line items for the checkout, and automatically re-renders
 * your component if line items are added, removed, or updated.
 */
export declare function useCartLines<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(): CartLine[];
//# sourceMappingURL=cart-lines.d.ts.map