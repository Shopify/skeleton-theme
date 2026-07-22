import type {
  ShopifyGlobal,
  AugmentedElement,
  AppBridgeElements,
  AppBridgeAttributes,
  UIModalElement as BaseUIModalElement,
  SAppWindowElement as BaseSAppWindowElement,
  UINavMenuElement as BaseUINavMenuElement,
  SAppNavElement as BaseSAppNavElement,
  UITitleBarElement as BaseUITitleBarElement,
  UISaveBarElement as BaseUISaveBarElement,
  UIModalAttributes,
  SAppWindowAttributes,
  UINavMenuAttributes,
  SAppNavAttributes,
  UITitleBarAttributes,
  UISaveBarAttributes,
  ToastOptions,
  Product,
  ProductVariant,
  Collection,
} from './shopify';
import {type InternalPolarisApi} from './types';

export {
  ShopifyGlobal,
  UIModalAttributes,
  SAppWindowAttributes,
  UINavMenuAttributes,
  SAppNavAttributes,
  UITitleBarAttributes,
  UISaveBarAttributes,
  ToastOptions,
  Product,
  ProductVariant,
  Collection,
};

declare global {
  var shopify: ShopifyGlobal;
  var polaris: InternalPolarisApi['global'] | undefined;

  // Install property augmentations onto DOM prototypes
  interface HTMLButtonElement extends AugmentedElement<'button'> {}
  interface HTMLAnchorElement extends AugmentedElement<'a'> {}

  interface UIModalElement extends BaseUIModalElement {}
  interface SAppWindowElement extends BaseSAppWindowElement {}
  interface UINavMenuElement extends BaseUINavMenuElement {}
  interface SAppNavElement extends BaseSAppNavElement {}
  interface UITitleBarElement extends BaseUITitleBarElement {}
  interface UISaveBarElement extends BaseUISaveBarElement {}

  // Install property augmentations onto ReactElement prop definitions
  namespace React {
    interface ButtonHTMLAttributes<T> extends AugmentedElement<'button'> {}
    interface AnchorHTMLAttributes<T> extends AugmentedElement<'a'> {}
  }

  // Install Element/attribute augmentations into JSX definitions
  namespace JSX {
    interface IntrinsicElements extends AppBridgeElements {}
    interface IntrinsicAttributes extends AppBridgeAttributes {}
  }
}
