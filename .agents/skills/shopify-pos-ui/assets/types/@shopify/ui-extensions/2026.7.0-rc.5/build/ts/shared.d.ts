/**
 * The supported GraphQL Admin API versions. Use this to specify which API version your GraphQL queries should execute against. Each version includes specific features, bug fixes, and breaking changes. The `unstable` version provides access to the latest features but may change without notice.
 */
export type ApiVersion = '2023-04' | '2023-07' | '2023-10' | '2024-01' | '2024-04' | '2024-07' | '2024-10' | '2025-01' | '2025-04' | 'unstable' | '2025-07' | '2025-10' | '2026-01' | '2026-04' | '2026-07';
/**
 * The capabilities an extension has access to.
 *
 * * `api_access`: The extension can access the Storefront API.
 *
 * * `network_access`: The extension can make external network calls.
 *
 * * `block_progress`: The extension can block a buyer's progress and the merchant has allowed this blocking behavior.
 *
 * * `collect_buyer_consent.sms_marketing`: The extension can collect buyer consent for SMS marketing.
 *
 * * `collect_buyer_consent.customer_privacy`: The extension can register buyer consent decisions that will be honored on Shopify-managed services.
 *
 * * `iframe.sources`: The extension can embed an external URL in an iframe.
 */
export type Capability = 'api_access' | 'network_access' | 'block_progress' | 'collect_buyer_consent.sms_marketing' | 'collect_buyer_consent.customer_privacy' | 'iframe.sources';
export type CurrencyCode = 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' | 'BAM' | 'BBD' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BOV' | 'BRL' | 'BSD' | 'BTN' | 'BWP' | 'BYN' | 'BZD' | 'CAD' | 'CDF' | 'CHE' | 'CHF' | 'CHW' | 'CLF' | 'CLP' | 'CNY' | 'COP' | 'COU' | 'CRC' | 'CUC' | 'CUP' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DZD' | 'EGP' | 'ERN' | 'ETB' | 'EUR' | 'FJD' | 'FKP' | 'GBP' | 'GEL' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HKD' | 'HNL' | 'HRK' | 'HTG' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KGS' | 'KHR' | 'KMF' | 'KPW' | 'KRW' | 'KWD' | 'KYD' | 'KZT' | 'LAK' | 'LBP' | 'LKR' | 'LRD' | 'LSL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MNT' | 'MOP' | 'MRU' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MXV' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLL' | 'SOS' | 'SRD' | 'SSP' | 'STN' | 'SVC' | 'SYP' | 'SZL' | 'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'USD' | 'USN' | 'UYI' | 'UYU' | 'UYW' | 'UZS' | 'VES' | 'VND' | 'VUV' | 'WST' | 'XAF' | 'XAG' | 'XAU' | 'XBA' | 'XBB' | 'XBC' | 'XBD' | 'XCD' | 'XDR' | 'XOF' | 'XPD' | 'XPF' | 'XPT' | 'XSU' | 'XTS' | 'XUA' | 'XXX' | 'YER' | 'ZAR' | 'ZMW' | 'ZWL';
export type Timezone = 'Africa/Abidjan' | 'Africa/Algiers' | 'Africa/Bissau' | 'Africa/Cairo' | 'Africa/Casablanca' | 'Africa/Ceuta' | 'Africa/El_Aaiun' | 'Africa/Johannesburg' | 'Africa/Juba' | 'Africa/Khartoum' | 'Africa/Lagos' | 'Africa/Maputo' | 'Africa/Monrovia' | 'Africa/Nairobi' | 'Africa/Ndjamena' | 'Africa/Sao_Tome' | 'Africa/Tripoli' | 'Africa/Tunis' | 'Africa/Windhoek' | 'America/Adak' | 'America/Anchorage' | 'America/Araguaina' | 'America/Argentina/Buenos_Aires' | 'America/Argentina/Catamarca' | 'America/Argentina/Cordoba' | 'America/Argentina/Jujuy' | 'America/Argentina/La_Rioja' | 'America/Argentina/Mendoza' | 'America/Argentina/Rio_Gallegos' | 'America/Argentina/Salta' | 'America/Argentina/San_Juan' | 'America/Argentina/San_Luis' | 'America/Argentina/Tucuman' | 'America/Argentina/Ushuaia' | 'America/Asuncion' | 'America/Bahia' | 'America/Bahia_Banderas' | 'America/Barbados' | 'America/Belem' | 'America/Belize' | 'America/Boa_Vista' | 'America/Bogota' | 'America/Boise' | 'America/Cambridge_Bay' | 'America/Campo_Grande' | 'America/Cancun' | 'America/Caracas' | 'America/Cayenne' | 'America/Chicago' | 'America/Chihuahua' | 'America/Costa_Rica' | 'America/Cuiaba' | 'America/Danmarkshavn' | 'America/Dawson' | 'America/Dawson_Creek' | 'America/Denver' | 'America/Detroit' | 'America/Edmonton' | 'America/Eirunepe' | 'America/El_Salvador' | 'America/Fort_Nelson' | 'America/Fortaleza' | 'America/Glace_Bay' | 'America/Goose_Bay' | 'America/Grand_Turk' | 'America/Guatemala' | 'America/Guayaquil' | 'America/Guyana' | 'America/Halifax' | 'America/Havana' | 'America/Hermosillo' | 'America/Indiana/Indianapolis' | 'America/Indiana/Knox' | 'America/Indiana/Marengo' | 'America/Indiana/Petersburg' | 'America/Indiana/Tell_City' | 'America/Indiana/Vevay' | 'America/Indiana/Vincennes' | 'America/Indiana/Winamac' | 'America/Inuvik' | 'America/Iqaluit' | 'America/Jamaica' | 'America/Juneau' | 'America/Kentucky/Louisville' | 'America/Kentucky/Monticello' | 'America/La_Paz' | 'America/Lima' | 'America/Los_Angeles' | 'America/Maceio' | 'America/Managua' | 'America/Manaus' | 'America/Martinique' | 'America/Matamoros' | 'America/Mazatlan' | 'America/Menominee' | 'America/Merida' | 'America/Metlakatla' | 'America/Mexico_City' | 'America/Miquelon' | 'America/Moncton' | 'America/Monterrey' | 'America/Montevideo' | 'America/New_York' | 'America/Nipigon' | 'America/Nome' | 'America/Noronha' | 'America/North_Dakota/Beulah' | 'America/North_Dakota/Center' | 'America/North_Dakota/New_Salem' | 'America/Nuuk' | 'America/Ojinaga' | 'America/Panama' | 'America/Pangnirtung' | 'America/Paramaribo' | 'America/Phoenix' | 'America/Port-au-Prince' | 'America/Porto_Velho' | 'America/Puerto_Rico' | 'America/Punta_Arenas' | 'America/Rainy_River' | 'America/Rankin_Inlet' | 'America/Recife' | 'America/Regina' | 'America/Resolute' | 'America/Rio_Branco' | 'America/Santarem' | 'America/Santiago' | 'America/Santo_Domingo' | 'America/Sao_Paulo' | 'America/Scoresbysund' | 'America/Sitka' | 'America/St_Johns' | 'America/Swift_Current' | 'America/Tegucigalpa' | 'America/Thule' | 'America/Thunder_Bay' | 'America/Tijuana' | 'America/Toronto' | 'America/Vancouver' | 'America/Whitehorse' | 'America/Winnipeg' | 'America/Yakutat' | 'America/Yellowknife' | 'Antarctica/Casey' | 'Antarctica/Davis' | 'Antarctica/Macquarie' | 'Antarctica/Mawson' | 'Antarctica/Palmer' | 'Antarctica/Rothera' | 'Antarctica/Troll' | 'Antarctica/Vostok' | 'Asia/Almaty' | 'Asia/Amman' | 'Asia/Anadyr' | 'Asia/Aqtau' | 'Asia/Aqtobe' | 'Asia/Ashgabat' | 'Asia/Atyrau' | 'Asia/Baghdad' | 'Asia/Baku' | 'Asia/Bangkok' | 'Asia/Barnaul' | 'Asia/Beirut' | 'Asia/Bishkek' | 'Asia/Brunei' | 'Asia/Chita' | 'Asia/Choibalsan' | 'Asia/Colombo' | 'Asia/Damascus' | 'Asia/Dhaka' | 'Asia/Dili' | 'Asia/Dubai' | 'Asia/Dushanbe' | 'Asia/Famagusta' | 'Asia/Gaza' | 'Asia/Hebron' | 'Asia/Ho_Chi_Minh' | 'Asia/Hong_Kong' | 'Asia/Hovd' | 'Asia/Irkutsk' | 'Asia/Jakarta' | 'Asia/Jayapura' | 'Asia/Jerusalem' | 'Asia/Kabul' | 'Asia/Kamchatka' | 'Asia/Karachi' | 'Asia/Kathmandu' | 'Asia/Khandyga' | 'Asia/Kolkata' | 'Asia/Krasnoyarsk' | 'Asia/Kuala_Lumpur' | 'Asia/Kuching' | 'Asia/Macau' | 'Asia/Magadan' | 'Asia/Makassar' | 'Asia/Manila' | 'Asia/Nicosia' | 'Asia/Novokuznetsk' | 'Asia/Novosibirsk' | 'Asia/Omsk' | 'Asia/Oral' | 'Asia/Pontianak' | 'Asia/Pyongyang' | 'Asia/Qatar' | 'Asia/Qostanay' | 'Asia/Qyzylorda' | 'Asia/Riyadh' | 'Asia/Sakhalin' | 'Asia/Samarkand' | 'Asia/Seoul' | 'Asia/Shanghai' | 'Asia/Singapore' | 'Asia/Srednekolymsk' | 'Asia/Taipei' | 'Asia/Tashkent' | 'Asia/Tbilisi' | 'Asia/Tehran' | 'Asia/Thimphu' | 'Asia/Tokyo' | 'Asia/Tomsk' | 'Asia/Ulaanbaatar' | 'Asia/Urumqi' | 'Asia/Ust-Nera' | 'Asia/Vladivostok' | 'Asia/Yakutsk' | 'Asia/Yangon' | 'Asia/Yekaterinburg' | 'Asia/Yerevan' | 'Atlantic/Azores' | 'Atlantic/Bermuda' | 'Atlantic/Canary' | 'Atlantic/Cape_Verde' | 'Atlantic/Faroe' | 'Atlantic/Madeira' | 'Atlantic/Reykjavik' | 'Atlantic/South_Georgia' | 'Atlantic/Stanley' | 'Australia/Adelaide' | 'Australia/Brisbane' | 'Australia/Broken_Hill' | 'Australia/Darwin' | 'Australia/Eucla' | 'Australia/Hobart' | 'Australia/Lindeman' | 'Australia/Lord_Howe' | 'Australia/Melbourne' | 'Australia/Perth' | 'Australia/Sydney' | 'CET' | 'CST6CDT' | 'EET' | 'EST' | 'EST5EDT' | 'Etc/GMT' | 'Etc/GMT-1' | 'Etc/GMT-10' | 'Etc/GMT-11' | 'Etc/GMT-12' | 'Etc/GMT-13' | 'Etc/GMT-14' | 'Etc/GMT-2' | 'Etc/GMT-3' | 'Etc/GMT-4' | 'Etc/GMT-5' | 'Etc/GMT-6' | 'Etc/GMT-7' | 'Etc/GMT-8' | 'Etc/GMT-9' | 'Etc/GMT+1' | 'Etc/GMT+10' | 'Etc/GMT+11' | 'Etc/GMT+12' | 'Etc/GMT+2' | 'Etc/GMT+3' | 'Etc/GMT+4' | 'Etc/GMT+5' | 'Etc/GMT+6' | 'Etc/GMT+7' | 'Etc/GMT+8' | 'Etc/GMT+9' | 'Etc/UTC' | 'Europe/Amsterdam' | 'Europe/Andorra' | 'Europe/Astrakhan' | 'Europe/Athens' | 'Europe/Belgrade' | 'Europe/Berlin' | 'Europe/Brussels' | 'Europe/Bucharest' | 'Europe/Budapest' | 'Europe/Chisinau' | 'Europe/Copenhagen' | 'Europe/Dublin' | 'Europe/Gibraltar' | 'Europe/Helsinki' | 'Europe/Istanbul' | 'Europe/Kaliningrad' | 'Europe/Kiev' | 'Europe/Kirov' | 'Europe/Lisbon' | 'Europe/London' | 'Europe/Luxembourg' | 'Europe/Madrid' | 'Europe/Malta' | 'Europe/Minsk' | 'Europe/Monaco' | 'Europe/Moscow' | 'Europe/Oslo' | 'Europe/Paris' | 'Europe/Prague' | 'Europe/Riga' | 'Europe/Rome' | 'Europe/Samara' | 'Europe/Saratov' | 'Europe/Simferopol' | 'Europe/Sofia' | 'Europe/Stockholm' | 'Europe/Tallinn' | 'Europe/Tirane' | 'Europe/Ulyanovsk' | 'Europe/Uzhgorod' | 'Europe/Vienna' | 'Europe/Vilnius' | 'Europe/Volgograd' | 'Europe/Warsaw' | 'Europe/Zaporozhye' | 'Europe/Zurich' | 'HST' | 'Indian/Chagos' | 'Indian/Christmas' | 'Indian/Cocos' | 'Indian/Kerguelen' | 'Indian/Mahe' | 'Indian/Maldives' | 'Indian/Mauritius' | 'Indian/Reunion' | 'MET' | 'MST' | 'MST7MDT' | 'Pacific/Apia' | 'Pacific/Auckland' | 'Pacific/Bougainville' | 'Pacific/Chatham' | 'Pacific/Chuuk' | 'Pacific/Easter' | 'Pacific/Efate' | 'Pacific/Fakaofo' | 'Pacific/Fiji' | 'Pacific/Funafuti' | 'Pacific/Galapagos' | 'Pacific/Gambier' | 'Pacific/Guadalcanal' | 'Pacific/Guam' | 'Pacific/Honolulu' | 'Pacific/Kanton' | 'Pacific/Kiritimati' | 'Pacific/Kosrae' | 'Pacific/Kwajalein' | 'Pacific/Majuro' | 'Pacific/Marquesas' | 'Pacific/Nauru' | 'Pacific/Niue' | 'Pacific/Norfolk' | 'Pacific/Noumea' | 'Pacific/Pago_Pago' | 'Pacific/Palau' | 'Pacific/Pitcairn' | 'Pacific/Pohnpei' | 'Pacific/Port_Moresby' | 'Pacific/Rarotonga' | 'Pacific/Tahiti' | 'Pacific/Tarawa' | 'Pacific/Tongatapu' | 'Pacific/Wake' | 'Pacific/Wallis' | 'PST8PDT' | 'WET';
export type CountryCode = 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AN' | 'AO' | 'AR' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PS' | 'PT' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW' | 'ZZ';
/**
 * A buyer's country, identified by its ISO country code.
 */
