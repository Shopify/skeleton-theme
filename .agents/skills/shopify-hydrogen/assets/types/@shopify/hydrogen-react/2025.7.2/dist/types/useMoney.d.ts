import { CurrencyCode as StorefrontApiCurrencyCode, MoneyV2 as StorefrontApiMoneyV2 } from './storefront-api-types.js';
import type { MoneyV2 as CustomerAccountApiMoneyV2, CurrencyCode as CustomerAccountApiCurrencyCode } from './customer-account-api-types.js';
/**
 * Supports MoneyV2 from both Storefront API and Customer Account API.
 * The APIs may have different CurrencyCode enums (e.g., Customer Account API added USDC in 2025-07, but Storefront API doesn't support USDC in 2025-07).
 * This union type ensures useMoney works with data from either API.
 */
type MoneyV2 = StorefrontApiMoneyV2 | CustomerAccountApiMoneyV2;
/**
 * Supports CurrencyCode from both Storefront API and Customer Account API. The APIs may have different CurrencyCode enums (e.g., Customer Account API added USDC in 2025-07, but Storefront API doesn't support USDC in 2025-07).
 * This union type ensures useMoney works with data from either API.
 */
type CurrencyCode = StorefrontApiCurrencyCode | CustomerAccountApiCurrencyCode;
export type UseMoneyValue = {
    /**
     * The currency code from the `MoneyV2` object.
     */
    currencyCode: CurrencyCode;
    /**
     * The name for the currency code, returned by `Intl.NumberFormat`.
     */
    currencyName?: string;
    /**
     * The currency symbol returned by `Intl.NumberFormat`.
     */
    currencySymbol?: string;
    /**
     * The currency narrow symbol returned by `Intl.NumberFormat`.
     */
    currencyNarrowSymbol?: string;
    /**
     * The localized amount, without any currency symbols or non-number types from the `Intl.NumberFormat.formatToParts` parts.
     */
    amount: string;
    /**
     * All parts returned by `Intl.NumberFormat.formatToParts`.
     */
    parts: Intl.NumberFormatPart[];
    /**
     * A string returned by `new Intl.NumberFormat` for the amount and currency code,
     * using the `locale` value in the [`LocalizationProvider` component](https://shopify.dev/api/hydrogen/components/localization/localizationprovider).
     */
    localizedString: string;
    /**
     * The `MoneyV2` object provided as an argument to the hook.
     */
    original: MoneyV2;
    /**
     * A string with trailing zeros removed from the fractional part, if any exist. If there are no trailing zeros, then the fractional part remains.
     * For example, `$640.00` turns into `$640`.
     * `$640.42` remains `$640.42`.
     */
    withoutTrailingZeros: string;
    /**
     * A string without currency and without trailing zeros removed from the fractional part, if any exist. If there are no trailing zeros, then the fractional part remains.
     * For example, `$640.00` turns into `640`.
     * `$640.42` turns into `640.42`.
     */
    withoutTrailingZerosAndCurrency: string;
};
/**
 * The `useMoney` hook takes a [MoneyV2 object from the Storefront API](https://shopify.dev/docs/api/storefront/2025-07/objects/MoneyV2)
 * or a [MoneyV2 object from the Customer Account API](https://shopify.dev/docs/api/customer/2025-07/objects/moneyv2) and returns a
 * default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
 * [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
 * Uses `locale` from `ShopifyProvider`
 * &nbsp;
 * @see {@link https://shopify.dev/api/hydrogen/hooks/usemoney}
 * @example initialize the money object
 * ```ts
 * const money = useMoney({
 *   amount: '100.00',
 *   currencyCode: 'USD'
 * })
 * ```
 * &nbsp;
 *
 * @example basic usage, outputs: $100.00
 * ```ts
 * money.localizedString
 * ```
 * &nbsp;
 *
 * @example without currency, outputs: 100.00
 * ```ts
 * money.amount
 * ```
 * &nbsp;
 *
 * @example without trailing zeros, outputs: $100
 * ```ts
 * money.withoutTrailingZeros
 * ```
 * &nbsp;
 *
 * @example currency name, outputs: US dollars
 * ```ts
 * money.currencyCode
 * ```
 * &nbsp;
 *
 * @example currency symbol, outputs: $
 * ```ts
 * money.currencySymbol
 * ```
 * &nbsp;
 *
 * @example without currency and without trailing zeros, outputs: 100
 * ```ts
 * money.withoutTrailingZerosAndCurrency
 * ```
 */
export declare function useMoney(money: MoneyV2): UseMoneyValue;
export {};
