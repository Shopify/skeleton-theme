import type { ExtensionTargets } from '../extension-targets';
import '../globals';

type Target = ExtensionTargets['pos.cart-update.event.observe'];
export type Api = Target['api'];
export type Output = Target['output'];

