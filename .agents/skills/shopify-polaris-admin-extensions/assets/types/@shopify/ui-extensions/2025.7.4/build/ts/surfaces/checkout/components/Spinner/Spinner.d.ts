import type { Appearance, IdProps, Size } from '../shared';
export interface SpinnerProps extends IdProps {
    /**
     * Adjusts the size of the icon.
     *
     * @defaultValue 'base'
     */
    size?: Extract<Size, 'extraSmall' | 'small' | 'base' | 'large' | 'fill'>;
    /**
     * Sets the appearance (color) of the icon.
     *
     * @defaultValue 'accent'
     */
    appearance?: Extract<Appearance, 'accent' | 'monochrome'>;
    /**
     * A label to use for the Spinner that will be used for buyers using
     * assistive technologies like screen readers. If will also be used to replace
     * the animated loading indicator when buyers prefers reduced motion. If not included,
     * it will use the loading indicator for all buyers.
     */
    accessibilityLabel?: string;
}
/**
 * Spinner is used to notify buyers that their action is being processed.
 * The Spinner is usually used when sending or receiving data from a server.
 */
export declare const Spinner: "Spinner" & {
    readonly type?: "Spinner" | undefined;
    readonly props?: SpinnerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Spinner.d.ts.map