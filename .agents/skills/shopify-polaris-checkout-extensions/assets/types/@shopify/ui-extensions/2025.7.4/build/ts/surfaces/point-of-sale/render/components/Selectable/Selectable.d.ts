export interface SelectableProps {
    /**
     * The callback function that's executed when the user taps or presses the selectable component. This is the primary way to handle user interactions with the wrapped content. The function receives no parameters and should contain the logic for what happens when the selection occurs, such as navigation, state updates, or triggering other actions.
     */
    onPress: () => void;
    /**
     * Controls whether the selectable component responds to user interactions. When set to `true`, the component won't react to taps or presses, the `onPress` callback won't be triggered, and the wrapped content appears non-interactive. Use this to temporarily disable selection during loading states, form validation, or when certain conditions aren't met. When `false` or undefined, the component responds normally to user interactions.
     */
    disabled?: boolean;
}
export declare const Selectable: "Selectable" & {
    readonly type?: "Selectable" | undefined;
    readonly props?: SelectableProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Selectable.d.ts.map