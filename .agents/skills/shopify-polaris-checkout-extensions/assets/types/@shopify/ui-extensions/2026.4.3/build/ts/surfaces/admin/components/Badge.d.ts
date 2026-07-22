/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  IconProps$1,
  BadgeProps$1,
  IconType,
} from './shared.d.ts';

/**
 * The configuration for icons used within Badge components. Defines the visual appearance, size, and semantic meaning of icons displayed in badges.
 * @publicDocs
 */
export interface IconProps
  extends Pick<
    IconProps$1,
    'type' | 'tone' | 'color' | 'size' | 'interestFor'
  > {
  /**
   * The type of icon to display inside the badge. Use any valid icon name from the admin icon set, an empty string for no icon, or `'empty'` to reserve space for an icon without displaying one.
   */
  type: '' | IconType | 'empty';
  /**
   * Determines the color used for the icon based on semantic meaning. Available options:
   * - `'auto'` - Lets the system automatically choose the appropriate tone based on context.
   * - `'neutral'` - Gray styling for general information.
   * - `'info'` - Blue styling for informational content.
   * - `'success'` - Green styling for positive states.
   * - `'caution'` - Yellow styling for situations that need attention.
   * - `'warning'` - Orange styling for important notices.
   * - `'critical'` - Red styling for errors and urgent issues.
   *
   * @default 'auto'
   */
  tone: Extract<
    IconProps$1['tone'],
    'auto' | 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'critical'
  >;
  /**
   * Controls the visual prominence of the icon. Available options:
   * - `'base'` - Standard color intensity for normal emphasis.
   * - `'subdued'` - Reduced color intensity for less emphasis.
   *
   * @default 'base'
   */
  color: Extract<IconProps$1['color'], 'base' | 'subdued'>;
  /**
   * Determines the size of the icon. Available options:
   * - `'small'` - Smaller icon size for compact layouts.
   * - `'base'` - Standard icon size for most use cases.
   *
   * @default 'base'
   */
  size: Extract<IconProps$1['size'], 'small' | 'base'>;
}

/**
 * The properties for the badge component. Badges display status information through compact visual indicators with customizable tones, sizes, and optional icons.
 * @publicDocs
 */
export interface BadgeProps
  extends Pick<BadgeProps$1, 'color' | 'icon' | 'size' | 'tone'> {
  /**
   * Controls the visual weight and emphasis of the badge. Available options:
   * - `'base'` - Standard weight with moderate emphasis, suitable for most use cases.
   * - `'strong'` - Increased visual weight for higher emphasis and prominence.
   *
   * @default 'base'
   */
  color: Extract<BadgeProps$1['color'], 'base' | 'strong'>;
  /**
   * The icon to display inside the badge. Accepts any valid icon type or an empty string to display no icon.
   *
   * @default ''
   */
  icon: IconProps['type'] | '';
  /**
   * Determines the size of the badge. Available options:
   * - `'base'` - Standard size for most use cases.
   * - `'large'` - Larger size for increased visibility and prominence.
   * - `'large-100'` - Extra large size for maximum visibility in specific contexts.
   *
   * @default 'base'
   */
  size: Extract<BadgeProps$1['size'], 'base' | 'large' | 'large-100'>;
  /**
   * Determines the visual appearance and semantic meaning of the badge. Badges rely on the tone system for semantic meaning, so using custom styling might not clearly convey meaning to merchants. Available options:
   * - `'auto'` - Lets the system automatically choose the appropriate tone based on context.
   * - `'neutral'` - Gray styling for general status information that doesn't require emphasis.
   * - `'info'` - Blue styling for informational content and neutral updates.
   * - `'success'` - Green styling for positive states, completed actions, and successful operations.
   * - `'caution'` - Yellow styling for situations that need attention but aren't urgent.
   * - `'warning'` - Orange styling for important notices that require merchant awareness.
   * - `'critical'` - Red styling for errors, failures, and urgent issues requiring immediate action.
   *
   * @default 'auto'
   */
  tone: Extract<
    BadgeProps$1['tone'],
    'auto' | 'neutral' | 'info' | 'success' | 'caution' | 'warning' | 'critical'
  >;
}

