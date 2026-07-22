import { RemoteComponentType } from '@remote-ui/types';
export declare function createRemoteComponent<Type extends string, Props = Record<string, never>, AllowedChildren extends RemoteComponentType<string, any> | boolean = true>(componentType: Type): Type & RemoteComponentType<Type, Props, AllowedChildren>;
//# sourceMappingURL=component.d.ts.map