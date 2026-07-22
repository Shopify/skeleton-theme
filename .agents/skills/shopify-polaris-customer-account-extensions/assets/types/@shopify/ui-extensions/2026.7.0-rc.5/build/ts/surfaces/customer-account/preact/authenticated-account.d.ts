import type { RenderExtensionTarget } from '../extension-targets';
import type { Customer, PurchasingCompany } from '../api';
/**
 * Returns the current authenticated `Customer`.
 *
 * The value is `undefined` if the customer isn't authenticated.
 */
export declare function useAuthenticatedAccountCustomer<Target extends RenderExtensionTarget>(): Customer | undefined;
/**
 * Provides information about the company of the authenticated business customer.
 * The value is `undefined` if a business customer isn't authenticated.
 */
export declare function useAuthenticatedAccountPurchasingCompany<Target extends RenderExtensionTarget>(): PurchasingCompany | undefined;
//# sourceMappingURL=authenticated-account.d.ts.map