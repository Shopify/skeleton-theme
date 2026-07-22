import type { Session } from '../../types/session';
/**
 * The `SessionApi` object provides session details and authentication methods.
 * @publicDocs
 */
export interface SessionApiContent {
    /**
     * Provides comprehensive information about the current POS session including shop details, user authentication, location data, staff member information, currency settings, and POS version. This data is static for the duration of the session and updates when users switch locations or staff members change.
     */
    currentSession: Session;
    /**
     * Generates a fresh session token for secure communication with your app's backend service. Returns `undefined` when the authenticated user lacks proper app permissions. The token is a Shopify OpenID Connect ID Token that should be used in `Authorization` headers for backend API calls. This is based on the authenticated user, not the pinned staff member.
     */
    getSessionToken: () => Promise<string | undefined>;
    /**
     * The numeric ID of the device running this session.
     *
     * Use this to construct a [GID](https://shopify.dev/docs/api/pos-ui-extensions/latest/target-apis/platform-apis/device-api) to query device details via GraphQL Admin API.
     *
     * @example 123456
     * @see [Global IDs documentation](https://shopify.dev/docs/api/usage/gids) for more about GID format and structure
     * @see [device.getDeviceId()](https://shopify.dev/docs/api/pos-ui-extensions/latest/target-apis/platform-apis/device-api) for physical device identifier (UUID format)
     */
    deviceId: number;
}
/**
 * The `SessionApi` object provides access to current session information and authentication methods. Access these properties and methods through `shopify.session` to retrieve shop data and generate secure tokens. These methods enable secure API calls while maintaining user privacy and [app permissions](https://help.shopify.com/manual/your-account/users/roles/permissions/store-permissions#apps-and-channels-permissions).
 * @publicDocs
 */
export interface SessionApi {
    session: SessionApiContent;
}
//# sourceMappingURL=session-api.d.ts.map