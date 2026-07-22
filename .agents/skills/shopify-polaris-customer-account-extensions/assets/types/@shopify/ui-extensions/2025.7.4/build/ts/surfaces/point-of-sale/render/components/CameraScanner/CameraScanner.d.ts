import { BannerVariant } from '../Banner/Banner';
export interface CameraScannerBannerProps {
    /**
     * The title text displayed on the banner to provide context or instructions to users.
     */
    title: string;
    /**
     * The appearance variant of the banner that conveys the type of message being displayed.
     */
    variant: BannerVariant;
    /**
     * Controls the visibility state of the banner within the scanner interface.
     */
    visible: boolean;
}
export interface CameraScannerProps {
    /**
     * An optional banner configuration object that displays contextual messages during scanning operations.
     */
    bannerProps?: CameraScannerBannerProps;
}
export declare const CameraScanner: "CameraScanner" & {
    readonly type?: "CameraScanner" | undefined;
    readonly props?: CameraScannerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=CameraScanner.d.ts.map