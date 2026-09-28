# Hydrogen (part 5 of 6)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `hydrogen.md`, `hydrogen.part2.md`, `hydrogen.part3.md`, `hydrogen.part4.md`, `hydrogen.part6.md` — and you should read the ones relevant to your task.

---
addressIds: Array<string> | Array<Scalars['ID']['input']>;
} & OtherFormData;
};
type CartDeliveryAddressesUpdateProps = {
action: 'DeliveryAddressesUpdate';
inputs?: {
addresses: Array<CartSelectableAddressUpdateInput>;
} & OtherFormData;
};
type CartDeliveryAddressesUpdateRequire = {
action: 'DeliveryAddressesUpdate';
inputs: {
addresses: Array<CartSelectableAddressUpdateInput>;
} & OtherFormData;
};
type CartDeliveryAddressesReplaceProps = {
action: 'DeliveryAddressesReplace';
inputs?: {
addresses: Array<CartSelectableAddressInput>;
} & OtherFormData;
};
type CartDeliveryAddressesReplaceRequire = {
action: 'DeliveryAddressesReplace';
inputs: {
addresses: Array<CartSelectableAddressInput>;
} & OtherFormData;
};
type CartCustomProps = {
action: `Custom${string}`;
inputs?: Record<string, unknown>;
};
type CartCustomRequire = {
action: `Custom${string}`;
inputs: Record<string, unknown>;
};
type CartFormCommonProps = {
/**
_ Children nodes of CartForm.
_ Children can be a render prop that receives the fetcher.
\*/
children: ReactNode | ((fetcher: FetcherWithComponents<any>) => ReactNode);
/**
_ The route to submit the form to. Defaults to the current route.
_/
route?: string;
/\*\*
_ Optional key to use for the fetcher.
_ @see https://remix.run/hooks/use-fetcher#key
\*/
fetcherKey?: string;
};
type CartActionInputProps = CartAttributesUpdateProps | CartBuyerIdentityUpdateProps | CartCreateProps | CartDiscountCodesUpdateProps | CartGiftCardCodesUpdateProps | CartGiftCardCodesAddProps | CartGiftCardCodesRemoveProps | CartLinesAddProps | CartLinesUpdateProps | CartLinesRemoveProps | CartNoteUpdateProps | CartSelectedDeliveryOptionsUpdateProps | CartMetafieldsSetProps | CartMetafieldDeleteProps | CartDeliveryAddressesAddProps | CartDeliveryAddressesRemoveProps | CartDeliveryAddressesUpdateProps | CartDeliveryAddressesReplaceProps | CartCustomProps;
type CartActionInput = CartAttributesUpdateRequire | CartBuyerIdentityUpdateRequire | CartCreateRequire | CartDiscountCodesUpdateRequire | CartGiftCardCodesUpdateRequire | CartGiftCardCodesAddRequire | CartGiftCardCodesRemoveRequire | CartLinesAddRequire | CartLinesUpdateRequire | CartLinesRemoveRequire | CartNoteUpdateRequire | CartSelectedDeliveryOptionsUpdateRequire | CartMetafieldsSetRequire | CartMetafieldDeleteRequire | CartDeliveryAddressesAddRequire | CartDeliveryAddressesRemoveRequire | CartDeliveryAddressesUpdateRequire | CartDeliveryAddressesReplaceRequire | CartCustomRequire;
type CartFormProps = CartActionInputProps & CartFormCommonProps;
declare function CartForm({ children, action, inputs, route, fetcherKey, }: CartFormProps): JSX.Element;
declare namespace CartForm {
var INPUT_NAME: string;
var ACTIONS: {
readonly AttributesUpdateInput: "AttributesUpdateInput";
readonly BuyerIdentityUpdate: "BuyerIdentityUpdate";
readonly Create: "Create";
readonly DiscountCodesUpdate: "DiscountCodesUpdate";
readonly GiftCardCodesUpdate: "GiftCardCodesUpdate";
readonly GiftCardCodesAdd: "GiftCardCodesAdd";
readonly GiftCardCodesRemove: "GiftCardCodesRemove";
readonly LinesAdd: "LinesAdd";
readonly LinesRemove: "LinesRemove";
readonly LinesUpdate: "LinesUpdate";
readonly NoteUpdate: "NoteUpdate";
readonly SelectedDeliveryOptionsUpdate: "SelectedDeliveryOptionsUpdate";
readonly MetafieldsSet: "MetafieldsSet";
readonly MetafieldDelete: "MetafieldDelete";
readonly DeliveryAddressesAdd: "DeliveryAddressesAdd";
readonly DeliveryAddressesUpdate: "DeliveryAddressesUpdate";
readonly DeliveryAddressesRemove: "DeliveryAddressesRemove";
readonly DeliveryAddressesReplace: "DeliveryAddressesReplace";
};
var getFormInput: (formData: FormData) => CartActionInput;
}

