/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  LinkProps$1,
  InteractionProps,
} from './shared.d.ts';

/**
 * @publicDocs
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  currentTarget: HTMLElementTagNameMap[T];
};
/**
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
 * The base properties for Preact elements that have children, extending the base element properties to include child content.
 * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  children?: preact.ComponentChildren;
}

/**
 * @publicDocs
 */
export type RequiredLinkProps = Required<LinkProps$1>;
/**
 * @publicDocs
 */
export type LinkBaseProps = Required<
  Pick<
    LinkProps$1,
    | 'accessibilityLabel'
    | 'command'
    | 'commandFor'
    | 'interestFor'
    | 'download'
    | 'href'
    | 'lang'
    | 'target'
    | 'tone'
  >
>;
/**
 * The properties for the link component. These properties define a clickable link that navigates users to different pages or sections with customizable visual styles and semantic meaning.
 * @publicDocs
 */
export interface LinkProps extends LinkBaseProps {
  /**
   * The visual appearance and semantic meaning of the link. Links rely on the tone system for semantic meaning, so using custom styling might not clearly convey intent to merchants. Available options:
   * - `'auto'` - The system automatically chooses the appropriate tone based on context.
   * - `'neutral'` - Standard styling for general navigation without specific semantic meaning.
   * - `'critical'` - Red styling for links that lead to destructive actions or important warnings.
   *
   * @default 'auto'
   */
  tone: Extract<RequiredLinkProps['tone'], 'auto' | 'neutral' | 'critical'>;
}

/**
 * @publicDocs
 */
export type Styles = string;
/**
 * @publicDocs
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  ShadowRoot: (element: any) => ComponentChildren;
  styles?: Styles;
};
/**
 * @publicDocs
 */
export interface ActivationEventEsque {
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  button: number;
}
/**
 * @publicDocs
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
 * @publicDocs
 */
export interface PreactOverlayControlProps
  extends Pick<InteractionProps, 'commandFor' | 'interestFor'> {
  /**
   * The action the [command](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command) should take when this component is activated. The supported actions vary by target component type.
   *
   * - `--auto`: Performs the default action appropriate for the target component.
   * - `--show`: Displays the target component if it's currently hidden.
   * - `--hide`: Conceals the target component from view.
   * - `--toggle`: Alternates the target component between visible and hidden states.
   *
   * @default '--auto'
   */
  command: Extract<
    InteractionProps['command'],
    '--show' | '--hide' | '--toggle' | '--auto'
  >;
  /**
   * Sets the element the [commandFor](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor) should act on when this component is activated.
   */
  commandFor: Extract<InteractionProps['commandFor'], string>;
  /**
   * Sets the element the [interestFor](https://open-ui.org/components/interest-invokers.explainer/#the-pitch-in-code) should act on when this component is activated.
   */
  interestFor: Extract<InteractionProps['interestFor'], string>;
}

declare const Link_base: (abstract new (
  args_0: RenderImpl,
) => PreactCustomElement & PreactOverlayControlProps) &
  Pick<typeof PreactCustomElement, 'prototype' | 'observedAttributes'>;
declare class Link extends Link_base implements LinkProps {
  accessor tone: LinkProps['tone'];
  accessor accessibilityLabel: LinkProps['accessibilityLabel'];
  accessor href: LinkProps['href'];
  accessor target: LinkProps['target'];
  accessor download: LinkProps['download'];
  accessor lang: LinkProps['lang'];
  accessor onclick: CallbackEventListener<typeof tagName> | null;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Link;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: LinkJSXProps & PreactBaseElementPropsWithChildren<Link>;
    }
  }
}

declare const tagName = 's-link';
/**
 * The JSX properties for the link component. These properties define how a link is rendered in Preact or JSX.
 * @publicDocs
 */
export interface LinkJSXProps
  extends Partial<LinkProps>,
    Pick<LinkProps$1, 'id' | 'lang' | 'children'> {
  /**
   * The text or content to display inside the link. This typically describes the destination or action the link performs.
   */
  children?: ComponentChildren;
  /**
   * A callback function that's invoked when the link is clicked. It receives the click event as an argument.
   */
  onClick?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   *
   * @default ''
   */
  accessibilityLabel?: string;
  /**
   * The URL that the link navigates to when clicked. This is the primary property that defines where the link leads.
   *
   * @default ''
   */
  href?: LinkProps['href'];
  /**
   * Where to open the linked document. Available options:
   * - `''` - Opens in the same frame (default behavior).
   * - `'_blank'` - Opens in a new window or tab.
   * - `'_self'` - Opens in the same frame (explicit version of default).
   * - `'_parent'` - Opens in the parent frame.
   * - `'_top'` - Opens in the full body of the window.
   *
   * @default ''
   */
  target?: LinkProps['target'];
  /**
   * The filename to save the linked URL as when downloaded. When provided, clicking the link will download the resource instead of navigating to it.
   *
   * @default ''
   */
  download?: LinkProps['download'];
  /**
   * The language of the link's content, specified as a BCP 47 language tag (such as `'en'` or `'fr'`). This helps assistive technologies pronounce content correctly.
   *
   * @default ''
   */
  lang?: string;
}

export {Link};
/**
 * @publicDocs
 */
export type {LinkJSXProps};
