/**
 * Defines the validation result values that the `onSubmit` callback must return to indicate PIN verification status.
 *
 * Available values:
 * - `accept`: A validation result indicating the PIN is correct and authentication was successful.
 * - `reject`: A validation result indicating the PIN is incorrect and authentication failed.
 */
export type PinValidationResult = 'accept' | 'reject';
/**
 * Defines the allowed PIN length values that constrain how many digits users can enter.
 *
 * Available lengths:
 * - `4`: A four-digit PIN length, commonly used for basic security codes and quick authentication.
 * - `5`: A five-digit PIN length for moderate security requirements.
 * - `6`: A six-digit PIN length, commonly used for enhanced security codes and verification.
 * - `7`: A seven-digit PIN length for higher security requirements.
 * - `8`: An eight-digit PIN length for strong security and complex authentication scenarios.
 * - `9`: A nine-digit PIN length for very high security requirements.
 * - `10`: A ten-digit PIN length, the maximum supported for highly secure authentication workflows.
 */
export type PinLength = 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * Defines the configuration object for action buttons displayed between the PIN entry view and keypad.
 */
export interface PinPadActionType {
    /**
     * The label text displayed on the action button.
     */
    label: string;
    /**
     * A callback function executed when the action button is pressed, returning the current PIN as an array of numbers.
     */
    onPress: () => Promise<number[]>;
}
export interface PinPadProps {
    /**
     * A boolean that determines whether the entered PIN should be masked with dots or asterisks to protect privacy and security.
     */
    masked?: boolean;
    /**
     * The minimum length of the PIN that users must enter before submission is allowed.
     */
    minPinLength?: PinLength;
    /**
     * The maximum length of the PIN that users can enter, constraining the number of digits.
     */
    maxPinLength?: PinLength;
    /**
     * The content for the prompt displayed on the pin pad that instructs users what to enter.
     */
    label?: string;
    /**
     * A call-to-action configuration displayed between the entry view and the keypad, consisting of a label and function that returns the current PIN.
     */
    pinPadAction?: PinPadActionType;
    /**
     * A callback function executed when the PIN is submitted, receiving the PIN as an array of numbers. Must return a Promise that resolves to either `'accept'` or `'reject'` to indicate validation success or failure.
     */
    onSubmit: (pin: number[]) => Promise<PinValidationResult>;
    /**
     * A callback function executed when a PIN is entered, receiving the PIN as an array of numbers. Use this for real-time feedback or validation during PIN entry.
     */
    onPinEntry?: (pin: number[]) => void;
}
export declare const PinPad: "PinPad" & {
    readonly type?: "PinPad" | undefined;
    readonly props?: PinPadProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=PinPad.d.ts.map