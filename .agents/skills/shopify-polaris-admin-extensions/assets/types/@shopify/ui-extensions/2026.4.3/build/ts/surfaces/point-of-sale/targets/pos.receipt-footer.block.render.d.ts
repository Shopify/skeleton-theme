import "../components/PosBlock.d.ts";
import "../components/QrCode.d.ts";
import "../components/Text.d.ts";
import type { ExtensionTargets } from '../extension-targets';
import '../globals';

type Target = ExtensionTargets['pos.receipt-footer.block.render'];
export type Api = Target['api'];
export type Output = Target['output'];

