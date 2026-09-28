# Hydrogen (part 2 of 6)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `hydrogen.md`, `hydrogen.part3.md`, `hydrogen.part4.md`, `hydrogen.part5.md`, `hydrogen.part6.md` — and you should read the ones relevant to your task.

---
```
- Picks all keys if `Keys` is `any`.
- Doesn't pick `number` from a `string` index signature.

@example
```

type ImageUpload = {
url: string;
size: number;
thumbnailUrl: string;
};

type VideoUpload = {
url: string;
duration: number;
encodingFormat: string;
};

// Distributes over union types and allows picking keys from any member of the union type
type MediaDisplay = HomomorphicPick<ImageUpload | VideoUpload, "url" | "size" | "duration">;
//=> {url: string; size: number} | {url: string; duration: number}

// Primitive types are returned as-is
type Primitive = HomomorphicPick<string | number, 'toUpperCase' | 'toString'>;
//=> string | number

// Picks all keys if `Keys` is `any`
type Any = HomomorphicPick<{a: 1; b: 2} | {c: 3}, any>;
//=> {a: 1; b: 2} | {c: 3}

// Doesn't pick `number` from a `string` index signature
type IndexSignature = HomomorphicPick<{[k: string]: unknown}, number>;
//=> {}
\*/
type HomomorphicPick<T, Keys extends KeysOfUnion<T>> = {
[P in keyof T as Extract<P, Keys>]: T[P];
};
/\*\*
Merges user specified options with default options.

@example

```
type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: false};
type SpecifiedOptions = {leavesOnly: true};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//=> {maxRecursionDepth: 10; leavesOnly: true}
```

@example

```
// Complains if default values are not provided for optional options

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10};
type SpecifiedOptions = {};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                              ~~~~~~~~~~~~~~~~~~~
// Property 'leavesOnly' is missing in type 'DefaultPathsOptions' but required in type '{ maxRecursionDepth: number; leavesOnly: boolean; }'.
```

@example

```
// Complains if an option's default type does not conform to the expected type

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: 'no'};
type SpecifiedOptions = {};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                              ~~~~~~~~~~~~~~~~~~~
// Types of property 'leavesOnly' are incompatible. Type 'string' is not assignable to type 'boolean'.
```

@example

```
// Complains if an option's specified type does not conform to the expected type

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: false};
type SpecifiedOptions = {leavesOnly: 'yes'};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                                                   ~~~~~~~~~~~~~~~~
// Types of property 'leavesOnly' are incompatible. Type 'string' is not assignable to type 'boolean'.
```

\*/
type ApplyDefaultOptions<Options extends object, Defaults extends Simplify<Omit<Required<Options>, RequiredKeysOf<Options>> & Partial<Record<RequiredKeysOf<Options>, never>>>, SpecifiedOptions extends Options> = IfAny<SpecifiedOptions, Defaults, IfNever<SpecifiedOptions, Defaults, Simplify<Merge<Defaults, {
[Key in keyof SpecifiedOptions as Key extends OptionalKeysOf<Options> ? Extract<SpecifiedOptions[Key], undefined> extends never ? Key : never : Key]: SpecifiedOptions[Key];
}> & Required<Options>> // `& Required<Options>` ensures that `ApplyDefaultOptions<SomeOption, ...>` is always assignable to `Required<SomeOption>`

> > ;
> > /\*\*
> > Filter out keys from an object.

Returns `never` if `Exclude` is strictly equal to `Key`.
Returns `never` if `Key` extends `Exclude`.
Returns `Key` otherwise.

@example

```
type Filtered = Filter<'foo', 'foo'>;
//=> never
```

@example

```
type Filtered = Filter<'bar', string>;
//=> never
```

@example

```
type Filtered = Filter<'bar', 'foo'>;
//=> 'bar'
```

@see {Except}
\*/
type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true ? never : (KeyType extends ExcludeType ? never : KeyType);
type ExceptOptions = {
/\*\*
Disallow assigning non-specified properties.

    Note that any omitted properties in the resulting type will be present in autocomplete as `undefined`.

    @default false
    */
    requireExactProps?: boolean;

};
type DefaultExceptOptions = {
requireExactProps: false;
};
/\*\*
Create a type from an object type without certain keys.

We recommend setting the `requireExactProps` option to `true`.

This type is a stricter version of [`Omit`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type). The `Omit` type does not restrict the omitted keys to be keys present on the given type, while `Except` does. The benefits of a stricter type are avoiding typos and allowing the compiler to pick up on rename refactors automatically.

