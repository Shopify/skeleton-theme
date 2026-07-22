/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {TextFieldProps, ComponentChildren} from './shared.d.ts';

/**
 * An event that includes a strongly-typed reference to the element that triggered it.
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event handler was attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * A function that handles events for a specific element type, or null if no handler is set.
 * @publicDocs
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;
/**
 * Event handlers for field interactions in React-style syntax.
 * @publicDocs
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
/** Used when an element does not have children. */
export interface PreactBaseElementProps<TClass extends HTMLElement> {
  /**
   * A unique identifier for this element within its parent. Preact uses keys to optimize rendering performance when lists change by tracking which items have been added, removed, or reordered.
   * @publicDocs
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
 * CSS styles that will be applied to the component's shadow DOM.
 * @publicDocs
 */
export type Styles = string;
/**
 * Configuration for rendering a custom element with Preact and shadow DOM.
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * A function that renders the component's content inside the shadow root.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * CSS styles that will be applied to the shadow DOM.
   */
  styles?: Styles;
};
/**
 * Information about modifier keys and mouse buttons that were active during an interaction.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was held down during the interaction.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta key (Command on Mac, Windows key on PC) was held down during the interaction.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was held down during the interaction.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed during the interaction.
   */
  button: number;
}
/**
 * Options for influencing how a programmatic click behaves.
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
 * The core properties that all input elements need to function within forms.
 * @publicDocs
 */
export type PreactInputProps = Required<
  Pick<TextFieldProps, 'disabled' | 'id' | 'name' | 'value'>
>;
/**
 * Base class for input elements that participate in form submission.
 */
declare class PreactInputElement
  extends PreactCustomElement
  implements PreactInputProps
{
  /**
   * Indicates that this element can participate in form submission.
   */
  static formAssociated: boolean;
  /** @private */
  [internals]: ElementInternals;
  /**
   * A callback that's triggered when the input's value changes and the field loses focus.
   */
  accessor onchange: CallbackEventListener<'input'>;
  /**
   * A callback that's triggered when the input's value changes as the user types.
   */
  accessor oninput: CallbackEventListener<'input'>;
  /**
   * Whether the input is disabled and can't be interacted with.
   */
  accessor disabled: PreactInputProps['disabled'];
  /**
   * A unique identifier for the input element.
   */
  accessor id: PreactInputProps['id'];
  /**
   * The name that identifies this input when the form is submitted.
   */
  accessor name: PreactInputProps['name'];
  /**
   * The current value of the input.
   */
  get value(): PreactInputProps['value'];
  set value(value: PreactInputProps['value']);
  constructor(renderImpl: RenderImpl);
}

/**
 * Properties that are common to all text-based field components.
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
       * autofill, but you do not have any more semantic information on the intended
       * contents.
       *
       * When set to `off`, you are indicating that this field contains sensitive
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
/**
 * Base class for text-based field elements that support labels, errors, and other form field features.
 */
declare class PreactFieldElement<Autocomplete extends string = string>
  extends PreactInputElement
  implements PreactFieldProps<Autocomplete>
{
  /**
   * A callback that's triggered when the field loses focus.
   */
  accessor onblur: CallbackEventListener<'input'>;
  /**
   * A callback that's triggered when the field receives focus.
   */
  accessor onfocus: CallbackEventListener<'input'>;
  /**
   * A hint about what kind of information should go in the field for autofill purposes.
   */
  accessor autocomplete: PreactFieldProps<Autocomplete>['autocomplete'];
  /**
   * The initial value that the field should display when it's first rendered.
   */
  accessor defaultValue: PreactFieldProps['defaultValue'];
  /**
   * Additional text to provide context or guidance for the input.
   */
  accessor details: PreactFieldProps['details'];
  /**
   * An error message that's displayed below the field when validation fails.
   */
  accessor error: PreactFieldProps['error'];
  /**
   * The text that describes what the field is for.
   */
  accessor label: PreactFieldProps['label'];
  /**
   * Controls whether the label is visible to all users or only to screen readers.
   */
  accessor labelAccessibilityVisibility: PreactFieldProps['labelAccessibilityVisibility'];
  /**
   * Text that appears in the field when it's empty to provide a hint about what to enter.
   */
  accessor placeholder: PreactFieldProps['placeholder'];
  /**
   * Whether the field can be edited by the user.
   */
  accessor readOnly: PreactFieldProps['readOnly'];
  /**
   * Whether the field must be filled in before the form can be submitted.
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
 * Properties for rendering a search field that lets users enter search queries with validation constraints and autofill support.
 * @publicDocs
 */
export type SearchFieldProps = PreactFieldProps<
  /**
   * @default 'on'
   */
  Required<TextFieldProps>['autocomplete']
> &
  Required<
    Pick<
      TextFieldProps,
      | 'defaultValue'
      | 'details'
      | 'disabled'
      | 'error'
      | 'labelAccessibilityVisibility'
      | 'minLength'
      | 'maxLength'
      | 'label'
      | 'name'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'value'
    >
  >;

/**
 * A search field that lets users enter search queries with a search-specific input type.
 */
declare class SearchField
  extends PreactFieldElement<SearchFieldProps['autocomplete']>
  implements SearchFieldProps
{
  /**
   * The maximum number of characters that can be entered in the field.
   */
  accessor maxLength: SearchFieldProps['maxLength'];
  /**
   * The minimum number of characters that must be entered for the field to be valid.
   */
  accessor minLength: SearchFieldProps['minLength'];
  /**
   * The current search query value in the field as a string. When setting this property programmatically, it updates the field's display value. When reading it, you get the user's current input.
   */
  get value(): string;
  set value(value: string);
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: SearchField;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: SearchFieldJSXProps & PreactBaseElementProps<SearchField>;
    }
  }
}

declare const tagName = 's-search-field';
/**
 * Props for using the search field component in JSX with React-style event handlers.
 * @publicDocs
 */
export interface SearchFieldJSXProps
  extends Partial<SearchFieldProps>,
    Pick<TextFieldProps, 'id'>,
    FieldReactProps<typeof tagName> {}

export {SearchField};
/**
 * @publicDocs
 */
export type {SearchFieldJSXProps};
