# Hydrogen (part 3 of 6)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `hydrogen.md`, `hydrogen.part2.md`, `hydrogen.part4.md`, `hydrogen.part5.md`, `hydrogen.part6.md` — and you should read the ones relevant to your task.

---
declare function cartSelectedDeliveryOptionsUpdateDefault(options: CartQueryOptions): CartSelectedDeliveryOptionsUpdateFunction;

type CartAttributesUpdateFunction = (attributes: AttributeInput[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartAttributesUpdateDefault(options: CartQueryOptions): CartAttributesUpdateFunction;

type CartMetafieldsSetFunction = (metafields: MetafieldWithoutOwnerId[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartMetafieldsSetDefault(options: CartQueryOptions): CartMetafieldsSetFunction;

type CartMetafieldDeleteFunction = (key: Scalars['String']['input'], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartMetafieldDeleteDefault(options: CartQueryOptions): CartMetafieldDeleteFunction;

type CartGiftCardCodesUpdateFunction = (giftCardCodes: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
/\*\*

- Updates (replaces) gift card codes in the cart.
-
- To add codes without replacing, use `cartGiftCardCodesAdd` (API 2025-10+).
-
- @param {CartQueryOptions} options - Cart query options including storefront client and cart fragment.
- @returns {CartGiftCardCodesUpdateFunction} - Function accepting gift card codes array and optional parameters.
-
- @example Replace all gift card codes
- const updateGiftCardCodes = cartGiftCardCodesUpdateDefault({ storefront, getCartId });
- await updateGiftCardCodes(['SUMMER2025', 'WELCOME10']);
  \*/
  declare function cartGiftCardCodesUpdateDefault(options: CartQueryOptions): CartGiftCardCodesUpdateFunction;

type CartGiftCardCodesAddFunction = (giftCardCodes: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
/\*\*

- Adds gift card codes to the cart without replacing existing ones.
-
- This function sends a mutation to the Storefront API to add one or more gift card codes to the cart.
- Unlike `cartGiftCardCodesUpdate` which replaces all codes, this mutation appends new codes to existing ones.
-
- @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
- @returns {CartGiftCardCodesAddFunction} - A function that takes an array of gift card codes and optional parameters, and returns the result of the API call.
-
- @example Add gift card codes
- const addGiftCardCodes = cartGiftCardCodesAddDefault({ storefront, getCartId });
- await addGiftCardCodes(['SUMMER2025', 'WELCOME10']);
  \*/
  declare function cartGiftCardCodesAddDefault(options: CartQueryOptions): CartGiftCardCodesAddFunction;

type CartGiftCardCodesRemoveFunction = (appliedGiftCardIds: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartGiftCardCodesRemoveDefault(options: CartQueryOptions): CartGiftCardCodesRemoveFunction;

type CartDeliveryAddressesAddFunction = (addresses: Array<CartSelectableAddressInput>, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
/\*\*

- Adds delivery addresses to the cart.
-
- This function sends a mutation to the storefront API to add one or more delivery addresses to the cart.
- It returns the result of the mutation, including any errors that occurred.
-
- @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
- @returns {CartDeliveryAddressAddFunction} - A function that takes an array of addresses and optional parameters, and returns the result of the API call.
-
- @example
- const addDeliveryAddresses = cartDeliveryAddressesAddDefault({ storefront, getCartId });
- const result = await addDeliveryAddresses([
- {
-      address1: '123 Main St',
-      city: 'Anytown',
-      countryCode: 'US'
-      // other address fields...
- }
- ], { someOptionalParam: 'value' }
- );
  \*/
  declare function cartDeliveryAddressesAddDefault(options: CartQueryOptions): CartDeliveryAddressesAddFunction;

type CartDeliveryAddressesRemoveFunction = (addressIds: Array<Scalars['ID']['input']> | Array<string>, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
/\*\*

- Removes delivery addresses from the cart.
-
- This function sends a mutation to the storefront API to remove one or more delivery addresses from the cart.
- It returns the result of the mutation, including any errors that occurred.
-
- @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
- @returns {CartDeliveryAddressRemoveFunction} - A function that takes an array of address IDs and optional parameters, and returns the result of the API call.
-
- @example
- const removeDeliveryAddresses = cartDeliveryAddressesRemoveDefault({ storefront, getCartId });
- const result = await removeDeliveryAddresses([
- "gid://shopify/<objectName>/10079785100"
- ],
- { someOptionalParam: 'value' });
  \*/
  declare function cartDeliveryAddressesRemoveDefault(options: CartQueryOptions): CartDeliveryAddressesRemoveFunction;

type CartDeliveryAddressesUpdateFunction = (addresses: Array<CartSelectableAddressUpdateInput>, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
/\*\*

- Updates delivery addresses in the cart.
-
- Pass an empty array to clear all delivery addresses from the cart.
-
- @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
- @returns {CartDeliveryAddressUpdateFunction} - A function that takes an array of addresses and optional parameters, and returns the result of the API call.
-
- @example Clear all delivery addresses
- const updateAddresses = cartDeliveryAddressesUpdateDefault(cartQueryOptions);
- await updateAddresses([]);
-
- @example Update specific delivery addresses
- const updateAddresses = cartDeliveryAddressesUpdateDefault(cartQueryOptions);
- await updateAddresses([
  {
  "address": {
  "copyFromCustomerAddressId": "gid://shopify/<objectName>/10079785100",
  "deliveryAddress": {
  "address1": "<your-address1>",
  "address2": "<your-address2>",
  "city": "<your-city>",
  "company": "<your-company>",
  "countryCode": "AC",
  "firstName": "<your-firstName>",
  "lastName": "<your-lastName>",
  "phone": "<your-phone>",
  "provinceCode": "<your-provinceCode>",
  "zip": "<your-zip>"
  }
  },
  "id": "gid://shopify/<objectName>/10079785100",
  "oneTimeUse": true,
  "selected": true,
  "validationStrategy": "COUNTRY_CODE_ONLY"
  }
  ],{ someOptionalParam: 'value' });
  \*/
  declare function cartDeliveryAddressesUpdateDefault(options: CartQueryOptions): CartDeliveryAddressesUpdateFunction;

type CartDeliveryAddressesReplaceFunction = (addresses: Array<CartSelectableAddressInput>, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
/\*\*

- Replaces all delivery addresses on the cart.
-
- This function sends a mutation to the storefront API to replace all delivery addresses on the cart
- with the provided addresses. It returns the result of the mutation, including any errors that occurred.
-
- @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
- @returns {CartDeliveryAddressesReplaceFunction} - A function that takes an array of addresses and optional parameters, and returns the result of the API call.
-
- @example
- const replaceDeliveryAddresses = cartDeliveryAddressesReplaceDefault({ storefront, getCartId });
- const result = await replaceDeliveryAddresses([
- {
-      address: {
-        deliveryAddress: {
-          address1: '123 Main St',
-          city: 'Anytown',
-          countryCode: 'US'
-        }
-      },
-      selected: true
- }
- ], { someOptionalParam: 'value' }
- );
  \*/
  declare function cartDeliveryAddressesReplaceDefault(options: CartQueryOptions): CartDeliveryAddressesReplaceFunction;

type CartHandlerOptions = {
storefront: Storefront;
customerAccount?: CustomerAccount;
getCartId: () => string | undefined;
setCartId: (cartId: string) => Headers;
cartQueryFragment?: string;
cartMutateFragment?: string;
buyerIdentity?: CartBuyerIdentityInput;
};
type CustomMethodsBase = Record<string, Function>;
type CartHandlerOptionsWithCustom<TCustomMethods extends CustomMethodsBase> = CartHandlerOptions & {
customMethods?: TCustomMethods;
};
type HydrogenCart = {
get: ReturnType<typeof cartGetDefault>;
getCartId: () => string | undefined;
setCartId: (cartId: string) => Headers;
create: ReturnType<typeof cartCreateDefault>;
addLines: ReturnType<typeof cartLinesAddDefault>;
updateLines: ReturnType<typeof cartLinesUpdateDefault>;
removeLines: ReturnType<typeof cartLinesRemoveDefault>;
updateDiscountCodes: ReturnType<typeof cartDiscountCodesUpdateDefault>;
updateGiftCardCodes: ReturnType<typeof cartGiftCardCodesUpdateDefault>;
addGiftCardCodes: ReturnType<typeof cartGiftCardCodesAddDefault>;
removeGiftCardCodes: ReturnType<typeof cartGiftCardCodesRemoveDefault>;
updateBuyerIdentity: ReturnType<typeof cartBuyerIdentityUpdateDefault>;
updateNote: ReturnType<typeof cartNoteUpdateDefault>;
updateSelectedDeliveryOption: ReturnType<typeof cartSelectedDeliveryOptionsUpdateDefault>;
updateAttributes: ReturnType<typeof cartAttributesUpdateDefault>;
setMetafields: ReturnType<typeof cartMetafieldsSetDefault>;
deleteMetafield: ReturnType<typeof cartMetafieldDeleteDefault>;
/**
_ Adds delivery addresses to the cart.
_
_ This function sends a mutation to the storefront API to add one or more delivery addresses to the cart.
_ It returns the result of the mutation, including any errors that occurred. \*
_ @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
_ @returns {ReturnType<typeof cartDeliveryAddressesAddDefault>} - A function that takes an array of addresses and optional parameters, and returns the result of the API call. \*
_ @example
_ const result = await cart.addDeliveryAddresses(
_ [
_ {
_ address1: '123 Main St',
_ city: 'Anytown',
_ countryCode: 'US'
_ }
_ ],
_ { someOptionalParam: 'value' }
_ );
_/
addDeliveryAddresses: ReturnType<typeof cartDeliveryAddressesAddDefault>;
/**
_ Removes delivery addresses from the cart.
_
_ This function sends a mutation to the storefront API to remove one or more delivery addresses from the cart.
_ It returns the result of the mutation, including any errors that occurred. \*
_ @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
_ @returns {CartDeliveryAddressRemoveFunction} - A function that takes an array of address IDs and optional parameters, and returns the result of the API call. \*
_ @example
_ const result = await cart.removeDeliveryAddresses([

- "gid://shopify/<objectName>/10079785100"
- ],
  _ { someOptionalParam: 'value' });
  _/
  removeDeliveryAddresses: ReturnType<typeof cartDeliveryAddressesRemoveDefault>;
  /**
  _ Updates delivery addresses in the cart.
  _
  _ This function sends a mutation to the storefront API to update one or more delivery addresses in the cart.
  _ It returns the result of the mutation, including any errors that occurred. \*
  _ @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
  _ @returns {CartDeliveryAddressUpdateFunction} - A function that takes an array of addresses and optional parameters, and returns the result of the API call. \*
  _ const result = await cart.updateDeliveryAddresses([
  {
  "address": {
  "copyFromCustomerAddressId": "gid://shopify/<objectName>/10079785100",
  "deliveryAddress": {
  "address1": "<your-address1>",
  "address2": "<your-address2>",
  "city": "<your-city>",
  "company": "<your-company>",
  "countryCode": "AC",
  "firstName": "<your-firstName>",
  "lastName": "<your-lastName>",
  "phone": "<your-phone>",
  "provinceCode": "<your-provinceCode>",
  "zip": "<your-zip>"
  }
  },
  "id": "gid://shopify/<objectName>/10079785100",
  "oneTimeUse": true,
  "selected": true,
  "validationStrategy": "COUNTRY_CODE_ONLY"
  }
  ],{ someOptionalParam: 'value' });
  _/
  updateDeliveryAddresses: ReturnType<typeof cartDeliveryAddressesUpdateDefault>;
  /**
  _ Replaces all delivery addresses on the cart.
  _
  _ This function sends a mutation to the storefront API to replace all delivery addresses on the cart
  _ with the provided addresses. It returns the result of the mutation, including any errors that occurred. \*
  _ @param {CartQueryOptions} options - The options for the cart query, including the storefront API client and cart fragment.
  _ @returns {CartDeliveryAddressesReplaceFunction} - A function that takes an array of addresses and optional parameters, and returns the result of the API call. \*
  _ @example
  _ const result = await cart.replaceDeliveryAddresses([
- {
- address: {
- deliveryAddress: {
- address1: '123 Main St',
- city: 'Anytown',
- countryCode: 'US'
- }
- },
- selected: true
- }
- ], { someOptionalParam: 'value' });
  \*/
  replaceDeliveryAddresses: ReturnType<typeof cartDeliveryAddressesReplaceDefault>;
  };
  type HydrogenCartCustom<TCustomMethods extends Partial<HydrogenCart> & CustomMethodsBase> = Omit<HydrogenCart, keyof TCustomMethods> & TCustomMethods;
  declare function createCartHandler(options: CartHandlerOptions): HydrogenCart;
  declare function createCartHandler<TCustomMethods extends CustomMethodsBase>(options: CartHandlerOptionsWithCustom<TCustomMethods>): HydrogenCartCustom<TCustomMethods>;

type RequestEventPayload = {
\_\_fromVite?: boolean;
url: string;
eventType: 'request' | 'subrequest';
requestId?: string | null;
purpose?: string | null;
startTime: number;
endTime?: number;
cacheStatus?: 'MISS' | 'HIT' | 'STALE' | 'PUT';
waitUntil?: WaitUntil;
graphql?: string | null;
stackInfo?: {
file?: string;
func?: string;
line?: number;
column?: number;
};
responsePayload?: any;
responseInit?: Omit<ResponseInit, 'headers'> & {
headers?: [string, string][];
};
cache?: {
status?: string;
strategy?: string;
key?: string | readonly unknown[];
};
displayName?: string;
};

declare const CUSTOMER_ACCOUNT_SESSION_KEY = "customerAccount";
declare const BUYER_SESSION_KEY = "buyer";

interface HydrogenSessionData {
[CUSTOMER_ACCOUNT_SESSION_KEY]: {
accessToken?: string;
expiresAt?: string;
refreshToken?: string;
codeVerifier?: string;
idToken?: string;
nonce?: string;
state?: string;
redirectPath?: string;
};
// for B2B buyer context
[BUYER_SESSION_KEY]: Partial<BuyerInput>;
}

interface HydrogenSession<
Data = SessionData,
FlashData = FlashSessionData,

> {
> get: Session<HydrogenSessionData & Data, FlashData>['get'];
> set: Session<HydrogenSessionData & Data, FlashData>['set'];
> unset: Session<HydrogenSessionData & Data, FlashData>['unset'];
> commit: () => ReturnType<

    SessionStorage<HydrogenSessionData & Data, FlashData>['commitSession']

> ;
> destroy?: () => ReturnType<

    SessionStorage<HydrogenSessionData & Data, FlashData>['destroySession']

> ;
> isPending?: boolean;
> }

type WaitUntil = (promise: Promise<unknown>) => void;

interface HydrogenEnv {
SESSION_SECRET: string;
PUBLIC_STOREFRONT_API_TOKEN: string;
PRIVATE_STOREFRONT_API_TOKEN: string;
PUBLIC_STORE_DOMAIN: string;
PUBLIC_STOREFRONT_ID: string;
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
PUBLIC_CHECKOUT_DOMAIN: string;
SHOP_ID: string;
}

type StorefrontHeaders = {
/** A unique ID that correlates all sub-requests together. \*/
requestGroupId: string | null;
/** The IP address of the client. _/
buyerIp: string | null;
/\*\* The signature of the client's IP address for verification. _/
buyerIpSig: string | null;
/** The cookie header from the client \*/
cookie: string | null;
/** The sec-purpose or purpose header value \*/
purpose: string | null;
};

interface HydrogenRouterContextProvider<
TSession extends HydrogenSession = HydrogenSession,
TCustomMethods extends CustomMethodsBase | undefined = {},
TI18n extends I18nBase = I18nBase,
TEnv extends HydrogenEnv = Env,

> extends RouterContextProvider {
> /** A GraphQL client for querying the Storefront API \*/
> storefront: Storefront<TI18n>;
> /** A GraphQL client for querying the Customer Account API _/
> customerAccount: CustomerAccount;
> /\*\* A collection of utilities used to interact with the cart _/
> cart: TCustomMethods extends CustomMethodsBase

    ? HydrogenCartCustom<TCustomMethods>
    : HydrogenCart;

/** Environment variables from the fetch function \*/
env: TEnv;
/** The waitUntil function for keeping requests alive _/
waitUntil?: WaitUntil;
/\*\* Session implementation _/
session: TSession;
}

declare global {
interface Window {
privacyBanner: PrivacyBanner;
Shopify: {
customerPrivacy: CustomerPrivacy;
};
}
interface Document {
addEventListener<K extends keyof CustomEventMap>(
type: K,
listener: (this: Document, ev: CustomEventMap[K]) => void,
): void;
removeEventListener<K extends keyof CustomEventMap>(
type: K,
listener: (this: Document, ev: CustomEventMap[K]) => void,
): void;
dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
}
var **H2O_LOG_EVENT: undefined | ((event: RequestEventPayload) => void);
var **remix_devServerHooks:
| undefined
| {getCriticalCss: (...args: unknown[]) => any};
}

type I18nBase = {
language: LanguageCode$1 | LanguageCode;
country: CountryCode$1;
};
type JsonGraphQLError = ReturnType<GraphQLError['toJSON']>;
type StorefrontApiErrors = JsonGraphQLError[] | undefined;
type StorefrontError = {
errors?: StorefrontApiErrors;
};
/\*\*

- Wraps all the returned utilities from `createStorefrontClient`.
  \*/
  type StorefrontClient<TI18n extends I18nBase> = {
  storefront: Storefront<TI18n>;
  };
  /\*\*
- Maps all the queries found in the project to variables and return types.
  \*/
  interface StorefrontQueries {
  }
  /\*\*
- Maps all the mutations found in the project to variables and return types.
  \*/
  interface StorefrontMutations {
  }
  type AutoAddedVariableNames = 'country' | 'language';
  type StorefrontCommonExtraParams = {
  headers?: HeadersInit;
  storefrontApiVersion?: string;
  displayName?: string;
  };
  /\*\*
- Interface to interact with the Storefront API.
  _/
  type Storefront<TI18n extends I18nBase = I18nBase> = {
  query: <OverrideReturnType extends any = never, RawGqlString extends string = string>(query: RawGqlString, ...options: ClientVariablesInRestParams<StorefrontQueries, RawGqlString, StorefrontCommonExtraParams & Pick<StorefrontQueryOptions, 'cache'>, AutoAddedVariableNames>) => Promise<ClientReturn<StorefrontQueries, RawGqlString, OverrideReturnType> & StorefrontError>;
  mutate: <OverrideReturnType extends any = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: ClientVariablesInRestParams<StorefrontMutations, RawGqlString, StorefrontCommonExtraParams, AutoAddedVariableNames>) => Promise<ClientReturn<StorefrontMutations, RawGqlString, OverrideReturnType> & StorefrontError>;
  cache?: Cache;
  CacheNone: typeof CacheNone;
  CacheLong: typeof CacheLong;
  CacheShort: typeof CacheShort;
  CacheCustom: typeof CacheCustom;
  generateCacheControlHeader: typeof generateCacheControlHeader;
  getPublicTokenHeaders: ReturnType<typeof createStorefrontClient$1>['getPublicTokenHeaders'];
  getPrivateTokenHeaders: ReturnType<typeof createStorefrontClient$1>['getPrivateTokenHeaders'];
  getShopifyDomain: ReturnType<typeof createStorefrontClient$1>['getShopifyDomain'];
  getApiUrl: ReturnType<typeof createStorefrontClient$1>['getStorefrontApiUrl'];
  i18n: TI18n;
  getHeaders: () => Record<string, string>;
  /\*\*
  _ Checks if the request URL matches the Storefront API GraphQL endpoint.
  _/
  isStorefrontApiUrl: (request: {
  url?: string;
  }) => boolean;
  /\*\*
  _ Forwards the request to the Storefront API.
  _ It reads the API version from the request URL.
  _/
  forward: (request: Request, options?: Pick<StorefrontCommonExtraParams, 'storefrontApiVersion'>) => Promise<Response>;
  /**
  _ Sets the collected subrequest headers in the response.
  _ Useful to forward the cookies and server-timing headers
  _ from server subrequests to the browser.
  _/
  setCollectedSubrequestHeaders: (response: {
  headers: Headers;
  }) => void;
  };
  type HydrogenClientProps<TI18n> = {
  /** Storefront API headers. If on Oxygen, use `getStorefrontHeaders()` _/
  storefrontHeaders?: StorefrontHeaders;
  /\*\* An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) _/
  cache?: Cache;
  /** The globally unique identifier for the Shop \*/
  storefrontId?: string;
  /** The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. _/
  waitUntil?: WaitUntil;
  /\*\* An object containing a country code and language code _/
  i18n?: TI18n;
  /** Whether it should print GraphQL errors automatically. Defaults to true \*/
  logErrors?: boolean | ((error?: Error) => boolean);
  };
  type CreateStorefrontClientOptions<TI18n extends I18nBase> = HydrogenClientProps<TI18n> & StorefrontClientProps;
  type StorefrontQueryOptions = StorefrontCommonExtraParams & {
  query: string;
  mutation?: never;
  cache?: CachingStrategy;
  };
  /**
- This function extends `createStorefrontClient` from [Hydrogen React](/docs/api/hydrogen-react/2026-01/utilities/createstorefrontclient). The additional arguments enable internationalization (i18n), caching, and other features particular to Remix and Oxygen.
-
- Learn more about [data fetching in Hydrogen](/docs/custom-storefronts/hydrogen/data-fetching/fetch-data).
  _/
  declare function createStorefrontClient<TI18n extends I18nBase>(options: CreateStorefrontClientOptions<TI18n>): StorefrontClient<TI18n>;
  declare function formatAPIResult<T>(data: T, errors: StorefrontApiErrors): T & StorefrontError;
  type CreateStorefrontClientForDocs<TI18n extends I18nBase> = {
  storefront?: StorefrontForDoc<TI18n>;
  };
  type StorefrontForDoc<TI18n extends I18nBase = I18nBase> = {
  /\*\* The function to run a query on Storefront API. _/
  query?: <TData = any>(query: string, options: StorefrontQueryOptionsForDocs) => Promise<TData & StorefrontError>;
  /** The function to run a mutation on Storefront API. \*/
  mutate?: <TData = any>(mutation: string, options: StorefrontMutationOptionsForDocs) => Promise<TData & StorefrontError>;
  /** The cache instance passed in from the `createStorefrontClient` argument. _/
  cache?: Cache;
  /\*\* Re-export of [`CacheNone`](/docs/api/hydrogen/utilities/cachenone). _/
  CacheNone?: typeof CacheNone;
  /** Re-export of [`CacheLong`](/docs/api/hydrogen/utilities/cachelong). \*/
  CacheLong?: typeof CacheLong;
  /** Re-export of [`CacheShort`](/docs/api/hydrogen/utilities/cacheshort). _/
  CacheShort?: typeof CacheShort;
  /\*\* Re-export of [`CacheCustom`](/docs/api/hydrogen/utilities/cachecustom). _/
  CacheCustom?: typeof CacheCustom;
  /** Re-export of [`generateCacheControlHeader`](/docs/api/hydrogen/utilities/generatecachecontrolheader). \*/
  generateCacheControlHeader?: typeof generateCacheControlHeader;
  /** Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. See [`getPublicTokenHeaders` in Hydrogen React](/docs/api/hydrogen-react/2026-01/utilities/createstorefrontclient#:~:text=%27graphql%27.-,getPublicTokenHeaders,-(props%3F%3A) for more details. _/
  getPublicTokenHeaders?: ReturnType<typeof createStorefrontClient$1>['getPublicTokenHeaders'];
  /\*\* Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint for API calls made from a server. See [`getPrivateTokenHeaders` in Hydrogen React](/docs/api/hydrogen-react/2026-01/utilities/createstorefrontclient#:~:text=storefrontApiVersion-,getPrivateTokenHeaders,-(props%3F%3A) for more details._/
