/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, BannerProps$1} from './shared.d.ts';

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
 * The base properties for Preact elements that have children, extending the base element properties to include child content.
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  /**
   * The child elements to render inside this element.
   */
  children?: preact.ComponentChildren;
}

/**
 * All properties for the banner component marked as required.
 */
export type RequiredBannerProps = Required<BannerProps$1>;
/**
 * The properties for the banner component. These properties define an important message or notification with visual styling that conveys its semantic meaning.
 *
 * @publicDocs
 */
export interface BannerProps
  extends Pick<
    RequiredBannerProps,
    'heading' | 'dismissible' | 'hidden' | 'tone'
  > {
  /**
   * The color tone of the banner based on its semantic meaning.
   *
   * @default 'auto'
   */
  tone: Extract<
    RequiredBannerProps['tone'],
    'auto' | 'critical' | 'warning' | 'success' | 'info'
  >;
}

/**
 * A string containing CSS styles for the component.
 */
export type Styles = string;
/**
 * The implementation details for rendering a custom element with Preact.
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
 * An event-like object that contains activation information for synthetic clicks.
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
 * Options for customizing synthetic click behavior.
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
 * A custom element for displaying important messages and notifications.
 */
declare class Banner extends PreactCustomElement implements BannerProps {
  /**
   * The heading text displayed at the top of the banner.
   */
  accessor heading: BannerProps['heading'];
  /**
   * The color tone of the banner based on its semantic meaning.
   */
  accessor tone: BannerProps['tone'];
  /**
   * Whether the banner is hidden from view.
   */
  accessor hidden: BannerProps['hidden'];
  /**
   * Whether the banner can be dismissed by the user.
   */
  accessor dismissible: BannerProps['dismissible'];
  /**
   * A callback that's fired when the banner is dismissed.
   */
  accessor ondismiss: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's fired after the banner finishes hiding.
   */
  accessor onafterhide: CallbackEventListener<typeof tagName> | null;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Banner;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<BannerJSXProps, 'secondaryActions'> &
        PreactBaseElementPropsWithChildren<Banner>;
    }
  }
}

declare const tagName = 's-banner';
/**
 * The JSX properties for the banner component. These properties define how a banner is rendered in Preact or JSX.
 */
export interface BannerJSXProps
  extends Partial<BannerProps>,
    Pick<BannerProps$1, 'id' | 'children'> {
  /**
   * The content of the banner.
   */
  children?: ComponentChildren;
  /**
   * The secondary actions to display at the bottom of the banner. Only buttons with the `variant` of `'secondary'` or `'auto'` are allowed. A maximum of two `s-button` components can be provided.
   */
  secondaryActions?: ComponentChildren;
  /**
   * A callback that's fired when the banner is dismissed.
   */
  onDismiss?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's fired after the banner finishes hiding.
   */
  onAfterHide?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {Banner};
export type {BannerJSXProps};
