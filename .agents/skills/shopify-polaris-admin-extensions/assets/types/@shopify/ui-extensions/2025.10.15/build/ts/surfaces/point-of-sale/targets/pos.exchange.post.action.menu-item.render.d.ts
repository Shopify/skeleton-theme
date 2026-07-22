import "../components/Button.d.ts";
import type { ExtensionTargets } from '../extension-targets';
import '../globals';

type Target = ExtensionTargets['pos.exchange.post.action.menu-item.render'];
export type Api = Target['api'];
export type Output = Target['output'];

