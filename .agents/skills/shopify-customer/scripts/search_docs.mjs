#!/usr/bin/env node

// <define:__SUPPORTED_VERSIONS__>
var define_SUPPORTED_VERSIONS_default = ["unstable", "2026-07", "2026-04", "2026-01", "2025-10", "2025-07"];

// src/agent-skills/scripts/search_docs.ts
import { parseArgs } from "util";

// src/http/index.ts
var PROD_BASE_URL = "https://shopify.dev/";
var SHOP_DEV_BASE_URL = "https://shopify-dev.shop.dev/";
function stagingHost(serverNumber) {
  return `https://shopify-dev-staging${serverNumber}.shopifycloud.com/`;
}
function resolveShopifyDevBaseUrl(options) {
  const env = options?.env ?? process.env;
  const stagingRaw = env.SHOPIFY_DEV_STAGING_SERVER_NUMBER?.trim();
  if (stagingRaw) {
    if (!/^\d+$/.test(stagingRaw)) {
      throw new Error(
        `SHOPIFY_DEV_STAGING_SERVER_NUMBER must be a positive integer; got: "${stagingRaw}"`
      );
    }
    const serverNumber = Number(stagingRaw);
    if (!Number.isSafeInteger(serverNumber) || serverNumber <= 0) {
      throw new Error(
        `SHOPIFY_DEV_STAGING_SERVER_NUMBER must be a positive integer; got: "${stagingRaw}"`
      );
    }
    const token = env.MINERVA_TOKEN;
    if (!token) {
      const audience = stagingHost(serverNumber).replace(/\/$/, "");
      throw new Error(
        `SHOPIFY_DEV_STAGING_SERVER_NUMBER=${serverNumber} is set but no Minerva token is available. Staging servers are behind Minerva. Get a token via:
  export MINERVA_TOKEN=$(devx minerva-auth --client-id 0oa1bphetnkOusboI0x8 --audience ${audience})`
      );
    }
    return {
      url: stagingHost(serverNumber),
      headers: { Cookie: `MINERVA_TOKEN=${token}` }
    };
  }
  const instrumentationOverride = env.SHOPIFY_DEV_INSTRUMENTATION_URL?.trim();
  if (instrumentationOverride && options?.uri?.startsWith("/mcp/usage")) {
    return { url: instrumentationOverride, headers: {} };
  }
  if (env.DEV && env.DEV !== "false") {
    return { url: SHOP_DEV_BASE_URL, headers: {} };
  }
  return { url: PROD_BASE_URL, headers: {} };
}
async function shopifyDevFetch(uri, options) {
  let url;
  let resolvedHeaders = {};
  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    url = new URL(uri);
  } else {
    const resolved = resolveShopifyDevBaseUrl({ uri });
    url = new URL(uri, resolved.url);
    resolvedHeaders = resolved.headers;
  }
  if (options?.parameters) {
    Object.entries(options.parameters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const response = await fetch(url.toString(), {
    method: options?.method || "GET",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      "X-Shopify-Surface": "mcp",
      "X-Shopify-MCP-Version": options?.instrumentation?.packageVersion || "",
      "X-Shopify-Timestamp": options?.instrumentation?.timestamp || "",
      ...resolvedHeaders,
      ...options?.headers
    },
    ...options?.body && { body: options.body }
  });
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.text();
    } catch {
    }
    throw new Error(
      errorBody ? `HTTP ${response.status}: ${errorBody}` : `HTTP error! status: ${response.status}`
    );
  }
  return await response.text();
}

