import type { Appearance, IdProps, Size } from '../shared';
export type IconSource = 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'arrowUpRight' | 'arrowDown' | 'bag' | 'bullet' | 'calendar' | 'camera' | 'caretDown' | 'cart' | 'cashDollar' | 'categories' | 'checkmark' | 'chevronLeft' | 'chevronRight' | 'chevronUp' | 'chevronDown' | 'clipboard' | 'clock' | 'close' | 'creditCard' | 'critical' | 'delete' | 'delivered' | 'delivery' | 'disabled' | 'discount' | 'email' | 'error' | 'errorFill' | 'external' | 'filter' | 'geolocation' | 'gift'
/** @deprecated use gift instead */
 | 'giftFill' | 'grid' | 'hamburger' | 'hollowCircle' | 'horizontalDots' | 'image' | 'info' | 'infoFill' | 'list' | 'lock' | 'magnify' | 'map' | 'marker' | 'minus' | 'mobile' | 'note' | 'orderBox' | 'pen' | 'plus' | 'profile' | 'question' | 'questionFill' | 'reorder' | 'reset' | 'return' | 'savings' | 'settings' | 'star' | 'starFill' | 'starHalf' | 'store' | 'success' | 'truck' | 'upload' | 'verticalDots' | 'warning' | 'warningFill';
export interface IconProps extends IdProps {
    /**
     * A label that describes the purpose or contents of the icon. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Sets the appearance (color) of the icon.
     *
     * @defaultValue 'base'
     */
    appearance?: Appearance;
    /**
     * Adjusts the size of the icon.
     *
     * @defaultValue 'base'
     */
    size?: Extract<Size, 'extraSmall' | 'small' | 'base' | 'large' | 'fill'>;
    /**
     * Specifies which icon to display
     *
     * Check the list of available icons [here](/docs/api/checkout-ui-extensions/components/media/icon#icons)
     */
    source: IconSource;
}
/**
 * Icons are pictograms or graphic symbols.
 * They can act as wayfinding tools or as a means of communicating functionality.
 */
export declare const Icon: "Icon" & {
    readonly type?: "Icon" | undefined;
    readonly props?: IconProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Icon.d.ts.map