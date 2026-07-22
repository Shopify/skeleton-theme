/** VERSION: 1.25.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  BoxProps$1,
  ImageProps$1,
  MaybeAllValuesShorthandProperty,
  SizeUnitsOrAuto,
  SizeUnits,
  SizeUnitsOrNone,
  ComponentChildren,
} from './shared.d.ts';

/**
 * A callback event that's typed to a specific HTML element. This type provides access to the element that triggered the event.
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
 * Makes a type value responsive by allowing container query strings.
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
 * The box properties with all fields marked as required.
 * @publicDocs
 */
export type RequiredBoxProps = Required<BoxProps$1>;
/**
 * The available border radius values for Box components.
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
 * The available border style values for Box components.
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
   * The background color of the image container.
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
   * The padding applied to all edges of the image container.
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
   * The vertical size of the image in standard layouts (height in left-to-right or right-to-left writing modes).
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
   * The [minimum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size) (minimum height in horizontal writing modes) of the image.
   *
   * @default '0'
   */
  minBlockSize: SizeUnits;
  /**
   * The [maximum block size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size) (maximum height in horizontal writing modes) of the image.
   *
   * @default 'none'
   */
  maxBlockSize: SizeUnitsOrNone;
  /**
   * The [inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) (width in horizontal writing modes) of the image.
   *
   * @default 'auto'
   */
  inlineSize: SizeUnitsOrAuto;
  /**
   * The [minimum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) (minimum width in horizontal writing modes) of the image.
   *
   * @default '0'
   */
  minInlineSize: SizeUnits;
  /**
   * The [maximum inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size) (maximum width in horizontal writing modes) of the image.
   *
   * @default 'none'
   */
  maxInlineSize: SizeUnitsOrNone;
}

/**
 * The properties for the image component. An image displays pictures with configurable sizing, loading behavior, and borders. Properties include `src` for the image URL, `alt` for accessibility text, `aspectRatio` for sizing, `loading` for lazy loading, and border styling options.
 * @publicDocs
 */
export interface ImageProps
  extends Required<
      Pick<
        ImageProps$1,
        | 'alt'
        | 'loading'
        | 'src'
        | 'accessibilityRole'
        | 'inlineSize'
        | 'srcSet'
        | 'sizes'
        | 'aspectRatio'
        | 'objectFit'
      >
    >,
    Required<
      Pick<
        BoxProps,
        | 'border'
        | 'borderColor'
        | 'borderRadius'
        | 'borderStyle'
        | 'borderWidth'
      >
    > {
  /**
   * The URL of the image to display. You can provide an absolute or relative URL pointing to the image file.
   */
  src: ImageProps$1['src'];
  /**
   * A set of source images with different sizes for responsive loading. Use this to provide multiple image sizes for different screen resolutions (for example, `'image-320w.jpg 320w, image-640w.jpg 640w'`).
   */
  srcSet: ImageProps$1['srcSet'];
  /**
   * The sizes of the image at different viewport widths. Use this with `srcSet` to tell the browser which image to load (for example, `'(max-width: 320px) 280px, 640px'`).
   */
  sizes: ImageProps$1['sizes'];
  /**
   * Alternative text that describes the image for screen readers. This text should convey the meaning or content of the image to users who can't see it.
   */
  alt: ImageProps$1['alt'];
  /**
   * The aspect ratio of the image as a width-to-height ratio (for example, `'16/9'` or `'1'`). This helps prevent layout shifts while the image loads.
   */
  aspectRatio: ImageProps$1['aspectRatio'];
  /**
   * How the image should be resized to fit its container. Choose `'cover'` to fill the container while maintaining aspect ratio (cropping if needed), or `'contain'` to fit the entire image within the container.
   */
  objectFit: ImageProps$1['objectFit'];
  /**
   * When the image should be loaded. Use `'lazy'` to defer loading until the image is near the viewport, or `'eager'` to load immediately.
   */
  loading: ImageProps$1['loading'];
  /**
   * The accessibility role for the image. Set this to provide semantic meaning for screen readers.
   */
  accessibilityRole: ImageProps$1['accessibilityRole'];
  /**
   * The inline size (width in horizontal writing modes) of the image. You can use size units like `'100px'` or `'50%'`.
   */
  inlineSize: ImageProps$1['inlineSize'];
  /**
   * Whether to show a border around the image. Set to `true` to display a border, or `false` to hide it.
   */
  border: BoxProps['border'];
  /**
   * The width of the border around the image. You can use a single value to apply the same width to all sides, or use the 1-to-4-value syntax to control individual sides.
   */
  borderWidth: BoxProps['borderWidth'];
  /**
   * The style of the border around the image. You can use a single value to apply the same style to all sides, or use the 1-to-4-value syntax to control individual sides.
   */
  borderStyle: BoxProps['borderStyle'];
  /**
   * The color of the border around the image. Choose from `'subdued'`, `'base'`, or `'strong'` to control the visual emphasis.
   */
  borderColor: BoxProps['borderColor'];
  /**
   * The radius of the border corners around the image. You can use a single value to apply the same radius to all corners, or use the 1-to-4-value syntax to control individual corners.
   */
  borderRadius: BoxProps['borderRadius'];
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
   * Queues a run of the render function.
   * You shouldn't need to call this manually - it should be handled by changes to `@property` values.
   * @private
   */
  queueRender(): void;
  /**
   * Like the standard `element.click()`, but you can influence the behavior with a `sourceEvent`.
   *
   * For example, if the `sourceEvent` was a middle click, or has particular keys held down,
   * components will attempt to produce the desired behavior on links, such as opening the page in a background tab.
   * @private
   * @param options
   */
  click({sourceEvent}?: ClickOptions): void;
}

