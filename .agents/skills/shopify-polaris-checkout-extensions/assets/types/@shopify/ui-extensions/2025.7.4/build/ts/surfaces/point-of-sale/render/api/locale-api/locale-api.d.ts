import type { RemoteSubscribable } from '@remote-ui/async-subscription';
export interface LocaleApiContent {
    /**
     * Provides the current IETF-formatted locale (for example, `"en-US"`) and allows you to subscribe to locale changes. Supports only one subscription at a time. To enable multiple subscriptions, use `makeStatefulSubscribable` on the `RemoteSubscribable` object. Using `makeStatefulSubscribable` or related hooks counts as an active subscription.
     */
    subscribable: RemoteSubscribable<string>;
}
/**
 * The `LocaleApi` object provides access to current locale information and change notifications. Access these properties through `api.locale` to retrieve and monitor locale data.
 */
export interface LocaleApi {
    locale: LocaleApiContent;
}
//# sourceMappingURL=locale-api.d.ts.map