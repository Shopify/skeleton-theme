import type { PartialDeep } from 'type-fest';
/**
 * The `flattenConnection` utility transforms a connection object from the Storefront API (for example, [Product-related connections](https://shopify.dev/api/storefront/reference/products/product)) into a flat array of nodes.
 * The utility works with either `nodes` or `edges.node`.
 *
 * If `connection` is null or undefined, will return an empty array instead in production. In development, an error will be thrown.
 */
export declare function flattenConnection<ConnectionGeneric extends PartialDeep<ConnectionEdges, {
    recurseIntoArrays: true;
}> | PartialDeep<ConnectionNodes, {
    recurseIntoArrays: true;
}> | ConnectionEdges | ConnectionNodes>(connection?: ConnectionGeneric): ConnectionGeneric extends {
    edges: Array<{
        node: infer ConnectionBaseType;
    }>;
} | {
    nodes: Array<infer ConnectionBaseType>;
} ? ConnectionBaseType[] : ConnectionGeneric extends PartialDeep<{
    edges: {
        node: Array<infer ConnectionBaseType>;
    };
}, {
    recurseIntoArrays: true;
}> | PartialDeep<{
    nodes: Array<infer ConnectionBaseType>;
}, {
    recurseIntoArrays: true;
}> ? PartialDeep<ConnectionBaseType[], {
    recurseIntoArrays: true;
}> : never;
type ConnectionEdges = {
    edges: Array<{
        node: unknown;
    }>;
};
type ConnectionNodes = {
    nodes: Array<unknown>;
};
export interface ConnectionGenericForDoc {
    connection?: ConnectionEdges | ConnectionNodes;
}
export type FlattenConnectionReturnForDoc = unknown[];
export {};
