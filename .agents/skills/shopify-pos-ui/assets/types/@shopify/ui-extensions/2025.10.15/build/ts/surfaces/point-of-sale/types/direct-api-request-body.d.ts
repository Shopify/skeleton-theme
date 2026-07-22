/**
 * Represents the structure of a direct API request body for [GraphQL](https://graphql.org/) operations. Contains the query/mutation string and optional variables for parameterized queries.
 */
export interface DirectApiRequestBody {
    /**
     * The GraphQL query or mutation string to be executed against the Shopify API. This is the complete GraphQL operation definition including operation type (query/mutation), field selections, and any embedded arguments. For example, a query string might be `"query { product(id: 123) { title price } }"` or a mutation like `"mutation UpdateProduct($id: ID!, $title: String!) { productUpdate(id: $id, title: $title) { product { title } } }"`. Variables should be extracted into the `variables` field rather than embedded directly in the query string for security and reusability.
     */
    query: string;
    /**
     * Optional variables to be passed along with the GraphQL query, used for parameterized queries and mutations. This is a key-value object where keys match the variable names declared in the `query` string (prefixed with `$`) and values are the actual data to substitute. For example, if the query declares `$id: ID!`, the variables object would include `{id: "123"}`. Variables provide security by preventing injection attacks, enable query reuse with different parameters, and improve GraphQL caching. Returns `undefined` when the query has no variables or uses inline arguments instead.
     */
    variables?: Record<string, any>;
}
//# sourceMappingURL=direct-api-request-body.d.ts.map