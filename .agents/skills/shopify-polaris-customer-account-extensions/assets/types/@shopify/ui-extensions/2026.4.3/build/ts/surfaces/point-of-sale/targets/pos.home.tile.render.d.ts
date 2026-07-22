import "../components/Tile.d.ts";
import type { ExtensionTargets } from '../extension-targets';
import '../globals';

type Target = ExtensionTargets['pos.home.tile.render'];
export type Api = Target['api'];
export type Output = Target['output'];

