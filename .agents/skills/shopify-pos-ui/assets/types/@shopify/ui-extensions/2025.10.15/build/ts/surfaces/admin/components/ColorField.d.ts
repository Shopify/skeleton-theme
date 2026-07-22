/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  TextFieldProps,
  ColorFieldProps$1,
  ComponentChildren,
} from './shared.d.ts';

/**
 * An event object with a strongly-typed currentTarget property that references the specific HTML element type.
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
 * The React-style event handler props for form field components.
 */
export interface FieldReactProps<T extends keyof HTMLElementTagNameMap> {
  /**
   * A callback that's triggered when the field's value changes as the user types.
   */
  onInput?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's triggered when the field's value changes and the field loses focus.
   */
  onChange?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's triggered when the field receives focus.
   */
  onFocus?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's triggered when the field loses focus.
   */
  onBlur?: ((event: CallbackEvent<T>) => void) | null;
}
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

declare const internals: unique symbol;
/**
 * The required props for input elements that all form controls must implement.
 */
export type PreactInputProps = Required<
  Pick<TextFieldProps, 'disabled' | 'id' | 'name' | 'value'>
>;
/**
 * The base class for form input elements that participate in form submission.
 */
declare class PreactInputElement
  extends PreactCustomElement
  implements PreactInputProps
{
  /** @private */
  static formAssociated: boolean;
  /** @private */
  [internals]: ElementInternals;
  /**
   * The callback that's triggered when the input value changes and the field loses focus.
   */
  accessor onchange: CallbackEventListener<'input'>;
  /**
   * The callback that's triggered when the input value changes as the user types.
   */
  accessor oninput: CallbackEventListener<'input'>;
  /**
   * Whether the input is disabled and can't be interacted with.
   */
  accessor disabled: PreactInputProps['disabled'];
  /**
   * The unique identifier for the input element.
   */
  accessor id: PreactInputProps['id'];
  /**
   * The name of the input, used when submitting form data.
   */
  accessor name: PreactInputProps['name'];
  /**
   * The current value of the input.
   */
  get value(): PreactInputProps['value'];
  /**
   * The current value of the input.
   */
  set value(value: PreactInputProps['value']);
  constructor(renderImpl: RenderImpl);
}

/**
 * The common props shared by all form field components in the admin UI.
 */
export type PreactFieldProps<Autocomplete extends string = string> =
  PreactInputProps &
    Required<
      Pick<
        TextFieldProps,
        | 'defaultValue'
        | 'details'
        | 'error'
        | 'label'
        | 'labelAccessibilityVisibility'
        | 'placeholder'
        | 'readOnly'
        | 'required'
      >
    > & {
      /**
       * A hint about the intended content of the field for browser autofill.
       *
       * When set to `on` (the default), this property indicates that the field should support
       * autofill, but you don't have any more semantic information on the intended
       * contents.
       *
       * When set to `off`, you're indicating that this field contains sensitive
       * information, or contents that are never saved, like one-time codes.
       *
       * Alternatively, you can provide a value which describes the
       * specific data you'd like to be entered into this field during autofill.
       *
       * @see Learn more about the set of {@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens|autocomplete values} supported in browsers.
       *
       * @default 'tel' for PhoneField
       * @default 'email' for EmailField
       * @default 'url' for URLField
       * @default 'on' for everything else
       */
      autocomplete: Autocomplete;
    };
/**
 * The base class for form field elements that includes label, error, and validation support.
 */
