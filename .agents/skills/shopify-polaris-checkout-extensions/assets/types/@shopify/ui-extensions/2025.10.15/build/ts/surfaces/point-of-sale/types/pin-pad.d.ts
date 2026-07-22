/**
 * Represents the result of a PIN pad interaction, indicating whether PIN entry was completed and providing the entered PIN if available.
 */
export interface PinPadResult {
    /**
     * Whether the PIN entry was completed successfully. When `true`, the user entered a PIN and submitted it (or it was auto-submitted). When `false`, the user canceled the PIN pad modal without completing entry, typically by clicking a cancel button or dismissing the modal.
     */
    completed: boolean;
    /**
     * The entered PIN as an array of individual digits (for example, `[1, 2, 3, 4]` for PIN "1234"). Each element is a number from 0-9. This array's length will be between `minPinLength` and `maxPinLength` inclusive. Only present when `completed` is `true`—when `completed` is `false`, this field is `undefined` since no PIN was entered.
     */
    pin?: number[];
}
/**
 * Represents the validation outcome for an entered PIN. Indicates whether the PIN should be accepted or rejected, with optional error messaging for rejected PINs.
 */
export type PinValidationResult = 
/** The validation result indicating the PIN should be accepted for valid PINs. */
{
    result: 'accept';
}
/** The validation result indicating the PIN should be rejected. Optionally includes an error message to display to the user explaining why the PIN was rejected. For example, "Invalid PIN" or "PIN expired". */
 | {
    result: 'reject';
    errorMessage?: string;
};
/**
 * The valid PIN length values (4-10 digits). Commonly used to configure minimum and maximum PIN length requirements.
 */
export type PinLength = 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * Defines a custom action button for the PIN pad interface with a label and click handler.
 */
export interface PinPadActionType {
    /**
     * The content for the prompt on the pin pad. Use to provide clear instructions or context about what the PIN is being used for.
     */
    label: string;
    /**
     * Called when the action button is clicked. Can return the PIN digits directly as an array of numbers, or return a Promise that resolves to the PIN array. Use for implementing custom PIN retrieval logic or validation workflows.
     */
    onClick: () => Promise<number[]> | number[];
}
/**
 * Specifies configuration options for displaying the PIN pad interface. Includes callback functions for PIN entry events, dismissal handling, and customizable labels and messaging.
 */
export interface PinPadOptions {
    /**
     * The function to be called when a pin is entered. Use for real-time PIN validation, progress feedback, or implementing custom PIN entry handling logic.
     */
    onPinEntry?: (pin: number[]) => void;
    /**
     * The function to be called when the pin pad modal is dismissed. Receives a `PinPadResult` indicating whether PIN entry was completed and the entered PIN if available. Use for handling modal dismissal and processing final PIN results.
     */
    onDismissed?: (result: PinPadResult) => void;
    /**
     * The content for the prompt on the pin pad. Use to provide clear instructions or context about what the PIN is being used for.
     */
    label?: string;
    /**
     * Whether the entered PIN should be masked for security. When `true`, PIN digits are hidden from view. Use for secure PIN entry where visual privacy is important.
     *
     * @default true
     */
    masked?: boolean;
    /**
     * The minimum length of the PIN (4-10 digits). Use to enforce PIN length requirements based on your security policies or authentication system requirements.
     *
     * @default 4
     */
    minPinLength?: PinLength;
    /**
     * The maximum length of the PIN (4-10 digits). Use to limit PIN length based on your security policies or authentication system constraints.
     *
     * @default 6
     */
    maxPinLength?: PinLength;
    /**
     * The call to action between the entry view and the keypad, consisting of a label and function that returns the pin. Use for custom PIN entry workflows or implementing specific authentication patterns.
     */
    pinPadAction?: PinPadActionType;
    /**
     * The title shown in the modal header. Use to provide context about the PIN entry purpose or identify the specific authentication requirement.
     */
    title?: string;
    /**
     * Whether the pin should be automatically submitted when the user has entered the maximum PIN length. Use for PIN entry experiences where users don't need to manually submit after entering the required digits.
     *
     * @default false
     */
    autoSubmit?: boolean;
}
//# sourceMappingURL=pin-pad.d.ts.map