import type { PaddingProps, SizingProps } from '../shared/box';
import { ContentDistribution, ContentPosition, SpacingKeyword, GapProps } from '../shared/inner-layouts';
import { HorizontalSpacing, Spacing, VerticalSpacing } from '../shared/deprecated-types';
/**
 *
 * @deprecated Use the `block` or `inline` as a value instead.
 */
type DeprecatedStackDirection = 'vertical' | 'horizontal';
export interface StackProps extends PaddingProps, SizingProps, GapProps {
    /**
     * The direction in which children are placed within the `Stack` component. Use `'block'` for vertical arrangement along the block axis without wrapping, or `'inline'` for horizontal arrangement along the inline axis with automatic wrapping.
     *
     * @default 'inline'
     */
    direction?: 'inline' | 'block' | DeprecatedStackDirection;
    /**
     * The alignment of the children along the main axis.
     *
     * @defaultValue 'flex-start'
     * @deprecated Use the `justifyContent` prop instead.
     */
    alignment?: ContentPosition | ContentDistribution;
    /**
     * The alignment of the `Stack` component along the main axis, controlling how space is distributed between and around content items.
     * Learn more about [justify-content on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     *
     * @default 'start'
     */
    justifyContent?: ContentPosition | ContentDistribution;
    /**
     * The alignment of the `Stack` component along the cross axis, controlling how content is distributed when there's extra space.
     * Learn more about [align-content on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     *
     * @default 'start'
     */
    alignContent?: 'stretch' | ContentPosition | ContentDistribution;
    /**
     * The alignment of the `Stack` component's children along the cross axis, controlling how individual items are positioned.
     * Learn more about [align-items on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     *
     * @default 'stretch'
     */
    alignItems?: 'stretch' | 'baseline' | ContentPosition;
    /**
     * The vertical padding around the `Stack` component.
     *
     * @deprecated Use the `paddingBlock` prop instead.
     */
    paddingVertical?: VerticalSpacing;
    /**
     * The horizontal padding around the `Stack` component.
     *
     * @deprecated Use the `paddingInline` prop instead.
     */
    paddingHorizontal?: HorizontalSpacing;
    /**
     * The spacing between each child in the `Stack` component.
     *
     * @defaultValue 1
     * @deprecated Use the `gap` prop instead.
     */
    spacing?: Spacing;
    /**
     * The size of the gap between each child in the `Stack` component.
     *
     * @defaultValue '0'
     */
    gap?: SpacingKeyword;
    /**
     * The spacing between elements in the block axis. Overrides the row value of gap.
     *
     * @default '' - meaning no override
     */
    rowGap?: SpacingKeyword | '';
    /**
     * The spacing between elements in the inline axis. Overrides the column value of gap.
     *
     * @default '' - meaning no override
     */
    columnGap?: SpacingKeyword | '';
    /**
     * A boolean that determines whether the children should be stretched to fill the cross axis.
     */
    flexChildren?: boolean;
    /**
     * The flex value for the `Stack` component. A value of 1 will stretch the component to fill the parent container.
     */
    flex?: number;
    /**
     * The wrap behavior for the children of the `Stack` component.
     *
     * @deprecated This property has no effect as content will always wrap.
     */
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}
export declare const Stack: "Stack" & {
    readonly type?: "Stack" | undefined;
    readonly props?: StackProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Stack.d.ts.map