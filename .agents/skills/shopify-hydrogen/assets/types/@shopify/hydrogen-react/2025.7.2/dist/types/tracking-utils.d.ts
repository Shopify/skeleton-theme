/** Storefront API header for VisitToken */
export declare const SHOPIFY_VISIT_TOKEN_HEADER = "X-Shopify-VisitToken";
/** Storefront API header for UniqueToken */
export declare const SHOPIFY_UNIQUE_TOKEN_HEADER = "X-Shopify-UniqueToken";
type TrackingValues = {
    /** Identifier for the unique user. Equivalent to the deprecated _shopify_y cookie */
    uniqueToken: string;
    /** Identifier for the current visit. Equivalent to the deprecated _shopify_s cookie */
    visitToken: string;
    /** Represents the consent given by the user or the default region consent configured in Admin */
    consent: string;
};
export declare const cachedTrackingValues: {
    current: null | TrackingValues;
};
/**
 * Retrieves user session tracking values for analytics
 * and marketing from the browser environment.
 */
export declare function getTrackingValues(): TrackingValues;
export {};
