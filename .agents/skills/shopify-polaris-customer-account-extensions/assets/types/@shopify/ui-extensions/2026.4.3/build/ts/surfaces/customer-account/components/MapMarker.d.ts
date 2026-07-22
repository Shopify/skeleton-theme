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
import type {MapMarkerProps$1} from './components-shared.d.ts';

/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * The base properties for elements that have children, extending `BaseElementProps` with children support.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}
/**
 * A callback event typed to a specific HTML element, with a strongly typed `currentTarget`.
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * An event listener typed to a specific HTML element, with a strongly typed `currentTarget`.
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName = "s-map-marker";
/** @publicDocs */
export interface MapMarkerElementProps extends Pick<MapMarkerProps$1, 'accessibilityLabel' | 'blockSize' | 'command' | 'commandFor' | 'clusterable' | 'inlineSize' | 'latitude' | 'longitude'> {
    /**
     * Sets the action the `commandFor` target should take when this component is activated. Learn more about the [`command` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
     *
     * - `--auto`: a default action for the target component.
     * - `--show`: shows the target component.
     * - `--hide`: hides the target component.
     * - `--toggle`: toggles the target component.
     *
     * @default '--auto'
     */
    command?: Extract<MapMarkerProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
    /**
     * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
     */
    commandFor?: MapMarkerProps$1['commandFor'];
}
/**
 * The event handlers for the map marker component.
 */
export interface MapMarkerEvents extends Pick<MapMarkerProps$1, 'onClick'> {
}
/** @publicDocs */
export interface MapMarkerElementEvents {
    /**
     * A callback fired when the user clicks on the marker. This event does not propagate to the parent map — only the marker receives the click.
     */
    click?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface MapMarkerElementSlots {
    /**
     * A custom graphic element to use as the marker. If not provided, the map provider’s default marker pin is displayed.
     */
    graphic?: HTMLElement;
}
/**
 * The HTML element interface for the `s-map-marker` custom element.
 */
export interface MapMarkerElement extends MapMarkerElementProps, Omit<HTMLElement, 'id' | 'onclick'> {
    onclick: MapMarkerEvents['onClick'];
}
/**
 * The properties for the map marker component when it's used in JSX.
 */
export interface MapMarkerProps extends MapMarkerElementProps, MapMarkerEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: MapMarkerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: MapMarkerProps & BaseElementPropsWithChildren<MapMarkerElement>;
        }
    }
}

export type { MapMarkerElement, MapMarkerElementEvents, MapMarkerElementProps, MapMarkerElementSlots, MapMarkerEvents, MapMarkerProps };
