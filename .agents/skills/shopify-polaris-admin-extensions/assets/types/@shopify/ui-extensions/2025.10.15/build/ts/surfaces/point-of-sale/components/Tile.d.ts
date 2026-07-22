/** VERSION: undefined **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {TileProps, Key, Ref} from './components-shared.d.ts';

export type ComponentChildren = any;
/**
 * The base props for elements without children, providing key, ref, and slot properties.
 */
export interface BaseElementProps<TClass = HTMLElement> {
  /**
   * A unique identifier for the element in lists. Used by Preact for efficient rendering and reconciliation.
   */
  key?: Key;
  /**
   * A reference to the underlying DOM element. Commonly used to access the element directly for imperative operations.
   */
  ref?: Ref<TClass>;
  /**
   * The named [slot](/docs/api/polaris/using-polaris-web-components#slots) this element should be placed in when used within a web component.
   */
  slot?: Lowercase<string>;
}
/**
 * The base props for elements with children, extending `BaseElementProps` with children support.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement>
  extends BaseElementProps<TClass> {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T>;
/**
 * Represents an event triggered by user interaction with the tile. Provides information about the event and access to the tile element that triggered it.
 */
export interface CallbackEvent<T extends keyof HTMLElementTagNameMap> {
  /**
   * The tile element to which the event handler is attached. This always refers to the element that the event listener was added to, unlike `target` which may refer to a child element. Commonly used to access the tile's properties or manipulate the element directly.
   */
  currentTarget: HTMLElementTagNameMap[T];
  /**
   * Indicates whether the event bubbles up through the DOM tree. When `true`, parent elements can also handle this event. Commonly used to determine if the event will propagate to parent handlers.
   */
  bubbles?: boolean;
  /**
   * Indicates whether the event's default action can be prevented. When `true`, calling `preventDefault()` on the event will prevent the default behavior. Commonly used to determine if you can prevent the default action programmatically.
   */
  cancelable?: boolean;
  /**
   * Indicates whether the event will propagate across shadow DOM boundaries into the standard DOM. When `true`, the event can be handled by elements outside the shadow DOM. Relevant for web component implementations.
   */
  composed?: boolean;
  /**
   * The custom data associated with the event. For custom events, this can contain any additional information about the event. For standard tile click events, this is typically undefined unless custom data is provided.
   */
  detail?: any;
  /**
   * Indicates the current phase of the event flow. Standard DOM event phase values: `0` (none), `1` (capturing), `2` (at target), or `3` (bubbling). Typically applied when implementing custom event handling logic that needs to differentiate between event phases.
   */
  eventPhase: number;
  /**
   * The element that originally triggered the event. For tiles, this is typically the same as `currentTarget` since tiles are single interactive elements. Returns `null` if the target is no longer in the document.
   */
  target: HTMLElementTagNameMap[T] | null;
}

declare const tagName = 's-tile';
export interface TileJSXProps
  extends Pick<
    TileProps,
    'heading' | 'id' | 'itemCount' | 'tone' | 'subheading'
  > {
  /**
   * Controls whether the tile can be clicked or receive focus. When `true`, the tile appears dimmed and doesn't respond to user interactions or fire click events. Commonly used to prevent actions when conditions aren't met, such as insufficient cart contents or missing permissions. Defaults to `false`.
   *
   * @default false
   */
  disabled?: TileProps['disabled'];
  /**
   * The callback function executed when the tile is activated by user interaction. Use this to launch modal workflows with `api.action.presentModal()`, update application state, or trigger other actions. The event parameter provides details about the interaction and the tile element that was clicked.
   */
  onClick?: (event: CallbackEvent<typeof tagName>) => void;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: TileJSXProps;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<TileJSXProps>;
    }
  }
}

export {tagName};
export type {TileJSXProps};
