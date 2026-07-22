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
import type {ImageProps$1,BorderSizeKeyword, BorderStyleKeyword,ColorKeyword,MaybeAllValuesShorthandProperty} from './components-shared.d.ts';

/**
 * The subset of border size values available for the image component. These control the thickness of any border applied around the image.
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
 * The subset of border color values available for the image component.
 *
 * - `base`: The standard border color for most contexts.
 * @publicDocs
 */
export type ReducedColorKeyword = Extract<ColorKeyword, 'base'>;
/**
 * A shorthand string for specifying border properties on the image component. Supports size alone, size with color, or size with color and style — following the pattern `'size'`, `'size color'`, or `'size color style'`.
 * @publicDocs
 */
export type BorderShorthand = ReducedBorderSizeKeyword | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword}` | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword} ${BorderStyleKeyword}`;
/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. Used by the rendering engine for efficient reconciliation when lists change.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns this element to a named slot in a parent component that uses slot-based composition patterns.
     */
    slot?: Lowercase<string>;
}

declare const tagName = "s-image";
/** @publicDocs */
export interface ImageElementProps extends Pick<ImageProps$1, 'accessibilityRole' | 'alt' | 'aspectRatio' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'id' | 'inlineSize' | 'loading' | 'objectFit' | 'sizes' | 'src' | 'srcSet'> {
    /**
     * A shorthand for setting the border around the image. Accepts a size keyword alone (for example, `'base'`), a size and color (for example, `'base base'`), or a size, color, and style (for example, `'base base solid'`). Use `'none'` to remove the border.
     */
    border?: BorderShorthand;
    /**
     * The width of the border around the image. You can use a single value to apply the same width to all sides, or use the [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) to control individual sides. When set, this overrides the width value specified in the `border` shorthand.
     */
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    /**
     * The radius of the border corners around the image. You can use a single value to apply the same radius to all corners, or use the [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) to control individual corners.
     */
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<ImageProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
}
/**
 * The HTML element interface for the `s-image` custom element.
 * @publicDocs
 */
export interface ImageElement extends ImageElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface ImageProps extends ImageElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ImageElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ImageProps & BaseElementProps<ImageElement>;
        }
    }
}

export type { ImageElement, ImageElementProps, ImageProps };
