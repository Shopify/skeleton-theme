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
import type {PressButtonProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
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

declare const tagName = "s-press-button";
/** @publicDocs */
export interface PressButtonElementProps extends Pick<PressButtonProps$1, 'accessibilityLabel' | 'id' | 'inlineSize' | 'lang' | 'disabled' | 'loading' | 'pressed' | 'defaultPressed'> {
}
/** @publicDocs */
export interface PressButtonEvents extends Pick<PressButtonProps$1, 'onClick' | 'onBlur' | 'onFocus'> {
}
/** @publicDocs */
export interface PressButtonElementEvents {
    /**
     * A callback fired when the button is clicked.
     *
     * Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
     */
    click?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the button loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the button receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface PressButtonElement extends PressButtonElementProps, Omit<HTMLElement, 'children' | 'lang' | 'id' | 'onblur' | 'onclick' | 'onfocus'> {
    onblur: PressButtonEvents['onBlur'];
    onclick: PressButtonEvents['onClick'];
    onfocus: PressButtonEvents['onFocus'];
}
/** @publicDocs */
export interface PressButtonProps extends PressButtonElementProps, PressButtonEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: PressButtonElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: PressButtonProps & BaseElementPropsWithChildren<PressButtonElement>;
        }
    }
}

export type { PressButtonElement, PressButtonElementEvents, PressButtonElementProps, PressButtonEvents, PressButtonProps };
