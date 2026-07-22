import type { RenderOrderStatusExtensionTarget } from '../extension-targets';
import type { Money } from '../api';
/**
 * Returns a `Money` value representing the minimum a buyer can expect to pay at the current
 * step of checkout. This value excludes amounts yet to be negotiated. For example,
 * the information step might not have delivery costs calculated.
 */
export declare function useTotalAmount<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(): Money;
//# sourceMappingURL=cost.d.ts.map