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
import type {HeadingProps, Key, Ref} from './components-shared.d.ts';

export type ComponentChildren = any;
/**
 * The base props for elements without children, providing key, ref, and slot properties.
 */
export interface BaseElementProps<TClass = HTMLElement> {
  /**
   * A unique identifier for the element in lists. Used by Preact for efficient rendering and reconciliation.
   */
  key?: Key;
  /**
   * A reference to the underlying DOM element. Commonly used to access the element directly for imperative operations.
   */
  ref?: Ref<TClass>;
  /**
   * The named [slot](/docs/api/polaris/using-polaris-web-components#slots) this element should be placed in when used within a web component.
   */
  slot?: Lowercase<string>;
}
/**
 * The base props for elements with children, extending `BaseElementProps` with children support.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement>
  extends BaseElementProps<TClass> {
  /**
   * The content of the heading, typically text that describes the section or page it introduces.
   */
  children?: ComponentChildren;
}
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T>;

declare const tagName = 's-heading';
export interface HeadingJSXProps extends Pick<HeadingProps, 'id'> {
  /**
   * The content of the heading, typically text that describes the section or page it introduces.
   */
  children?: ComponentChildren;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: HeadingJSXProps;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<HeadingJSXProps>;
    }
  }
}

export {tagName};
export type {HeadingJSXProps};
