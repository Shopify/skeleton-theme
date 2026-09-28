# Hydrogen (part 4 of 6)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `hydrogen.md`, `hydrogen.part2.md`, `hydrogen.part3.md`, `hydrogen.part5.md`, `hydrogen.part6.md` — and you should read the ones relevant to your task.

---
  getPrivateTokenHeaders?: ReturnType<typeof createStorefrontClient$1>['getPrivateTokenHeaders'];
  /** Creates the fully-qualified URL to your myshopify.com domain. See [`getShopifyDomain` in Hydrogen React](/docs/api/hydrogen-react/2026-01/utilities/createstorefrontclient#:~:text=StorefrontClientReturn-,getShopifyDomain,-(props%3F%3A) for more details. \*/
  getShopifyDomain?: ReturnType<typeof createStorefrontClient$1>['getShopifyDomain'];
  /** Creates the fully-qualified URL to your store's GraphQL endpoint. See [`getStorefrontApiUrl` in Hydrogen React](/docs/api/hydrogen-react/2026-01/utilities/createstorefrontclient#:~:text=storeDomain-,getStorefrontApiUrl,-(props%3F%3A) for more details._/
  getApiUrl?: ReturnType<typeof createStorefrontClient$1>['getStorefrontApiUrl'];
  /\*\* The `i18n` object passed in from the `createStorefrontClient` argument. _/
  i18n?: TI18n;
  };
  type StorefrontQueryOptionsForDocs = {
  /** The variables for the GraphQL query statement. \*/
  variables?: Record<string, unknown>;
  /** The cache strategy for this query. Default to max-age=1, stale-while-revalidate=86399. _/
  cache?: CachingStrategy;
  /\*\* Additional headers for this query. _/
  headers?: HeadersInit;
  /** Override the Storefront API version for this query. \*/
  storefrontApiVersion?: string;
  /** The name of the query for debugging in the Subrequest Profiler. _/
  displayName?: string;
  };
  type StorefrontMutationOptionsForDocs = {
  /\*\* The variables for the GraphQL mutation statement. _/
  variables?: Record<string, unknown>;
  /** Additional headers for this query. \*/
  headers?: HeadersInit;
  /** Override the Storefront API version for this query. _/
  storefrontApiVersion?: string;
  /\*\* The name of the query for debugging in the Subrequest Profiler. _/
  displayName?: string;
  };

type CartOptionalInput = {
/**
_ The cart id.
_ @default cart.getCartId();
\*/
cartId?: Scalars['ID']['input'];
/**
_ The country code.
_ @default storefront.i18n.country
_/
country?: CountryCode$1;
/\*\*
_ The language code.
_ @default storefront.i18n.language
_/
language?: LanguageCode$1;
/\*\*

- Visitor consent preferences for the Storefront API's @inContext directive.
- \* **Most Hydrogen storefronts do NOT need this.** If you're using Hydrogen's
  _ analytics provider or Shopify's Customer Privacy API (including third-party
  _ consent services integrated with it), consent is handled automatically. \*
  _ This option exists for Storefront API parity and is primarily intended for
  _ non-Hydrogen integrations like Checkout Kit that manage consent outside
  _ Shopify's standard consent flow.
  _
  _ When provided, consent is encoded into the cart's checkoutUrl via the \_cs parameter.
  _ @see https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/in-context
  \*/
  visitorConsent?: VisitorConsent$1;
  };
  type MetafieldWithoutOwnerId = Omit<CartMetafieldsSetInput, 'ownerId'>;
  type CartQueryOptions = {
  /**
  _ The storefront client instance created by [`createStorefrontClient`](docs/api/hydrogen/latest/utilities/createstorefrontclient).
  _/
  storefront: Storefront;
  /**
  _ A function that returns the cart ID.
  _/
  getCartId: () => string | undefined;
  /\*\*
  _ The cart fragment to override the one used in this query.
  _/
  cartFragment?: string;
  /\*\*
  _ The customer account instance created by [`createCustomerAccount`](docs/api/hydrogen/latest/customer/createcustomeraccount).
  _/
  customerAccount?: CustomerAccount;
  };
  type CartReturn = Cart & {
  errors?: StorefrontApiErrors;
  };
  type CartQueryData = {
  cart: Cart;
  userErrors?: CartUserError[] | MetafieldsSetUserError[] | MetafieldDeleteUserError[];
  warnings?: CartWarning[];
  };
  type CartQueryDataReturn = CartQueryData & {
  errors?: StorefrontApiErrors;
  };
  type CartQueryReturn<T> = (requiredParams: T, optionalParams?: CartOptionalInput) => Promise<CartQueryData>;

declare const AnalyticsEvent: {
PAGE*VIEWED: "page_viewed";
PRODUCT_VIEWED: "product_viewed";
COLLECTION_VIEWED: "collection_viewed";
CART_VIEWED: "cart_viewed";
SEARCH_VIEWED: "search_viewed";
CART_UPDATED: "cart_updated";
PRODUCT_ADD_TO_CART: "product_added_to_cart";
PRODUCT_REMOVED_FROM_CART: "product_removed_from_cart";
CUSTOM_EVENT: `custom*${string}`;
};

type OtherData = {
/** Any other data that should be included in the event. \*/
[key: string]: unknown;
};
type BasePayload = {
/** The shop data passed in from the `AnalyticsProvider`. _/
shop: ShopAnalytics | null;
/\*\* The custom data passed in from the `AnalyticsProvider`. _/
customData?: AnalyticsProviderProps['customData'];
};
type UrlPayload = {
/** The url location of when this event is collected. \*/
url: string;
};
type ProductPayload = {
/** The product id. _/
id: Product['id'];
/\*\* The product title. _/
title: Product['title'];
/** The displaying variant price. \*/
price: ProductVariant['price']['amount'];
/** The product vendor. _/
vendor: Product['vendor'];
/\*\* The displaying variant id. _/
variantId: ProductVariant['id'];
/** The displaying variant title. \*/
variantTitle: ProductVariant['title'];
/** The quantity of product. _/
quantity: number;
/\*\* The product sku. _/
sku?: ProductVariant['sku'];
/** The product type. \*/
productType?: Product['productType'];
};
type ProductsPayload = {
/** The products associated with this event. _/
products: Array<ProductPayload & OtherData>;
};
type CollectionPayloadDetails = {
/\*\* The collection id. _/
id: string;
/** The collection handle. \*/
handle: string;
};
type CollectionPayload = {
collection: CollectionPayloadDetails;
};
type SearchPayload = {
/** The search term used for the search results page _/
searchTerm: string;
/\*\* The search results _/
searchResults?: any;
};
type CartPayload = {
/** The current cart state. \*/
cart: CartReturn | null;
/** The previous cart state. _/
prevCart: CartReturn | null;
};
type CartLinePayload = {
/\*\* The previous state of the cart line that got updated. _/
prevLine?: CartLine | ComponentizableCartLine;
/\*_ The current state of the cart line that got updated. _/
currentLine?: CartLine | ComponentizableCartLine;
};
type CollectionViewPayload = CollectionPayload & UrlPayload & BasePayload;
type ProductViewPayload = ProductsPayload & UrlPayload & BasePayload;
type CartViewPayload = CartPayload & UrlPayload & BasePayload;
type PageViewPayload = UrlPayload & BasePayload;
type SearchViewPayload = SearchPayload & UrlPayload & BasePayload;
type CartUpdatePayload = CartPayload & BasePayload & OtherData;
type CartLineUpdatePayload = CartLinePayload & CartPayload & BasePayload & OtherData;
type CustomEventPayload = BasePayload & OtherData;
type BasicViewProps = {
data?: OtherData;
customData?: OtherData;
};
type ProductViewProps = {
data: ProductsPayload;
customData?: OtherData;
};
type CollectionViewProps = {
data: CollectionPayload;
customData?: OtherData;
};
type SearchViewProps = {
data?: SearchPayload;
customData?: OtherData;
};
type CustomViewProps = {
type: typeof AnalyticsEvent.CUSTOM_EVENT;
data?: OtherData;
customData?: OtherData;
};
declare function AnalyticsProductView(props: ProductViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsCollectionView(props: CollectionViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsCartView(props: BasicViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsSearchView(props: SearchViewProps): react_jsx_runtime.JSX.Element;
declare function AnalyticsCustomView(props: CustomViewProps): react_jsx_runtime.JSX.Element;

type ConsentStatus = boolean | undefined;
type VisitorConsent = {
marketing: ConsentStatus;
analytics: ConsentStatus;
preferences: ConsentStatus;
sale*of_data: ConsentStatus;
};
type VisitorConsentCollected = {
analyticsAllowed: boolean;
firstPartyMarketingAllowed: boolean;
marketingAllowed: boolean;
preferencesAllowed: boolean;
saleOfDataAllowed: boolean;
thirdPartyMarketingAllowed: boolean;
};
type CustomerPrivacyApiLoaded = boolean;
type CustomerPrivacyConsentConfig = {
checkoutRootDomain: string;
storefrontRootDomain?: string;
storefrontAccessToken: string;
country?: CountryCode$1;
/** The privacyBanner refers to `language` as `locale` \*/
locale?: LanguageCode$1;
};
type SetConsentHeadlessParams = VisitorConsent & CustomerPrivacyConsentConfig & {
headlessStorefront?: boolean;
};
/**
Ideally this type should come from the Custoemr Privacy API sdk
analyticsProcessingAllowed -
currentVisitorConsent
doesMerchantSupportGranularConsent
firstPartyMarketingAllowed
getCCPAConsent
getTrackingConsent
marketingAllowed
preferencesProcessingAllowed
saleOfDataAllowed
saleOfDataRegion
setTrackingConsent
shouldShowBanner
shouldShowGDPRBanner
thirdPartyMarketingAllowed
**/
type OriginalCustomerPrivacy = {
currentVisitorConsent: () => VisitorConsent;
preferencesProcessingAllowed: () => boolean;
saleOfDataAllowed: () => boolean;
marketingAllowed: () => boolean;
analyticsProcessingAllowed: () => boolean;
setTrackingConsent: (consent: SetConsentHeadlessParams, callback: (data: {
error: string;
} | undefined) => void) => void;
shouldShowBanner: () => boolean;
};
type CustomerPrivacy$1 = Omit<OriginalCustomerPrivacy, 'setTrackingConsent'> & {
setTrackingConsent: (consent: VisitorConsent, // we have already applied the headlessStorefront in the override
callback: (data: {
error: string;
} | undefined) => void) => void;
};
type PrivacyBanner$1 = {
loadBanner: (options?: Partial<CustomerPrivacyConsentConfig>) => void;
showPreferences: (options?: Partial<CustomerPrivacyConsentConfig>) => void;
};
interface CustomEventMap$1 {
visitorConsentCollected: CustomEvent<VisitorConsentCollected>;
customerPrivacyApiLoaded: CustomEvent<CustomerPrivacyApiLoaded>;
}
type CustomerPrivacyApiProps = {
/** The production shop checkout domain url. */
checkoutDomain: string;
/\*\* The storefront access token for the shop. _/
storefrontAccessToken: string;
/** Whether to load the Shopify privacy banner as configured in Shopify admin. Defaults to true. \*/
withPrivacyBanner?: boolean;
/** Country code for the shop. _/
country?: CountryCode$1;
/\*\* Language code for the shop. _/
locale?: LanguageCode$1;
/** Callback to be called when visitor consent is collected. \*/
onVisitorConsentCollected?: (consent: VisitorConsentCollected) => void;
/** Callback to be call when customer privacy api is ready. _/
onReady?: () => void;
/\*\*
_ Whether consent libraries can use same-domain requests to the Storefront API.
_ Defaults to true if the standard route proxy is enabled in Hydrogen server.
\_/
sameDomainForStorefrontApi?: boolean;
};
declare function useCustomerPrivacy(props: CustomerPrivacyApiProps): {
customerPrivacy: CustomerPrivacy$1 | null;
privacyBanner?: PrivacyBanner$1 | null;
};

type ShopAnalytics = {
/** The shop ID. \*/
shopId: string;
/** The language code that is being displayed to user. _/
acceptedLanguage: LanguageCode$1;
/\*\* The currency code that is being displayed to user. _/
currency: CurrencyCode;
/** The Hydrogen subchannel ID generated by Oxygen in the environment variable. \*/
hydrogenSubchannelId: string | '0';
};
type Consent = Partial<Pick<CustomerPrivacyApiProps, 'checkoutDomain' | 'sameDomainForStorefrontApi' | 'storefrontAccessToken' | 'withPrivacyBanner' | 'country'>> & {
language?: LanguageCode$1;
};
type AnalyticsProviderProps = {
/** React children to render. _/
children?: ReactNode;
/\*\* The cart or cart promise to track for cart analytics. When there is a difference between the state of the cart, `AnalyticsProvider` will trigger a `cart_updated` event. It will also produce `product_added_to_cart` and `product_removed_from_cart` based on cart line quantity and cart line id changes. _/
cart: Promise<CartReturn | null> | CartReturn | null;
/** An optional function to set wether the user can be tracked. Defaults to Customer Privacy API's `window.Shopify.customerPrivacy.analyticsProcessingAllowed()`. \*/
canTrack?: () => boolean;
/** An optional custom payload to pass to all events. e.g language/locale/currency. _/
customData?: Record<string, unknown>;
/\*\* The shop configuration required to publish analytics events to Shopify. Use [`getShopAnalytics`](/docs/api/hydrogen/utilities/getshopanalytics). _/
shop: Promise<ShopAnalytics | null> | ShopAnalytics | null;
/** The customer privacy consent configuration and options. \*/
consent: Consent;
/** @deprecated Disable throwing errors when required props are missing. _/
disableThrowOnError?: boolean;
/** The domain scope of the cookie set with `useShopifyCookies`. **/
cookieDomain?: string;
};
type AnalyticsContextValue = {
/\*\* A function to tell you the current state of if the user can be tracked by analytics. Defaults to Customer Privacy API's `window.Shopify.customerPrivacy.analyticsProcessingAllowed()`. _/
canTrack: NonNullable<AnalyticsProviderProps['canTrack']>;
/** The current cart state. \*/
cart: Awaited<AnalyticsProviderProps['cart']>;
/** The custom data passed in from the `AnalyticsProvider`. _/
customData?: AnalyticsProviderProps['customData'];
/\*\* The previous cart state. _/
prevCart: Awaited<AnalyticsProviderProps['cart']>;
/** A function to publish an analytics event. \*/
publish: typeof publish;
/** A function to register with the analytics provider. _/
register: (key: string) => {
ready: () => void;
};
/\*\* The shop configuration required to publish events to Shopify. _/
shop: Awaited<AnalyticsProviderProps['shop']>;
/** A function to subscribe to analytics events. \*/
subscribe: typeof subscribe;
/** The privacy banner SDK methods with the config applied _/
privacyBanner: PrivacyBanner$1 | null;
/\*\* The customer privacy SDK methods with the config applied _/
customerPrivacy: CustomerPrivacy$1 | null;
};
declare function subscribe(event: typeof AnalyticsEvent.PAGE\*VIEWED, callback: (payload: PageViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.PRODUCT_VIEWED, callback: (payload: ProductViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.COLLECTION_VIEWED, callback: (payload: CollectionViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.CART_VIEWED, callback: (payload: CartViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.SEARCH_VIEWED, callback: (payload: SearchViewPayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.CART_UPDATED, callback: (payload: CartUpdatePayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.PRODUCT_ADD_TO_CART, callback: (payload: CartLineUpdatePayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, callback: (payload: CartLineUpdatePayload) => void): void;
declare function subscribe(event: typeof AnalyticsEvent.CUSTOM_EVENT, callback: (payload: CustomEventPayload) => void): void;
declare function publish(event: typeof AnalyticsEvent.PAGE_VIEWED, payload: PageViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.PRODUCT_VIEWED, payload: ProductViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.COLLECTION_VIEWED, payload: CollectionViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.CART_VIEWED, payload: CartViewPayload): void;
declare function publish(event: typeof AnalyticsEvent.CART_UPDATED, payload: CartUpdatePayload): void;
declare function publish(event: typeof AnalyticsEvent.PRODUCT_ADD_TO_CART, payload: CartLineUpdatePayload): void;
declare function publish(event: typeof AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, payload: CartLineUpdatePayload): void;
declare function publish(event: typeof AnalyticsEvent.CUSTOM_EVENT, payload: OtherData): void;
declare function AnalyticsProvider({ canTrack: customCanTrack, cart: currentCart, children, consent, customData, shop: shopProp, cookieDomain, }: AnalyticsProviderProps): JSX.Element;
declare function useAnalytics(): AnalyticsContextValue;
type ShopAnalyticsProps = {
/\*\*

- The storefront client instance created by [`createStorefrontClient`](docs/api/hydrogen/utilities/createstorefrontclient).
  _/
  storefront: Storefront;
  /\*\*
  _ The `PUBLIC_STOREFRONT_ID` generated by Oxygen in the environment variable.
  \_/
  publicStorefrontId: string;
  };
  declare function getShopAnalytics({ storefront, publicStorefrontId, }: ShopAnalyticsProps): Promise<ShopAnalytics | null>;
  declare const Analytics: {
  CartView: typeof AnalyticsCartView;
  CollectionView: typeof AnalyticsCollectionView;
  CustomView: typeof AnalyticsCustomView;
  ProductView: typeof AnalyticsProductView;
  Provider: typeof AnalyticsProvider;
  SearchView: typeof AnalyticsSearchView;
  };

/\*\*

- The cache key is used to uniquely identify a value in the cache.
  \*/
  type CacheKey = string | readonly unknown[];
  type AddDebugDataParam = {
  displayName?: string;
  response?: Pick<Response, 'url' | 'status' | 'statusText' | 'headers'>;
  };
  type CacheActionFunctionParam = {
  addDebugData: (info: AddDebugDataParam) => void;
  };

type CreateWithCacheOptions = {
/** An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) \*/
cache: Cache;
/** The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. _/
waitUntil: WaitUntil;
/\*\* The `request` object is used by the Subrequest profiler, and to access certain headers for debugging _/
request: CrossRuntimeRequest;
};
type WithCacheRunOptions<T> = {
/** The cache key for this run \*/
cacheKey: CacheKey;
/**
_ Use the `CachingStrategy` to define a custom caching mechanism for your data.
_ Or use one of the pre-defined caching strategies: [`CacheNone`](/docs/api/hydrogen/utilities/cachenone), [`CacheShort`](/docs/api/hydrogen/utilities/cacheshort), [`CacheLong`](/docs/api/hydrogen/utilities/cachelong).
_/
cacheStrategy: CachingStrategy;
/\*\* Useful to avoid accidentally caching bad results _/
shouldCacheResult: (value: T) => boolean;
};
type WithCacheFetchOptions<T> = {
displayName?: string;
/**
_ Use the `CachingStrategy` to define a custom caching mechanism for your data.
_ Or use one of the pre-defined caching strategies: [`CacheNone`](/docs/api/hydrogen/utilities/cachenone), [`CacheShort`](/docs/api/hydrogen/utilities/cacheshort), [`CacheLong`](/docs/api/hydrogen/utilities/cachelong).
\*/
cacheStrategy?: CachingStrategy;
/** The cache key for this fetch _/
cacheKey?: CacheKey;
/\*\* Useful to avoid e.g. caching a successful response that contains an error in the body _/
shouldCacheResponse: (body: T, response: Response) => boolean;
};
type WithCache = {
run: <T>(options: WithCacheRunOptions<T>, fn: ({ addDebugData }: CacheActionFunctionParam) => T | Promise<T>) => Promise<T>;
fetch: <T>(url: string, requestInit: RequestInit, options: WithCacheFetchOptions<T>) => Promise<{
data: T | null;
response: Response;
}>;
};
declare function createWithCache(cacheOptions: CreateWithCacheOptions): WithCache;

/\*\*

- This is a limited implementation of an in-memory cache.
- It only supports the `cache-control` header.
- It does NOT support `age` or `expires` headers.
- @see https://developer.mozilla.org/en-US/docs/Web/API/Cache
  \*/
  declare class InMemoryCache implements Cache {
  #private;
  constructor();
  add(request: RequestInfo): Promise<void>;
  addAll(requests: RequestInfo[]): Promise<void>;
  matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<readonly Response[]>;
  put(request: Request, response: Response): Promise<void>;
  match(request: Request): Promise<Response | undefined>;
  delete(request: Request): Promise<boolean>;
  keys(request?: Request): Promise<Request[]>;
  }

type OtherFormData = {
[key: string]: unknown;
};
type CartAttributesUpdateProps = {
action: 'AttributesUpdateInput';
inputs?: {
attributes: AttributeInput[];
} & OtherFormData;
};
type CartAttributesUpdateRequire = {
action: 'AttributesUpdateInput';
inputs: {
attributes: AttributeInput[];
} & OtherFormData;
};
type CartBuyerIdentityUpdateProps = {
action: 'BuyerIdentityUpdate';
inputs?: {
buyerIdentity: CartBuyerIdentityInput;
} & OtherFormData;
};
type CartBuyerIdentityUpdateRequire = {
action: 'BuyerIdentityUpdate';
inputs: {
buyerIdentity: CartBuyerIdentityInput;
} & OtherFormData;
};
type CartCreateProps = {
action: 'Create';
inputs?: {
input: CartInput;
} & OtherFormData;
};
type CartCreateRequire = {
action: 'Create';
inputs: {
input: CartInput;
} & OtherFormData;
};
type CartDiscountCodesUpdateProps = {
action: 'DiscountCodesUpdate';
inputs?: {
discountCodes: string[];
} & OtherFormData;
};
type CartDiscountCodesUpdateRequire = {
action: 'DiscountCodesUpdate';
inputs: {
discountCodes: string[];
} & OtherFormData;
};
type CartGiftCardCodesUpdateProps = {
action: 'GiftCardCodesUpdate';
inputs?: {
giftCardCodes: string[];
} & OtherFormData;
};
type CartGiftCardCodesUpdateRequire = {
action: 'GiftCardCodesUpdate';
inputs: {
giftCardCodes: string[];
} & OtherFormData;
};
type CartGiftCardCodesAddProps = {
action: 'GiftCardCodesAdd';
inputs?: {
giftCardCodes: string[];
} & OtherFormData;
};
type CartGiftCardCodesAddRequire = {
action: 'GiftCardCodesAdd';
inputs: {
giftCardCodes: string[];
} & OtherFormData;
};
type CartGiftCardCodesRemoveProps = {
action: 'GiftCardCodesRemove';
inputs?: {
giftCardCodes: string[];
} & OtherFormData;
};
type CartGiftCardCodesRemoveRequire = {
action: 'GiftCardCodesRemove';
inputs: {
giftCardCodes: string[];
} & OtherFormData;
};
type OptimisticCartLineInput = CartLineInput & {
selectedVariant?: unknown;
};
type CartLinesAddProps = {
action: 'LinesAdd';
inputs?: {
lines: Array<OptimisticCartLineInput>;
} & OtherFormData;
};
type CartLinesAddRequire = {
action: 'LinesAdd';
inputs: {
lines: Array<OptimisticCartLineInput>;
} & OtherFormData;
};
type CartLinesUpdateProps = {
action: 'LinesUpdate';
inputs?: {
lines: CartLineUpdateInput[];
} & OtherFormData;
};
type CartLinesUpdateRequire = {
action: 'LinesUpdate';
inputs: {
lines: CartLineUpdateInput[];
} & OtherFormData;
};
type CartLinesRemoveProps = {
action: 'LinesRemove';
inputs?: {
lineIds: string[];
} & OtherFormData;
};
type CartLinesRemoveRequire = {
action: 'LinesRemove';
inputs: {
lineIds: string[];
} & OtherFormData;
};
type CartNoteUpdateProps = {
action: 'NoteUpdate';
inputs?: {
note: string;
} & OtherFormData;
};
type CartNoteUpdateRequire = {
action: 'NoteUpdate';
inputs: {
note: string;
} & OtherFormData;
};
type CartSelectedDeliveryOptionsUpdateProps = {
action: 'SelectedDeliveryOptionsUpdate';
inputs?: {
selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
} & OtherFormData;
};
type CartSelectedDeliveryOptionsUpdateRequire = {
action: 'SelectedDeliveryOptionsUpdate';
inputs: {
selectedDeliveryOptions: CartSelectedDeliveryOptionInput[];
} & OtherFormData;
};
type CartMetafieldsSetProps = {
action: 'MetafieldsSet';
inputs?: {
metafields: MetafieldWithoutOwnerId[];
} & OtherFormData;
};
type CartMetafieldsSetRequire = {
action: 'MetafieldsSet';
inputs: {
metafields: MetafieldWithoutOwnerId[];
} & OtherFormData;
};
type CartMetafieldDeleteProps = {
action: 'MetafieldsDelete';
inputs?: {
key: Scalars['String']['input'];
} & OtherFormData;
};
type CartMetafieldDeleteRequire = {
action: 'MetafieldsDelete';
inputs: {
key: Scalars['String']['input'];
} & OtherFormData;
};
type CartDeliveryAddressesAddProps = {
action: 'DeliveryAddressesAdd';
inputs?: {
addresses: Array<CartSelectableAddressInput>;
} & OtherFormData;
};
type CartDeliveryAddressesAddRequire = {
action: 'DeliveryAddressesAdd';
inputs: {
addresses: Array<CartSelectableAddressInput>;
} & OtherFormData;
};
type CartDeliveryAddressesRemoveProps = {
action: 'DeliveryAddressesRemove';
inputs?: {
addressIds: Array<string> | Array<Scalars['ID']['input']>;
} & OtherFormData;
};
type CartDeliveryAddressesRemoveRequire = {
action: 'DeliveryAddressesRemove';
inputs: {
