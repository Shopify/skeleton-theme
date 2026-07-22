/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  IconProps$1,
  ButtonProps$1,
  IconType,
  InteractionProps,
} from './shared.d.ts';

/**
 * A callback event with a strongly-typed `currentTarget` property that corresponds to a specific HTML element. This provides better type safety when handling events from custom elements.
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event listener is attached to, strongly typed based on the element's tag name.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * An event listener function type for callback events with a strongly-typed `currentTarget`. This ensures the event handler receives the correct element type.
 * @publicDocs
 */
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;
/**
 * The base properties for Preact elements without children. Provides `key`, `ref`, and `slot` properties for element identification, DOM access, and slot-based positioning.
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
 * The configuration for icons used within Button components. Defines the visual appearance, size, and semantic meaning of icons displayed in buttons.
 * @publicDocs
 */
export interface IconProps
  extends Pick<
    IconProps$1,
    'type' | 'tone' | 'color' | 'size' | 'interestFor'
  > {
  /**
   * Specifies the type of icon that will be displayed.
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
 * The button-specific properties extracted from the base button props type, used internally for type safety.
 * @publicDocs
 */
export type ButtonOnlyProps = Extract<
  ButtonProps$1,
  {
    type?: unknown;
  }
>;
/**
 * The base required properties for the button component, including all essential button configuration options. This type ensures all button properties have default values.
 * @publicDocs
 */
export type ButtonBaseProps = Required<
  Pick<
    ButtonOnlyProps,
    | 'accessibilityLabel'
    | 'disabled'
    | 'command'
    | 'commandFor'
    | 'icon'
    | 'interestFor'
    | 'lang'
    | 'loading'
    | 'type'
    | 'tone'
    | 'variant'
    | 'target'
    | 'href'
    | 'download'
  >
>;
/**
 * The properties for the button component. Buttons trigger actions or navigation when clicked, with customizable visual styles, states, and optional icons.
 * @publicDocs
 */
export interface ButtonProps extends ButtonBaseProps {
  /**
   * Determines the visual appearance and semantic meaning of the button. Buttons rely on the tone system for semantic meaning, so using custom styling might not clearly convey intent to merchants. Available options:
   * - `'auto'` - Lets the system automatically choose the appropriate tone based on context.
   * - `'neutral'` - Standard styling for general actions without specific semantic meaning.
   * - `'critical'` - Red styling for destructive actions that can't be undone, such as deleting data.
   *
   * @default 'auto'
   */
  tone: Extract<ButtonProps$1['tone'], 'neutral' | 'critical' | 'auto'>;
  /**
   * The icon to display inside the button. Accepts any valid icon type or an empty string to display no icon.
   *
   * @default ''
   */
  icon: IconProps['type'];
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
 * The properties for controlling overlay interactions via commands. These properties enable buttons to control other components like modals, popovers, and dialogs using declarative commands.
 * @publicDocs
 */
export interface PreactOverlayControlProps
  extends Pick<InteractionProps, 'commandFor' | 'interestFor'> {
  /**
   * Sets the action the [command](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command) should take when this button is activated. Available options:
   * - `'--auto'`: Performs the default action appropriate for the target component.
   * - `'--show'`: Displays the target component if it's currently hidden.
   * - `'--hide'`: Conceals the target component from view.
   * - `'--toggle'`: Alternates the target component between visible and hidden states.
   *
   * The supported actions vary by target component type.
   *
   * @default '--auto'
   */
  command: Extract<
    InteractionProps['command'],
    '--show' | '--hide' | '--toggle' | '--auto'
  >;
  /**
   * Sets the element ID that the [commandFor](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor) should act on when this button is activated. References another component by its `id` attribute.
   */
  commandFor: Extract<InteractionProps['commandFor'], string>;
  /**
   * Sets the element ID that the [interestFor](https://open-ui.org/components/interest-invokers.explainer/#the-pitch-in-code) should act on when this button is activated. Used for interest-based interactions with other components.
   */
  interestFor: Extract<InteractionProps['interestFor'], string>;
}

/**
 * The base class for the button component, combining Preact custom element functionality with overlay control capabilities.
 */
declare const Button_base: (abstract new (
  args_0: RenderImpl,
) => PreactCustomElement & PreactOverlayControlProps) &
  Pick<typeof PreactCustomElement, 'prototype' | 'observedAttributes'>;
/**
 * The button custom element class that renders interactive buttons in the Shopify admin interface. This component triggers actions or navigation when clicked, with customizable visual styles, states, and optional icons.
 */
declare class Button extends Button_base implements ButtonProps {
  /**
   * Whether the button is disabled, preventing any interaction. When `true`, the button appears visually disabled and doesn't respond to user clicks.
   */
  accessor disabled: ButtonProps['disabled'];
  /**
   * The icon to display inside the button. Accepts any valid icon type from the admin icon set, or an empty string to display no icon.
   */
  accessor icon: ButtonProps['icon'];
  /**
   * Whether the button is in a loading state. When `true`, displays a loading indicator and prevents interaction to show that an action is in progress.
   */
  accessor loading: ButtonProps['loading'];
  /**
   * The visual style variant of the button that determines its emphasis. Available options: `'primary'`, `'secondary'`, `'tertiary'`, or `'plain'`.
   */
  accessor variant: ButtonProps['variant'];
  /**
   * The tone that determines the button's visual appearance and semantic meaning. Available options: `'auto'`, `'neutral'`, or `'critical'`.
   */
  accessor tone: ButtonProps['tone'];
  /**
   * Specifies where to open the linked document when the button acts as a link. Available options: `''`, `'_blank'`, `'_self'`, `'_parent'`, or `'_top'`.
   */
  accessor target: ButtonProps['target'];
  /**
   * A URL that the button should navigate to when clicked. When provided, the button behaves as a link.
   */
  accessor href: ButtonProps['href'];
  /**
   * Prompts the user to save the linked URL as a file with the specified filename. Only works when `href` is provided.
   */
  accessor download: ButtonProps['download'];
  /**
   * A callback that's invoked when the button is clicked. Receives the click event as an argument.
   */
  accessor onclick: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's invoked when the button loses focus. Receives the blur event as an argument.
   */
  accessor onblur: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's invoked when the button receives focus. Receives the focus event as an argument.
   */
  accessor onfocus: CallbackEventListener<typeof tagName> | null;
  /**
   * The button's behavior in forms. Available options: `'button'`, `'submit'`, or `'reset'`.
   */
  accessor type: ButtonProps['type'];
  /**
   * A text description of the button's purpose for screen readers. This is essential for accessibility when the button doesn't have visible text.
   */
  accessor accessibilityLabel: ButtonProps['accessibilityLabel'];
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Button;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: ButtonJSXProps & PreactBaseElementPropsWithChildren<Button>;
    }
  }
}

