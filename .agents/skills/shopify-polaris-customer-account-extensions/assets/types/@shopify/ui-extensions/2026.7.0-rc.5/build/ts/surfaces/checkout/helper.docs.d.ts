import type { ExampleType } from '@shopify/generate-docs';
type NonEmptyArray<T> = [T, ...T[]];
type ExtensionExampleLanguage = 'js' | 'jsx';
/**
 * Returns all examples available, specified with a key for reference.
 */
export declare function getExamples(languages: NonEmptyArray<ExtensionExampleLanguage>): Record<string, ExampleType>;
/**
 * Returns a specific `Example` by name, as specified in `getExamples()`.
 * Specify whether you want to include both `js` and `jsx`examples or just one.
 */
export declare function getExample(name: string, languages?: NonEmptyArray<ExtensionExampleLanguage>): ExampleType;
export declare const REQUIRES_PROTECTED_CUSTOMER_DATA = "access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) for some properties.";
export {};
//# sourceMappingURL=helper.docs.d.ts.map