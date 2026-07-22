/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, ChoiceListProps$1} from './shared.d.ts';

/**
 * An event that includes a strongly-typed reference to the element that triggered it.
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event handler was attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * A function that handles events for a specific element type, or null if no handler is set.
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
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
/** Used when an element has children. */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  children?: preact.ComponentChildren;
}

/**
 * Properties for rendering a list of choices that lets users select one or more options using radio buttons or checkboxes.
 *
 * @publicDocs
 */
export interface ChoiceListProps
  extends Required<
    Pick<
      ChoiceListProps$1,
      | 'details'
      | 'disabled'
      | 'error'
      | 'label'
      | 'labelAccessibilityVisibility'
      | 'multiple'
      | 'name'
      | 'values'
    >
  > {}

/**
 * CSS styles that will be applied to the component's shadow DOM.
 */
export type Styles = string;
/**
 * Configuration for rendering a custom element with Preact and shadow DOM.
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
 * Base class for form-associated custom elements.
 */
declare class BaseClass extends PreactCustomElement {
  /**
   * Indicates that this element can participate in form submission.
   */
  static formAssociated: boolean;
  constructor(renderImpl: RenderImpl);
  /** @private */
  [internals]: ElementInternals;
}
/**
 * A list of choices that lets users select one or more options using radio buttons or checkboxes.
 */
declare class ChoiceList extends BaseClass implements ChoiceListProps {
  /**
   * Whether all choices in the list are disabled and can't be selected.
   */
  accessor disabled: ChoiceListProps['disabled'];
  /**
   * The name that identifies this choice list when the form is submitted.
   */
  accessor name: ChoiceListProps['name'];
  /**
   * An error message that's displayed below the choice list when validation fails.
   */
  accessor error: ChoiceListProps['error'];
  /**
   * Additional text to provide context or guidance for the choice list.
   */
  accessor details: ChoiceListProps['details'];
  /**
   * Whether users can select more than one choice at a time.
   */
  accessor multiple: ChoiceListProps['multiple'];
  /**
   * The text that describes what the choice list is for.
   */
  accessor label: ChoiceListProps['label'];
  /**
   * A callback that's triggered when the selected choices change and the choice list loses focus.
   */
  accessor onchange: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's triggered when the selected choices change.
   */
  accessor oninput: CallbackEventListener<typeof tagName> | null;
  /**
   * Controls whether the label is visible to all users or only to screen readers.
   */
  accessor labelAccessibilityVisibility: ChoiceListProps['labelAccessibilityVisibility'];
  /**
   * The values of the currently selected choices.
   */
  get values(): ChoiceListProps['values'];
  set values(values: ChoiceListProps['values']);
  /** @private */
  formResetCallback(): void;
  constructor();
  /** @private */
  connectedCallback(): void;
  /** @private */
  disconnectedCallback(): void;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ChoiceList;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: ChoiceListJSXProps &
        PreactBaseElementPropsWithChildren<ChoiceList>;
    }
  }
}

declare const tagName = 's-choice-list';
/**
 * Properties for using the choice list component in JSX with React-style event handlers.
 */
export interface ChoiceListJSXProps
  extends Partial<ChoiceListProps>,
    Pick<ChoiceListProps$1, 'id' | 'children'> {
  /**
   * The choices that a user can select from, provided as Choice components.
   *
   * Accepts Choice components.
   */
  children?: ComponentChildren;
  /**
   * A callback that's triggered when the selected choices change and the choice list loses focus.
   */
  onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's triggered when the selected choices change as the user interacts with them.
   */
  onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {ChoiceList};
export type {ChoiceListJSXProps};
