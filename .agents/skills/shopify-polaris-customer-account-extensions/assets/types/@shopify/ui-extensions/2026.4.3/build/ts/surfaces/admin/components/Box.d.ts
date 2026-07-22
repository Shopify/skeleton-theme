/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  BoxProps$1,
  MaybeAllValuesShorthandProperty,
  SizeUnitsOrAuto,
  SizeUnits,
  SizeUnitsOrNone,
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
/**
 * The properties for the box component. A box provides control over layout, spacing, sizing, borders, and background styling for its content.
 * @publicDocs
 */
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
   * The background color of the box. You can choose from `'transparent'`, `'base'`, `'subdued'`, or `'strong'` to control the visual emphasis of the background.
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
   * Controls the visual style of the border on all sides (solid, dashed, auto, or none).
   *
   * When set, this overrides the style value specified in the `border` property.
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box)for specifying different styles per side: one value applies to all sides,
   * two values apply to block and inline sides, and so on.
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
   * One value applies to all corners, two values apply to opposite corners, and so on.
   *
   * @default 'none'
   */
  borderRadius: MaybeAllValuesShorthandProperty<BoxBorderRadii>;
  /**
   * The padding on all sides of the box. The [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) is supported, using flow-relative values in the order `block-start inline-end block-end inline-start`. For example, `'large'` applies large padding to all sides, while `'large none'` applies large padding to the block axis and no padding to the inline axis. A value of `'auto'` will use the default padding from the closest container that has had its padding removed. This property also accepts responsive values using container query syntax.
   *
   * @default 'none'
   */
  padding: ResponsiveBoxProps['padding'];
  /**
   * The padding on the block axis (top and bottom in horizontal writing modes). This property overrides the block-axis value set by the `padding` property. For example, `'large none'` applies large padding to the block-start and no padding to the block-end. This property also accepts responsive values using container query syntax.
   *
   * @default '' - meaning no override
   */
  paddingBlock: ResponsiveBoxProps['paddingBlock'];
  /**
   * The padding at the start of the block axis (top in horizontal writing modes). This property overrides the block-start value set by the `paddingBlock` property. It also accepts responsive values using container query syntax.
   *
   * @default '' - meaning no override
   */
  paddingBlockStart: ResponsiveBoxProps['paddingBlockStart'];
  /**
   * The padding at the end of the block axis (bottom in horizontal writing modes). This property overrides the block-end value set by the `paddingBlock` property. It also accepts responsive values using container query syntax.
   *
   * @default '' - meaning no override
   */
  paddingBlockEnd: ResponsiveBoxProps['paddingBlockEnd'];
  /**
   * The padding on the inline axis (left and right in horizontal writing modes). This property overrides the inline-axis value set by the `padding` property. For example, `'large none'` applies large padding to the inline-start and no padding to the inline-end. This property also accepts responsive values using container query syntax.
   *
   * @default '' - meaning no override
   */
  paddingInline: ResponsiveBoxProps['paddingInline'];
  /**
   * The padding at the start of the inline axis (left in left-to-right writing modes). This property overrides the inline-start value set by the `paddingInline` property. It also accepts responsive values using container query syntax.
   *
   * @default '' - meaning no override
   */
  paddingInlineStart: ResponsiveBoxProps['paddingInlineStart'];
  /**
   * The padding at the end of the inline axis (right in left-to-right writing modes). This property overrides the inline-end value set by the `paddingInline` property. It also accepts responsive values using container query syntax.
   *
   * @default '' - meaning no override
   */
  paddingInlineEnd: ResponsiveBoxProps['paddingInlineEnd'];
  /**
   * The outer [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) type of the component, which controls how it participates in [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout). Use `'auto'` for the component's default behavior, or `'none'` to hide the component completely and remove it from the accessibility tree.
   *
   * @default 'auto'
   */
  display: ResponsiveBoxProps['display'];
  /**
   * The vertical size of the box in standard layouts (height in left-to-right or right-to-left writing modes).
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
   * The [minimum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) of the box (minimum height in horizontal writing modes).
   *
   * @default '0'
   */
  minBlockSize: SizeUnits;
  /**
   * The [maximum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size) of the box (maximum height in horizontal writing modes).
   *
   * @default 'none'
   */
  maxBlockSize: SizeUnitsOrNone;
  /**
   * The [inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) of the box (width in horizontal writing modes).
   *
   * @default 'auto'
   */
  inlineSize: SizeUnitsOrAuto;
  /**
   * The [minimum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) of the box (minimum width in horizontal writing modes).
   *
   * @default '0'
   */
  minInlineSize: SizeUnits;
  /**
   * The [maximum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size) of the box (maximum width in horizontal writing modes).
   *
   * @default 'none'
   */
  maxInlineSize: SizeUnitsOrNone;
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
 * The properties of an activation event, such as a click or keypress. These properties capture which modifier keys were pressed and which mouse button was used during the event.
 * @publicDocs
 */
