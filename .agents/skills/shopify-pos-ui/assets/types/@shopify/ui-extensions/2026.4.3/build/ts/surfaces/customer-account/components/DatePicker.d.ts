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
import type {DatePickerProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-date-picker";
/** @publicDocs */
export interface DatePickerElementProps extends Pick<DatePickerProps$1, 'allow' | 'allowDays' | 'defaultValue' | 'defaultView' | 'disabled' | 'disallow' | 'disallowDays' | 'id' | 'name' | 'type' | 'value' | 'view'> {
}
export interface DatePickerEvents extends Pick<DatePickerProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput' | 'onViewChange'> {
}
/** @publicDocs */
export interface DatePickerElementEvents {
    /**
     * A callback fired when the date picker loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the date picker value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the date picker receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the date picker.
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the calendar view changes, such as when navigating between months.
     */
    viewChange?: CallbackEventListener<typeof tagName>;
}
export interface DatePickerElement extends DatePickerElementProps, Omit<DatePickerEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput' | 'onViewChange'>, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput'> {
    onblur: DatePickerEvents['onBlur'];
    onchange: DatePickerEvents['onChange'];
    onfocus: DatePickerEvents['onFocus'];
    oninput: DatePickerEvents['onInput'];
    onviewchange: DatePickerEvents['onViewChange'];
}
export interface DatePickerProps extends DatePickerElementProps, DatePickerEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: DatePickerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: DatePickerProps & BaseElementProps<DatePickerElement>;
        }
    }
}

export type { DatePickerElement, DatePickerElementEvents, DatePickerElementProps, DatePickerEvents, DatePickerProps };
