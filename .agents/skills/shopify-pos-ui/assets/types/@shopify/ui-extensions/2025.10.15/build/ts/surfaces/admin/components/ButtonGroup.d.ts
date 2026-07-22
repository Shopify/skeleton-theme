/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, ButtonGroupProps$1} from './shared.d.ts';

/**
 * Properties for rendering a button group that arranges multiple buttons together with consistent spacing and semantic grouping.
 */
export interface ButtonGroupProps
  extends Required<Pick<ButtonGroupProps$1, 'gap' | 'accessibilityLabel'>> {}

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
export interface ClickOptions {
  /**
   * The event you want to influence the synthetic click.
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
 * The base properties for Preact elements that have children, extending the base element properties to include child content.
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  /**
   * The child elements or content that will be rendered inside this element.
   */
  children?: preact.ComponentChildren;
}

/**
 * A button group that arranges multiple buttons together with consistent spacing and semantic grouping for related actions.
 */
declare class ButtonGroup
  extends PreactCustomElement
  implements ButtonGroupProps
{
  /**
   * The amount of spacing between buttons in the group, affecting the visual separation of actions.
   */
  accessor gap: ButtonGroupProps['gap'];

  /**
   * A label that's only visible to screen readers, describing the purpose of this group of buttons.
   */
  accessor accessibilityLabel: ButtonGroupProps['accessibilityLabel'];

  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ButtonGroup;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<
        ButtonGroupJSXProps,
        'primaryAction' | 'secondaryActions'
      > &
        PreactBaseElementPropsWithChildren<ButtonGroup>;
    }
  }
}

declare const tagName = 's-button-group';

/**
 * Properties for using the button group component in JSX with React-style props.
 */
export interface ButtonGroupJSXProps
  extends Partial<ButtonGroupProps>,
    Pick<ButtonGroupProps$1, 'id' | 'children'> {
  /**
   * The buttons that should be grouped together, provided as Button components.
   */
  children?: ComponentChildren;
  /**
   * A single primary action button that's visually emphasized as the most important action in the group.
   *
   * Accepts a single Button element with a `variant` of `primary`. Can't be used when `gap` is set to `none`.
   */
  primaryAction?: ComponentChildren;
  /**
   * One or more secondary action buttons that provide alternative or less prominent actions.
   *
   * Accepts Button elements with a `variant` of `secondary` or `auto`.
   */
  secondaryActions?: ComponentChildren;
}

export {ButtonGroup};
export type {ButtonGroupJSXProps};
