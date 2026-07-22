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
import type {CheckboxProps$1} from './components-shared.d.ts';

/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. This is used by the rendering engine for efficient reconciliation when lists change.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns the element to a named slot in a parent component that uses slot-based composition patterns.
     */
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

declare const tagName = "s-checkbox";
/** @publicDocs */
export interface CheckboxElementProps extends Pick<CheckboxProps$1, 'accessibilityLabel' | 'checked' | 'command' | 'commandFor' | 'defaultChecked' | 'disabled' | 'error' | 'id' | 'name' | 'required' | 'value'> {
    command?: Extract<CheckboxProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
    /**
     * The visual content to use as the control label. Use a string to provide a simple text label displayed to the user.
     *
     * If a `label` slot is also provided, the slot content takes precedence. [Learn more about slots](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/checkbox#slots-propertydetail-label).
     */
    label?: string;
}
export interface CheckboxEvents extends Pick<CheckboxProps$1, 'onChange'> {
}
/** @publicDocs */
export interface CheckboxElementEvents {
    /**
     * A callback fired when the checkbox value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
}
export interface CheckboxElement extends CheckboxElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: CheckboxEvents['onChange'];
}
/** @publicDocs */
export interface CheckboxElementSlots {
    /**
     * The visual content to use as the control label.
     *
     * Use an `HTMLElement` as a rich control label composed of elements. Only an `s-text` element is supported with plain text and `s-link` as its only allowed children. Any other elements are stripped while preserving their text content.
     */
    label?: HTMLElement;
}
/** @publicDocs */
export interface CheckboxProps extends CheckboxElementProps, CheckboxEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: CheckboxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: CheckboxProps & BaseElementProps<CheckboxElement>;
        }
    }
}

export type { CheckboxElement, CheckboxElementEvents, CheckboxElementProps, CheckboxElementSlots, CheckboxEvents, CheckboxProps };
