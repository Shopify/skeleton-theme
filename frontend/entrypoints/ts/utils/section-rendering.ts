export interface SectionReplaceTarget {
  key: string;
  current: HTMLElement;
  selector: string;
  required?: boolean;
}

export interface SectionReplaceResult {
  ok: boolean;
  nodes: Record<string, HTMLElement>;
}

export function applySectionReplace(
  sectionHtml: string | null | undefined,
  rootSelector: string,
  targets: SectionReplaceTarget[],
): SectionReplaceResult {
  if (!sectionHtml) {
    return { ok: false, nodes: {} };
  }

  const parsed = new DOMParser().parseFromString(sectionHtml, 'text/html');
  const nextRoot = parsed.querySelector<HTMLElement>(rootSelector);

  if (!nextRoot) {
    return { ok: false, nodes: {} };
  }

  const nextNodes: Record<string, HTMLElement> = {};

  for (const target of targets) {
    const nextNode = nextRoot.querySelector<HTMLElement>(target.selector);
    if (!nextNode && target.required !== false) {
      return { ok: false, nodes: {} };
    }

    if (nextNode) {
      nextNodes[target.key] = nextNode;
    }
  }

  for (const target of targets) {
    const nextNode = nextNodes[target.key];
    if (nextNode) {
      target.current.replaceWith(nextNode);
    }
  }

  return { ok: true, nodes: nextNodes };
}

export function normalizeSectionsUrl(url: string): string {
  if (!url) return '/';
  return url.startsWith('/') ? url : `/${url}`;
}

export async function fetchSingleSectionHtml(sectionId: string, sectionsUrl: string): Promise<string> {
  const normalizedUrl = normalizeSectionsUrl(sectionsUrl);
  const url = new URL(normalizedUrl, window.location.origin);
  url.searchParams.set('section_id', sectionId);

  const response = await fetch(url.pathname + url.search, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    throw new Error('Section rendering request failed');
  }

  return response.text();
}
