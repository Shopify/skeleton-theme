import { morph } from './morph';

export interface SectionReplaceTarget {
  key: string;
  current: HTMLElement;
  selector: string;
  required?: boolean;
}

export interface SectionReplaceResult {
  ok: boolean;
}

export function applySectionReplace(
  sectionHtml: string | null | undefined,
  rootSelector: string,
  targets: SectionReplaceTarget[],
): SectionReplaceResult {
  if (!sectionHtml) {
    return { ok: false };
  }

  const parsed = new DOMParser().parseFromString(sectionHtml, 'text/html');
  const nextRoot = parsed.querySelector<HTMLElement>(rootSelector);

  if (!nextRoot) {
    return { ok: false };
  }

  const nextNodes: Record<string, HTMLElement> = {};

  for (const target of targets) {
    const nextNode = nextRoot.querySelector<HTMLElement>(target.selector);
    if (!nextNode && target.required !== false) {
      return { ok: false };
    }

    if (nextNode) {
      nextNodes[target.key] = nextNode;
    }
  }

  for (const target of targets) {
    const nextNode = nextNodes[target.key];
    if (nextNode) {
      morph(target.current, nextNode);
    }
  }

  return { ok: true };
}

export function normalizeSectionsUrl(url: string): string {
  if (!url) return '/';
  return url.startsWith('/') ? url : `/${url}`;
}

export async function fetchSingleSectionHtml(
  sectionId: string,
  sectionsUrl: string,
  signal?: AbortSignal,
): Promise<string> {
  const normalizedUrl = normalizeSectionsUrl(sectionsUrl);
  const url = new URL(normalizedUrl, window.location.origin);
  url.searchParams.set('section_id', sectionId);

  const response = await fetch(url.pathname + url.search, {
    signal,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (!response.ok) {
    throw new Error('Section rendering request failed');
  }

  return response.text();
}

/** Parses `html` and returns the element matching `rootSelector`, or `null` if not found. */
export function parseSectionRoot(html: string, rootSelector: string): HTMLElement | null {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  return parsed.querySelector<HTMLElement>(rootSelector);
}
