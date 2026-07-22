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
import type {EmailFieldProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-email-field";
/** @publicDocs */
export interface EmailFieldElementProps extends Pick<EmailFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'maxLength' | 'minLength' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'name' | 'readOnly' | 'required' | 'value'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
/** @publicDocs */
export interface EmailFieldEvents extends Pick<EmailFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
/** @publicDocs */
export interface EmailFieldElementEvents {
    /**
<<<<<<< HEAD
     * A callback fired when the element loses focus. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * Callback when the user has **finished editing** a field, for example, once they have blurred the field.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the element receives focus. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
=======
     * A callback fired when the email field value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the email field.
>>>>>>> 8763c703b (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the email field loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the email field receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface EmailFieldElementSlots {
    /**
     * Additional interactive content displayed within the field.
     *
     * Accepts button and clickable components with text content only. Other component types or complex layouts are not supported.
     */
    accessory?: HTMLElement;
}
/** @publicDocs */
export interface EmailFieldElement extends EmailFieldElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: EmailFieldEvents['onBlur'];
    onchange: EmailFieldEvents['onChange'];
    onfocus: EmailFieldEvents['onFocus'];
    oninput: EmailFieldEvents['onInput'];
}
/** @publicDocs */
export interface EmailFieldProps extends EmailFieldElementProps, EmailFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: EmailFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: EmailFieldProps & BaseElementPropsWithChildren<EmailFieldElement>;
        }
    }
}

export type { EmailFieldElement, EmailFieldElementEvents, EmailFieldElementProps, EmailFieldElementSlots, EmailFieldEvents, EmailFieldProps };