/**
 * The CSS styles as a string, used for styling web components within their shadow DOM.
 * @publicDocs
 */
export type Styles = string;
/**
 * The implementation configuration for rendering a Preact component into a shadow root. Defines the render function that returns JSX elements and optional CSS styles to apply to the component's shadow DOM.
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The render function that returns Preact/JSX elements to display in the component's shadow root.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The optional CSS styles to inject into the component's shadow DOM.
   */
  styles?: Styles;
};
/**
 * The properties of an activation event (such as a click or keyboard press) that describe which modifier keys and mouse buttons were involved. This is used to determine intended behavior like opening links in new tabs when Command/Control is pressed.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the Shift key was pressed during the activation event.
   */
  shiftKey: boolean;
  /**
   * Whether the Meta key (Command on Mac, Windows key on Windows) was pressed during the activation event.
   */
  metaKey: boolean;
  /**
   * Whether the Control key was pressed during the activation event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed during the activation event. `0` for primary button (left click), `1` for auxiliary button (middle click), `2` for secondary button (right click).
   */
  button: number;
}
/**
 * The options for controlling how a synthetic click behaves. Allows passing modifier key states and button information from an original event to influence link behavior such as opening in new tabs or background tabs.
 * @publicDocs
 */
export interface ClickOptions {
  /**
   * The activation event (such as a click or keyboard event) whose modifier key state and button information should influence the synthetic click behavior. For example, passing an event with `metaKey: true` will cause links to open in a new tab.
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
 * The base properties for Preact elements without children. Provides key, ref, and slot properties for element identification, DOM access, and slot-based positioning.
 * @publicDocs
 */
export interface PreactBaseElementProps<TClass extends HTMLElement> {
  /**
   * A unique identifier for the element when used in lists. Preact uses keys for efficient rendering and reconciliation when lists change.
   */
  key?: preact.Key;
  /**
   * A reference to the underlying DOM element. Typically created with `useRef()` to access the element directly for imperative operations like focusing or measuring.
   */
  ref?: preact.Ref<TClass>;
  /**
   * The named slot this element should be placed in when used within a web component. Learn more about [using slots](/docs/api/app-ui/using-web-components#slots).
   */
  slot?: Lowercase<string>;
}
/**
 * The base properties for Preact elements with children. Extends `PreactBaseElementProps` with the ability to render child elements.
 * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  /**
   * The child elements to render within this component.
   */
  children?: preact.ComponentChildren;
}

/**
 * The badge custom element class that renders status indicators in the Shopify admin interface. This component displays compact visual indicators with customizable tones, sizes, and optional icons to communicate status information to merchants.
 */
declare class Badge extends PreactCustomElement implements BadgeProps {
  /**
   * The visual weight of the badge. Available options: `'base'` for standard weight or `'strong'` for increased emphasis.
   */
  accessor color: BadgeProps['color'];
  /**
   * The icon to display inside the badge. Accepts any valid icon type from the admin icon set, or an empty string to display no icon.
   */
  accessor icon: BadgeProps['icon'];
  /**
   * The size of the badge. Available options: `'base'` for standard size, `'large'` for larger size, or `'large-100'` for extra large size.
   */
  accessor size: BadgeProps['size'];
  /**
   * The tone that determines the badge's visual appearance and semantic meaning. Available options: `'auto'`, `'neutral'`, `'info'`, `'success'`, `'caution'`, `'warning'`, or `'critical'`.
   */
  accessor tone: BadgeProps['tone'];
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Badge;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: BadgeJSXProps & PreactBaseElementPropsWithChildren<Badge>;
    }
  }
}

declare const tagName = 's-badge';
/**
 * The JSX props for the badge component. These properties extend `BadgeProps` with an optional `id` and `children` for rendering badge content in JSX.
 * @publicDocs
 */
export interface BadgeJSXProps
  extends Partial<BadgeProps>,
    Pick<BadgeProps$1, 'id' | 'children'> {
  /**
   * The text content to display inside the badge. Typically a short status label like "Fulfilled", "Draft", or "Active".
   */
  children?: ComponentChildren;
}

export {Badge};
export type {BadgeJSXProps};
