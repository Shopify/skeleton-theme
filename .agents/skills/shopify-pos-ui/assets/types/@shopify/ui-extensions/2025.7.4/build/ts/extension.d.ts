import type { RemoteRoot, RemoteChannel, RemoteComponentType } from '@remote-ui/core';
export interface RenderExtensionConnection<AllowedComponents extends RemoteComponentType<string, any, any> = RemoteComponentType<any, any, any>> {
    readonly channel: RemoteChannel;
    readonly components: AllowedComponents;
}
export interface RenderExtension<Api, AllowedComponents extends RemoteComponentType<string, any, any> = RemoteComponentType<any, any, any>> {
    (connection: RenderExtensionConnection<AllowedComponents>, api: Api): void | Promise<void>;
}
export interface RenderExtensionWithRemoteRoot<Api, AllowedComponents extends RemoteComponentType<string, any, any> = RemoteComponentType<any, any, any>> {
    (root: RemoteRoot<AllowedComponents, AllowedComponents>, api: Api): void | Promise<void> | Promise<() => void>;
}
export interface RunnableExtension<Api, Output> {
    (api: Api): Output | Promise<Output>;
}
//# sourceMappingURL=extension.d.ts.map