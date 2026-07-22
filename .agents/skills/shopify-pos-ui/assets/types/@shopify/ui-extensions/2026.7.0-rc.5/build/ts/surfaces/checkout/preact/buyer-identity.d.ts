import type { Customer, PurchasingCompany } from '../api/standard/standard';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the current `Customer`.
 *
 * The value is `undefined` if the buyer isn't a known customer for this shop or if they haven't logged in yet.
 * @publicDocs
 */
export declare function useCustomer<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Customer | undefined;
/**
 * Returns the email address of the buyer that is interacting with the cart.
 * The value is `undefined` if the app does not have access to customer data.
 * @publicDocs
 */
export declare function useEmail<Target extends RenderExtensionTarget = RenderExtensionTarget>(): string | undefined;
/**
 * Returns the phone number of the buyer that is interacting with the cart.
 * The value is `undefined` if the app does not have access to customer data.
 * @publicDocs
 */
export declare function usePhone<Target extends RenderExtensionTarget = RenderExtensionTarget>(): string | undefined;
/**
 * Provides information about the company and its location that the business customer
 * is purchasing on behalf of during a B2B checkout. It includes details that can be utilized to
 * identify both the company and its corresponding location to which the business customer belongs.
 *
 * The value is `undefined` if a business customer isn't logged in. This function throws an error if the app doesn't have access to customer data.
 * @publicDocs
 */
export declare function usePurchasingCompany<Target extends RenderExtensionTarget = RenderExtensionTarget>(): PurchasingCompany | undefined;
//# sourceMappingURL=buyer-identity.d.ts.map