This type was proposed to the TypeScript team, which declined it, saying they prefer that libraries implement stricter versions of the built-in types ([microsoft/TypeScript#30825](https://github.com/microsoft/TypeScript/issues/30825#issuecomment-523668235)).

@example

```
import type {Except} from 'type-fest';

type Foo = {
	a: number;
	b: string;
};

type FooWithoutA = Except<Foo, 'a'>;
//=> {b: string}

const fooWithoutA: FooWithoutA = {a: 1, b: '2'};
//=> errors: 'a' does not exist in type '{ b: string; }'

type FooWithoutB = Except<Foo, 'b', {requireExactProps: true}>;
//=> {a: number} & Partial<Record<"b", never>>

const fooWithoutB: FooWithoutB = {a: 1, b: '2'};
//=> errors at 'b': Type 'string' is not assignable to type 'undefined'.

// The `Omit` utility type doesn't work when omitting specific keys from objects containing index signatures.

// Consider the following example:

type UserData = {
	[metadata: string]: string;
	email: string;
	name: string;
	role: 'admin' | 'user';
};

// `Omit` clearly doesn't behave as expected in this case:
type PostPayload = Omit<UserData, 'email'>;
//=> type PostPayload = { [x: string]: string; [x: number]: string; }

// In situations like this, `Except` works better.
// It simply removes the `email` key while preserving all the other keys.
type PostPayload = Except<UserData, 'email'>;
//=> type PostPayload = { [x: string]: string; name: string; role: 'admin' | 'user'; }
```

@category Object
\*/
type Except<ObjectType, KeysType extends keyof ObjectType, Options extends ExceptOptions = {}> = \_Except<ObjectType, KeysType, ApplyDefaultOptions<ExceptOptions, DefaultExceptOptions, Options>>;
type \_Except<ObjectType, KeysType extends keyof ObjectType, Options extends Required<ExceptOptions>> = {
[KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
} & (Options["requireExactProps"] extends true ? Partial<Record<KeysType, never>> : {});
/\*\*
Create a type that makes the given keys optional. The remaining keys are kept as is. The sister of the `SetRequired` type.

Use-case: You want to define a single model where the only thing that changes is whether or not some of the keys are optional.

@example

```
import type {SetOptional} from 'type-fest';

type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

type SomeOptional = SetOptional<Foo, 'b' | 'c'>;
// type SomeOptional = {
// 	a: number;
// 	b?: string; // Was already optional and still is.
// 	c?: boolean; // Is now optional.
// }
```

@category Object
\*/
type SetOptional<BaseType, Keys extends keyof BaseType> = BaseType extends unknown // To distribute `BaseType` when it's a union type.
? Simplify<
// Pick just the keys that are readonly from the base type.
Except<BaseType, Keys> &
// Pick the keys that should be mutable from the base type and make them mutable.
Partial<HomomorphicPick<BaseType, Keys>>> : never;
/\*\*

- This file has utilities to create GraphQL clients
- that consume the types generated by the preset.
  \*/
  /\*\*
- A generic type for `variables` in GraphQL clients
  \*/
  type GenericVariables = ExecutionArgs["variableValues"];
  /\*\*
- Use this type to make parameters optional in GraphQL clients
- when no variables need to be passed.
  \*/
  type EmptyVariables = {
  [key: string]: never;
  };
  /\*\*
- GraphQL client's generic operation interface.
  \*/
  interface CodegenOperations {
  [key: string]: any;
  }
  /\*\*
- Used as the return type for GraphQL clients. It picks
- the return type from the generated operation types.
- @example
- graphqlQuery: (...) => Promise<ClientReturn<...>>
- graphqlQuery: (...) => Promise<{data: ClientReturn<...>}>
  \*/
  type ClientReturn<GeneratedOperations extends CodegenOperations, RawGqlString extends string, OverrideReturnType extends any = never> = IsNever<OverrideReturnType> extends true ? RawGqlString extends keyof GeneratedOperations ? GeneratedOperations[RawGqlString]["return"] : any : OverrideReturnType;
  /\*\*
- Checks if the generated variables for an operation
- are optional or required.
  \*/
  type IsOptionalVariables<VariablesParam, OptionalVariableNames extends string = never, VariablesWithoutOptionals = Omit<VariablesParam, OptionalVariableNames>> = VariablesWithoutOptionals extends EmptyVariables ? true : GenericVariables extends VariablesParam ? true : Partial<VariablesWithoutOptionals> extends VariablesWithoutOptionals ? true : false;
  /\*\*
- Used as the type for the GraphQL client's variables. It checks
- the generated operation types to see if variables are optional.
- @example
- graphqlQuery: (query: string, param: ClientVariables<...>) => Promise<...>
- Where `param` is required.
  \*/
  type ClientVariables<GeneratedOperations extends CodegenOperations, RawGqlString extends string, OptionalVariableNames extends string = never, VariablesKey extends string = "variables", GeneratedVariables = RawGqlString extends keyof GeneratedOperations ? SetOptional<GeneratedOperations[RawGqlString]["variables"], Extract<keyof GeneratedOperations[RawGqlString]["variables"], OptionalVariableNames>> : GenericVariables, VariablesWrapper = Record<VariablesKey, GeneratedVariables>> = IsOptionalVariables<GeneratedVariables, OptionalVariableNames> extends true ? Partial<VariablesWrapper> : VariablesWrapper;
  /\*\*
- Similar to ClientVariables, but makes the whole wrapper optional:
- @example
- graphqlQuery: (query: string, ...params: ClientVariablesInRestParams<...>) => Promise<...>
- Where the first item in `params` might be optional depending on the query.
  \*/
  type ClientVariablesInRestParams<GeneratedOperations extends CodegenOperations, RawGqlString extends string, OtherParams extends Record<string, any> = {}, OptionalVariableNames extends string = never, ProcessedVariables = OtherParams & ClientVariables<GeneratedOperations, RawGqlString, OptionalVariableNames>> = Partial<OtherParams> extends OtherParams ? IsOptionalVariables<GeneratedOperations[RawGqlString]["variables"], OptionalVariableNames> extends true ? [
  ProcessedVariables?
  ] : [
  ProcessedVariables
  ] : [
  ProcessedVariables
  ];

declare class GraphQLError extends Error {
/**
_ If an error can be associated to a particular point in the requested
_ GraphQL document, it should contain a list of locations.
\*/
locations?: Array<{
line: number;
column: number;
}>;
/**
_ If an error can be associated to a particular field in the GraphQL result,
_ it _must_ contain an entry with the key `path` that details the path of
_ the response field which experienced the error. This allows clients to
_ identify whether a null result is intentional or caused by a runtime error.
_/
path?: Array<string | number>;
/\*\*
_ Reserved for implementors to extend the protocol however they see fit,
_ and hence there are no additional restrictions on its contents.
_/
extensions?: {
[key: string]: unknown;
};
constructor(message?: string, options?: Pick<GraphQLError, 'locations' | 'path' | 'extensions' | 'stack' | 'cause'> & {
query?: string;
queryVariables?: GenericVariables;
requestId?: string | null;
clientOperation?: string;
});
get [Symbol.toStringTag](): string;
/**
_ Note: `toString()` is internally used by `console.log(...)` / `console.error(...)`
_ when ingesting logs in Oxygen production. Therefore, we want to make sure that
_ the error message is as informative as possible instead of `[object Object]`.
_/
toString(): string;
/**
_ Note: toJSON`is internally used by`JSON.stringify(...)`.
_ The most common scenario when this error instance is going to be stringified is
_ when it's passed to Remix' `json` and `defer` functions: e.g. `{promise: storefront.query(...)}`.
_ In this situation, we don't want to expose private error information to the browser so we only
_ do it in development.
_/
toJSON(): Pick<GraphQLError, "message" | "locations" | "path" | "extensions" | "stack" | "name">;
}

type CrossRuntimeRequest = {
url?: string;
method?: string;
headers: {
get?: (key: string) => string | null | undefined;
[key: string]: any;
};
};

type DataFunctionValue = Response | NonNullable<unknown> | null;
type JsonGraphQLError$1 = ReturnType<GraphQLError['toJSON']>;
type Buyer = Partial<BuyerInput>;
type CustomerAPIResponse<ReturnType> = {
data: ReturnType;
errors: Array<{
message: string;
locations?: Array<{
line: number;
column: number;
}>;
path?: Array<string>;
extensions: {
code: string;
};
}>;
extensions: {
cost: {
requestQueryCost: number;
actualQueryCakes: number;
throttleStatus: {
maximumAvailable: number;
currentAvailable: number;
restoreRate: number;
};
};
};
};
interface CustomerAccountQueries {
}
interface CustomerAccountMutations {
}
type LoginOptions = {
uiLocales?: LanguageCode;
locale?: string;
countryCode?: CountryCode;
acrValues?: string;
loginHint?: string;
loginHintMode?: string;
};
type LogoutOptions = {
/** The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev. \*/
postLogoutRedirectUri?: string;
/** Add custom headers to the logout redirect. _/
headers?: HeadersInit;
/\*\* If true, custom data in the session will not be cleared on logout. _/
keepSession?: boolean;
};
type CustomerAccount = {
/** The i18n configuration for Customer Account API \*/
i18n: {
language: LanguageCode;
};
/** Start the OAuth login flow. This function should be called and returned from a Remix loader.
_ It redirects the customer to a Shopify login domain. It also defined the final path the customer
_ lands on at the end of the oAuth flow with the value of the `return_to` query param. (This is
_ automatically setup unless `customAuthStatusHandler` option is in use)
_
_ @param options.uiLocales - The displayed language of the login page. Only support for the following languages:
_ `en`, `fr`, `cs`, `da`, `de`, `es`, `fi`, `it`, `ja`, `ko`, `nb`, `nl`, `pl`, `pt-BR`, `pt-PT`,
_ `sv`, `th`, `tr`, `vi`, `zh-CN`, `zh-TW`. If supplied any other language code, it will default to `en`.
_ _/
login: (options?: LoginOptions) => Promise<Response>;
/\*\* On successful login, the customer redirects back to your app. This function validates the OAuth response and exchanges the authorization code for an access token and refresh token. It also persists the tokens on your session. This function should be called and returned from the Remix loader configured as the redirect URI within the Customer Account API settings in admin. _/
authorize: () => Promise<Response>;
/** Returns if the customer is logged in. It also checks if the access token is expired and refreshes it if needed. \*/
isLoggedIn: () => Promise<boolean>;
/** Check for a not logged in customer and redirect customer to login page. The redirect can be overwritten with `customAuthStatusHandler` option. _/
handleAuthStatus: () => Promise<void>;
/\*\* Returns CustomerAccessToken if the customer is logged in. It also run a expiry check and does a token refresh if needed. _/
getAccessToken: () => Promise<string | undefined>;
/** Creates the fully-qualified URL to your store's GraphQL endpoint.\*/
getApiUrl: () => string;
/** Logout the customer by clearing the session and redirecting to the login domain. It should be called and returned from a Remix action. The path app should redirect to after logout can be setup in Customer Account API settings in admin. \*
_ @param options.postLogoutRedirectUri - The url to redirect customer to after logout, should be a relative URL. This url will need to included in Customer Account API's application setup for logout URI. The default value is current app origin, which is automatically setup in admin when using `--customer-account-push` flag with dev.
_ @param options.headers - These will be passed along to the logout redirect. You can use these to set/clear cookies on logout, like the cart.
_ @param options.keepSession - If true, custom data in the session will not be cleared on logout.
_ _/
logout: (options?: LogoutOptions) => Promise<Response>;
/\*\* Execute a GraphQL query against the Customer Account API. This method execute `handleAuthStatus()` ahead of query. _/
query: <OverrideReturnType extends any = never, RawGqlString extends string = string>(query: RawGqlString, ...options: ClientVariablesInRestParams<CustomerAccountQueries, RawGqlString>) => Promise<Omit<CustomerAPIResponse<ClientReturn<CustomerAccountQueries, RawGqlString, OverrideReturnType>>, 'errors'> & {
errors?: JsonGraphQLError$1[];
}>;
/** Execute a GraphQL mutation against the Customer Account API. This method execute `handleAuthStatus()` ahead of mutation. \*/
mutate: <OverrideReturnType extends any = never, RawGqlString extends string = string>(mutation: RawGqlString, ...options: ClientVariablesInRestParams<CustomerAccountMutations, RawGqlString>) => Promise<Omit<CustomerAPIResponse<ClientReturn<CustomerAccountMutations, RawGqlString, OverrideReturnType>>, 'errors'> & {
errors?: JsonGraphQLError$1[];
}>;
/** Set buyer information into session._/
setBuyer: (buyer: Buyer) => void;
/\*\* Get buyer token and company location id from session._/
getBuyer: () => Promise<Buyer>;
/** Deprecated. Please use setBuyer. Set buyer information into session.\*/
UNSTABLE_setBuyer: (buyer: Buyer) => void;
/** Deprecated. Please use getBuyer. Get buyer token and company location id from session._/
UNSTABLE_getBuyer: () => Promise<Buyer>;
};
type CustomerAccountOptions = {
/\*\* The client requires a session to persist the auth and refresh token. By default Hydrogen ships with cookie session storage, but you can use [another session storage](https://remix.run/docs/en/main/utils/sessions) implementation. _/
session: HydrogenSession;
/** Unique UUID prefixed with `shp_` associated with the application, this should be visible in the customer account api settings in the Hydrogen admin channel. Mock.shop doesn't automatically supply customerAccountId. Use `npx shopify hydrogen env pull` to link your store credentials. \*/
customerAccountId: string;
/** The shop id. Mock.shop doesn't automatically supply shopId. Use `npx shopify hydrogen env pull` to link your store credentials _/
shopId: string;
/\*\* Override the version of the API _/
customerApiVersion?: string;
/** The object for the current Request. It should be provided by your platform. \*/
request: CrossRuntimeRequest;
/** The waitUntil function is used to keep the current request/response lifecycle alive even after a response has been sent. It should be provided by your platform. _/
waitUntil?: WaitUntil;
/\*\* This is the route in your app that authorizes the customer after logging in. Make sure to call `customer.authorize()` within the loader on this route. It defaults to `/account/authorize`. _/
authUrl?: string;
/** Use this method to overwrite the default logged-out redirect behavior. The default handler [throws a redirect](https://remix.run/docs/en/main/utils/redirect#:~:text=!session) to `/account/login` with current path as `return_to` query param. \*/
customAuthStatusHandler?: () => DataFunctionValue;
/** Whether it should print GraphQL errors automatically. Defaults to true _/
logErrors?: boolean | ((error?: Error) => boolean);
/\*\* The path to redirect to after login. Defaults to `/account`. _/
defaultRedirectPath?: string;
/** The path to login. Defaults to `/account/login`. \*/
loginPath?: string;
/** The oauth authorize path. Defaults to `/account/authorize`. _/
authorizePath?: string;
/\*\* Deprecated. `unstableB2b` is now stable. Please remove. _/
unstableB2b?: boolean;
/\*_ Localization data. _/
language?: LanguageCode;
};

type CartGetProps = {
/**
_ The cart ID.
_ @default cart.getCartId();
\*/
cartId?: string;
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
/**
_ The number of cart lines to be returned.
_ @default 100
\*/
numCartLines?: number;
/**
_ Visitor consent preferences for the Storefront API's @inContext directive.
_
_ **Most Hydrogen storefronts do NOT need this.** If you're using Hydrogen's
_ analytics provider or Shopify's Customer Privacy API (including third-party
_ consent services integrated with it), consent is handled automatically.
_
_ This option exists for Storefront API parity and is primarily intended for
_ non-Hydrogen integrations like Checkout Kit that manage consent outside
_ Shopify's standard consent flow.
_
_ When provided, consent is encoded into the cart's checkoutUrl via the \_cs parameter.
_/
visitorConsent?: VisitorConsent$1;
};
type CartGetFunction = (cartInput?: CartGetProps) => Promise<CartReturn | null>;
type CartGetOptions = CartQueryOptions & {
/\*\*
_ The customer account client instance created by [`createCustomerAccountClient`](docs/api/hydrogen/latest/utilities/createcustomeraccountclient).
_/
customerAccount?: CustomerAccount;
};
declare function cartGetDefault({ storefront, customerAccount, getCartId, cartFragment, }: CartGetOptions): CartGetFunction;

type CartCreateFunction = (input: CartInput, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartCreateDefault(options: CartQueryOptions): CartCreateFunction;

type CartLinesAddFunction = (lines: Array<CartLineInput>, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartLinesAddDefault(options: CartQueryOptions): CartLinesAddFunction;

type CartLinesUpdateFunction = (lines: CartLineUpdateInput[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartLinesUpdateDefault(options: CartQueryOptions): CartLinesUpdateFunction;

type CartLinesRemoveFunction = (lineIds: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartLinesRemoveDefault(options: CartQueryOptions): CartLinesRemoveFunction;

type CartDiscountCodesUpdateFunction = (discountCodes: string[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartDiscountCodesUpdateDefault(options: CartQueryOptions): CartDiscountCodesUpdateFunction;

type CartBuyerIdentityUpdateFunction = (buyerIdentity: CartBuyerIdentityInput, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartBuyerIdentityUpdateDefault(options: CartQueryOptions): CartBuyerIdentityUpdateFunction;

type CartNoteUpdateFunction = (note: string, optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
declare function cartNoteUpdateDefault(options: CartQueryOptions): CartNoteUpdateFunction;

type CartSelectedDeliveryOptionsUpdateFunction = (selectedDeliveryOptions: CartSelectedDeliveryOptionInput[], optionalParams?: CartOptionalInput) => Promise<CartQueryDataReturn>;
