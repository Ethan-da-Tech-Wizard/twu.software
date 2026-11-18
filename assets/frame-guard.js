/*
 * Program: twu.software - frame-guard.js
 * Programmer: Ethan-da-Tech-Wizard (written with Claude, an AI assistant)
 * Last Modified: 2026-11-18
 * Purpose: Stops other websites from showing this site inside an iframe by sending the browser to the page's own address, or to a blank page if that is blocked.
 */

// Anti-Clickjacking Defense: Prevent embedding inside malicious third-party iframes
    // window.top is the outermost page; window.self is this page.
    // If they differ, this page is being shown inside a frame on someone else's page.
    if (window.top !== window.self) {
      try {
        // Reload the top-level window with this page's own address so it is no longer framed.
        window.top.location.replace(window.self.location.href);
      } catch (e) {
        // The browser refused (cross-origin rules), so blank out this frame instead.
        window.location.replace('about:blank');
      }
    }
