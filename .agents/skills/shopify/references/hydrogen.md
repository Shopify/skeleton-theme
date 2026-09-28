# Hydrogen (part 1 of 6)

This guide is split so each part fits in a single read. The other parts sit in this same
directory — `hydrogen.part2.md`, `hydrogen.part3.md`, `hydrogen.part4.md`, `hydrogen.part5.md`, `hydrogen.part6.md` — and you should read the ones relevant to your task.

---
You are an assistant that helps Shopify developers write UI Framework code to interact with the latest Shopify hydrogen UI Framework version.

You should find all operations that can help the developer achieve their goal, provide valid UI Framework code along with helpful explanations.
DO NOT USE HYDROGEN REACT, ONLY USE HYDROGEN.

References:

- /docs/storefronts/headless/hydrogen/cookbook

## mock.shop: a store to build against before you have one

[mock.shop](https://mock.shop) is a public, auth-free Storefront GraphQL API backed by mock reference stores. Use mock.shop when the user has no store, no Storefront API access token, or wants realistic data to build against. Find the setup guide at [How to use mock.shop](https://shopify.dev/docs/storefronts/headless/mock-shop).

- `https://mock.shop/llms.txt` lists every store with a one-line summary and its API URL. Each store is a separate catalog on its own host, and `https://<store>.mock.shop/llms.txt` describes that store's catalog.
- Send Storefront API queries as `POST https://<store>.mock.shop/api` with a JSON body (`{"query": "..."}`) and `Content-Type: application/json`. No access token or other headers. The bare apex `https://mock.shop/api` serves the default store.
- Pick the store whose categories match what the user is building. The default store is apparel basics.
- Scaffold a Hydrogen storefront against it with `npm create @shopify/hydrogen@latest -- --mock-shop`. The `--quickstart` flag implies `--mock-shop`.
- To move the project to a real Shopify store, use `npx shopify hydrogen link` followed by `npx shopify hydrogen env pull`.
- Queries written against mock.shop run unchanged against a real store.
- Checkout is mocked: no payment is taken and no order is placed.
- mock.shop doesn't support the Customer Account API, and its products, prices, and inventory are fictional.

## Hydrogen Cookbook - Ready-to-Use Recipes

Hydrogen has a comprehensive cookbook with step-by-step recipes for common features.
Search the developer documentation at /docs/storefronts/headless/hydrogen/cookbook for the cookbook index, then use the paths to fetch relevant recipes.
Prioritize utilizing cookbook recipes whenever applicable to the user's request.

## 🚨 CRITICAL ERROR PREVENTION 🚨

NEVER treat these as Storefront GraphQL types - they are REACT COMPONENTS:

- Image, Video, ExternalVideo, MediaFile, Money - NOT GraphQL types!
- These RENDER data, they don't FETCH data
- They are from '@shopify/hydrogen' package

## MANDATORY REQUIREMENTS:

1. **ALWAYS** work in the `hydrogen` topic for ALL components below
2. **ALWAYS** generate complete JSX code examples
3. If asked about "Media" or "MediaFile" - stay in `hydrogen`, NOT `storefront-graphql`!

## REMEMBER:

- These components CONSUME data from Storefront API
- They are NOT the data types themselves
- They are React UI components that render HTML

## Hydrogen Component Types

Here are the TypeScript definitions for all available Hydrogen components and utilities:

```typescript
// --- @shopify/hydrogen/dist/production/index.d.ts ---
import * as react from 'react';
import { ReactNode, ComponentType, ScriptHTMLAttributes, FC, ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';
import { BuyerInput, CountryCode as CountryCode$1, LanguageCode as LanguageCode$1, VisitorConsent as VisitorConsent$1, CartInput, CartLineInput, CartLineUpdateInput, CartBuyerIdentityInput, CartSelectedDeliveryOptionInput, AttributeInput, Scalars, CartSelectableAddressInput, CartSelectableAddressUpdateInput, Cart, CartMetafieldsSetInput, CartUserError, MetafieldsSetUserError, MetafieldDeleteUserError, CartWarning, Product, ProductVariant, CartLine, ComponentizableCartLine, CurrencyCode, PageInfo, Maybe, ProductOptionValue, ProductOption, ProductVariantConnection, SelectedOptionInput } from '@shopify/hydrogen-react/storefront-api-types';
import { createStorefrontClient as createStorefrontClient$1, StorefrontClientProps, RichText as RichText$1, ShopPayButton as ShopPayButton$1 } from '@shopify/hydrogen-react';
export { AnalyticsEventName, AnalyticsPageType, ClientBrowserParameters, ExternalVideo, IMAGE_FRAGMENT, Image, MappedProductOptions, MediaFile, ModelViewer, Money, ParsedMetafields, ShopifyAnalytics as SendShopifyAnalyticsEvent, ShopifyAddToCart, ShopifyAddToCartPayload, ShopifyAnalyticsPayload, ShopifyAnalyticsProduct, ShopifyCookies, ShopifyPageView, ShopifyPageViewPayload, ShopifySalesChannel, StorefrontApiResponse, StorefrontApiResponseError, StorefrontApiResponseOk, StorefrontApiResponseOkPartial, StorefrontApiResponsePartial, Video, customerAccountApiCustomScalars, decodeEncodedVariant, flattenConnection, getAdjacentAndFirstAvailableVariants, getClientBrowserParameters, getProductOptions, getShopifyCookies, getTrackingValues, isOptionValueCombinationInEncodedVariant, mapSelectedProductOptionToObject, parseGid, parseMetafield, sendShopifyAnalytics, storefrontApiCustomScalars, useLoadScript, useMoney, useSelectedOptionInUrlParam, useShopifyCookies } from '@shopify/hydrogen-react';
import { LanguageCode, CountryCode } from '@shopify/hydrogen-react/customer-account-api-types';
import { ExecutionArgs } from 'graphql';
import * as react_router from 'react-router';
import { SessionData, FlashSessionData, Session, SessionStorage, RouterContextProvider, FetcherWithComponents, ServerBuild, LinkProps, LoaderFunctionArgs, MetaFunction, LoaderFunction, Params, Location } from 'react-router';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { PartialDeep } from 'type-fest';
import { RouteConfigEntry } from '@react-router/dev/routes';
import { Preset } from '@react-router/dev/config';
import { WithContext, Thing } from 'schema-dts';

/**
 * Override options for a cache strategy.
 */
interface AllCacheOptions {
    /**
     * The caching mode, generally `public`, `private`, or `no-store`.
     */
    mode?: string;
    /**
     * The maximum amount of time in seconds that a resource will be considered fresh. See `max-age` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#:~:text=Response%20Directives-,max%2Dage,-The%20max%2Dage).
     */
    maxAge?: number;
    /**
     * Indicate that the cache should serve the stale response in the background while revalidating the cache. See `stale-while-revalidate` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate).
     */
    staleWhileRevalidate?: number;
    /**
     * Similar to `maxAge` but specific to shared caches. See `s-maxage` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage).
     */
    sMaxAge?: number;
    /**
     * Indicate that the cache should serve the stale response if an error occurs while revalidating the cache. See `stale-if-error` in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error).
     */
    staleIfError?: number;
}
/**
 * Use the `CachingStrategy` to define a custom caching mechanism for your data. Or use one of the pre-defined caching strategies: CacheNone, CacheShort, CacheLong.
 */
type CachingStrategy = AllCacheOptions;
type NoStoreStrategy = {
    mode: string;
};
declare function generateCacheControlHeader(cacheOptions: CachingStrategy): string;
/**
 *
 * @public
 */
declare function CacheNone(): NoStoreStrategy;
/**
 *
 * @public
 */
declare function CacheShort(overrideOptions?: CachingStrategy): AllCacheOptions;
/**
 *
 * @public
 */
declare function CacheLong(overrideOptions?: CachingStrategy): AllCacheOptions;
/**
 *
 * @public
 */
declare function CacheCustom(overrideOptions: CachingStrategy): AllCacheOptions;

/**
Convert a union type to an intersection type using [distributive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).

Inspired by [this Stack Overflow answer](https://stackoverflow.com/a/50375286/2172153).

@example
```

import type {UnionToIntersection} from 'type-fest';

type Union = {the(): void} | {great(arg: string): void} | {escape: boolean};

type Intersection = UnionToIntersection<Union>;
//=> {the(): void; great(arg: string): void; escape: boolean};

```

A more applicable example which could make its way into your library code follows.

@example
```

import type {UnionToIntersection} from 'type-fest';

class CommandOne {
commands: {
a1: () => undefined,
b1: () => undefined,
}
}

class CommandTwo {
commands: {
a2: (argA: string) => undefined,
b2: (argB: string) => undefined,
}
}

const union = [new CommandOne(), new CommandTwo()].map(instance => instance.commands);
type Union = typeof union;
//=> {a1(): void; b1(): void} | {a2(argA: string): void; b2(argB: string): void}

type Intersection = UnionToIntersection<Union>;
//=> {a1(): void; b1(): void; a2(argA: string): void; b2(argB: string): void}

```

@category Type
*/
type UnionToIntersection<Union> = (
// `extends unknown` is always going to be the case and is used to convert the
// `Union` into a [distributive conditional
// type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
Union extends unknown ? (distributedUnion: Union) => void : never) extends ((mergedIntersection: infer Intersection) => void) ? Intersection & Union : never;
/**
Create a union of all keys from a given type, even those exclusive to specific union members.

Unlike the native `keyof` keyword, which returns keys present in **all** union members, this type returns keys from **any** member.

@link https://stackoverflow.com/a/49402091

@example
```

import type {KeysOfUnion} from 'type-fest';

type A = {
common: string;
a: number;
};

type B = {
common: string;
b: string;
};

type C = {
common: string;
c: boolean;
};

type Union = A | B | C;

type CommonKeys = keyof Union;
//=> 'common'

type AllKeys = KeysOfUnion<Union>;
//=> 'common' | 'a' | 'b' | 'c'

```

@category Object
*/
type KeysOfUnion<ObjectType> =
// Hack to fix https://github.com/sindresorhus/type-fest/issues/1008
keyof UnionToIntersection<ObjectType extends unknown ? Record<keyof ObjectType, never> : never>;
/**
Extract all optional keys from the given type.

This is useful when you want to create a new type that contains different type values for the optional keys only.

@example
```

import type {OptionalKeysOf, Except} from 'type-fest';

interface User {
name: string;
surname: string;

    luckyNumber?: number;

}

const REMOVE_FIELD = Symbol('remove field symbol');
type UpdateOperation<Entity extends object> = Except<Partial<Entity>, OptionalKeysOf<Entity>> & {
[Key in OptionalKeysOf<Entity>]?: Entity[Key] | typeof REMOVE_FIELD;
};

const update1: UpdateOperation<User> = {
name: 'Alice'
};

const update2: UpdateOperation<User> = {
name: 'Bob',
luckyNumber: REMOVE_FIELD
};

```

@category Utilities
*/
type OptionalKeysOf<BaseType extends object> = BaseType extends unknown // For distributing `BaseType`
 ? (keyof {
	[Key in keyof BaseType as BaseType extends Record<Key, BaseType[Key]> ? never : Key]: never;
}) & (keyof BaseType) // Intersect with `keyof BaseType` to ensure result of `OptionalKeysOf<BaseType>` is always assignable to `keyof BaseType`
 : never; // Should never happen
/**
Extract all required keys from the given type.

This is useful when you want to create a new type that contains different type values for the required keys only or use the list of keys for validation purposes, etc...

@example
```

import type {RequiredKeysOf} from 'type-fest';

declare function createValidation<Entity extends object, Key extends RequiredKeysOf<Entity> = RequiredKeysOf<Entity>>(field: Key, validator: (value: Entity[Key]) => boolean): ValidatorFn;

interface User {
name: string;
surname: string;

    luckyNumber?: number;

}

const validator1 = createValidation<User>('name', value => value.length < 25);
const validator2 = createValidation<User>('surname', value => value.length < 25);

```

@category Utilities
*/
type RequiredKeysOf<BaseType extends object> = BaseType extends unknown // For distributing `BaseType`
 ? Exclude<keyof BaseType, OptionalKeysOf<BaseType>> : never; // Should never happen
/**
Returns a boolean for whether the given type is `never`.

@link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
@link https://stackoverflow.com/a/53984913/10292952
@link https://www.zhenghao.io/posts/ts-never

Useful in type utilities, such as checking if something does not occur.

@example
```

import type {IsNever, And} from 'type-fest';

// https://github.com/andnp/SimplyTyped/blob/master/src/types/strings.ts
type AreStringsEqual<A extends string, B extends string> =
And<
IsNever<Exclude<A, B>> extends true ? true : false,
IsNever<Exclude<B, A>> extends true ? true : false >;

type EndIfEqual<I extends string, O extends string> =
AreStringsEqual<I, O> extends true
? never
: void;

function endIfEqual<I extends string, O extends string>(input: I, output: O): EndIfEqual<I, O> {
if (input === output) {
process.exit(0);
}
}

endIfEqual('abc', 'abc');
//=> never

endIfEqual('abc', '123');
//=> void

```

@category Type Guard
@category Utilities
*/
type IsNever<T> = [
	T
] extends [
	never
] ? true : false;
/**
An if-else-like type that resolves depending on whether the given type is `never`.

@see {@link IsNever}

@example
```

import type {IfNever} from 'type-fest';

type ShouldBeTrue = IfNever<never>;
//=> true

type ShouldBeBar = IfNever<'not never', 'foo', 'bar'>;
//=> 'bar'

```

@category Type Guard
@category Utilities
*/
type IfNever<T, TypeIfNever = true, TypeIfNotNever = false> = (IsNever<T> extends true ? TypeIfNever : TypeIfNotNever);
type NoInfer$1<T> = T extends infer U ? U : never;
/**
Returns a boolean for whether the given type is `any`.

@link https://stackoverflow.com/a/49928360/1490091

Useful in type utilities, such as disallowing `any`s to be passed to a function.

@example
```

import type {IsAny} from 'type-fest';

const typedObject = {a: 1, b: 2} as const;
const anyObject: any = {a: 1, b: 2};

function get<O extends (IsAny<O> extends true ? {} : Record<string, number>), K extends keyof O = keyof O>(obj: O, key: K) {
return obj[key];
}

const typedA = get(typedObject, 'a');
//=> 1

const anyA = get(anyObject, 'a');
//=> any

```

@category Type Guard
@category Utilities
*/
type IsAny<T> = 0 extends 1 & NoInfer$1<T> ? true : false;
/**
Returns a boolean for whether the two given types are equal.

@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
@link https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796

Use-cases:
- If you want to make a conditional branch based on the result of a comparison of two types.

@example
```

import type {IsEqual} from 'type-fest';

// This type returns a boolean for whether the given array includes the given item.
// `IsEqual` is used to compare the given array at position 0 and the given item and then return true if they are equal.
type Includes<Value extends readonly any[], Item> =
Value extends readonly [Value[0], ...infer rest]
? IsEqual<Value[0], Item> extends true
? true
: Includes<rest, Item>
: false;

```

@category Type Guard
@category Utilities
*/
type IsEqual<A, B> = (<G>() => G extends A & G | G ? 1 : 2) extends (<G>() => G extends B & G | G ? 1 : 2) ? true : false;
/**
Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.

@example
```

import type {Simplify} from 'type-fest';

type PositionProps = {
top: number;
left: number;
};

type SizeProps = {
width: number;
height: number;
};

// In your editor, hovering over `Props` will show a flattened object with all the properties.
type Props = Simplify<PositionProps & SizeProps>;

```

Sometimes it is desired to pass a value as a function argument that has a different type. At first inspection it may seem assignable, and then you discover it is not because the `value`'s type definition was defined as an interface. In the following example, `fn` requires an argument of type `Record<string, unknown>`. If the value is defined as a literal, then it is assignable. And if the `value` is defined as type using the `Simplify` utility the value is assignable.  But if the `value` is defined as an interface, it is not assignable because the interface is not sealed and elsewhere a non-string property could be added to the interface.

If the type definition must be an interface (perhaps it was defined in a third-party npm package), then the `value` can be defined as `const value: Simplify<SomeInterface> = ...`. Then `value` will be assignable to the `fn` argument.  Or the `value` can be cast as `Simplify<SomeInterface>` if you can't re-declare the `value`.

@example
```

import type {Simplify} from 'type-fest';

interface SomeInterface {
foo: number;
bar?: string;
baz: number | undefined;
}

type SomeType = {
foo: number;
bar?: string;
baz: number | undefined;
};

const literal = {foo: 123, bar: 'hello', baz: 456};
const someType: SomeType = literal;
const someInterface: SomeInterface = literal;

function fn(object: Record<string, unknown>): void {}

fn(literal); // Good: literal object type is sealed
fn(someType); // Good: type is sealed
fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`

```

@link https://github.com/microsoft/TypeScript/issues/15300
@see SimplifyDeep
@category Object
*/
type Simplify<T> = {
	[KeyType in keyof T]: T[KeyType];
} & {};
/**
Omit any index signatures from the given object type, leaving only explicitly defined properties.

This is the counterpart of `PickIndexSignature`.

Use-cases:
- Remove overly permissive signatures from third-party types.

This type was taken from this [StackOverflow answer](https://stackoverflow.com/a/68261113/420747).

It relies on the fact that an empty object (`{}`) is assignable to an object with just an index signature, like `Record<string, unknown>`, but not to an object with explicitly defined keys, like `Record<'foo' | 'bar', unknown>`.

(The actual value type, `unknown`, is irrelevant and could be any type. Only the key type matters.)

```

const indexed: Record<string, unknown> = {}; // Allowed

const keyed: Record<'foo', unknown> = {}; // Error
// => TS2739: Type '{}' is missing the following properties from type 'Record<"foo" | "bar", unknown>': foo, bar

```

Instead of causing a type error like the above, you can also use a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to test whether a type is assignable to another:

```

type Indexed = {} extends Record<string, unknown>
? '✅ `{}` is assignable to `Record<string, unknown>`'
: '❌ `{}` is NOT assignable to `Record<string, unknown>`';
// => '✅ `{}` is assignable to `Record<string, unknown>`'

type Keyed = {} extends Record<'foo' | 'bar', unknown>
? "✅ `{}` is assignable to `Record<'foo' | 'bar', unknown>`"
: "❌ `{}` is NOT assignable to `Record<'foo' | 'bar', unknown>`";
// => "❌ `{}` is NOT assignable to `Record<'foo' | 'bar', unknown>`"

```

Using a [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#further-exploration), you can then check for each `KeyType` of `ObjectType`...

```

import type {OmitIndexSignature} from 'type-fest';

type OmitIndexSignature<ObjectType> = {
[KeyType in keyof ObjectType // Map each key of `ObjectType`...
]: ObjectType[KeyType]; // ...to its original value, i.e. `OmitIndexSignature<Foo> == Foo`.
};

```

...whether an empty object (`{}`) would be assignable to an object with that `KeyType` (`Record<KeyType, unknown>`)...

```

import type {OmitIndexSignature} from 'type-fest';

type OmitIndexSignature<ObjectType> = {
[KeyType in keyof ObjectType
// Is `{}` assignable to `Record<KeyType, unknown>`?
as {} extends Record<KeyType, unknown>
? ... // ✅ `{}` is assignable to `Record<KeyType, unknown>`
: ... // ❌ `{}` is NOT assignable to `Record<KeyType, unknown>`
]: ObjectType[KeyType];
};

```

If `{}` is assignable, it means that `KeyType` is an index signature and we want to remove it. If it is not assignable, `KeyType` is a "real" key and we want to keep it.

@example
```

import type {OmitIndexSignature} from 'type-fest';

interface Example {
// These index signatures will be removed.
[x: string]: any
[x: number]: any
[x: symbol]: any
[x: `head-${string}`]: string
[x: `${string}-tail`]: string
[x: `head-${string}-tail`]: string
[x: `${bigint}`]: string
[x: `embedded-${number}`]: string

    // These explicitly defined keys will remain.
    foo: 'bar';
    qux?: 'baz';

}

type ExampleWithoutIndexSignatures = OmitIndexSignature<Example>;
// => { foo: 'bar'; qux?: 'baz' | undefined; }

```

@see PickIndexSignature
@category Object
*/
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown> ? never : KeyType]: ObjectType[KeyType];
};
/**
Pick only index signatures from the given object type, leaving out all explicitly defined properties.

This is the counterpart of `OmitIndexSignature`.

@example
```

import type {PickIndexSignature} from 'type-fest';

declare const symbolKey: unique symbol;

type Example = {
// These index signatures will remain.
[x: string]: unknown;
[x: number]: unknown;
[x: symbol]: unknown;
[x: `head-${string}`]: string;
[x: `${string}-tail`]: string;
[x: `head-${string}-tail`]: string;
[x: `${bigint}`]: string;
[x: `embedded-${number}`]: string;

    // These explicitly defined keys will be removed.
    ['kebab-case-key']: string;
    [symbolKey]: string;
    foo: 'bar';
    qux?: 'baz';

};

type ExampleIndexSignature = PickIndexSignature<Example>;
// {
// [x: string]: unknown;
// [x: number]: unknown;
// [x: symbol]: unknown;
// [x: `head-${string}`]: string;
// [x: `${string}-tail`]: string;
// [x: `head-${string}-tail`]: string;
// [x: `${bigint}`]: string;
// [x: `embedded-${number}`]: string;
// }

```

@see OmitIndexSignature
@category Object
*/
type PickIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown> ? KeyType : never]: ObjectType[KeyType];
};
// Merges two objects without worrying about index signatures.
type SimpleMerge<Destination, Source> = {
	[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
} & Source;
/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```

import type {Merge} from 'type-fest';

interface Foo {
[x: string]: unknown;
[x: number]: unknown;
foo: string;
bar: symbol;
}

type Bar = {
[x: number]: number;
[x: symbol]: unknown;
bar: Date;
baz: boolean;
};

export type FooBar = Merge<Foo, Bar>;
// => {
// [x: string]: unknown;
// [x: number]: number;
// [x: symbol]: unknown;
// foo: string;
// bar: Date;
// baz: boolean;
// }

```

@category Object
*/
type Merge<Destination, Source> = Simplify<SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>> & SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>>;
/**
An if-else-like type that resolves depending on whether the given type is `any`.

@see {@link IsAny}

@example
```

import type {IfAny} from 'type-fest';

type ShouldBeTrue = IfAny<any>;
//=> true

type ShouldBeBar = IfAny<'not any', 'foo', 'bar'>;
//=> 'bar'

```

@category Type Guard
@category Utilities
*/
type IfAny<T, TypeIfAny = true, TypeIfNotAny = false> = (IsAny<T> extends true ? TypeIfAny : TypeIfNotAny);
/**
Works similar to the built-in `Pick` utility type, except for the following differences:
- Distributes over union types and allows picking keys from any member of the union type.
- Primitives types are returned as-is.
```
