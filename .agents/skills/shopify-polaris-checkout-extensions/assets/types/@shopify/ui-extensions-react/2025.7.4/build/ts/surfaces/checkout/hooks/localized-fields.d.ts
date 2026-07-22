import type { LocalizedField, LocalizedFieldKey, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
/**
 * Returns the current localized fields and
 * re-renders your component if the values change.
 */
export declare function useLocalizedFields<Target extends RenderExtensionTarget = RenderExtensionTarget>(keys?: LocalizedFieldKey[]): LocalizedField[];
/**
 * Returns the current localized field or undefined for the specified
 * localized field key and re-renders your component if the value changes.
 */
export declare function useLocalizedField<Target extends RenderExtensionTarget = RenderExtensionTarget>(key: LocalizedFieldKey): LocalizedField | undefined;
//# sourceMappingURL=localized-fields.d.ts.map