/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  TextFieldProps,
  DateAutocompleteField,
  DateFieldProps$1,
  ComponentChildren,
} from './shared.d.ts';

/**
 * An event object with a strongly-typed currentTarget property that references the specific HTML element type.
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The DOM element that the event listener is attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * An event listener function or null that receives a typed callback event.
 * @publicDocs
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
 * A string containing CSS styles to be applied to the component.
 * @publicDocs
 */
export type Styles = string;
/**
 * The implementation details for rendering a custom element with a shadow DOM.
 * @publicDocs
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
 * @publicDocs
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
 * The required props for input elements that all form controls must implement.
 * @publicDocs
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
       * Controls browser autofill behavior for the field.
       *
       * Basic values:
       * - `on` - Enables autofill without specifying content type (default)
       * - `off` - Disables autofill for sensitive data or one-time codes
       *
       * Specific field values describe the expected data type. You can optionally prefix these with:
       * - `section-${string}` - Scopes autofill to a specific form section (when multiple forms exist on the same page)
       * - `shipping` or `billing` - Indicates whether the data is for shipping or billing purposes
       * - Both section and group (for example, `section-primary shipping email`)
       *
       * Providing a specific autofill token helps browsers suggest more relevant saved data. Learn more about [autocomplete values](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens).
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
 * The properties for the date field component. These properties configure an input field that allows merchants to select dates using an integrated calendar picker with optional text input, date constraints, and day-of-week restrictions.
 * @publicDocs
 */
export interface DateFieldProps
  extends Omit<
      PreactFieldProps<DateAutocompleteField>,
      'value' | 'defaultValue'
    >,
    Required<
      Pick<
        DateFieldProps$1,
        | 'allow'
        | 'allowDays'
        | 'disallow'
        | 'disallowDays'
        | 'value'
        | 'defaultValue'
        | 'view'
        | 'defaultView'
      >
    > {}

/**
 * The date field custom element class that renders a date input field with integrated calendar picker in the Shopify admin interface. This component allows merchants to select dates by typing or using a visual calendar, with support for date range restrictions and day-of-week constraints.
 */
declare class DateField
  extends PreactFieldElement<DateFieldProps['autocomplete']>
  implements DateFieldProps
{
  /**
   * The dates that are allowed to be selected, specified as ISO 8601 date strings or date ranges.
   */
  accessor allow: DateFieldProps['allow'];
  /**
   * The dates that aren't allowed to be selected, specified as ISO 8601 date strings or date ranges.
   */
  accessor disallow: DateFieldProps['disallow'];
  /**
   * The days of the week that are allowed to be selected. Available values: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`.
   */
  accessor allowDays: DateFieldProps['allowDays'];
  /**
   * The days of the week that aren't allowed to be selected. Available values: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`.
   */
  accessor disallowDays: DateFieldProps['disallowDays'];
  /**
   * The currently visible month and year in the calendar picker, formatted as an ISO 8601 date string.
   */
  set view(view: string);
  /**
   * The currently visible month and year in the calendar picker, formatted as an ISO 8601 date string.
   */
  get view(): string;
  /**
   * The initial month and year shown when the calendar picker first opens, formatted as an ISO 8601 date string.
   */
  accessor defaultView: DateFieldProps['defaultView'];
  /**
   * The callback that's triggered when the visible month or year in the calendar changes.
   */
  accessor onviewchange: CallbackEventListener<typeof tagName> | null;
  /**
   * The callback that's triggered when the user attempts to enter an invalid date.
   */
  accessor oninvalid: CallbackEventListener<typeof tagName> | null;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: DateField;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: DateFieldJSXProps & PreactBaseElementProps<DateField>;
    }
  }
}

declare const tagName = 's-date-field';
/**
 * The JSX props for the date field component. These properties extend `DateFieldProps` with JSX-specific event callbacks for React-style event handling when used in Preact, including specialized callbacks for view changes and invalid date attempts.
 * @publicDocs
 */
export interface DateFieldJSXProps
  extends Partial<Omit<DateFieldProps, 'value' | 'defaultValue'>>,
    Pick<DateFieldProps$1, 'id' | 'value' | 'defaultValue'> {
  /**
   * A callback that's triggered when the field loses focus.
   */
  onBlur?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the field's value changes and the field loses focus.
   */
  onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the field receives focus.
   */
  onFocus?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the field's value changes as the user types or selects.
   */
  onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the user attempts to enter an invalid date.
   */
  onInvalid?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the visible month or year in the calendar changes.
   */
  onViewChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {DateField};
/**
 * @publicDocs
 */
export type {DateFieldJSXProps};