export interface Country {
    /**
     * The two-letter country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
     *
     * @example 'CA' for Canada, 'US' for United States.
     */
    isoCode: CountryCode;
}
/**
 * A union of keys for the localized fields that are required by certain countries.
 */
export type LocalizedFieldKey = 'SHIPPING_CREDENTIAL_BR' | 'SHIPPING_CREDENTIAL_CL' | 'SHIPPING_CREDENTIAL_CN' | 'SHIPPING_CREDENTIAL_CO' | 'SHIPPING_CREDENTIAL_CR' | 'SHIPPING_CREDENTIAL_EC' | 'SHIPPING_CREDENTIAL_ES' | 'SHIPPING_CREDENTIAL_GT' | 'SHIPPING_CREDENTIAL_ID' | 'SHIPPING_CREDENTIAL_KR' | 'SHIPPING_CREDENTIAL_MY' | 'SHIPPING_CREDENTIAL_MX' | 'SHIPPING_CREDENTIAL_PE' | 'SHIPPING_CREDENTIAL_PT' | 'SHIPPING_CREDENTIAL_PY' | 'SHIPPING_CREDENTIAL_TR' | 'SHIPPING_CREDENTIAL_TW' | 'SHIPPING_CREDENTIAL_TYPE_CO' | 'TAX_CREDENTIAL_BR' | 'TAX_CREDENTIAL_CL' | 'TAX_CREDENTIAL_CO' | 'TAX_CREDENTIAL_CR' | 'TAX_CREDENTIAL_EC' | 'TAX_CREDENTIAL_ES' | 'TAX_CREDENTIAL_GT' | 'TAX_CREDENTIAL_ID' | 'TAX_CREDENTIAL_IT' | 'TAX_CREDENTIAL_MX' | 'TAX_CREDENTIAL_MY' | 'TAX_CREDENTIAL_PE' | 'TAX_CREDENTIAL_PT' | 'TAX_CREDENTIAL_PY' | 'TAX_CREDENTIAL_TR' | 'TAX_CREDENTIAL_TYPE_CO' | 'TAX_CREDENTIAL_TYPE_MX' | 'TAX_CREDENTIAL_USE_MX' | 'TAX_EMAIL_IT';
/**
 * The supported Storefront API versions. Pass one of these values to `query()` to target a specific API version when querying the Storefront GraphQL API.
 */
