import type { ExtensionTargets } from '../extension-targets';
import '../globals';
export type * from '../events';

type Target = ExtensionTargets['pos.cash-tracking-session-complete.event.observe'];
export type Api = Target['api'];
export type Output = Target['output'];

