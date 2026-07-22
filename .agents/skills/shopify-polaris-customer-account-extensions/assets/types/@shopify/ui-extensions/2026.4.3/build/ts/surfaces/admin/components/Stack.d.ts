/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  BoxProps$1,
  StackProps$1,
  MaybeAllValuesShorthandProperty,
  SizeUnitsOrAuto,
  SizeUnits,
  SizeUnitsOrNone,
  JustifyContentKeyword,
  AlignItemsKeyword,
  AlignContentKeyword,
} from './shared.d.ts';

/**
 * A type that allows a value to be responsive using container query syntax.
 * @publicDocs
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
 * @publicDocs
 */
export type MakeResponsivePick<TType, TProperty extends keyof TType> = {
  [P in TProperty]: MakeResponsive<TType[P]>;
};

/**
 * A version of the box properties with all fields required.
 * @publicDocs
 */
export type RequiredBoxProps = Required<BoxProps$1>;
/**
 * The allowed border radius values for a box component.
 * @publicDocs
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
 * @publicDocs
 */
export type BoxBorderStyles = Extract<
  RequiredBoxProps['borderStyle'],
  'none' | 'solid' | 'dashed' | 'auto'
>;
/**
 * The box properties that support responsive values through container queries.
 * @publicDocs
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
   * The background color of the stack container.
   *
   * @default 'transparent'
   */
  background: Extract<
    RequiredBoxProps['background'],
    'transparent' | 'base' | 'subdued' | 'strong'
  >;
  /**
   * Controls the thickness of the border on all sides.
   *
   * When set, this overrides the width value specified in the `border` property.
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
   * Controls the visual style of the border on all sides (solid, dashed, auto, or none).
   *
   * When set, this overrides the style value specified in the `border` property.
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different styles per side.
   *
   * @default '' - meaning no override
   */
  borderStyle:
    | MaybeAllValuesShorthandProperty<BoxBorderStyles>
    | Extract<RequiredBoxProps['borderStyle'], ''>;
  /**
   * Controls the color of the border using the design system's color scale.
   *
   * When set, this overrides the color value specified in the `border` property.
   * Choose from `subdued`, `base`, or `strong` to match the visual emphasis needed.
   *
   * @default '' - meaning no override
   */
  borderColor: Extract<
    RequiredBoxProps['borderColor'],
    'subdued' | 'base' | 'strong' | ''
  >;
  /**
   * Controls the roundedness of the element's corners using the design system's radius scale.
   *
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different radii per corner. Use this to create rounded corners or fully rounded elements.
   *
   * @default 'none'
   */
  borderRadius: MaybeAllValuesShorthandProperty<BoxBorderRadii>;
  /**
   * The padding applied to all edges of the stack container.
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
   * `padding` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
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
   * `paddingBlock` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingBlock: ResponsiveBoxProps['paddingBlock'];
  /**
   * The padding applied to the block-start edge (top in horizontal writing modes).
   *
   * This overrides the block-start value of `paddingBlock`.
   *
   * `paddingBlockStart` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingBlockStart: ResponsiveBoxProps['paddingBlockStart'];
  /**
   * The padding applied to the block-end edge (bottom in horizontal writing modes).
   *
   * This overrides the block-end value of `paddingBlock`.
   *
   * `paddingBlockEnd` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
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
   * `paddingInline` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingInline: ResponsiveBoxProps['paddingInline'];
  /**
   * The padding applied to the inline-start edge (left in left-to-right languages).
   *
   * This overrides the inline-start value of `paddingInline`.
   *
   * `paddingInlineStart` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
   *
   * @default '' - meaning no override
   */
  paddingInlineStart: ResponsiveBoxProps['paddingInlineStart'];
  /**
   * The padding applied to the inline-end edge (right in left-to-right languages).
   *
   * This overrides the inline-end value of `paddingInline`.
   *
   * `paddingInlineEnd` also accepts a [responsive value](/docs/api/polaris/using-web-components#responsive-values) string with the supported `PaddingKeyword` as a query value.
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
   * The vertical size of the stack in standard layouts (height in left-to-right or right-to-left writing modes).
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
   * The [minimum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) (minimum height in horizontal writing modes) of the stack container.
   *
   * @default '0'
   */
  minBlockSize: SizeUnits;
  /**
   * The [maximum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size) (maximum height in horizontal writing modes) of the stack container.
   *
   * @default 'none'
   */
  maxBlockSize: SizeUnitsOrNone;
  /**
   * The [inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) (width in horizontal writing modes) of the stack container.
   *
   * @default 'auto'
   */
  inlineSize: SizeUnitsOrAuto;
  /**
   * The [minimum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) (minimum width in horizontal writing modes) of the stack container.
   *
   * @default '0'
   */
  minInlineSize: SizeUnits;
  /**
   * The [maximum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size) (maximum width in horizontal writing modes) of the stack container.
   *
   * @default 'none'
   */
  maxInlineSize: SizeUnitsOrNone;
}

