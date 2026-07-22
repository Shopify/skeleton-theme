/**
 * The response returned when a merchant closes or cancels the workflow without completing it. Check for this response to handle cancellation gracefully in your extension.
 * @publicDocs
 */
export interface ClosedIntentResponse {
    /** Indicates the workflow was closed without completion. When `'closed'`, the merchant exited the workflow before finishing. */
    code?: 'closed';
}
/**
 * The response returned when a merchant successfully completes the workflow. Use this to access the created or updated resource data.
 * @publicDocs
 */
export interface SuccessIntentResponse {
    /** Indicates successful completion. When `'ok'`, the merchant completed the workflow and the resource was created or updated. */
    code?: 'ok';
    /** Additional data returned by the workflow, such as the created or updated resource information with IDs and properties. */
    data?: {
        [key: string]: unknown;
    };
}
/**
 * The response returned when the workflow fails due to validation errors or other issues. Use this to display error messages and help merchants fix problems.
 * @publicDocs
 */
export interface ErrorIntentResponse {
    /** Indicates the workflow failed. When `'error'`, the workflow encountered validation errors or other issues that prevented completion. */
    code?: 'error';
    /** A general error message describing what went wrong. Use this to display feedback when specific field errors aren't available. */
    message?: string;
    /** Specific validation issues or field errors. Present when validation fails on particular fields, allowing you to show targeted error messages. */
    issues?: {
        /** The path to the field that has an error (for example, `['product', 'title']`). Use this to identify which field caused the validation failure. */
        path?: string[];
        /** A description of what's wrong with this field. Display this to help merchants understand how to fix the error. */
        message?: string;
        /** A machine-readable error code for this issue. Use this for programmatic error handling or logging. */
        code?: string;
    }[];
}
/**
 * The result of an intent workflow. Check the `code` property to determine the outcome: `'ok'` for success, `'error'` for failure, or `'closed'` if the merchant cancelled.
 * @publicDocs
 */
export type IntentResponse = SuccessIntentResponse | ErrorIntentResponse | ClosedIntentResponse;
/**
 * A handle for tracking an in-progress intent workflow.
 * @publicDocs
 */
export interface IntentActivity {
    /**
     * A Promise that resolves when the workflow completes. Await this to get the outcome and handle success, failure, or cancellation appropriately.
     */
    complete?: Promise<IntentResponse>;
}
/**
 * The type of operation to perform: creating a new resource or editing an existing one.
 */
export type IntentAction = 'create' | 'edit';
/**
 * The types of Shopify resources that support intent-based creation and editing workflows.
 */
export type IntentType = 'shopify/Article' | 'shopify/Catalog' | 'shopify/Collection' | 'shopify/Customer' | 'shopify/Discount' | 'shopify/Market' | 'shopify/Menu' | 'shopify/MetafieldDefinition' | 'shopify/Metaobject' | 'shopify/MetaobjectDefinition' | 'shopify/Page' | 'shopify/Product' | 'shopify/ProductVariant';
/**
 * Additional parameters for intent invocation when using the string query format. Use these options to provide resource IDs for editing or pass required context data for resource creation.
 */
export interface IntentQueryOptions {
    /**
     * The resource identifier for edit operations (for example, `'gid://shopify/Product/123'`). Required when editing existing resources. Omit this for create operations.
     */
    value?: string;
    /**
     * Additional context data required by specific intent types. For example, discount creation requires a discount type, variant creation requires a parent product ID, and [metaobject](/docs/apps/build/custom-data/metaobjects) creation requires a definition type.
     */
    data?: {
        [key: string]: unknown;
    };
}
/**
 * A structured intent specification defining what workflow to launch. Use this format when you prefer object syntax over string query format.
 */
export interface IntentQuery extends IntentQueryOptions {
    /**
     * The operation to perform: `'create'` for new resources or `'edit'` for existing ones.
     */
    action: IntentAction;
    /**
     * The type of resource to create or edit (for example, `'shopify/Product'`).
     */
    type: IntentType;
}
/**
 * The [`invoke` method](/docs/api/admin-extensions/{API_VERSION}/target-apis/utility-apis/intents-api#invoke-method) in the Intents API launches a Shopify admin workflow for creating or editing resources, such as products, customers, or discounts. It opens a native admin interface, waits for the merchant to complete the workflow, and returns the result including any created or updated resource data.
 *
 * @param intent - Either a string query (for example, `'create:shopify/Product'`) or structured object describing the intent
 * @param options - Optional parameters when using string query format, such as resource IDs for editing or additional context data
 * @returns A Promise resolving to an activity handle for tracking the workflow and accessing the completion result
 *
 * @example
 * ```javascript
 * // Create a new product
 * const activity = await intents.invoke('create:shopify/Product');
 * const response = await activity.complete;
 *
 * // Edit an existing product
 * const activity = await intents.invoke('edit:shopify/Product,gid://shopify/Product/123');
 * const response = await activity.complete;
 *
 * // Create a discount with required type
 * const activity = await intents.invoke('create:shopify/Discount', {
 *   data: { type: 'amount-off-product' }
 * });
 * const response = await activity.complete;
 * ```
 * @publicDocs
 */
export interface IntentInvokeApi {
    (query: IntentQuery): Promise<IntentActivity>;
    (intentURL: string, options?: IntentQueryOptions): Promise<IntentActivity>;
}
/**
 * The `Intents` object provides methods for launching standardized Shopify workflows to create or edit resources. Intents enable your extension to trigger native admin interfaces for products, customers, discounts, and other resources, then receive the results when merchants complete the workflow.
 */
export interface Intents {
    /**
     * The URL that launched the current intent workflow, if your extension was opened through an intent. Use this to determine how your extension was invoked and access any parameters passed in the URL.
     */
    launchUrl?: string | URL;
    /**
     * Launches an intent workflow for creating or editing Shopify resources. Returns a handle that resolves when the merchant completes, cancels, or encounters an error in the workflow. Use this to initiate resource creation or editing without building custom forms.
     */
    invoke?: IntentInvokeApi;
}
//# sourceMappingURL=intents.d.ts.map