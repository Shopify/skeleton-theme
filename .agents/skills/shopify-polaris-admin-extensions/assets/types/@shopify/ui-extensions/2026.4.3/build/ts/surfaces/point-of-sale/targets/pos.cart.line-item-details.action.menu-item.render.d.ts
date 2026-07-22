import "../components/Button.d.ts";
import type { ExtensionTargets } from '../extension-targets';
import '../globals';

type Target = ExtensionTargets['pos.cart.line-item-details.action.menu-item.render'];
export type Api = Target['api'];
export type Output = Target['output'];

