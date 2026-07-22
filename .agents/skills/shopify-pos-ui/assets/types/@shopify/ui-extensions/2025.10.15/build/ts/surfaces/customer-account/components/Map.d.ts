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
import type {MapProps$1} from './components-shared.d.ts';

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
 * A callback event typed to a specific HTML element, with a strongly typed `currentTarget`.
 * @publicDocs
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * An event listener typed to a specific HTML element, with a strongly typed `currentTarget`.
 * @publicDocs
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName = "s-map";
/** @publicDocs */
export interface MapElementProps extends Pick<MapProps$1, 'accessibilityLabel' | 'apiKey' | 'blockSize' | 'id' | 'inlineSize' | 'latitude' | 'longitude' | 'maxBlockSize' | 'maxInlineSize' | 'maxZoom' | 'minBlockSize' | 'minInlineSize' | 'minZoom' | 'zoom'> {
}
/** @publicDocs */
export interface MapEvents extends Pick<MapProps$1, 'onBoundsChange' | 'onClick' | 'onDblClick' | 'onViewChange'> {
}
/**
 * A geographic coordinate pair representing a location on the map, defined by latitude and longitude values.
 * @publicDocs
 */
export interface MapLocation {
    /**
     * The latitude of the location in degrees. Valid values range from -90 (South Pole) to 90 (North Pole).
     */
    latitude?: number;
    /**
     * The longitude of the location in degrees. Valid values range from -180 (west) to 180 (east).
     */
    longitude?: number;
}
/**
 * The event data provided when a map interaction occurs at a specific geographic location, such as a click or double-click.
 * @publicDocs
 */
export interface MapLocationEvent {
    /**
     * The geographic location on the map where the interaction occurred, as a latitude/longitude coordinate pair.
     */
    location?: MapLocation;
}
/**
 * The event data provided when the visible map boundaries change, such as after a pan or zoom completes. Contains the new geographic bounds of the visible area.
 * @publicDocs
 */
export interface MapBoundsEvent {
    /**
     * The geographic boundaries of the currently visible map area, defined by its north-east and south-west corners.
     */
    bounds?: {
        /**
         * The north-east corner of the visible map area, representing the top-right of the visible region.
         */
        northEast?: MapLocation;
        /**
         * The south-west corner of the visible map area, representing the bottom-left of the visible region.
         */
        southWest?: MapLocation;
    };
}
/**
 * The event data provided when the map view changes, such as after the user pans or zooms. Contains the new center location and zoom level.
 * @publicDocs
 */
export interface MapViewChangeEvent extends MapLocationEvent {
    /**
     * The current zoom level of the map after the view change, as a number from 0 (world view) to 18 (street level).
     */
    zoom?: number;
}
/** @publicDocs */
export interface MapElementEvents {
    /**
     * A callback fired when the visible map boundaries change, such as after a pan or zoom completes.
     */
    boundschange?: CallbackEventListener<typeof tagName, MapBoundsEvent>;
    /**
     * A callback fired when the user clicks on the map. Provides the geographic location of the click.
     */
    click?: CallbackEventListener<typeof tagName, MapLocationEvent>;
    /**
     * A callback fired when the user double-clicks on the map. Provides the geographic location of the double-click.
     */
    dblclick?: CallbackEventListener<typeof tagName, MapLocationEvent>;
    /**
     * A callback fired when the map view changes, such as when the user pans or zooms. Provides the new center location and zoom level.
     */
    viewchange?: CallbackEventListener<typeof tagName, MapViewChangeEvent>;
}
/**
 * The HTML element interface for the `s-map` custom element.
 * @publicDocs
 */
export interface MapElement extends MapElementProps, Omit<HTMLElement, 'id' | 'onclick' | 'ondblclick'> {
    onboundschange: MapEvents['onBoundsChange'];
    onclick: MapEvents['onClick'];
    ondblclick: MapEvents['onDblClick'];
    onviewchange: MapEvents['onViewChange'];
}
/** @publicDocs */
export interface MapProps extends MapElementProps, MapEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: MapElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: MapProps & BaseElementPropsWithChildren<MapElement>;
        }
    }
}

export type { MapBoundsEvent, MapElement, MapElementEvents, MapElementProps, MapEvents, MapLocation, MapLocationEvent, MapProps, MapViewChangeEvent };
