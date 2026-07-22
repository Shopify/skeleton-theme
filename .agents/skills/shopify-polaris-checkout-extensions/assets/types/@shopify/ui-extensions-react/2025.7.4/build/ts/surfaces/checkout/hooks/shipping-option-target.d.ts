import type { ShippingOption, ShippingOptionItemRenderMode } from '@shopify/ui-extensions/checkout';
/**
 * Returns the shipping option the extension is attached to. This hook can only be used by extensions in the following
 * extension targets:
 * - `purchase.checkout.shipping-option-item.render-after`
 * - `purchase.checkout.shipping-option-item.details.render`
 */
export declare function useShippingOptionTarget(): {
    shippingOptionTarget: ShippingOption;
    isTargetSelected: boolean;
    renderMode: ShippingOptionItemRenderMode;
};
//# sourceMappingURL=shipping-option-target.d.ts.map