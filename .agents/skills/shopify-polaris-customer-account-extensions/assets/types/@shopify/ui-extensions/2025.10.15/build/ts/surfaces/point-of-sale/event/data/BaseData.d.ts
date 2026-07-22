import type { ConnectivityState, Device, Session } from '../../../point-of-sale';
/**
 * Base data object provided to all extension targets containing device information, session context, and connectivity state. This data is available at extension initialization and provides essential context about the runtime environment.
 */
export interface BaseData {
    /**
     * The current Internet connectivity state of the POS device. Indicates whether the device is connected to or disconnected from the Internet. This state updates in real-time as connectivity changes, allowing extensions to adapt behavior for offline scenarios, show connectivity warnings, or queue operations for when connectivity is restored.
     */
    connectivity: ConnectivityState;
    /**
     * Comprehensive information about the physical POS device where the extension is currently running. Includes the device name, unique device ID, and form factor information (tablet vs other). This data is static for the session and helps extensions adapt to different device types, log device-specific information, or implement device-based configurations.
     */
    device: Device;
    /**
     * The [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) locale string for the current POS session (for example, `"en-US"`, `"fr-CA"`, `"de-DE"`). This indicates the merchant's language and regional preferences. Commonly used for internationalization (i18n), locale-specific date/time/number formatting, translating UI text, and providing localized content. The locale remains constant for the session and reflects the language selected in POS settings.
     */
    locale: string;
    /**
     * Comprehensive information about the current POS session including shop ID and domain, authenticated user, pinned staff member, active location, currency settings, and POS version. This session data remains constant for the session duration and provides critical context for business logic, permissions, API authentication, and transaction processing. Session data updates when users switch locations or change pinned staff members.
     */
    session: Session;
}
//# sourceMappingURL=BaseData.d.ts.map