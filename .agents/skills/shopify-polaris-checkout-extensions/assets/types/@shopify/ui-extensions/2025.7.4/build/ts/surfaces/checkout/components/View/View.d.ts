import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { BackgroundProps, BlockAlignment, BorderProps, InlineAlignment, SizingProps, SpacingProps, VisibilityProps, Display, ViewLikeAccessibilityRole, CornerProps, Opacity, IdProps } from '../shared';
export type PositionType = 'absolute' | 'relative' | 'sticky';
export type Coordinate = number | `${number}%`;
interface PositionBlockStart {
    /**
     * Adjust the block start offset.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages. It refers to the block size of the parent component.
     */
    blockStart?: Coordinate;
}
interface PositionInlineStart {
    /**
     * Adjust the inline start offset.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages. It refers to the block size of the parent component.
     */
    inlineStart?: Coordinate;
}
interface PositionBlockEnd {
    /**
     * Adjust the block end offset.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages. It refers to the block size of the parent component.
     */
    blockEnd?: Coordinate;
}
interface PositionInlineEnd {
    /**
     * Adjust the inline end offset.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages. It refers to the block size of the parent component.
     */
    inlineEnd?: Coordinate;
}
interface PositionTypeProperty {
    /**
     * Changes how the `View` is positioned.
     *
     * @defaultValue 'relative'
     */
    type?: PositionType;
}
interface PositionBlockStartInlineStart extends PositionBlockStart, PositionInlineStart, PositionTypeProperty {
    blockEnd?: undefined;
    inlineEnd?: undefined;
}
interface PositionBlockStartInlineEnd extends PositionBlockStart, PositionInlineEnd, PositionTypeProperty {
    blockEnd?: undefined;
    inlineStart?: undefined;
}
interface PositionBlockEndInlineStart extends PositionBlockEnd, PositionInlineStart, PositionTypeProperty {
    blockStart?: undefined;
    inlineEnd?: undefined;
}
interface PositionBlockEndInlineEnd extends PositionBlockEnd, PositionInlineEnd, PositionTypeProperty {
    blockStart?: undefined;
    inlineStart?: undefined;
}
export type Position = PositionBlockStartInlineStart | PositionBlockStartInlineEnd | PositionBlockEndInlineStart | PositionBlockEndInlineEnd;
export interface Translate {
    /**
     * Adjust the translation on the cross axis.
     *
     * A percentage value refers to the block size of the View.
     */
    block?: number | `${number}%`;
    /**
     * Adjust the translation on the main axis.
     *
     * A percentage value refers to the inline size of the View.
     */
    inline?: number | `${number}%`;
}
export interface ViewProps extends Pick<BackgroundProps, 'background'>, BorderProps, CornerProps, IdProps, SizingProps, SpacingProps, VisibilityProps {
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
     * Sets the opacity of the View. The opacity will be applied to the background as well as all
     * the children of the View. Use carefully as this could decrease the contrast ratio between
     * the background and foreground elements, resulting in unreadable and inaccessible text.
     */
    opacity?: Opacity;
    /**
     * A label that describes the purpose or contents of the element. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help buyers
     * navigate the page.
     *
     *
     * For example:
     *
     * - In an HTML host a `['listItem', 'separator']` tuple will render: `<li role='separator'>`
     *
     * - In an HTML host a `listItem` string will render: `<li>`
     */
    accessibilityRole?: ViewLikeAccessibilityRole;
    /**
     * Changes how the `View` is positioned. When setting `position`, set each axis only once.
     *
     * ```
     * <View position={{blockStart, inlineEnd}} /> // Allowed; sets the `block` and `inline` axes once each
     * ```
     *
     * ```
     * <View position={{inlineStart, blockEnd}} /> // Allowed; sets the `inline` and `block` axes once each
     * ```
     *
     * ```
     * <View position={{blockStart, blockEnd}} /> // Not allowed; sets the `block` axis twice
     * ```
     *
     * ```
     * <View position={{inlineStart, inlineEnd}} /> // Not allowed; sets the `inline` axis twice
     * ```
     */
    position?: MaybeResponsiveConditionalStyle<Position>;
    /**
     * Specifies a two-dimensional translation of the View.
     */
    translate?: MaybeResponsiveConditionalStyle<Translate>;
    /**
     * Position children along the cross axis
     */
    blockAlignment?: MaybeResponsiveConditionalStyle<Extract<BlockAlignment, 'start' | 'center' | 'end'>>;
    /**
     * Position children along the main axis
     */
    inlineAlignment?: MaybeResponsiveConditionalStyle<InlineAlignment>;
    /**
     * Adjust the inline size.
     *
     * `fill`: takes all the available space.
     */
    inlineSize?: MaybeResponsiveConditionalStyle<'fill'>;
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
 *  View is a generic container component. Its contents will always be their
 * “natural” size, so this component can be useful in layout components (like `Grid`,
 * `BlockStack`, `InlineStack`) that would otherwise stretch their children to fit.
 */
export declare const View: "View" & {
    readonly type?: "View" | undefined;
    readonly props?: ViewProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=View.d.ts.map