interface Metafield {
    description?: string;
    id: string;
    namespace: string;
    key: string;
    value: string;
    type: string;
}
interface Validation {
    /**
     * the validation's gid when active in a shop
     */
    id: string;
    /**
     * the metafields owned by the validation
     */
    metafields: Metafield[];
}
interface ShopifyFunction {
    /**
     * the validation function's unique identifier
     */
    id: string;
}
/**
 * The object that exposes the validation with its settings.
 */
export interface ValidationData {
    validation?: Validation;
    shopifyFunction: ShopifyFunction;
}
export {};
//# sourceMappingURL=launch-options.d.ts.map