declare global {
  interface Window {
    Shopify: { routes: { root: string } };
  }
}

/** Structured error returned by the Shopify Cart API. */
export interface CartError {
  description: string;
}

export interface CartItem {
  key: string;
  quantity: number;
  url: string;
  image?: string | null;
  featured_image?: { url: string } | null;
  product_title?: string;
  title?: string;
  variant_title?: string | null;
  final_line_price?: number;
  line_price?: number;
}

export interface CartResponse {
  item_count: number;
  total_price: number;
  currency: string;
  items: CartItem[];
  sections?: Record<string, string | null>;
}

export interface CartChangeOptions {
  sections?: string[] | string;
  sectionsUrl?: string;
}

async function parseCartError(res: Response): Promise<Error> {
  const err = (await res.json().catch(() => ({}))) as Partial<CartError>;
  return new Error(err.description ?? 'Cart request failed');
}

function normalizeSectionsUrl(url: string): string {
  if (!url) return '/';
  return url.startsWith('/') ? url : `/${url}`;
}

export async function getCart(): Promise<CartResponse> {
  const res = await fetch(`${window.Shopify.routes.root}cart.js`, {
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!res.ok) {
    throw await parseCartError(res);
  }

  return (await res.json()) as CartResponse;
}

export async function changeCartLine(
  line: number,
  quantity: number,
  options: CartChangeOptions = {},
): Promise<CartResponse> {
  const payload: {
    line: number;
    quantity: number;
    sections?: string[] | string;
    sections_url?: string;
  } = { line, quantity };

  if (options.sections) {
    payload.sections = options.sections;
  }

  if (options.sectionsUrl) {
    payload.sections_url = normalizeSectionsUrl(options.sectionsUrl);
  }

  const res = await fetch(`${window.Shopify.routes.root}cart/change.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw await parseCartError(res);
  }

  return (await res.json()) as CartResponse;
}

/**
 * Adds a variant to the cart via the Shopify AJAX Cart API.
 *
 * @param variantId - The variant ID to add.
 * @param quantity  - The quantity to add (must be ≥ 1).
 * @throws {Error} If the request fails or the API returns an error response.
 */
export async function addToCart(variantId: number, quantity: number): Promise<void> {
  const res = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({ id: variantId, quantity }),
  });

  if (!res.ok) {
    throw await parseCartError(res);
  }
}
