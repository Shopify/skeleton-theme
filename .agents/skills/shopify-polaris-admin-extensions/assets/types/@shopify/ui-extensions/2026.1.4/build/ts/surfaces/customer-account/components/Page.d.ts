import {BaseElementPropsWithChildren, IdProps} from './shared';
/**
 * @publicDocs
 */
export interface PageProps extends IdProps {
  /**
   * The main heading displayed at the top of the page.
   */
  heading?: string;

  /**
   * A secondary heading displayed below the main heading for additional context.
   */
  subheading?: string;
}

/**
 * @publicDocs
 */
export interface PageElementSlots {
  /**
   * A navigation link that lets the customer return to the previous page. Accepts a single [button](/docs/api/{API_NAME}/{API_VERSION}/web-components/actions/button) component. Learn more about [breadcrumb actions](#breadcrumb-actions).
   */
  'breadcrumb-actions'?: HTMLElement;
  /**
   * The main call-to-action for the page. Accepts a single [button](/docs/api/{API_NAME}/{API_VERSION}/web-components/actions/button) component. Learn more about [primary actions](#primary-actions).
   */
  'primary-action'?: HTMLElement;
  /**
   * Additional actions for the page. Accepts one or more [button](/docs/api/{API_NAME}/{API_VERSION}/web-components/actions/button) components. Learn more about [secondary actions](#secondary-actions).
   */
  'secondary-actions'?: HTMLElement;
}

/**
 * @publicDocs
 */
export interface PageElement extends HTMLElement, PageProps {}

declare global {
  interface HTMLElementTagNameMap {
    ['s-page']: PageElement;
  }
}

declare module 'preact' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace createElement.JSX {
    interface IntrinsicElements {
      ['s-page']: BaseElementPropsWithChildren<PageElement> & PageProps;
    }
  }
}
