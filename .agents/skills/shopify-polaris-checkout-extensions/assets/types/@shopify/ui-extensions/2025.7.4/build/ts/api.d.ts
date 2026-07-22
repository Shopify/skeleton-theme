/**
 * This defines the i18n.translate() signature.
 */
export interface I18nTranslate {
    /**
     * This returns a translated string matching a key in a locale file.
     *
     * @example translate("banner.title")
     */
    <ReplacementType = string>(key: string, options?: Record<string, ReplacementType | string | number>): ReplacementType extends string | number ? string : (string | ReplacementType)[];
}
export interface I18n {
    /**
     * Returns a localized number.
     *
     * This function behaves like the standard `Intl.NumberFormat()`
     * with a style of `decimal` applied. It uses the buyer's locale by default.
     *
     * @param options.inExtensionLocale - if true, use the extension's locale
     */
    formatNumber: (number: number | bigint, options?: {
        inExtensionLocale?: boolean;
    } & Intl.NumberFormatOptions) => string;
    /**
     * Returns a localized currency value.
     *
     * This function behaves like the standard `Intl.NumberFormat()`
     * with a style of `currency` applied. It uses the buyer's locale by default.
     *
     * @param options.inExtensionLocale - if true, use the extension's locale
     */
    formatCurrency: (number: number | bigint, options?: {
        inExtensionLocale?: boolean;
    } & Intl.NumberFormatOptions) => string;
    /**
     * Returns a localized date value.
     *
     * This function behaves like the standard `Intl.DateTimeFormatOptions()` and uses
     * the buyer's locale by default. Formatting options can be passed in as
     * options.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat0
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
     *
     * @param options.inExtensionLocale - if true, use the extension's locale
     */
    formatDate: (date: Date, options?: {
        inExtensionLocale?: boolean;
    } & Intl.DateTimeFormatOptions) => string;
    /**
     * Returns translated content in the buyer's locale,
     * as supported by the extension.
     *
     * - `options.count` is a special numeric value used in pluralization.
     * - The other option keys and values are treated as replacements for interpolation.
     * - If the replacements are all primitives, then `translate()` returns a single string.
     * - If replacements contain UI components, then `translate()` returns an array of elements.
     */
    translate: I18nTranslate;
}
//# sourceMappingURL=api.d.ts.map