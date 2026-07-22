import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { BlockAlignment, BorderProps, InlineAlignment, SizingProps, SpacingProps, Display, ButtonAccessibilityRole, OverlayActivatorProps, DisclosureActivatorProps, InteractionProps, CornerProps, Opacity, BackgroundProps, IdProps } from '../shared';
export interface PressableProps extends Pick<BackgroundProps, 'background'>, BorderProps, CornerProps, IdProps, InteractionProps, SizingProps, SpacingProps, OverlayActivatorProps, DisclosureActivatorProps {
    /**
     * Changes the display of the component.
     *
     *
     * `inline` the component starts on the same line as preceding inline content and allows subsequent content to continue on the same line.
     *
     * `block` the component starts on its own new line and fills its parent.
     *
     * `auto` resets the component to its initial value. The actual value depends on the component and context.
     *
     * `none` hides the component and removes it from the accessibility tree, making it invisible to screen readers.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
     *
     * @defaultValue 'auto'
     */
    display?: MaybeResponsiveConditionalStyle<Display>;
    /**
     * A label that describes the purpose or contents of the element. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * The role of the button that will be rendered.
     *
     * `button`: renders a regular button.
     *
     * `submit`: renders a button that submits a form.
     *
     * @defaultValue 'button'
     */
    accessibilityRole?: ButtonAccessibilityRole;
    /**
     * Disables the button, disallowing any interaction
     */
    disabled?: boolean;
    /**
     * Disables the button while loading. Unlike `Button`, no indicator is rendered while loading.
     */
    loading?: boolean;
    /**
     * Callback that is run when the button or link is pressed.
     */
    onPress?: () => void;
    /**
     * Callback that is run when the button or link focus is removed.
     */
    onBlur?: () => void;
    /**
     * Callback that is run when the button or link is focused.
     */
    onFocus?: () => void;
    /**
     * Callback that is run when a pointing device button is pressed while the pointer is inside the button or link.
     */
    onPointerDown?: () => void;
    /**
     * Callback that is run when the pointing device is over (enters) the button or link.
     */
    onPointerEnter?: () => void;
    /**
     *  Callback that is run when the pointing device has left the button or link.
     */
    onPointerLeave?: () => void;
    /**
     * Callback that is run when a pointing device button is released while the pointer is inside the element button or link.
     */
    onPointerUp?: () => void;
    /**
     * Destination URL to link to. If this value is set, If this value is set, the component will render an `<a>` tag.
     */
    to?: string;
    /**
     * Position children along the cross axis
     */
    blockAlignment?: MaybeResponsiveConditionalStyle<Extract<BlockAlignment, 'start' | 'center' | 'end'>>;
    /**
     * Position children along the main axis
     */
    inlineAlignment?: MaybeResponsiveConditionalStyle<InlineAlignment>;
    /**
     * Sets the opacity of the View. The opacity will be applied to the background as well as all
     * the children of the View. Use carefully as this could decrease the contrast ratio between
     * the background and foreground elements, resulting in unreadable and inaccessible text.
     */
    opacity?: Opacity;
    /**
     * Sets the overflow behavior of the element.
     *
     * `hidden`: clips the content when it is larger than the element’s container.
     * The element will not be scrollable and the users will not be able
     * to access the clipped content by dragging or using a scroll wheel.
     *
     * `visible`: the content that extends beyond the element’s container is visible.
     *
     * @default 'visible'
     */
    overflow?: 'hidden' | 'visible';
}
/**
 * Pressable is a generic interactive component. It shares the same styling properties as View but also adds
 * pressable behavior, meaning that you can execute some logic in response to user interaction.
 * Use this component for creating interactive elements without the default styling that comes with `Button` and `Link`.
 */
export declare const Pressable: "Pressable" & {
    readonly type?: "Pressable" | undefined;
    readonly props?: PressableProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Pressable.d.ts.map