/** VERSION: undefined **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  NumberFieldProps,
  Key,
  Ref,
  ComponentChild,
} from './components-shared.d.ts';

export type ComponentChildren = any;
/**
 * The base props for elements without children, providing key, ref, and slot properties.
 */
export interface BaseElementProps<TClass = HTMLElement> {
  /**
   * A unique identifier for the element in lists. Used by Preact for efficient rendering and reconciliation.
   */
  key?: Key;
  /**
   * A reference to the underlying DOM element. Commonly used to access the element directly for imperative operations.
   */
  ref?: Ref<TClass>;
  /**
   * The named [slot](/docs/api/polaris/using-polaris-web-components#slots) this element should be placed in when used within a web component.
   */
  slot?: Lowercase<string>;
}
/**
 * The base props for elements with children, extending `BaseElementProps` with children support.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement>
  extends BaseElementProps<TClass> {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T>;
/**
 * Represents the event object passed to callback functions when interactive events occur. Contains metadata about the event, including the target element, event phase, and propagation behavior.
 */
export interface CallbackEvent<T extends keyof HTMLElementTagNameMap> {
  /**
   * The element that the event listener is attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
  /**
   * Whether the event bubbles up through the DOM tree.
   */
  bubbles?: boolean;
  /**
   * Whether the event can be canceled.
   */
  cancelable?: boolean;
  /**
   * Whether the event will trigger listeners outside of a shadow root.
   */
  composed?: boolean;
  /**
   * The additional data associated with the event.
   */
  detail?: any;
  /**
   * The current phase of the event flow.
   */
  eventPhase: number;
  /**
   * The element that triggered the event.
   */
  target: HTMLElementTagNameMap[T] | null;
}

declare const tagName = 's-number-field';
export interface NumberFieldJSXProps
  extends Pick<
    NumberFieldProps,
    | 'id'
    | 'label'
    | 'details'
    | 'value'
    | 'placeholder'
    | 'disabled'
    | 'error'
    | 'required'
    | 'max'
    | 'min'
    | 'controls'
  > {
  /**
   * The text content that displays as the field label, describing the numeric information being requested. This property isn't supported when using `stepper` controls.
   */
  label?: NumberFieldProps['label'];
  /**
   * The additional text to provide context or guidance for the field. This text is displayed along with the field and its label to offer more information or instructions to the user. This will also be exposed to screen reader users. This property isn't supported when using `stepper` controls.
   */
  details?: NumberFieldProps['details'];
  /**
   * Whether the field needs a value. This requirement adds semantic value to the field but doesn't cause an error to appear automatically. Use the `error` property to present validation errors. This property isn't supported when using `stepper` controls.
   *
   * @default false
   */
  required?: NumberFieldProps['required'];
  /**
   * An error message that indicates a problem to the user. The field receives specific stylistic treatment to communicate issues that must be resolved immediately. This property isn't supported when using `stepper` controls.
   */
  error?: NumberFieldProps['error'];
  /**
   * The virtual keyboard layout that the field displays for numeric input. This property isn't supported when using `stepper` controls.
   *
   * - `'decimal'` - A keyboard layout that includes decimal point support for entering fractional numbers, prices, or measurements with decimal precision.
   * - `'numeric'` - A keyboard layout optimized for integer-only entry without decimal point support, ideal for quantities, counts, or whole number values.
   *
   * @default 'decimal'
   */
  inputMode?: NumberFieldProps['inputMode'];
  /**
   * A short hint that provides guidance about the expected value of the field. This property isn't supported when using `stepper` controls due to constrained space, especially on phones.
   */
  placeholder?: NumberFieldProps['placeholder'];
  /**
   * The additional content to be displayed in the field. Commonly used to display clickable text or action elements. Use the `slot="accessory"` attribute to place elements in this area. This slot isn't supported when using `stepper` controls.
   */
  accessory?: ComponentChild;
  /**
   * The type of controls displayed for the field:
   *
   * - `'auto'` - An automatic setting where the presence of controls depends on the surface and context. The system determines the most appropriate control type based on the usage scenario.
   * - `'stepper'` - Displays increment (+) and decrement (-) buttons for adjusting the numeric value. When `stepper` controls are enabled, the field behavior is constrained: it accepts only integer values, always contains a value (never empty), and automatically validates against `min` and `max` bounds. The `label`, `details`, `placeholder`, `error`, `required`, and `inputMode` properties aren't supported with `stepper` controls.
   * - `'none'` - A control type with no visible controls where users must input the value manually using the keyboard.
   *
   * @default 'auto'
   */
  controls?: NumberFieldProps['controls'];
  /**
   * A callback function that executes when the user makes any changes in the field.
   */
  onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback function that executes after editing completes, typically on blur.
   */
  onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback function that executes when the element loses focus.
   */
  onBlur?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback function that executes when the element receives focus.
   */
  onFocus?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}
export type ElementProps = Omit<NumberFieldJSXProps, 'accessory'>;
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ElementProps;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<ElementProps>;
    }
  }
}

export {tagName};
export type {NumberFieldJSXProps};
