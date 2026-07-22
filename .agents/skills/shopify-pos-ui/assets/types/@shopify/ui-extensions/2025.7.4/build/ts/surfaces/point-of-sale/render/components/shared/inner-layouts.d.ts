import { SizeKeyword } from './sizes';
/**
 * Spacing values that can be used for gaps between elements, including all size keywords and `'none'` for no spacing.
 */
export type SpacingKeyword = SizeKeyword | 'none';
export interface GapProps {
    /**
     * Adjusts the spacing between child elements on both axes using predefined spacing values.
     *
     * @default 'none'
     */
    gap?: SpacingKeyword;
    /**
     * Adjusts the spacing between elements in the block axis (vertical spacing in horizontal writing modes). Overrides the row value from `gap`.
     *
     * @default '' - meaning no override
     */
    rowGap?: SpacingKeyword | '';
    /**
     * Adjusts the spacing between elements in the inline axis (horizontal spacing in horizontal writing modes). Overrides the column value from `gap`.
     *
     * @default '' - meaning no override
     */
    columnGap?: SpacingKeyword | '';
}
/**
 * Defines positioning values for aligning content within a container.
 */
export type ContentPosition = 'center' | 'start' | 'end';
/**
 * Defines distribution strategies for spacing content within a container.
 */
export type ContentDistribution = 'space-around' | 'space-between' | 'space-evenly';
//# sourceMappingURL=inner-layouts.d.ts.map