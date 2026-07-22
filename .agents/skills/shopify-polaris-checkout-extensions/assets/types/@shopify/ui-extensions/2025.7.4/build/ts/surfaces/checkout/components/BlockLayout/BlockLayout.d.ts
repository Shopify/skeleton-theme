import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { Rows } from '../shared';
import type { GridProps } from '../Grid/Grid';
export interface BlockLayoutProps extends Omit<GridProps, 'columns' | 'rows'> {
    /**
     * Sizes for each row of the layout.
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
    rows?: MaybeResponsiveConditionalStyle<Rows>;
}
/**
 * BlockLayout is used to lay out content over multiple rows.
 *
 * By default, all rows fill the available block space, sharing it equally.
 */
export declare const BlockLayout: "BlockLayout" & {
    readonly type?: "BlockLayout" | undefined;
    readonly props?: BlockLayoutProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=BlockLayout.d.ts.map