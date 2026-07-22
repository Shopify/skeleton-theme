import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { BorderProps, Columns, CornerProps, SizingProps, SpacingProps } from '../shared';
import type { GridProps } from '../Grid/Grid';
export interface InlineLayoutProps extends Omit<GridProps, 'columns' | 'rows'>, BorderProps, CornerProps, SizingProps, SpacingProps {
    /**
     * Sizes for each column of the layout.
     *
     *
     * `auto`: intrinsic size of the element.
     *
     * `fill`: fills the remaining available space. When multiple elements are set to `fill`, the remaining space is shared equally.
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
     * - When the size of an element is not explicitly set, it will fill the remaining space available.
     *
     * - When only one size is set and outside of an array, all elements of the layout will take that size.
     *
     *
     * @defaultValue 'fill'
     */
    columns?: MaybeResponsiveConditionalStyle<Columns>;
}
/**
 * InlineLayout is used to lay out content over multiple columns.
 *
 * By default, all columns are of equal size and fill the available inline space.
 * Content does not wrap on new rows when not enough columns have been explicitly set,
 * instead they are added as new column and fill the remaining inline space.
 */
export declare const InlineLayout: "InlineLayout" & {
    readonly type?: "InlineLayout" | undefined;
    readonly props?: InlineLayoutProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=InlineLayout.d.ts.map