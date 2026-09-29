/**
 * Minimal DOM morph: patches `current` in place to match `next`'s tag,
 * attributes and children instead of replacing the whole subtree, so nodes
 * untouched by the update (focus, scroll position, nested element state)
 * survive a section-rendering swap.
 */
export function morph(current: Element, next: Element): void {
  if (current.tagName !== next.tagName) {
    current.replaceWith(next);
    return;
  }

  syncAttributes(current, next);

  const currentChildren = Array.from(current.childNodes);
  const nextChildren = Array.from(next.childNodes);
  const length = Math.max(currentChildren.length, nextChildren.length);

  for (let i = 0; i < length; i += 1) {
    const currentChild = currentChildren[i];
    const nextChild = nextChildren[i];

    if (currentChild && !nextChild) {
      currentChild.remove();
      continue;
    }

    if (!currentChild && nextChild) {
      current.appendChild(nextChild);
      continue;
    }

    if (currentChild && nextChild) {
      morphNode(currentChild, nextChild);
    }
  }
}

function morphNode(current: ChildNode, next: ChildNode): void {
  if (current.nodeType !== next.nodeType) {
    current.replaceWith(next);
    return;
  }

  if (current instanceof Element && next instanceof Element) {
    morph(current, next);
    return;
  }

  if (current.nodeType === Node.TEXT_NODE && current.textContent !== next.textContent) {
    current.textContent = next.textContent;
  }
}

function syncAttributes(current: Element, next: Element): void {
  Array.from(current.attributes).forEach((attr) => {
    if (!next.hasAttribute(attr.name)) {
      current.removeAttribute(attr.name);
    }
  });

  Array.from(next.attributes).forEach((attr) => {
    if (current.getAttribute(attr.name) !== attr.value) {
      current.setAttribute(attr.name, attr.value);
    }
  });
}
