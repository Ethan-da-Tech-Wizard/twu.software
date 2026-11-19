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
(function() {
  if (window.top !== window.self) {
    try {
      window.top.location.replace(window.self.location.href);
    } catch (e) {
      window.location.replace('about:blank');
    }
  }
})();