/**
 * An image displays pictures with configurable sizing, loading behavior, and borders.
 */
declare class Image extends PreactCustomElement implements ImageProps {
  /**
   * The URL of the image to display.
   */
  accessor src: ImageProps['src'];
  /**
   * A set of source images with different sizes for responsive loading.
   */
  accessor srcSet: ImageProps['srcSet'];
  /**
   * The sizes of the image at different viewport widths.
   */
  accessor sizes: ImageProps['sizes'];
  /**
   * Alternative text that describes the image for screen readers.
   */
  accessor alt: ImageProps['alt'];
  /**
   * The aspect ratio of the image as a width-to-height ratio.
   */
  accessor aspectRatio: ImageProps['aspectRatio'];
  /**
   * How the image should be resized to fit its container.
   */
  accessor objectFit: ImageProps['objectFit'];
  /**
   * When the image should be loaded.
   */
  accessor loading: ImageProps['loading'];
  /**
   * The accessibility role for the image.
   */
  accessor accessibilityRole: ImageProps['accessibilityRole'];
  /**
   * The inline size (width in horizontal writing modes) of the image.
   */
  accessor inlineSize: ImageProps['inlineSize'];
  /**
   * Whether to show a border around the image.
   */
  accessor border: ImageProps['border'];
  /**
   * The width of the border around the image.
   */
  accessor borderWidth: ImageProps['borderWidth'];
  /**
   * The style of the border around the image.
   */
  accessor borderStyle: ImageProps['borderStyle'];
  /**
   * The color of the border around the image.
   */
  accessor borderColor: ImageProps['borderColor'];
  /**
   * The radius of the border corners around the image.
   */
  accessor borderRadius: ImageProps['borderRadius'];
  /**
   * A callback that's fired when the image has loaded successfully.
   */
  accessor onload: CallbackEventListener<typeof tagName> | null;
  /**
   * A callback that's fired when the image fails to load.
   */
  accessor onerror: OnErrorEventHandler;
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Image;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: ImageJSXProps & PreactBaseElementProps<Image>;
    }
  }
}

declare const tagName = 's-image';
/**
 * The properties for the image component when it's used in JSX.
 * @publicDocs
 */
export interface ImageJSXProps
  extends Partial<ImageProps>,
    Pick<ImageProps$1, 'id'> {
  /**
   * A callback that's fired when the image fails to load.
   */
  onError?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  /**
   * A callback that's fired when the image has loaded successfully.
   */
  onLoad?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {Image};
export type {ImageJSXProps};
