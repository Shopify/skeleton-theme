import type { Session } from '../../../types/session';
export interface SessionApiContent {
    /**
     * Provides comprehensive information about the current POS session including shop details, user authentication, location data, staff member information, currency settings, and POS version. This data is static for the duration of the session and updates when users switch locations or staff members change.
     */
    currentSession: Session;
    /**
     * Generates a fresh session token for secure communication with your app's backend service. Returns `undefined` when the authenticated user lacks proper app permissions. The token is a Shopify OpenID Connect ID Token that should be used in `Authorization` headers for backend API calls. This is based on the authenticated user, not the pinned staff member.
     */
    getSessionToken: () => Promise<string | undefined>;
}
/**
 * The `SessionApi` object provides access to current session information and authentication methods. Access these properties and methods through `shopify.session` to retrieve shop data and generate secure tokens. These methods enable secure API calls while maintaining user privacy and [app permissions](https://help.shopify.com/manual/your-account/users/roles/permissions/store-permissions#apps-and-channels-permissions).
 */
export interface SessionApi {
    session: SessionApiContent;
}
//# sourceMappingURL=session-api.d.ts.map