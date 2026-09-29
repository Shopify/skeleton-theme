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

/**
 * Fetches the `predictive-search` section's rendered HTML via the Predictive
 * Search API + Section Rendering API (`predictive_search` is only populated
 * in Liquid when fetched this way — see `sections/predictive-search.liquid`).
 */
export async function fetchPredictiveSearchHtml(term: string, signal: AbortSignal): Promise<string> {
  const params = new URLSearchParams();
  params.set('q', term);
  params.set('resources[type]', 'product,page,article');
  params.set('resources[limit]', '6');
  params.set('resources[options][unavailable_products]', 'last');
  params.set('section_id', 'predictive-search');

  const url = `${window.Shopify.routes.root}search/suggest?${params.toString()}`;

  const response = await fetch(url, {
    signal,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    throw new Error('Predictive endpoint unavailable');
  }

  return response.text();
}
