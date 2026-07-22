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
import type {SelectProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-select";
/** @publicDocs */
export interface SelectElementProps extends Pick<SelectProps$1, 'autocomplete' | 'disabled' | 'error' | 'id' | 'label' | 'name' | 'placeholder' | 'required' | 'value'> {
}
export interface SelectEvents extends Pick<SelectProps$1, 'onBlur' | 'onChange' | 'onFocus'> {
}
/** @publicDocs */
export interface SelectElementEvents {
    /**
     * A callback fired when the select loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the select value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the select receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
}
export interface SelectElement extends SelectElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus'> {
    onblur: SelectEvents['onBlur'];
    onchange: SelectEvents['onChange'];
    onfocus: SelectEvents['onFocus'];
}
export interface SelectProps extends SelectElementProps, SelectEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: SelectElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: SelectProps & BaseElementPropsWithChildren<SelectElement>;
        }
    }
}

export type { SelectElement, SelectElementEvents, SelectElementProps, SelectEvents, SelectProps };
