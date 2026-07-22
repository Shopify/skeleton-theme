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
import type {
  EmptyStateProps,
  Key,
  Ref,
  ComponentChild,
} from './components-shared.d.ts';

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

declare const tagName = 's-empty-state';
export interface EmptyStateJSXProps extends Pick<EmptyStateProps, 'heading'> {
  /**
   * The subheading of the empty state.
   */
  subheading?: string;
  /**
   * The primary action to perform, provided as a button or link type element.
   */
  primaryAction?: ComponentChild;
  /**
   * The secondary actions to perform, provided as button or link type elements.
   */
  secondaryActions?: ComponentChild;
  /**
   * The graphic to display in the empty state. The only supported components is icon, with a type of `alert-circle`, `search`, `info`, or `circle-info`.
   */
  graphic?: ComponentChild;
}
export type ElementProps = Omit<
  EmptyStateJSXProps,
  'primaryAction' | 'secondaryActions' | 'graphic'
>;
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: HtmlElementTagNameProps<ElementProps>;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<ElementProps>;
    }
  }
}

export {tagName};
export type {EmptyStateJSXProps};
