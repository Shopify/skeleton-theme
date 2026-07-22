import type { MailingAddress } from '../../../checkout';
/**
 * An address object used to auto-populate the address form fields.
 *
 * All fields are optional
 */
export interface AutocompleteAddress extends Pick<MailingAddress, 'address1' | 'address2' | 'city' | 'company' | 'countryCode' | 'provinceCode' | 'zip'> {
    /**
     * The latitude coordinates of the buyer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 43.6556377
     */
    latitude?: number;
    /**
     * The longitude coordinates of the buyer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example -79.38681079999999
     */
    longitude?: number;
}
export interface AddressAutocompleteSuggestion {
    /**
     * The address suggestion text presented to the buyer in the list of autocomplete suggestions.
     *
     * This text is shown to the buyer as-is. No attempts will be made to parse it.
     *
     * @example "123 Main St, Toronto, ON, CA"
     */
    label: string;
    /**
     * A textual identifier that uniquely identifies an autocomplete suggestion
     * or address. This identifier may be used to search for a formatted address.
     *
     * @example "35ef8d55-dceb-4ed8-847b-2f2fc7472f14"
     */
    id?: string;
    /**
     * A list of substrings that matched the original search query.
     *
     * If `matchedSubstrings` are provided, then they will be used to highlight the substrings
     * of the suggestions that matched the original search query.
     *
     * @example [{offset: 0, length: 4}]
     */
    matchedSubstrings?: MatchedSubstring[];
    /**
     * The address object used to auto-populate the remaining address fields.
     *
     * If this value is returned for every suggestion, then the
     * `purchase.address-autocomplete.format-suggestion` extension target is not needed.
     */
    formattedAddress?: AutocompleteAddress;
}
export interface MatchedSubstring {
    /**
     * The start location of the matched substring in the suggestion label text.
     */
    offset: number;
    /**
     * The length of the matched substring in the suggestion label text.
     */
    length: number;
}
//# sourceMappingURL=shared.d.ts.map