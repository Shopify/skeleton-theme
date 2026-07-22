import { AutocompleteProps, AnyAutocompleteField, InputProps, MinMaxLengthProps } from '../shared';
export interface PasswordFieldProps extends InputProps<string>, MinMaxLengthProps, AutocompleteProps<PasswordAutocompleteField> {
}
export type PasswordAutocompleteField = Extract<AnyAutocompleteField, 'new-password' | 'current-password'>;
export declare const PasswordField: "PasswordField" & {
    readonly type?: "PasswordField" | undefined;
    readonly props?: PasswordFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=PasswordField.d.ts.map