/** VERSION: 1.38.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  PageProps$1,
  ComponentChildren,
  PreactCustomElement,
  RenderImpl,
} from './shared.d.ts';

/**
 * @publicDocs
 */
export interface PageProps
  extends Required<Pick<PageProps$1, 'inlineSize' | 'heading'>> {
  inlineSize: Extract<PageProps$1['inlineSize'], 'base' | 'large' | 'small'>;
}

/** Used when an element does not have children. */
export interface PreactBaseElementProps<TClass extends HTMLElement> {
  /** Assigns a unique key to this element. */
  key?: preact.Key;
  /** Assigns a ref (generally from `useRef()`) to this element. */
  ref?: preact.Ref<TClass>;
  /** Assigns this element to a parent's slot. */
  slot?: Lowercase<string>;
}
/** Used when an element has children. */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  children?: preact.ComponentChildren;
}

declare class PolarisCustomElement extends PreactCustomElement {
  constructor(renderImpl: Omit<RenderImpl, 'globalShadowCSS'>);
}

declare abstract class PageBase
  extends PolarisCustomElement
  implements PageProps
{
  accessor inlineSize: PageProps['inlineSize'];
  accessor heading: PageProps['heading'];
  constructor(renderImpl: RenderImpl);
  /** @private */
  connectedCallback(): void;
  /** @private */
  disconnectedCallback(): void;
}

declare class Page extends PageBase implements PageProps {
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Page;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<
        PageJSXProps,
        'aside' | 'primaryAction' | 'secondaryActions' | 'breadcrumbActions'
      > &
        PreactBaseElementPropsWithChildren<Page>;
    }
  }
}

declare const tagName = 's-page';
/**
 * @publicDocs
 */
export interface PageJSXProps
  extends Partial<PageProps>,
    Pick<PageProps$1, 'id' | 'children'> {
  /**
   * The content of the Page.
   */
  children?: ComponentChildren;
  /**
   * The content to display in the aside section of the page.
   *
   * This slot is only rendered when `inlineSize` is "base".
   */
  aside?: ComponentChildren;
  /**
   * The primary action for the page.
   *
   * Only accepts a single `Button` component with a `variant` of `primary`.
   *
   */
  primaryAction?: ComponentChildren;
  /**
   * Secondary actions for the page.
   *
   * Only accepts `ButtonGroup` and `Button` components with a `variant` of `secondary` or `auto`.
   */
  secondaryActions?: ComponentChildren;
  /**
   * Navigations back actions for the page.
   *
   * Only accepts `Link` components.
   */
  breadcrumbActions?: ComponentChildren;
}

export {Page};
/**
 * @publicDocs
 */
export type {PageJSXProps};
