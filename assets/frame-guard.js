// ==============================================================================
// Program: frame-guard.js
// Programmer: Ethan-da-Tech-Wizard
// Last Modified: November 18, 2026
// Purpose: Defensive client-side anti-clickjacking and frame-busting protection script.
//          Prevents embedding of TWU portal inside unauthorized iframe contexts.
//
// Security Architecture & Theoretical Principle:
//   Clickjacking (UI Redressing) occurs when a malicious parent page loads the target
//   application inside an invisible or disguised <iframe>, intercepting user clicks
//   or keystrokes to trigger unintended actions (e.g., unauthorized transactions).
//
//   Defense-in-Depth Mechanism:
//   1. Frame Ancestors Validation:
//      Compares `window.top` against `window.self`. If they differ, the document is
//      executing inside an embedded frame context rather than the top-level viewport.
//   2. Location Hijack & Self-Promotion:
//      Attempts `window.top.location.replace()` to navigate the parent window to
//      the authentic application URL.
//   3. Fail-Closed Neutralization:
//      If cross-origin SecurityError exceptions prevent rewriting top.location,
//      the script safely replaces `window.location` with `about:blank`, preventing
//      render of sensitive UI elements inside the hostile framing environment.
// ==============================================================================

// Wrapped in an IIFE so no globals are created. This file is loaded synchronously in <head> of index.html, before the page paints.
// Limits: it only protects visitors whose browser runs JavaScript; GitHub Pages cannot send the X-Frame-Options / CSP frame-ancestors headers that would be the stronger defence.
(function() {
  // When the page is the top-level document, window.top and window.self are the same object. If they differ, we are inside an iframe or frame.
  if (window.top !== window.self) {
    try {
      // Try to navigate the outer page to this page's own address, which breaks us out of the frame. replace() (not assign) keeps the framing page out of the back-button history.
      window.top.location.replace(window.self.location.href);

    // Browsers throw a SecurityError when a cross-origin parent forbids this (for example a sandboxed iframe). Fail closed: blank this frame so nothing is shown inside the hostile page.
    } catch (e) {
      window.location.replace('about:blank');
    }
  }
})();
