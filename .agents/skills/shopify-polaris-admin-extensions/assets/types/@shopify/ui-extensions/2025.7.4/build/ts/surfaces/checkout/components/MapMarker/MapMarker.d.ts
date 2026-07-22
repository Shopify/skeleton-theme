import type { OverlayActivatorProps } from '../shared';
export interface MapMarkerProps extends OverlayActivatorProps {
    /**
     * The latitude of the marker.
     */
    latitude: number;
    /**
     * The longitude of the marker.
     */
    longitude: number;
    /**
     * The accessibility label of the marker.
     */
    accessibilityLabel: string;
    /**
     * Set to `true` to allow grouping the marker in clusters when zoomed out.
     */
    clusterable?: boolean;
    /**
     * Callback that is run when the marker is pressed.
     */
    onPress?(): void;
    /**
     * The URL of the icon to use for the marker.
     */
    icon?: string;
    /**
     * The block size of the icon.
     * This property is only used when the `icon` property is set.
     */
    blockSize?: number;
    /**
     * The inline size of the icon.
     * This property is only used when the `icon` property is set.
     */
    inlineSize?: number;
}
/**
 * Use the `MapMarker` component to provide visual representation of single geographic location such as a shipping address or package pickup location.
 */
export declare const MapMarker: "MapMarker" & {
    readonly type?: "MapMarker" | undefined;
    readonly props?: MapMarkerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=MapMarker.d.ts.map