export type StorefrontApiVersion = '2022-04' | '2022-07' | '2022-10' | '2023-01' | '2023-04' | '2023-07' | '2024-01' | '2024-04' | '2024-07' | '2024-10' | '2025-01' | '2025-04' | 'unstable' | '2025-07' | '2025-10' | '2026-01' | '2026-04' | '2026-07';
/**
 * A buyer's country, identified by its ISO country code.
 */
export interface Country {
    /**
     * The two-letter country code in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
     *
     * @example 'CA' for Canada, 'US' for United States.
     */
    isoCode: CountryCode;
}
/**
 * An error returned by the Storefront GraphQL API. Contains a human-readable `message` and an `extensions` object with the request ID and error code for debugging.
 */
export interface GraphQLError {
    /**
     * A human-readable description of the error.
     */
    message: string;
    /**
     * Additional error metadata including the request ID and error code.
     */
    extensions: {
        /**
         * The unique identifier for the API request, useful for debugging with Shopify support.
         */
        requestId: string;
        /**
         * A machine-readable error code identifying the type of error.
         */
        code: string;
    };
}
/**
 * Represents a reactive signal interface that provides both immediate value access and subscription-based updates. Enables real-time synchronization with changing data through the observer pattern.
 */
export interface ReadonlySignalLike<T> {
    /**
     * The current value of the signal. This property provides immediate access to the current value without requiring subscription setup. Use for one-time value checks or initial setup.
     */
    readonly value: T;
    /**
     * Subscribes to value changes and calls the provided function whenever the value updates. Returns an unsubscribe function to clean up the subscription. Use to automatically react to changes in the signal's value.
     */
    subscribe(fn: (value: T) => void): () => void;
}
/**
 * A result type that indicates the success or failure of an operation.
 */
type Result<T> = {
    success: true;
    value: T;
} | {
    success: false;
    errors: ValidationError[];
};
/**
 * A validation error object that is returned when an operation fails.
 */
interface ValidationError {
    type: 'error';
    /**
     * A message describing the error.
     */
    message: string;
    /**
     * A code identifier for the error.
     */
    code: string;
    /**
     * Field-level validation issues
     */
    issues?: {
        message: string;
        path: string[];
    }[];
}
/**
 * A function that updates a signal and returns a result indicating success or failure.
 * The function is typically used along with a `ReadonlySignalLike` object.
 */
export type UpdateSignalFunction<T> = (value: T) => Result<T>;
export {};
//# sourceMappingURL=shared.d.ts.map