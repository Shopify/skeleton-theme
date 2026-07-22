import type { ReactNode, ComponentType, ReactElement } from 'react';
import type { RemoteComponentType, RemoteFragment } from '@remote-ui/core';
type PropsForRemoteComponent<T> = T extends RemoteComponentType<string, infer Props, any> ? Props extends Record<string, never> ? {} : {
    [K in keyof Props]: RemoteFragmentToReactElement<Props[K]>;
} : never;
type RemoteFragmentToReactElement<T> = T extends RemoteFragment<infer R> ? ReactElement | false | RemoteFragment<R> : T;
export type ReactPropsFromRemoteComponentType<Type extends RemoteComponentType<string, any, any>> = PropsForRemoteComponent<Type> & (Type extends RemoteComponentType<string, any, infer Children> ? false extends Children ? {} : {
    children?: ReactNode;
} : {});
export type ReactComponentTypeFromRemoteComponentType<Type extends RemoteComponentType<string, any, any>> = ComponentType<ReactPropsFromRemoteComponentType<Type>>;
export {};
//# sourceMappingURL=types.d.ts.map