import type { ReactNode } from 'react';
import type { RemoteRoot } from '@remote-ui/core';
import type { Reconciler } from './reconciler';
export interface Root {
    render(children: ReactNode): void;
    unmount(): void;
}
export declare function createRoot(root: RemoteRoot<any, any>): Root;
/**
 * @deprecated Use `createRoot` for a React 18-style rendering API.
 */
export declare function render(element: ReactNode, root: RemoteRoot<any, any>, callback?: () => void, reconciler?: Reconciler): void;
//# sourceMappingURL=render.d.ts.map