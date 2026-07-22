import type { RemoteComponentType } from '@remote-ui/core';
import type { ReactComponentTypeFromRemoteComponentType } from './types';
interface Options<Props> {
    fragmentProps?: (keyof Props)[];
}
export declare function createRemoteReactComponent<Type extends string, Props = Record<string, never>, AllowedChildren extends RemoteComponentType<string, any> | boolean = true>(componentType: Type | RemoteComponentType<Type, Props, AllowedChildren>, { fragmentProps }?: Options<Props>): RemoteComponentType<Type, Props, AllowedChildren> & ReactComponentTypeFromRemoteComponentType<RemoteComponentType<Type, Props, AllowedChildren>>;
export {};
//# sourceMappingURL=components.d.ts.map