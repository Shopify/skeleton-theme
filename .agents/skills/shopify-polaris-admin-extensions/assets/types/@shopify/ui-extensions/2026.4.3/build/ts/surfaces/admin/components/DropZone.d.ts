/** VERSION: 1.38.0 **/
/* eslint-disable import/extensions */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {
  ComponentChildren,
  DropZoneProps$1,
  PreactCustomElement,
  RenderImpl,
} from './shared.d.ts';

export type CallbackEvent<T extends keyof HTMLElementTagNameMap> = Event & {
  currentTarget: HTMLElementTagNameMap[T];
};
export type CallbackEventListener<T extends keyof HTMLElementTagNameMap> =
  | (EventListener & {
      (event: CallbackEvent<T>): void;
    })
  | null;
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
/**  * @publicDocs
 */
export interface DropZoneProps
  extends Required<
    Pick<
      DropZoneProps$1,
      | 'accept'
      | 'accessibilityLabel'
      | 'disabled'
      | 'files'
      | 'name'
      | 'error'
      | 'label'
      | 'labelAccessibilityVisibility'
      | 'multiple'
      | 'required'
      | 'value'
    >
  > {}

declare class PolarisCustomElement extends PreactCustomElement {
  constructor(renderImpl: Omit<RenderImpl, 'globalShadowCSS'>);
}
/**  * @publicDocs
 */
export type ReplaceType<TType, TFrom, TTo> = Exclude<TType, TFrom> | TTo;

declare const setFiles: unique symbol;

declare const internals: unique symbol;
declare const getFileInput: unique symbol;
declare abstract class DropZoneBase extends PolarisCustomElement {
  static formAssociated: boolean;
  accessor accept: DropZoneProps['accept'];
  accessor accessibilityLabel: DropZoneProps['accessibilityLabel'];
  accessor disabled: DropZoneProps['disabled'];
  accessor error: DropZoneProps['error'];
  accessor label: DropZoneProps['label'];
  accessor labelAccessibilityVisibility: DropZoneProps['labelAccessibilityVisibility'];
  accessor multiple: DropZoneProps['multiple'];
  accessor name: DropZoneProps['name'];
  accessor required: DropZoneProps['required'];
  accessor onchange: CallbackEventListener<typeof tagName>;
  accessor oninput: CallbackEventListener<typeof tagName>;
  accessor ondroprejected: CallbackEventListener<typeof tagName>;
  get value(): string;
  /** This sets the input value for a file type, which cannot be set programatically, so it can only be reset. */
  set value(value: '' | null);
  get files(): File[];
  set files(files: File[]);
  /** @private */
  [setFiles](files: File[]): void;
  /** @private */
  [getFileInput](): ReplaceType<
    Element | null | undefined,
    Element,
    HTMLInputElement
  >;

  /** @private */
  formResetCallback(): void;
  /** @private */
  [internals]: ElementInternals;
  constructor(renderImpl: RenderImpl);
}

declare class DropZone extends DropZoneBase implements DropZoneProps {
  constructor();
}
declare global {
  interface HTMLElementTagNameMap {
    [tagName]: DropZone;
  }
}
declare module 'preact' {
  namespace createElement.JSX {
    interface IntrinsicElements {
      [tagName]: DropZoneJSXProps &
        PreactBaseElementPropsWithChildren<DropZone>;
    }
  }
}

declare const tagName = 's-drop-zone';
export interface DropZoneJSXProps
  extends Partial<DropZoneProps>,
    Pick<DropZoneProps$1, 'id'> {
  /**
   * Content to include inside the DropZone container
   */
  children?: ComponentChildren;
  onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
  onDropRejected?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}

export {DropZone};
export type {DropZoneJSXProps};
