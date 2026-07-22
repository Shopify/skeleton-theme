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
import type {PhoneFieldProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-phone-field";
/** @publicDocs */
export interface PhoneFieldElementProps extends Pick<PhoneFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'name' | 'readOnly' | 'required' | 'value' | 'type'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
/** @publicDocs */
export interface PhoneFieldEvents extends Pick<PhoneFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
/** @publicDocs */
export interface PhoneFieldElementEvents {
    /**
<<<<<<< HEAD
     * A callback fired when the element loses focus. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
=======
     * A callback fired when the phone field loses focus.
>>>>>>> eb0f07393 (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
<<<<<<< HEAD
     * Callback when the user has **finished editing** a field, for example, once they have blurred the field.
=======
     * A callback fired when the phone field value changes.
>>>>>>> eb0f07393 (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
<<<<<<< HEAD
     * A callback fired when the element receives focus. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
=======
     * A callback fired when the phone field receives focus.
>>>>>>> eb0f07393 (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the phone field.
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface PhoneFieldElementSlots {
    /**
     * Additional interactive content displayed within the field. Accepts button and clickable components with text content only. Other component types or complex layouts are not supported.
     */
    accessory?: HTMLElement;
}
/** @publicDocs */
export interface PhoneFieldElement extends PhoneFieldElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: PhoneFieldEvents['onBlur'];
    onchange: PhoneFieldEvents['onChange'];
    onfocus: PhoneFieldEvents['onFocus'];
    oninput: PhoneFieldEvents['onInput'];
}
/** @publicDocs */
export interface PhoneFieldProps extends PhoneFieldElementProps, PhoneFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: PhoneFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: PhoneFieldProps & BaseElementPropsWithChildren<PhoneFieldElement>;
        }
    }
}

export type { PhoneFieldElement, PhoneFieldElementEvents, PhoneFieldElementProps, PhoneFieldElementSlots, PhoneFieldEvents, PhoneFieldProps };
