import type { CheckboxProps } from '../Checkbox/Checkbox';
export interface ConsentCheckboxProps extends Omit<CheckboxProps, 'value'> {
    /**
     * The policy for which buyer consent is being collected for.
     *
     * `sms-marketing`: Represents the policy for SMS marketing consent.
     */
    policy: 'sms-marketing';
}
export declare const ConsentCheckbox: "ConsentCheckbox" & {
    readonly type?: "ConsentCheckbox" | undefined;
    readonly props?: ConsentCheckboxProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ConsentCheckbox.d.ts.map