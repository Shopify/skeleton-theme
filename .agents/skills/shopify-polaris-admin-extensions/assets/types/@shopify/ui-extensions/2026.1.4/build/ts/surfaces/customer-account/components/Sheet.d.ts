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
import type {SheetProps$1} from './components-shared.d.ts';

/** @publicDocs */
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
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    /**
     * The child elements to render within this component.
     */
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

declare const tagName = "s-sheet";
/** @publicDocs */
export interface SheetElementProps extends Pick<SheetProps$1, 'defaultOpen' | 'heading' | 'id'> {
    /**
     * A label that describes the purpose of the sheet, announced by assistive technologies. When set, screen readers will use this label instead of the `heading` to describe the sheet.
     */
    accessibilityLabel?: string;
}
/** @publicDocs */
export interface SheetEvents extends Pick<SheetProps$1, 'onAfterHide' | 'onAfterShow' | 'onHide' | 'onShow'> {
}
/** @publicDocs */
export interface SheetElementEvents {
    /**
     * A callback fired when the sheet is hidden, after any hide animations have completed.
     */
    afterhide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the sheet is shown, after any show animations have completed.
     */
    aftershow?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired immediately after the sheet is hidden.
     */
    hide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired immediately after the sheet is shown.
     */
    show?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface SheetElementSlots {
    /**
     * The main action button displayed in the sheet footer, representing the primary action users should take. Only accepts a single button component.
     */
    'primary-action'?: HTMLElement;
    /**
     * Additional action buttons displayed in the sheet footer, providing alternative or supporting actions.
     */
    'secondary-actions'?: HTMLElement;
}
/** @publicDocs */
export interface SheetElementMethods extends Pick<SheetProps$1, 'hideOverlay'> {
}
/**
 * The HTML element interface for the `s-sheet` custom element.
 * @publicDocs
 */
export interface SheetElement extends SheetElementProps, SheetElementMethods, Omit<HTMLElement, 'id'> {
    afterhide: SheetEvents['onAfterHide'];
    aftershow: SheetEvents['onAfterShow'];
    onhide: SheetEvents['onHide'];
    onshow: SheetEvents['onShow'];
    onafterhide: SheetEvents['onAfterHide'];
    onaftershow: SheetEvents['onAfterShow'];
}
/** @publicDocs */
export interface SheetProps extends SheetElementProps, SheetEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: SheetElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: SheetProps & BaseElementPropsWithChildren<SheetElement>;
        }
    }
}

export type { SheetElement, SheetElementEvents, SheetElementProps, SheetElementSlots, SheetEvents, SheetProps };
