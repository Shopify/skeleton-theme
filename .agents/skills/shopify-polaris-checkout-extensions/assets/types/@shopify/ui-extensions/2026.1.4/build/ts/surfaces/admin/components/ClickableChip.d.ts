/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  ClickableChipProps$1,
  InteractionProps,
} from './shared.d.ts';

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
 * The base properties for Preact elements that have children, extending the base element properties to include child content.
 * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  /**
   * The child elements to render inside this element.
   */
  children?: preact.ComponentChildren;
}

/**
 * The properties for the clickable chip component. These properties define an interactive chip that can be clicked or removed.
 * @publicDocs
 */
export interface ClickableChipProps
  extends Required<
    Pick<
      ClickableChipProps$1,
      | 'color'
      | 'accessibilityLabel'
      | 'removable'
      | 'hidden'
      | 'href'
      | 'disabled'
      | 'command'
      | 'commandFor'
      | 'interestFor'
    >
  > {}

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
 * An event-like object that contains activation information for synthetic clicks.
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
 * Options for customizing synthetic click behavior.
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
 * Props for controlling overlay components like popovers and dialogs.
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

declare const ClickableChip_base: (abstract new (
  args_0: RenderImpl,
) => PreactCustomElement & PreactOverlayControlProps) &
  Pick<typeof PreactCustomElement, 'prototype' | 'observedAttributes'>;
/**
 * A custom element for displaying interactive chips that can be clicked or removed.
 */
declare class ClickableChip
  extends ClickableChip_base
  implements ClickableChipProps
{
  /**
   * The color of the chip.
   */
  accessor color: ClickableChipProps['color'];
  /**
   * A text description of the chip for screen readers.
   */
  accessor accessibilityLabel: ClickableChipProps['accessibilityLabel'];
  /**
   * Whether the chip can be removed by the user.
   */
  accessor removable: ClickableChipProps['removable'];
  /**
   * Whether the chip is hidden from view.
   */
  accessor hidden: ClickableChipProps['hidden'];
  /**
   * Whether the chip is disabled and can't be clicked.
   */
  accessor disabled: ClickableChipProps['disabled'];
  /**
   * The URL to navigate to when the chip is clicked.
   */
  accessor href: ClickableChipProps['href'];
  /**
   * A callback that's fired when the chip is clicked.
   */
  accessor onclick: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's fired when the chip is removed.
   */
  accessor onremove: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's fired after the chip finishes hiding.
   */
  accessor onafterhide: CallbackEventListener<typeof tagName> | null;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: ClickableChip;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<ClickableChipJSXProps, 'graphic'> &
        PreactBaseElementPropsWithChildren<ClickableChip>;
    }
  }
}

declare const tagName = 's-clickable-chip';
/**
 * The JSX properties for the clickable chip component. These properties define how a clickable chip is rendered in Preact or JSX.
 * @publicDocs
 */
export interface ClickableChipJSXProps
  extends Partial<ClickableChipProps>,
    Pick<ClickableChipProps$1, 'id' | 'children'> {
  /**
   * The content of the chip.
   */
  children?: ComponentChildren;
  /**
   * An optional icon to display at the start of the chip. Accepts only Icon components.
   */
  graphic?: ComponentChildren;
  /**
   * A callback that's fired when the chip is clicked.
   */
  onClick?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's fired when the chip is removed.
   */
  onRemove?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's fired after the chip finishes hiding.
   */
  onAfterHide?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {ClickableChip};
/**
 * @publicDocs
 */
export type {ClickableChipJSXProps};
