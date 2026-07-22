/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ExtendableEvent,
  FormProps$1,
  ComponentChildren,
} from './shared.d.ts';

/**
 * A callback event with a strongly-typed `currentTarget` property that corresponds to a specific HTML element. This provides better type safety when handling events from custom elements.
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event listener is attached to, strongly typed based on the element's tag name.
   */
  currentTarget: HTMLElementTagNameMap[T];
};

/**
 * An event listener function type for callback events with a strongly-typed `currentTarget`. This ensures the event handler receives the correct element type.
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;

/**
 * A callback event that includes the `waitUntil` method for extending asynchronous operations. This allows you to delay form submission until promises resolve, enabling async validation or data processing before the form completes its action.
 */
export interface CallbackExtendableEvent<
  TTagName extends keyof HTMLElementTagNameMap,
> extends CallbackEvent<TTagName>,
    Pick<ExtendableEvent, 'waitUntil'> {}

/**
 * An event listener function type for extendable callback events. This combines strong typing with the ability to extend the event lifecycle using `waitUntil`.
 */
export type CallbackExtendableEventListener<
  TTagName extends keyof HTMLElementTagNameMap,
> =
  | (EventListener & {
      (event: CallbackExtendableEvent<TTagName>): void;
    })
  | null;

/**
 * The properties for the form component. These properties configure the form's identifier for targeting and referencing within the admin extension.
 *
 * @publicDocs
 */
export interface FormProps extends Pick<FormProps$1, 'id'> {}

declare const tagName = 's-form';

/**
 * The JSX props for the form component. These properties extend `FormProps` with event callbacks for form submission and reset actions in JSX rendering.
 */
export interface FormJSXProps extends Partial<FormProps> {
  /**
   * A callback that's invoked when the form is submitted. Use the event's `waitUntil` method to perform async operations like validation or data processing before the submission completes.
   */
  onSubmit?: ((event: CallbackExtendableEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's invoked when the form is reset, restoring all form fields to their initial values.
   */
  onReset?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

/**
 * The CSS styles as a string, used for styling web components within their shadow DOM.
 */
export type Styles = string;
/**
 * The implementation configuration for rendering a Preact component into a shadow root. Defines the render function that returns JSX elements and optional CSS styles to apply to the component's shadow DOM.
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The render function that returns Preact/JSX elements to display in the component's shadow root.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The optional CSS styles to inject into the component's shadow DOM.
   */
  styles?: Styles;
};
/**
 * The properties of an activation event (such as a click or keyboard press) that describe which modifier keys and mouse buttons were involved. This is used to determine intended behavior like opening links in new tabs when Command/Control is pressed.
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was pressed during the activation event.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta key (Command on Mac, Windows key on Windows) was pressed during the activation event.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was pressed during the activation event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed during the activation event. `0` for primary button (left click), `1` for auxiliary button (middle click), `2` for secondary button (right click).
   */
  button: number;
}
/**
 * The options for controlling how a synthetic click behaves. Allows passing modifier key states and button information from an original event to influence link behavior such as opening in new tabs or background tabs.
 */
export interface ClickOptions {
  /**
   * The activation event (such as a click or keyboard event) whose modifier key state and button information should influence the synthetic click behavior. For example, passing an event with `metaKey: true` will cause links to open in a new tab.
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
 * The form custom element class that renders a form container in the Shopify admin interface. This component manages form submission, validation, and reset behavior for collecting merchant input.
 */
declare class Form extends PreactCustomElement implements FormProps {
  constructor();

  /**
   * A callback that's invoked when the form is submitted. Use the event's `waitUntil` method to perform async operations like validation, data processing, or API calls before the submission completes.
   */
  accessor onsubmit: CallbackExtendableEventListener<typeof tagName> | null;

  /**
   * A callback that's invoked when the form is reset, restoring all form fields to their initial values.
   */
  accessor onreset: CallbackEventListener<typeof tagName> | null;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Form;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: FormJSXProps & {
        children?: preact.ComponentChildren;
      };
    }
  }
}

export {Form};
export type {FormJSXProps};
