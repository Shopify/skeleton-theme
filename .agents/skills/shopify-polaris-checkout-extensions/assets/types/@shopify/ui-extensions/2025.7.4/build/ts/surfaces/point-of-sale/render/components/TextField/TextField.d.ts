import type { InputProps } from '../shared/InputField';
export interface ActionProps {
    /**
     * Identifies this as an action-type embedded element.
     */
    type: 'action';
    /**
     * The message or label text displayed for the action.
     */
    message: string;
    /**
     * A callback function executed when the action button is pressed, receiving the current field value as a parameter.
     */
    onPress: (value: string) => void;
}
export interface InfoProps {
    /**
     * Identifies this as an info-type embedded element.
     */
    type: 'info';
    /**
     * The informational message text to display to the user.
     */
    message: string;
    /**
     * Controls whether the info message is always visible or only shown under certain conditions.
     */
    alwaysShow?: boolean;
}
export interface SuccessProps {
    /**
     * Identifies this as a success-type embedded element.
     */
    type: 'success';
    /**
     * An optional success message to display when the field validation or operation succeeds.
     */
    message?: string;
}
export interface PasswordProps {
    /**
     * Identifies this as a password-type embedded element.
     */
    type: 'password';
    /**
     * A callback function executed when the password action button is pressed, receiving the current field value as a parameter.
     */
    onPress: (value: string) => void;
}
export type EmbeddedElementProps = ActionProps | InfoProps | SuccessProps | PasswordProps;
export interface NewTextFieldProps extends InputProps {
}
export declare const TextField: "TextField" & {
    readonly type?: "TextField" | undefined;
    readonly props?: NewTextFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=TextField.d.ts.map