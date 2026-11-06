// Anti-Clickjacking Defense: Prevent embedding inside malicious third-party iframes
    if (window.top !== window.self) {
      try {
        window.top.location.replace(window.self.location.href);
      } catch (e) {
        window.location.replace('about:blank');
      }
    }
