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
import type {TextAreaProps,Key, Ref} from './components-shared.d.ts';

export type ComponentChildren = any;
/**
 * Used when an element does not have children.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: Key;
    ref?: Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: ComponentChildren;
}
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T & HTMLElement>;
export type HtmlElementTagNameProps<T> = T & HTMLElement;
export interface CallbackEvent<T extends keyof HTMLElementTagNameMap> {
    currentTarget: HTMLElementTagNameMap[T];
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail?: any;
    eventPhase: number;
    target: HTMLElementTagNameMap[T] | null;
}

declare const tagName = "s-text-area";
export interface TextAreaJSXProps extends Pick<TextAreaProps, 'id' | 'label' | 'details' | 'value' | 'placeholder' | 'disabled' | 'error' | 'required' | 'maxLength' | 'rows'> {
    /**
     * Callback when the user makes any changes in the field.
     */
    onInput?: ((event: CallbackEvent<typeof tagName>) => void) | null;
    /**
     * Callback after editing completes (typically on blur).
     */
    onChange?: ((event: CallbackEvent<typeof tagName>) => void) | null;
    /**
     * Callback when the element loses focus.
     */
    onBlur?: ((event: CallbackEvent<typeof tagName>) => void) | null;
    /**
     * Callback when the element receives focus.
     */
    onFocus?: ((event: CallbackEvent<typeof tagName>) => void) | null;
}
export type ElementProps = Omit<TextAreaJSXProps, 'accessory'>;
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: HtmlElementTagNameProps<ElementProps>;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: IntrinsicElementProps<ElementProps>;
        }
    }
}

export { tagName };
export type { TextAreaJSXProps };
