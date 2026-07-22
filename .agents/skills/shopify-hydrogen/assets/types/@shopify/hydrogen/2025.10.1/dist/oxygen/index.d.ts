import { ServerBuild } from 'react-router';

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
    /**
     * Whether to proxy standard routes such as `/api/.../graphql.json` (Storefront API).
     * You can disable this if you are handling these routes yourself. Ensure that
     * the proxy works if you rely on Hydrogen's built-in behaviors such as analytics.
     * @default true
     */
    proxyStandardRoutes?: boolean;
};
/**
 * Creates a request handler for Hydrogen apps using React Router.
 */
declare function createRequestHandler<Context = unknown>({ build, mode, poweredByHeader, getLoadContext, collectTrackingInformation, proxyStandardRoutes, }: CreateRequestHandlerOptions<Context>): (request: Request) => Promise<Response>;

type RequestEventPayload = {
    __fromVite?: boolean;
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
      customerPrivacy: CustomerPrivacy;
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
