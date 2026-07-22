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
import type {ConsentCheckboxProps$1,CheckboxProps$1} from './components-shared.d.ts';

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

declare const tagName$1 = "s-checkbox";
/** @publicDocs */
export interface CheckboxElementProps extends Pick<CheckboxProps$1, 'accessibilityLabel' | 'checked' | 'command' | 'commandFor' | 'defaultChecked' | 'disabled' | 'error' | 'id' | 'label' | 'name' | 'required' | 'value'> {
    command?: Extract<CheckboxProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
}
/** @publicDocs */
export interface CheckboxEvents extends Pick<CheckboxProps$1, 'onChange'> {
}
/** @publicDocs */
export interface CheckboxElement extends CheckboxElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: CheckboxEvents['onChange'];
}
/** @publicDocs */
export interface CheckboxProps extends CheckboxElementProps, CheckboxEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$1]: CheckboxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$1]: CheckboxProps & BaseElementProps<CheckboxElement>;
        }
    }
}

declare const tagName = "s-consent-checkbox";
/** @publicDocs */
export interface ConsentCheckboxElementProps extends Pick<ConsentCheckboxProps$1, 'accessibilityLabel' | 'checked' | 'command' | 'commandFor' | 'defaultChecked' | 'disabled' | 'error' | 'id' | 'label' | 'name' | 'policy' | 'value'> {
    command?: Extract<ConsentCheckboxProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
    /**
     * The policy for which buyer consent is being collected. Used by the [consent checkbox](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/consent-checkbox) and [consent phone field](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/consent-phone-field) components to identify the type of marketing permission requested.
     *
     * - `sms-marketing`: Represents the policy for SMS marketing consent.
     */
    policy?: ConsentCheckboxProps$1['policy'];
}
/** @publicDocs */
export interface ConsentCheckboxEvents extends Pick<CheckboxEvents, 'onChange'> {
}
/** @publicDocs */
export interface ConsentCheckboxElementEvents {
    /**
     * A callback fired when the consent checkbox value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface ConsentCheckboxElement extends ConsentCheckboxElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: ConsentCheckboxEvents['onChange'];
}
/** @publicDocs */
export interface ConsentCheckboxProps extends ConsentCheckboxElementProps, ConsentCheckboxEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ConsentCheckboxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ConsentCheckboxProps & BaseElementProps<ConsentCheckboxElement>;
        }
    }
}

export type { ConsentCheckboxElement, ConsentCheckboxElementEvents, ConsentCheckboxElementProps, ConsentCheckboxEvents, ConsentCheckboxProps };
