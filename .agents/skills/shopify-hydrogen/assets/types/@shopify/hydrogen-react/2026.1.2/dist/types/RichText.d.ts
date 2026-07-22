import { type CustomComponents } from './RichText.components.js';
export interface RichTextPropsBase<ComponentGeneric extends React.ElementType> {
    /** An HTML tag or React Component to be rendered as the base element wrapper. The default is `div`. */
    as?: ComponentGeneric;
    /** The JSON string that correspond to the Storefront API's [RichText format](https://shopify.dev/docs/apps/custom-data/metafields/types#rich-text-formatting). */
    data: string;
    /** Customize how rich text components are rendered */
    components?: CustomComponents;
    /** Remove rich text formatting and render plain text */
    plain?: boolean;
}
export declare function RichText<ComponentGeneric extends React.ElementType = 'div'>({ as, data, plain, components, ...passthroughProps }: RichTextProps<ComponentGeneric>): JSX.Element;
export type RichTextProps<ComponentGeneric extends React.ElementType> = RichTextPropsBase<ComponentGeneric> & Omit<React.ComponentPropsWithoutRef<ComponentGeneric>, keyof RichTextPropsBase<ComponentGeneric>>;
export type RichTextPropsForDocs<AsType extends React.ElementType = 'div'> = RichTextPropsBase<AsType>;
