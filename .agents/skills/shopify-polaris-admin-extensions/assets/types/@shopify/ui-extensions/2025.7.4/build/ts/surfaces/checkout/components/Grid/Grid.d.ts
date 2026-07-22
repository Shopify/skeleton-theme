import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { BackgroundProps, BlockAlignment, BorderProps, Columns, CornerProps, IdProps, InlineAlignment, Rows, SizingProps, Spacing, SpacingProps, ViewLikeAccessibilityRole } from '../shared';
export interface GridProps extends Pick<BackgroundProps, 'background'>, IdProps, BorderProps, CornerProps, SizingProps, SpacingProps {
    /**
     * Sizes for each column of the layout.
     *
     *
     * `auto`: intrinsic size of the content.
     *
     * `fill`: fills the remaining available space. When multiple columns are set to `fill`, the remaining space is shared equally.
     *
     * `` `${number}%` ``: size in percentages.
     *
     * `` `${number}fr` ``: size in fractions.
     *
     * `number`: size in pixels.
     *
     *
     * - When the sum of the defined sizes is larger than the available space, elements will shrink to avoid overflow.
     * - Except when in scrollview, where the grid will fill the space with the defined sizes.
     *
     * - When only one size is set and outside of an array, the grid will have one column of that size.
     *
     * @defaultValue 'fill'
     */
    columns?: MaybeResponsiveConditionalStyle<Columns>;
    /**
     * Sizes for each row of the layout.
     *
     *
     * `auto`: intrinsic size of the content.
     *
     * `fill`: fills the remaining available space. When multiple rows are set to `fill`, the remaining space is shared equally.
     *
     * `` `${number}%` ``: size in percentages.
     *
     * `` `${number}fr` ``: size in fractions.
     *
     * `number`: size in pixels.
     *
     *
     * - When the sum of the defined sizes is larger than the available space, elements will shrink to avoid overflow.
     *
     * - When only one size is set and outside of an array, the grid will have one row of that size.
     *
     * @defaultValue 'fill'
     */
    rows?: MaybeResponsiveConditionalStyle<Rows>;
    /**
     * Adjust spacing between children.
     *
     * - `base` means the space between rows and columns is `base`.
     *
     * - [`base`, `none`] means the space between rows is `base`, space between columns is `none`.
     *
     * @defaultValue 'none'
     **/
    spacing?: MaybeResponsiveConditionalStyle<Spacing | [Spacing, Spacing]>;
    /**
     * Position children along the cross axis.
     */
    blockAlignment?: MaybeResponsiveConditionalStyle<BlockAlignment>;
    /**
     * Position children along the main axis.
     */
    inlineAlignment?: MaybeResponsiveConditionalStyle<InlineAlignment>;
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
     * A label that describes the purpose or contents of the element. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
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
 * Grid is used to lay out content in a matrix of rows and columns.
 */
export declare const Grid: "Grid" & {
    readonly type?: "Grid" | undefined;
    readonly props?: GridProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Grid.d.ts.map