declare const tagName = 's-button';
/**
 * The JSX props for the button component. These properties extend `ButtonProps` with event callbacks and additional options for rendering buttons in JSX.
 * @publicDocs
 */
export interface ButtonJSXProps
  extends Partial<ButtonProps>,
    Pick<ButtonProps$1, 'id' | 'children'> {
  /**
   * The text label or content to display inside the button. Can be plain text or other components.
   */
  children?: ComponentChildren;
  /**
   * Callback function that's invoked when the button is clicked. Receives the click event as an argument.
   */
  onClick?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * Callback function that's invoked when the button receives focus. Receives the focus event as an argument.
   */
  onFocus?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * Callback function that's invoked when the button loses focus. Receives the blur event as an argument.
   */
  onBlur?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   *
   * @default ''
   */
  accessibilityLabel?: string;
  /**
   * Prevents the button from being clicked when set to `true`. The button appears visually disabled and doesn't respond to user interaction.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Displays a loading indicator and prevents interaction when set to `true`. Use this to show that an action triggered by the button is in progress.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Determines the visual style and emphasis of the button. Available options:
   * - `'primary'` - Highest emphasis for the main action on a screen.
   * - `'secondary'` - Medium emphasis for secondary actions.
   * - `'tertiary'` - Lowest emphasis for less important actions.
   * - `'plain'` - Text-only appearance for subtle actions that don't need visual weight.
   *
   * @default 'secondary'
   */
  variant?: ButtonProps['variant'];
  /**
   * Specifies where to open the linked document when the button acts as a link (when `href` is provided). Available options:
   * - `''` - Opens in the same frame (default behavior).
   * - `'_blank'` - Opens in a new window or tab.
   * - `'_self'` - Opens in the same frame (explicit version of default).
   * - `'_parent'` - Opens in the parent frame.
   * - `'_top'` - Opens in the full body of the window.
   *
   * @default ''
   */
  target?: ButtonProps['target'];
  /**
   * A URL that the button should navigate to when clicked. When provided, the button behaves as a link.
   *
   * @default ''
   */
  href?: ButtonProps['href'];
  /**
   * Prompts the user to save the linked URL as a file with the specified filename. Only works when `href` is provided.
   *
   * @default ''
   */
  download?: ButtonProps['download'];
  /**
   * Specifies the button's behavior in forms. Available options:
   * - `'button'` - A standard button with no default behavior.
   * - `'submit'` - Submits the form data to the server.
   * - `'reset'` - Resets all form controls to their initial values.
   *
   * @default 'button'
   */
  type?: ButtonProps['type'];
  /**
   * The language of the button's content, specified as a BCP 47 language tag (such as `'en'` or `'fr'`). This helps assistive technologies pronounce content correctly.
   *
   * @default ''
   */
  lang?: ButtonProps['lang'];
}

export {Button};
export type {ButtonJSXProps};