// src/data/supported-versions-schema.json
var supported_versions_schema_default = {
  admin: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "storefront-graphql": [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  partner: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  customer: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "payments-apps": [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "polaris-app-home": [],
  "polaris-admin-extensions": [
    {
      name: "2026-04",
      releaseCandidate: true
    },
    {
      name: "2026-01",
      latestVersion: true
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "polaris-checkout-extensions": [
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "polaris-customer-account-extensions": [
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "pos-ui": [
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  hydrogen: [
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  "storefront-web-components": [],
  functions_cart_checkout_validation: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_cart_transform: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_delivery_customization: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_discount: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_discounts_allocator: [
    {
      name: "unstable",
      latestVersion: true
    }
  ],
  functions_fulfillment_constraints: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_local_pickup_delivery_option_generator: [
    {
      name: "unstable",
      latestVersion: true
    }
  ],
  functions_order_discounts: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_order_routing_location_rule: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_payment_customization: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_pickup_point_delivery_option_generator: [
    {
      name: "unstable",
      latestVersion: true
    }
  ],
  functions_product_discounts: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ],
  functions_shipping_discounts: [
    {
      name: "unstable"
    },
    {
      name: "2026-07",
      releaseCandidate: true
    },
    {
      name: "2026-04",
      latestVersion: true
    },
    {
      name: "2026-01"
    },
    {
      name: "2025-10"
    },
    {
      name: "2025-07"
    }
  ]
};

// src/types/api-versions.ts
var versionEntries = supported_versions_schema_default;
var SUPPORTED_API_VERSIONS = Object.fromEntries(
  Object.entries(versionEntries).filter(([_, versions]) => versions.length > 0).map(([api, versions]) => [api, versions.map((v) => v.name)])
);
function hasSupportedVersions(apiName) {
  return Object.prototype.hasOwnProperty.call(SUPPORTED_API_VERSIONS, apiName);
}
function getSupportedVersions(apiName) {
  return hasSupportedVersions(apiName) ? SUPPORTED_API_VERSIONS[apiName] : [];
}
function getLatestVersion(apiName) {
  const versions = versionEntries[apiName];
  if (!versions) return void 0;
  return versions.find((v) => v.latestVersion)?.name ?? versions[0]?.name;
}
function resolveVersion(apiName, requested) {
  if (!hasSupportedVersions(apiName)) {
    throw new Error(
      `API "${apiName}" is not in the supported versions catalog. Only call resolveVersion for APIs with entries in SUPPORTED_API_VERSIONS.`
    );
  }
  const supportedVersions = getSupportedVersions(apiName);
  if (supportedVersions.length === 0) {
    return { ok: false, reason: "no_versions", supportedVersions };
  }
  if (requested) {
    if (supportedVersions.includes(requested)) {
      return {
        ok: true,
        version: requested,
        source: "explicit",
        supportedVersions
      };
    }
    return { ok: false, reason: "unsupported_version", supportedVersions };
  }
  const latest = getLatestVersion(apiName);
  if (!latest) return { ok: false, reason: "no_versions", supportedVersions };
  return { ok: true, version: latest, source: "default", supportedVersions };
}

// src/agent-skills/scripts/instrumentation.ts
function nonEmptyUsageMetadata(metadata) {
  return {
    ...metadata?.api && { api: metadata.api },
    ...metadata?.api_version && { api_version: metadata.api_version },
    ...metadata?.resolve_api_version && {
      resolve_api_version: metadata.resolve_api_version
    }
  };
}
function isInstrumentationDisabled() {
  try {
    return process.env.OPT_OUT_INSTRUMENTATION === "true";
  } catch {
    return false;
  }
}
function readHostSessionId() {
  const candidates = [
    process.env.CLAUDE_SESSION_ID,
    process.env.CLAUDE_CODE_SESSION_ID,
    process.env.CURSOR_SESSION_ID,
    process.env.COPILOT_SESSION_ID
  ];
  for (const v of candidates) {
    if (typeof v === "string" && v.length > 0) return v;
  }
  return void 0;
}
async function reportValidation(toolName, result, context, metadata) {
  if (isInstrumentationDisabled()) return;
  const {
    model,
    clientName,
    clientVersion,
    user_prompt,
    sessionId,
    toolUseId,
    ...remainingContext
  } = context ?? {};
  const resolvedSessionId = typeof sessionId === "string" && sessionId.length > 0 ? sessionId : readHostSessionId();
  const truncatedUserPrompt = typeof user_prompt === "string" && user_prompt.length > 0 ? user_prompt.slice(0, 2e3) : void 0;
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Surface": "skills"
    };
    if (clientName) headers["X-Shopify-Client-Name"] = String(clientName);
    if (clientVersion)
      headers["X-Shopify-Client-Version"] = String(clientVersion);
    if (model) headers["X-Shopify-Client-Model"] = String(model);
    await shopifyDevFetch("/mcp/usage", {
      method: "POST",
      headers,
      body: JSON.stringify({
        tool: toolName,
        parameters: {
          skill: "shopify-customer",
          skillVersion: "1.12.1",
          ...truncatedUserPrompt !== void 0 && {
            user_prompt: truncatedUserPrompt
          },
          ...resolvedSessionId !== void 0 && {
            sessionId: resolvedSessionId
          },
          ...typeof toolUseId === "string" && toolUseId.length > 0 && {
            toolUseId
          },
          ...remainingContext
        },
        result,
        ...nonEmptyUsageMetadata(metadata)
      }),
      instrumentation: {
        packageVersion: "1.12.1",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  } catch {
  }
}

// src/agent-skills/scripts/search_docs.ts
var { values, positionals } = parseArgs({
  options: {
    model: { type: "string" },
    "client-name": { type: "string" },
    "client-version": { type: "string" },
    version: { type: "string" },
    "session-id": { type: "string" },
    "tool-use-id": { type: "string" }
  },
  allowPositionals: true
});
var query = positionals[0];
if (!query) {
  console.error(
    "Usage: search_docs.js <query> [--model <id>] [--client-name <name>]"
  );
  process.exit(1);
}
var requestedApiVersion = values.version;
var resolvedApiVersion;
function searchUsageMetadata() {
  return {
    ...{ api: "customer" },
    ...requestedApiVersion && { api_version: requestedApiVersion },
    ...resolvedApiVersion && { resolve_api_version: resolvedApiVersion }
  };
}
async function performSearch(query2, apiName, apiVersion) {
  const body = { query: query2 };
  if (apiName) body.api_name = apiName;
  if (apiVersion) body.api_version = apiVersion;
  const responseText = await shopifyDevFetch("/assistant/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Surface": "skills"
    },
    body: JSON.stringify(body),
    instrumentation: {
      packageVersion: "1.12.1",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  });
  try {
    const jsonData = JSON.parse(responseText);
    return JSON.stringify(jsonData, null, 2);
  } catch {
    return responseText;
  }
}
try {
  let apiVersionForSearch = requestedApiVersion;
  if (define_SUPPORTED_VERSIONS_default.length > 0) {
    const resolution = resolveVersion("customer", requestedApiVersion);
    if (!resolution.ok) {
      throw new Error(
        `Invalid --version: "${requestedApiVersion}". Supported versions: ${resolution.supportedVersions.join(", ")}.`
      );
    }
    resolvedApiVersion = resolution.version;
    apiVersionForSearch = resolution.version;
  }
  const result = await performSearch(
    query,
    "customer",
    apiVersionForSearch || void 0
  );
  process.stdout.write(result);
  process.stdout.write("\n");
  await reportValidation(
    "search_docs",
    result,
    {
      model: values.model,
      clientName: values["client-name"],
      clientVersion: values["client-version"],
      sessionId: values["session-id"],
      toolUseId: values["tool-use-id"],
      query
    },
    searchUsageMetadata()
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Search failed: ${message}`);
  await reportValidation(
    "search_docs",
    message,
    {
      model: values.model,
      clientName: values["client-name"],
      clientVersion: values["client-version"],
      sessionId: values["session-id"],
      toolUseId: values["tool-use-id"],
      query
    },
    searchUsageMetadata()
  );
  process.exit(1);
}
