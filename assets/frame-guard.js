// ==============================================================================
// Program: frame-guard.js
// Programmer: Ethan-da-Tech-Wizard
// Last Modified: November 18, 2026
// Purpose: Defensive client-side anti-clickjacking and frame-busting protection script.
//          Prevents embedding of TWU portal inside unauthorized iframe contexts.
// ==============================================================================
// Anti-Clickjacking Defense: Prevent embedding inside malicious third-party iframes
    if (window.top !== window.self) {
      try {
        window.top.location.replace(window.self.location.href);
      } catch (e) {
        window.location.replace('about:blank');
      }
    }
