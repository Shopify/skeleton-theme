export interface Announcement {
    announcement: {
        close(): void;
        addEventListener(type: 'close', cb: () => void): void;
        removeEventListener(type: 'close', cb: () => void): void;
    };
}
//# sourceMappingURL=announcement.d.ts.map