/*
 * Refreshes the liquid-tips partial with a fresh server-rendered tip.
 * Temporary import path until SFR ships the partial runtime.
 */
import { partials } from "@shopify/partial-rendering";

const control = document.querySelector("[data-refresh-tip]");
const card = control?.closest(".highlight");

/*
 * Briefly flashes the tip so the swapped-in content is noticeable.
 * Partial rendering replaces the tip node during the refresh, so the
 * fresh element must be re-queried once the swap resolves rather than
 * captured beforehand — a reference taken earlier points at the stale,
 * detached node.
 */
function flashTip() {
  const tip = card?.querySelector(".highlight-description");
  if (!tip) {
    return;
  }

  tip.classList.add("highlight-description--flash");
  tip.addEventListener(
    "animationend",
    () => tip.classList.remove("highlight-description--flash"),
    { once: true },
  );
}

async function refresh() {
  control.setAttribute("aria-disabled", "true");

  try {
    await partials.refresh("liquid-tip");
    flashTip();
  } finally {
    control.removeAttribute("aria-disabled");
  }
}

control?.addEventListener("click", refresh);
