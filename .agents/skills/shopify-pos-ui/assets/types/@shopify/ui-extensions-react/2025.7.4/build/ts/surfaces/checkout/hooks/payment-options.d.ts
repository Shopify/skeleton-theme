import type { RenderExtensionTarget, PaymentOption, SelectedPaymentOption } from '@shopify/ui-extensions/checkout';
/**
 * Returns all available payment options.
 */
export declare function useAvailablePaymentOptions<Target extends RenderExtensionTarget = RenderExtensionTarget>(): PaymentOption[];
/**
 * Returns payment options selected by the buyer.
 */
export declare function useSelectedPaymentOptions<Target extends RenderExtensionTarget = RenderExtensionTarget>(): SelectedPaymentOption[];
//# sourceMappingURL=payment-options.d.ts.map