/** VERSION: 0.0.0 **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {ChatProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface ChatProps extends Pick<ChatProps$1, 'accessibilityLabel' | 'blockSize' | 'id' | 'inlineSize' | 'onMessage' | 'onReady'> {
    blockSize?: Extract<ChatProps$1['blockSize'], `${number}px` | '0'>;
    inlineSize?: Extract<ChatProps$1['inlineSize'], `${number}px` | '0'>;
    remoteMethods?: Record<string, (...args: unknown[]) => unknown>;
}

export type { ChatProps };
