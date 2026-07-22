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
import type {FormProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-form";
/** @publicDocs */
export interface FormElementProps extends Pick<FormProps$1, 'disabled' | 'id'> {
}
/** @publicDocs */
export interface FormEvents extends Pick<FormProps$1, 'onSubmit'> {
    /**
     * A callback fired when the form is submitted.
     */
    onSubmit?: () => void;
}
/** @publicDocs */
export interface FormElementEvents {
    /**
     * A callback fired when the form is submitted.
     */
    submit?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface FormElement extends FormElementProps, Omit<HTMLElement, 'id' | 'onsubmit'> {
    onsubmit: FormEvents['onSubmit'];
}
/** @publicDocs */
export interface FormProps extends FormElementProps, FormEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: FormElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: FormProps & BaseElementPropsWithChildren<FormElement>;
        }
    }
}

export type { FormElement, FormElementEvents, FormElementProps, FormEvents, FormProps };
