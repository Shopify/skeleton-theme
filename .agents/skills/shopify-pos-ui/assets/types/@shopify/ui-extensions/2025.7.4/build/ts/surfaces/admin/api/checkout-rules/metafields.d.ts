import { SupportedDefinitionType } from '../shared';
interface MetafieldUpdateChange {
    type: 'updateMetafield';
    key: string;
    namespace?: string;
    value: string | number;
    valueType?: SupportedDefinitionType;
}
interface MetafieldRemoveChange {
    type: 'removeMetafield';
    key: string;
    namespace: string;
}
type MetafieldChange = MetafieldUpdateChange | MetafieldRemoveChange;
interface MetafieldChangeResultError {
    type: 'error';
    message: string;
}
interface MetafieldChangeSuccess {
    type: 'success';
}
type MetafieldChangeResult = MetafieldChangeSuccess | MetafieldChangeResultError;
export type ApplyMetafieldChange = (change: MetafieldChange) => Promise<MetafieldChangeResult>;
export {};
//# sourceMappingURL=metafields.d.ts.map