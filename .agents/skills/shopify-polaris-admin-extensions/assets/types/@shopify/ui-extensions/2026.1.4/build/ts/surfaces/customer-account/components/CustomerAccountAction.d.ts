import {BaseElementPropsWithChildren, IdProps} from './shared';
/**
 * @publicDocs
 */
export interface CustomerAccountActionProps extends IdProps {
  /**
   * The main title displayed at the top of the action modal, rendered in the header alongside the close button. Use a short, descriptive phrase that tells the customer what the action does, such as "Request a return" or "Edit shipping address."
   */
  heading: string;
}

/**
 * @publicDocs
 */
export interface CustomerAccountActionElementSlots {
  /**
   * The primary action for the modal. Accepts a single [button](/docs/api/customer-account-ui-extensions/{API_VERSION}/web-components/actions/button) element. Use this for the main confirmation action, such as "Submit" or "Confirm."
   */
  'primary-action'?: HTMLElement;
  /**
   * The secondary actions for the modal. Accepts multiple [button](/docs/api/customer-account-ui-extensions/{API_VERSION}/web-components/actions/button) elements. Use this for dismissive actions like "Cancel" or alternative actions.
   */
  'secondary-actions'?: HTMLElement;
}

/**
 * @publicDocs
 */
export interface CustomerAccountActionElement
  extends HTMLElement,
    CustomerAccountActionProps {}

declare global {
  interface HTMLElementTagNameMap {
    ['s-customer-account-action']: CustomerAccountActionElement;
  }
}

declare module 'preact' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace createElement.JSX {
    interface IntrinsicElements {
      ['s-customer-account-action']: BaseElementPropsWithChildren<CustomerAccountActionElement> &
        CustomerAccountActionProps;
    }
  }
}
