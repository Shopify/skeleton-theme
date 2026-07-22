import { type ReactNode } from 'react';
export type CustomComponents = {
    /** The root node of the rich text. Defaults to `<div>` */
    root?: typeof Root;
    /** Customize the headings. Each heading has a `level` property from 1-6. Defaults to `<h1>` to `<h6>` */
    heading?: typeof Heading;
    /** Customize paragraphs. Defaults to `<p>` */
    paragraph?: typeof Paragraph;
    /** Customize how text nodes. They can either be bold or italic. Defaults to `<em>`, `<strong>` or text. */
    text?: typeof Text;
    /** Customize links. Defaults to a React Router `<Link>` component in Hydrogen and a `<a>` in Hydrogen React. */
    link?: typeof RichTextLink;
    /** Customize lists. They can be either ordered or unordered. Defaults to `<ol>` or `<ul>` */
    list?: typeof List;
    /** Customize list items. Defaults to `<li>`. */
    listItem?: typeof ListItem;
};
export declare const RichTextComponents: {
    root: typeof Root;
    heading: typeof Heading;
    paragraph: typeof Paragraph;
    text: typeof Text;
    link: typeof RichTextLink;
    list: typeof List;
    'list-item': typeof ListItem;
};
declare function Root({ node, }: {
    node: {
        type: 'root';
        children?: ReactNode[];
    };
}): ReactNode;
declare function Heading({ node, }: {
    node: {
        type: 'heading';
        level: number;
        children?: ReactNode[];
    };
}): ReactNode;
declare function Paragraph({ node, }: {
    node: {
        type: 'paragraph';
        children?: ReactNode[];
    };
}): ReactNode;
declare function Text({ node, }: {
    node: {
        type: 'text';
        italic?: boolean;
        bold?: boolean;
        value?: string;
    };
}): ReactNode;
declare function RichTextLink({ node, }: {
    node: {
        type: 'link';
        url: string;
        title?: string;
        target?: string;
        children?: ReactNode[];
    };
}): ReactNode;
declare function List({ node, }: {
    node: {
        type: 'list';
        listType: 'unordered' | 'ordered';
        children?: ReactNode[];
    };
}): ReactNode;
declare function ListItem({ node, }: {
    node: {
        type: 'list-item';
        children?: ReactNode[];
    };
}): ReactNode;
export {};
