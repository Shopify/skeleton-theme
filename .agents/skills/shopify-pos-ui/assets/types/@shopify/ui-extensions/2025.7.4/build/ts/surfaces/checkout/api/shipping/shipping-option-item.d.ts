import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
import type { ShippingOption } from '../standard/standard';
export interface ShippingOptionItemApi {
    /**
     * The shipping option the extension is attached to.
     */
    target: StatefulRemoteSubscribable<ShippingOption>;
    /**
     * Whether the shipping option the extension is attached to is currently selected in the UI.
     */
    isTargetSelected: StatefulRemoteSubscribable<boolean>;
    /**
     * The render mode of the shipping option.
     */
    renderMode: ShippingOptionItemRenderMode;
}
/**
 * The render mode of a shipping option.
 */
export interface ShippingOptionItemRenderMode {
    /**
     * Whether the shipping option is rendered in an overlay.
     */
    overlay: boolean;
}
//# sourceMappingURL=shipping-option-item.d.ts.map