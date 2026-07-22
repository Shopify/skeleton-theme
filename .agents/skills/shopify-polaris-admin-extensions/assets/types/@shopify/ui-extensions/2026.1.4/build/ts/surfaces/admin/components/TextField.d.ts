/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, TextFieldProps$1} from './shared.d.ts';

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
 * The JSX-style event callback props for form field components. These properties provide React-like event handling for input, change, focus, and blur events.
 * @publicDocs
 */
export interface FieldReactProps<T extends keyof HTMLElementTagNameMap> {
  /**
   * A callback that's invoked when the user makes any changes in the field. This fires on every keystroke or modification. Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's invoked when the user has finished editing the field, such as when they blur the field or press Enter. This fires less frequently than `onInput`. Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's invoked when the field receives focus, typically when the user clicks into it or tabs to it. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
   */
  onFocus?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's invoked when the field loses focus, typically when the user clicks away or tabs out of it. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
   */
  onBlur?: ((event: CallbackEvent<T>) => void) | null;
}
/**
 * The base properties for Preact elements without children. Provides `key`, `ref`, and `slot` properties for element identification, DOM access, and slot-based positioning.
 * @publicDocs
 */
export interface PreactBaseElementProps<TClass extends HTMLElement> {
  /**
   * A unique identifier for the element when used in lists. Preact uses keys for efficient rendering and reconciliation when lists change.
   */
  key?: preact.Key;
  /**
   * A reference to the underlying DOM element. Typically created with `useRef()` to access the element directly for imperative operations like focusing or measuring.
   */
  ref?: preact.Ref<TClass>;
  /**
   * The named slot this element should be placed in when used within a web component. Learn more about [using slots](/docs/api/app-ui/using-web-components#slots).
   */
  slot?: Lowercase<string>;
}
/**
 * The base properties for Preact elements with children. Extends `PreactBaseElementProps` with the ability to render child elements.
 * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  /**
   * The child elements to render within this component.
   */
  children?: preact.ComponentChildren;
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

declare const internals: unique symbol;
/**
 * The base properties for an input element that participates in form submission. Defines the core properties needed for form integration including identifier, name, value, and disabled state.
 * @publicDocs
 */
export type PreactInputProps = Required<
  Pick<TextFieldProps$1, 'disabled' | 'id' | 'name' | 'value'>
>;
/** @private */
declare class PreactInputElement
  extends PreactCustomElement
  implements PreactInputProps
{
  static formAssociated: boolean;
  /** @private */
  [internals]: ElementInternals;
  /**
   * A callback that's invoked when the user has finished editing the field, such as when they blur the field.
   */
  accessor onchange: CallbackEventListener<'input'>;
  /**
   * A callback that's invoked when the user makes any changes in the field.
   */
  accessor oninput: CallbackEventListener<'input'>;
  /**
   * Whether the field is disabled, disallowing any interaction.
   *
   * @default false
   */
  accessor disabled: PreactInputProps['disabled'];
  /**
   * An identifier for the field.
   */
  accessor id: PreactInputProps['id'];
  /**
   * An identifier for the field that's unique within the nearest containing form.
   */
  accessor name: PreactInputProps['name'];
  /**
   * The current value for the field.
   */
  get value(): PreactInputProps['value'];
  set value(value: PreactInputProps['value']);
  constructor(renderImpl: RenderImpl);
}

/**
 * The base properties for form field elements that support labels, validation, and autocomplete. Extends `PreactInputProps` with additional form field features like labels, placeholders, error messages, and autocomplete hints.
 * @publicDocs
 */
export type PreactFieldProps<Autocomplete extends string = string> =
  PreactInputProps &
    Required<
      Pick<
        TextFieldProps$1,
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
       * A hint about the intended content of the field for browser autocomplete functionality. When set to `'on'` (the default), this indicates that the field should support autofill, but you don't have specific semantic information about the contents. When set to `'off'`, you're indicating that this field contains sensitive information or contents that are never saved, like one-time codes. Alternatively, you can provide a specific autocomplete value that describes the data you'd like to be entered during autofill, such as `'email'`, `'name'`, or `'street-address'`.
       *
       * @see Learn more about the set of [autocomplete values](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens) supported in browsers.
       *
       * @default 'tel' for PhoneField
       * @default 'email' for EmailField
       * @default 'url' for URLField
       * @default 'on' for everything else
       */
      autocomplete: Autocomplete;
    };
