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
import type {IconProps, Key, Ref} from './components-shared.d.ts';

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

declare const tagName = 's-icon';
/**
 * Lists all currently supported icon names available for use in the POS interface. Reference this list when selecting icons to ensure compatibility and availability.
 */
export type SupportedIconNames = Extract<
  IconProps['type'],
  | 'alert-circle'
  | 'apps'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'backspace'
  | 'barcode'
  | 'battery-low'
  | 'bolt-filled'
  | 'bullet'
  | 'camera-flip'
  | 'caret-down'
  | 'caret-up'
  | 'cart'
  | 'cart-down'
  | 'cart-filled'
  | 'cart-send'
  | 'cart-up'
  | 'chart-line'
  | 'chart-vertical'
  | 'check'
  | 'check-circle-filled'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle'
  | 'clipboard-checklist'
  | 'clock'
  | 'collection'
  | 'credit-card'
  | 'credit-card-reader'
  | 'delete'
  | 'delivery'
  | 'desktop'
  | 'disabled'
  | 'disabled-filled'
  | 'discount'
  | 'discount-add'
  | 'discount-automatic'
  | 'discount-code'
  | 'discount-remove'
  | 'drag-handle'
  | 'drawer'
  | 'duplicate'
  | 'edit'
  | 'email'
  | 'exchange'
  | 'external'
  | 'flag'
  | 'gift-card'
  | 'graduation-hat'
  | 'grid'
  | 'hide-filled'
  | 'home'
  | 'home-filled'
  | 'image'
  | 'images'
  | 'info'
  | 'inventory'
  | 'inventory-edit'
  | 'inventory-list'
  | 'inventory-transfer'
  | 'keyboard-hide'
  | 'keypad'
  | 'link'
  | 'list-bulleted'
  | 'list-bulleted-filled'
  | 'live'
  | 'live-critical'
  | 'live-none'
  | 'location'
  | 'lock'
  | 'maximize'
  | 'menu'
  | 'menu-filled'
  | 'menu-horizontal'
  | 'minimize'
  | 'minus'
  | 'mobile'
  | 'money'
  | 'money-split'
  | 'note'
  | 'order'
  | 'order-draft'
  | 'order-filled'
  | 'package'
  | 'package-cancel'
  | 'package-reassign'
  | 'payment'
  | 'person'
  | 'person-add'
  | 'person-filled'
  | 'phablet'
  | 'phone-out'
  | 'play-circle'
  | 'plus'
  | 'point-of-sale'
  | 'point-of-sale-register'
  | 'print'
  | 'product'
  | 'product-filled'
  | 'profile'
  | 'question-circle-filled'
  | 'receipt'
  | 'refresh'
  | 'return'
  | 'scan-qr-code'
  | 'search'
  | 'send'
  | 'settings'
  | 'shipping-label-cancel'
  | 'sort'
  | 'star-circle'
  | 'star-filled'
  | 'store'
  | 'tablet'
  | 'transaction-fee-add'
  | 'unlock'
  | 'variant'
  | 'view'
  | 'wallet'
  | 'x'
  | 'x-circle'
>;
export interface IconJSXProps
  extends Pick<IconProps, 'id' | 'tone' | 'color' | 'size'> {
  /**
   * The type of icon to display.
   *
   * @default ''
   */
  type?: SupportedIconNames;
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: IconJSXProps;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: IntrinsicElementProps<IconJSXProps>;
    }
  }
}

export {tagName};
export type {IconJSXProps};
