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
import type {PaymentIconProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-payment-icon";
/** @publicDocs */
export interface PaymentIconElementProps extends PaymentIconProps$1 {
}
/**
 * The HTML element interface for the `s-payment-icon` custom element.
 * @publicDocs
 */
export interface PaymentIconElement extends PaymentIconElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface PaymentIconProps extends PaymentIconElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: PaymentIconElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: PaymentIconProps & BaseElementProps<PaymentIconElement>;
        }
    }
}

export type { PaymentIconElement, PaymentIconElementProps, PaymentIconProps };
