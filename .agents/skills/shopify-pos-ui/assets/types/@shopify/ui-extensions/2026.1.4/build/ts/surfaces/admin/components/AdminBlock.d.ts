/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {AdminBlockProps$1, ComponentChildren} from './shared.d.ts';

/**
 * The properties for the admin block component. These properties configure the heading and collapsed summary of collapsible content blocks in the admin interface.
 * @publicDocs
 */
export interface AdminBlockProps
  extends Pick<AdminBlockProps$1, 'heading' | 'collapsedSummary'> {}

declare const tagName = 's-admin-block';

/**
 * The JSX props for the admin block component. These properties extend `AdminBlockProps` with an optional `id` for element identification in JSX rendering.
 * @publicDocs
 */
export interface AdminBlockJSXProps
  extends Partial<AdminBlockProps>,
    Pick<AdminBlockProps$1, 'id'> {}

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
 * The admin block custom element class that renders a collapsible content block in the Shopify admin interface. This component organizes content into expandable sections with headings and provides a summary when collapsed.
 */
declare class AdminBlock
  extends PreactCustomElement
  implements AdminBlockProps
{
  /**
   * The heading text to display at the top of the block. This title describes the content section the merchant is viewing. If not provided, no heading is displayed.
   */
  heading: string;

  /**
   * The summary text to display when the block is collapsed. This provides merchants with a preview of the block's contents without expanding it. If not provided, no summary is displayed.
   */
  collapsedSummary: string;

  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: AdminBlock;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: AdminBlockJSXProps & {
        children?: preact.ComponentChildren;
      };
    }
  }
}

export {AdminBlock};
/**
 * @publicDocs
 */
export type {AdminBlockJSXProps};
