import type { SupportedDefinitionType } from './metafields';
/**
 * A [metafield](/docs/apps/build/metafields) associated with an order routing rule. Use metafields to persist settings that control how your order routing function behaves, such as location preferences, routing criteria, or custom fulfillment rules.
 */
interface Metafield {
    /** The unique global identifier (GID) for this metafield. Present for existing metafields, absent for new ones. Use this ID to reference the metafield in GraphQL operations. */
    id?: string | null;
    /** The unique key identifying this metafield within its namespace. This key determines how you access the metafield value (for example, `'preferred_location'` or `'routing_priority'`). */
    key: string;
    /** The metafield value stored as a string. Parse this value according to the metafield type to use it in your settings UI. */
    value?: string | null;
    /** The namespace that organizes related metafields together. Use consistent namespaces to group related settings for your order routing rule. */
    namespace?: string;
    /** The metafield [definition type](/docs/apps/build/metafields/list-of-data-types) that specifies the value format and validation rules. Use this to determine how to parse and display the value. */
    type?: SupportedDefinitionType;
}
/**
 * An order routing rule configuration that determines how orders are routed to fulfillment locations. Use this to access the rule's current settings and populate your configuration interface.
 */
interface OrderRoutingRule {
    /** The display label for the order routing rule shown to merchants in the admin. Use this to identify the rule in lists and settings pages. */
    label: string;
    /** A description explaining the rule's purpose and how it routes orders. Use this to help merchants understand what the rule does. */
    description: string;
    /** The unique global identifier (GID) for the order routing rule. Use this ID to associate configuration changes with the correct rule. */
    id: string;
    /** The priority order for rule evaluation when multiple rules exist. Lower numbers are evaluated first (for example, a rule with priority 1 runs before priority 2). Use this to understand the rule's position in the evaluation sequence. */
    priority?: number;
    /** An array of [metafields](/docs/apps/build/metafields) that store the routing rule's configuration values. Use these metafields to populate your settings UI with the current rule configuration. */
    metafields: Metafield[];
}
/**
 * The `data` object exposed to order routing rule extensions in the `admin.settings.order-routing-rule.render` target. Use this to access the current rule configuration and build your settings interface.
 */
export interface Data {
    /** The order routing rule being configured by the merchant. Use this to access the rule's properties and populate your settings UI with existing configuration values. */
    rule: OrderRoutingRule;
}
export {};
//# sourceMappingURL=data.d.ts.map