/**
 * A version of the stack properties with all fields required.
 * @publicDocs
 */
export type AlignedStackProps = Required<StackProps$1>;
/**
 * The stack properties that support responsive values through container queries.
 * @publicDocs
 */
export type ResponsiveStackProps = MakeResponsivePick<
  AlignedStackProps,
  'gap' | 'rowGap' | 'columnGap' | 'direction'
>;
/**
 * The properties for the stack component. A stack arranges its children in a single direction with controlled spacing and alignment along both axes.
 * @publicDocs
 */
export interface StackProps
  extends BoxProps,
    Pick<
      Required<AlignedStackProps>,
      'justifyContent' | 'alignItems' | 'alignContent'
    > {
  /**
   * Controls the distribution of children along the inline axis (horizontally in horizontal writing modes).
   *
   * Use this to position items along the primary axis of the stack - horizontally for inline stacks or vertically for block stacks when wrapped into multiple lines.
   *
   * @default 'normal'
   */
  justifyContent: JustifyContentKeyword;
  /**
   * Controls the alignment of children along the block axis (vertically in horizontal writing modes).
   *
   * Use this to align items perpendicular to the stack direction - vertically for inline stacks or horizontally for block stacks.
   *
   * @default 'normal'
   */
  alignItems: AlignItemsKeyword;
  /**
   * Controls the distribution of lines along the block axis when content wraps into multiple lines.
   *
   * This property only affects stacks with wrapping content. For single-line stacks, use `alignItems` instead.
   *
   * @default 'normal'
   */
  alignContent: AlignContentKeyword;
  /**
   * The spacing between children in the stack. You can provide a single [`SpacingKeyword`](/docs/api/polaris/using-web-components#scale) value to apply the same spacing to both axes (for example, `'large-100'`), or a pair of values (for example, `'large-100 large-500'`) to set different spacing for the block and inline axes. This property also accepts [responsive values](/docs/api/polaris/using-web-components#responsive-values) using container query syntax.
   *
   * @default 'none'
   */
  gap: ResponsiveStackProps['gap'];
  /**
   * The spacing between children in the block axis (vertical in horizontal writing modes). This property overrides the row spacing set by the `gap` property. You can provide a single [`SpacingKeyword`](/docs/api/polaris/using-web-components#scale) value (for example, `'large-100'`), or a [responsive value](/docs/api/polaris/using-web-components#responsive-values) using container query syntax.
   *
   * @default '' - meaning no override
   */
  rowGap: ResponsiveStackProps['rowGap'];
  /**
   * The spacing between children in the inline axis (horizontal in left-to-right languages). This property overrides the column spacing set by the `gap` property. You can provide a single [`SpacingKeyword`](/docs/api/polaris/using-web-components#scale) value (for example, `'large-100'`), or a [responsive value](/docs/api/polaris/using-web-components#responsive-values) using container query syntax.
   *
   * @default '' - meaning no override
   */
  columnGap: ResponsiveStackProps['columnGap'];
  /**
   * The direction in which the stack's children are laid out. Use `'inline'` to arrange children horizontally (with wrapping enabled), or `'block'` to arrange them vertically (without wrapping). This property also accepts [responsive values](/docs/api/polaris/using-web-components#responsive-values) using container query syntax.
   *
   * @default 'block'
   *
   * @implementation The content will wrap if the direction is `'inline'`, and won't wrap if the direction is `'block'`.
   */
  direction: ResponsiveStackProps['direction'];
}

/**
 * A string containing CSS styles for a custom element.
 * @publicDocs
 */
