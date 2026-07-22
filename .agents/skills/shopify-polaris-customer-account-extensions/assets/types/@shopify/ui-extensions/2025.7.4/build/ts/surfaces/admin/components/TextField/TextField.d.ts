import { AutocompleteProps, TextAutocompleteField, InputProps, MinMaxLengthProps, FieldDecorationProps } from '../shared';
export interface TextFieldProps extends InputProps<string>, MinMaxLengthProps, AutocompleteProps<TextAutocompleteField>, FieldDecorationProps {
}
export declare const TextField: "TextField" & {
    readonly type?: "TextField" | undefined;
    readonly props?: TextFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=TextField.d.ts.map