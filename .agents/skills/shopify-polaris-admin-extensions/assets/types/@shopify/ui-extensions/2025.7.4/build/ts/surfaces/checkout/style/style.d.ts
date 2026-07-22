import type { Conditions, ConditionalStyle, BaseConditions, StylesConditions, StylesConditionalStyle } from './types';
type Chainable<TConditionalStyle> = TConditionalStyle extends ConditionalStyle<infer T, infer TAcceptedConditions> ? TConditionalStyle & {
    when: <U, AcceptedConditions extends BaseConditions = TAcceptedConditions>(this: TConditionalStyle, conditions: AcceptedConditions, value: U) => Chainable<TConditionalStyle extends {
        default: T;
    } ? Required<ConditionalStyle<U, AcceptedConditions>> : ConditionalStyle<U, AcceptedConditions>>;
} : never;
type WhenContext<T, AcceptedConditions extends BaseConditions = Conditions> = typeof Style | ConditionalStyle<T, AcceptedConditions> | Required<ConditionalStyle<T, AcceptedConditions>>;
type WhenReturnType<T, TContext extends WhenContext<any, AcceptedConditions>, AcceptedConditions extends BaseConditions = Conditions> = Chainable<TContext extends typeof Style ? ConditionalStyle<T, AcceptedConditions> : TContext extends {
    default: infer U;
} ? Required<ConditionalStyle<T | U, AcceptedConditions>> : TContext extends {
    default?: infer U;
} ? ConditionalStyle<T | U, AcceptedConditions> : ConditionalStyle<T, AcceptedConditions>>;
interface WhenFunction {
    <T, TContext extends WhenContext<any, AcceptedConditions>, AcceptedConditions extends BaseConditions = Conditions>(this: TContext, conditions: AcceptedConditions, value: T): WhenReturnType<T, TContext, AcceptedConditions>;
}
export interface DocsStyle {
    /**
     * Sets an optional default value to use when no other condition is met.
     *
     * @param defaultValue The default value
     * @returns The chainable condition style
     */
    default: <T>(defaultValue: T) => StylesConditionalStyle<T>;
    /**
     * Adjusts the style based on different conditions. All conditions, expressed
     * as a literal object, must be met for the associated value to be applied.
     *
     * The `when` method can be chained together to build more complex styles.
     *
     * @param conditions The condition(s)
     * @param value The conditional value that can be applied if the conditions are met
     * @returns The chainable condition style
     */
    when: <T>(conditions: StylesConditions, value: T) => StylesConditionalStyle<T>;
}
/**
 * Style is a helper for authoring conditional values for prop styles.
 * Write complex conditional styles based on one or more conditions (viewport
 * sizes and interactive states) in a concise and expressive way.
 */
export declare const Style: {
    /**
     * Sets an optional default value to use when no other condition is met.
     *
     * @param defaultValue The default value
     * @returns The chainable condition style
     */
    readonly default: (<T, AcceptedConditions extends BaseConditions = Conditions>(defaultValue: T) => Required<ConditionalStyle<T, AcceptedConditions>> & {
        when: <U, AcceptedConditions_1 extends BaseConditions = AcceptedConditions>(this: Required<ConditionalStyle<T, AcceptedConditions>>, conditions: AcceptedConditions_1, value: U) => Required<ConditionalStyle<U, AcceptedConditions_1>> & {
            when: <U_1, AcceptedConditions_2 extends BaseConditions = AcceptedConditions_1>(this: Required<ConditionalStyle<U, AcceptedConditions_1>>, conditions: AcceptedConditions_2, value: U_1) => Required<ConditionalStyle<U_1, AcceptedConditions_2>> & {
                when: <U_2, AcceptedConditions_3 extends BaseConditions = AcceptedConditions_2>(this: Required<ConditionalStyle<U_1, AcceptedConditions_2>>, conditions: AcceptedConditions_3, value: U_2) => Required<ConditionalStyle<U_2, AcceptedConditions_3>> & {
                    when: <U_3, AcceptedConditions_4 extends BaseConditions = AcceptedConditions_3>(this: Required<ConditionalStyle<U_2, AcceptedConditions_3>>, conditions: AcceptedConditions_4, value: U_3) => Required<ConditionalStyle<U_3, AcceptedConditions_4>> & {
                        when: <U_4, AcceptedConditions_5 extends BaseConditions = AcceptedConditions_4>(this: Required<ConditionalStyle<U_3, AcceptedConditions_4>>, conditions: AcceptedConditions_5, value: U_4) => Required<ConditionalStyle<U_4, AcceptedConditions_5>> & {
                            when: <U_5, AcceptedConditions_6 extends BaseConditions = AcceptedConditions_5>(this: Required<ConditionalStyle<U_4, AcceptedConditions_5>>, conditions: AcceptedConditions_6, value: U_5) => Required<ConditionalStyle<U_5, AcceptedConditions_6>> & {
                                when: <U_6, AcceptedConditions_7 extends BaseConditions = AcceptedConditions_6>(this: Required<ConditionalStyle<U_5, AcceptedConditions_6>>, conditions: AcceptedConditions_7, value: U_6) => Required<ConditionalStyle<U_6, AcceptedConditions_7>> & {
                                    when: <U_7, AcceptedConditions_8 extends BaseConditions = AcceptedConditions_7>(this: Required<ConditionalStyle<U_6, AcceptedConditions_7>>, conditions: AcceptedConditions_8, value: U_7) => Required<ConditionalStyle<U_7, AcceptedConditions_8>> & {
                                        when: <U_8, AcceptedConditions_9 extends BaseConditions = AcceptedConditions_8>(this: Required<ConditionalStyle<U_7, AcceptedConditions_8>>, conditions: AcceptedConditions_9, value: U_8) => Required<ConditionalStyle<U_8, AcceptedConditions_9>> & {
                                            when: <U_9, AcceptedConditions_10 extends BaseConditions = AcceptedConditions_9>(this: Required<ConditionalStyle<U_8, AcceptedConditions_9>>, conditions: AcceptedConditions_10, value: U_9) => Required<ConditionalStyle<U_9, AcceptedConditions_10>> & {
                                                when: <U_10, AcceptedConditions_11 extends BaseConditions = AcceptedConditions_10>(this: Required<ConditionalStyle<U_9, AcceptedConditions_10>>, conditions: AcceptedConditions_11, value: U_10) => Required<ConditionalStyle<U_10, AcceptedConditions_11>> & any;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    }) & {
        clearCache: () => void;
    };
    /**
     * Adjusts the style based on different conditions. All conditions, expressed
     * as a literal object, must be met for the associated value to be applied.
     *
     * The `when` method can be chained together to build more complex styles.
     *
     * @param conditions The condition(s)
     * @param value The conditional value that can be applied if the conditions are met
     * @returns The chainable condition style
     */
    readonly when: WhenFunction & {
        clearCache: () => void;
    };
};
export declare function isConditionalStyle<T, AcceptedConditions extends BaseConditions = Conditions>(value?: any): value is ConditionalStyle<T, AcceptedConditions>;
export declare function isConditionalStyleWithDefault<T, AcceptedConditions extends BaseConditions = Conditions>(value?: any): value is Required<ConditionalStyle<T, AcceptedConditions>>;
export {};
//# sourceMappingURL=style.d.ts.map