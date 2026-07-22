/** VERSION: 0.0.0 **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {QRCodeProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. Used by the rendering engine for efficient reconciliation when lists change.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns this element to a named slot in a parent component that uses slot-based composition patterns.
     */
    slot?: Lowercase<string>;
}
/**
 * A callback event typed to a specific HTML element, with a strongly typed `currentTarget`.
 * @publicDocs
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * An event listener typed to a specific HTML element, with a strongly typed `currentTarget`.
 * @publicDocs
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName = "s-qr-code";
/** @publicDocs */
export interface QRCodeElementProps extends QRCodeProps$1 {
}
/** @publicDocs */
export interface QRCodeEvents extends Pick<QRCodeProps$1, 'onError'> {
}
/** @publicDocs */
export interface QRCodeElementEvents {
    /**
     * A callback that's fired when the conversion of `content` to a QR code fails.
     */
    error?: CallbackEventListener<typeof tagName>;
}
/**
 * The HTML element interface for the `s-qr-code` custom element.
 * @publicDocs
 */
export interface QRCodelement extends QRCodeElementProps, Omit<HTMLElement, 'id' | 'onerror'> {
    onerror: QRCodeEvents['onError'];
}
/** @publicDocs */
export interface QRCodeProps extends QRCodeElementProps, QRCodeEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: QRCodelement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: QRCodeProps & BaseElementProps<QRCodelement>;
        }
    }
}

export type { QRCodeElementEvents, QRCodeElementProps, QRCodeEvents, QRCodeProps, QRCodelement };
