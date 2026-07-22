/** @publicDocs */
export type RedeemableChangeResult = RedeemableChangeResultSuccess | RedeemableChangeResultError;
/** @publicDocs */
export interface RedeemableChangeResultSuccess {
    /**
     * Indicates that the redeemable change was applied successfully.
     */
    type: 'success';
}
/** @publicDocs */
export interface RedeemableChangeResultError {
    /**
     * Indicates that the redeemable change was not applied successfully.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
/**
 * A key-value pair that represents an attribute of a redeemable payment method.
 * @publicDocs
 */
export interface RedeemableAttribute {
    key: string;
    value: string;
}
/** @publicDocs */
export type RedeemableChange = RedeemableAddChange;
/** @publicDocs */
export interface RedeemableAddChange {
    /**
     * The type of the `RedeemableChange` API.
     */
    type: 'redeemableAddChange';
    /**
     * The redeemable attributes.
     */
    attributes: RedeemableAttribute[];
    /**
     * The identifier used to represent the redeemable (e.g. the gift card code).
     */
    identifier: string;
}
/** @publicDocs */
export interface RedeemableApi {
    /**
     * Applies a redeemable change to add a redeemable payment method.
     */
    applyRedeemableChange(change: RedeemableChange): Promise<RedeemableChangeResult>;
}
//# sourceMappingURL=redeemable.d.ts.map