/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, TableBodyProps$1} from './shared.d.ts';

/**
 * The properties you can set on a table body component.
 * @publicDocs
 */
export interface TableBodyProps extends TableBodyProps$1 {}

/**
 * A string that contains CSS styles to apply to the component.
 * @publicDocs
 */
export type Styles = string;
/**
 * The implementation details for rendering a Preact custom element with a shadow root.
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the component's shadow root content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The CSS styles to apply to the component.
   */
  styles?: Styles;
};
/**
 * An object that resembles an activation event, containing information about which modifier keys were pressed and which mouse button was used.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta key (Command on Mac, Windows key on Windows) was pressed during the event.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was pressed during the event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed. A value of `0` means the primary button (usually left), `1` means the middle button, and `2` means the secondary button (usually right).
   */
  button: number;
}
/**
 * The options for customizing how a synthetic click is performed.
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
 * A component that wraps the body content of a table, which contains the data rows.
 */
declare class TableBody extends PreactCustomElement implements TableBodyProps {
  /**
   * Creates a new TableBody instance.
   */
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: TableBody;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: TableBodyJSXProps &
        PreactBaseElementPropsWithChildren<TableBody>;
    }
  }
}

/**
 * The custom element tag name for the table body component.
 */
declare const tagName = 's-table-body';
/**
 * The JSX properties you can set on a table body component.
 * @publicDocs
 */
export interface TableBodyJSXProps
  extends Partial<TableBodyProps>,
    Pick<TableBodyProps$1, 'id' | 'children'> {
  /**
   * The body content of the table, which should include table row components. This content might not have any semantic meaning when the table uses the `list` variant.
   */
  children?: ComponentChildren;
}

export {TableBody};
export type {TableBodyJSXProps};
