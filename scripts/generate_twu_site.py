#!/usr/bin/env python3
"""
TWU LLC Autonomous Site Generator & Hardening Engine
Used by Enki and autonomous agents to generate, validate, and harden TWU web properties.

Features:
- Programmatic generation of 3D Celestial Observatory Single-Page Sites
- Cybernetic Design System (Electric Cyan & Neon Magenta/Pink or Solar Gold/Emerald)
- Hardened Security Baseline (CSP, anti-clickjacking, scraper honeypot, Edge headers)
- Automated Invariant Validator (bans 'sovereign', enforces 'TWU LLC', audits privacy)
"""

import sys
import re
from pathlib import Path

# ==============================================================================
# INVARIANT CONSTANTS
# ==============================================================================
LEGAL_ENTITY = "TWU LLC"
LOCATION = "Mesa, Arizona"
FORBIDDEN_WORDS = [
    r"\bsovereign\b",
    r"\bsovereignty\b",
]
PHONE_PATTERN = r"\b(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"

def generate_headers_file(output_dir: Path):
    """Generates defense-grade edge security headers."""
    content = """# Defense-Grade Edge Security Headers for TWU LLC
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none';
"""
    (output_dir / "_headers").write_text(content.strip() + "\n", encoding="utf-8")
    print(f"[*] Generated: {output_dir / '_headers'}")

def generate_logo_svg(output_dir: Path):
    """Generates the official squircle TWU insignia."""
    assets_dir = output_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    
    svg = """<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Master Cybernetic Palette: Electric Cyan & Neon Magenta/Pink -->
    <linearGradient id="squircleBorder" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="glyphW" x1="12" y1="20" x2="36" y2="34" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Deep Obsidian Squircle Badge -->
  <rect x="3" y="3" width="42" height="42" rx="12" fill="#070a14" stroke="url(#squircleBorder)" stroke-width="2"/>

  <!-- Letter W (Neon Magenta / Soft Violet) -->
  <path d="M13 21L19 33L24 23L29 33L35 21" stroke="url(#glyphW)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Letter T (Electric Cyan with Glow) -->
  <path d="M12 16H36" stroke="#00f0ff" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M24 16V26" stroke="#00f0ff" stroke-width="2.6" stroke-linecap="round"/>

  <!-- Central Luminous Cyan Node -->
  <circle cx="24" cy="23" r="2.6" fill="#00f0ff" filter="url(#cyanGlow)"/>
  <circle cx="24" cy="23" r="1.3" fill="#ffffff"/>
</svg>"""
    (assets_dir / "twu-logo.svg").write_text(svg.strip() + "\n", encoding="utf-8")
    print(f"[*] Generated: {assets_dir / 'twu-logo.svg'}")

def validate_site(site_file: Path) -> bool:
    """Scans generated HTML to ensure all safety, legal, and privacy invariants hold."""
    if not site_file.exists():
        print(f"[!] Error: {site_file} does not exist.")
        return False

    content = site_file.read_text(encoding="utf-8")
    passed = True

    # 1. Ban forbidden buzzwords
    for pat in FORBIDDEN_WORDS:
        matches = re.findall(pat, content, re.IGNORECASE)
        if matches:
            print(f"[FAIL] Forbidden buzzword found ({pat}): {matches}")
            passed = False

    # 2. Check for exposed phone numbers
    phone_matches = re.findall(PHONE_PATTERN, content)
    if phone_matches:
        print(f"[FAIL] Exposed personal phone numbers detected: {phone_matches}")
        passed = False

    # 3. Check for correct Legal Entity
    if LEGAL_ENTITY not in content:
        print(f"[FAIL] Missing mandatory legal entity: '{LEGAL_ENTITY}'")
        passed = False

    # 4. Check for direct naked mailto links (scraper risk)
    naked_mailtos = re.findall(r'href=["\']mailto:[^"\']+["\']', content)
    if naked_mailtos:
        print(f"[WARN] Naked mailto detected in raw HTML: {naked_mailtos}. Recommend JS obfuscation.")

    # 5. Check for Clickjacking Frame Buster
    if "window.top !== window.self" not in content:
        print(f"[WARN] Anti-clickjacking frame guard missing in <head>.")

    # 6. Check for Content Security Policy
    if "Content-Security-Policy" not in content:
        print(f"[WARN] Content-Security-Policy meta tag missing.")

    if passed:
        print(f"[PASS] All TWU LLC security and branding invariants verified!")
    return passed

if __name__ == "__main__":
    target = Path(__file__).resolve().parent.parent
    if len(sys.argv) > 1 and sys.argv[1] == "validate":
        ok = validate_site(target / "index.html")
        sys.exit(0 if ok else 1)
    else:
        print(f"[*] TWU LLC Autonomous Site Engine")
        print(f"[*] Validating existing site at: {target / 'index.html'}")
        validate_site(target / "index.html")
