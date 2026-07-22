import type { Capability } from '../api/standard/standard';
/**
 * Returns a list of an extension's granted capabilities.
 * @publicDocs
 */
export declare function useExtensionCapabilities(): Capability[];
/**
 * Returns whether or not a given capability of an extension is granted.
 * @publicDocs
 */
export declare function useExtensionCapability(capability: Capability): boolean;
//# sourceMappingURL=capabilities.d.ts.map