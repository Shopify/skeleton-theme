import type { NoteChange, NoteChangeResult, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
/**
 * Returns the proposed `note` applied to the checkout.
 */
export declare function useNote<Target extends RenderExtensionTarget = RenderExtensionTarget>(): string | undefined;
/**
 * Returns a function to mutate the `note` property of the checkout.
 */
export declare function useApplyNoteChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: NoteChange) => Promise<NoteChangeResult>;
//# sourceMappingURL=note.d.ts.map