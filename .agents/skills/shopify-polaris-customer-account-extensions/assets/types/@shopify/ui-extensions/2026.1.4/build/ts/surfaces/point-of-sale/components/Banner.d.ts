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
  BannerProps,
  Key,
  Ref,
  ComponentChild,
} from './components-shared.d.ts';

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
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T>;

declare const tagName = 's-banner';
export interface BannerJSXProps extends Pick<BannerProps, 'heading' | 'id'> {
  /**
   * Controls whether the banner is visible or hidden. When set to `true`, the banner will be hidden from view. Use this to programmatically show or hide banners based on application state. Default is `false`.
   *
   * @default false
   */
  hidden?: BannerProps['hidden'];
  /**
   * Sets the visual appearance of the banner. The tone determines the color scheme. Available options:
   *
   * - `'auto'` - Lets the system automatically choose the appropriate tone based on context.
   * - `'success'` - Green styling for positive outcomes and successful operations.
   * - `'info'` - Blue styling for general information and neutral updates.
   * - `'warning'` - Orange styling for important notices that require attention.
   * - `'critical'` - Red styling for errors and urgent issues requiring immediate action.
   *
   * @default 'auto'
   */
  tone?: Extract<
    BannerProps['tone'],
    'auto' | 'success' | 'info' | 'warning' | 'critical'
  >;
  /**
   * The primary action element displayed within the banner, typically a button. Use this slot to provide interactive elements that allow users to respond to the banner's message, such as "Dismiss," "Learn More," or "Retry" buttons.
   */
  primaryAction?: ComponentChild;
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
export type ElementProps = Omit<BannerJSXProps, 'primaryAction'>;
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ElementProps;
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
export type {BannerJSXProps};
