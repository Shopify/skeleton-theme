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
import type {
  SizeUnitsOrAuto,
  SizeUnitsOrNone,
  SizeUnits,
  SizeKeyword,
  MaybeAllValuesShorthandProperty,
  MaybeTwoValuesShorthandProperty,
  Key,
  Ref,
} from './components-shared.d.ts';

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

declare const tagName = 's-box';
/**
 * Defines the available padding size options using a semantic scale. Provides consistent spacing values that align with the POS design system.
 */
export type PaddingKeyword = SizeKeyword | 'none';
export interface BoxJSXProps {
  /**
   * A unique identifier for the element used for targeting with CSS, JavaScript, or accessibility features.
   */
  id?: string;
  /**
   * The block size of the container. Auto automatically sizes based on the container's children.
   *
   * @default 'auto'
   */
  blockSize?: SizeUnitsOrAuto;
  /**
   * The inline size of the container. Auto automatically sizes based on the container's children.
   *
   * @default 'auto'
   */
  inlineSize?: SizeUnitsOrAuto;
  /**
   * The maximum block size constraint for the container.
   *
   * @default 'none'
   */
  maxBlockSize?: SizeUnitsOrNone;
  /**
   * The maximum inline size constraint for the container.
   *
   * @default 'none'
   */
  maxInlineSize?: SizeUnitsOrNone;
  /**
   * The minimum block size constraint for the container.
   *
   * @default '0'
   */
  minBlockSize?: SizeUnits;
  /**
   * The minimum inline size constraint for the container.
   *
   * @default '0'
   */
  minInlineSize?: SizeUnits;
  /**
   * The padding applied to all edges of the container. Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Shorthand_properties#edges_of_a_box) using flow-relative values in the order:
   *
   * - 4 values: `block-start inline-end block-end inline-start`
   * - 3 values: `block-start inline block-end`
   * - 2 values: `block inline`
   *
   * For example:
   *
   * - `large` means block-start, inline-end, block-end and inline-start paddings are `large`.
   * - `large none` means block-start and block-end paddings are `large`, inline-start and inline-end paddings are `none`.
   * - `large none large` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `none`.
   * - `large none large small` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `small`.
   *
   * An `auto` value inherits the default padding from the closest container that has removed its usual padding.
   *
   * @default 'none'
   */
  padding?: MaybeAllValuesShorthandProperty<PaddingKeyword>;
  /**
   * The block-axis padding for the container. Overrides the block value of the `padding` property.
   *
   * @default '' - meaning no override
   */
  paddingBlock?: MaybeTwoValuesShorthandProperty<PaddingKeyword> | '';
  /**
   * The block-start padding for the container. Overrides the block-start value of the `paddingBlock` property.
   *
   * @default '' - meaning no override
   */
  paddingBlockStart?: PaddingKeyword | '';
  /**
   * The block-end padding for the container. Overrides the block-end value of the `paddingBlock` property.
   *
   * @default '' - meaning no override
   */
  paddingBlockEnd?: PaddingKeyword | '';
  /**
   * The inline-axis padding for the container. Supports two-value syntax where `large none` sets inline-start to `large` and inline-end to `none`. Overrides the inline value of the `padding` property.
   *
   * @default '' - meaning no override
   */
  paddingInline?: MaybeTwoValuesShorthandProperty<PaddingKeyword> | '';
  /**
   * The inline-start padding for the container. Overrides the inline-start value of the `paddingInline` property.
   *
   * @default '' - meaning no override
   */
  paddingInlineStart?: PaddingKeyword | '';
  /**
   * The inline-end padding for the container. Overrides the inline-end value of the `paddingInline` property.
   *
   * @default '' - meaning no override
   */
  paddingInlineEnd?: PaddingKeyword | '';
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: BoxJSXProps;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<BoxJSXProps>;
    }
  }
}

export {tagName};
export type {BoxJSXProps};
