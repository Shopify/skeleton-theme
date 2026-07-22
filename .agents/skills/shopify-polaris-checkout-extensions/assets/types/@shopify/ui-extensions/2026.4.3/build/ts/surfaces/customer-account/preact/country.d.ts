import { Country } from '../api';
import { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the country associated with either the current order on the order status page
 * or the selected country in the customer account interface,
 * and automatically re-renders your component if the country changes.
 */
export declare function useLocalizationCountry<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Country | undefined;
//# sourceMappingURL=country.d.ts.map