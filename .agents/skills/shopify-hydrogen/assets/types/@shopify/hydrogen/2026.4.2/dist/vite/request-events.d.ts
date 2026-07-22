import { IncomingMessage, ServerResponse } from 'node:http';
import { CountryCode, LanguageCode } from '@shopify/hydrogen-react/storefront-api-types';

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
declare function emitRequestEvent(payload: RequestEventPayload, root: string): void;
declare function clearHistory(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void;
declare function streamRequestEvents(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void;

export { type RequestEventPayload, clearHistory, emitRequestEvent, streamRequestEvents };
