/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {AvatarProps$1, ComponentChildren} from './shared.d.ts';

/**
 * The properties for the avatar component. An avatar displays a user or entity image with fallback initials when the image isn't available. Properties include `src` for the image URL, `initials` for the fallback text, `alt` for accessibility text, and `size` for controlling the avatar dimensions.
 * @publicDocs
 */
export interface AvatarProps
  extends Required<Pick<AvatarProps$1, 'initials' | 'src' | 'alt' | 'size'>> {
  /**
   * The initials to display when no image is provided or if the image fails to load. This typically includes the first letter of a user's first and last name (for example, `'JD'` for John Doe).
   */
  initials: AvatarProps$1['initials'];
  /**
   * The URL of the avatar image to display. You can provide an absolute or relative URL pointing to the image file.
   */
  src: AvatarProps$1['src'];
  /**
   * Alternative text that describes the avatar for screen readers. This text should identify who or what the avatar represents.
   */
  alt: AvatarProps$1['alt'];
  /**
   * The size of the avatar. Choose from `'small-200'`, `'small'`, `'base'`, `'large'`, or `'large-200'` to control the avatar dimensions.
   *
   * @default 'base'
   */
  size: Extract<
    AvatarProps$1['size'],
    'small-200' | 'small' | 'base' | 'large' | 'large-200'
  >;
}

/**
 * A string containing CSS styles for a custom element.
 * @publicDocs
 */
export type Styles = string;
/**
 * The configuration for rendering a custom element with Preact.
 * @publicDocs
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
 * @publicDocs
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
 * A callback event that's typed to a specific HTML element.
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that currently has the event listener attached.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * An event listener for callback events, typed to a specific HTML element.
 * @publicDocs
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;
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
 * An avatar displays a user or entity image with fallback initials when the image isn't available.
 */
declare class Avatar extends PreactCustomElement implements AvatarProps {
  /**
   * The initials to display when no image is provided or if the image fails to load.
   */
  accessor initials: AvatarProps['initials'];
  /**
   * The URL of the avatar image to display.
   */
  accessor src: AvatarProps['src'];
  /**
   * The size of the avatar.
   */
  accessor size: AvatarProps['size'];
  /**
   * Alternative text that describes the avatar for screen readers.
   */
  accessor alt: AvatarProps['alt'];
  /**
   * A callback that's fired when the avatar image has loaded successfully.
   */
  accessor onload: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's fired when the avatar image fails to load.
   */
  accessor onerror: OnErrorEventHandler;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Avatar;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: AvatarJSXProps & PreactBaseElementProps<Avatar>;
    }
  }
}

declare const tagName = 's-avatar';
/**
 * The properties for the avatar component when it's used in JSX.
 * @publicDocs
 */
export interface AvatarJSXProps
  extends Partial<AvatarProps>,
    Pick<AvatarProps$1, 'id'> {
  /**
   * A callback that's fired when the avatar image has loaded successfully.
   */
  onLoad?: () => void;
  /**
   * A callback that's fired when the avatar image fails to load.
   */
  onError?: () => void;
}

export {Avatar};
/**
 * @publicDocs
 */
export type {AvatarJSXProps};
