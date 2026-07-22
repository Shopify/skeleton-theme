import type { LocalizedField } from '../api/standard/standard';
import type { LocalizedFieldKey } from '../../../shared';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the current localized fields and
 * re-renders your component if the values change.
 * @publicDocs
 */
export declare function useLocalizedFields<Target extends RenderExtensionTarget = RenderExtensionTarget>(keys?: LocalizedFieldKey[]): LocalizedField[];
/**
 * Returns the current localized field or undefined for the specified
 * localized field key and re-renders your component if the value changes.
 *
 * Returns `undefined` when no field is configured for the buyer's country.
 * @publicDocs
 */
export declare function useLocalizedField<Target extends RenderExtensionTarget = RenderExtensionTarget>(key: LocalizedFieldKey): LocalizedField | undefined;
//# sourceMappingURL=localized-fields.d.ts.map