declare const cartGetIdDefault: (requestHeaders: CrossRuntimeRequest["headers"]) => () => string | undefined;

type CookieOptions = {
maxage?: number;
expires?: Date | number | string;
samesite?: 'Lax' | 'Strict' | 'None';
secure?: boolean;
httponly?: boolean;
domain?: string;
path?: string;
};
declare const cartSetIdDefault: (cookieOptions?: CookieOptions) => (cartId: string) => Headers;

type LikeACart = {
lines: {
nodes: Array<unknown>;
};
};
type OptimisticCartLine<T = CartLine | CartReturn> = T extends LikeACart ? T['lines']['nodes'][number] & {
isOptimistic?: boolean;
} : T & {
isOptimistic?: boolean;
};
type OptimisticCart<T = CartReturn> = T extends undefined | null ? // This is the null/undefined case, where the cart has yet to be created.
{
isOptimistic?: boolean;
lines: {
nodes: Array<OptimisticCartLine>;
};
totalQuantity?: number;
} & Omit<PartialDeep<CartReturn>, 'lines'> : Omit<T, 'lines'> & {
isOptimistic?: boolean;
lines: {
nodes: Array<OptimisticCartLine<T>>;
};
totalQuantity?: number;
};
/\*\*

- @param cart The cart object from `context.cart.get()` returned by a server loader.
-
- @returns A new cart object augmented with optimistic state for `lines` and `totalQuantity`. Each cart line item that is optimistically added includes an `isOptimistic` property. Also if the cart has _any_ optimistic state, a root property `isOptimistic` will be set to `true`.
  \*/
  declare function useOptimisticCart<DefaultCart = {
  lines?: {
  nodes: Array<{
  id: string;
  quantity: number;
  merchandise: {
  is: string;
  };
  }>;
  };
  }>(cart?: DefaultCart): OptimisticCart<DefaultCart>;

/\*\*

- A custom Remix loader handler that fetches the changelog.json from GitHub.
- It is used by the `upgrade` command inside the route `https://hydrogen.shopify.dev/changelog.json`
  \*/
  declare function changelogHandler({ request, changelogUrl, }: {
  request: Request;
  changelogUrl?: string;
  }): Promise<Response>;

/\*\*

- Grouped export of all Hydrogen context keys for convenient access.
- Use with React Router's context.get() pattern:
-
- @example
- ```ts

  ```

- import { hydrogenContext } from '@shopify/hydrogen';
-
- export async function loader({ context }) {
- const storefront = context.get(hydrogenContext.storefront);
- const cart = context.get(hydrogenContext.cart);
- }
- ```
   */
  declare const hydrogenContext: {
      readonly storefront: react_router.RouterContext<Storefront<I18nBase>>;
      readonly cart: react_router.RouterContext<HydrogenCart | HydrogenCartCustom<CustomMethodsBase>>;
      readonly customerAccount: react_router.RouterContext<CustomerAccount>;
      readonly env: react_router.RouterContext<HydrogenEnv>;
      readonly session: react_router.RouterContext<HydrogenSession<react_router.SessionData, any>>;
      readonly waitUntil: react_router.RouterContext<WaitUntil>;
  };
  ```

