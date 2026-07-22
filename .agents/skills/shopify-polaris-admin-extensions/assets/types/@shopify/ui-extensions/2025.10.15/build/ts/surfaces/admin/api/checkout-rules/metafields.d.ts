import { SupportedDefinitionType } from '../shared';
/**
 * A metafield update or creation operation. Use this to set or modify metafield values that store validation function configuration data.
 */
interface MetafieldUpdateChange {
    /** Identifies this as an update operation. Always set to `'updateMetafield'` for updates. */
    type: 'updateMetafield';
    /** The unique key identifying the metafield within its namespace. Use descriptive keys that indicate the setting's purpose (for example, `'min_quantity'` or `'shipping_restriction'`). */
    key: string;
    /** The namespace that organizes related metafields. When omitted, a default namespace is assigned. Use consistent namespaces to group related settings. */
    namespace?: string;
    /** The metafield value to store. Can be a string or number depending on your configuration needs. */
    value: string | number;
    /** The [data type](/docs/apps/build/metafields/list-of-data-types) that defines how the value is formatted and validated. When omitted, preserves the existing type for updates or uses a default for new metafields. Choose a type that matches your value format. */
    valueType?: SupportedDefinitionType;
}
/**
 * A metafield removal operation. Use this to delete metafields that are no longer needed for your validation configuration.
 */
interface MetafieldRemoveChange {
    /** Identifies this as a removal operation. Always set to `'removeMetafield'` for deletions. */
    type: 'removeMetafield';
    /** The unique key of the metafield to remove. Must match the key used when the metafield was created. */
    key: string;
    /** The namespace containing the metafield to remove. Required to ensure the correct metafield is targeted, as the same key can exist in different namespaces. */
    namespace: string;
}
/**
 * A metafield change operation that can either update or remove a metafield. Pass this to `applyMetafieldChange` to modify validation settings stored in metafields.
 */
type MetafieldChange = MetafieldUpdateChange | MetafieldRemoveChange;
/**
 * A failed metafield change operation result. Use the error message to understand what went wrong and fix the issue, such as validation errors, permission problems, or invalid metafield types.
 */
interface MetafieldChangeResultError {
    /** Indicates the operation failed. Check this value to determine if you need to handle an error. */
    type: 'error';
    /** A human-readable error message explaining why the operation failed. Use this to debug issues or display feedback to merchants. */
    message: string;
}
/**
 * A successful metafield change operation result. The metafield was updated or removed as requested and the changes are now saved.
 */
interface MetafieldChangeSuccess {
    /** Indicates the operation succeeded. When this value is `'success'`, the metafield change was applied successfully. */
    type: 'success';
}
/**
 * The result returned after attempting to change a metafield. Check the `type` property to determine if the operation succeeded (`'success'`) or failed (`'error'`), then handle the result appropriately in your extension.
 */
type MetafieldChangeResult = MetafieldChangeSuccess | MetafieldChangeResultError;
/**
 * A function that applies metafield changes to validation settings. Call this function with an update or removal operation, then await the Promise to receive a result indicating success or failure. Use the result to provide feedback or handle errors in your settings interface.
 */
export type ApplyMetafieldChange = (change: MetafieldChange) => Promise<MetafieldChangeResult>;
export {};
//# sourceMappingURL=metafields.d.ts.map