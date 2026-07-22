/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  TextFieldProps,
  CheckboxProps$1,
  ComponentChildren,
} from './shared.d.ts';

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
/** Used when an element does not have children. * @publicDocs
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
 * Properties that are common to checkbox-style components.
 * @publicDocs
 */
export interface PreactCheckboxProps
  extends Required<
    Pick<
      CheckboxProps$1,
      | 'accessibilityLabel'
      | 'checked'
      | 'defaultChecked'
      | 'details'
      | 'error'
      | 'label'
      | 'required'
      | 'name'
      | 'disabled'
    >
  > {
  /**
   * The value that's submitted with the form when the checkbox is checked.
   */
  value: Required<CheckboxProps$1>['value'];
}
/**
 * Base class for checkbox-style elements that can be toggled on and off.
 */
declare class PreactCheckboxElement
  extends PreactInputElement
  implements PreactCheckboxProps
{
  /**
   * Whether the checkbox is currently checked.
   */
  get checked(): boolean;
  set checked(checked: PreactCheckboxProps['checked']);
  /**
   * The value used in form data when the checkbox is checked.
   */
  get value(): string;
  set value(value: string);
  /**
   * Whether the checkbox should be checked when it's first rendered.
   */
  accessor defaultChecked: PreactCheckboxProps['defaultChecked'];
  /**
   * A label that's only visible to screen readers, used when the visual label isn't descriptive enough.
   */
  accessor accessibilityLabel: PreactCheckboxProps['accessibilityLabel'];
  /**
   * Additional text to provide context or guidance for the checkbox.
   */
  accessor details: PreactCheckboxProps['details'];
  /**
   * An error message that's displayed below the checkbox when validation fails.
   */
  accessor error: PreactCheckboxProps['error'];
  /**
   * The text that describes what the checkbox is for.
   */
  accessor label: PreactCheckboxProps['label'];
  /**
   * Whether the checkbox must be checked before the form can be submitted.
   */
  accessor required: PreactCheckboxProps['required'];
  /** @private */
  formResetCallback(): void;
  static get observedAttributes(): string[];
  constructor(renderImpl: RenderImpl);
}

/**
 * Properties for rendering a checkbox that supports checked, unchecked, and indeterminate states for complex selection scenarios.
 * @publicDocs
 */
export interface CheckboxProps extends PreactCheckboxProps {
  /**
   * Whether the checkbox is in an indeterminate state, showing a dash instead of a checkmark to represent a partial selection.
   */
  indeterminate: Required<CheckboxProps$1>['indeterminate'];
  /**
   * Whether the checkbox should be in an indeterminate state when it's first rendered, useful for partial selection scenarios.
   */
  defaultIndeterminate: Required<CheckboxProps$1>['defaultIndeterminate'];
}

/**
 * A checkbox that lets users select or deselect an option, with support for an indeterminate state.
 */
declare class Checkbox extends PreactCheckboxElement implements CheckboxProps {
  /**
   * Whether the checkbox is in an indeterminate state, showing a dash instead of a checkmark.
   */
  get indeterminate(): CheckboxProps['indeterminate'];
  set indeterminate(indeterminate: CheckboxProps['indeterminate']);
  /**
   * Whether the checkbox should be in an indeterminate state when it's first rendered.
   */
  accessor defaultIndeterminate: CheckboxProps['defaultIndeterminate'];
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Checkbox;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: CheckboxJSXProps & PreactBaseElementProps<Checkbox>;
    }
  }
}

declare const tagName = 's-checkbox';
/**
 * Props for using the checkbox component in JSX with React-style event handlers.
 * @publicDocs
 */
export interface CheckboxJSXProps
  extends Partial<CheckboxProps>,
    Pick<CheckboxProps$1, 'id'> {
  /**
   * A callback that's triggered when the checkbox's checked state changes and it loses focus.
   */
  onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the checkbox's checked state changes.
   */
  onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {Checkbox};
export type {CheckboxJSXProps};
