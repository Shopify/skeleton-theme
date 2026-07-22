/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, OptionProps$1} from './shared.d.ts';

/**
 * Properties for rendering a single option within a select dropdown that users can choose from.
 */
export interface OptionProps
  extends Required<
    Pick<OptionProps$1, 'disabled' | 'value' | 'selected' | 'defaultSelected'>
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
 * A single option within a select dropdown that users can choose.
 */
declare class Option extends PreactCustomElement implements OptionProps {
  /**
   * Whether the option is currently selected.
   */
  accessor selected: OptionProps['selected'];
  /**
   * Whether the option should be selected when it's first rendered.
   */
  accessor defaultSelected: OptionProps['defaultSelected'];
  /**
   * The value that's submitted with the form when this option is selected.
   */
  accessor value: OptionProps['value'];
  /**
   * Whether the option is disabled and can't be selected.
   */
  accessor disabled: OptionProps['disabled'];
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Option;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: OptionJSXProps & PreactBaseElementPropsWithChildren<Option>;
    }
  }
}

declare const tagName = 's-option';
/**
 * Properties for using the option component in JSX with React-style props.
 */
export interface OptionJSXProps
  extends Partial<OptionProps>,
    Pick<OptionProps$1, 'id' | 'children'> {
  /**
   * The content that's used as the option label, displayed in the dropdown list.
   */
  children?: ComponentChildren;
}

export {Option};
export type {OptionJSXProps};
