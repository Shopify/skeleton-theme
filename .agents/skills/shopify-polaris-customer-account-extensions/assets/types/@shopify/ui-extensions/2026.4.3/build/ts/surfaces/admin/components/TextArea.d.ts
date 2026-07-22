/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  TextFieldProps,
  TextAreaProps$1,
  ComponentChildren,
} from './shared.d.ts';

/**
 * An event with a strongly-typed currentTarget property for a specific HTML element.
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event listener is attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * A callback function that receives a strongly-typed event for a specific HTML element.
 * @publicDocs
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;
/**
 * The React-style event callback props for form field components.
 * @publicDocs
 */
export interface FieldReactProps<T extends keyof HTMLElementTagNameMap> {
  /**
   * A callback that's invoked when the user makes any changes in the field. Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's invoked when the user has finished editing the field, such as when they blur the field. Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's invoked when the field receives focus. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
   */
  onFocus?: ((event: CallbackEvent<T>) => void) | null;
  /**
   * A callback that's invoked when the field loses focus. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
   */
  onBlur?: ((event: CallbackEvent<T>) => void) | null;
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
 * A string containing CSS styles for the component's shadow DOM.
 * @publicDocs
 */
export type Styles = string;
/**
 * The configuration for rendering a Preact component in a shadow root.
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the component's Preact elements into the shadow root.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The CSS styles to apply to the shadow root.
   */
  styles?: Styles;
};
/**
 * The properties from an event that indicate how the user activated an element.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was held down when the event occurred.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta key (Command on macOS) was held down when the event occurred.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was held down when the event occurred.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed when the event occurred. A value of 0 indicates the primary button (usually left), 1 indicates the middle button, and 2 indicates the secondary button (usually right).
   */
  button: number;
}
/**
 * The options for influencing a programmatic click event.
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

declare const internals: unique symbol;
/**
 * The base properties for an input element that participates in form submission.
 * @publicDocs
 */
export type PreactInputProps = Required<
  Pick<TextFieldProps, 'disabled' | 'id' | 'name' | 'value'>
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
 * The base properties for form field elements that support labels, validation, and autocomplete.
 * @publicDocs
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
       * A hint as to the intended content of the field.
       *
       * When set to `on` (the default), this property indicates that the field should support
       * autofill, but you don't have any more semantic information on the intended
       * contents.
       *
       * When set to `off`, you're indicating that this field contains sensitive
       * information, or contents that are never saved, like one-time codes.
       *
       * Alternatively, you can provide value which describes the
       * specific data you would like to be entered into this field during autofill.
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
 * The properties for the text area component. These properties configure a multi-line text input field that allows merchants to enter and edit longer text content.
 * @publicDocs
 */
export type TextAreaProps = PreactFieldProps<
  Required<TextAreaProps$1>['autocomplete']
> &
  Required<Pick<TextAreaProps$1, 'maxLength' | 'minLength' | 'rows'>>;

/**
 * The text area custom element class that renders a multi-line text input field in the Shopify admin interface. This component allows merchants to enter and edit longer text content with support for labels, validation, and length constraints.
 */
declare class TextArea
  extends PreactFieldElement<TextAreaProps['autocomplete']>
  implements TextAreaProps
{
  /**
   * The maximum number of characters the user can enter in the field.
   */
  accessor maxLength: TextAreaProps['maxLength'];
  /**
   * The minimum number of characters required in the field for validation.
   */
  accessor minLength: TextAreaProps['minLength'];
  /**
   * The number of visible text lines for the field, controlling its initial height.
   */
  accessor rows: TextAreaProps['rows'];
  /**
   * The current text value in the field as a string. When setting this property programmatically, it updates the field's display value. When reading it, you get the user's current input.
   */
  get value(): string;
  set value(value: string);
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: TextArea;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: TextAreaJSXProps & PreactBaseElementProps<TextArea>;
    }
  }
}

declare const tagName = 's-text-area';
/**
 * The JSX props for the text area component. These properties extend `TextAreaProps` with JSX-specific event callbacks for React-style event handling.
 * @publicDocs
 */
export interface TextAreaJSXProps
  extends Partial<TextAreaProps>,
    Pick<TextAreaProps$1, 'id'>,
    FieldReactProps<typeof tagName> {}

export {TextArea};
export type {TextAreaJSXProps};
