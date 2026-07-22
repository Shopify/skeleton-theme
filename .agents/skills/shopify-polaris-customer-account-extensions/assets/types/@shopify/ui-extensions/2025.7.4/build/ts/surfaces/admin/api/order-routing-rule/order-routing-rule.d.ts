import type { StandardApi } from '../standard/standard';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import { ApplyMetafieldsChange } from './metafields';
import { Data } from './data';
export interface OrderRoutingRuleApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    applyMetafieldsChange: ApplyMetafieldsChange;
    data: Data;
}
//# sourceMappingURL=order-routing-rule.d.ts.map