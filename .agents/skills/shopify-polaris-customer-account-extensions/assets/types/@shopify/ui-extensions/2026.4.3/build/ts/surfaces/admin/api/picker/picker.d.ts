/**
 * A handle returned when opening a picker dialog. Use this to access the merchant's selection after they confirm or cancel the picker.
 * @publicDocs
 */
export interface Picker {
    /**
     * A Promise that resolves with an array of selected item IDs when the merchant presses the **Select** button, or `undefined` if they cancel. Await this Promise to handle the selection result.
     */
    selected: Promise<string[] | undefined>;
}
/**
 * The configuration for a table column header in the picker. Each header creates a labeled column that displays corresponding data from items.
 * @publicDocs
 */
export interface Header {
    /**
     * The label text displayed at the top of the table column. Use clear, concise labels that describe the data in that column (for example, "Price", "Status", "Last Updated").
     */
    content?: string;
    /**
     * The data type that controls column formatting and text alignment. Use `'number'` for currency, prices, or numeric values (displays right-aligned), or `'string'` for text content (displays left-aligned).
     * @defaultValue 'string'
     */
    type?: 'string' | 'number';
}
/**
 * The configuration options for the custom picker dialog. Define the picker's appearance, selection behavior, and data structure.
 * @publicDocs
 */
export interface PickerOptions {
    /**
     * The heading displayed at the top of the picker modal. Use a clear, descriptive title that tells merchants what they're selecting.
     */
    heading: string;
    /**
     * The selection mode for the picker. Pass `true` to allow unlimited selections, `false` for single-item selection only, or a number to set a maximum selection limit (for example, `3` allows up to three items).
     */
    multiple?: boolean | number;
    /**
     * The list of items that merchants can select from. Each item appears as a row in the picker table.
     */
    items: Item[];
    /**
     * The column headers for the picker table. Define headers to label and organize the data columns displayed for each item. The header order determines the column layout.
     */
    headers?: Header[];
}
/**
 * The visual tone for picker badges indicating status or importance. Use different tones to communicate urgency or state: `'info'` for neutral information, `'success'` for positive states, `'warning'` for caution, or `'critical'` for urgent issues.
 * @publicDocs
 */
export type Tone = 'info' | 'success' | 'warning' | 'critical';
/**
 * The progress state for picker badges showing completion status. Use this to indicate how complete an item is: `'incomplete'` for not started, `'partiallyComplete'` for in progress, or `'complete'` for finished.
 * @publicDocs
 */
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
/**
 * A single data point that can appear in a picker table cell. Can be text, a number, or undefined if the cell should be empty.
 * @publicDocs
 */
export type DataPoint = string | number | undefined;
/**
 * A badge displayed next to an item in the picker to show status or progress. Use badges to highlight important item attributes or states that affect selection decisions.
 * @publicDocs
 */
export interface PickerBadge {
    /** The text content of the badge. Keep this short and descriptive (for example, "Draft", "Active", "Incomplete"). */
    content: string;
    /** The visual tone indicating status or importance. Choose a tone that matches the badge's meaning. */
    tone?: Tone;
    /** The progress indicator for the badge. Use this to show completion status for items that have progress states. */
    progress?: Progress;
}
/**
 * An individual item that merchants can select in the picker. Each item appears as a row in the picker table.
 * @publicDocs
 */
export interface Item {
    /**
     * The unique identifier for this item. This ID is returned in the selection array when the merchant selects this item. Use an ID that helps you identify the item in your system (for example, template IDs, review IDs, or custom option keys).
     */
    id: string;
    /**
     * The primary text displayed in the first column. This is typically the item's name or title and is the most prominent text in the row.
     */
    heading: string;
    /**
     * Additional data displayed in subsequent columns after the heading. Each value appears in its own column, and the order must match the `headers` array. For example, if headers are `["Price", "Status"]`, then data would be `[19.99, "Active"]`.
     */
    data?: DataPoint[];
    /**
     * Whether the item can be selected. When `true`, the item is disabled and can't be selected. Disabled items appear grayed out and merchants can't choose them. Use this for items that are unavailable or don't meet selection criteria.
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether the item is preselected when the picker opens. When `true`, the item appears selected by default. Merchants can still deselect preselected items. Use this to show current selections or suggest default choices.
     */
    selected?: boolean;
    /**
     * Status or context badges displayed next to the heading in the first column. Use badges to highlight item state, completion status, or other important attributes (for example, "Draft", "Published", "Incomplete").
     */
    badges?: PickerBadge[];
    /**
     * A small preview image or icon displayed at the start of the row. Thumbnails help merchants visually identify items at a glance. Provide a URL to the image file.
     */
    thumbnail?: {
        url: string;
    };
}
/**
 * The `picker` function opens a custom selection dialog with your app-specific data. It accepts configuration options to define the picker's heading, items, headers, and selection behavior. It returns a Promise that resolves to a `Picker` object with a `selected` property for accessing the merchant's selection.
 * @publicDocs
 */
export type PickerApi = (options: PickerOptions) => Promise<Picker>;
//# sourceMappingURL=picker.d.ts.map