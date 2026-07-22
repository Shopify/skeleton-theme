import type { AddressAutocompleteSuggestion, AutocompleteAddress } from './shared';
export interface AddressAutocompleteFormatSuggestionApi {
    /**
     * The autocomplete suggestion that the buyer selected during checkout.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    target: Target;
}
interface Target {
    selectedSuggestion: AddressAutocompleteSuggestion;
}
export interface AddressAutocompleteFormatSuggestionOutput {
    /**
     * The formatted address that will be used to populate the native address fields.
     */
    formattedAddress: AutocompleteAddress;
}
export {};
//# sourceMappingURL=format-suggestion.d.ts.map