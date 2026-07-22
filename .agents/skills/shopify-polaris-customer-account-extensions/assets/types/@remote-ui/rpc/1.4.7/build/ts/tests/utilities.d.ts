declare class MessagePortPolyfill implements MessagePort {
    onmessageerror: EventListener | null;
    otherPort: MessagePortPolyfill;
    private listeners;
    private started;
    private _onmessage;
    private eventQueue;
    get onmessage(): EventListener | null;
    set onmessage(listener: EventListener | null);
    dispatchEvent(event: Event): boolean;
    postMessage(message: any): void;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    start(): void;
    close(): void;
}
declare class MessageChannelPolyfill implements MessageChannel {
    readonly port1: MessagePortPolyfill;
    readonly port2: MessagePortPolyfill;
    constructor();
}
export { MessageChannelPolyfill as MessageChannel };
//# sourceMappingURL=utilities.d.ts.map