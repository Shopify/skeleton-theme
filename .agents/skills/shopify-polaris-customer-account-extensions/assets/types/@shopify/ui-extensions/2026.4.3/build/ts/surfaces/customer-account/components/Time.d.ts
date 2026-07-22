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
import type {TimeProps$1} from './components-shared.d.ts';

/**
 * Used when an element does not have children.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}

declare const tagName = "s-time";
/** @publicDocs */
export interface TimeElementProps extends Pick<TimeProps$1, 'dateTime' | 'id'> {
}
export interface TimeElement extends TimeElementProps, Omit<HTMLElement, 'id'> {
}
export interface TimeProps extends TimeElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: TimeElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: TimeProps & BaseElementPropsWithChildren<TimeElement>;
        }
    }
}

export type { TimeElement, TimeElementProps, TimeProps };
