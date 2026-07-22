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
import type {SpinnerProps,Key, Ref} from './components-shared.d.ts';

/** @publicDocs */
export type ComponentChildren = any;
/**
 * Used when an element does not have children.
 * @publicDocs
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: Key;
    ref?: Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: ComponentChildren;
}
/** @publicDocs */
export type IntrinsicElementProps<T> = T & BaseElementPropsWithChildren<T & HTMLElement>;
/** @publicDocs */
export type HtmlElementTagNameProps<T> = T & HTMLElement;

declare const tagName = "s-spinner";
/** @publicDocs */
export interface SpinnerJSXProps extends Pick<SpinnerProps, 'id' | 'accessibilityLabel'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: HtmlElementTagNameProps<SpinnerJSXProps>;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: IntrinsicElementProps<SpinnerJSXProps>;
        }
    }
}

export { tagName };
export type { SpinnerJSXProps };
