import type { RemoteComponentType } from '@remote-ui/types';
import type { RemoteRoot, RemoteComponent, RemoteText, RemoteFragment } from './types';
export declare function isRemoteComponent<Type extends RemoteComponentType<string, any, any> = any, Root extends RemoteRoot<any, any> = RemoteRoot<any, any>>(child: unknown): child is RemoteComponent<Type, Root>;
export declare function isRemoteText<Root extends RemoteRoot<any, any> = RemoteRoot<any, any>>(child: unknown): child is RemoteText<Root>;
export declare function isRemoteFragment<Root extends RemoteRoot<any, any> = RemoteRoot<any, any>>(object: unknown): object is RemoteFragment<Root>;
//# sourceMappingURL=utilities.d.ts.map