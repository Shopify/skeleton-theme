/**
 * Provides an `id` property for uniquely identifying elements. This is used across customer account components to enable targeting specific elements for styling, scripting, or accessibility purposes.
 */
export interface IdProps {
    /**
     * A unique identifier for the element. Use this to target the element with CSS, JavaScript, or accessibility attributes. The `id` must be unique within the document.
     */
    id?: string;
}
/**
 * The design system's size scale, used to control the dimensions of components like avatars, icons, and thumbnails. Values range from `'small-500'` (smallest) through `'base'` (standard) to `'large-500'` (largest). Not all components support every size — check the component's `size` property type for its available options.
 */
export type SizeKeyword = 'small-500' | 'small-400' | 'small-300' | 'small-200' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'large-200' | 'large-300' | 'large-400' | 'large-500';
/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. Used by Preact for efficient rendering and reconciliation when lists of elements change by tracking which items have been added, removed, or reordered.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic for imperative operations.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns this element to a named slot in a parent component that uses slot-based composition patterns.
     */
    slot?: Lowercase<string>;
}
/**
 * The base properties for elements that have children, extending `BaseElementProps` with children support.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    /**
     * The child elements to render within this component.
     */
    children?: preact.ComponentChildren;
}
//# sourceMappingURL=shared.d.ts.map