/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {IconProps$1, IconType, ComponentChildren} from './shared.d.ts';

export interface IconProps
  extends Pick<
    IconProps$1,
    'type' | 'tone' | 'color' | 'size' | 'interestFor'
  > {
  /**
   * The type of icon that will be displayed. You can specify an icon name from the available icon set, or use an empty string to show no icon.
   */
  type: '' | IconType | 'empty';
  /**
   * The color tone of the icon based on its semantic meaning. Choose from `'auto'` to let the icon inherit its context, `'neutral'` for standard icons, `'info'` for informational content, `'success'` for positive actions, `'caution'` or `'warning'` for warnings, or `'critical'` for errors.
   *
   * @default 'auto'
   */
  tone: Extract<
    IconProps$1['tone'],
    'auto' | 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'critical'
  >;
  /**
   * The color emphasis of the icon. Use `'base'` for the standard color intensity, or `'subdued'` for a lighter, less prominent appearance.
   *
   * @default 'base'
   */
  color: Extract<IconProps$1['color'], 'base' | 'subdued'>;
  /**
   * The size of the icon. Use `'small'` for compact layouts, or `'base'` for standard sizing.
   *
   * @default 'base'
   */
  size: Extract<IconProps$1['size'], 'small' | 'base'>;
}

/**
 * A string containing CSS styles for the component.
 * @publicDocs
 */
export type Styles = string;
/**
 * The implementation details for rendering a custom element with Preact.
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the component's shadow root content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * Optional CSS styles to apply to the shadow root.
   */
  styles?: Styles;
};
/**
 * The properties of an activation event, such as a click or keypress. These properties capture which modifier keys were pressed and which mouse button was used during the event.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the shift key was pressed during activation.
   */
  shiftKey: boolean;
  /**
   * Whether the meta key (Command on Mac, Windows key on Windows) was pressed during activation.
   */
  metaKey: boolean;
  /**
   * Whether the control key was pressed during activation.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed during activation.
   */
  button: number;
}
/**
 * The options for customizing synthetic click behavior.
 * @publicDocs
 */
export interface ClickOptions {
  /**
   * The original user event (such as a click or keyboard event) that triggered this programmatic click. When provided, the component preserves important event properties like modifier keys (Ctrl, Shift, Alt, Meta) and mouse button states, enabling behaviors such as opening links in a new tab when middle-clicked or Ctrl+clicked.
   */
  sourceEvent?: ActivationEventEsque;
}
/**
 * The base class for creating custom elements with Preact.
 * While this class could be used in both Node and the browser, the constructor will only be used in the browser.
 * So we give it a type of `HTMLElement` to avoid typing issues later where it's used, which will only happen in the browser.
 */
declare const BaseClass: typeof globalThis.HTMLElement;
/**
 * An abstract base class for creating custom elements that render with Preact.
 */
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
   * Queues a run of the render function.
   * You shouldn't need to call this manually - it should be handled by changes to `@property` values.
   * @private
   */
  queueRender(): void;
  /**
   * Like the standard `element.click()`, but you can influence the behavior with a `sourceEvent`.
   *
   * For example, if the `sourceEvent` was a middle click, or has particular keys held down,
   * components will attempt to produce the desired behavior on links, such as opening the page in a background tab.
   * @private
   * @param options
   */
  click({sourceEvent}?: ClickOptions): void;
}

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
 * An icon displays a graphical symbol from the icon library.
 */
declare class Icon extends PreactCustomElement implements IconProps {
  /**
   * The color emphasis of the icon.
   */
  accessor color: IconProps['color'];
  /**
   * The color tone of the icon based on its semantic meaning.
   */
  accessor tone: IconProps['tone'];
  /**
   * The type of icon to display.
   */
  accessor type: IconProps['type'];
  /**
   * The size of the icon.
   */
  accessor size: IconProps['size'];
  /**
   * The element that this icon should show interest for when activated.
   */
  accessor interestFor: string;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Icon;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IconJSXProps & PreactBaseElementProps<Icon>;
    }
  }
}

declare const tagName = 's-icon';
/**
 * The properties for the icon component when it's used in JSX.
 * @publicDocs
 */
export interface IconJSXProps
  extends Partial<IconProps>,
    Pick<IconProps$1, 'id'> {}

export {Icon};
export type {IconJSXProps};
