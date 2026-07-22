import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
interface Product {
    id: string;
    title: string;
    handle: string;
    status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
    totalVariants: number;
    totalInventory: number;
    hasOnlyDefaultVariant: boolean;
    onlineStoreUrl?: string;
    options: {
        id: string;
        name: string;
        position: number;
        values: string[];
    }[];
    productType: string;
    productCategory?: string;
    productComponents: ProductComponent[];
}
export interface ProductComponent {
    id: string;
    title: string;
    featuredImage?: {
        id?: string | null;
        url?: string | null;
        altText?: string | null;
    } | null;
    totalVariants: number;
    productUrl: string;
    componentVariantsCount: number;
    nonComponentVariantsCount: number;
}
export interface ProductDetailsConfigurationApi<ExtensionTarget extends AnyExtensionTarget> extends BlockExtensionApi<ExtensionTarget> {
    data: Data & {
        product: Product;
        app: {
            launchUrl: string;
            applicationUrl: string;
        };
    };
}
export {};
//# sourceMappingURL=product-details-configuration.d.ts.map