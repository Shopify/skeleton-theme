import type { RemoteComponentType } from '@remote-ui/types';
import type { RemoteRoot, RemoteChannel, RemoteRootOptions } from './types';
export declare function createRemoteRoot<AllowedComponents extends RemoteComponentType<string, any> = RemoteComponentType<any, any>, AllowedChildrenTypes extends AllowedComponents | boolean = true>(channel: RemoteChannel, { strict, components }?: RemoteRootOptions<AllowedComponents>): RemoteRoot<AllowedComponents, AllowedChildrenTypes>;
//# sourceMappingURL=root.d.ts.map