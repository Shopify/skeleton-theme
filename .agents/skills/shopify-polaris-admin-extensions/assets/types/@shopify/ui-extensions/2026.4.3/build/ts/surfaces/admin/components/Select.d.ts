/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  TextFieldProps,
  IconProps$1,
  SelectProps$1,
  IconType,
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
/** Used when an element has children. * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  children?: preact.ComponentChildren;
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
 * Properties for displaying an icon within a component.
 * @publicDocs
 */
export interface IconProps
  extends Pick<
    IconProps$1,
    'type' | 'tone' | 'color' | 'size' | 'interestFor'
  > {
  /**
   * Specifies the type of icon that will be displayed.
   */
  type: '' | IconType | 'empty';
  /**
   * The semantic meaning of the icon, which affects its color.
   */
  tone: Extract<
    IconProps$1['tone'],
    'auto' | 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'critical'
  >;
  /**
   * The visual prominence of the icon.
   */
  color: Extract<IconProps$1['color'], 'base' | 'subdued'>;
  /**
   * The size of the icon.
   */
  size: Extract<IconProps$1['size'], 'small' | 'base'>;
}

/**
 * Properties for rendering a select dropdown that lets users choose one option from a list with optional icon and label customization.
 * @publicDocs
 */
export interface SelectProps
  extends Omit<PreactInputProps, 'value'>,
    Required<
      Pick<
        SelectProps$1,
        | 'details'
        | 'disabled'
        | 'error'
        | 'label'
        | 'name'
        | 'placeholder'
        | 'required'
        | 'icon'
        | 'labelAccessibilityVisibility'
      >
    > {
  /**
   * The value of the currently selected option, matching one of the `value` properties from the available options.
   */
  value: Required<SelectProps$1>['value'];
  /**
   * An icon that's displayed at the start of the select field to provide visual context for the selection.
   */
  icon: IconProps['type'];
}

declare const usedFirstOptionSymbol: unique symbol;
declare const hasInitialValueSymbol: unique symbol;

/**
 * A select dropdown that lets users choose one option from a list.
 */
declare class Select extends PreactInputElement implements SelectProps {
  /**
   * An icon that's displayed at the start of the select field.
   */
  accessor icon: SelectProps['icon'];
  /**
   * Additional text to provide context or guidance for the select.
   */
  accessor details: SelectProps['details'];
  /**
   * An error message that's displayed below the select when validation fails.
   */
  accessor error: SelectProps['error'];
  /**
   * The text that describes what the select is for.
   */
  accessor label: SelectProps['label'];
  /**
   * Text that appears in the select when no option is selected to provide a hint about what to choose.
   */
  accessor placeholder: SelectProps['placeholder'];
  /**
   * Whether an option must be selected before the form can be submitted.
   */
  accessor required: SelectProps['required'];
  /**
   * Controls whether the label is visible to all users or only to screen readers.
   */
  accessor labelAccessibilityVisibility: SelectProps['labelAccessibilityVisibility'];
  /** @private */
  connectedCallback(): void;
  /**
   * A lifecycle callback that fires when the component is removed from the DOM. Performs cleanup operations.
   * @private
   */
  disconnectedCallback(): void;
  constructor();
  /**
   * used to determine if no value or defaultValue was set, in which case the first non-disabled option was used
   *
   * this is important because we need to use the placeholder in these situations, even though the first value will be submitted as part of the form
   * @private
   */
  [usedFirstOptionSymbol]: boolean;
  /**
   * @private
   */
  [hasInitialValueSymbol]: boolean;
  /**
   * The value of the currently selected option. When setting this property programmatically, it updates which option appears selected in the dropdown. When reading it, you get the `value` attribute of the currently selected Option component.
   */
  get value(): string;
  set value(value: string);
  /** @private */
  formResetCallback(): void;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Select;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: SelectJSXProps & PreactBaseElementPropsWithChildren<Select>;
    }
  }
}

declare const tagName = 's-select';
/**
 * Properties for using the select component in JSX with React-style event handlers.
 * @publicDocs
 */
export interface SelectJSXProps
  extends Partial<SelectProps>,
    Pick<SelectProps$1, 'id' | 'children'> {
  /**
   * The selectable options displayed in the dropdown list.
   *
   * Accepts option components for individual selectable items, and option group components to organize related options into logical groups with labels.
   */
  children?: ComponentChildren;
  /**
   * A callback that's triggered when the selected option changes and the select loses focus.
   */
  onChange?: (event: CallbackEvent<typeof tagName>) => void;
  /**
   * A callback that's triggered when the selected option changes as the user interacts with the dropdown.
   */
  onInput?: (event: CallbackEvent<typeof tagName>) => void;
  /**
   * A callback that's triggered when the select loses focus after the user interacts with it.
   */
  onBlur?: (event: CallbackEvent<typeof tagName>) => void;
  /**
   * A callback that's triggered when the select receives focus from the user.
   */
  onFocus?: (event: CallbackEvent<typeof tagName>) => void;
}

export {Select};
export type {SelectJSXProps};
