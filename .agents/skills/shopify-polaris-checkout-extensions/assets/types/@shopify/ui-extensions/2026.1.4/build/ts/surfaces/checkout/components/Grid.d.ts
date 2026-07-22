/** VERSION: 0.0.0 **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {GridProps$1,MaybeResponsive, MaybeAllValuesShorthandProperty,BorderSizeKeyword, BorderStyleKeyword,AlignContentKeyword, AlignItemsKeyword, JustifyContentKeyword, JustifyItemsKeyword,ColorKeyword} from './components-shared.d.ts';

/**
 * The subset of `align-content` values available for the grid component.
 *
 * - `center`: Packs rows toward the center of the grid.
 * - `start`: Packs rows toward the start of the block axis.
 * - `end`: Packs rows toward the end of the block axis.
 * - `normal`: Default browser behavior.
 * - `space-between`: Distributes rows evenly with no space at the edges.
 * - `space-around`: Distributes rows evenly with equal space around each.
 * - `space-evenly`: Distributes rows with equal space between and at the edges.
 * - `stretch`: Stretches rows to fill the available space.
 *
 * @publicDocs
 */
export type ReducedAlignContentKeyword = Extract<AlignContentKeyword, 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>;
/**
 * The subset of `align-items` values available for the grid component.
 *
 * - `center`: Centers items along the block axis.
 * - `start`: Aligns items to the start of the block axis.
 * - `end`: Aligns items to the end of the block axis.
 * - `normal`: Default browser behavior.
 * - `baseline`: Aligns items along their text baseline.
 * - `stretch`: Stretches items to fill the cell along the block axis.
 *
 * @publicDocs
 */
export type ReducedAlignItemsKeyword = Extract<AlignItemsKeyword, 'normal' | 'stretch' | 'baseline' | 'center' | 'start' | 'end'>;
/**
 * The subset of `justify-content` values available for the grid component.
 *
 * - `center`: Packs columns toward the center of the grid.
 * - `start`: Packs columns toward the start of the inline axis.
 * - `end`: Packs columns toward the end of the inline axis.
 * - `normal`: Default browser behavior.
 * - `space-between`: Distributes columns evenly with no space at the edges.
 * - `space-around`: Distributes columns evenly with equal space around each.
 * - `space-evenly`: Distributes columns with equal space between and at the edges.
 * - `stretch`: Stretches columns to fill the available space.
 *
 * @publicDocs
 */
export type ReducedJustifyContentKeyword = Extract<JustifyContentKeyword, 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>;
/**
 * The subset of `justify-items` values available for the grid component.
 *
 * - `center`: Centers items along the inline axis.
 * - `start`: Aligns items to the start of the inline axis.
 * - `end`: Aligns items to the end of the inline axis.
 * - `normal`: Default browser behavior.
 * - `baseline`: Aligns items along their text baseline.
 * - `stretch`: Stretches items to fill the cell along the inline axis.
 *
 * @publicDocs
 */
export type ReducedJustifyItemsKeyword = Extract<JustifyItemsKeyword, 'normal' | 'stretch' | 'baseline' | 'center' | 'start' | 'end'>;
/**
 * The subset of border size values available for this component.
 *
 * - `base`: Standard border width.
 * - `large`: Thick border for strong emphasis.
 * - `large-100`: Extra thick border for maximum prominence.
 * - `large-200`: The thickest available border.
 * - `none`: No border.
 * @publicDocs
 */
export type ReducedBorderSizeKeyword = Extract<BorderSizeKeyword, 'none' | 'base' | 'large' | 'large-100' | 'large-200'>;
/**
 * The subset of border color values available for this component.
 *
 * - `base`: The standard border color for most contexts.
 * @publicDocs
 */
export type ReducedColorKeyword = Extract<ColorKeyword, 'base'>;
/**
 * A shorthand string for specifying border properties. Accepts a size alone (`'base'`), size with color (`'base base'`), or size with color and style (`'base base dashed'`). Omitted values use their defaults.
 * @publicDocs
 */
