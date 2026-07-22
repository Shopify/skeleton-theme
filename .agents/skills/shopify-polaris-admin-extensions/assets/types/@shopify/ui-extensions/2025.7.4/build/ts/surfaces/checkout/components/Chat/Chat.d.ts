import type { IdProps } from '../shared';
export interface ChatProps extends IdProps {
    /**
     * Adjust the inline size.
     *
     * Checkout imposes [sizing restrictions](https://shopify.dev/docs/apps/build/checkout/chat#component-states) for the component, therefore the size set
     * may not be the actual size rendered.
     *
     * `number`: size in pixels.
     *
     * Learn more about [inline size on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size).
     */
    inlineSize?: number;
    /**
     * Adjust the block size.
     *
     * Checkout imposes [sizing restrictions](https://shopify.dev/docs/apps/build/checkout/chat#component-states) for the component, therefore the size set
     * may not be the actual size rendered.
     *
     * `number`: size in pixels.
     *
     * Learn more about [block size on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size).
     */
    blockSize?: number;
    /**
     * A label that describes the purpose or contents of the component. When set,
     * it will be announced to users using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Callback when the embedded page sends a message.
     */
    onMessage?: (event: MessageEvent) => void;
    /**
     * Callback when the embedded page is ready and a message port has been created to
     * communicate with the host page.
     */
    onReady?: (event: ReadyEvent) => void;
}
interface MessageEvent {
    /**
     * The data sent by the message emitter (the embedded page).
     *
     * Learn more about [MessageEvent data on MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/data).
     */
    data?: any;
    /**
     * A string representing the origin of the message emitter (the embedded page).
     *
     * Learn more about [MessageEvent origin on MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/origin).
     */
    origin: string;
}
export interface ReadyEvent {
    /**
     * A function to send messages to the embedded page.
     *
     * Learn more about [postMessage on MDN](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort/postMessage).
     */
    postMessage: (message: any) => void;
}
/**
 * Use the Chat component to create real-time chat applications.
 */
export declare const Chat: "Chat" & {
    readonly type?: "Chat" | undefined;
    readonly props?: ChatProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Chat.d.ts.map