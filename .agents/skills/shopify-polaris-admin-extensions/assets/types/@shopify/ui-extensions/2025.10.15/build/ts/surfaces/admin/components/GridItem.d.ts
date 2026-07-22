/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  BoxProps$1,
  GridItemProps$1,
  MaybeAllValuesShorthandProperty,
  SizeUnitsOrAuto,
  SizeUnits,
  SizeUnitsOrNone,
} from './shared.d.ts';

/**
 * A type that allows a value to be responsive using container query syntax.
 */
export type MakeResponsive<T> = T | `@container${string}`;
/**
 * Makes a property's value potentially responsive.
 *
 * @example
 * type Example = {
 *   color: boolean;
 *   margin: string;
 *   padding: number;
 * }
 * type Result = MakeResponsivePick<Example, 'color' | 'margin' | 'padding'>;
 * // Result = {
 *   color: boolean | `@container${string}`;
 *   margin: string | `@container${string}`;
 *   padding: number | `@container${string}`;
 * }
 */
export type MakeResponsivePick<TType, TProperty extends keyof TType> = {
  [P in TProperty]: MakeResponsive<TType[P]>;
};

/**
 * A version of the box properties with all fields required.
 */
export type RequiredBoxProps = Required<BoxProps$1>;
/**
 * The allowed border radius values for a box component.
 */
export type BoxBorderRadii = Extract<
  RequiredBoxProps['borderRadius'],
  | 'none'
  | 'small-200'
  | 'small-100'
  | 'small'
  | 'base'
  | 'large'
  | 'large-100'
  | 'large-200'
>;
/**
 * The allowed border style values for a box component.
 */
export type BoxBorderStyles = Extract<
  RequiredBoxProps['borderStyle'],
  'none' | 'solid' | 'dashed' | 'auto'
>;
/**
 * The box properties that support responsive values through container queries.
 */
export type ResponsiveBoxProps = MakeResponsivePick<
  RequiredBoxProps,
  | 'padding'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'display'
