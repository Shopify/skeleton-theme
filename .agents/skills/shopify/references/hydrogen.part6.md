# Hydrogen (part 6 of 6)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `hydrogen.md`, `hydrogen.part2.md`, `hydrogen.part3.md`, `hydrogen.part4.md`, `hydrogen.part5.md` — and you should read the ones relevant to your task.

---
  children: ({ option }: {
  option: VariantOption;
  }) => ReactNode;
  };
  /\*\*
- @deprecated VariantSelector will be deprecated and removed in the next major version 2025-10
- Please use [getProductOptions](https://shopify.dev/docs/api/hydrogen/latest/utilities/getproductoptions),
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/latest/utilities/getselectedproductoptions),
- [getAdjacentAndFirstAvailableVariants](https://shopify.dev/docs/api/hydrogen/latest/utilities/getadjacentandfirstavailablevariants) utils instead.
- and [useSelectedOptionInUrlParam](https://shopify.dev/docs/api/hydrogen/latest/utilities/useselectedoptioninurlparam)
- For a full implementation see the Skeleton template [routes/product.$handle.tsx](https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx).
  \*/
  declare function VariantSelector({ handle, options: \_options, variants: \_variants, productPath, waitForNavigation, selectedVariant, children, }: VariantSelectorProps): react.FunctionComponentElement<{
  children?: ReactNode | undefined;
  }>;
  type GetSelectedProductOptions = (request: Request) => SelectedOptionInput[];
  /\*\*
- Extract searchParams from a Request instance and return an array of selected options.
- @param request - The Request instance to extract searchParams from.
- @returns An array of selected options.
- @example Basic usage:
- ```tsx

  ```

-
- import {getSelectedProductOptions} from '@shopify/hydrogen';
-
- // Given a request url of `/products/product-handle?color=red&size=large`
-
- const selectedOptions = getSelectedProductOptions(request);
-
- // selectedOptions will equal:
- // [
- // {name: 'color', value: 'red'},
- // {name: 'size', value: 'large'}
- // ]
- ```
   **/
  declare const getSelectedProductOptions: GetSelectedProductOptions;
  ```

/\*\*

- Official Hydrogen Preset for React Router 7.12.x
-
- Provides optimal React Router configuration for Hydrogen applications on Oxygen.
- Enables validated performance optimizations while ensuring CLI compatibility.
-
- React Router 7.12.x Feature Support Matrix for Hydrogen 2025.7.0
-
- +----------------------------------+----------+----------------------------------+
- | Feature | Status | Notes |
- +----------------------------------+----------+----------------------------------+
- | CORE CONFIGURATION |
- +----------------------------------+----------+----------------------------------+
- | appDirectory: 'app' | Enabled | Core application structure |
- | buildDirectory: 'dist' | Enabled | Build output configuration |
- | ssr: true | Enabled | Server-side rendering |
- +----------------------------------+----------+----------------------------------+
- | PERFORMANCE FLAGS |
- +----------------------------------+----------+----------------------------------+
- | v8_middleware | Enabled | Required for Hydrogen context |
- | v8_splitRouteModules | Enabled | Route code splitting |
- | unstable_optimizeDeps | Enabled | Build performance optimization |
- +----------------------------------+----------+----------------------------------+
- | ROUTE DISCOVERY |
- +----------------------------------+----------+----------------------------------+
- | routeDiscovery: { mode: 'lazy' } | Default | Lazy route loading |
- | routeDiscovery: { mode: 'init' } | Allowed | Eager route loading |
- +----------------------------------+----------+----------------------------------+
- | UNSUPPORTED FEATURES |
- +----------------------------------+----------+----------------------------------+
- | basename: '/path' | Blocked | CLI infrastructure limitation |
- | prerender: ['/routes'] | Blocked | Plugin incompatibility |
- | serverBundles: () => {} | Blocked | Manifest incompatibility |
- | buildEnd: () => {} | Blocked | CLI bypasses hook execution |
- | unstable_subResourceIntegrity | Blocked | CSP nonce/hash conflict |
- | v8_viteEnvironmentApi | Blocked | CLI fallback detection used |
- +----------------------------------+----------+----------------------------------+
-
- @version 2025.7.0
  \*/
  declare function hydrogenPreset(): Preset;

declare const RichText: typeof RichText$1;

type GraphiQLLoader = (args: LoaderFunctionArgs) => Promise<Response>;
declare const graphiqlLoader: GraphiQLLoader;

type StorefrontRedirect = {
/** The [Storefront client](/docs/api/hydrogen/utilities/createstorefrontclient) instance \*/
storefront: Storefront<I18nBase>;
/** The [MDN Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object that was passed to the `server.ts` request handler. _/
request: Request;
/\*\* The [MDN Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object created by `handleRequest` _/
response?: Response;
/** By default the `/admin` route is redirected to the Shopify Admin page for the current storefront. Disable this redirect by passing `true`. \*/
noAdminRedirect?: boolean;
/** By default, query parameters are not used to match redirects. Set this to `true` if you'd like redirects to be query parameter sensitive \*/
matchQueryParams?: boolean;
};
/\*\*

- Queries the Storefront API to see if there is any redirect
- created for the current route and performs it. Otherwise,
- it returns the response passed in the parameters. Useful for
- conditionally redirecting after a 404 response.
-
- @see {@link https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect Creating URL redirects in Shopify}
  \*/
  declare function storefrontRedirect(options: StorefrontRedirect): Promise<Response>;

interface SeoConfig {
/**
_ The `title` HTML element defines the document's title that is shown in a browser's title bar or a page's tab. It
_ only contains text; tags within the element are ignored. \*
_ @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
_/
title?: Maybe<string>;
/**
_ Generate the title from a template that includes a `%s` placeholder for the title.
_
_ @example
_ `js
     * {
     *   title: 'My Page',
     *   titleTemplate: 'My Site - %s',
     * }
     * `
_/
titleTemplate?: Maybe<string> | null;
/\*\*
_ The media associated with the given page (images, videos, etc). If you pass a string, it will be used as the
_ `og:image` meta tag. If you pass an object or an array of objects, that will be used to generate `og:<type of
_ media>`meta tags. The`url`property should be the URL of the media. The`height`and`width`properties are
     * optional and should be the height and width of the media. The`altText`property is optional and should be a
     * description of the media.
     *
     * @example
     * ```js
     * {
     *   media: [
     *     {
     *       url: 'https://example.com/image.jpg',
     *       type: 'image',
     *       height: '400',
     *       width: '400',
     *       altText: 'A custom snowboard with an alpine color pallet.',
     *     }
     *   ]
     * }
     * ```
     *
     */
    media?: Maybe<string> | Partial<SeoMedia> | (Partial<SeoMedia> | Maybe<string>)[];
    /**
     * The description of the page. This is used in the`name="description"`meta tag as well as the`og:description`meta
     * tag.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
     */
    description?: Maybe<string>;
    /**
     * The canonical URL of the page. This is used to tell search engines which URL is the canonical version of a page.
     * This is useful when you have multiple URLs that point to the same page. The value here will be used in the
     *`rel="canonical"`link tag as well as the`og:url`meta tag.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
     */
    url?: Maybe<string>;
    /**
     * The handle is used to generate the`twitter:site`and`twitter:creator`meta tags. Include the`@`symbol in the
     * handle.
     *
     * @example
     * ```js
     * {
     *   handle: '@shopify'
     * }
     * ```
     */
    handle?: Maybe<string>;
    /**
     * The`jsonLd`property is used to generate the`application/ld+json`script tag. This is used to provide structured
     * data to search engines. The value should be an object that conforms to the schema.org spec. The`type`property
     * should be the type of schema you are using. The`type`property is required and should be one of the following:
     *
     * -`Product`     * -`ItemList`     * -`Organization`     * -`WebSite`     * -`WebPage`     * -`BlogPosting`     * -`Thing`     *
     * The value is validated via [schema-dts](https://www.npmjs.com/package/schema-dts)
     *
     * @example
     * ```js
     * {
     *   jsonLd: {
     *     '@context': 'https://schema.org',
     *     '@type': 'Product',
     *     name: 'My Product',
     *     image: 'https://hydrogen.shop/image.jpg',
     *     description: 'A product that is great',
     *     sku: '12345',
     *     mpn: '12345',
     *     brand: {
     *       '@type': 'Thing',
     *       name: 'My Brand',
     *     },
     *     aggregateRating: {
     *       '@type': 'AggregateRating',
     *       ratingValue: '4.5',
     *       reviewCount: '100',
     *     },
     *     offers: {
     *       '@type': 'Offer',
     *       priceCurrency: 'USD',
     *       price: '100',
     *       priceValidUntil: '2020-11-05',
     *       itemCondition: 'https://schema.org/NewCondition',
     *       availability: 'https://schema.org/InStock',
     *       seller: {
     *         '@type': 'Organization',
     *         name: 'My Brand',
     *       },
     *     },
     *   }
     * }
     * ```
     *
     * @see https://schema.org/docs/schemas.html
     * @see https://developers.google.com/search/docs/guides/intro-structured-data
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
     *
     */
    jsonLd?: WithContext<Thing> | WithContext<Thing>[];
    /**
     * The`alternates`property is used to specify the language and geographical targeting when you have multiple
     * versions of the same page in different languages. The`url`property tells search engines about these variations
     * and helps them to serve the correct version to their users.
     *
     * @example
     * ```js
     * {
     *   alternates: [
     *     {
     *       language: 'en-US',
     *       url: 'https://hydrogen.shop/en-us',
     *       default: true,
     *     },
     *     {
     *       language: 'fr-CA',
     *       url: 'https://hydrogen.shop/fr-ca',
     *     },
     *   ]
     * }
     * ```
     *
     * @see https://support.google.com/webmasters/answer/189077?hl=en
     */
    alternates?: LanguageAlternate | LanguageAlternate[];
    /**
     * The`robots` property is used to specify the robots meta tag. This is used to tell search engines which pages
_ should be indexed and which should not.
_
_ @see https://developers.google.com/search/reference/robots_meta_tag
_/
robots?: RobotsOptions;
}
/\*\*

- @see https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
  _/
  interface RobotsOptions {
  /\*\*
  _ Set the maximum size of an image preview for this page in a search results Can be one of the following: \*
  _ - `none` - No image preview is to be shown.
  _ - `standard` - A default image preview may be shown.
  _ - `large` - A larger image preview, up to the width of the viewport, may be shown.
  _
  _ If no value is specified a default image preview size is used.
  _/
  maxImagePreview?: 'none' | 'standard' | 'large';
  /**
  _ A number representing the maximum of amount characters to use as a textual snippet for a search result. This value
  _ can also be set to one of the following special values: \*
  _ - 0 - No snippet is to be shown. Equivalent to nosnippet.
  _ - 1 - The Search engine will choose the snippet length that it believes is most effective to help users discover
  _ your content and direct users to your site
  _ - -1 - No limit on the number of characters that can be shown in the snippet.
  \*/
  maxSnippet?: number;
  /**
  _ The maximum number of seconds for videos on this page to show in search results. This value can also be set to one
  _ of the following special values: \*
  _ - 0 - A static image may be used with the `maxImagePreview` setting.
  _ - 1 - There is no limit to the size of the video preview. \*
  _ This applies to all forms of search results (at Google: web search, Google Images, Google Videos, Discover,
  _ Assistant).
  _/
  maxVideoPreview?: number;
  /\*\*
  _ Do not show a cached link in search results.
  _/
  noArchive?: boolean;
  /\*\*
  _ Do not follow the links on this page. \*
  _ @see https://developers.google.com/search/docs/advanced/guidelines/qualify-outbound-links
  _/
  noFollow?: boolean;
  /**
  _ Do not index images on this page.
  _/
  noImageIndex?: boolean;
  /**
  _ Do not show this page, media, or resource in search results.
  _/
  noIndex?: boolean;
  /**
  _ Do not show a text snippet or video preview in the search results for this page.
  _/
  noSnippet?: boolean;
  /**
  _ Do not offer translation of this page in search results.
  _/
  noTranslate?: boolean;
  /**
  _ Do not show this page in search results after the specified date/time.
  _/
  unavailableAfter?: string;
  }
  interface LanguageAlternate {
  /**
  _ Language code for the alternate page. This is used to generate the hreflang meta tag property.
  _/
  language: string;
  /**
  _ Whether the alternate page is the default page. This will add the `x-default` attribution to the language code.
  _/
  default?: boolean;
  /**
  _ The url of the alternate page. This is used to generate the hreflang meta tag property.
  _/
  url: string;
  }
  type SeoMedia = {
  /**
  _ Used to generate og:<type of media> meta tag
  _/
  type: 'image' | 'video' | 'audio';
  /**
  _ The url value populates both url and secure_url and is used to infer the og:<type of media>:type meta tag.
  _/
  url: Maybe<string> | undefined;
  /**
  _ The height in pixels of the media. This is used to generate the og:<type of media>:height meta tag.
  _/
  height: Maybe<number> | undefined;
  /**
  _ The width in pixels of the media. This is used to generate the og:<type of media>:width meta tag.
  _/
  width: Maybe<number> | undefined;
  /\*\*
  _ The alt text for the media. This is used to generate the og:<type of media>:alt meta tag.
  _/
  altText: Maybe<string> | undefined;
  };

type GetSeoMetaReturn = ReturnType<MetaFunction>;
type Optional<T> = T | null | undefined;
/\*\*

- Generate a Remix meta array from one or more SEO configuration objects. This is useful to pass SEO configuration for the parent route(s) and the current route. Similar to `Object.assign()`, each property is overwritten based on the object order. The exception is `jsonLd`, which is preserved so that each route has it's own independent jsonLd meta data.
  \*/
  declare function getSeoMeta(...seoInputs: Optional<SeoConfig>[]): GetSeoMetaReturn;

interface SeoHandleFunction<Loader extends LoaderFunction | unknown = unknown> {
(args: {
data: Loader extends LoaderFunction ? Awaited<ReturnType<Loader>> : unknown;
id: string;
params: Params;
pathname: Location['pathname'];
search: Location['search'];
hash: Location['hash'];
key: string;
}): Partial<SeoConfig>;
}
interface SeoProps {
/** Enable debug mode that prints SEO properties for route in the console \*/
debug?: boolean;
}
/**

- @deprecated - use `getSeoMeta` instead
  \*/
  declare function Seo({ debug }: SeoProps): react.FunctionComponentElement<{
  children?: react.ReactNode | undefined;
  }>;

declare function ShopPayButton(props: ComponentProps<typeof ShopPayButton$1>): react_jsx_runtime.JSX.Element;

type SITEMAP*INDEX_TYPE = 'pages' | 'products' | 'collections' | 'blogs' | 'articles' | 'metaObjects';
interface SitemapIndexOptions {
/** The Storefront API Client from Hydrogen \*/
storefront: Storefront;
/** A Remix Request object */
request: Request;
/\*\* The types of pages to include in the sitemap index. \_/
types?: SITEMAP_INDEX_TYPE[];
/** Add a URL to a custom child sitemap \*/
customChildSitemaps?: string[];
}
/**

- Generate a sitemap index that links to separate sitemaps for each resource type. Returns a standard Response object.
  _/
  declare function getSitemapIndex(options: SitemapIndexOptions): Promise<Response>;
  interface GetSiteMapOptions {
  /\*\* The params object from Remix _/
  params: LoaderFunctionArgs['params'];
  /** The Storefront API Client from Hydrogen \*/
  storefront: Storefront;
  /** A Remix Request object _/
  request: Request;
  /\*\* A function that produces a canonical url for a resource. It is called multiple times for each locale supported by the app. _/
  getLink: (options: {
  type: string | SITEMAP*INDEX_TYPE;
  baseUrl: string;
  handle?: string;
  locale?: string;
  }) => string;
  /** An array of locales to generate alternate tags \*/
  locales?: string[];
  /** Optionally customize the changefreq property for each URL */
  getChangeFreq?: (options: {
  type: string | SITEMAP*INDEX_TYPE;
  handle: string;
  }) => string;
  /\*\* If the sitemap has no links, fallback to rendering a link to the homepage. This prevents errors in Google's search console. Defaults to `/`. */
  noItemsFallback?: string;
  }
  /\*\*
- Generate a sitemap for a specific resource type.
  \*/
  declare function getSitemap(options: GetSiteMapOptions): Promise<Response>;

export { Analytics, AnalyticsEvent, CacheCustom, type CacheKey, CacheLong, CacheNone, CacheShort, type CachingStrategy, type CartActionInput, CartForm, type CartLineUpdatePayload, type CartQueryDataReturn, type CartQueryOptions, type CartQueryReturn, type CartReturn, type CartUpdatePayload, type CartViewPayload, type CollectionViewPayload, type ConsentStatus, type CookieOptions, type CreateStorefrontClientForDocs, type CreateStorefrontClientOptions, type CustomEventMap$1 as CustomEventMap, type CustomerAccount, type CustomerAccountMutations, type CustomerAccountQueries, type CustomerPrivacy$1 as CustomerPrivacy, type CustomerPrivacyApiProps, type CustomerPrivacyConsentConfig, type HydrogenCart, type HydrogenCartCustom, type HydrogenContext, type HydrogenEnv, type HydrogenRouterContextProvider, type HydrogenSession, type HydrogenSessionData, type I18nBase, InMemoryCache, type MetafieldWithoutOwnerId, type NoStoreStrategy, NonceProvider, type OptimisticCart, type OptimisticCartLine, type OptimisticCartLineInput, OptimisticInput, type PageViewPayload, Pagination, type PrivacyBanner$1 as PrivacyBanner, type ProductViewPayload, RichText, Script, type SearchViewPayload, Seo, type SeoConfig, type SeoHandleFunction, type SetConsentHeadlessParams, type ShopAnalytics, ShopPayButton, type Storefront, type StorefrontApiErrors, type StorefrontClient, type StorefrontForDoc, type StorefrontMutationOptionsForDocs, type StorefrontMutations, type StorefrontQueries, type StorefrontQueryOptionsForDocs, type VariantOption, type VariantOptionValue, VariantSelector, type VisitorConsent, type VisitorConsentCollected, type WithCache, cartAttributesUpdateDefault, cartBuyerIdentityUpdateDefault, cartCreateDefault, cartDiscountCodesUpdateDefault, cartGetDefault, cartGetIdDefault, cartGiftCardCodesAddDefault, cartGiftCardCodesRemoveDefault, cartGiftCardCodesUpdateDefault, cartLinesAddDefault, cartLinesRemoveDefault, cartLinesUpdateDefault, cartMetafieldDeleteDefault, cartMetafieldsSetDefault, cartNoteUpdateDefault, cartSelectedDeliveryOptionsUpdateDefault, cartSetIdDefault, changelogHandler, createCartHandler, createContentSecurityPolicy, createCustomerAccountClient, createHydrogenContext, createRequestHandler, createStorefrontClient, createWithCache, formatAPIResult, generateCacheControlHeader, getPaginationVariables, getSelectedProductOptions, getSeoMeta, getShopAnalytics, getSitemap, getSitemapIndex, graphiqlLoader, hydrogenContext, hydrogenPreset, hydrogenRoutes, storefrontRedirect, useAnalytics, useCustomerPrivacy, useNonce, useOptimisticCart, useOptimisticData, useOptimisticVariant };

```

```
