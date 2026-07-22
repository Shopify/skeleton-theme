export interface FunctionSettingsProps {
    /**
     * A unique identifier for the form.
     */
    id?: string;
    /**
     * An optional callback function that will be run by the admin when the user
     * commits their changes in the admin-rendered part of the function settings
     * experience. If this function returns a promise, the admin will wait for the
     * promise to resolve before committing any changes to Shopify’s servers. If
     * the promise rejects, the admin will abort the changes and display an error,
     * using the `message` property of the error you reject with.
     */
    onSave?(): void | Promise<void>;
    /**
     * An optional callback function that will be run by the admin when the
     * committing the changes to Shopify’s servers fails. The errors you receive
     * in the `errors` argument will only be those that were caused by data your
     * extension provided; network errors and user errors that are out of your
     * control will not be reported here.
     *
     * In the `onError` callback, you should update your extension’s UI to
     * highlight the fields that caused the errors, and display the error messages
     * to the user.
     */
    onError?(errors: FunctionSettingsError[]): void;
}
export interface FunctionSettingsError {
    /**
     * A unique identifier describing the “class” of error. These will match
     * the GraphQL error codes as closely as possible. For example the enums
     * returned by the `metafieldsSet` mutation
     *
     * @see https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldsSetUserErrorCode
     */
    code: string;
    /**
     * A translated message describing the error.
     */
    message: string;
}
export declare const FunctionSettings: "FunctionSettings" & {
    readonly type?: "FunctionSettings" | undefined;
    readonly props?: FunctionSettingsProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=FunctionSettings.d.ts.map