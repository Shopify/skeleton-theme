export interface StepperProps {
    /**
     * The initial value of the stepper that sets the starting numeric value when the component is first rendered.
     */
    initialValue: number;
    /**
     * A callback function executed when the value of the stepper changes, receiving the new numeric value as a parameter.
     */
    onValueChanged: (value: number) => void;
    /**
     * The minimum value that the stepper can reach. When the value equals the minimum, the decrement button will be disabled.
     *
     * @defaultValue 1
     */
    minimumValue?: number;
    /**
     * The maximum value that the stepper can reach. When the value equals the maximum, the increment button will be disabled.
     */
    maximumValue?: number;
    /**
     * An optional value to override the internal state of the component. Only use this if you need complete control over the stepper's value from external state.
     */
    value?: number;
    /**
     * Whether the field can be modified, disabling both increment and decrement buttons.
     *
     * @defaultValue false
     */
    disabled?: boolean;
}
export declare const Stepper: "Stepper" & {
    readonly type?: "Stepper" | undefined;
    readonly props?: StepperProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Stepper.d.ts.map