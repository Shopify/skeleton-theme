import type { RenderExtensionTarget, Interceptor, BuyerJourney, BuyerJourneyStep } from '@shopify/ui-extensions/checkout';
/**
 * Returns the `buyerJourney` details on buyer progression in checkout.
 */
export declare function useBuyerJourney<Target extends RenderExtensionTarget = RenderExtensionTarget>(): BuyerJourney;
/**
 * Returns true if the buyer completed submitting their order.
 *
 * For example, when viewing the **Order status** page after submitting payment, the buyer will have completed their order.
 */
export declare function useBuyerJourneyCompleted<Target extends RenderExtensionTarget = RenderExtensionTarget>(): boolean;
/**
 * Installs a function for intercepting and preventing progress on checkout.
 *
 * To block checkout progress, you must set the [block_progress](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#block-progress)
 * capability in your extension's configuration.
 *
 * If you do, then you're expected to inform the buyer why navigation was blocked,
 * either by passing validation errors to the checkout UI or rendering the errors in your extension.
 *
 * `useBuyerJourneyIntercept()` should be called at the top level of the extension,
 * not within an embedded or child component, to avoid errors should the child component get destroyed.
 */
export declare function useBuyerJourneyIntercept<Target extends RenderExtensionTarget = RenderExtensionTarget>(interceptor: Interceptor): void;
/**
 * Returns all possible steps a buyer can take to complete the checkout. These steps may vary depending on the type of checkout or the shop's configuration.
 */
export declare function useBuyerJourneySteps<Target extends RenderExtensionTarget = RenderExtensionTarget>(): BuyerJourneyStep[];
/**
 * Returns the buyer journey step that the buyer is currently on.
 */
export declare function useBuyerJourneyActiveStep<Target extends RenderExtensionTarget = RenderExtensionTarget>(): BuyerJourneyStep | undefined;
//# sourceMappingURL=buyer-journey.d.ts.map