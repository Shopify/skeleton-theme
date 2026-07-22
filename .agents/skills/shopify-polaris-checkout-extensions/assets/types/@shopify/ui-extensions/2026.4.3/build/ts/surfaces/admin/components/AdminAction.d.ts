/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ComponentChildren, AdminActionProps$1} from './shared.d.ts';

/**
 * The properties for the admin action component. These properties configure the heading and loading state of the admin action extension interface.
 * @publicDocs
 */
export interface AdminActionProps
  extends Pick<AdminActionProps$1, 'heading' | 'loading'> {}

declare const tagName = 's-admin-action';

/**
 * The JSX props for the admin action component. These properties extend `AdminActionProps` with slots for primary and secondary action buttons that merchants can interact with.
 * @publicDocs
 */
export interface AdminActionJSXProps
  extends Partial<AdminActionProps>,
    Pick<AdminActionProps$1, 'id'> {
  /**
   * The primary action button or link to display in the admin action area. This is the main call-to-action that appears prominently in the interface. Typically uses a button component with `variant="primary"` to complete or advance the workflow.
   */
  primaryAction: ComponentChildren;
  /**
   * The secondary action buttons or links to display in the admin action area. These are supporting actions like cancel, back, or alternative operations. Typically uses button components with `variant="secondary"` or `variant="tertiary"`.
   */
  secondaryActions: ComponentChildren;
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
 * The admin action custom element class that renders action controls in the Shopify admin interface. This component creates a standardized action area with a heading and slots for primary and secondary action buttons, used exclusively in admin action extensions.
 */
declare class AdminAction
  extends PreactCustomElement
  implements AdminActionProps
{
  /**
   * The heading text to display at the top of the action area. This title describes the action or task the merchant is performing. If not provided, the extension name is used as the heading.
   */
  heading: string;

  /**
   * Whether the action extension is currently in a loading state, such as during initial data fetching or when opening the action. When `true`, the action area might display loading indicators and prevent user interaction until loading completes.
   *
   * @default false
   */
  loading: boolean;

  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: AdminAction;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<
        AdminActionJSXProps,
        'primaryAction' | 'secondaryActions'
      > & {
        children?: preact.ComponentChildren;
      };
    }
  }
}

export {AdminAction};
export type {AdminActionJSXProps};
