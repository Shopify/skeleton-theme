import type { InputProps } from '../shared/InputField';
export interface NumberFieldProps extends InputProps {
    /**
     * The virtual keyboard layout to display:
     * - `decimal`: A keyboard layout that includes decimal point support for entering fractional numbers, prices, or measurements with decimal precision.
     * - `numeric`: A keyboard layout optimized for integer-only entry without decimal point support, ideal for quantities, counts, or whole number values.
     */
    inputMode?: 'decimal' | 'numeric';
    /**
     * The highest decimal or integer to be accepted for the field. Users can still input higher numbers by keyboard—you must add appropriate validation logic.
     */
    max?: number;
    /**
     * The lowest decimal or integer to be accepted for the field. Users can still input lower numbers by keyboard—you must add appropriate validation logic.
     */
    min?: number;
}
export declare const NumberField: "NumberField" & {
    readonly type?: "NumberField" | undefined;
    readonly props?: NumberFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=NumberField.d.ts.map