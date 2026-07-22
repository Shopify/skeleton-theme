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
import type {ProductThumbnailProps$1} from './components-shared.d.ts';

/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
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

declare const tagName = "s-product-thumbnail";
/** @publicDocs */
export interface ProductThumbnailElementProps extends Pick<ProductThumbnailProps$1, 'alt' | 'size' | 'sizes' | 'src' | 'srcSet' | 'totalItems'> {
    /**
     * The size of the product thumbnail image.
     *
     * - `'base'`: Default size that works well in most contexts.
     * - `'small'`: Small thumbnail, good for secondary contexts or tight layouts.
     * - `'small-100'`: Extra small thumbnail for compact displays or dense lists.
     *
     * @default 'base'
     */
    size?: Extract<ProductThumbnailProps$1['size'], 'small-100' | 'small' | 'base'>;
}
/**
 * The HTML element interface for the `s-product-thumbnail` custom element.
 */
export interface ProductThumbnailElement extends ProductThumbnailElementProps, Omit<HTMLElement, 'id'> {
}
/**
 * The properties for the product thumbnail component when it's used in JSX.
 */
export interface ProductThumbnailProps extends ProductThumbnailElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ProductThumbnailElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ProductThumbnailProps & BaseElementProps<ProductThumbnailElement>;
        }
    }
}

export type { ProductThumbnailElement, ProductThumbnailElementProps, ProductThumbnailProps };