declare class PreactFieldElement<Autocomplete extends string = string>
  extends PreactInputElement
  implements PreactFieldProps<Autocomplete>
{
  /**
   * The callback that's triggered when the field loses focus.
   */
  accessor onblur: CallbackEventListener<'input'>;
  /**
   * The callback that's triggered when the field receives focus.
   */
  accessor onfocus: CallbackEventListener<'input'>;
  /**
   * A hint about the intended content of the field for browser autofill.
   */
  accessor autocomplete: PreactFieldProps<Autocomplete>['autocomplete'];
  /**
   * The initial value of the field when it's first rendered.
   */
  accessor defaultValue: PreactFieldProps['defaultValue'];
  /**
   * The additional text displayed below the field to provide helpful context.
   */
  accessor details: PreactFieldProps['details'];
  /**
   * The error message displayed when the field validation fails.
   */
  accessor error: PreactFieldProps['error'];
  /**
   * The text label displayed above the field.
   */
  accessor label: PreactFieldProps['label'];
  /**
   * The visibility of the label for accessibility purposes. Available values: `hidden`, `visible`.
   */
  accessor labelAccessibilityVisibility: PreactFieldProps['labelAccessibilityVisibility'];
  /**
   * The hint text displayed inside the field when it's empty.
   */
  accessor placeholder: PreactFieldProps['placeholder'];
  /**
   * Whether the field is read-only and can't be edited by the user.
   */
  accessor readOnly: PreactFieldProps['readOnly'];
  /**
   * Whether the field must be filled out before the form can be submitted.
   */
  accessor required: PreactFieldProps['required'];
  /**
   * Global keyboard event handlers for things like key bindings typically
   * ignore keystrokes originating from within input elements. Unfortunately,
   * these never account for a custom element being the input element.
   *
   * To fix this, we spoof getAttribute and hasAttribute to make a PreactFieldElement
   * appear as a contentEditable "input" when it contains a focused input element.
   * @private technically not private, but we don't want to expose this as public API
   */
  getAttribute(qualifiedName: string): string | null;
  /**
   * @private technically not private, but we don't want to expose this as public API
   */
  hasAttribute(qualifiedName: string): boolean;
  /**
   * Checks if the shadow tree contains a focused input (input, textarea, select, contentEditable element).
   * Note: this doesn't return true for focused non-field form elements like buttons.
   * @private
   */
  get isContentEditable(): boolean;
  /** @private */
  formResetCallback(): void;
  /** @private */
  connectedCallback(): void;
  constructor(renderImpl: RenderImpl);
}

/**
 * The properties for the color field component. These properties configure an input field that allows merchants to select colors using an integrated visual color picker with text input, hex color format, and optional alpha (transparency) channel support.
 */
export type ColorFieldProps = Omit<
  PreactFieldProps<Required<ColorFieldProps$1>['autocomplete']>,
  'value' | 'defaultValue'
> &
  Required<Pick<ColorFieldProps$1, 'alpha' | 'value' | 'defaultValue'>>;

/**
 * The color field custom element class that renders a color input field with integrated visual picker in the Shopify admin interface. This component allows merchants to select colors by typing hex values or using an interactive color picker, with optional support for transparency (alpha channel).
 */
declare class ColorField
  extends PreactFieldElement<ColorFieldProps['autocomplete']>
  implements ColorFieldProps
{
  /**
   * Whether the color picker includes an alpha (transparency) channel for selecting semi-transparent colors.
   *
   * @default false
   */
  accessor alpha: ColorFieldProps['alpha'];
  /**
   * The current color value, formatted as a hex color string (e.g., `#FF0000` or `#FF0000FF` with alpha).
   */
  get value(): string;
  set value(value: string);
  /** @private */
  formResetCallback(): void;
  constructor();
  /** @private */
  setInternalValue(value: string, normalize: boolean): void;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ColorField;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: ColorFieldJSXProps & PreactBaseElementProps<ColorField>;
    }
  }
}

declare const tagName = 's-color-field';
/**
 * The JSX props for the color field component. These properties extend `ColorFieldProps` with JSX-specific event callbacks for React-style event handling when used in Preact, including callbacks for color changes as the merchant interacts with the picker.
 */
export interface ColorFieldJSXProps
  extends Partial<
      Omit<ColorFieldProps, 'accessory' | 'value' | 'defaultValue'>
    >,
    Pick<ColorFieldProps$1, 'id'>,
    Required<Pick<ColorFieldProps$1, 'alpha' | 'value' | 'defaultValue'>>,
    FieldReactProps<typeof tagName> {
  /**
   * A callback that's triggered when the color value changes as the user interacts with the picker.
   */
  onInput?: (event: CallbackEvent<typeof tagName>) => void;
  /**
   * A callback that's triggered when the color value changes and the field loses focus.
   */
  onChange?: (event: CallbackEvent<typeof tagName>) => void;
}

export {ColorField};
export type {ColorFieldJSXProps};
