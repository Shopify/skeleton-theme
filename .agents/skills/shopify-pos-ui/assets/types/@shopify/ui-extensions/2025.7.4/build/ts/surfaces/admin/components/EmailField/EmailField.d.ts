import { AutocompleteProps, AnyAutocompleteField, AutocompleteAddressGroup, InputProps, MinMaxLengthProps } from '../shared';
export interface EmailFieldProps extends InputProps<string>, MinMaxLengthProps, AutocompleteProps<EmailAutocompleteField> {
}
export type EmailAutocompleteField = Extract<AnyAutocompleteField, 'email' | `${AutocompleteAddressGroup} email`>;
export declare const EmailField: "EmailField" & {
    readonly type?: "EmailField" | undefined;
    readonly props?: EmailFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=EmailField.d.ts.map