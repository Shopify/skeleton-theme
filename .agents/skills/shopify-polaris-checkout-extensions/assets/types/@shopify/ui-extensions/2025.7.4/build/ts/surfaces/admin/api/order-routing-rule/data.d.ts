import type { SupportedDefinitionType } from './metafields';
interface Metafield {
    id?: string | null;
    key: string;
    value?: string | null;
    namespace?: string;
    type?: SupportedDefinitionType;
}
interface OrderRoutingRule {
    label: string;
    description: string;
    id: string;
    priority?: number;
    metafields: Metafield[];
}
export interface Data {
    rule: OrderRoutingRule;
}
export {};
//# sourceMappingURL=data.d.ts.map