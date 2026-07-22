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
import type {PasswordFieldProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-password-field";
/** @publicDocs */
export interface PasswordFieldElementProps extends Pick<PasswordFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'maxLength' | 'minLength' | 'name' | 'readOnly' | 'required' | 'value'> {
}
export interface PasswordFieldEvents extends Pick<PasswordFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
/** @publicDocs */
export interface PasswordFieldElementEvents {
    /**
     * A callback fired when the password field loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the password field value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the password field receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the password field.
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface PasswordFieldElementSlots {
    /**
     * Additional interactive content displayed within the field. Accepts button and clickable components with text content only. Other component types or complex layouts are not supported.
     */
    accessory?: HTMLElement;
}
export interface PasswordFieldElement extends PasswordFieldProps, Omit<HTMLElement, 'id' | 'inputMode' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: PasswordFieldEvents['onBlur'];
    onchange: PasswordFieldEvents['onChange'];
    onfocus: PasswordFieldEvents['onFocus'];
    oninput: PasswordFieldEvents['onInput'];
}
export interface PasswordFieldProps extends PasswordFieldElementProps, PasswordFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: PasswordFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: PasswordFieldProps & BaseElementPropsWithChildren<PasswordFieldElement>;
        }
    }
}

export type { PasswordFieldElement, PasswordFieldElementEvents, PasswordFieldElementProps, PasswordFieldElementSlots, PasswordFieldEvents, PasswordFieldProps };