type HydrogenContextOptions<TSession extends HydrogenSession = HydrogenSession, TCustomMethods extends CustomMethodsBase | undefined = {}, TI18n extends I18nBase = I18nBase, TEnv extends HydrogenEnv = Env> = {
env: TEnv;
request: CrossRuntimeRequest;
/** An instance that implements the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) \*/
cache?: Cache;
/** The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. _/
waitUntil?: WaitUntil;
/\*\* Any cookie implementation. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation. _/
session: TSession;
/** An object containing a country code and language code \*/
i18n?: TI18n;
/** Whether it should print GraphQL errors automatically. Defaults to true _/
logErrors?: boolean | ((error?: Error) => boolean);
/\*\* Storefront client overwrite options. See documentation for createStorefrontClient for more information. _/
storefront?: {
/** Storefront API headers. Default values set from request header. \*/
headers?: CreateStorefrontClientOptions<TI18n>['storefrontHeaders'];
/** Override the Storefront API version for this query. _/
apiVersion?: CreateStorefrontClientOptions<TI18n>['storefrontApiVersion'];
};
/\*\* Customer Account client overwrite options. See documentation for createCustomerAccountClient for more information. _/
customerAccount?: {
/** Override the version of the API \*/
apiVersion?: CustomerAccountOptions['customerApiVersion'];
/** This is the route in your app that authorizes the customer after logging in. Make sure to call `customer.authorize()` within the loader on this route. It defaults to `/account/authorize`. _/
authUrl?: CustomerAccountOptions['authUrl'];
/\*\* Use this method to overwrite the default logged-out redirect behavior. The default handler [throws a redirect](https://remix.run/docs/en/main/utils/redirect#:~:text=!session) to `/account/login` with current path as `return_to` query param. _/
customAuthStatusHandler?: CustomerAccountOptions['customAuthStatusHandler'];
/** Deprecated. `unstableB2b` is now stable. Please remove. \*/
unstableB2b?: CustomerAccountOptions['unstableB2b'];
};
/** Cart handler overwrite options. See documentation for createCartHandler for more information. _/
cart?: {
/\*\* A function that returns the cart id in the form of `gid://shopify/Cart/c1-123`. _/
getId?: CartHandlerOptions['getCartId'];
/** A function that sets the cart ID. \*/
setId?: CartHandlerOptions['setCartId'];
/**
_ The cart query fragment used by `cart.get()`.
_ See the [example usage](/docs/api/hydrogen/utilities/createcarthandler#example-cart-fragments) in the documentation.
_/
queryFragment?: CartHandlerOptions['cartQueryFragment'];
/\*\*
_ The cart mutation fragment used in most mutation requests, except for `setMetafields` and `deleteMetafield`.
_ See the [example usage](/docs/api/hydrogen/utilities/createcarthandler#example-cart-fragments) in the documentation.
_/
mutateFragment?: CartHandlerOptions['cartMutateFragment'];
/**
_ Define custom methods or override existing methods for your cart API instance.
_ See the [example usage](/docs/api/hydrogen/utilities/createcarthandler#example-custom-methods) in the documentation.
\*/
customMethods?: TCustomMethods;
};
buyerIdentity?: CartBuyerIdentityInput;
};
interface HydrogenContext<TSession extends HydrogenSession = HydrogenSession, TCustomMethods extends CustomMethodsBase | undefined = {}, TI18n extends I18nBase = I18nBase, TEnv extends HydrogenEnv = Env> {
/** A GraphQL client for querying the [Storefront API](https://shopify.dev/docs/api/storefront). _/
storefront: StorefrontClient<TI18n>['storefront'];
/\*\* A GraphQL client for querying the [Customer Account API](https://shopify.dev/docs/api/customer). It also provides methods to authenticate and check if the user is logged in. _/
customerAccount: CustomerAccount;
/** A collection of utilities used to interact with the cart. \*/
cart: TCustomMethods extends CustomMethodsBase ? HydrogenCartCustom<TCustomMethods> : HydrogenCart;
env: TEnv;
/** The `waitUntil` function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. _/
waitUntil?: WaitUntil;
/\*\* Any cookie implementation. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation. _/
session: TSession;
}
declare function createHydrogenContext<TSession extends HydrogenSession, TCustomMethods extends CustomMethodsBase | undefined = {}, TI18n extends I18nBase = I18nBase, TEnv extends HydrogenEnv = Env, TAdditionalContext extends Record<string, any> = {}>(options: HydrogenContextOptions<TSession, TCustomMethods, TI18n, TEnv>, additionalContext?: TAdditionalContext): HydrogenRouterContextProvider<TSession, TCustomMethods, TI18n, TEnv> & TAdditionalContext;

type CreateRequestHandlerOptions<Context = unknown> = {
/** React Router's server build \*/
build: ServerBuild;
/** React Router's mode _/
mode?: string;
/\*\*
_ Function to provide the load context for each request.
_ It must contain Hydrogen's storefront client instance
_ for other Hydrogen utilities to work properly.
_/
getLoadContext?: (request: Request) => Promise<Context> | Context;
/\*\*
_ Whether to include the `powered-by` header in responses
_ @default true
_/
poweredByHeader?: boolean;
/**
_ Collect tracking information from subrequests such as cookies
_ and forward them to the browser. Disable this if you are not
_ using Hydrogen's built-in analytics.
_ @default true
\*/
collectTrackingInformation?: boolean;
/**
_ Whether to proxy standard routes such as `/api/.../graphql.json` (Storefront API).
_ You can disable this if you are handling these routes yourself. Ensure that
_ the proxy works if you rely on Hydrogen's built-in behaviors such as analytics.
_ @default true
\*/
proxyStandardRoutes?: boolean;
};
/\*\*

