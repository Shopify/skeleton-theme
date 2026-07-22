import type { RenderOrderStatusExtensionTarget } from '../extension-targets';
import type { Attribute } from '../api';
/**
 * Returns the proposed `attributes` applied to the checkout.
 */
export declare function useAttributes<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(): Attribute[] | undefined;
/**
 * Returns the values for the specified `attributes` applied to the checkout.
 *
 * @param keys - An array of attribute keys.
 */
export declare function useAttributeValues<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(keys: string[]): (string | undefined)[];
//# sourceMappingURL=attributes.d.ts.map