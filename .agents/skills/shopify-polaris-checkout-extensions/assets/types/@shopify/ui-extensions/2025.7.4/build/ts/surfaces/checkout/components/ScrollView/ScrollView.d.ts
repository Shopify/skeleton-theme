/// <reference types="react" />
import type { BackgroundProps, BorderProps, CornerProps, IdProps, SizingProps, SpacingProps } from '../shared';
import type { MaybeResponsiveConditionalStyle } from '../../style/types';
export interface ScrollViewEvent {
    /**
     * The current scroll position, in pixels.
     */
    position: {
        /** The current scroll horizontal position, in pixels.*/
        inline: number;
        /** The current scroll vertical position, in pixels.*/
        block: number;
    };
    /**
     * A flag to indicate if the scroll is at the start or end of an axis.
     */
    scrolledTo: {
        /** A flag to indicate if the scroll is at the start or end of cross axis. */
        inline: 'start' | 'end' | null;
        /** A flag to indicate if the scroll is at the start or end of main axis. */
        block: 'start' | 'end' | null;
    };
}
export interface ScrollViewProps extends Pick<BackgroundProps, 'background'>, BorderProps, CornerProps, IdProps, SizingProps, SpacingProps {
    /**
     * A label that describes the purpose or contents of the element. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Provides a hint to the user that the area is scrollable.
     *
     * `pill`: renders a pill with a message at the end of the the scrollable area. It disappear as soon as the user starts scrolling.
     *
     * `innerShadow`: renders an inner visual hint to indicate that the content is scrollable.
     */
    hint?: 'innerShadow' | {
        type: 'pill';
        content: string;
    };
    /**
     * The direction on which the content is scrollable.
     *
     * `block`:
     * Indicates that the content is scrollable on the main axis.
     *
     * `inline`:
     * Indicates that the content is scrollable on the cross axis.
     *
     * @defaultValue block
     */
    direction?: 'block' | 'inline';
    /**
     * Scroll to a specific position or to an element when the component is first rendered.
     *
     * This property allows you to set an initial scroll position or scroll to a specific element
     * when the `ScrollView` component mounts. Note that this action will only be performed once,
     * during the initial render of the component.
     *
     * @example
     * // Scroll to 100 pixels from the top on initial render
     * <ScrollView scrollTo={100} />
     *
     * // Scroll to a specific element on initial render
     * const elementRef = useRef(null);
     * <ScrollView scrollTo={elementRef.current} />
     *
     * @note
     * This property will only take effect on the first render. Subsequent updates to this property
     * will not trigger additional scroll actions.
     */
    scrollTo?: number | HTMLElement;
    /**
     * Callback function that is called when the scroll position changes.
     * Allows to listen to events inside the component
     * returning the position of the scroll.
     *
     * Note:
     * On touch devices, the onScroll event is fired only when the user finishes scrolling
     * which differs from non touch devices, where the onScroll event is fired when the user scrolls
     */
    onScroll?: (args: ScrollViewEvent) => void;
    /**
     * Callback function that is called when the scroll position reaches one of the edges.
     */
    onScrolledToEdge?: (args: ScrollViewEvent) => void;
    /**
     * Changes the display of the component.
     *
     *
     * `auto` the component's initial value. The actual value depends on the component and context.
     *
     * `none` hides the component and removes it from the accessibility tree, making it invisible to screen readers.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
     *
     * @defaultValue 'auto'
     */
    display?: MaybeResponsiveConditionalStyle<'auto' | 'none'>;
}
/**
 * ScrollView is a container for long form content, such as order summary line items,
 * that allows for scrolling so customers can expose more content as they view.
 */
export declare const ScrollView: "ScrollView" & {
    readonly type?: "ScrollView" | undefined;
    readonly props?: ScrollViewProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ScrollView.d.ts.map