- Creates a request handler for Hydrogen apps using React Router.
  \*/
  declare function createRequestHandler<Context = unknown>({ build, mode, poweredByHeader, getLoadContext, collectTrackingInformation, proxyStandardRoutes, }: CreateRequestHandlerOptions<Context>): (request: Request) => Promise<Response>;

declare const NonceProvider: react.Provider<string | undefined>;
declare const useNonce: () => string | undefined;
type ContentSecurityPolicy = {
/** A randomly generated nonce string that should be passed to any custom `script` element \*/
nonce: string;
/** The content security policy header _/
header: string;
NonceProvider: ComponentType<{
children: ReactNode;
}>;
};
type DirectiveValues = string[] | string | boolean;
type CreateContentSecurityPolicy = {
defaultSrc?: DirectiveValues;
scriptSrc?: DirectiveValues;
scriptSrcElem?: DirectiveValues;
styleSrc?: DirectiveValues;
imgSrc?: DirectiveValues;
connectSrc?: DirectiveValues;
fontSrc?: DirectiveValues;
objectSrc?: DirectiveValues;
mediaSrc?: DirectiveValues;
frameSrc?: DirectiveValues;
sandbox?: DirectiveValues;
reportUri?: DirectiveValues;
childSrc?: DirectiveValues;
formAction?: DirectiveValues;
frameAncestors?: DirectiveValues;
pluginTypes?: DirectiveValues;
baseUri?: DirectiveValues;
reportTo?: DirectiveValues;
workerSrc?: DirectiveValues;
manifestSrc?: DirectiveValues;
prefetchSrc?: DirectiveValues;
navigateTo?: DirectiveValues;
upgradeInsecureRequests?: boolean;
blockAllMixedContent?: boolean;
};
type ShopifyDomains = {
/\*\* The production shop checkout domain url. _/
checkoutDomain?: string;
/** The production shop domain url. \*/
storeDomain?: string;
};
type ShopProp = {
/** Shop specific configurations \*/
shop?: ShopifyDomains;
};
/\*\*

