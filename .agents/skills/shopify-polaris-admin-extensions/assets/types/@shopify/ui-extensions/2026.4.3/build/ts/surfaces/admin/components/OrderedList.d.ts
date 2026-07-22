/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, OrderedListProps$1} from './shared.d.ts';

/**
 * The properties for the ordered list component. These properties define a numbered list of items with automatic numbering and proper list semantics.
 * @publicDocs
 */
export interface OrderedListProps extends OrderedListProps$1 {}

/**
 * A string containing CSS styles.
 * @publicDocs
 */
export type Styles = string;
/**
 * The configuration for rendering a custom element with a shadow DOM.
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the component's shadow DOM content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * Optional CSS styles to apply to the shadow DOM.
   */
  styles?: Styles;
};
/**
 * An object that represents the state of modifier keys and mouse button
 * during an activation event like a click.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the meta (Command on Mac, Windows key on PC) key was pressed.
   */
  metaKey: boolean;
  /**
   * Whether the control key was pressed during the event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed (0 for left, 1 for middle, 2 for right).
   */
  button: number;
}
/**
 * Options for customizing click behavior on an element.
 * @publicDocs
 */
export interface ClickOptions {
  /**
   * The original user event (such as a click or keyboard event) that triggered this programmatic click. When provided, the component preserves important event properties like modifier keys (Ctrl, Shift, Alt, Meta) and mouse button states, enabling behaviors such as opening links in a new tab when middle-clicked or Ctrl+clicked.
   */
  sourceEvent?: ActivationEventEsque;
}
/**
 * Base class for creating custom elements with Preact.
 * While this class could be used in both Node and the browser, the constructor will only be used in the browser.
 * So we give it a type of HTMLElement to avoid typing issues later where it's used, which will only happen in the browser.
 */
declare const BaseClass: typeof globalThis.HTMLElement;
declare abstract class PreactCustomElement extends BaseClass {
  /** @private */
  static get observedAttributes(): string[];
  constructor({
    styles,
    ShadowRoot: renderFunction,
    delegatesFocus,
    ...options
  }: RenderImpl);

  /** @private */
  setAttribute(name: string, value: string): void;
  /** @private */
  attributeChangedCallback(name: string): void;
  /** @private */
  connectedCallback(): void;
  /** @private */
  disconnectedCallback(): void;
  /** @private */
  adoptedCallback(): void;
  /**
   * Queue a run of the render function.
   * You shouldn't need to call this manually - it should be handled by changes to @property values.
   * @private
   */
  queueRender(): void;
  /**
   * Like the standard `element.click()`, but you can influence the behavior with a `sourceEvent`.
   *
   * For example, if the `sourceEvent` was a middle click, or has particular keys held down,
   * components will attempt to produce the desired behavior on links, such as opening the page in the background tab.
   * @private
   * @param options
   */
  click({sourceEvent}?: ClickOptions): void;
}

/**
 * The base properties for Preact elements that don't have children, providing essential attributes like keys and refs for component management.
 * @publicDocs
 */
export interface PreactBaseElementProps<TClass extends HTMLElement> {
  /**
   * A unique identifier for this element within its parent. Preact uses keys to optimize rendering performance when lists change by tracking which items have been added, removed, or reordered.
   */
  key?: preact.Key;
  /**
   * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
   */
  ref?: preact.Ref<TClass>;
  /**
   * Assigns this element to a named slot in a parent component that uses shadow DOM or slot-based composition patterns.
   */
  slot?: Lowercase<string>;
}
/**
 * The base properties for Preact elements that have children, extending the base element properties to include child content.
 * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  children?: preact.ComponentChildren;
}

/**
 * A custom element for displaying a numbered list of items with automatic numbering and proper list semantics. Use ordered list when the sequence or order of items matters, such as instructions, rankings, or step-by-step processes.
 */
declare class OrderedList
  extends PreactCustomElement
  implements OrderedListProps
{
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: OrderedList;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: OrderedListJSXProps &
        PreactBaseElementPropsWithChildren<OrderedList>;
    }
  }
}

declare const tagName = 's-ordered-list';
/**
 * The JSX properties for the ordered list component. These properties define how an ordered list is rendered in Preact or JSX.
 * @publicDocs
 */
export interface OrderedListJSXProps
  extends Partial<OrderedListProps>,
    Pick<OrderedListProps$1, 'id'> {
  /**
   * The items in the ordered list. Only list item components are accepted.
   */
  children?: ComponentChildren;
}

export {OrderedList};
export type {OrderedListJSXProps};