export type BorderShorthand = ReducedBorderSizeKeyword | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword}` | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword} ${BorderStyleKeyword}`;
/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}

declare const tagName = "s-grid";
/** @publicDocs */
export interface GridElementProps extends Pick<GridProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityVisibility' | 'alignContent' | 'alignItems' | 'background' | 'blockSize' | 'border' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'columnGap' | 'display' | 'gap' | 'gridTemplateColumns' | 'gridTemplateRows' | 'id' | 'inlineSize' | 'justifyContent' | 'justifyItems' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart' | 'placeContent' | 'placeItems' | 'rowGap'> {
    /**
     * Controls how the grid's rows are distributed along the block (column) axis when there is extra space. Set to an empty string to use the default.
     *
     * @default '' - meaning no override
     */
    alignContent?: MaybeResponsive<ReducedAlignContentKeyword | ''>;
    /**
     * Aligns grid items along the block (column) axis. Set to an empty string to use the default.
     *
     * @default '' - meaning no override
     */
    alignItems?: MaybeResponsive<ReducedAlignItemsKeyword | ''>;
    /**
     * The background color of the grid.
     *
     * - `base`: The standard background color for general content areas.
     * - `subdued`: A muted background for secondary or supporting content.
     * - `transparent`: No background color (the default).
     *
     * @default 'transparent'
     */
    background?: Extract<GridProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    /**
     * A shorthand for setting the border width, color, and style in a single property. Individual border properties (`borderWidth`, `borderStyle`, `borderColor`) can override values set here.
     *
     * @default 'none'
     */
    border?: BorderShorthand;
    /**
     * The color of the border using the design system's color scale. Overrides the color value set by `border`.
     *
     * @default '' - meaning no override
     */
    borderColor?: ReducedColorKeyword | '';
    /**
     * The thickness of the border on all sides. Supports 1-to-4-value shorthand syntax for specifying different widths per side. Overrides the width value set by `border`.
     *
     * @default '' - meaning no override
     */
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    /**
     * The roundedness of the grid's corners.
     *
     * - `none`: Sharp corners with no rounding.
     * - `small-100` / `small`: Subtle rounding for compact elements.
     * - `base`: Standard rounding for most use cases.
     * - `large` / `large-100`: More pronounced rounding for prominent containers.
     * - `max`: Maximum rounding, creating a pill or circular shape.
     *
     * Supports 1-to-4-value shorthand syntax for specifying different radii per corner.
     *
     * @default 'none'
     */
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<GridProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    /**
     * Controls how the grid's columns are distributed along the inline (row) axis when there is extra space. Set to an empty string to use the default.
     *
     * @default '' - meaning no override
     */
    justifyContent?: MaybeResponsive<ReducedJustifyContentKeyword | ''>;
    /**
     * Aligns grid items along the inline (row) axis. Set to an empty string to use the default.
     *
     * @default '' - meaning no override
     */
    justifyItems?: MaybeResponsive<ReducedJustifyItemsKeyword | ''>;
    /**
     * A shorthand for `justifyContent` and `alignContent` that sets both distribution axes at once.
     *
     * @default 'normal normal'
     */
    placeContent?: MaybeResponsive<`${ReducedAlignContentKeyword} ${ReducedJustifyContentKeyword}` | ReducedAlignContentKeyword>;
    /**
     * A shorthand for `justifyItems` and `alignItems` that sets both alignment axes at once.
     *
     * @default 'normal normal'
     */
    placeItems?: MaybeResponsive<`${ReducedAlignItemsKeyword} ${ReducedJustifyItemsKeyword}` | ReducedAlignItemsKeyword>;
}
/** @publicDocs */
export interface GridElement extends GridElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface GridProps extends GridElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: GridElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: GridProps & BaseElementPropsWithChildren<GridElement>;
        }
    }
}

export type { GridElement, GridElementProps, GridProps };
