import type { ShopifyMonorailPayload, ShopifyMonorailEvent, ShopifyGid } from './analytics-types.js';
/**
 * Builds a Shopify Monorail event from a Shopify Monorail payload and a schema ID.
 * @param payload - The Monorail payload
 * @param schemaId - The schema ID to use
 * @returns The formatted payload
 **/
export declare function schemaWrapper(schemaId: string, payload: ShopifyMonorailPayload): ShopifyMonorailEvent;
/**
 * Parses global id (gid) and returns the resource type and id.
 * @see https://shopify.dev/api/usage/gids
 * @param gid - A shopify GID (string)
 *
 * @example
 * ```ts
 * const {id, resource} = parseGid('gid://shopify/Order/123')
 * // => id = "123", resource = 'Order'
 *
 *  * const {id, resource} = parseGid('gid://shopify/Cart/abc123')
 * // => id = "abc123", resource = 'Cart'
 * ```
 **/
export declare function parseGid(gid: string | undefined): ShopifyGid;
/**
 * Filters properties from an object and returns a new object with only the properties that have a truthy value.
 * @param keyValuePairs - An object of key-value pairs
 * @param formattedData - An object which will hold the truthy values
 * @returns The formatted object
 **/
export declare function addDataIf(keyValuePairs: ShopifyMonorailPayload, formattedData: ShopifyMonorailPayload): ShopifyMonorailPayload;
/**
 * Utility that errors if a function is called on the server.
 * @param fnName - The name of the function
 * @returns A boolean
 **/
export declare function errorIfServer(fnName: string): boolean;
