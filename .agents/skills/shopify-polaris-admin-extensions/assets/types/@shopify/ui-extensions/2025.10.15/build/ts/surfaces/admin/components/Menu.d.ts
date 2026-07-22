/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  MenuProps$1,
  InteractionProps,
} from './shared.d.ts';

/**
 * The properties you can set on a menu component.
 */
export interface MenuProps
  extends Required<Pick<MenuProps$1, 'id' | 'accessibilityLabel'>> {}

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
 * A string that contains CSS styles to apply to the component.
 */
export type Styles = string;
/**
 * The implementation details for rendering a Preact custom element with a shadow root.
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the component's shadow root content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The CSS styles to apply to the component.
   */
  styles?: Styles;
};
/**
 * An object that resembles an activation event, containing information about which modifier keys were pressed and which mouse button was used.
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta key (Command on Mac, Windows key on Windows) was pressed during the event.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was pressed during the event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed. A value of `0` means the primary button (usually left), `1` means the middle button, and `2` means the secondary button (usually right).
   */
  button: number;
}
/**
 * The options for customizing how a synthetic click is performed.
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
 * The properties for controlling overlay elements like popovers, tooltips, and menus through command interactions.
 */
export interface PreactOverlayControlProps
  extends Pick<InteractionProps, 'commandFor' | 'interestFor'> {
  /**
   * The action that the [command](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command) should take when this component is activated.
   *
   * See the documentation of specific components for the actions they support.
   *
   * - `--auto`: a default action for the target component.
   * - `--show`: shows the target component.
   * - `--hide`: hides the target component.
   * - `--toggle`: toggles the target component.
   *
   * @default '--auto'
   */
  command: Extract<
    InteractionProps['command'],
    '--show' | '--hide' | '--toggle' | '--auto'
  >;
  /**
   * The element that the [commandFor](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor) should act on when this component is activated.
   */
  commandFor: Extract<InteractionProps['commandFor'], string>;
  /**
   * The element that the [interestFor](https://open-ui.org/components/interest-invokers.explainer/#the-pitch-in-code) should act on when this component is activated.
   */
  interestFor: Extract<InteractionProps['interestFor'], string>;
}

/**
 * Shared symbols for overlay control functionality.
 * These symbols are used by components that implement overlay behavior
 * (such as Popover, Tooltip, and Modal) to communicate with the overlay control system.
 */
/** @private */
declare const overlayHidden: unique symbol;
/** @private */
declare const overlayActivator: unique symbol;
/** @private */
declare const overlayHideFrameId: unique symbol;
/**
 * The initialization object for creating a polyfill command event.
 */
export type PolyfillCommandEventInit = EventInit & {
  /**
   * The element that triggered the command.
   */
  source: HTMLElement | null | undefined;
  /**
   * The command action that should be performed.
   */
  command: PreactOverlayControlProps['command'];
};
/**
 * A polyfill event for the command interaction pattern, which is used to control overlay elements.
 */
export type PolyfillCommandEvent = Event & {
  /**
   * The element that triggered the command.
   */
  source: PolyfillCommandEventInit['source'];
  /**
   * The command action that should be performed.
   */
  command: PolyfillCommandEventInit['command'];
  /** You have to use `_s_shadowSource` because `source` is retargeted to the shadow host by browsers. */
  _s_shadowSource: PolyfillCommandEventInit['source'];
};
declare global {
  interface GlobalEventHandlersEventMap {
    command: PolyfillCommandEvent;
  }
}

/**
 * The base class for overlay elements that can be shown and hidden through command interactions.
 */
declare class PreactOverlayElement extends PreactCustomElement {
  /**
   * Creates a new overlay element with the given render implementation.
   */
  constructor(renderImpl: RenderImpl);
  /** @private */
  [overlayHidden]: boolean;
  /** @private */
  [overlayActivator]: HTMLElement | null | undefined;
  /** @private */
  [overlayHideFrameId]?: number;
}

/**
 * A component that displays a contextual list of actions or options, which is typically triggered by a button or other activator element.
 */
declare class Menu extends PreactOverlayElement implements MenuProps {
  /**
   * A label that describes the menu for assistive technologies.
   */
  accessor accessibilityLabel: string;
  /**
   * Creates a new Menu instance.
   */
  constructor();
  /** @private */
  connectedCallback(): void;
  /** @private */
  disconnectedCallback(): void;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Menu;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: MenuJSXProps & PreactBaseElementPropsWithChildren<Menu>;
    }
  }
}

/**
 * The custom element tag name for the menu component.
 */
declare const tagName = 's-menu';
/**
 * The JSX properties you can set on a menu component.
 */
export interface MenuJSXProps
  extends Partial<MenuProps>,
    Pick<MenuProps$1, 'id' | 'children'> {
  /**
   * The menu items to display, which should include button and section components.
   */
  children?: ComponentChildren;
}

export {Menu};
export type {MenuJSXProps};
