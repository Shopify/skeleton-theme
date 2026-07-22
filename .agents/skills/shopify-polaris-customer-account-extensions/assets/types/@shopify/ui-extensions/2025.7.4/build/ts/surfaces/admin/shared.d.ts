import type { ComponentsBuilder, AnyComponentBuilder } from '../../shared';
type ComponentTypes = typeof import('./components');
export type Components = ComponentsBuilder<ComponentTypes>;
export type AnyComponent = AnyComponentBuilder<ComponentTypes>;
export {};
//# sourceMappingURL=shared.d.ts.map