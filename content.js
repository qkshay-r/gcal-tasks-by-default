(function () {
  "use strict";

  const HIDE = "gcal-task-hide";

  const style = document.createElement("style");
  style.textContent = `.${HIDE} { opacity: 0 !important; }`;
  document.head.appendChild(style);

  function switchAndReveal(dialog) {
    const tabs = dialog.querySelectorAll('[role="tab"]');
    for (const tab of tabs) {
      const label = tab.getAttribute("aria-label") || tab.textContent.trim();
      if (/^task$/i.test(label)) {
        if (tab.getAttribute("aria-selected") !== "true") tab.click();
        break;
      }
    }
    dialog.classList.remove(HIDE);
  }

  new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const hasTabs = node.querySelector('[role="tab"]'); // optional chaining unnecessary here
        if (!hasTabs) continue;

        node.classList.add(HIDE);
        requestAnimationFrame(() => switchAndReveal(node));
      }
    }
  }).observe(document.body, { childList: true, subtree: true });

})();