import type { ComponentsBuilder, AnyComponentBuilder } from '../../shared';
import type * as ComponentsModule from './components';
export type Components = ComponentsBuilder<typeof ComponentsModule>;
export type AnyComponent = AnyComponentBuilder<typeof ComponentsModule>;
export type AllowedComponents<Allowed extends keyof typeof ComponentsModule> = AnyComponentBuilder<Pick<typeof ComponentsModule, Allowed>>;
export type AnyComponentExcept<Except extends keyof typeof ComponentsModule> = AnyComponentBuilder<Omit<typeof ComponentsModule, Except>>;
//# sourceMappingURL=shared.d.ts.map