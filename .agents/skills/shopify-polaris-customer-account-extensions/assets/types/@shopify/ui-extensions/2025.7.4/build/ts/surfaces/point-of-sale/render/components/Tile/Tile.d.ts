export interface TileProps {
    /**
     * The text displayed as the main label of the tile.
     */
    title: string;
    /**
     * The text displayed as the secondary label below the title.
     */
    subtitle?: string;
    /**
     * Whether the tile can be tapped and responds to user interaction. When disabled, the tile appears dimmed and doesn't respond to tap events.
     */
    enabled?: boolean;
    /**
     * Sets whether the tile appears in a destructive/warning state. As of POS 10.0.0, this property creates an "active state" appearance rather than just red coloring.
     */
    destructive?: boolean;
    /**
     * A numeric value displayed as a small badge in the top right corner of the tile.
     */
    badgeValue?: number;
    /**
     * The callback function that's executed when users tap the tile.
     */
    onPress?: () => void;
}
export declare const Tile: "Tile" & {
    readonly type?: "Tile" | undefined;
    readonly props?: TileProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Tile.d.ts.map