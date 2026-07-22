import {BaseElementPropsWithChildren, IdProps} from './shared';

export interface ButtonGroupProps extends IdProps {
  /**
   * A label that describes the purpose of the button group for users of assistive technologies such as screen readers. Use this to provide context about the grouped actions, such as "Order actions" or "Profile settings."
   */
  accessibilityLabel?: string;
}

export interface ButtonGroupElementSlots {
  /**
   * The primary action for the group. Accepts a single [button](/docs/api/customer-account-ui-extensions/{API_VERSION}/web-components/actions/button) element. Use this for the most important action in the group, such as "Save" or "Submit."
   */
  'primary-action'?: HTMLElement;
  /**
   * The secondary actions for the group. Accepts multiple [button](/docs/api/customer-account-ui-extensions/{API_VERSION}/web-components/actions/button) elements. Use this for supplementary actions like "Cancel", "Delete", or other alternatives.
   */
  'secondary-actions'?: HTMLElement;
}

export interface ButtonGroupElement
  extends ButtonGroupProps,
    Omit<HTMLElement, 'id'> {}

declare global {
  interface HTMLElementTagNameMap {
    ['s-button-group']: ButtonGroupElement;
  }
}

declare module 'preact' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace createElement.JSX {
    interface IntrinsicElements {
      ['s-button-group']: BaseElementPropsWithChildren<ButtonGroupElement> &
        ButtonGroupProps;
    }
  }
}
