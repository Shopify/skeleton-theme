import type { ReadonlySignalLike } from '../../../../shared';
/**
 * The `LocaleApi` object provides access to current locale information and change notifications. Access these properties through `api.locale` to retrieve and monitor locale data.
 *
 * @publicDocs
 */
export interface LocaleApiContent {
    /**
     * Provides read-only access to the current IETF-formatted locale and allows subscribing to locale changes. The `value` property provides the current locale, and `subscribe` allows listening to changes. Use for internationalization, locale-specific formatting, and reactive updates when merchants change language settings.
     */
    current: ReadonlySignalLike<string>;
}
/**
 * The `LocaleApi` object provides access to current locale information and change notifications. Access these properties through `shopify.locale` to retrieve and monitor locale data.
 */
export interface LocaleApi {
    locale: LocaleApiContent;
}
//# sourceMappingURL=locale-api.d.ts.map