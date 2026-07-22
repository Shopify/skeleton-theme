import type { TransactionCompleteEvent } from './events/transaction-complete-event';
import type { CashTrackingSessionStartEvent, CashTrackingSessionCompleteEvent } from './events/cash-tracking-session-events';
/**
 * Canonical event-name constants for POS host events. Prefer these over string
 * literals when calling `shopify.addEventListener` / `removeEventListener`.
 *
 * @publicDocs
 */
export declare const POS_EVENT_NAMES: {
    readonly TRANSACTION_COMPLETE: "transactioncomplete";
    readonly CASH_TRACKING_SESSION_START: "cashtrackingsessionstart";
    readonly CASH_TRACKING_SESSION_COMPLETE: "cashtrackingsessioncomplete";
};
/**
 * Maps Shopify POS event names to their corresponding `Event` subclass types.
 *
 * Used as the generic type parameter for `shopify.addEventListener` and
 * `shopify.removeEventListener`.
 *
 * @publicDocs
 */
export interface ShopifyEventMap {
    [POS_EVENT_NAMES.TRANSACTION_COMPLETE]: TransactionCompleteEvent;
    [POS_EVENT_NAMES.CASH_TRACKING_SESSION_START]: CashTrackingSessionStartEvent;
    [POS_EVENT_NAMES.CASH_TRACKING_SESSION_COMPLETE]: CashTrackingSessionCompleteEvent;
}
export type { TransactionCompleteEvent, CashTrackingSessionStartEvent, CashTrackingSessionCompleteEvent, };
//# sourceMappingURL=events.d.ts.map