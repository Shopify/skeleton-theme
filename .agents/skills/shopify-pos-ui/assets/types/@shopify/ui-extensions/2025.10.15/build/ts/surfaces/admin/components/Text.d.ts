/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, TextProps$1} from './shared.d.ts';

/**
 * The properties for the text component. These properties define inline or small blocks of text content with various visual styles and semantic meanings.
 *
 * @publicDocs
 */
export interface TextProps
  extends Required<
    Pick<
      TextProps$1,
      | 'accessibilityVisibility'
      | 'dir'
      | 'color'
      | 'type'
      | 'tone'
      | 'fontVariantNumeric'
      | 'interestFor'
    >
  > {
  /**
   * The color of the text. Available options:
   * - `'base'` - The default text color.
   * - `'subdued'` - A lighter text color for secondary information.
   */
  color: Extract<TextProps$1['color'], 'base' | 'subdued'>;
  /**
   * The semantic type and styling treatment for the text content.
   *
   * Other presentation properties on Text override the default styling.
   *
   * - `strong`: Emphasizes the text with strong importance, typically displayed in bold.
   * - `generic`: Standard text with no special semantic meaning or styling.
   * - `address`: Marks the text as contact information, such as a physical or email address.
   * - `redundant`: Indicates the text is redundant or duplicated information for screen reader context.
   *
   * @default 'generic'
   */
  type: Extract<
    TextProps$1['type'],
    'strong' | 'generic' | 'address' | 'redundant'
  >;
  /**
   * The semantic tone that's applied to the text, which changes its color to convey meaning.
   *
   * - `info`: Informational content or helpful tips (blue).
   * - `success`: Positive outcomes or successful states (green).
   * - `warning`: Important warnings about potential issues (orange).
   * - `critical`: Urgent problems or destructive actions (red).
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent (gray).
   * - `caution`: Advisory notices that need attention (yellow).
   *
   * @default 'auto'
   */
  tone: Extract<
    TextProps$1['tone'],
    'info' | 'success' | 'warning' | 'critical' | 'auto' | 'neutral' | 'caution'
  >;
  /**
   * The numeric font variant for the text. Available options:
   * - `'auto'` - The font variant is automatically determined.
   * - `'normal'` - Standard numeric rendering.
   * - `'tabular-nums'` - Monospaced numbers for better alignment in tables.
   */
  fontVariantNumeric: Extract<
    TextProps$1['fontVariantNumeric'],
    'auto' | 'normal' | 'tabular-nums'
  >;
}

/**
 * A string containing CSS styles.
 */
export type Styles = string;
/**
 * The configuration for rendering a custom element with a shadow DOM.
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the component's shadow DOM content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * Optional CSS styles to apply to the shadow DOM.
   */
  styles?: Styles;
};
/**
 * An object that represents the state of modifier keys and mouse button
 * during an activation event like a click.
 */
export interface ActivationEventEsque {
  /**
   * Whether the shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the meta (Command on Mac, Windows key on PC) key was pressed.
   */
  metaKey: boolean;
  /**
   * Whether the control key was pressed during the event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed (0 for left, 1 for middle, 2 for right).
   */
  button: number;
}
/**
 * Options for customizing click behavior on an element.
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
  children?: preact.ComponentChildren;
}

/**
 * A custom element for displaying inline or small blocks of text with various visual styles and semantic meanings. Use Text to render short pieces of content with appropriate styling, emphasis, and color treatment.
 */
declare class Text extends PreactCustomElement implements TextProps {
  /**
   * The numeric font variant for the text.
   */
  accessor fontVariantNumeric: TextProps['fontVariantNumeric'];
  /**
   * The color of the text.
   */
  accessor color: TextProps['color'];
  /**
   * The semantic tone that's applied to the text, which changes its color to convey meaning.
   *
   * - `info`: Informational content or helpful tips (blue).
   * - `success`: Positive outcomes or successful states (green).
   * - `warning`: Important warnings about potential issues (orange).
   * - `critical`: Urgent problems or destructive actions (red).
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent (gray).
   * - `caution`: Advisory notices that need attention (yellow).
   */
  accessor tone: TextProps['tone'];
  /**
   * The semantic type and styling treatment for the text content.
   *
   * - `strong`: Emphasizes the text with strong importance, typically displayed in bold.
   * - `generic`: Standard text with no special semantic meaning or styling.
   * - `address`: Marks the text as contact information, such as a physical or email address.
   * - `redundant`: Indicates the text is redundant or duplicated information for screen reader context.
   */
  accessor type: TextProps['type'];
  /**
   * The text direction (left-to-right or right-to-left).
   */
  accessor dir: TextProps['dir'];
  /**
   * The visibility of the element to assistive technologies.
   */
  accessor accessibilityVisibility: TextProps['accessibilityVisibility'];
  /**
   * The ID of an element this text provides contextual information for.
   */
  accessor interestFor: string;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Text;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: TextJSXProps & PreactBaseElementPropsWithChildren<Text>;
    }
  }
}

declare const tagName = 's-text';
/**
 * The JSX properties for the text component. These properties define how text is rendered in Preact or JSX.
 */
export interface TextJSXProps
  extends Partial<TextProps>,
    Pick<TextProps$1, 'id' | 'children'> {
  /**
   * The content of the text.
   */
  children?: ComponentChildren;
}

export {Text};
export type {TextJSXProps};
