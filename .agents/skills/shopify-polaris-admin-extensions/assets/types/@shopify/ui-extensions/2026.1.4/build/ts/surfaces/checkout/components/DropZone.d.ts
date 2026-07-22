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
import type {DropZoneProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * An event type that narrows the `currentTarget` to the specific HTML element associated with the custom element tag. This provides type-safe event handling in callback listeners.
 * @publicDocs
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * A typed event listener for custom element events. The listener receives a `CallbackEvent` with the correct `currentTarget` type for the associated custom element tag.
 * @publicDocs
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName = "s-drop-zone";
/** @publicDocs */
export interface DropZoneElementProps extends Pick<DropZoneProps$1, 'accept' | 'accessibilityLabel' | 'disabled' | 'error' | 'id' | 'label' | 'multiple' | 'name' | 'required' | 'value'> {
}
/** @publicDocs */
export interface DropZoneEvents extends Pick<DropZoneProps$1, 'onDropRejected' | 'onInput' | 'onChange'> {
}
/** @publicDocs */
export interface DropZoneElementEvents {
    /**
     * A callback fired when files are rejected based on the `accept` prop.
     */
    droprejected?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the drop zone.
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the drop zone value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface DropZoneElement extends DropZoneElementProps, Omit<HTMLElement, 'id' | 'oninput' | 'onchange'> {
    ondroprejected: DropZoneEvents['onDropRejected'];
    oninput: DropZoneEvents['onInput'];
    onchange: DropZoneEvents['onChange'];
}
/** @publicDocs */
export interface DropZoneProps extends DropZoneElementProps, DropZoneEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: DropZoneElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: DropZoneProps & BaseElementProps<DropZoneElement>;
        }
    }
}

export type { DropZoneElement, DropZoneElementEvents, DropZoneElementProps, DropZoneEvents, DropZoneProps };
