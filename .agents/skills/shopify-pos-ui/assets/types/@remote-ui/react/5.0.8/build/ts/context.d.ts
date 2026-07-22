/// <reference types="react" />
import type { RemoteRoot } from '@remote-ui/core';
import type { Reconciler } from './reconciler';
export interface RenderContextDescriptor {
    root: RemoteRoot;
    reconciler: Reconciler;
}
export declare const RenderContext: import("react").Context<RenderContextDescriptor | null>;
//# sourceMappingURL=context.d.ts.map