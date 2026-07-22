import type { MessageEndpoint, RemoteCallable, EncodingStrategy, EncodingStrategyApi } from './types';
export declare const CALL = 0;
export declare const RESULT = 1;
export declare const TERMINATE = 2;
export declare const RELEASE = 3;
export declare const FUNCTION_APPLY = 5;
export declare const FUNCTION_RESULT = 6;
type AnyFunction = (...args: any[]) => any;
export interface CreateEndpointOptions<T = unknown> {
    uuid?(): string;
    createEncoder?(api: EncodingStrategyApi): EncodingStrategy;
    callable?: (keyof T)[];
}
export interface Endpoint<T> {
    readonly call: RemoteCallable<T>;
    replace(messenger: MessageEndpoint): void;
    expose(api: Record<string, AnyFunction | undefined>): void;
    callable(...methods: string[]): void;
    terminate(): void;
}
export declare class MissingResolverError extends Error {
    readonly callId: string;
    readonly error?: Error;
    readonly result?: unknown;
    readonly groupingHash: string;
    constructor(message: {
        callId: string;
        error?: Error;
        result?: unknown;
    });
}
/**
 * An endpoint wraps around a messenger, acting as the intermediary for all
 * messages both send from, and received by, that messenger. The endpoint sends
 * all messages as arrays, where the first element is the message type, and the
 * second is the arguments for that message (as an array). For messages that send
 * meaningful content across the wire (e.g., arguments to function calls, return
 * results), the endpoint first encodes these values.
 *
 * Encoding is done using a CBOR-like encoding scheme. The value is encoded into
 * an array buffer, and is paired with an additional array buffer that contains all
 * the strings used in that message (in the encoded value, strings are encoded as
 * their index in the "strings" encoding to reduce the cost of heavily-duplicated
 * strings, which is more likely in payloads containing UI). This encoding also takes
 * care of encoding functions: it uses a "tagged" item in CBOR to represent a
 * function as a string ID, which the opposite endpoint will be capable of turning
 * into a consistent, memory-manageable function proxy.
 *
 * The main CBOR encoding is entirely take from the [cbor.js package](https://github.com/paroga/cbor-js).
 * The special behavior for encoding strings and functions was then added in to the
 * encoder and decoder. For additional details on CBOR:
 *
 * @see https://tools.ietf.org/html/rfc7049
 */
export declare function createEndpoint<T>(initialMessenger: MessageEndpoint, { uuid, createEncoder, callable, }?: CreateEndpointOptions<T>): Endpoint<T>;
export {};
//# sourceMappingURL=endpoint.d.ts.map