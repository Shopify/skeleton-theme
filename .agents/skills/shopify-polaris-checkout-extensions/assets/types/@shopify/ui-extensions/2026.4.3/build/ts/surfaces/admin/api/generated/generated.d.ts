/** Response handle on `shopify.intents.response` with a typed `ok` payload. */
export interface ShopifyGeneratedIntentResponse<Data = unknown> {
    ok(data?: Data): Promise<void>;
}
export interface ShopifyGeneratedIntentVariant<Request = unknown, ResponseData = unknown> {
    request: Request;
    response?: ShopifyGeneratedIntentResponse<ResponseData>;
}
type ReplaceSubscribableValue<Base, Value> = Base extends {
    value: unknown;
    subscribe: (callback: (value: infer _) => void) => () => void;
} ? Omit<Base, 'value' | 'subscribe'> & {
    readonly value: Value;
    subscribe: (callback: (value: Value) => void) => () => void;
} : {
    readonly value: Value;
    subscribe: (callback: (value: Value) => void) => () => void;
};
type MergeGeneratedIntentResponse<BaseIntents, Variants> = Variants extends infer Variant ? Variant extends {
    request: infer GeneratedRequest;
} ? Omit<Variant, 'request' | 'response'> & {
    request: BaseIntents extends {
        request: infer BaseRequest;
    } ? ReplaceSubscribableValue<BaseRequest, GeneratedRequest | null> : {
        readonly value: GeneratedRequest | null;
        subscribe: (callback: (value: GeneratedRequest | null) => void) => () => void;
    };
} & (Variant extends {
    response?: infer GeneratedResponse;
} ? BaseIntents extends {
    response: infer BaseResponse;
} ? {
    response: Omit<NonNullable<BaseResponse>, 'ok'> & NonNullable<GeneratedResponse>;
} : {
    response: NonNullable<GeneratedResponse>;
} : unknown) : Variant : never;
/**
 * Merges generated intent variants into a target's base `Api`. Narrows
 * `intents.request` to the union and specialises `intents.response.ok`;
 * introduces `intents` if the base has none.
 */
export type WithGeneratedIntents<Api, Variants> = Api extends {
    intents?: infer BaseIntents;
} ? Omit<Api, 'intents'> & {
    intents: Omit<NonNullable<BaseIntents>, 'request' | 'response'> & MergeGeneratedIntentResponse<NonNullable<BaseIntents>, Variants>;
} : Api & {
    intents: Variants;
};
/**
 * Merges generated tool registrations into a target's base `Api`. Replaces
 * `tools.register` with the typed overloads in `Tools`; introduces `tools` if
 * the base has none.
 */
export type WithGeneratedTools<Api, Tools> = Api extends {
    tools?: infer BaseTools;
} ? Omit<Api, 'tools'> & {
    tools: Omit<NonNullable<BaseTools>, 'register'> & Tools;
} : Api & {
    tools: Tools;
};
export {};
//# sourceMappingURL=generated.d.ts.map