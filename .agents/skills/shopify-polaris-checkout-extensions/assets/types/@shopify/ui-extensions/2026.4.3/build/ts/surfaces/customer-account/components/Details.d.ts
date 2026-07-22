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
import type {DetailsProps$1} from './components-shared.d.ts';

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
export type ToggleState = 'open' | 'closed';
export interface ToggleArgumentsEvent {
    oldState?: ToggleState;
    newState?: ToggleState;
}

declare const tagName = "s-details";
/** @publicDocs */
export interface DetailsElementProps extends Pick<DetailsProps$1, 'defaultOpen' | 'id' | 'open' | 'toggleTransition'> {
}
export interface DetailsEvents extends Pick<DetailsProps$1, 'onToggle' | 'onAfterToggle'> {
}
/** @publicDocs */
export interface DetailsElementEvents {
    /**
     * A callback fired immediately when the element state changes, before any animations.
     *
     * - If the element is transitioning from hidden to showing, the `oldState` property will be set to `closed` and the
     *   `newState` property will be set to `open`.
     * - If the element is transitioning from showing to hidden, then the `oldState` property will be set to `open` and the
     *   `newState` will be `closed`.
     *
     * Learn more about the [`toggle` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/toggle_event), and the [`newState`](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) and [`oldState`](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState) properties.
     */
    toggle?: CallbackEventListener<typeof tagName, ToggleArgumentsEvent>;
    /**
     * A callback fired when the element state changes, after any toggle animations have finished.
     *
     * - If the element transitioned from hidden to showing, the `oldState` property will be set to `closed` and the
     *   `newState` property will be set to `open`.
     * - If the element transitioned from showing to hidden, the `oldState` property will be set to `open` and the
     *   `newState` will be `closed`.
     *
     * Learn more about the [`newState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) and [`oldState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
     */
    aftertoggle?: CallbackEventListener<typeof tagName, ToggleArgumentsEvent>;
}
export interface DetailsElement extends Omit<HTMLElement, 'ontoggle' | 'id'> {
    ontoggle: DetailsEvents['onToggle'];
    onaftertoggle: DetailsEvents['onAfterToggle'];
}
export interface DetailsProps extends DetailsElementProps, DetailsEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: DetailsElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: DetailsProps & BaseElementPropsWithChildren<DetailsElement>;
        }
    }
}

export type { DetailsElement, DetailsElementEvents, DetailsElementProps, DetailsEvents, DetailsProps };
