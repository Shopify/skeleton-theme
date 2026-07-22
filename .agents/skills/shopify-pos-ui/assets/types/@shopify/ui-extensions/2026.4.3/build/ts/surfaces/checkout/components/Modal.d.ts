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
import type {ModalProps$1} from './components-shared.d.ts';

/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. Used by the rendering engine for efficient reconciliation when lists change.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns this element to a named slot in a parent component that uses slot-based composition patterns.
     */
    slot?: Lowercase<string>;
}
/**
 * The base properties for elements that have children, extending `BaseElementProps` with children support.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    /**
     * The child elements to render within this component.
     */
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

declare const tagName = "s-modal";
/** @publicDocs */
export interface ModalElementProps extends Pick<ModalProps$1, 'accessibilityLabel' | 'heading' | 'id' | 'padding' | 'size'> {
    /**
     * The size of the modal.
     *
     * - `'base'`: The default size, suitable for most use cases.
     * - `'small'`: A compact modal for simple confirmations or short messages.
     * - `'small-100'`: The smallest modal size.
     * - `'large'`: A large modal for complex content or forms.
     * - `'large-100'`: The largest fixed-size modal, providing maximum room for content.
     * - `'max'`: Expands the modal to its maximum size as defined by the host application, on both the horizontal and vertical axes.
     *
     * @default 'base'
     */
    size?: Extract<ModalProps$1['size'], 'small-100' | 'small' | 'base' | 'large-100' | 'large' | 'max'>;
}
/** @publicDocs */
export interface ModalElementSlots {
    /**
     * The main action button displayed in the modal footer, representing the primary action users should take. Only accepts a single button component.
     */
    'primary-action'?: HTMLElement;
    /**
     * Additional action buttons displayed in the modal footer, providing alternative or supporting actions.
     */
    'secondary-actions'?: HTMLElement;
}
/**
 * The event callbacks for monitoring modal visibility changes.
 */
export interface ModalEvents extends Pick<ModalProps$1, 'onAfterHide' | 'onAfterShow' | 'onHide' | 'onShow'> {
}

/** @publicDocs */
export interface ModalElementMethods extends Pick<ModalProps$1, 'hideOverlay'> {
}
/** @publicDocs */
export interface ModalElementEvents {
    /**
     * A callback fired when the modal is hidden, after any hide animations have completed.
     */
    afterhide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the modal is shown, after any show animations have completed.
     */
    aftershow?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired immediately after the modal is hidden.
     */
    hide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired immediately after the modal is shown.
     */
    show?: CallbackEventListener<typeof tagName>;
}
/**
 * The HTML element interface for the `s-modal` custom element.
 */
export interface ModalElement extends ModalElementProps, ModalElementMethods, Omit<HTMLElement, 'id'> {
    onafterhide: ModalEvents['onAfterHide'];
    onaftershow: ModalEvents['onAfterShow'];
    onhide: ModalEvents['onHide'];
    onshow: ModalEvents['onShow'];
}
/**
 * The properties for the modal component when it's used in JSX.
 */
export interface ModalProps extends ModalElementProps, ModalEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ModalElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ModalProps & BaseElementPropsWithChildren<ModalElement>;
        }
    }
}

export type { ModalElement, ModalElementEvents, ModalElementProps, ModalElementSlots, ModalProps };
