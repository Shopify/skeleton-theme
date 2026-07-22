import { AutocompleteProps, TextAutocompleteField, InputProps, MinMaxLengthProps } from '../shared';
export interface TextAreaProps extends InputProps<string>, MinMaxLengthProps, AutocompleteProps<TextAutocompleteField> {
    /**
     * A number of visible text lines.
     *
     * @defaultValue 2
     */
    rows?: number;
}
export declare const TextArea: "TextArea" & {
    readonly type?: "TextArea" | undefined;
    readonly props?: TextAreaProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=TextArea.d.ts.map