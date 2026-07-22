/** VERSION: 1.38.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  ChipProps$1,
  PreactCustomElement,
  RenderImpl,
} from './shared.d.ts';

export interface ChipProps
  extends Required<Pick<ChipProps$1, 'color' | 'accessibilityLabel'>> {}

declare class PolarisCustomElement extends PreactCustomElement {
  constructor(renderImpl: Omit<RenderImpl, 'globalShadowCSS'>);
}

/** Used when an element does not have children. * @publicDocs
 */
export interface PreactBaseElementProps<TClass extends HTMLElement> {
  /** Assigns a unique key to this element. */
  key?: preact.Key;
  /** Assigns a ref (generally from `useRef()`) to this element. */
  ref?: preact.Ref<TClass>;
  /** Assigns this element to a parent's slot. */
  slot?: Lowercase<string>;
}
/** Used when an element has children. * @publicDocs
 */
export interface PreactBaseElementPropsWithChildren<TClass extends HTMLElement>
  extends PreactBaseElementProps<TClass> {
  children?: preact.ComponentChildren;
}

declare class Chip extends PolarisCustomElement implements ChipProps {
  accessor color: ChipProps['color'];
  accessor accessibilityLabel: ChipProps['accessibilityLabel'];
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: Chip;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: Omit<ChipJSXProps, 'graphic'> &
        PreactBaseElementPropsWithChildren<Chip>;
    }
  }
}

declare const tagName = 's-chip';
export interface ChipJSXProps
  extends Partial<ChipProps>,
    Pick<ChipProps$1, 'id' | 'children'> {
  /**
   * The content of the chip.
   */
  children?: ComponentChildren;
  /**
   * An optional icon to display at the start of the chip. Accepts only Icon components.
   */
  graphic?: ComponentChildren;
}

export {Chip};
export type {ChipJSXProps};
