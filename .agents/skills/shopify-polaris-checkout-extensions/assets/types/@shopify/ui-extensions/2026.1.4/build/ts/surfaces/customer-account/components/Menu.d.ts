import {BaseElementPropsWithChildren, IdProps} from './shared';

export interface MenuProps extends IdProps {
  /**
   * A label that describes the purpose of the menu for users of assistive technologies such as screen readers. Use this to provide context about the available actions, such as "Order actions" or "Account settings."
   */
  accessibilityLabel?: string;
}

export interface MenuElement extends MenuProps, Omit<HTMLElement, 'id'> {}

declare global {
  interface HTMLElementTagNameMap {
    ['s-menu']: MenuElement;
  }
}

declare module 'preact' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace createElement.JSX {
    interface IntrinsicElements {
      ['s-menu']: BaseElementPropsWithChildren<MenuElement> & MenuProps;
    }
  }
}
