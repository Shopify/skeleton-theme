export interface FormProps {
    /**
     * A unique identifier for the form.
     */
    id?: string;
    /**
     * A callback that is run when the form is submitted.
     */
    onSubmit(): void | Promise<void>;
    /**
     * A callback that is run when the form is reset.
     */
    onReset(): void | Promise<void>;
}
export declare const Form: "Form" & {
    readonly type?: "Form" | undefined;
    readonly props?: FormProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Form.d.ts.map