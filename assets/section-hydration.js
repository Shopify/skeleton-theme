import { buildSectionSelector, normalizeSectionId, sectionRenderer } from '@theme/section-renderer';
import { requestIdleCallback, onDocumentReady } from '@theme/utilities';

/**
 * Hydrates a section using the Section Rendering API preserving states.
 * Only updates elements with data-hydration-key attribute. This ensures that non-targeted nodes do not have their markup/state updated unnecessarily.
 *
 * @param {string} sectionId - The section ID to hydrate
 * @param {URL} [url] - The URL to render the section from
 */
async function hydrateSection(sectionId, url) {
  const normalizedId = normalizeSectionId(sectionId);
  const section = document.getElementById(buildSectionSelector(normalizedId));

  if (!section || section.dataset.hydrated === 'true') {
    return;
  }

  await sectionRenderer.renderSection(normalizedId, { cache: false, url, mode: 'hydration' });

  section.dataset.hydrated = 'true';
}

/**
 * Hydrates a section using the Section Rendering API preserving states, when
 * the DOM is ready.
 *
 * @param {string} sectionId - The section ID to hydrate
 * @param {URL} [url] - The URL to render the section from
 */
export async function hydrate(sectionId, url) {
  onDocumentReady(() => {
    requestIdleCallback(() => hydrateSection(sectionId, url));
  });
}
