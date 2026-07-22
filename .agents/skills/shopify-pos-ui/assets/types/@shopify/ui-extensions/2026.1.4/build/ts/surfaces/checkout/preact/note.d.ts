import type { NoteChange, NoteChangeResult } from '../api/checkout/checkout';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the proposed `note` applied to the checkout.
 * @publicDocs
 */
export declare function useNote<Target extends RenderExtensionTarget = RenderExtensionTarget>(): string | undefined;
/**
 * Returns a function to mutate the `note` property of the checkout.
 * @publicDocs
 */
export declare function useApplyNoteChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: NoteChange) => Promise<NoteChangeResult>;
//# sourceMappingURL=note.d.ts.map