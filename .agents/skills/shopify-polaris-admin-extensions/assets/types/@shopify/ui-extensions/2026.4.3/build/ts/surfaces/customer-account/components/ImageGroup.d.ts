import {BaseElementPropsWithChildren, IdProps} from './shared';

/**
 * The properties for the image group component. An image group displays a collection of images in a grid layout with an optional overflow count, useful for showing multiple product images or gallery previews.
 */
export interface ImageGroupProps extends IdProps {
  /**
   * The total number of items that the image group represents. When this value exceeds the number of visible images, the component displays a badge showing the remaining count (for example, "+3"), indicating there are more images than currently displayed.
   */
  totalItems?: number;
}

/**
 * The HTML element interface for the `s-image-group` custom element.
 */
export interface ImageGroupElement extends HTMLElement, ImageGroupProps {}

declare global {
  interface HTMLElementTagNameMap {
    ['s-image-group']: ImageGroupElement;
  }
}

declare module 'preact' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace createElement.JSX {
    interface IntrinsicElements {
      ['s-image-group']: BaseElementPropsWithChildren<ImageGroupElement> &
        ImageGroupProps;
    }
  }
}