export type Styles = string;
/**
 * The configuration for rendering a custom element with Preact.
 * @publicDocs
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
 * @publicDocs
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
 * @publicDocs
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
   * The ARIA role that defines the semantic meaning of the stack for assistive technologies.
   */
  accessor accessibilityRole: BoxProps['accessibilityRole'];
  /**
   * The background color of the stack using the design system's color scale. Choose from `transparent`, `subdued`, `base`, or `strong`.
   */
  accessor background: BoxProps['background'];
  /**
   * The height of the stack in horizontal writing modes, or width in vertical writing modes.
   * Use this for flow-relative sizing that adapts to text direction.
   */
  accessor blockSize: BoxProps['blockSize'];
  /**
   * The minimum height of the stack in horizontal writing modes, or minimum width in vertical writing modes.
   * Prevents the stack from shrinking below this size.
   */
  accessor minBlockSize: BoxProps['minBlockSize'];
  /**
   * The maximum height of the stack in horizontal writing modes, or maximum width in vertical writing modes.
   * Prevents the stack from growing beyond this size.
   */
  accessor maxBlockSize: BoxProps['maxBlockSize'];
  /**
   * The width of the stack in horizontal writing modes, or height in vertical writing modes.
   * Use this for flow-relative sizing that adapts to text direction.
   */
  accessor inlineSize: BoxProps['inlineSize'];
  /**
   * The minimum width of the stack in horizontal writing modes, or minimum height in vertical writing modes.
   * Prevents the stack from shrinking below this size.
   */
  accessor minInlineSize: BoxProps['minInlineSize'];
  /**
   * The maximum width of the stack in horizontal writing modes, or maximum height in vertical writing modes.
   * Prevents the stack from growing beyond this size.
   */
  accessor maxInlineSize: BoxProps['maxInlineSize'];
  /**
   * Controls how content that exceeds the stack's boundaries is displayed. Use `hidden` to clip overflow or `visible` to allow content to extend beyond boundaries.
   */
  accessor overflow: BoxProps['overflow'];
  /**
   * The spacing applied inside the stack on all sides, creating distance between the stack's edges and its content.
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
   * Controls the thickness of the border on all sides. When set, this overrides the width value specified in the `border` property.
   */
  accessor borderWidth: BoxProps['borderWidth'];
  /**
   * Controls the visual style of the border on all sides (solid, dashed, auto, or none). When set, this overrides the style value specified in the `border` property.
   */
  accessor borderStyle: BoxProps['borderStyle'];
  /**
   * Controls the color of the border using the design system's color scale. When set, this overrides the color value specified in the `border` property.
   */
  accessor borderColor: BoxProps['borderColor'];
  /**
   * Controls the roundedness of the element's corners using the design system's radius scale.
   */
  accessor borderRadius: BoxProps['borderRadius'];
  /**
   * A text description of the stack for screen readers, used when the visual context isn't sufficient for understanding.
   */
  accessor accessibilityLabel: BoxProps['accessibilityLabel'];
  /**
   * Controls the visibility of the stack for both visual and assistive technology users. Use `hidden` to hide from screen readers or `exclusive` to hide visually but announce to screen readers.
   */
  accessor accessibilityVisibility: BoxProps['accessibilityVisibility'];
  /**
   * Controls how the stack is displayed in the layout, such as block, inline, or none.
   */
  accessor display: BoxProps['display'];
}

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
 * A stack is a layout component that arranges its children in a single direction with controlled spacing and alignment.
 */
declare class Stack extends BoxElement implements StackProps {
  constructor();
  /**
   * The direction in which the stack's children are arranged.
   */
  accessor direction: StackProps['direction'];
  /**
   * Controls the distribution of children along the inline axis (horizontally in horizontal writing modes).
   */
  accessor justifyContent: StackProps['justifyContent'];
  /**
   * Controls the alignment of children along the block axis (vertically in horizontal writing modes).
   */
  accessor alignItems: StackProps['alignItems'];
  /**
   * Controls the distribution of lines along the block axis when content wraps into multiple lines.
   */
  accessor alignContent: StackProps['alignContent'];
  /**
   * The spacing between the stack's children.
   */
  accessor gap: StackProps['gap'];
  /**
   * The spacing between rows in the stack.
   */
  accessor rowGap: StackProps['rowGap'];
  /**
   * The spacing between columns in the stack.
   */
  accessor columnGap: StackProps['columnGap'];
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Stack;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: StackJSXProps & PreactBaseElementPropsWithChildren<Stack>;
    }
  }
}

declare const tagName = 's-stack';
/**
 * The properties for the stack component when it's used in JSX.
 * @publicDocs
 */
export interface StackJSXProps
  extends Partial<StackProps>,
    Pick<StackProps$1, 'id' | 'children'> {
  /**
   * The child elements to render inside the stack.
   */
  children?: ComponentChildren;
}

export {Stack};
export type {StackJSXProps};
