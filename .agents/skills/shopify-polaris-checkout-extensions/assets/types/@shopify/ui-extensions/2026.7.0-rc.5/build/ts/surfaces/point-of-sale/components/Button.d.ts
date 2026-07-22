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
import type {ButtonProps, Key, Ref} from './components-shared.d.ts';

/** @publicDocs */
export type ComponentChildren = any;
/**
 * The base props for elements without children, providing key, ref, and slot properties.
 * @publicDocs
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
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement>
  extends BaseElementProps<TClass> {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
/** @publicDocs */
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T & HTMLElement>;
/**
 * Represents the event object passed to callback functions when interactive events occur. Contains metadata about the event, including the target element, event phase, and propagation behavior.
 * @publicDocs
 */
export interface CallbackEvent<T extends keyof HTMLElementTagNameMap> {
  /**
   * The element that the event listener is attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
  /**
   * Whether the event bubbles up through the DOM tree.
   */
  bubbles?: boolean;
  /**
   * Whether the event can be canceled.
   */
  cancelable?: boolean;
  /**
   * Whether the event will trigger listeners outside of a shadow root.
   */
  composed?: boolean;
  /**
   * Additional data associated with the event.
   */
  detail?: any;
  /**
   * The current phase of the event flow.
   */
  eventPhase: number;
  /**
   * The element that triggered the event.
   */
  target: HTMLElementTagNameMap[T] | null;
}

declare const tagName = 's-button';
/** @publicDocs */
export interface ButtonJSXProps
  extends Pick<
    ButtonProps,
    'id' | 'disabled' | 'command' | 'commandFor' | 'loading'
  > {
  /**
   * Sets the action the `commandFor` should take when this clickable is activated:
   * - `--auto`: A default action for the target component
   * - `--show`: Shows the target component
   * - `--hide`: Hides the target component
   * - `--toggle`: Toggles the target component
   *
   * @default '--auto'
   * Learn more about [button command on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
   */
  command?: Extract<
    ButtonProps['command'],
    '--auto' | '--show' | '--hide' | '--toggle'
  >;
  /**
   * Sets the tone of the button, based on the intention of the information being conveyed.
   *
   * - `'auto'` - Automatically determines the appropriate tone based on context.
   * - `'neutral'` - The standard tone for general actions and interactions.
   * - `'caution'` - Indicates actions that require careful consideration.
   * - `'warning'` - Alerts users to potential issues or important information.
   * - `'critical'` - Used for destructive actions like deleting or removing content.
   *
   * @default 'auto'
   */
  tone?: Extract<
    ButtonProps['tone'],
    'auto' | 'critical' | 'neutral' | 'warning' | 'caution'
  >;
  /**
   * Changes the visual appearance of the button.
   * - `primary`: Creates a prominent call-to-action button with high visual emphasis for the most important action on a screen.
   * - `secondary`: Provides a less prominent button appearance for supporting actions and secondary interactions.
   *
   * @default 'auto' - the variant is automatically determined by the button's context
   */
  variant?: Extract<ButtonProps['variant'], 'primary' | 'secondary'>;
  /**
   * An event that's called when the button is activated.
   */
  onClick?: (event: CallbackEvent<typeof tagName>) => void;
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ButtonJSXProps & HTMLElement;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<ButtonJSXProps>;
    }
  }
}

export {tagName};
export type {ButtonJSXProps};
