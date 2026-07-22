import { RETAINED_BY, RETAIN_METHOD, RELEASE_METHOD } from './types';
import type { Retainer, MemoryManageable } from './types';
export { RETAINED_BY, RETAIN_METHOD, RELEASE_METHOD };
export type { Retainer, MemoryManageable };
export declare class StackFrame {
    private readonly memoryManaged;
    add(memoryManageable: MemoryManageable): void;
    release(): void;
}
export declare function isMemoryManageable(value: unknown): value is MemoryManageable;
export declare function retain(value: any, { deep }?: {
    deep?: boolean | undefined;
}): boolean;
export declare function release(value: any, { deep }?: {
    deep?: boolean | undefined;
}): boolean;
export declare function releaseInternal(value: any, deep: boolean, seen: Map<any, boolean>): boolean;
export declare function isBasicObject(value: unknown): value is object;
//# sourceMappingURL=memory.d.ts.map