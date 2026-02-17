// src/events.ts
// @ts-nocheck

/**
 * @fileoverview
 * - Polyfill for the popover attribute, which is not supported in older Safari versions.
 *
 * @see https://popover.oddbird.net/
 */

var ToggleEvent = class extends Event {
  oldState;
  newState;
  constructor(type, { oldState = '', newState = '', ...init } = {}) {
    super(type, init);
    this.oldState = String(oldState || '');
    this.newState = String(newState || '');
  }
};
var popoverToggleTaskQueue = /* @__PURE__ */ new WeakMap();
function queuePopoverToggleEventTask(element, oldState, newState) {
  popoverToggleTaskQueue.set(
    element,
    setTimeout(() => {
      if (!popoverToggleTaskQueue.has(element)) return;
      element.dispatchEvent(
        new ToggleEvent('toggle', {
          cancelable: false,
          oldState,
          newState,
        })
      );
    }, 0)
  );
}

// src/popover-helpers.ts
var ShadowRoot = globalThis.ShadowRoot || function () {};
var HTMLDialogElement = globalThis.HTMLDialogElement || function () {};
var topLayerElements = /* @__PURE__ */ new WeakMap();
var autoPopoverList = /* @__PURE__ */ new WeakMap();
var hintPopoverList = /* @__PURE__ */ new WeakMap();
var visibilityState = /* @__PURE__ */ new WeakMap();
function getPopoverVisibilityState(popover) {
  return visibilityState.get(popover) || 'hidden';
}
var popoverInvoker = /* @__PURE__ */ new WeakMap();
function lastSetElement(set) {
  return [...set].pop();
}
function popoverTargetAttributeActivationBehavior(element) {
  const popover = element.popoverTargetElement;
  if (!(popover instanceof HTMLElement)) {
    return;
  }
  const visibility = getPopoverVisibilityState(popover);
  if (element.popoverTargetAction === 'show' && visibility === 'showing') {
    return;
  }
  if (element.popoverTargetAction === 'hide' && visibility === 'hidden') return;
  if (visibility === 'showing') {
    hidePopover(popover, true, true);
  } else if (checkPopoverValidity(popover, false)) {
    popoverInvoker.set(popover, element);
    showPopover(popover);
  }
}
function checkPopoverValidity(element, expectedToBeShowing) {
  if (element.popover !== 'auto' && element.popover !== 'manual' && element.popover !== 'hint') {
    return false;
  }
  if (!element.isConnected) return false;
  if (expectedToBeShowing && getPopoverVisibilityState(element) !== 'showing') {
    return false;
  }
  if (!expectedToBeShowing && getPopoverVisibilityState(element) !== 'hidden') {
    return false;
  }
  if (element instanceof HTMLDialogElement && element.hasAttribute('open')) {
    return false;
  }
  if (document.fullscreenElement === element) return false;
  return true;
}
function getStackPosition(popover) {
  if (!popover) return 0;
  const autoPopovers = autoPopoverList.get(document) || /* @__PURE__ */ new Set();
  const hintPopovers = hintPopoverList.get(document) || /* @__PURE__ */ new Set();
  if (hintPopovers.has(popover)) {
    return [...hintPopovers].indexOf(popover) + autoPopovers.size + 1;
  }
  if (autoPopovers.has(popover)) {
    return [...autoPopovers].indexOf(popover) + 1;
  }
  return 0;
}
function topMostClickedPopover(target) {
  const clickedPopover = nearestInclusiveOpenPopover(target);
  const invokerPopover = nearestInclusiveTargetPopoverForInvoker(target);
  if (getStackPosition(clickedPopover) > getStackPosition(invokerPopover)) {
    return clickedPopover;
  }
  return invokerPopover;
}
function topmostAutoOrHintPopover(document2) {
  let topmostPopover;
  const hintPopovers = hintPopoverList.get(document2) || /* @__PURE__ */ new Set();
  const autoPopovers = autoPopoverList.get(document2) || /* @__PURE__ */ new Set();
  const usedStack = hintPopovers.size > 0 ? hintPopovers : autoPopovers.size > 0 ? autoPopovers : null;
  if (usedStack) {
    topmostPopover = lastSetElement(usedStack);
    if (!topmostPopover.isConnected) {
      usedStack.delete(topmostPopover);
      return topmostAutoOrHintPopover(document2);
    }
    return topmostPopover;
  }
  return null;
}
function topMostPopoverInList(list) {
  for (const popover of list || []) {
    if (!popover.isConnected) {
      list.delete(popover);
    } else {
      return popover;
    }
  }
  return null;
}
function getRootNode(node) {
  if (typeof node.getRootNode === 'function') {
    return node.getRootNode();
  }
  if (node.parentNode) return getRootNode(node.parentNode);
  return node;
}
function nearestInclusiveOpenPopover(node) {
  while (node) {
    if (node instanceof HTMLElement && node.popover === 'auto' && visibilityState.get(node) === 'showing') {
      return node;
    }
    node = (node instanceof Element && node.assignedSlot) || node.parentElement || getRootNode(node);
    if (node instanceof ShadowRoot) node = node.host;
    if (node instanceof Document) return;
  }
}
function nearestInclusiveTargetPopoverForInvoker(node) {
  while (node) {
    const nodePopover = node.popoverTargetElement;
    if (nodePopover instanceof HTMLElement) return nodePopover;
    node = node.parentElement || getRootNode(node);
    if (node instanceof ShadowRoot) node = node.host;
    if (node instanceof Document) return;
  }
}
function topMostPopoverAncestor(newPopover, list) {
  const popoverPositions = /* @__PURE__ */ new Map();
  let i = 0;
  for (const popover of list || []) {
    popoverPositions.set(popover, i);
    i += 1;
  }
  popoverPositions.set(newPopover, i);
  i += 1;
  let topMostPopoverAncestor2 = null;
  function checkAncestor(candidate) {
    if (!candidate) return;
    let okNesting = false;
    let candidateAncestor = null;
    let candidatePosition = null;
    while (!okNesting) {
      candidateAncestor = nearestInclusiveOpenPopover(candidate) || null;
      if (candidateAncestor === null) return;
      if (!popoverPositions.has(candidateAncestor)) return;
      if (newPopover.popover === 'hint' || candidateAncestor.popover === 'auto') {
        okNesting = true;
      }
      if (!okNesting) {
        candidate = candidateAncestor.parentElement;
      }
    }
    candidatePosition = popoverPositions.get(candidateAncestor);
    if (topMostPopoverAncestor2 === null || popoverPositions.get(topMostPopoverAncestor2) < candidatePosition) {
      topMostPopoverAncestor2 = candidateAncestor;
    }
  }
  checkAncestor(newPopover.parentElement || getRootNode(newPopover));
  return topMostPopoverAncestor2;
}
function isFocusable(focusTarget) {
  if (focusTarget.hidden || focusTarget instanceof ShadowRoot) return false;
  if (
    focusTarget instanceof HTMLButtonElement ||
    focusTarget instanceof HTMLInputElement ||
    focusTarget instanceof HTMLSelectElement ||
    focusTarget instanceof HTMLTextAreaElement ||
    focusTarget instanceof HTMLOptGroupElement ||
    focusTarget instanceof HTMLOptionElement ||
    focusTarget instanceof HTMLFieldSetElement
  ) {
    if (focusTarget.disabled) return false;
  }
  if (focusTarget instanceof HTMLInputElement && focusTarget.type === 'hidden') {
    return false;
  }
  if (focusTarget instanceof HTMLAnchorElement && focusTarget.href === '') {
    return false;
  }
  return typeof focusTarget.tabIndex === 'number' && focusTarget.tabIndex !== -1;
}
function focusDelegate(focusTarget) {
  if (focusTarget.shadowRoot && focusTarget.shadowRoot.delegatesFocus !== true) {
    return null;
  }
  let whereToLook = focusTarget;
  if (whereToLook.shadowRoot) {
    whereToLook = whereToLook.shadowRoot;
  }
  let autoFocusDelegate = whereToLook.querySelector('[autofocus]');
  if (autoFocusDelegate) {
    return autoFocusDelegate;
  } else {
    const slots = whereToLook.querySelectorAll('slot');
    for (const slot of slots) {
      const assignedElements = slot.assignedElements({ flatten: true });
      for (const el of assignedElements) {
        if (el.hasAttribute('autofocus')) {
          return el;
        } else {
          autoFocusDelegate = el.querySelector('[autofocus]');
          if (autoFocusDelegate) {
            return autoFocusDelegate;
          }
        }
      }
    }
  }
  const walker = focusTarget.ownerDocument.createTreeWalker(whereToLook, NodeFilter.SHOW_ELEMENT);
  let descendant = walker.currentNode;
  while (descendant) {
    if (isFocusable(descendant)) {
      return descendant;
    }
    descendant = walker.nextNode();
  }
}
function popoverFocusingSteps(subject) {
  var _a;
  (_a = focusDelegate(subject)) == null ? void 0 : _a.focus();
}
var previouslyFocusedElements = /* @__PURE__ */ new WeakMap();
function showPopover(element) {
  if (!checkPopoverValidity(element, false)) {
    return;
  }
  const document2 = element.ownerDocument;
  if (
    !element.dispatchEvent(
      new ToggleEvent('beforetoggle', {
        cancelable: true,
        oldState: 'closed',
        newState: 'open',
      })
    )
  ) {
    return;
  }
  if (!checkPopoverValidity(element, false)) {
    return;
  }
  let shouldRestoreFocus = false;
  const originalType = element.popover;
  let stackToAppendTo = null;
  const autoAncestor = topMostPopoverAncestor(element, autoPopoverList.get(document2) || /* @__PURE__ */ new Set());
  const hintAncestor = topMostPopoverAncestor(element, hintPopoverList.get(document2) || /* @__PURE__ */ new Set());
  if (originalType === 'auto') {
    closeAllOpenPopoversInList(hintPopoverList.get(document2) || /* @__PURE__ */ new Set(), shouldRestoreFocus, true);
    const ancestor = autoAncestor || document2;
    hideAllPopoversUntil(ancestor, shouldRestoreFocus, true);
    stackToAppendTo = 'auto';
  }
  if (originalType === 'hint') {
    if (hintAncestor) {
      hideAllPopoversUntil(hintAncestor, shouldRestoreFocus, true);
      stackToAppendTo = 'hint';
    } else {
      closeAllOpenPopoversInList(hintPopoverList.get(document2) || /* @__PURE__ */ new Set(), shouldRestoreFocus, true);
      if (autoAncestor) {
        hideAllPopoversUntil(autoAncestor, shouldRestoreFocus, true);
        stackToAppendTo = 'auto';
      } else {
        stackToAppendTo = 'hint';
      }
    }
  }
  if (originalType === 'auto' || originalType === 'hint') {
    if (originalType !== element.popover || !checkPopoverValidity(element, false)) {
      return;
    }
    if (!topmostAutoOrHintPopover(document2)) {
      shouldRestoreFocus = true;
    }
    if (stackToAppendTo === 'auto') {
      if (!autoPopoverList.has(document2)) {
        autoPopoverList.set(document2, /* @__PURE__ */ new Set());
      }
      autoPopoverList.get(document2).add(element);
    } else if (stackToAppendTo === 'hint') {
      if (!hintPopoverList.has(document2)) {
        hintPopoverList.set(document2, /* @__PURE__ */ new Set());
      }
      hintPopoverList.get(document2).add(element);
    }
  }
  previouslyFocusedElements.delete(element);
  const originallyFocusedElement = document2.activeElement;
  element.classList.add(':popover-open');
  visibilityState.set(element, 'showing');
  if (!topLayerElements.has(document2)) {
    topLayerElements.set(document2, /* @__PURE__ */ new Set());
  }
  topLayerElements.get(document2).add(element);
  setInvokerAriaExpanded(popoverInvoker.get(element), true);
  popoverFocusingSteps(element);
  if (shouldRestoreFocus && originallyFocusedElement && element.popover === 'auto') {
    previouslyFocusedElements.set(element, originallyFocusedElement);
  }
  queuePopoverToggleEventTask(element, 'closed', 'open');
}
function hidePopover(element, focusPreviousElement = false, fireEvents = false) {
  var _a, _b;
  if (!checkPopoverValidity(element, true)) {
    return;
  }
  const document2 = element.ownerDocument;
  if (['auto', 'hint'].includes(element.popover)) {
    hideAllPopoversUntil(element, focusPreviousElement, fireEvents);
    if (!checkPopoverValidity(element, true)) {
      return;
    }
  }
  const autoList = autoPopoverList.get(document2) || /* @__PURE__ */ new Set();
  const autoPopoverListContainsElement = autoList.has(element) && lastSetElement(autoList) === element;
  setInvokerAriaExpanded(popoverInvoker.get(element), false);
  popoverInvoker.delete(element);
  if (fireEvents) {
    element.dispatchEvent(
      new ToggleEvent('beforetoggle', {
        oldState: 'open',
        newState: 'closed',
      })
    );
    if (autoPopoverListContainsElement && lastSetElement(autoList) !== element) {
      hideAllPopoversUntil(element, focusPreviousElement, fireEvents);
    }
    if (!checkPopoverValidity(element, true)) {
      return;
    }
  }
  (_a = topLayerElements.get(document2)) == null ? void 0 : _a.delete(element);
  autoList.delete(element);
  (_b = hintPopoverList.get(document2)) == null ? void 0 : _b.delete(element);
  element.classList.remove(':popover-open');
  visibilityState.set(element, 'hidden');
  if (fireEvents) {
    queuePopoverToggleEventTask(element, 'open', 'closed');
  }
  const previouslyFocusedElement = previouslyFocusedElements.get(element);
  if (previouslyFocusedElement) {
    previouslyFocusedElements.delete(element);
    if (focusPreviousElement) {
      previouslyFocusedElement.focus();
    }
  }
}
function closeAllOpenPopovers(document2, focusPreviousElement = false, fireEvents = false) {
  let popover = topmostAutoOrHintPopover(document2);
  while (popover) {
    hidePopover(popover, focusPreviousElement, fireEvents);
    popover = topmostAutoOrHintPopover(document2);
  }
}
function closeAllOpenPopoversInList(list, focusPreviousElement = false, fireEvents = false) {
  let popover = topMostPopoverInList(list);
  while (popover) {
    hidePopover(popover, focusPreviousElement, fireEvents);
    popover = topMostPopoverInList(list);
  }
}
function hidePopoverStackUntil(endpoint, set, focusPreviousElement, fireEvents) {
  let repeatingHide = false;
  let hasRunOnce = false;
  while (repeatingHide || !hasRunOnce) {
    hasRunOnce = true;
    let lastToHide = null;
    let foundEndpoint = false;
    for (const popover of set) {
      if (popover === endpoint) {
        foundEndpoint = true;
      } else if (foundEndpoint) {
        lastToHide = popover;
        break;
      }
    }
    if (!lastToHide) return;
    while (getPopoverVisibilityState(lastToHide) === 'showing' && set.size) {
      hidePopover(lastSetElement(set), focusPreviousElement, fireEvents);
    }
    if (set.has(endpoint) && lastSetElement(set) !== endpoint) {
      repeatingHide = true;
    }
    if (repeatingHide) {
      fireEvents = false;
    }
  }
}
function hideAllPopoversUntil(endpoint, focusPreviousElement, fireEvents) {
  var _a, _b;
  const document2 = endpoint.ownerDocument || endpoint;
  if (endpoint instanceof Document) {
    return closeAllOpenPopovers(document2, focusPreviousElement, fireEvents);
  }
  if ((_a = hintPopoverList.get(document2)) == null ? void 0 : _a.has(endpoint)) {
    hidePopoverStackUntil(endpoint, hintPopoverList.get(document2), focusPreviousElement, fireEvents);
    return;
  }
  closeAllOpenPopoversInList(
    hintPopoverList.get(document2) || /* @__PURE__ */ new Set(),
    focusPreviousElement,
    fireEvents
  );
  if (!((_b = autoPopoverList.get(document2)) == null ? void 0 : _b.has(endpoint))) {
    return;
  }
  hidePopoverStackUntil(endpoint, autoPopoverList.get(document2), focusPreviousElement, fireEvents);
}
var popoverPointerDownTargets = /* @__PURE__ */ new WeakMap();
function lightDismissOpenPopovers(event) {
  if (!event.isTrusted) return;
  const target = event.composedPath()[0];
  if (!target) return;
  const document2 = target.ownerDocument;
  const topMostPopover = topmostAutoOrHintPopover(document2);
  if (!topMostPopover) return;
  const ancestor = topMostClickedPopover(target);
  if (ancestor && event.type === 'pointerdown') {
    popoverPointerDownTargets.set(document2, ancestor);
  } else if (event.type === 'pointerup') {
    const sameTarget = popoverPointerDownTargets.get(document2) === ancestor;
    popoverPointerDownTargets.delete(document2);
    if (sameTarget) {
      hideAllPopoversUntil(ancestor || document2, false, true);
    }
  }
}
var initialAriaExpandedValue = /* @__PURE__ */ new WeakMap();
function setInvokerAriaExpanded(el, force = false) {
  if (!el) return;
  if (!initialAriaExpandedValue.has(el)) {
    initialAriaExpandedValue.set(el, el.getAttribute('aria-expanded'));
  }
  const popover = el.popoverTargetElement;
  if (popover instanceof HTMLElement && popover.popover === 'auto') {
    el.setAttribute('aria-expanded', String(force));
  } else {
    const initialValue = initialAriaExpandedValue.get(el);
    if (!initialValue) {
      el.removeAttribute('aria-expanded');
    } else {
      el.setAttribute('aria-expanded', initialValue);
    }
  }
}

