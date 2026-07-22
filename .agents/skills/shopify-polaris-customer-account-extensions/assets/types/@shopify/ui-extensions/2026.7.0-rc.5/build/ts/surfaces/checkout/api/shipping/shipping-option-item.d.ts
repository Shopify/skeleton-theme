import type { SubscribableSignalLike } from '../../shared';
import type { ShippingOption } from '../standard/standard';
/** @publicDocs */
export interface ShippingOptionItemApi {
    /**
     * The shipping option that this extension is attached to. Use this to read the option's cost, carrier, delivery estimate, and other details.
     *
     * Available only on the corresponding item target. Shipping option item
     * targets expose shipping option properties; pickup location item targets
     * expose pickup location properties.
     */
    target: SubscribableSignalLike<ShippingOption>;
    /**
     * Whether the buyer has selected the target shipping option. When `true`, the target option is the buyer's active choice. When `false`, the buyer has chosen a different shipping option.
     *
     * Available only on the corresponding item target. Shipping option item
     * targets expose shipping option properties; pickup location item targets
     * expose pickup location properties.
     */
    isTargetSelected: SubscribableSignalLike<boolean>;
    /**
     * The render mode of this shipping option, indicating how the extension is displayed in the checkout UI.
     */
    renderMode: ShippingOptionItemRenderMode;
}
/**
 * The render mode of a shipping option.
 * @publicDocs
 */
export interface ShippingOptionItemRenderMode {
    /**
     * Whether the shipping option is rendered in an overlay. When `true`, the extension appears in a modal or sheet on top of the checkout page. When `false`, the extension renders inline within the shipping options list.
     */
    overlay: boolean;
}
//# sourceMappingURL=shipping-option-item.d.ts.map