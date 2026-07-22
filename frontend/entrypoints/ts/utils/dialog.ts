export const FOCUSABLE_SELECTOR
  = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function getDialogFocusables(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
  );
}

export function handleDialogKeyDown(event: KeyboardEvent, panel: HTMLElement, onEscape: () => void): void {
  if (event.key === 'Escape') {
    event.preventDefault();
    onEscape();
    return;
  }

  if (event.key !== 'Tab') return;

  const nodes = getDialogFocusables(panel);
  if (nodes.length === 0) return;

  const first = nodes[0];
  const last = nodes[nodes.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
