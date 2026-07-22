import { ACTION_MOUNT, ACTION_INSERT_CHILD, ACTION_UPDATE_PROPS, ACTION_UPDATE_TEXT, KIND_ROOT } from './types';
import type { ActionArgumentMap, RemoteChannel, RemoteTextSerialization, RemoteComponentSerialization, RemoteFragmentSerialization } from './types';
export declare const ROOT_ID: unique symbol;
export interface RemoteReceiverAttachableText extends RemoteTextSerialization {
    version: number;
}
export interface RemoteReceiverAttachableComponent extends Omit<RemoteComponentSerialization<any>, 'children'> {
    children: RemoteReceiverAttachableChild[];
    version: number;
}
export interface RemoteReceiverAttachableFragment extends Omit<RemoteFragmentSerialization, 'children'> {
    children: RemoteReceiverAttachableChild[];
    version: number;
}
export interface RemoteReceiverAttachableRoot {
    id: typeof ROOT_ID;
    kind: typeof KIND_ROOT;
    children: RemoteReceiverAttachableChild[];
    version: number;
}
export type RemoteReceiverAttachableChild = RemoteReceiverAttachableText | RemoteReceiverAttachableComponent;
export type RemoteReceiverAttachable = RemoteReceiverAttachableChild | RemoteReceiverAttachableRoot | RemoteReceiverAttachableFragment;
interface RemoteChannelRunner {
    mount(...args: ActionArgumentMap[typeof ACTION_MOUNT]): void;
    insertChild(...args: ActionArgumentMap[typeof ACTION_INSERT_CHILD]): void;
    removeChild(...args: ActionArgumentMap[typeof ACTION_INSERT_CHILD]): void;
    updateProps(...args: ActionArgumentMap[typeof ACTION_UPDATE_PROPS]): void;
    updateText(...args: ActionArgumentMap[typeof ACTION_UPDATE_TEXT]): void;
}
export declare function createRemoteChannel({ mount, insertChild, removeChild, updateProps, updateText, }: RemoteChannelRunner): RemoteChannel;
export interface RemoteReceiverAttachment {
    readonly root: RemoteReceiverAttachableRoot;
    get<T extends RemoteReceiverAttachable>(attachable: Pick<T, 'id'>): T | null;
    subscribe<T extends RemoteReceiverAttachable>({ id }: T, subscriber: (value: T) => void): () => void;
}
export interface RemoteReceiver {
    readonly receive: RemoteChannel;
    readonly attached: RemoteReceiverAttachment;
    readonly state: 'mounted' | 'unmounted';
    on(event: 'mount', handler: () => void): () => void;
    flush(): Promise<void>;
}
export declare function createRemoteReceiver(): RemoteReceiver;
export declare function isRemoteFragmentSerialization(object: unknown): object is RemoteFragmentSerialization;
export declare function isRemoteReceiverAttachableFragment(object: unknown): object is RemoteReceiverAttachableFragment;
export {};
//# sourceMappingURL=receiver.d.ts.map