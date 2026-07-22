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
import type {LinkProps,Key, Ref} from './components-shared.d.ts';

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

declare const tagName = "s-link";
export interface LinkJSXProps extends Pick<LinkProps, 'id' | 'commandFor' | 'command' | 'accessibilityLabel'> {
    /**
     * Called when the link is activated.
     */
    onClick?: (event: CallbackEvent<typeof tagName>) => void;
    /**
     * The link content.
     */
    children?: ComponentChildren;
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: HtmlElementTagNameProps<LinkJSXProps>;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: IntrinsicElementProps<LinkJSXProps>;
        }
    }
}

export { tagName };
export type { LinkJSXProps };
