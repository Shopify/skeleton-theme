/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  TableProps$1,
  TableHeaderProps$1,
} from './shared.d.ts';

/**
 * The properties you can set on a table component.
 */
export interface TableProps
  extends Required<
    Pick<
      TableProps$1,
      'loading' | 'paginate' | 'hasPreviousPage' | 'hasNextPage' | 'variant'
    >
  > {
  /**
   * The display variant of the table. Use `list` to force a list view, or `auto` to automatically switch between table and list based on the available space.
   */
  variant: Extract<TableProps$1['variant'], 'list' | 'auto'>;
}

/**
 * The format type for a table header, which determines how the cell content is displayed.
 */
export type HeaderFormat = Extract<
  TableHeaderProps$1['format'],
  'base' | 'currency' | 'numeric'
>;
/**
 * The properties you can set on a table header component.
 */
export interface TableHeaderProps
  extends Pick<TableHeaderProps$1, 'listSlot' | 'format'> {
  /**
   * The slot where this header's data appears in list view. The options include `primary` for the main content, `secondary` for supporting text, `labeled` for labeled data, `kicker` for small text above the primary content, or `inline` for inline content.
   */
  listSlot: Extract<
    TableHeaderProps$1['listSlot'],
    'primary' | 'secondary' | 'labeled' | 'kicker' | 'inline'
  >;
  /**
   * The format of the header, which affects how the cell content is aligned and displayed. Use `base` for standard text, `currency` for monetary values, or `numeric` for numbers.
   */
  format: HeaderFormat;
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
 * A context object that provides a default value of a specific type.
 */
export interface Context<T> {
  /**
   * The default value for this context.
   */
  readonly defaultValue: T;
}
/**
 * An extended context class that provides event-based updates when the context value changes.
 */
declare class AddedContext<T> extends EventTarget {
  /**
   * Creates a new context with the given default value.
   */
  constructor(defaultValue: T);
  /**
   * The current value of the context.
   */
  get value(): T;
  /**
   * Sets a new value for the context.
   */
  set value(value: T);
}

/**
 * A callback that a context requester provides, which is called with the value that satisfies the request.
 * Context providers can call this callback multiple times as the requested value changes.
 */
export type ContextCallback<T> = (value: T) => void;
/**
 * An event that a context requester fires to signal it wants a named context.
 *
 * A provider should inspect the `context` property of the event to see if it has a value that can satisfy the request, and if so, call the `callback` with the requested value.
 */
declare class ContextRequestEvent<T> extends Event {
  /**
   * The context that's being requested.
   */
  readonly context: Context<T>;
  /**
   * The callback to call with the requested context value.
   */
  readonly callback: ContextCallback<T>;
  /**
   * Creates a new context request event with the given context and callback.
   */
  constructor(context: Context<T>, callback: ContextCallback<T>);
}
declare global {
  interface HTMLElementEventMap {
    /**
     * A 'context-request' event can be emitted by any element which desires
     * a context value to be injected by an external provider.
     */
    'context-request': ContextRequestEvent<unknown>;
  }
}

/** @private */
declare const actualTableVariantSymbol: unique symbol;
/** @private */
declare const tableHeadersSharedDataSymbol: unique symbol;
/**
 * The actual display variant of the table, which is either a traditional table or a list.
 */
export type ActualTableVariant = 'table' | 'list';

/**
 * An event that includes a strongly typed `currentTarget` property based on the element tag name.
 */
export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  /**
   * The element that the event listener is attached to.
   */
  currentTarget: HTMLElementTagNameMap[T];
};
/**
 * An event listener function that receives a strongly typed callback event, or `null` if no listener is attached.
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
  children?: preact.ComponentChildren;
}

/**
 * A component that displays data in a structured table format that automatically adapts to the available space.
 */
declare class Table extends PreactCustomElement implements TableProps {
  /**
   * The display variant of the table.
   */
  accessor variant: TableProps['variant'];
  /**
   * Whether the table is currently in a loading state.
   */
  accessor loading: TableProps['loading'];
  /**
   * Whether the pagination controls are displayed.
   */
  accessor paginate: TableProps['paginate'];
  /**
   * Whether there's a previous page of data that the user can navigate to.
   */
  accessor hasPreviousPage: TableProps['hasPreviousPage'];
  /**
   * Whether there's a next page of data that the user can navigate to.
   */
  accessor hasNextPage: TableProps['hasNextPage'];
  /**
   * The event listener that's called when the user navigates to the previous page.
   */
  accessor onpreviouspage: CallbackEventListener<typeof tagName> | null;
  /**
   * The event listener that's called when the user navigates to the next page.
   */
  accessor onnextpage: CallbackEventListener<typeof tagName> | null;
  /**
   * @private
   * The actual table variant, which is either 'table' or 'list'.
   */
  [actualTableVariantSymbol]: AddedContext<ActualTableVariant>;
  /** @private */
  [tableHeadersSharedDataSymbol]: AddedContext<
    {
      listSlot: TableHeaderProps['listSlot'];
      textContent: string;
      format: HeaderFormat;
    }[]
  >;

  /**
   * Creates a new Table instance.
   */
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Table;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<TableJSXProps, 'filters'> &
        PreactBaseElementPropsWithChildren<Table>;
    }
  }
}

/**
 * The custom element tag name for the table component.
 */
declare const tagName = 's-table';
/**
 * The JSX properties you can set on a table component.
 */
export interface TableJSXProps
  extends Partial<TableProps>,
    Pick<TableProps$1, 'id' | 'children' | 'onNextPage' | 'onPreviousPage'> {
  /**
   * The content to display inside the table, which should include table header row, table body, and table row components.
   */
  children?: ComponentChildren;
  /**
   * Additional filters to display in the table. For example, you can use the search field component to filter the table data.
   */
  filters?: ComponentChildren;
}

export {Table};
export type {TableJSXProps};
