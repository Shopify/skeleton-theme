import reactReconciler from 'react-reconciler';
import type { Reconciler as ReactReconciler } from 'react-reconciler';
import type { RemoteRoot, RemoteText, RemoteComponent } from '@remote-ui/core';
type ViewInstance = RemoteComponent<any, any>;
type TextInstance = RemoteText<any>;
type SuspenseInstance = never;
type PublicInstance = unknown;
export type Reconciler = ReactReconciler<RemoteRoot, ViewInstance, TextInstance, SuspenseInstance, PublicInstance>;
export declare const createReconciler: (options?: {
    primary?: boolean;
}) => reactReconciler.Reconciler<RemoteRoot<any, true>, ViewInstance, TextInstance, never, unknown>;
export {};
//# sourceMappingURL=reconciler.d.ts.map