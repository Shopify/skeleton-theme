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
import type {ClipboardItemProps$1} from './components-shared.d.ts';

/**
 * Used when an element does not have children.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * An event type that narrows the `currentTarget` to the specific HTML element associated with the custom element tag. This provides type-safe event handling in callback listeners.
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * A typed event listener for custom element events. The listener receives a `CallbackEvent` with the correct `currentTarget` type for the associated custom element tag.
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName = "s-clipboard-item";
/** @publicDocs */
export interface ClipboardItemElementProps extends Pick<ClipboardItemProps$1, 'id' | 'text'> {
}
export interface ClipboardItemEvents extends Pick<ClipboardItemProps$1, 'onCopy' | 'onCopyError'> {
}
/** @publicDocs */
export interface ClipboardItemElementEvents {
    /**
     * A callback fired when the text is successfully copied to the clipboard. Use this to show a confirmation message or update the UI.
     */
    copy?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the copy to clipboard fails. Use this to display an error message or provide a fallback action.
     */
    copyerror?: CallbackEventListener<typeof tagName>;
}
export interface ClipboardItemElement extends ClipboardItemElementProps, Omit<HTMLElement, 'id' | 'oncopy'> {
    oncopy: ClipboardItemEvents['onCopy'];
    oncopyerror: ClipboardItemEvents['onCopyError'];
}
export interface ClipboardItemProps extends ClipboardItemElementProps, ClipboardItemEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ClipboardItemElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ClipboardItemProps & BaseElementProps<ClipboardItemElement>;
        }
    }
}

export type { ClipboardItemElement, ClipboardItemElementEvents, ClipboardItemElementProps, ClipboardItemEvents, ClipboardItemProps };
