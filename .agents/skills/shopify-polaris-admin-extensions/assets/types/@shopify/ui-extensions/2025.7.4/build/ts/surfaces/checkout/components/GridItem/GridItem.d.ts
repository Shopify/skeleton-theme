import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { BackgroundProps, BorderProps, CornerProps, IdProps, SizingProps, SpacingProps, ViewLikeAccessibilityRole } from '../shared';
export interface GridItemProps extends Pick<BackgroundProps, 'background'>, BorderProps, CornerProps, IdProps, SizingProps, SpacingProps {
    /**
     * Number of columns the item will span across
     */
    columnSpan?: MaybeResponsiveConditionalStyle<number>;
    /**
     * Number of rows the item will span across
     */
    rowSpan?: MaybeResponsiveConditionalStyle<number>;
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
 * GridItem can be used as children of Grid.
 *
 * It offers a way to span the element across a number of columns and rows.
 */
export declare const GridItem: "GridItem" & {
    readonly type?: "GridItem" | undefined;
    readonly props?: GridItemProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=GridItem.d.ts.map