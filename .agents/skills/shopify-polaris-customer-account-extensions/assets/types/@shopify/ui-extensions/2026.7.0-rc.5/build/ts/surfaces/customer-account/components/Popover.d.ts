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
import type {PopoverProps$1,SizeUnitsOrAuto, SizeUnitsOrNone, SizeUnits} from './components-shared.d.ts';

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

declare const tagName = "s-popover";
/** @publicDocs */
export interface PopoverElementProps extends Pick<PopoverProps$1, 'id'> {
    /**
     * The block size of the popover (height in horizontal writing modes). Learn more about the [block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size).
     *
     * @default 'auto'
     */
    blockSize?: SizeUnitsOrAuto;
    /**
     * The inline size of the popover (width in horizontal writing modes). Learn more about the [inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size).
     *
     * @default 'auto'
     */
    inlineSize?: SizeUnitsOrAuto;
    /**
     * The maximum block size of the popover. Constrains the popover's height to prevent it from exceeding this value. Learn more about the [max-block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size).
     *
     * @default 'none'
     */
    maxBlockSize?: SizeUnitsOrNone;
    /**
     * The maximum inline size of the popover. Constrains the popover's width to prevent it from exceeding this value. Learn more about the [max-inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size).
     *
     * @default 'none'
     */
    maxInlineSize?: SizeUnitsOrNone;
    /**
     * The minimum block size of the popover. Ensures the popover maintains at least this height. Learn more about the [min-block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size).
     *
     * @default '0'
     */
    minBlockSize?: SizeUnits;
    /**
     * The minimum inline size of the popover. Ensures the popover maintains at least this width. Learn more about the [min-inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size).
     *
     * @default '0'
     */
    minInlineSize?: SizeUnits;
}
/**
 * The event callbacks for monitoring popover visibility changes.
 */
export interface PopoverEvents extends Pick<PopoverProps$1, 'onHide' | 'onShow'> {
}
/** @publicDocs */
export interface PopoverElementEvents {
    /**
     * A callback fired immediately after the popover is hidden.
     */
    hide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired immediately after the popover is shown.
     */
    show?: CallbackEventListener<typeof tagName>;
}
/**
 * The HTML element interface for the `s-popover` custom element.
 */
export interface PopoverElement extends Omit<PopoverProps, 'onHide' | 'onShow'>, Omit<HTMLElement, 'id'> {
    onhide: PopoverProps['onHide'];
    onshow: PopoverProps['onShow'];
}
/**
 * The properties for the popover component when it's used in JSX.
 */
export interface PopoverProps extends PopoverElementProps, PopoverEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: PopoverElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: PopoverProps & BaseElementPropsWithChildren<PopoverElement>;
        }
    }
}

export type { PopoverElement, PopoverElementEvents, PopoverElementProps, PopoverEvents, PopoverProps };
