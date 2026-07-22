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
import type {ClickableChipProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-clickable-chip";
/** @publicDocs */
export interface ClickableChipElementProps extends Pick<ClickableChipProps$1, 'accessibilityLabel' | 'disabled' | 'hidden' | 'href' | 'id' | 'removable'> {
}
export interface ClickableChipEvents extends Pick<ClickableChipProps$1, 'onAfterHide' | 'onClick' | 'onRemove'> {
}
/** @publicDocs */
export interface ClickableChipElementEvents {
    /**
     * A callback fired after the chip is hidden. The `hidden` property will be `true` when this event fires.
     */
    afterhide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the chip is clicked.
     *
     * Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
     */
    click?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the chip is removed.
     */
    remove?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface ClickableChipElementSlots {
    /**
     * An optional graphic displayed at the start of the chip, such as an icon to visually reinforce the chip's label. Only the `s-icon` element and its `type` attribute are supported.
     */
    graphic?: HTMLElement;
}
export interface ClickableChipElement extends ClickableChipElementProps, Omit<HTMLElement, 'id' | 'hidden' | 'onclick'> {
    onafterhide: ClickableChipEvents['onAfterHide'];
    onclick: ClickableChipEvents['onClick'];
    onremove: ClickableChipEvents['onRemove'];
}
export interface ClickableChipProps extends ClickableChipElementProps, ClickableChipEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ClickableChipElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ClickableChipProps & BaseElementPropsWithChildren<ClickableChipElement>;
        }
    }
}

export type { ClickableChipElement, ClickableChipElementEvents, ClickableChipElementProps, ClickableChipElementSlots, ClickableChipEvents, ClickableChipProps };
