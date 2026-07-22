/** Minimal representation of a Shopify product variant as serialised by `{{ product | json }}`. */
export interface ProductVariant {
  id: number;
  title: string;
  price: number;
  available: boolean;
  options: string[];
  featured_media: { id: number } | null;
}

/** Minimal representation of a Shopify product as serialised by `{{ product | json }}`. */
export interface ProductData {
  id: number;
  variants: ProductVariant[];
}

/**
 * Returns the first variant whose options exactly match `selectedOptions`.
 *
 * @param variants        - Full list of product variants.
 * @param selectedOptions - Currently selected value for each option position (0-indexed).
 * @returns The matching variant, or `undefined` if none found.
 */
export function findVariantByOptions(
  variants: ProductVariant[],
  selectedOptions: string[],
): ProductVariant | undefined {
  return variants.find(v => v.options.every((opt, i) => opt === selectedOptions[i]));
}

/**
 * Returns the set of option values that are available for `targetPosition`,
 * given the currently selected values for all other positions.
 *
 * @param variants        - Full list of product variants.
 * @param selectedOptions - Currently selected value for each option position (0-indexed).
 * @param targetPosition  - The option index (0-indexed) to evaluate.
 * @returns A `Set` of available string values for that position.
 */
export function getAvailableValues(
  variants: ProductVariant[],
  selectedOptions: string[],
  targetPosition: number,
): Set<string> {
  return new Set(
    variants
      .filter(v => v.options.every((opt, i) => i === targetPosition || opt === selectedOptions[i]))
      .filter(v => v.available)
      .map(v => v.options[targetPosition]),
  );
}
