import { RemoteFragment } from '@remote-ui/core';
import { BadgeProps } from '../Badge/Badge';
import { ColorType } from '../Text/Text';
export interface ToggleSwitch {
    /**
     * The current state of the toggle switch. When `true`, the switch is in the "on" position. When `false`, it's in the "off" position.
     */
    value?: boolean;
    /**
     * Controls whether the toggle switch can be interacted with. When `true`, the switch is disabled and users cannot change its state.
     */
    disabled?: boolean;
}
export interface SubtitleType {
    /**
     * The text content to display as a subtitle beneath the main label.
     */
    content: string;
    /**
     * The semantic color of the subtitle text that conveys meaning and intent through visual styling.
     */
    color?: ColorType;
}
export type ListRowSubtitle = string | SubtitleType;
export interface ListRowLeftSide {
    /**
     * The main label text displayed prominently on the left side of the row.
     */
    label: string;
    /**
     * An array of up to three subtitles displayed beneath the main label. Each subtitle can be a string or an object with content and color properties.
     */
    subtitle?: [ListRowSubtitle, ListRowSubtitle?, ListRowSubtitle?];
    /**
     * An array of colored badges displayed underneath the title and subtitles for additional status or category information.
     */
    badges?: BadgeProps[];
    /**
     * An image configuration object for displaying images on the far left side of the row with optional badge overlay.
     */
    image?: {
        /**
         * A URL to an image to be displayed on the far left side of the row.
         */
        source?: string;
        /**
         * A numeric badge displayed on the top right corner of the image, typically used for counts or quantities.
         */
        badge?: number;
    };
}
export interface ListRowRightSide {
    /**
     * An optional label text displayed on the right side of the row for additional information or values.
     */
    label?: string;
    /**
     * A boolean that controls chevron display. Set to `true` when pressing the row navigates to another screen.
     *
     * @defaultValue `false`
     */
    showChevron?: boolean;
    /**
     * A toggle switch configuration object displayed on the right side of the row for boolean settings or states.
     */
    toggleSwitch?: ToggleSwitch;
}
export interface ListRow {
    /**
     * The unique identifier for the list item used for tracking and interaction handling.
     */
    id: string;
    /**
     * The content configuration for the left side of the row, including label, subtitles, badges, and optional image.
     */
    leftSide: ListRowLeftSide;
    /**
     * The content configuration for the right side of the row, including optional label, chevron, and toggle switch.
     */
    rightSide?: ListRowRightSide;
    /**
     * A callback function executed when the user taps the row.
     */
    onPress?: () => void;
}
export interface ListProps {
    /**
     * A large display title shown at the top of the list.
     */
    title?: string;
    /**
     * A header component displayed at the top of the list for additional context or controls.
     */
    listHeaderComponent?: RemoteFragment;
    /**
     * An array of ListRow objects that define the content and structure of each row in the list.
     */
    data: ListRow[];
    /**
     * A boolean indicating whether more data is being loaded. Set to `true` when paginating and fetching additional data for the list.
     */
    isLoadingMore?: boolean;
    /**
     * The logic for displaying images or placeholders:
     * - `automatic`: Displays images or placeholders only when it detects that a ListRow has an image source value.
     * - `always`: Displays images or placeholders for all rows, even when image sources are undefined or empty.
     * - `never`: Hides all images and placeholders, creating a text-only list layout.
     *
     * @defaultValue `automatic`
     */
    imageDisplayStrategy?: 'automatic' | 'always' | 'never';
    /**
     * A callback function executed when the user reaches the end of the list. Use this to trigger requests for loading additional data.
     */
    onEndReached?: () => void;
}
export declare const List: "List" & {
    readonly type?: "List" | undefined;
    readonly props?: ListProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=List.d.ts.map