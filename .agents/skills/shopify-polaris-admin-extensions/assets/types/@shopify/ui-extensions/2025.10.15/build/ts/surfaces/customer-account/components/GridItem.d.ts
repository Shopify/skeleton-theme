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
import type {GridItemProps$1,BorderSizeKeyword, BorderStyleKeyword,ColorKeyword,MaybeAllValuesShorthandProperty} from './components-shared.d.ts';

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

declare const tagName = "s-grid-item";
/** @publicDocs */
export interface GridItemProps extends Pick<GridItemProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityVisibility' | 'background' | 'blockSize' | 'border' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'display' | 'gridColumn' | 'gridRow' | 'id' | 'inlineSize' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart'> {
    /**
     * The background color of the grid item.
     *
     * - `base`: The standard background color for general content areas.
     * - `subdued`: A muted background for secondary or supporting content.
     * - `transparent`: No background color (the default).
     *
     * @default 'transparent'
     */
    background?: Extract<GridItemProps$1['background'], 'transparent' | 'subdued' | 'base'>;
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
     * The roundedness of the grid item's corners.
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
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<GridItemProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
}
/** @publicDocs */
export interface GridItemElement extends GridItemProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: GridItemElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: GridItemProps & BaseElementPropsWithChildren<GridItemElement>;
        }
    }
}

export type { GridItemElement, GridItemProps };
