import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
interface ProductVariant {
    id: string;
    sku: string;
    barcode: string;
    title: string;
    displayName: string;
    price: string;
    compareAtPrice: string;
    taxable: boolean;
    taxCode: string;
    weight: number;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    productVariantComponents: ProductVariantComponent[];
}
export interface ProductVariantComponent {
    id: string;
    displayName: string;
    title: string;
    sku?: string;
    image?: {
        id?: string | null;
        url?: string | null;
        altText?: string | null;
    } | null;
    productVariantUrl: string;
    selectedOptions: {
        name: string;
        value: string;
    }[];
}
export interface ProductVariantDetailsConfigurationApi<ExtensionTarget extends AnyExtensionTarget> extends BlockExtensionApi<ExtensionTarget> {
    data: Data & {
        variant: ProductVariant;
        app: {
            launchUrl: string;
            applicationUrl: string;
        };
    };
}
export {};
//# sourceMappingURL=product-variant-details-configuration.d.ts.map