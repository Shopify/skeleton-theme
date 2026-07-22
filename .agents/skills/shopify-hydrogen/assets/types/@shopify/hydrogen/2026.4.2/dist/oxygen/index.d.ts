import { ServerBuild } from 'react-router';
import { CountryCode, LanguageCode } from '@shopify/hydrogen-react/storefront-api-types';

type CreateRequestHandlerOptions<Context = unknown> = {
    /** React Router's server build */
    build: ServerBuild;
    /** React Router's mode */
    mode?: string;
    /**
     * Function to provide the load context for each request.
     * It must contain Hydrogen's storefront client instance
     * for other Hydrogen utilities to work properly.
     */
    getLoadContext?: (request: Request) => Promise<Context> | Context;
    /**
     * Whether to include the `powered-by` header in responses
     * @default true
     */
    poweredByHeader?: boolean;
    /**
     * Collect tracking information from subrequests such as cookies
     * and forward them to the browser. Disable this if you are not
     * using Hydrogen's built-in analytics.
     * @default true
     */
    collectTrackingInformation?: boolean;
};
/**
 * Creates a request handler for Hydrogen apps using React Router.
 * @publicDocs
 */
declare function createRequestHandler<Context = unknown>({ build, mode, poweredByHeader, getLoadContext, collectTrackingInformation, }: CreateRequestHandlerOptions<Context>): (request: Request) => Promise<Response>;

type RequestEventPayload = {
    url: string;
    eventType: 'request' | 'subrequest';
    requestId?: string | null;
    purpose?: string | null;
    startTime: number;
    endTime?: number;
    cacheStatus?: 'MISS' | 'HIT' | 'STALE' | 'PUT';
    waitUntil?: WaitUntil;
    graphql?: string | null;
    stackInfo?: {
        file?: string;
        func?: string;
        line?: number;
        column?: number;
    };
    responsePayload?: any;
    responseInit?: Omit<ResponseInit, 'headers'> & {
        headers?: [string, string][];
    };
    cache?: {
        status?: string;
        strategy?: string;
        key?: string | readonly unknown[];
    };
    displayName?: string;
};

type ConsentStatus = boolean | undefined;
type VisitorConsent = {
    marketing: ConsentStatus;
    analytics: ConsentStatus;
    preferences: ConsentStatus;
    sale_of_data: ConsentStatus;
};
type CustomerPrivacyConsentConfig = {
    checkoutRootDomain: string;
    storefrontRootDomain?: string;
    storefrontAccessToken: string;
    country?: CountryCode;
    /** The privacyBanner refers to `language` as `locale`  */
    locale?: LanguageCode;
};
type SetConsentHeadlessParams = VisitorConsent & CustomerPrivacyConsentConfig & {
    headlessStorefront?: boolean;
};
/**
  Ideally this type should come from the Custoemr Privacy API sdk
  analyticsProcessingAllowed -
  currentVisitorConsent
  doesMerchantSupportGranularConsent
  firstPartyMarketingAllowed
  getCCPAConsent
  getTrackingConsent
  marketingAllowed
  preferencesProcessingAllowed
  saleOfDataAllowed
  saleOfDataRegion
  setTrackingConsent
  shouldShowBanner
  shouldShowGDPRBanner
  thirdPartyMarketingAllowed
**/
type OriginalCustomerPrivacy = {
    currentVisitorConsent: () => VisitorConsent;
    preferencesProcessingAllowed: () => boolean;
    saleOfDataAllowed: () => boolean;
    marketingAllowed: () => boolean;
    analyticsProcessingAllowed: () => boolean;
    setTrackingConsent: (consent: SetConsentHeadlessParams, callback: (data: {
        error: string;
    } | undefined) => void) => void;
    shouldShowBanner: () => boolean;
};
type CustomerPrivacy = Omit<OriginalCustomerPrivacy, 'setTrackingConsent'> & {
    setTrackingConsent: (consent: VisitorConsent, // we have already applied the headlessStorefront in the override
    callback: (data: {
        error: string;
    } | undefined) => void) => void;
};
type PrivacyBanner = {
    loadBanner: (options?: Partial<CustomerPrivacyConsentConfig>) => void;
    showPreferences: (options?: Partial<CustomerPrivacyConsentConfig>) => void;
};

type WaitUntil = (promise: Promise<unknown>) => void;

type StorefrontHeaders = {
  /** A unique ID that correlates all sub-requests together. */
  requestGroupId: string | null;
  /** The IP address of the client. */
  buyerIp: string | null;
  /** The signature of the client's IP address for verification. */
  buyerIpSig: string | null;
  /** The cookie header from the client  */
  cookie: string | null;
  /** The sec-purpose or purpose header value */
  purpose: string | null;
};

declare global {
  interface Window {
    privacyBanner: PrivacyBanner;
    Shopify: {
      customerPrivacy?: Partial<CustomerPrivacy> & {
        backendConsentEnabled?: boolean;
      };
    };
  }
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
  var __H2O_LOG_EVENT: undefined | ((event: RequestEventPayload) => void);
  var __remix_devServerHooks:
    | undefined
    | {getCriticalCss: (...args: unknown[]) => any};
}

type CrossRuntimeRequest = {
    url?: string;
    method?: string;
    headers: {
        get?: (key: string) => string | null | undefined;
        [key: string]: any;
    };
};
/**
 * Extracts relevant Storefront headers from the given Oxygen request.
 */
declare function getStorefrontHeaders(request: CrossRuntimeRequest): StorefrontHeaders;

export { type StorefrontHeaders, createRequestHandler, getStorefrontHeaders };
