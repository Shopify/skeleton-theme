import type { RenderExtensionTarget } from '../extension-targets';
import type { PaymentOption, SelectedPaymentOption } from '../api/standard/standard';
/**
 * Returns all available payment options.
 * @publicDocs
 */
export declare function useAvailablePaymentOptions<Target extends RenderExtensionTarget = RenderExtensionTarget>(): PaymentOption[];
/**
 * Returns payment options selected by the buyer.
 * @publicDocs
 */
export declare function useSelectedPaymentOptions<Target extends RenderExtensionTarget = RenderExtensionTarget>(): SelectedPaymentOption[];
//# sourceMappingURL=payment-options.d.ts.map