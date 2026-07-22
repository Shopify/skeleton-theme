import type { ExtensionTargets } from '../extension-targets';
import '../globals';
export type * from '../events';
export type { BackgroundShopifyGlobal as ShopifyGlobal } from '../globals';

type Target = ExtensionTargets['pos.app.ready.data'];
export type Api = Target['api'];
export type Output = Target['output'];

