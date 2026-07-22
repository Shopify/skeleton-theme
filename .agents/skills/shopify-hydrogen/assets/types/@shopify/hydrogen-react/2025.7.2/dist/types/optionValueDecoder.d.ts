/**
 * This file provides utility functions for determining whether or not an option value combination is present in an encoded option value string.
 *
 * In V1 of the encoding strategy, option value arrays are encoded as a trie with the following rules:
 *  - `:` `,` ` ` and `-` are control characters.
 *  - `:` indicates a new option. ex: 0:1 indicates value 0 for the option in position 1, value 1 for the option in position 2.
 *  - `,` indicates the end of a repeated prefix, mulitple consecutive commas indicate the end of multiple repeated prefixes.
 *  - ` ` indicates a gap in the sequence of option values. ex: `0 4` indicates option values in position 0 and 4 are present.
 *  - `-` indicates a continuous range of option values. ex: `0 1-3 4`. Ranges are only present encoded in the final option value position, so for example the trie for the set [[0,0,0],[0,0,1], ..., [0,2,2]] will be structured as `0:0:0-2,1:0-2,2:0-2`, not `0:0-2:0-2`.
 */
import { Product } from './storefront-api-types.js';
export type IsOptionValueCombinationInEncodedVariant = (targetOptionValueCombination: number[], encodedVariantField: string) => boolean;
/**
 * Determine whether an option value combination is present in an encoded option value string. Function is memoized by encodedVariantField.
 *
 * @param targetOptionValueCombination - Indices of option values to look up in the encoded option value string. A partial set of indices may be passed to determine whether a node or any children is present. For example, if a product has 3 options, passing [0] will return true if any option value combination for the first option's option value is present in the encoded string.
 * @param encodedVariantField - Encoded option value string from the Storefront API, e.g. [product.encodedVariantExistence](/docs/api/storefront/2025-07/objects/Product#field-encodedvariantexistence) or [product.encodedVariantAvailability](/docs/api/storefront/2025-07/objects/Product#field-encodedvariantavailability)
 * @returns - True if a full or partial targetOptionValueIndices is present in the encoded option value string, false otherwise.
 */
export declare const isOptionValueCombinationInEncodedVariant: IsOptionValueCombinationInEncodedVariant;
type EncodedVariantField = Product['encodedVariantAvailability'] | Product['encodedVariantExistence'];
type DecodedOptionValues = number[][];
/**
 * For an encoded option value string, decode into option value combinations. Entries represent a valid combination formatted as an array of option value positions.
 * @param encodedVariantField - Encoded option value string from the Storefront API, e.g. [product.encodedVariantExistence](/docs/api/storefront/2025-07/objects/Product#field-encodedvariantexistence) or [product.encodedVariantAvailability](/docs/api/storefront/2025-07/objects/Product#field-encodedvariantavailability)
 * @returns Decoded option value combinations
 */
export declare function decodeEncodedVariant(encodedVariantField: EncodedVariantField): DecodedOptionValues;
export {};