>;
export interface BoxProps
  extends Pick<
    RequiredBoxProps,
    | 'accessibilityLabel'
    | 'accessibilityRole'
    | 'accessibilityVisibility'
    | 'background'
    | 'blockSize'
    | 'border'
    | 'borderColor'
    | 'borderRadius'
    | 'borderStyle'
    | 'borderWidth'
    | 'inlineSize'
    | 'maxBlockSize'
    | 'maxInlineSize'
    | 'minBlockSize'
    | 'minInlineSize'
    | 'overflow'
  > {
  /**
   * The background color of the grid item.
   *
   * @default 'transparent'
   */
  background: Extract<
    RequiredBoxProps['background'],
    'transparent' | 'base' | 'subdued' | 'strong'
  >;
  /**
   * Controls the thickness of the border on all sides. When set, this overrides the width value specified in the `border` property.
   *
   * - `small`: Thin border for subtle definition.
   * - `small-100`: Extra thin border for minimal emphasis.
   * - `base`: Standard border width.
   * - `large`: Thick border for strong emphasis.
   * - `large-100`: Extra thick border for maximum prominence.
   * - `none`: No border.
   *
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different widths per side.
   *
   * @default '' - meaning no override
   */
  borderWidth:
    | MaybeAllValuesShorthandProperty<
        Extract<
          RequiredBoxProps['borderWidth'],
          'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'none'
        >
      >
    | Extract<RequiredBoxProps['borderWidth'], ''>;
  /**
   * The visual style of the border (solid, dashed, auto, or none).
   *
   * @default '' - meaning no override
   */
  borderStyle:
    | MaybeAllValuesShorthandProperty<BoxBorderStyles>
    | Extract<RequiredBoxProps['borderStyle'], ''>;
  /**
   * The color of the border using the design system's color scale.
   *
   * @default '' - meaning no override
   */
  borderColor: Extract<
    RequiredBoxProps['borderColor'],
    'subdued' | 'base' | 'strong' | ''
  >;
  /**
   * The roundedness of the corners using the design system's radius scale.
   *
   * @default 'none'
   */
  borderRadius: MaybeAllValuesShorthandProperty<BoxBorderRadii>;
  /**
   * The padding applied to all edges of the grid item.
   *
   * [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) is supported. Note that, contrary to the CSS, it uses flow-relative values and the order is:
   *
   * - 4 values: `block-start inline-end block-end inline-start`
   * - 3 values: `block-start inline block-end`
   * - 2 values: `block inline`
   *
   * For example:
   * - `large` means block-start, inline-end, block-end and inline-start paddings are `large`.
   * - `large none` means block-start and block-end paddings are `large`, inline-start and inline-end paddings are `none`.
   * - `large none large` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `none`.
   * - `large none large small` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `small`.
   *
   * A padding value of `auto` will use the default padding for the closest container that has had its usual padding removed.
   *
   * `padding` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default 'none'
   */
  padding: ResponsiveBoxProps['padding'];
  /**
   * The padding applied to the block axis (top and bottom in horizontal writing modes).
   *
   * - `large none` means block-start padding is `large`, block-end padding is `none`.
   *
   * This overrides the block value of `padding`.
   *
   * `paddingBlock` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingBlock: ResponsiveBoxProps['paddingBlock'];
  /**
   * The padding applied to the block-start edge (top in horizontal writing modes).
   *
   * This overrides the block-start value of `paddingBlock`.
   *
   * `paddingBlockStart` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingBlockStart: ResponsiveBoxProps['paddingBlockStart'];
  /**
   * The padding applied to the block-end edge (bottom in horizontal writing modes).
   *
   * This overrides the block-end value of `paddingBlock`.
   *
   * `paddingBlockEnd` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingBlockEnd: ResponsiveBoxProps['paddingBlockEnd'];
  /**
   * The padding applied to the inline axis (left and right in horizontal writing modes).
   *
   * - `large none` means inline-start padding is `large`, inline-end padding is `none`.
   *
   * This overrides the inline value of `padding`.
   *
   * `paddingInline` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingInline: ResponsiveBoxProps['paddingInline'];
  /**
   * The padding applied to the inline-start edge (left in left-to-right languages).
   *
   * This overrides the inline-start value of `paddingInline`.
   *
   * `paddingInlineStart` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingInlineStart: ResponsiveBoxProps['paddingInlineStart'];
  /**
   * The padding applied to the inline-end edge (right in left-to-right languages).
   *
   * This overrides the inline-end value of `paddingInline`.
   *
   * `paddingInlineEnd` also accepts a [responsive value](https://shopify.dev/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingInlineEnd: ResponsiveBoxProps['paddingInlineEnd'];
  /**
   * Sets the outer [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) type of the component. The outer type sets a component's participation in [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout).
   *
   * - `auto` the component's initial value. The actual value depends on the component and context.
   * - `none` hides the component from display and removes it from the accessibility tree, making it invisible to screen readers.
   *
   * @default 'auto'
   */
  display: ResponsiveBoxProps['display'];
  /**
   * The vertical size of the grid item in standard layouts (height in left-to-right or right-to-left writing modes).
   *
   * Block size adjusts based on the writing direction: in horizontal layouts, it controls the height;
   * in vertical layouts, it controls the width. This ensures consistent behavior across different text directions.
   *
   * Learn more about [block-size](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size).
   *
   * @default 'auto'
   */
  blockSize: SizeUnitsOrAuto;
  /**
   * The [minimum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) (minimum height in horizontal writing modes) of the grid item.
   *
   * @default '0'
   */
  minBlockSize: SizeUnits;
  /**
   * The [maximum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size) (maximum height in horizontal writing modes) of the grid item.
   *
   * @default 'none'
   */
  maxBlockSize: SizeUnitsOrNone;
  /**
   * The [inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) (width in horizontal writing modes) of the grid item.
   *
   * @default 'auto'
   */
  inlineSize: SizeUnitsOrAuto;
  /**
   * The [minimum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) (minimum width in horizontal writing modes) of the grid item.
   *
   * @default '0'
   */
  minInlineSize: SizeUnits;
  /**
   * The [maximum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size) (maximum width in horizontal writing modes) of the grid item.
   *
   * @default 'none'
   */
  maxInlineSize: SizeUnitsOrNone;
}