export interface ActivationEventEsque {
  /**
   * Whether the shift key was pressed during the event.
   */
  shiftKey: boolean;
  /**
   * Whether the meta key (Command on Mac, Windows key on Windows) was pressed during the event.
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
 * So we give it a type of `HTMLElement` to avoid typing issues later where it's used, which will only happen in the browser.
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
   * The ARIA role that defines the semantic meaning of the box for assistive technologies.
   */
  accessor accessibilityRole: BoxProps['accessibilityRole'];
  /**
   * The background color of the box using the design system's color scale. Choose from `transparent`, `subdued`, `base`, or `strong`.
   */
  accessor background: BoxProps['background'];
  /**
   * The height of the box in horizontal writing modes, or width in vertical writing modes.
   * Use this for flow-relative sizing that adapts to text direction.
   */
  accessor blockSize: BoxProps['blockSize'];
  /**
   * The minimum height of the box in horizontal writing modes, or minimum width in vertical writing modes.
   * Prevents the box from shrinking below this size.
   */
  accessor minBlockSize: BoxProps['minBlockSize'];
  /**
   * The maximum height of the box in horizontal writing modes, or maximum width in vertical writing modes.
   * Prevents the box from growing beyond this size.
   */
  accessor maxBlockSize: BoxProps['maxBlockSize'];
  /**
   * The width of the box in horizontal writing modes, or height in vertical writing modes.
   * Use this for flow-relative sizing that adapts to text direction.
   */
  accessor inlineSize: BoxProps['inlineSize'];
  /**
   * The minimum width of the box in horizontal writing modes, or minimum height in vertical writing modes.
   * Prevents the box from shrinking below this size.
   */
  accessor minInlineSize: BoxProps['minInlineSize'];
  /**
   * The maximum width of the box in horizontal writing modes, or maximum height in vertical writing modes.
   * Prevents the box from growing beyond this size.
   */
  accessor maxInlineSize: BoxProps['maxInlineSize'];
  /**
   * Controls how content that exceeds the box's boundaries is displayed. Use `hidden` to clip overflow or `visible` to allow content to extend beyond boundaries.
   */
  accessor overflow: BoxProps['overflow'];
  /**
   * The padding on all sides of the box.
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
   * The accessibility label for screen readers.
   */
  accessor accessibilityLabel: BoxProps['accessibilityLabel'];
  /**
   * Controls the visibility of the box for both visual and assistive technology users. Use `hidden` to hide from screen readers or `exclusive` to hide visually but announce to screen readers.
   */
  accessor accessibilityVisibility: BoxProps['accessibilityVisibility'];
  /**
   * Controls how the box is displayed in the layout, such as block, inline, or none.
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
  /** The child elements to render inside this element. */
  children?: preact.ComponentChildren;
}

/**
 * A box is a container component that provides control over layout, spacing, and styling.
 */
declare class Box extends BoxElement implements BoxProps {
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Box;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: BoxJSXProps & PreactBaseElementPropsWithChildren<Box>;
    }
  }
}

declare const tagName = 's-box';
/**
 * The properties for the box component when it's used in JSX.
 * @publicDocs
 */
export interface BoxJSXProps
  extends Partial<BoxProps>,
    Pick<BoxProps$1, 'id' | 'children'> {
  /**
   * The child elements to render inside the box.
   */
  children?: ComponentChildren;
}

export {Box};
export type {BoxJSXProps};
