type LoadScriptOptions = {
    module?: boolean;
    in?: 'head' | 'body';
    attributes?: Record<string, string>;
};
export declare function loadScript(src: string, options?: LoadScriptOptions): Promise<boolean>;
type LoadScriptParams = Parameters<typeof loadScript>;
/**
 * The `useLoadScript` hook loads an external script tag in the browser. It allows React components to lazy-load large third-party dependencies.
 */
export declare function useLoadScript(url: LoadScriptParams[0], options?: LoadScriptParams[1]): ScriptState;
type ScriptState = 'loading' | 'done' | 'error';
export {};
