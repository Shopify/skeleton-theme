/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ThumbnailProps$1, ComponentChildren} from './shared.d.ts';

/**
 * A callback event that's typed to a specific HTML element.
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that currently has the event listener attached.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * An event listener for callback events, typed to a specific HTML element.
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;
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
 * The properties for the thumbnail component. A thumbnail displays a small preview image with configurable sizing. Properties include `src` for the image URL, `alt` for accessibility text, and `size` for controlling the thumbnail dimensions.
 */
export interface ThumbnailProps
  extends Required<Pick<ThumbnailProps$1, 'src' | 'alt' | 'size'>> {
  /**
   * The URL of the image to display in the thumbnail. You can provide an absolute or relative URL pointing to the image file.
   */
  src: ThumbnailProps$1['src'];
  /**
   * Alternative text that describes the image for screen readers. This text should convey the meaning or content of the image to users who can't see it.
   */
  alt: ThumbnailProps$1['alt'];
  /**
   * The size of the thumbnail. Choose from `'small-200'`, `'small-100'`, `'small'`, `'base'`, `'large'`, or `'large-100'` to control the thumbnail dimensions.
   *
   * @default 'base'
   */
  size: Extract<
    ThumbnailProps$1['size'],
    'small-200' | 'small-100' | 'small' | 'base' | 'large' | 'large-100'
  >;
}

/**
 * A string containing CSS styles for a custom element.
 */
export type Styles = string;
/**
 * The configuration for rendering a custom element with Preact.
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the shadow root content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The optional CSS styles to apply to the shadow root.
   */
  styles?: Styles;
};
/**
 * The properties of an activation event, such as a click or keypress. These properties capture which modifier keys were pressed and which mouse button was used during the event.
 */
export interface ActivationEventEsque {
  /**
   * Whether the shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the meta key (Command on Mac, Windows key on Windows) was pressed during the event.
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
 * The options for triggering a synthetic click event.
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
 * A thumbnail displays a small preview image with configurable sizing.
 */
declare class Thumbnail extends PreactCustomElement implements ThumbnailProps {
  /**
   * The URL of the image to display in the thumbnail.
   */
  accessor src: ThumbnailProps['src'];
  /**
   * Alternative text that describes the image for screen readers.
   */
  accessor alt: ThumbnailProps['alt'];
  /**
   * The size of the thumbnail.
   */
  accessor size: ThumbnailProps['size'];
  /**
   * A callback that's fired when the image has loaded successfully.
   */
  accessor onload: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's fired when the image fails to load.
   */
  accessor onerror: OnErrorEventHandler;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Thumbnail;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: ThumbnailJSXProps & PreactBaseElementProps<Thumbnail>;
    }
  }
}

declare const tagName = 's-thumbnail';
/**
 * The properties for the thumbnail component when it's used in JSX.
 */
export interface ThumbnailJSXProps
  extends Partial<ThumbnailProps>,
    Pick<ThumbnailProps$1, 'id'> {
  /**
   * A callback that's fired when the image has loaded successfully.
   */
  onLoad?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's fired when the image fails to load.
   */
  onError?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {Thumbnail};
export type {ThumbnailJSXProps};