/** @private */
declare class PreactFieldElement<Autocomplete extends string = string>
  extends PreactInputElement
  implements PreactFieldProps<Autocomplete>
{
  /**
   * A callback that's invoked when the field loses focus.
   */
  accessor onblur: CallbackEventListener<'input'>;
  /**
   * A callback that's invoked when the field receives focus.
   */
  accessor onfocus: CallbackEventListener<'input'>;
  /**
   * A hint as to the intended content of the field for autocomplete purposes.
   */
  accessor autocomplete: PreactFieldProps<Autocomplete>['autocomplete'];
  /**
   * The initial value for the field when it's first rendered.
   */
  accessor defaultValue: PreactFieldProps['defaultValue'];
  /**
   * Additional descriptive text to display below the field that provides supplementary information.
   */
  accessor details: PreactFieldProps['details'];
  /**
   * An error message to display below the field, indicating validation failure or other issues.
   */
  accessor error: PreactFieldProps['error'];
  /**
   * The text label to display for the field, describing what the user should enter.
   */
  accessor label: PreactFieldProps['label'];
  /**
   * Controls the visibility of the label for accessibility purposes.
   */
  accessor labelAccessibilityVisibility: PreactFieldProps['labelAccessibilityVisibility'];
  /**
   * The placeholder text that's displayed inside the field when it's empty, providing a hint about expected input.
   */
  accessor placeholder: PreactFieldProps['placeholder'];
  /**
   * Whether the field is read-only, preventing edits while still allowing focus and selection.
   *
   * @default false
   */
  accessor readOnly: PreactFieldProps['readOnly'];
  /**
   * Whether the field must be filled out before form submission.
   *
   * @default false
   */
  accessor required: PreactFieldProps['required'];
  /**
   * Global keyboard event handlers for things like key bindings typically
   * ignore keystrokes originating from within input elements. Unfortunately,
   * these never account for a Custom Element being the input element.
   *
   * To fix this, we spoof getAttribute & hasAttribute to make a PreactFieldElement
   * appear as a contentEditable "input" when it contains a focused input element.
   * @private technically not private, but we don't want to expose this as public API
   */
  getAttribute(qualifiedName: string): string | null;
  /**
   * @private technically not private, but we don't want to expose this as public API
   */
  hasAttribute(qualifiedName: string): boolean;
  /**
   * Checks if the shadow tree contains a focused input (input, textarea, select, <x contentEditable>).
   * Note: this does _not_ return true for focussed non-field form elements like buttons.
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
 * The properties for the text field component. Extends `PreactFieldProps` with text-specific features like icons, length constraints, and prefix/suffix content.
 * @publicDocs
 */
export type TextFieldProps = PreactFieldProps<
  /** @default 'on' */
  Required<TextFieldProps$1>['autocomplete']
> &
  Required<
    Pick<
      TextFieldProps$1,
      'icon' | 'maxLength' | 'minLength' | 'prefix' | 'suffix'
    >
  >;

/**
 * The text field custom element class that renders a single-line text input field in the Shopify admin interface. This component allows merchants to enter and edit text with support for labels, validation, icons, and prefix/suffix content.
 */
declare class TextField
  extends PreactFieldElement<TextFieldProps['autocomplete']>
  implements TextFieldProps
{
  /**
   * An icon to display at the start of the text field, providing visual context for the input. Accepts any valid icon type from the admin icon set, or an empty string to display no icon.
   */
  accessor icon: TextFieldProps['icon'];
  /**
   * The maximum number of characters the merchant can enter in the field. When this limit is reached, the field prevents further input.
   */
  accessor maxLength: TextFieldProps['maxLength'];
  /**
   * The minimum number of characters required in the field for validation. The field will be considered invalid if the merchant enters fewer characters than this value.
   */
  accessor minLength: TextFieldProps['minLength'];
  /**
   * Text or content to display before the merchant's input, such as a currency symbol (`$`) or protocol (`https://`).
   */
  accessor prefix: TextFieldProps['prefix'];
  /**
   * Text or content to display after the merchant's input, such as a unit of measurement (`kg`, `%`) or domain (`.myshopify.com`).
   */
  accessor suffix: TextFieldProps['suffix'];
  /**
   * The current text value in the field as a string. When setting this property programmatically, it updates the field's display value. When reading it, you get the user's current input.
   */
  get value(): string;
  set value(value: string);
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: TextField;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<TextFieldJSXProps, 'accessory'> &
        PreactBaseElementPropsWithChildren<TextField>;
    }
  }
}

declare const tagName = 's-text-field';
/**
 * The JSX props for the text field component. These properties extend `TextFieldProps` with JSX-specific event callbacks and an accessory slot for rendering additional content at the end of the field.
 * @publicDocs
 */
export interface TextFieldJSXProps
  extends Partial<Omit<TextFieldProps, 'accessory'>>,
    Pick<TextFieldProps$1, 'id'>,
    FieldReactProps<typeof tagName> {
  /**
   * An accessory element to display at the end of the text field, such as a button, icon, or other interactive component. This appears inside the field's visual boundary, typically for actions like clearing the field or showing additional options.
   */
  accessory?: ComponentChildren;
}

export {TextField};
/**
 * @publicDocs
 */
export type {TextFieldJSXProps};
