import type { ShippingOption } from '../api/standard/standard';
import type { ShippingOptionItemRenderMode } from '../api/shipping/shipping-option-item';
/**
 * Returns the shipping option the extension is attached to. This hook can only be used by extensions in the following
 * extension targets:
 * - `purchase.checkout.shipping-option-item.render-after`
 * - `purchase.checkout.shipping-option-item.details.render`
 * @publicDocs
 */
export declare function useShippingOptionTarget(): {
    shippingOptionTarget: ShippingOption;
    isTargetSelected: boolean;
    renderMode: ShippingOptionItemRenderMode;
};
//# sourceMappingURL=shipping-option-target.d.ts.map