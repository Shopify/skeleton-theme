import type { SizingProps } from '../shared';
export type MapZoom = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
export interface MapLocation {
    latitude: number;
    longitude: number;
}
export interface MapBounds {
    northEast: MapLocation;
    southWest: MapLocation;
}
export interface MapProps extends Pick<SizingProps, 'maxBlockSize' | 'maxInlineSize' | 'minInlineSize' | 'minBlockSize'> {
    /**
     * The Google Maps API key.
     */
    apiKey: string;
    /**
     * The latitude of the center of the map.
     */
    latitude: number;
    /**
     * The longitude of the center of the map.
     */
    longitude: number;
    /**
     * The id of the map. This is used to set a unique map id for the Google Maps API.
     * If you don't provide an id, the map component will automatically create a unique one for every map.
     * If you provide it, you need to make sure it's unique.
     */
    id?: string;
    /**
     * The zoom level of the map. It must be a number between 0 and 18.
     */
    zoom?: number;
    /**
     * The minimum zoom level of the map.
     */
    minZoom?: number;
    /**
     * The maximum zoom level of the map.
     */
    maxZoom?: number;
    /**
     * A label to describe the purpose of the map that is announced by screen readers.
     */
    accessibilityLabel: string;
    /**
     * Callback to run when the map bounds change.
     */
    onBoundsChange?: (bounds: MapBounds) => void;
    /**
     * Callback to run when the map center changes.
     */
    onCenterChange?: (location: MapLocation) => void;
    /**
     * Callback to run when the map is pressed.
     */
    onPress?: (location: MapLocation) => void;
    /**
     * Callback to run when the map is double clicked.
     */
    onDoublePress?: (location: MapLocation) => void;
    /**
     * Callback to run when the map zoom changes.
     */
    onZoomChange?: (zoom: MapZoom) => void;
}
/**
 * Use the Map component to provide visual representation of geographic data such as verifying address, package or pickup locations.
 * Please note that the merchant or partner has to provide an API key and a set of allowed domains where the map would render.
 */
export declare const Map: "Map" & {
    readonly type?: "Map" | undefined;
    readonly props?: MapProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Map.d.ts.map