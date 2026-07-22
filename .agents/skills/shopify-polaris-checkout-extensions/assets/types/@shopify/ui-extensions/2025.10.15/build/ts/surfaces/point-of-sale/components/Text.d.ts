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
import type {TextProps, Key, Ref} from './components-shared.d.ts';

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

declare const tagName = 's-text';
export interface TextJSXProps extends Pick<TextProps, 'id'> {
  /**
   * The color intensity of the text. Controls how prominent or subtle the text appears within the interface.
   *
   * @default 'base'
   */
  color?: Extract<TextProps['color'], 'base' | 'strong' | 'subdued'>;
  /**
   * The semantic meaning and default styling of the text. Other presentation properties override the default styling provided by the type. Available options:
   *
   * - `'generic'` - The default text type for general content without specific semantic meaning or emphasis.
   * - `'strong'` - A text type that provides emphasis and importance, typically rendered with increased font weight or visual prominence.
   * - `'small'` - A text type for secondary or supplementary content, typically rendered with reduced size for captions, fine print, or less important information.
   *
   * @default 'generic'
   */
  type?: Extract<TextProps['type'], 'generic' | 'strong' | 'small'>;
  /**
   * Determines the visual appearance and semantic meaning of the text. Available options:
   *
   * - `'auto'` - Lets the system automatically choose the appropriate tone based on context. Use when you want the system to determine the most appropriate styling.
   * - `'neutral'` - Gray styling for general status information that doesn't require emphasis. Use for general status updates and standard information.
   * - `'info'` - Blue styling for informational content and neutral updates. Use for informational content that provides helpful context.
   * - `'success'` - Green styling for positive states, completed actions, and successful operations. Use for positive outcomes and successful processes.
   * - `'caution'` - Yellow styling for situations that need attention but aren't urgent. Use for potential issues that require awareness.
   * - `'warning'` - Orange styling for important notices that require merchant awareness. Use for situations that need attention but aren't critical.
   * - `'critical'` - Red styling for errors, failures, and urgent issues requiring immediate action. Use for urgent issues that need immediate merchant attention.
   *
   * @default 'auto'
   */
  tone?: Extract<
    TextProps['tone'],
    'auto' | 'neutral' | 'info' | 'success' | 'warning' | 'critical' | 'caution'
  >;
  /**
   * The text content. Supports nested text elements.
   */
  children?: ComponentChildren;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: TextJSXProps;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<TextJSXProps>;
    }
  }
}

export {tagName};
export type {TextJSXProps};
