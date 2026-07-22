import type { PhoneFieldProps } from '../PhoneField/PhoneField';
export type ConsentPolicy = 'sms-marketing';
export interface ConsentPhoneFieldProps extends Omit<PhoneFieldProps, 'value'> {
    /**
     * The policy for which buyer consent is being collected for.
     *
     * `sms-marketing`: Represents the policy for SMS marketing consent.
     */
    policy: ConsentPolicy;
}
export declare const ConsentPhoneField: "ConsentPhoneField" & {
    readonly type?: "ConsentPhoneField" | undefined;
    readonly props?: ConsentPhoneFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ConsentPhoneField.d.ts.map