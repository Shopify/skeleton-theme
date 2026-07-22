import type { Alignment, IdProps, SizingProps, SpacingProps } from '../shared';
export type PopoverPosition = 'inlineStart' | 'inlineEnd' | 'blockStart' | 'blockEnd';
export interface PopoverProps extends IdProps, Pick<SizingProps, 'maxInlineSize' | 'minInlineSize'>, Pick<SpacingProps, 'padding'> {
    /**
     * Position the Popover relative to the activator.
     * @defaultValue 'blockStart'
     */
    position?: PopoverPosition;
    /**
     * Align the Popover in the axis determined by the position.
     * @defaultValue 'center'
     */
    alignment?: Alignment;
    /**
     * Callback to run when the Popover is opened
     */
    onOpen?: () => void;
    /**
     * Callback to run when the Popover is closed
     */
    onClose?: () => void;
}
/**
 * Popovers are similar to tooltips. They are small overlays that open on demand after a user interaction.
 * The difference is that the popover can contain more content, without cluttering the page.
 * They must be specified inside the `overlay` prop of an activator component (`Button`, `Link` or `Pressable`).
 *
 * The library automatically applies the WAI-ARIA Popover Widget pattern to both the activator and the popover content.
 */
export declare const Popover: "Popover" & {
    readonly type?: "Popover" | undefined;
    readonly props?: PopoverProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Popover.d.ts.map