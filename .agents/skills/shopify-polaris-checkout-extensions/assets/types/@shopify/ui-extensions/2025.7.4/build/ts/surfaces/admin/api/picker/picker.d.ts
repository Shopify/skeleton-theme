import { Tone } from '../../components/shared';
interface Picker {
    /**
     * A Promise that resolves with the selected item IDs when the user presses the "Select" button in the picker.
     */
    selected: Promise<string[] | undefined>;
}
interface Header {
    /**
     * The content to display in the table column header.
     */
    content?: string;
    /**
     * The type of data to display in the column. The type is used to format the data in the column.
     * If the type is 'number', the data in the column will be right-aligned, this should be used when referencing currency or numeric values.
     * If the type is 'string', the data in the column will be left-aligned.
     * @defaultValue 'string'
     */
    type?: 'string' | 'number';
}
interface PickerOptions {
    /**
     * The heading of the picker. This is displayed in the title of the picker modal.
     */
    heading: string;
    /**
     * The data headers for the picker. These are used to display the table headers in the picker modal.
     */
    multiple?: boolean | number;
    /**
     * The items to display in the picker. These are used to display the rows in the picker modal.
     */
    items: Item[];
    /**
     * The data headers for the picker. These are used to display the table headers in the picker modal.
     */
    headers?: Header[];
}
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
type DataPoint = string | number | undefined;
interface Badge {
    content: string;
    tone?: Tone;
    progress?: Progress;
}
interface Item {
    /**
     * The unique identifier of the item. This will be returned by the picker if selected.
     */
    id: string;
    /**
     * The primary content to display in the first column of the row.
     */
    heading: string;
    /**
     * The additional content to display in the second and third columns of the row, if provided.
     */
    data?: DataPoint[];
    /**
     * Whether the item is disabled or not. If the item is disabled, it cannot be selected.
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether the item is selected or not when the picker is opened. The user may deselect the item if it is preselected.
     */
    selected?: boolean;
    /**
     * The badges to display in the first column of the row. These are used to display additional information about the item, such as progress of an action or tone indicating the status of that item.
     */
    badges?: Badge[];
    /**
     * The thumbnail to display at the start of the row. This is used to display an image or icon for the item.
     */
    thumbnail?: {
        url: string;
    };
}
export type PickerApi = (options: PickerOptions) => Promise<Picker>;
export {};
//# sourceMappingURL=picker.d.ts.map