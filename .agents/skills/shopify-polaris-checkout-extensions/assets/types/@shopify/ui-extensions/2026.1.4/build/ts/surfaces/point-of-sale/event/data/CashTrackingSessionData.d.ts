import { BaseData } from './BaseData';
import { BaseApi } from './BaseApi';
/**
 * The data object provided to cash tracking session start extension targets. Contains information about a newly opened cash tracking session along with device and session context.
 */
export interface CashTrackingSessionStartData extends BaseData, BaseApi {
    /**
     * The cash tracking session start data containing the session identifier and the time when the session began. Cash tracking sessions represent the period during which a cash drawer is open and being used for transactions, typically corresponding to a staff member's shift.
     */
    cashTrackingSessionStart: {
        /**
         * The unique numeric identifier for this cash tracking session. This ID distinguishes this session from other cash tracking sessions and can be used for session-specific operations, reporting, or linking transactions to sessions. The ID is assigned when the session opens and remains constant until the session closes.
         */
        id: number;
        /**
         * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the cash tracking session was opened and cash drawer operations began (for example, `"2024-05-15T09:00:00Z"`). This marks the start of the staff member's shift or cash handling period. Commonly used for calculating session duration, shift reporting, or determining which transactions belong to which session.
         */
        openingTime: string;
    };
}
/**
 * The data object provided to cash tracking session complete extension targets. Contains information about a completed cash tracking session including when it opened and closed, along with device and session context.
 */
export interface CashTrackingSessionCompleteData extends BaseData, BaseApi {
    /**
     * The cash tracking session complete data containing the session identifier, opening time, and closing time. This represents the full lifecycle of a cash drawer session from opening to closing.
     */
    cashTrackingSessionComplete: {
        /**
         * The unique numeric identifier for this cash tracking session. This ID matches the ID from when the session was opened and can be used to correlate session start and end events, retrieve session-specific data, or link all transactions that occurred during this session.
         */
        id: number;
        /**
         * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the cash tracking session was opened and began (for example, `"2024-05-15T09:00:00Z"`). This marks the start of the session and can be compared with `closingTime` to calculate the total session duration or shift length.
         */
        openingTime: string;
        /**
         * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the cash tracking session was closed and ended (for example, `"2024-05-15T17:30:00Z"`). This marks when the staff member completed their shift, closed out the cash drawer, and finalized the session. The time between `openingTime` and `closingTime` represents the active session duration. Commonly used for shift reporting, calculating hours worked, or determining the timeframe for session-specific transactions.
         */
        closingTime: string;
    };
}
//# sourceMappingURL=CashTrackingSessionData.d.ts.map