// src/popover.ts
var ShadowRoot2 = globalThis.ShadowRoot || function () {};
function isSupported() {
  return (
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype
  );
}
function patchSelectorFn(object, name, mapper) {
  const original = object[name];
  Object.defineProperty(object, name, {
    value(selector) {
      return original.call(this, mapper(selector));
    },
  });
}
var nonEscapedPopoverSelector = /(^|[^\\]):popover-open\b/g;
function hasLayerSupport() {
  return typeof globalThis.CSSLayerBlockRule === 'function';
}
function getStyles() {
  const useLayer = hasLayerSupport();
  return `
${useLayer ? '@layer popover-polyfill {' : ''}
  :where([popover]) {
    position: fixed;
    z-index: 2147483647;
    inset: 0;
    padding: 0.25em;
    width: fit-content;
    height: fit-content;
    border-width: initial;
    border-color: initial;
    border-image: initial;
    border-style: solid;
    background-color: canvas;
    color: canvastext;
    overflow: auto;
    margin: auto;
  }

  :where([popover]:not(.\\:popover-open)) {
    display: none;
  }

  :where(dialog[popover].\\:popover-open) {
    display: block;
  }

  :where(dialog[popover][open]) {
    display: revert;
  }

  :where([anchor].\\:popover-open) {
    inset: auto;
  }

  :where([anchor]:popover-open) {
    inset: auto;
  }

  @supports not (background-color: canvas) {
    :where([popover]) {
      background-color: white;
      color: black;
    }
  }

  @supports (width: -moz-fit-content) {
    :where([popover]) {
      width: -moz-fit-content;
      height: -moz-fit-content;
    }
  }

  @supports not (inset: 0) {
    :where([popover]) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
${useLayer ? '}' : ''}
`;
}
var popoverStyleSheet = null;
function injectStyles(root) {
  const styles = getStyles();
  if (popoverStyleSheet === null) {
    try {
      popoverStyleSheet = new CSSStyleSheet();
      popoverStyleSheet.replaceSync(styles);
    } catch {
      popoverStyleSheet = false;
    }
  }
  if (popoverStyleSheet === false) {
    const sheet = document.createElement('style');
    sheet.textContent = styles;
    if (root instanceof Document) {
      root.head.prepend(sheet);
    } else {
      root.prepend(sheet);
    }
  } else {
    root.adoptedStyleSheets = [popoverStyleSheet, ...root.adoptedStyleSheets];
  }
}
function apply() {
  if (typeof window === 'undefined') return;
  window.ToggleEvent = window.ToggleEvent || ToggleEvent;
  function rewriteSelector(selector) {
    if (selector == null ? void 0 : selector.includes(':popover-open')) {
      selector = selector.replace(nonEscapedPopoverSelector, '$1.\\:popover-open');
    }
    return selector;
  }
  patchSelectorFn(Document.prototype, 'querySelector', rewriteSelector);
  patchSelectorFn(Document.prototype, 'querySelectorAll', rewriteSelector);
  patchSelectorFn(Element.prototype, 'querySelector', rewriteSelector);
  patchSelectorFn(Element.prototype, 'querySelectorAll', rewriteSelector);
  patchSelectorFn(Element.prototype, 'matches', rewriteSelector);
  patchSelectorFn(Element.prototype, 'closest', rewriteSelector);
  patchSelectorFn(DocumentFragment.prototype, 'querySelectorAll', rewriteSelector);
  Object.defineProperties(HTMLElement.prototype, {
    popover: {
      enumerable: true,
      configurable: true,
      get() {
        if (!this.hasAttribute('popover')) return null;
        const value = (this.getAttribute('popover') || '').toLowerCase();
        if (value === '' || value == 'auto') return 'auto';
        if (value == 'hint') return 'hint';
        return 'manual';
      },
      set(value) {
        if (value === null) {
          this.removeAttribute('popover');
        } else {
          this.setAttribute('popover', value);
        }
      },
    },
    showPopover: {
      enumerable: true,
      configurable: true,
      value(options = {}) {
        showPopover(this);
      },
    },
    hidePopover: {
      enumerable: true,
      configurable: true,
      value() {
        hidePopover(this, true, true);
      },
    },
    togglePopover: {
      enumerable: true,
      configurable: true,
      value(options = {}) {
        if (typeof options === 'boolean') {
          options = { force: options };
        }
        if ((visibilityState.get(this) === 'showing' && options.force === void 0) || options.force === false) {
          hidePopover(this, true, true);
        } else if (options.force === void 0 || options.force === true) {
          showPopover(this);
        }
        return visibilityState.get(this) === 'showing';
      },
    },
  });
  const originalAttachShadow = Element.prototype.attachShadow;
  if (originalAttachShadow) {
    Object.defineProperties(Element.prototype, {
      attachShadow: {
        enumerable: true,
        configurable: true,
        writable: true,
        value(options) {
          const shadowRoot = originalAttachShadow.call(this, options);
          injectStyles(shadowRoot);
          return shadowRoot;
        },
      },
    });
  }
  const originalAttachInternals = HTMLElement.prototype.attachInternals;
  if (originalAttachInternals) {
    Object.defineProperties(HTMLElement.prototype, {
      attachInternals: {
        enumerable: true,
        configurable: true,
        writable: true,
        value() {
          const internals = originalAttachInternals.call(this);
          if (internals.shadowRoot) {
            injectStyles(internals.shadowRoot);
          }
          return internals;
        },
      },
    });
  }
  const popoverTargetAssociatedElements = /* @__PURE__ */ new WeakMap();
  function applyPopoverInvokerElementMixin(ElementClass) {
    Object.defineProperties(ElementClass.prototype, {
      popoverTargetElement: {
        enumerable: true,
        configurable: true,
        set(targetElement) {
          if (targetElement === null) {
            this.removeAttribute('popovertarget');
            popoverTargetAssociatedElements.delete(this);
          } else if (!(targetElement instanceof Element)) {
            throw new TypeError(`popoverTargetElement must be an element or null`);
          } else {
            this.setAttribute('popovertarget', '');
            popoverTargetAssociatedElements.set(this, targetElement);
          }
        },
        get() {
          if (this.localName !== 'button' && this.localName !== 'input') {
            return null;
          }
          if (this.localName === 'input' && this.type !== 'reset' && this.type !== 'image' && this.type !== 'button') {
            return null;
          }
          if (this.disabled) {
            return null;
          }
          if (this.form && this.type === 'submit') {
            return null;
          }
          const targetElement = popoverTargetAssociatedElements.get(this);
          if (targetElement && targetElement.isConnected) {
            return targetElement;
          } else if (targetElement && !targetElement.isConnected) {
            popoverTargetAssociatedElements.delete(this);
            return null;
          }
          const root = getRootNode(this);
          const idref = this.getAttribute('popovertarget');
          if ((root instanceof Document || root instanceof ShadowRoot2) && idref) {
            return root.getElementById(idref) || null;
          }
          return null;
        },
      },
      popoverTargetAction: {
        enumerable: true,
        configurable: true,
        get() {
          const value = (this.getAttribute('popovertargetaction') || '').toLowerCase();
          if (value === 'show' || value === 'hide') return value;
          return 'toggle';
        },
        set(value) {
          this.setAttribute('popovertargetaction', value);
        },
      },
    });
  }
  applyPopoverInvokerElementMixin(HTMLButtonElement);
  applyPopoverInvokerElementMixin(HTMLInputElement);
  const handleInvokerActivation = (event) => {
    if (event.defaultPrevented) {
      return;
    }
    const composedPath = event.composedPath();
    const target = composedPath[0];
    if (!(target instanceof Element) || (target == null ? void 0 : target.shadowRoot)) {
      return;
    }
    const root = getRootNode(target);
    if (!(root instanceof ShadowRoot2 || root instanceof Document)) {
      return;
    }
    const invoker = composedPath.find((el) => {
      var _a;
      return (_a = el.matches) == null ? void 0 : _a.call(el, '[popovertargetaction],[popovertarget]');
    });
    if (invoker) {
      popoverTargetAttributeActivationBehavior(invoker);
      event.preventDefault();
      return;
    }
  };
  const onKeydown = (event) => {
    const key = event.key;
    const target = event.target;
    if (!event.defaultPrevented && target && (key === 'Escape' || key === 'Esc')) {
      hideAllPopoversUntil(target.ownerDocument, true, true);
    }
  };
  const addEventListeners = (root) => {
    root.addEventListener('click', handleInvokerActivation);
    root.addEventListener('keydown', onKeydown);
    root.addEventListener('pointerdown', lightDismissOpenPopovers);
    root.addEventListener('pointerup', lightDismissOpenPopovers);
  };
  addEventListeners(document);
  injectStyles(document);
}

// src/index.ts
if (!isSupported()) apply();
//# sourceMappingURL=popover.js.map
