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
import type {MoneyFieldProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-money-field";
/** @publicDocs */
export interface MoneyFieldElementProps extends Pick<MoneyFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'max' | 'min' | 'name' | 'readOnly' | 'required' | 'step' | 'value'> {
}
/** @publicDocs */
export interface MoneyFieldEvents extends Pick<MoneyFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
/** @publicDocs */
export interface MoneyFieldElementEvents {
    /**
<<<<<<< HEAD
     * A callback fired when the element loses focus. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
=======
     * A callback fired when the money field loses focus.
>>>>>>> eb0f07393 (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
<<<<<<< HEAD
     * Callback when the user has **finished editing** a field, for example, once they have blurred the field.
=======
     * A callback fired when the money field value changes.
>>>>>>> eb0f07393 (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
<<<<<<< HEAD
     * A callback fired when the element receives focus. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
=======
     * A callback fired when the money field receives focus.
>>>>>>> eb0f07393 (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the money field.
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface MoneyFieldElement extends MoneyFieldElementProps {
    onblur: MoneyFieldEvents['onBlur'];
    onchange: MoneyFieldEvents['onChange'];
    onfocus: MoneyFieldEvents['onFocus'];
    oninput: MoneyFieldEvents['onInput'];
}
/** @publicDocs */
export interface MoneyFieldProps extends MoneyFieldElementProps, MoneyFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: MoneyFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: MoneyFieldProps & BaseElementProps<MoneyFieldElement>;
        }
    }
}

export type { MoneyFieldElement, MoneyFieldElementEvents, MoneyFieldElementProps, MoneyFieldEvents, MoneyFieldProps };
