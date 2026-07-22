import type { CurrencyCode } from '../../../shared';
/**
 * Defines information about the current POS session.
 */
export interface Session {
    /**
     * The shop ID associated with the shop currently logged into POS.
     */
    shopId: number;
    /**
     * The user ID associated with the Shopify account currently authenticated on POS.
     */
    userId: number;
    /**
     * The shop domain associated with the shop currently logged into POS.
     */
    shopDomain: string;
    /**
     * The location ID associated with the POS device's current location.
     */
    locationId: number;
    /**
     * The staff ID of the staff member currently pinned into the POS. This may differ from the user ID if the pinned staff member is different from the logged-in user.
     */
    staffMemberId?: number;
    /**
     * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code associated with the location currently active on POS.
     */
    currency: CurrencyCode;
    /**
     * The version of [the POS app](https://apps.shopify.com/shopify-pos) currently running.
     */
    posVersion: string;
}
//# sourceMappingURL=session.d.ts.map