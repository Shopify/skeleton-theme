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
import type {PhoneFieldProps$1, ConsentPhoneFieldProps$1} from './components-shared.d.ts';

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

declare const tagName$1 = "s-phone-field";
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
        [tagName$1]: PhoneFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$1]: PhoneFieldProps & BaseElementPropsWithChildren<PhoneFieldElement>;
        }
    }
}

declare const tagName = "s-consent-phone-field";
/** @publicDocs */
export interface ConsentPhoneFieldElementProps extends Pick<ConsentPhoneFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'name' | 'policy' | 'readOnly' | 'required' | 'type' | 'value'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
    /**
     * The policy for which buyer consent is being collected. Used by the [consent checkbox](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/consent-checkbox) and [consent phone field](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/consent-phone-field) components to identify the type of marketing permission requested.
     *
     * - `sms-marketing`: Represents the policy for SMS marketing consent.
     */
    policy?: ConsentPhoneFieldProps$1['policy'];
}
/** @publicDocs */
export interface ConsentPhoneFieldEvents extends Pick<PhoneFieldEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
/** @publicDocs */
export interface ConsentPhoneFieldElementEvents {
    /**
     * A callback fired when the consent phone field loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the consent phone field value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the consent phone field receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the consent phone field.
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface ConsentPhoneFieldElement extends ConsentPhoneFieldElementProps, Omit<ConsentPhoneFieldEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
    onblur: ConsentPhoneFieldEvents['onBlur'];
    onchange: ConsentPhoneFieldEvents['onChange'];
    onfocus: ConsentPhoneFieldEvents['onFocus'];
    oninput: ConsentPhoneFieldEvents['onInput'];
}
/** @publicDocs */
export interface ConsentPhoneFieldElementSlots {
    /**
     * Additional interactive content displayed within the field. Accepts button and clickable components with text content only. Other component types or complex layouts are not supported.
     */
    accessory?: HTMLElement;
}
/** @publicDocs */
export interface ConsentPhoneFieldProps extends ConsentPhoneFieldElementProps, ConsentPhoneFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ConsentPhoneFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ConsentPhoneFieldProps & BaseElementPropsWithChildren<ConsentPhoneFieldElement>;
        }
    }
}

export type { ConsentPhoneFieldElement, ConsentPhoneFieldElementEvents, ConsentPhoneFieldElementProps, ConsentPhoneFieldElementSlots, ConsentPhoneFieldEvents, ConsentPhoneFieldProps };