/**
 * A version of the grid item properties with all fields required.
 */
export type RequiredGridItemProps = Required<GridItemProps$1>;
/**
 * The properties for the grid item component. A grid item can be positioned within specific rows and columns of a grid, with control over how many rows or columns it spans.
 */
export interface GridItemProps
  extends BoxProps,
    Required<Pick<GridItemProps$1, 'gridColumn' | 'gridRow'>> {
  /**
   * The column position and span of the grid item. You can specify a starting column number, an ending column number, or both (for example, `'1 / 3'` starts at column 1 and ends before column 3, spanning 2 columns). You can also use `'span 2'` to make the item span 2 columns.
   */
  gridColumn: RequiredGridItemProps['gridColumn'];
  /**
   * The row position and span of the grid item. You can specify a starting row number, an ending row number, or both (for example, `'1 / 3'` starts at row 1 and ends before row 3, spanning 2 rows). You can also use `'span 2'` to make the item span 2 rows.
   */
  gridRow: RequiredGridItemProps['gridRow'];
}

/**
 * A string containing CSS styles for a custom element.
 */
export type Styles = string;
/**
 * The configuration for rendering a custom element with Preact.
 */
export type RenderImpl = Omit<ShadowRootInit, 'mode'> & {
  /**
   * The function that renders the shadow root content.
   */
  ShadowRoot: (element: any) => ComponentChildren;
  /**
   * The optional CSS styles to apply to the shadow root.
   */
  styles?: Styles;
};
/**
 * An interface representing the properties of an activation event, such as a click or keypress.
 */
export interface ActivationEventEsque {
  /**
   * Whether the shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the meta key (Command on Mac, Windows key on PC) was pressed during the event.
   */
  metaKey: boolean;
  /**
   * Whether the control key was pressed during the event.
   */
  ctrlKey: boolean;
  /**
   * The mouse button that was pressed (0 for left, 1 for middle, 2 for right).
   */
  button: number;
}
/**
 * The options for triggering a synthetic click event.
 */
export interface ClickOptions {
  /**
   * The original user event (such as a click or keyboard event) that triggered this programmatic click. When provided, the component preserves important event properties like modifier keys (Ctrl, Shift, Alt, Meta) and mouse button states, enabling behaviors such as opening links in a new tab when middle-clicked or Ctrl+clicked.
   */
  sourceEvent?: ActivationEventEsque;
}
/**
 * The base class for creating custom elements with Preact.
 * While this class could be used in both Node and the browser, the constructor will only be used in the browser.
 * So we give it a type of HTMLElement to avoid typing issues later where it's used, which will only happen in the browser.
 */
declare const BaseClass: typeof globalThis.HTMLElement;
/**
 * An abstract base class for creating custom elements that render with Preact.
 */
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
 * The base element class for Box components with all Box properties as accessors.
 */
