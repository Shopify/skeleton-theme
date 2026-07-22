import "../components/Tile.d.ts";
import type { ExtensionTargets } from '../extension-targets';
import '../globals';

export type * from '../events';

type Target = ExtensionTargets['pos.home.tile.render'];
export type Api = Target['api'];
export type Output = Target['output'];

