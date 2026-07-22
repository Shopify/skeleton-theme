import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { BackgroundProps, BlockAlignment, BorderProps, CornerProps, IdProps, InlineAlignment, SizingProps, Spacing, SpacingProps, ViewLikeAccessibilityRole } from '../shared';
export interface InlineStackProps extends Pick<BackgroundProps, 'background'>, BorderProps, CornerProps, IdProps, SizingProps, SpacingProps {
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help buyers
     * navigate the page.
     *
     *
     * For example:
     *
     * - In an HTML host a `'listItem'` string will render: `<li>`
     *
     * - In an HTML host a `['listItem', 'separator']` tuple will render: `<li role='separator'>`
     */
    accessibilityRole?: ViewLikeAccessibilityRole;
    /**
     * A label that describes the purpose or contents of the element. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Position children along the cross axis
     *
     * @defaultValue 'start'
     */
    blockAlignment?: MaybeResponsiveConditionalStyle<BlockAlignment>;
    /**
     * Position children along the main axis
     *
     * @defaultValue 'start'
     */
    inlineAlignment?: MaybeResponsiveConditionalStyle<InlineAlignment>;
    /**
     * Adjust spacing between children
     *
     * - `base` means the space between rows and columns is `base`.
     *
     * - [`base`, `none`] means the space between rows is `base`, space between columns is `none`.
     *
     * @defaultValue 'base'
     **/
    spacing?: MaybeResponsiveConditionalStyle<Spacing | [Spacing, Spacing]>;
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
 * InlineStack is used to lay out a horizontal row of elements. Elements always wrap.
 */
export declare const InlineStack: "InlineStack" & {
    readonly type?: "InlineStack" | undefined;
    readonly props?: InlineStackProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=InlineStack.d.ts.map