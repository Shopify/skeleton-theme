import type { IdProps } from '../shared';
type Tone = 'auto' | 'critical';
export interface ProgressProps extends IdProps {
    /**
     * Specify how much of the task that has been completed.
     * It must be a valid floating point number between 0 and max, or between 0 and 1 if max is omitted.
     * When undefined, the progress bar is indeterminate;
     * this indicates that an activity is ongoing with no indication of how long it is expected to take.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value
     */
    value?: number;
    /**
     * Define the maximum limit of the progress element.
     * It must have a value greater than 0 and be a valid floating point number.
     *
     * @defaultValue 1
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max
     */
    max?: number;
    /**
     * Set the color of the progress bar.
     *
     * @defaultValue 'auto'
     */
    tone?: Tone;
    /**
     * A label to use for the Progress that will be used for buyers using assistive technologies like screen readers.
     * It will also be used to replace the animated loading indicator when buyers prefer reduced motion.
     *
     */
    accessibilityLabel?: string;
}
export declare const Progress: "Progress" & {
    readonly type?: "Progress" | undefined;
    readonly props?: ProgressProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Progress.d.ts.map