import { AutocompleteProps, AnyAutocompleteField, AutocompleteFieldCreditCardAlias, AutocompleteFieldSecurityCodeAlias, InputProps, NumberConstraintsProps, FieldDecorationProps } from '../shared';
export interface NumberFieldProps extends InputProps<number>, NumberConstraintsProps, AutocompleteProps<NumberAutocompleteField>, FieldDecorationProps {
    /**
     * Sets the virtual keyboard.
     *
     * @defaultValue 'decimal'
     */
    inputMode?: 'decimal' | 'numeric';
}
export type NumberAutocompleteField = Extract<AnyAutocompleteField, 'one-time-code' | `${AutocompleteFieldCreditCardAlias}-number` | `${AutocompleteFieldCreditCardAlias}-${AutocompleteFieldSecurityCodeAlias}`>;
export declare const NumberField: "NumberField" & {
    readonly type?: "NumberField" | undefined;
    readonly props?: NumberFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=NumberField.d.ts.map