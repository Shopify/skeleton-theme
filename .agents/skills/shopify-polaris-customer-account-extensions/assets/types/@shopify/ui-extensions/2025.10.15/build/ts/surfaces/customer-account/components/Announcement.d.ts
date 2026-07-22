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
import type {AnnouncementProps$1} from './components-shared.d.ts';

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
/**
 * The visibility state of a toggleable element.
 *
 * - `open`: The element is visible and showing its content.
 * - `closed`: The element is hidden and its content is not visible.
 */
export type ToggleState = 'open' | 'closed';
/**
 * The event data provided to toggle-related callbacks. Contains the previous and next visibility states of the element.
 */
export interface ToggleArgumentsEvent {
    /**
     * The visibility state of the element before the toggle occurred.
     */
    oldState?: ToggleState;
    /**
     * The visibility state of the element after the toggle occurred.
     */
    newState?: ToggleState;
}

declare const tagName = "s-announcement";
/** @publicDocs */
export interface AnnouncementEvents extends Pick<AnnouncementProps$1, 'onAfterToggle' | 'onDismiss' | 'onToggle'> {
}
/** @publicDocs */
export interface AnnouncementElementEvents {
    /**
     * A callback that fires when the element state changes, after any toggle animations have finished.
     *
     * - If the element transitioned from hidden to showing, the `oldState` property will be set to `closed` and the
     *   `newState` property will be set to `open`.
     * - If the element transitioned from showing to hidden, the `oldState` property will be set to `open` and the
     *   `newState` will be `closed`.
     *
     * Learn more about [`newState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) and [`oldState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
     */
    aftertoggle?: CallbackEventListener<typeof tagName, ToggleArgumentsEvent>;
    /**
     * A callback that fires when the announcement is dismissed by the user clicking the close button or by calling the `dismiss()` method programmatically.
     */
    dismiss?: CallbackEventListener<typeof tagName>;
    /**
     * A callback that fires immediately when the element state changes, before any animations.
     *
     * - If the element is transitioning from hidden to showing, the `oldState` property will be set to `closed` and the
     *   `newState` property will be set to `open`.
     * - If the element is transitioning from showing to hidden, then the `oldState` property will be set to `open` and the
     *   `newState` will be `closed`.
     *
     * Learn more about the [`toggle` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/toggle_event), [`newState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState), and [`oldState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
     */
    toggle?: CallbackEventListener<typeof tagName, ToggleArgumentsEvent>;
}
/** @publicDocs */
export interface AnnouncementElement extends AnnouncementMethods, Omit<HTMLElement, 'id' | 'ontoggle'> {
    onaftertoggle?: AnnouncementEvents['onAfterToggle'];
    ondismiss?: AnnouncementEvents['onDismiss'];
    ontoggle?: AnnouncementEvents['onToggle'];
}
/** @publicDocs */
export interface AnnouncementProps extends AnnouncementEvents {
}
/** @publicDocs */
export interface AnnouncementMethods {
    /**
     * Programmatically dismisses the announcement. This triggers the `dismiss` event callback.
     */
    dismiss: () => void;
}
/** @publicDocs */
export interface AnnouncementElementMethods {
    /**
     * Programmatically dismisses the announcement. This triggers the `dismiss` event callback.
     */
    dismiss: AnnouncementMethods['dismiss'];
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: AnnouncementElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: AnnouncementProps & BaseElementPropsWithChildren<AnnouncementElement>;
        }
    }
}

export type { AnnouncementElement, AnnouncementElementEvents, AnnouncementElementMethods, AnnouncementEvents, AnnouncementMethods, AnnouncementProps };
