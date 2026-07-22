import "../components/Button.d.ts";
import type { ExtensionTargets } from '../extension-targets';
import '../globals';

export type * from '../events';

type Target = ExtensionTargets['pos.draft-order-details.action.menu-item.render'];
export type Api = Target['api'];
export type Output = Target['output'];

