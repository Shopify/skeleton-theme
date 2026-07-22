import { ShopifyPageViewPayload, ShopifyPageViewPayloadWithPrivacyFields, ShopifyAddToCartPayload, ShopifyAddToCartPayloadWithPrivacyFields, ShopifyMonorailEvent } from './analytics-types.js';
export declare function pageView(payload: ShopifyPageViewPayload | ShopifyPageViewPayloadWithPrivacyFields): ShopifyMonorailEvent[];
export declare function pageView2(payload: ShopifyPageViewPayload): ShopifyMonorailEvent[];
export declare function collectionView(payload: ShopifyPageViewPayload): ShopifyMonorailEvent[];
export declare function productView(payload: ShopifyPageViewPayload): ShopifyMonorailEvent[];
export declare function searchView(payload: ShopifyPageViewPayload): ShopifyMonorailEvent[];
export declare function addToCart(payload: ShopifyAddToCartPayload | ShopifyAddToCartPayloadWithPrivacyFields): ShopifyMonorailEvent[];
