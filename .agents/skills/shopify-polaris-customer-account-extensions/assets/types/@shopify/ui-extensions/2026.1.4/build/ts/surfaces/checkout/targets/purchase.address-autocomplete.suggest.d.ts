import type { ExtensionTargets } from '../extension-targets';
  
type Target = ExtensionTargets['purchase.address-autocomplete.suggest'];
export type Api = Target['api'];
export type Output = Target['output'];