declare class BoxElement extends PreactCustomElement implements BoxProps {
  constructor(renderImpl: RenderImpl);
  /**
   * The ARIA role that defines the semantic meaning of the grid item for assistive technologies.
   */
  accessor accessibilityRole: BoxProps['accessibilityRole'];
  /**
   * The background color of the grid item using the design system's color scale. Choose from `transparent`, `subdued`, `base`, or `strong`.
   */
  accessor background: BoxProps['background'];
  /**
   * The height of the grid item in horizontal writing modes, or width in vertical writing modes.
   * Use this for flow-relative sizing that adapts to text direction.
   */
  accessor blockSize: BoxProps['blockSize'];
  /**
   * The minimum height of the grid item in horizontal writing modes, or minimum width in vertical writing modes.
   * Prevents the grid item from shrinking below this size.
   */
  accessor minBlockSize: BoxProps['minBlockSize'];
  /**
   * The maximum height of the grid item in horizontal writing modes, or maximum width in vertical writing modes.
   * Prevents the grid item from growing beyond this size.
   */
  accessor maxBlockSize: BoxProps['maxBlockSize'];
  /**
   * The width of the grid item in horizontal writing modes, or height in vertical writing modes.
   * Use this for flow-relative sizing that adapts to text direction.
   */
  accessor inlineSize: BoxProps['inlineSize'];
  /**
   * The minimum width of the grid item in horizontal writing modes, or minimum height in vertical writing modes.
   * Prevents the grid item from shrinking below this size.
   */
  accessor minInlineSize: BoxProps['minInlineSize'];
  /**
   * The maximum width of the grid item in horizontal writing modes, or maximum height in vertical writing modes.
   * Prevents the grid item from growing beyond this size.
   */
  accessor maxInlineSize: BoxProps['maxInlineSize'];
  /**
   * Controls how content that exceeds the grid item's boundaries is displayed. Use `hidden` to clip overflow or `visible` to allow content to extend beyond boundaries.
   */
  accessor overflow: BoxProps['overflow'];
  /**
   * The spacing applied inside the grid item on all sides, creating distance between the item's edges and its content.
   */
  accessor padding: BoxProps['padding'];
  /**
   * The vertical padding (top and bottom) in horizontal writing modes.
   * Use this for flow-relative padding that adapts to text direction.
   */
  accessor paddingBlock: BoxProps['paddingBlock'];
  /**
   * The padding at the top in horizontal writing modes, or at the start edge in vertical writing modes.
   */
  accessor paddingBlockStart: BoxProps['paddingBlockStart'];
  /**
   * The padding at the bottom in horizontal writing modes, or at the end edge in vertical writing modes.
   */
  accessor paddingBlockEnd: BoxProps['paddingBlockEnd'];
  /**
   * The horizontal padding (left and right) in horizontal writing modes.
   * Use this for flow-relative padding that adapts to text direction.
   */
  accessor paddingInline: BoxProps['paddingInline'];
  /**
   * The padding at the left in left-to-right languages, or at the right in right-to-left languages.
   */
  accessor paddingInlineStart: BoxProps['paddingInlineStart'];
  /**
   * The padding at the right in left-to-right languages, or at the left in right-to-left languages.
   */
  accessor paddingInlineEnd: BoxProps['paddingInlineEnd'];
  /**
   * Applies a border using shorthand syntax to specify width, color, and style in a single property.
   */
  accessor border: BoxProps['border'];
  /**
   * The width of the border.
   */
  accessor borderWidth: BoxProps['borderWidth'];
  /**
   * The style of the border.
   */
  accessor borderStyle: BoxProps['borderStyle'];
  /**
   * The color of the border.
   */
  accessor borderColor: BoxProps['borderColor'];
  /**
   * The radius of the border corners.
   */
  accessor borderRadius: BoxProps['borderRadius'];
  /**
   * A text description of the grid item for screen readers, used when the visual context isn't sufficient for understanding.
   */
  accessor accessibilityLabel: BoxProps['accessibilityLabel'];
  /**
   * Controls the visibility of the grid item for both visual and assistive technology users. Use `hidden` to hide from screen readers or `exclusive` to hide visually but announce to screen readers.
   */
  accessor accessibilityVisibility: BoxProps['accessibilityVisibility'];
  /**
   * Controls how the grid item is displayed in the layout, such as block, inline, or none.
   */
  accessor display: BoxProps['display'];
}

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
 * A grid item is a child of a grid that can be positioned within specific rows and columns.
 */
declare class GridItem extends BoxElement implements GridItemProps {
  /**
   * The column position and span of the grid item.
   */
  accessor gridColumn: GridItemProps['gridColumn'];
  /**
   * The row position and span of the grid item.
   */
  accessor gridRow: GridItemProps['gridRow'];
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: GridItem;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: GridItemJSXProps &
        PreactBaseElementPropsWithChildren<GridItem>;
    }
  }
}

declare const tagName = 's-grid-item';
/**
 * The properties for the grid item component when it's used in JSX.
 */
export interface GridItemJSXProps
  extends Partial<GridItemProps>,
    Pick<GridItemProps$1, 'id' | 'children'> {
  /**
   * The child elements to render inside the grid item.
   */
  children?: ComponentChildren;
}

export {GridItem};
export type {GridItemJSXProps};
