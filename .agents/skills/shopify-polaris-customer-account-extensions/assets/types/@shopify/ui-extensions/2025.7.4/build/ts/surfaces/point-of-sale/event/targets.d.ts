import { BaseOutput } from '../output';
import { CashTrackingSessionStartData, CashTrackingSessionCompleteData } from './data/CashTrackingSessionData';
import { TransactionCompleteData } from './data/TransactionCompleteData';
import { CartUpdateEventData } from './data/CartUpdateEventData';
export interface EventExtensionTargets {
    'pos.transaction-complete.event.observe': (data: TransactionCompleteData) => Promise<BaseOutput>;
    'pos.cash-tracking-session-start.event.observe': (data: CashTrackingSessionStartData) => Promise<BaseOutput>;
    'pos.cash-tracking-session-complete.event.observe': (data: CashTrackingSessionCompleteData) => Promise<BaseOutput>;
    'pos.cart-update.event.observe': (data: CartUpdateEventData) => Promise<BaseOutput>;
}
export type EventExtensionTarget = keyof EventExtensionTargets;
//# sourceMappingURL=targets.d.ts.map