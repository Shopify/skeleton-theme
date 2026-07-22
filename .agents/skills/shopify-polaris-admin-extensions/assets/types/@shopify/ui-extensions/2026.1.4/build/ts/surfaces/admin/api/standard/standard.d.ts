import type { I18n } from '../../../../api';
import { ApiVersion } from '../../../../shared';
import type { Storage } from './storage';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Intents } from '../intents/intents';
export type { Intents } from '../intents/intents';
/**
 * The GraphQL error returned by the [GraphQL Admin API](/docs/api/admin-graphql).
 */
export interface GraphQLError {
    /**
     * A human-readable error message describing what went wrong with the GraphQL query. Use this to understand the cause of the error and how to fix your query.
     */
    message: string;
    /**
     * The location in the GraphQL query where the error occurred. Provides the line number and column position to help identify the exact source of the error in your query string.
     */
    locations: {
        /** The line number in the GraphQL query where the error occurred. */
        line: number;
        /** The column position in the GraphQL query where the error occurred. */
        column: string;
    };
}
/**
 * The `Auth` object provides authentication methods for secure communication with your app backend.
 */
interface Auth {
    /**
     * Retrieves a [Shopify OpenID Connect ID token](/docs/api/app-home/apis/id-token) for the current user. Use this token to authenticate requests to your app backend and verify the user's identity. The token is a signed JWT that contains user information and can be validated using Shopify's public keys. Returns `null` if the token can't be retrieved.
     */
    idToken: () => Promise<string | null>;
}
/**
 * The `StandardApi` object provides core methods available to all extension targets. Access the following properties on the `StandardApi` object to authenticate users, query the [GraphQL Admin API](/docs/api/admin-graphql), translate content, handle intents, and persist data.
 *
 * @publicDocs
 */
export interface StandardApi<ExtensionTarget extends AnyExtensionTarget> {
    /**
     * The identifier of the running extension target. Use this to determine which target your extension is rendering in and conditionally adjust functionality or UI based on the extension context.
     */
    extension: {
        target: ExtensionTarget;
    };
    /**
     * Provides methods for authenticating calls to your app backend. Use the `idToken()` method to retrieve a signed JWT token that verifies the current user's identity for secure server-side operations.
     */
    auth: Auth;
    /**
     * Utilities for translating content according to the current localization of the admin. Use these methods to provide translated strings that match the merchant's language preferences, ensuring your extension is accessible to a global audience.
     */
    i18n: I18n;
    /**
     * Provides information to the receiver of an intent. Use this to access data passed from other extensions or parts of the admin when your extension is launched through intent-based navigation.
     */
    intents: Intents;
    /**
     * Provides methods for persisting data in browser storage that is scoped to your extension. Use this to store user preferences, cache data, maintain state across sessions, or save temporary working data. Storage is persistent across page reloads and isolated per extension.
     */
    storage: Storage;
    /**
     * Executes GraphQL queries against the [GraphQL Admin API](/docs/api/admin-graphql). Use this to fetch shop data, manage resources, or perform mutations. Queries are automatically authenticated with the current user's permissions. Optionally specify GraphQL variables and API version for your query.
     */
    query: <Data = unknown, Variables = {
        [key: string]: unknown;
    }>(query: string, options?: {
        variables?: Variables;
        version?: Omit<ApiVersion, '2023-04'>;
    }) => Promise<{
        data?: Data;
        errors?: GraphQLError[];
    }>;
}
//# sourceMappingURL=standard.d.ts.map