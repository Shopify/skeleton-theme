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
import type {StackProps$1,MaybeAllValuesShorthandProperty, MaybeResponsive,BorderSizeKeyword, BorderStyleKeyword,ColorKeyword} from './components-shared.d.ts';

/**
 * The subset of border size values available for this component.
 *
 * - `base`: Standard border width.
 * - `large`: Thick border for strong emphasis.
 * - `large-100`: Extra thick border for maximum prominence.
 * - `large-200`: The thickest available border.
 * - `none`: No border.
 */
export type ReducedBorderSizeKeyword = Extract<BorderSizeKeyword, 'none' | 'base' | 'large' | 'large-100' | 'large-200'>;
/**
 * The subset of border color values available for this component.
 *
 * - `base`: The standard border color for most contexts.
 */
export type ReducedColorKeyword = Extract<ColorKeyword, 'base'>;
/**
 * A shorthand string for specifying border properties. Accepts a size alone (`'base'`), size with color (`'base base'`), or size with color and style (`'base base dashed'`). Omitted values use their defaults.
 */
export type BorderShorthand = ReducedBorderSizeKeyword | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword}` | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword} ${BorderStyleKeyword}`;
/**
 * Used when an element does not have children.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}

declare const tagName = "s-stack";
/** @publicDocs */
export interface StackElementProps extends Pick<StackProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'alignContent' | 'alignItems' | 'background' | 'blockSize' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'columnGap' | 'direction' | 'display' | 'gap' | 'id' | 'inlineSize' | 'justifyContent' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart' | 'rowGap'> {
    /**
     * The semantic meaning of the stack's content, used by assistive technologies.
     *
     * - `aside`: Supporting content related to the main content.
     * - `footer`: Information such as copyright, navigation links, and privacy statements.
     * - `header`: A page or section header.
     * - `main`: The primary content of the page.
     * - `section`: A generic section that should have a heading or `accessibilityLabel`.
     * - `status`: A live region with advisory information that is not urgent.
     * - `none`: Strips semantic meaning while keeping visual styling.
     * - `navigation`: A major group of navigation links.
     * - `ordered-list`: A list of ordered items.
     * - `list-item`: An item inside a list.
     * - `list-item-separator`: A divider between list items.
     * - `unordered-list`: A list of unordered items.
     * - `separator`: A divider that separates sections of content.
     * - `alert`: Important, usually time-sensitive information.
     * - `generic`: A nameless container with no semantic meaning (renders a `<div>`).
     *
     * @default 'generic'
     */
    accessibilityRole?: Extract<StackProps$1['accessibilityRole'], 'main' | 'header' | 'footer' | 'section' | 'aside' | 'navigation' | 'ordered-list' | 'list-item' | 'list-item-separator' | 'unordered-list' | 'separator' | 'status' | 'alert' | 'generic' | 'none'>;
    /**
     * The background color of the stack.
     *
     * - `base`: The standard background color for general content areas.
     * - `subdued`: A muted background for secondary or supporting content.
     * - `transparent`: No background color (the default).
     *
     * @default 'transparent'
     */
    background?: Extract<StackProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    /**
     * A shorthand for setting the border width, color, and style in a single property. Individual border properties (`borderWidth`, `borderStyle`) can override values set here.
     *
     * @default 'none'
     */
    border?: BorderShorthand;
    /**
     * The thickness of the border on all sides. Supports 1-to-4-value shorthand syntax for specifying different widths per side. Overrides the width value set by `border`.
     *
     * @default '' - meaning no override
     */
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    /**
     * The roundedness of the stack's corners.
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
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<StackProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    /**
     * Controls how lines of content are distributed along the cross axis when there is extra space.
     *
     * - `normal`: Default browser behavior.
     * - `space-between`: Distributes lines evenly with no space at the edges.
     * - `space-around`: Distributes lines evenly with equal space around each.
     * - `space-evenly`: Distributes lines with equal space between and at the edges.
     * - `stretch`: Stretches lines to fill the available space.
     * - `center`: Packs lines toward the center.
     * - `start`: Packs lines toward the start of the cross axis.
     * - `end`: Packs lines toward the end of the cross axis.
     *
     * @default 'normal'
     */
    alignContent?: MaybeResponsive<Extract<StackProps$1['alignContent'], 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>>;
    /**
     * Controls how child elements are aligned along the cross axis.
     *
     * - `normal`: Default browser behavior.
     * - `stretch`: Stretches children to fill the cross axis.
     * - `center`: Centers children along the cross axis.
     * - `start`: Aligns children to the start of the cross axis.
     * - `end`: Aligns children to the end of the cross axis.
     *
     * @default 'normal'
     */
    alignItems?: MaybeResponsive<Extract<StackProps$1['alignItems'], 'normal' | 'stretch' | 'center' | 'start' | 'end'>>;
    /**
     * Controls how child elements are distributed along the main axis.
     *
     * - `normal`: Default browser behavior.
     * - `space-between`: Distributes children evenly with no space at the edges.
     * - `space-around`: Distributes children evenly with equal space around each.
     * - `space-evenly`: Distributes children with equal space between and at the edges.
     * - `stretch`: Stretches children to fill the available space.
     * - `center`: Packs children toward the center.
     * - `start`: Packs children toward the start of the main axis.
     * - `end`: Packs children toward the end of the main axis.
     *
     * @default 'normal'
     */
    justifyContent?: MaybeResponsive<Extract<StackProps$1['justifyContent'], 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>>;
}
export interface StackElement extends StackElementProps, Omit<HTMLElement, 'id'> {
}
export interface StackProps extends StackElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: StackElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: StackProps & BaseElementPropsWithChildren<StackElement>;
        }
    }
}

export type { StackElement, StackElementProps, StackProps };
