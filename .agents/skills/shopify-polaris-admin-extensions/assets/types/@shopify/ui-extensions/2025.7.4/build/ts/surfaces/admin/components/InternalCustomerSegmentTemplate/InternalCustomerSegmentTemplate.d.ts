export type CustomerSegmentTemplateIcon = 'categoriesMajor' | 'firstVisitMajor' | 'heartMajor' | 'marketingMajor' | 'checkoutMajor' | 'ordersMajor' | 'locationMajor' | 'emailNewsletterMajor' | 'firstOrderMajor' | 'billingStatementDollarMajor' | 'diamondAlertMajor' | 'abandonedCartMajor' | 'calendarMajor' | 'productsMajor' | 'globeMajor' | 'flagMajor' | 'uploadMajor' | 'buyButtonMajor' | 'followUpEmailMajor' | 'confettiMajor' | 'walletMajor' | 'viewMajor' | 'personAddMajor' | 'languageMajor' | 'appsMajor' | 'categories' | 'eye-first' | 'heart' | 'target' | 'cart' | 'order' | 'location' | 'email-newsletter' | 'order-first' | 'receipt-dollar' | 'alert-diamond' | 'cart-abandoned' | 'calendar' | 'product' | 'globe' | 'flag' | 'upload' | 'button-press' | 'email-follow-up' | 'confetti' | 'wallet' | 'view' | 'person-add' | 'language' | 'apps';
export type CustomerSegmentTemplateCategory = 'firstTimeBuyers' | 'highValueCustomers' | 'reEngageCustomers' | 'abandonedCheckout' | 'purchaseBehaviour' | 'location';
/**
 * Reserved namespace and key for the customer standard metafield used in the template's query.
 * More info - https://shopify.dev/docs/apps/custom-data/metafields/definitions/standard
 */
type CustomerStandardMetafieldDependency = 'facts.birth_date';
export interface InternalCustomerSegmentTemplateProps {
    title: string;
    description: string | string[];
    icon: CustomerSegmentTemplateIcon;
    query: string;
    queryToInsert?: string;
    dependencies?: {
        standardMetafields?: CustomerStandardMetafieldDependency[];
        customMetafields?: string[];
    };
    createdOn?: string;
    category: CustomerSegmentTemplateCategory;
}
/**
 * Customer segment templates are used to give merchants a starting point to create segments.
 */
export declare const InternalCustomerSegmentTemplate: "InternalCustomerSegmentTemplate" & {
    readonly type?: "InternalCustomerSegmentTemplate" | undefined;
    readonly props?: InternalCustomerSegmentTemplateProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=InternalCustomerSegmentTemplate.d.ts.map