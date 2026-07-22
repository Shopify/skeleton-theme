/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ColorPickerProps$1, ComponentChildren} from './shared.d.ts';

/**
 * An event object with a strongly-typed `currentTarget` property that references the specific HTML element type.
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The DOM element that the event listener is attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * An event listener function or null that receives a typed callback event.
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      /**
       * The callback function that's invoked when the event fires.
       */
      (event: CallbackEvent<T>): void;
    })
  | null;
/**
 * The base properties for Preact elements that don't have children, providing essential attributes like keys and refs for component management.
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
 * Properties for rendering a color picker that provides a visual interface for selecting colors with optional transparency control.
 *
 * @publicDocs
 */
export interface ColorPickerProps
  extends Required<
    Pick<ColorPickerProps$1, 'id' | 'alpha' | 'value' | 'defaultValue' | 'name'>
  > {}

/**
 * A string containing CSS styles to be applied to the component.
 */
export type Styles = string;
/**
 * The implementation details for rendering a custom element with a shadow DOM.
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * A function that renders the component's shadow DOM content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The CSS styles to apply to the component.
   */
  styles?: Styles;
};
/**
 * An object containing information about keyboard and mouse button states during an activation event.
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta (Command on Mac, Windows key on PC) key was pressed during the event.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was pressed during the event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed during the event.
   */
  button: number;
}
/**
 * The options for programmatically triggering a click event on an element.
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
declare const BaseClass$1: typeof globalThis.HTMLElement;
declare abstract class PreactCustomElement extends BaseClass$1 {
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

declare const internals: unique symbol;
/**
 * The base class for form-associated components that can participate in form submission.
 */
declare class BaseClass extends PreactCustomElement {
  /**
   * Whether this element can participate in form submission.
   */
  static formAssociated: boolean;
  constructor(renderImpl: RenderImpl);
  /** @private */
  [internals]: ElementInternals;
}
/**
 * A visual color picker component that allows users to select colors from a color spectrum interface.
 */
declare class ColorPicker extends BaseClass implements ColorPickerProps {
  /**
   * Whether the color picker includes an alpha (transparency) channel for selecting semi-transparent colors.
   *
   * @default false
   */
  accessor alpha: boolean;
  /**
   * The callback that's triggered when the selected color changes and the picker loses focus.
   */
  accessor onchange: CallbackEventListener<typeof tagName> | null;
  /**
   * The callback that's triggered when the selected color changes as the user interacts with the picker.
   */
  accessor oninput: CallbackEventListener<typeof tagName> | null;
  /**
   * The name of the picker, used when submitting form data.
   */
  accessor name: string;
  /**
   * The initial color value when the picker first renders, formatted as a hex color string (e.g., `#FF0000` or `#FF0000FF` with alpha).
   */
  accessor defaultValue: string;
  /**
   * The current color value, formatted as a hex color string (e.g., `#FF0000` or `#FF0000FF` with alpha).
   */
  get value(): string;
  /**
   * The current color value, formatted as a hex color string (e.g., `#FF0000` or `#FF0000FF` with alpha).
   */
  set value(value: string);
  /** @private */
  formResetCallback(): void;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ColorPicker;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: ColorPickerJSXProps & PreactBaseElementProps<ColorPicker>;
    }
  }
}

declare const tagName = 's-color-picker';
/**
 * The JSX props interface for the color picker component when used in React/Preact.
 */
export interface ColorPickerJSXProps
  extends Partial<ColorPickerProps>,
    Pick<
      ColorPickerProps$1,
      'id' | 'alpha' | 'value' | 'defaultValue' | 'name'
    > {
  /**
   * A callback that's triggered when the selected color changes as the user interacts with the picker.
   */
  onInput?: (event: CallbackEvent<typeof tagName>) => void | null;
  /**
   * A callback that's triggered when the selected color changes and the picker loses focus.
   */
  onChange?: (event: CallbackEvent<typeof tagName>) => void | null;
}

export {ColorPicker};
export type {ColorPickerJSXProps};
