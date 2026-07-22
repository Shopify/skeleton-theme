import type { IdProps } from '../shared';
export interface DropZoneProps extends IdProps {
    /**
     * Whether the field can be modified.
     */
    disabled?: boolean;
    /**
     * Whether the field needs a value. This requirement adds semantic value
     * to the field, but it will not cause an error to appear automatically.
     * If you want to present an error when this field is empty, you can do
     * so with the `error` prop.
     */
    required?: boolean;
    /**
     * Indicate an error to the user. The field will be given a specific stylistic treatment
     * to communicate problems that have to be resolved immediately.
     */
    error?: string;
    /**
     * Content to use as the field label.
     */
    label?: string;
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
    /**
     * A string representing the types of files that are accepted by the dropzone.
     * This string is a comma-separated list of unique file type specifiers which can be one of the following:
     * - A file extension starting with a period (".") character (e.g. .jpg, .pdf, .doc)
     * - A valid MIME type string with no extensions
     *
     * If left empty, the dropzone will accept all files.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
     */
    accept?: string;
    /**
     * A label that describes the purpose or contents of the item. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Defines if the user can select or drop multiple files at once.
     *
     * @default false
     */
    multiple?: boolean;
    /**
     * Callback when files are dropped or selected.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event
     */
    onInput?(files: File[]): void;
    /**
     * Callback when rejected files are dropped. Files are rejected based on the `accept` prop.
     */
    onDropRejected?(files: File[]): void;
}
export declare const DropZone: "DropZone" & {
    readonly type?: "DropZone" | undefined;
    readonly props?: DropZoneProps | undefined; /**
     * Whether the field needs a value. This requirement adds semantic value
     * to the field, but it will not cause an error to appear automatically.
     * If you want to present an error when this field is empty, you can do
     * so with the `error` prop.
     */
    readonly children?: true | undefined;
};
//# sourceMappingURL=DropZone.d.ts.map