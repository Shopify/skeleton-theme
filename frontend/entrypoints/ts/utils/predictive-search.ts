declare global {
  interface Window {
    Shopify: { routes: { root: string } };
  }
}

export interface PredictiveItem {
  title: string;
  url: string;
  price?: string;
  image?: { url: string; alt?: string | null } | null;
}

export interface PredictivePayload {
  resources?: {
    results?: {
      products?: PredictiveItem[];
      articles?: PredictiveItem[];
      pages?: PredictiveItem[];
    };
  };
}

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay = 250,
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export async function fetchPredictiveResults(
  term: string,
  signal: AbortSignal,
): Promise<PredictivePayload> {
  const params = new URLSearchParams();
  params.set('q', term);
  params.set('resources[type]', 'product,page,article');
  params.set('resources[limit]', '6');
  params.set('resources[options][unavailable_products]', 'last');

  const url = `${window.Shopify.routes.root}search/suggest.json?${params.toString()}`;

  const response = await fetch(url, {
    signal,
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    throw new Error('Predictive endpoint unavailable');
  }

  return (await response.json()) as PredictivePayload;
}

export function createPredictiveResultLink(item: PredictiveItem): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = item.url;
  link.className = 'flex items-center gap-3 rounded border px-2 py-2 hover:bg-gray-50';

  if (item.image?.url) {
    const image = document.createElement('img');
    image.src = item.image.url;
    image.alt = item.image.alt ?? item.title;
    image.className = 'h-10 w-10 object-cover';
    link.appendChild(image);
  }

  const title = document.createElement('span');
  title.className = 'text-sm';
  title.textContent = item.title;
  link.appendChild(title);

  return link;
}

export function createPredictiveResultItem(item: PredictiveItem): HTMLLIElement {
  const listItem = document.createElement('li');
  listItem.appendChild(createPredictiveResultLink(item));
  return listItem;
}