- @param directives - Pass custom [content security policy directives](https://content-security-policy.com/). This is important if you load content in your app from third-party domains.
  \*/
  declare function createContentSecurityPolicy(props?: CreateContentSecurityPolicy & ShopProp): ContentSecurityPolicy;

interface HydrogenScriptProps {
/\*_ Wait to load the script until after the page hydrates. This prevents hydration errors for scripts that modify the DOM. Note: For security, `nonce` is not supported when using `waitForHydration`. Instead you need to add the domain of the script directly to your [Content Securitiy Policy directives](https://shopify.dev/docs/storefronts/headless/hydrogen/content-security-policy#step-3-customize-the-content-security-policy)._/
waitForHydration?: boolean;
}
interface ScriptAttributes extends ScriptHTMLAttributes<HTMLScriptElement> {
}
declare const Script: react.ForwardRefExoticComponent<HydrogenScriptProps & ScriptAttributes & react.RefAttributes<HTMLScriptElement>>;

declare function createCustomerAccountClient({ session, customerAccountId, shopId, customerApiVersion, request, waitUntil, authUrl, customAuthStatusHandler, logErrors, loginPath, authorizePath, defaultRedirectPath, language, }: CustomerAccountOptions): CustomerAccount;

declare function hydrogenRoutes(currentRoutes: Array<RouteConfigEntry>): Promise<Array<RouteConfigEntry>>;

declare function useOptimisticData<T>(identifier: string): T;
type OptimisticInputProps = {
/**
_ A unique identifier for the optimistic input. Use the same identifier in `useOptimisticData`
_ to retrieve the optimistic data from actions.
\*/
id: string;
/**
_ The data to be stored in the optimistic input. Use for creating an optimistic successful state
_ of this form action.
\*/
data: Record<string, unknown>;
};
declare function OptimisticInput({ id, data }: OptimisticInputProps): react_jsx_runtime.JSX.Element;

declare global {
interface Window {
\_\_hydrogenHydrated?: boolean;
}
}
type Connection<NodesType> = {
nodes: Array<NodesType>;
pageInfo: PageInfo;
} | {
edges: Array<{
node: NodesType;
}>;
pageInfo: PageInfo;
};
interface PaginationInfo<NodesType> {
/** The paginated array of nodes. You should map over and render this array. \*/
nodes: Array<NodesType>;
/** The `<NextLink>` is a helper component that makes it easy to navigate to the next page of paginated data. Alternatively you can build your own `<Link>` component: `<Link to={nextPageUrl} state={state} preventScrollReset />` _/
NextLink: ForwardRefExoticComponent<Omit<LinkProps, 'to'> & RefAttributes<HTMLAnchorElement>>;
/\*\* The `<PreviousLink>` is a helper component that makes it easy to navigate to the previous page of paginated data. Alternatively you can build your own `<Link>` component: `<Link to={previousPageUrl} state={state} preventScrollReset />` _/
PreviousLink: ForwardRefExoticComponent<Omit<LinkProps, 'to'> & RefAttributes<HTMLAnchorElement>>;
/** The URL to the previous page of paginated data. Use this prop to build your own `<Link>` component. \*/
previousPageUrl: string;
/** The URL to the next page of paginated data. Use this prop to build your own `<Link>` component. _/
nextPageUrl: string;
/\*\* True if the cursor has next paginated data _/
hasNextPage: boolean;
/** True if the cursor has previous paginated data \*/
hasPreviousPage: boolean;
/** True if we are in the process of fetching another page of data _/
isLoading: boolean;
/\*\* The `state` property is important to use when building your own `<Link>` component if you want paginated data to continuously append to the page. This means that every time the user clicks "Next page", the next page of data will be apppended inline with the previous page. If you want the whole page to re-render with only the next page results, do not pass the `state` prop to the Remix `<Link>` component. _/
state: {
nodes: Array<NodesType>;
pageInfo: {
endCursor: Maybe<string> | undefined;
startCursor: Maybe<string> | undefined;
hasPreviousPage: boolean;
};
};
}
type PaginationProps<NodesType> = {
/** The response from `storefront.query` for a paginated request. Make sure the query is passed pagination variables and that the query has `pageInfo` with `hasPreviousPage`, `hasNextpage`, `startCursor`, and `endCursor` defined. \*/
connection: Connection<NodesType>;
/** A render prop that includes pagination data and helpers. _/
children: PaginationRenderProp<NodesType>;
/\*\* A namespace for the pagination component to avoid URL param conflicts when using multiple `Pagination` components on a single page. _/
namespace?: string;
};
type PaginationRenderProp<NodesType> = FC<PaginationInfo<NodesType>>;
/\*\*

-
- The [Storefront API uses cursors](https://shopify.dev/docs/api/usage/pagination-graphql) to paginate through lists of data
- and the \`<Pagination />\` component makes it easy to paginate data from the Storefront API.
-
- @prop connection The response from `storefront.query` for a paginated request. Make sure the query is passed pagination variables and that the query has `pageInfo` with `hasPreviousPage`, `hasNextpage`, `startCursor`, and `endCursor` defined.
- @prop children A render prop that includes pagination data and helpers.
  \*/
  declare function Pagination<NodesType>({ connection, children, namespace, }: PaginationProps<NodesType>): ReturnType<FC>;
  /\*\*
- @param request The request object passed to your Remix loader function.
- @param options Options for how to configure the pagination variables. Includes the ability to change how many nodes are within each page as well as a namespace to avoid URL param conflicts when using multiple `Pagination` components on a single page.
-
- @returns Variables to be used with the `storefront.query` function
  \*/
  declare function getPaginationVariables(request: Request, options?: {
  pageBy: number;
  namespace?: string;
  }): {
  last: number;
  startCursor: string | null;
  } | {
  first: number;
  endCursor: string | null;
  };

type OptimisticVariant<T> = T & {
isOptimistic?: boolean;
};
type OptimisticVariantInput = PartialDeep<ProductVariant>;
type OptimisticProductVariants = Array<PartialDeep<ProductVariant>> | Promise<Array<PartialDeep<ProductVariant>>> | PartialDeep<ProductVariant> | Promise<PartialDeep<ProductVariant>>;
/\*\*

- @param selectedVariant The `selectedVariant` field queried with `variantBySelectedOptions`.
- @param variants The available product variants for the product. This can be an array of variants, a promise that resolves to an array of variants, or an object with a `product` key that contains the variants.
- @returns A new product object where the `selectedVariant` property is set to the variant that matches the current URL search params. If no variant is found, the original product object is returned. The `isOptimistic` property is set to `true` if the `selectedVariant` has been optimistically changed.
  \*/
  declare function useOptimisticVariant<SelectedVariant = OptimisticVariantInput, Variants = OptimisticProductVariants>(selectedVariant: SelectedVariant, variants: Variants): OptimisticVariant<SelectedVariant>;

type VariantOption = {
name: string;
value?: string;
values: Array<VariantOptionValue>;
};
type PartialProductOptionValues = PartialDeep<ProductOptionValue>;
type PartialProductOption = PartialDeep<Omit<ProductOption, 'optionValues'> & {
optionValues: Array<PartialProductOptionValues>;
}>;
type VariantOptionValue = {
value: string;
isAvailable: boolean;
to: string;
search: string;
isActive: boolean;
variant?: PartialDeep<ProductVariant, {
recurseIntoArrays: true;
}>;
optionValue: PartialProductOptionValues;
};
/\*\*

- @deprecated VariantSelector will be deprecated and removed in the next major version 2025-10
- Please use [getProductOptions](https://shopify.dev/docs/api/hydrogen/latest/utilities/getproductoptions),
- [getSelectedProductOptions](https://shopify.dev/docs/api/hydrogen/latest/utilities/getselectedproductoptions),
- [getAdjacentAndFirstAvailableVariants](https://shopify.dev/docs/api/hydrogen/latest/utilities/getadjacentandfirstavailablevariants) utils instead.
- and [useSelectedOptionInUrlParam](https://shopify.dev/docs/api/hydrogen/latest/utilities/useselectedoptioninurlparam)
- For a full implementation see the Skeleton template [routes/product.$handle.tsx](https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx).
  _/
  type VariantSelectorProps = {
  /\*\* The product handle for all of the variants _/
  handle: string;
  /** Product options from the [Storefront API](/docs/api/storefront/2026-01/objects/ProductOption). Make sure both `name` and `values` are a part of your query. \*/
  options: Array<PartialProductOption> | undefined;
  /** Product variants from the [Storefront API](/docs/api/storefront/2026-01/objects/ProductVariant). You only need to pass this prop if you want to show product availability. If a product option combination is not found within `variants`, it is assumed to be available. Make sure to include `availableForSale` and `selectedOptions.name` and `selectedOptions.value`. _/
  variants?: PartialDeep<ProductVariantConnection> | Array<PartialDeep<ProductVariant>>;
  /\*\* By default all products are under /products. Use this prop to provide a custom path. _/
  productPath?: string;
  /** Should the VariantSelector wait to update until after the browser navigates to a variant. \*/
  waitForNavigation?: boolean;
  /** An optional selected variant to use for the initial state if no URL parameters are set \*/
  selectedVariant?: Maybe<PartialDeep<ProductVariant>>;
