import type { AttributeChange, AttributeChangeResult } from '../api/checkout/checkout';
import type { RenderExtensionTarget } from '../extension-targets';
import type { Attribute } from '../api/shared';
/**
 * Returns the proposed `attributes` applied to the checkout.
 * @publicDocs
 */
export declare function useAttributes<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Attribute[];
/**
 * Returns the values for the specified `attributes` applied to the checkout.
 *
 * @param keys - An array of attribute keys.
 * @publicDocs
 */
export declare function useAttributeValues<Target extends RenderExtensionTarget = RenderExtensionTarget>(keys: string[]): (string | undefined)[];
/**
 * Returns a function to mutate the `attributes` property of the checkout.
 * @publicDocs
 */
export declare function useApplyAttributeChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: AttributeChange) => Promise<AttributeChangeResult>;
//# sourceMappingURL=attributes.d.ts.map