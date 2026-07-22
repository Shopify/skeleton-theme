/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {DatePickerProps$1, ComponentChildren} from './shared.d.ts';

/**
 * The properties for the date picker component. These properties configure a standalone calendar interface for selecting single dates or date ranges, with support for date constraints, day-of-week restrictions, and month/year navigation.
 *
 * @publicDocs
 */
export interface DatePickerProps
  extends Required<
    Pick<
      DatePickerProps$1,
      | 'defaultView'
      | 'view'
      | 'allow'
      | 'disallow'
      | 'allowDays'
      | 'disallowDays'
      | 'value'
      | 'defaultValue'
      | 'name'
    >
  > {
  /**
   * The type of date selection allowed.
   *
   * - `single`: Select a single date
   * - `range`: Select a date range
   *
   * @default "single"
   */
  type: Extract<DatePickerProps$1['type'], 'single' | 'range'>;
}

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
/** Used when an element does not have children. */
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
declare const dirtyStateSymbol: unique symbol;
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
 * The date picker custom element class that renders a standalone calendar interface in the Shopify admin. This component allows merchants to select single dates or date ranges using an interactive calendar with month/year navigation, date constraints, and day-of-week restrictions.
 */
declare class DatePicker extends BaseClass implements DatePickerProps {
  /**
   * The initial month and year shown when the calendar first renders, formatted as an ISO 8601 date string.
   */
  accessor defaultView: string;
  /**
   * The currently visible month and year in the calendar, formatted as an ISO 8601 date string.
   */
  set view(view: string);
  /**
   * The currently visible month and year in the calendar, formatted as an ISO 8601 date string.
   */
  get view(): string;
  /**
   * The dates that are allowed to be selected, specified as ISO 8601 date strings or date ranges.
   */
  accessor allow: DatePickerProps['allow'];
  /**
   * The dates that aren't allowed to be selected, specified as ISO 8601 date strings or date ranges.
   */
  accessor disallow: DatePickerProps['disallow'];
  /**
   * The days of the week that are allowed to be selected. Available values: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`.
   */
  accessor allowDays: DatePickerProps['allowDays'];
  /**
   * The days of the week that aren't allowed to be selected. Available values: `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`.
   */
  accessor disallowDays: DatePickerProps['disallowDays'];
  /**
   * The type of date selection allowed. Available values: `single`, `range`.
   */
  accessor type: DatePickerProps['type'];
  /**
   * The initial selected date or date range when the picker first renders, formatted as an ISO 8601 date string.
   */
  accessor defaultValue: DatePickerProps['defaultValue'];
  /**
   * The name of the picker, used when submitting form data.
   */
  accessor name: DatePickerProps['name'];
  /**
   * The currently selected date or date range, formatted as an ISO 8601 date string.
   */
  set value(value: string);
  /**
   * The currently selected date or date range, formatted as an ISO 8601 date string.
   */
  get value(): string;
  /** @private */
  [dirtyStateSymbol]: boolean;
  /** @private */
  formResetCallback(): void;
  /**
   * The callback that's triggered when the visible month or year in the calendar changes.
   */
  accessor onviewchange: CallbackEventListener<typeof tagName> | null;
  /**
   * The callback that's triggered when the picker receives focus.
   */
  accessor onfocus: CallbackEventListener<typeof tagName> | null;
  /**
   * The callback that's triggered when the picker loses focus.
   */
  accessor onblur: CallbackEventListener<typeof tagName> | null;
  /**
   * The callback that's triggered when the selected date changes as the user interacts with the picker.
   */
  accessor oninput: CallbackEventListener<typeof tagName> | null;
  /**
   * The callback that's triggered when the selected date changes and the picker loses focus.
   */
  accessor onchange: CallbackEventListener<typeof tagName> | null;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: DatePicker;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: DatePickerJSXProps & PreactBaseElementProps<DatePicker>;
    }
  }
}

declare const tagName = 's-date-picker';
/**
 * The JSX props for the date picker component. These properties extend `DatePickerProps` with JSX-specific event callbacks for React-style event handling when used in Preact, including callbacks for date selection, focus events, and view changes.
 */
export interface DatePickerJSXProps
  extends Partial<DatePickerProps>,
    Pick<DatePickerProps$1, 'id'> {
  /**
   * A callback that's triggered when the visible month or year in the calendar changes.
   */
  onViewChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the picker receives focus.
   */
  onFocus?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the picker loses focus.
   */
  onBlur?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the selected date changes as the user interacts with the picker.
   */
  onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the selected date changes and the picker loses focus.
   */
  onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {DatePicker};
export type {DatePickerJSXProps};
