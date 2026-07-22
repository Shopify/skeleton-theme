import type { ExtensionTargets } from '../extension-targets';
import '../globals';
export type * from '../events';

type Target = ExtensionTargets['pos.transaction-complete.event.observe'];
export type Api = Target['api'];
export type Output = Target['output'];

