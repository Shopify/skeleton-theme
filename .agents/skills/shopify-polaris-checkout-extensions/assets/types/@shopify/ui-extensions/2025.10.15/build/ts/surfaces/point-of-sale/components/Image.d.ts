/** VERSION: undefined **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ImageProps, Key, Ref} from './components-shared.d.ts';

export type ComponentChildren = any;
/**
 * Used when an element does not have children.
 */
export interface BaseElementProps<TClass = HTMLElement> {
  key?: Key;
  ref?: Ref<TClass>;
  slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement>
  extends BaseElementProps<TClass> {
  children?: ComponentChildren;
}
export type IntrinsicElementProps<T> = T &
  BaseElementPropsWithChildren<T & HTMLElement>;
export type HtmlElementTagNameProps<T> = T & HTMLElement;

declare const tagName = 's-image';
export interface ImageJSXProps
  extends Pick<ImageProps, 'id' | 'objectFit' | 'alt'> {
  /**
   * The displayed inline width of the image.
   *
   * - `fill`: the image will takes up 100% of the available inline size.
   * - `auto`: the image will be displayed at its natural size.
   *
   * **Mobile surfaces:** Always wrap your image in a box with a set width and height.
   * ScrollViews on mobile have a dynamic height, which can cause images to appear
   * inconsistently without defined dimensions.
   *
   * @default 'fill'
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#width
   */
  inlineSize?: ImageProps['inlineSize'];
  /**
   * The image source, which should be a remote URL.
   *
   * When the image is loading or no `src` is provided, a placeholder will be rendered.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src
   */
  src?: ImageProps['src'];
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: HtmlElementTagNameProps<ImageJSXProps>;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<ImageJSXProps>;
    }
  }
}

export {tagName};
export type {ImageJSXProps};
