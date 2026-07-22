/** @publicDocs */
export type Resolution = 1 | 1.3 | 1.5 | 2 | 2.6 | 3 | 3.5 | 4;
/** @publicDocs */
export interface InteractiveConditions {
    hover: true;
    focus: true;
}
/** @publicDocs */
export interface ResolutionCondition {
    resolution: Resolution;
}
/** @publicDocs */
export type ViewportInlineSize = 'extraSmall' | 'small' | 'medium' | 'large';
/** @publicDocs */
export interface ViewportSizeCondition<T = ViewportInlineSize> {
    viewportInlineSize: {
        min: T;
    };
}
/** @publicDocs */
export type AtLeastOne<T, U = {
    [K in keyof T]: Pick<T, K>;
}> = Partial<T> & U[keyof U];
/** @publicDocs */
export type DefaultConditions = InteractiveConditions & ViewportSizeCondition;
/** @publicDocs */
export type Conditions = AtLeastOne<DefaultConditions>;
/** @publicDocs */
export type BaseConditions = AtLeastOne<DefaultConditions & ResolutionCondition>;
/** @publicDocs */
export interface StylesBaseConditions {
    viewportInlineSize?: {
        min: ViewportInlineSize;
    };
    hover?: true;
    focus?: true;
    resolution?: 1 | 1.3 | 1.5 | 2 | 2.6 | 3 | 3.5 | 4;
}
/** @publicDocs */
export interface StylesConditions {
    viewportInlineSize?: {
        min: ViewportInlineSize;
    };
    hover?: true;
    focus?: true;
}
/** @publicDocs */
export interface StylesConditionalValue<T, AcceptedConditions extends StylesBaseConditions = StylesBaseConditions> {
    /**
     * The conditions that must be met for the value to be applied. At least one
     * condition must be specified.
     */
    conditions: AcceptedConditions;
    /**
     * The value that will be applied if the conditions are met.
     */
    value: T;
}
/** @publicDocs */
export interface StylesConditionalStyle<T, AcceptedConditions extends StylesBaseConditions = StylesBaseConditions> {
    /**
     * The default value applied when none of the conditional values
     * specified in `conditionals` are met.
     */
    default?: T;
    /**
     * An array of conditional values.
     */
    conditionals: StylesConditionalValue<T, AcceptedConditions>[];
}
/** @publicDocs */
export interface ConditionalValue<T, AcceptedConditions extends BaseConditions = Conditions> {
    /**
     * The conditions that must be met for the value to be applied. At least one
     * condition must be specified.
     */
    conditions: AcceptedConditions;
    /**
     * The value that will be applied if the conditions are met.
     */
    value: T;
}
/** @publicDocs */
export interface ConditionalStyle<T, AcceptedConditions extends BaseConditions = Conditions> {
    /**
     * The default value applied when none of the conditional values
     * specified in `conditionals` are met.
     */
    default?: T;
    /**
     * An array of conditional values.
     */
    conditionals: ConditionalValue<T, AcceptedConditions>[];
}
/**
 * A type that represents a value that can be a conditional style.
 * We highly recommend using the `Style` helper which simplifies the creation of conditional styles.
 * @publicDocs
 */
export type MaybeConditionalStyle<T, AcceptedConditions extends BaseConditions = Conditions> = T | ConditionalStyle<T, AcceptedConditions>;
/**
 * A type that represents a value that can be a conditional style. The conditions are based on the viewport size.
 * We highly recommend using the `Style` helper which simplifies the creation of conditional styles.
 * @publicDocs
 */
export type MaybeResponsiveConditionalStyle<T> = T | ConditionalStyle<T, ViewportSizeCondition>;
//# sourceMappingURL=types.d.ts.map