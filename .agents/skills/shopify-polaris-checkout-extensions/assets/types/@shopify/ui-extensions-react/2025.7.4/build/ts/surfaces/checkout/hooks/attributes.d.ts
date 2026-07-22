import type { Attribute, AttributeChange, AttributeChangeResult, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
/**
 * Returns the proposed `attributes` applied to the checkout.
 */
export declare function useAttributes<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Attribute[] | undefined;
/**
 * Returns the values for the specified `attributes` applied to the checkout.
 *
 * @param keys - An array of attribute keys.
 */
export declare function useAttributeValues<Target extends RenderExtensionTarget = RenderExtensionTarget>(keys: string[]): (string | undefined)[];
/**
 * Returns a function to mutate the `attributes` property of the checkout.
 */
export declare function useApplyAttributeChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: AttributeChange) => Promise<AttributeChangeResult>;
//# sourceMappingURL=attributes.d.ts.map