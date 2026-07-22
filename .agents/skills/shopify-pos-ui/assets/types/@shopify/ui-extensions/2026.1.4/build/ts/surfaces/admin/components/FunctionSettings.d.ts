/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  FunctionSettingsProps$1,
  ExtendableEvent,
  ComponentChildren,
} from './shared.d.ts';

/**
 * A callback event with a strongly-typed `currentTarget` property that corresponds to a specific HTML element. This provides better type safety when handling events from custom elements.
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event listener is attached to, strongly typed based on the element's tag name.
   */
  currentTarget: HTMLElementTagNameMap[T];
};

/**
 * An event listener function type for callback events with a strongly-typed `currentTarget`. This ensures the event handler receives the correct element type.
 * @publicDocs
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;

/**
 * An event listener function type for error events that includes an `error` property. This is used for handling validation errors and submission failures in forms.
 * @publicDocs
 */
export type CallbackErrorEventListener<
  TTagName extends keyof HTMLElementTagNameMap,
  TError extends Error = Error,
> =
  | (EventListener & {
      (
        event: CallbackEvent<TTagName> & {
          /**
           * The error that occurred during the operation.
           */
          error: TError;
        },
      ): void;
    })
  | null;

/**
 * A callback event that includes the `waitUntil` method for extending asynchronous operations. This allows you to delay event completion until promises resolve, enabling async operations during event handling.
 * @publicDocs
 */
export interface CallbackExtendableEvent<
  TTagName extends keyof HTMLElementTagNameMap,
> extends CallbackEvent<TTagName>,
    Pick<ExtendableEvent, 'waitUntil'> {}

/**
 * An event listener function type for extendable callback events. This combines strong typing with the ability to extend the event lifecycle using `waitUntil`.
 * @publicDocs
 */
export type CallbackExtendableEventListener<
  TTagName extends keyof HTMLElementTagNameMap,
> =
  | (EventListener & {
      (event: CallbackExtendableEvent<TTagName>): void;
    })
  | null;

/**
 * The properties for the function settings component. These properties configure the form's identifier for configuring Shopify Function settings in the admin interface.
 * @publicDocs
 */
export interface FunctionSettingsProps
  extends Pick<FunctionSettingsProps$1, 'id'> {}

declare const tagName = 's-function-settings';

/**
 * The JSX props for the function settings component. These properties extend `FunctionSettingsProps` with event callbacks for form submission, reset, and error handling in JSX rendering.
 * @publicDocs
 */
export interface FunctionSettingsJSXProps
  extends Partial<
    FunctionSettingsProps & Pick<FunctionSettingsProps$1, 'onError'>
  > {
  /**
   * An optional callback function that'll be run by the admin when the user
   * commits their changes in the admin-rendered part of the function settings
   * experience. If `event.waitUntil` is called with a promise, the admin will wait for the
   * promise to resolve before committing any changes to Shopify’s servers. If
   * the promise rejects, the admin will abort the changes and display an error,
   * using the `message` property of the error you reject with.
   */
  onSubmit?: ((event: CallbackExtendableEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's invoked when the function settings form is reset, restoring all form fields to their initial values.
   */
  onReset?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

/**
 * The CSS styles as a string, used for styling web components within their shadow DOM.
 * @publicDocs
 */
export type Styles = string;
/**
 * The implementation configuration for rendering a Preact component into a shadow root. Defines the render function that returns JSX elements and optional CSS styles to apply to the component's shadow DOM.
 * @publicDocs
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
 * @publicDocs
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
 * @publicDocs
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
 * The error event type that's passed to the `onError` callback of function settings. This event contains validation errors that occurred when committing function settings to Shopify's servers.
 * @publicDocs
 */
export type FunctionSettingsErrorEvent = Parameters<
  NonNullable<FunctionSettingsProps$1['onError']>
>[0];

/**
 * The function settings custom element class that renders a specialized form for configuring Shopify Function settings in the admin interface. This component manages function configuration submission, validation, and error handling.
 */
declare class FunctionSettings
  extends PreactCustomElement
  implements FunctionSettingsProps
{
  constructor();
  /**
   * An optional callback function that'll be run by the admin when the user
   * commits their changes in the admin-rendered part of the function settings
   * experience. If `event.waitUntil` is called with a promise, the admin will wait for the
   * promise to resolve before committing any changes to Shopify’s servers. If
   * the promise rejects, the admin will abort the changes and display an error,
   * using the `message` property of the error you reject with.
   */
  accessor onsubmit: CallbackExtendableEventListener<typeof tagName> | null;

  /**
   * An optional callback function that'll be run by the admin when
   * committing the changes to Shopify’s servers fails. The error event you receive includes
   * an `error` property that's an `AggregateError` object. This object includes
   * an array of errors that were caused by data your extension provided.
   * Network errors and user errors that are out of your control won't be reported here.
   *
   * In the `onError` callback, you should update your extension’s UI to
   * highlight the fields that caused the errors, and display the error messages
   * to the user.
   */
  accessor onerror: CallbackErrorEventListener<
    typeof tagName,
    FunctionSettingsErrorEvent['error']['errors'][0]
  > | null;

  /**
   * A callback that's invoked when the function settings form is reset, restoring all form fields to their initial values.
   */
  accessor onreset: CallbackEventListener<typeof tagName> | null;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: FunctionSettings;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: FunctionSettingsJSXProps & {
        children?: preact.ComponentChildren;
      };
    }
  }
}

export {FunctionSettings};
/**
 * @publicDocs
 */
export type {FunctionSettingsJSXProps};
