import { type ReactNode } from 'react';
import type { MoneyV2 as StorefrontApiMoneyV2, UnitPriceMeasurement } from './storefront-api-types.js';
import type { MoneyV2 as CustomerAccountApiMoneyV2 } from './customer-account-api-types.js';
import type { PartialDeep } from 'type-fest';
/**
 * Supports MoneyV2 from both Storefront API and Customer Account API.
 * The APIs may have different CurrencyCode enums (e.g., Customer Account API added USDC in 2025-07, but Storefront API doesn't support USDC in 2025-07).
 * This union type ensures Money component works with data from either API.
 */
type MoneyV2 = StorefrontApiMoneyV2 | CustomerAccountApiMoneyV2;
export interface MoneyPropsBase<ComponentGeneric extends React.ElementType> {
    /** An HTML tag or React Component to be rendered as the base element wrapper. The default is `div`. */
    as?: ComponentGeneric;
    /** An object with fields that correspond to the [Storefront API's MoneyV2 object](https://shopify.dev/docs/api/storefront/2025-07/objects/MoneyV2) or [Customer Account API's MoneyV2 object](https://shopify.dev/docs/api/customer/2025-07/objects/moneyv2). */
    data: PartialDeep<MoneyV2, {
        recurseIntoArrays: true;
    }>;
    /** Whether to remove the currency symbol from the output. */
    withoutCurrency?: boolean;
    /** Whether to remove trailing zeros (fractional money) from the output. */
    withoutTrailingZeros?: boolean;
    /** A [UnitPriceMeasurement object](https://shopify.dev/api/storefront/2025-07/objects/unitpricemeasurement). */
    measurement?: PartialDeep<UnitPriceMeasurement, {
        recurseIntoArrays: true;
    }>;
    /** Customizes the separator between the money output and the measurement output. Used with the `measurement` prop. Defaults to `'/'`. */
    measurementSeparator?: ReactNode;
}
export type MoneyProps<ComponentGeneric extends React.ElementType> = MoneyPropsBase<ComponentGeneric> & (ComponentGeneric extends keyof React.JSX.IntrinsicElements ? Omit<React.ComponentPropsWithoutRef<ComponentGeneric>, keyof MoneyPropsBase<ComponentGeneric>> : React.ComponentPropsWithoutRef<ComponentGeneric>);
/**
 * The `Money` component renders a string of the [Storefront API's MoneyV2 object](https://shopify.dev/docs/api/storefront/2025-07/objects/MoneyV2)
 * or the [Customer Account API's MoneyV2 object](https://shopify.dev/docs/api/customer/2025-07/objects/moneyv2)
 * according to the `locale` in the `ShopifyProvider` component.
 * &nbsp;
 * @see {@link https://shopify.dev/api/hydrogen/components/money}
 * @example basic usage, outputs: $100.00
 * ```ts
 * <Money data={{amount: '100.00', currencyCode: 'USD'}} />
 * ```
 * &nbsp;
 *
 * @example without currency, outputs: 100.00
 * ```ts
 * <Money data={{amount: '100.00', currencyCode: 'USD'}} withoutCurrency />
 * ```
 * &nbsp;
 *
 * @example without trailing zeros, outputs: $100
 * ```ts
 * <Money data={{amount: '100.00', currencyCode: 'USD'}} withoutTrailingZeros />
 * ```
 * &nbsp;
 *
 * @example with per-unit measurement, outputs: $100.00 per G
 * ```ts
 * <Money
 *   data={{amount: '100.00', currencyCode: 'USD'}}
 *   measurement={{referenceUnit: 'G'}}
 *   measurementSeparator=" per "
 * />
 * ```
 */
export declare function Money<ComponentGeneric extends React.ElementType = 'div'>({ data, as, withoutCurrency, withoutTrailingZeros, measurement, measurementSeparator, ...passthroughProps }: MoneyProps<ComponentGeneric>): JSX.Element;
export {};
