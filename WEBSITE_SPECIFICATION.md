# TWU LLC — Master Web Architecture & Engineering Specification

> **Official Baseline for `twu.software`**  
> **Entity**: TWU LLC · Mesa, Arizona  
> **Status**: Production Locked  
> **Last Updated**: October 2026

---

## 1. Executive Summary & Core Philosophy

The TWU LLC web presence is engineered as a zero-dependency, ultra-lightweight, single-page application demonstrating the studio's technical invariants:
- **Private, Offline-First Architecture**: No reliance on external JavaScript CDNs, heavy npm frameworks, or trackers.
- **Mathematical Elegance**: Custom 3D spherical trigonometry projection running directly on HTML5 Canvas.
- **Hardened Perimeter**: Multi-layer security headers, strict Content Security Policy, scraper-proof email obfuscation, and anti-clickjacking frame-busting.
- **Audience & Tone**: Serious, defense-grade independent software engineering. No corporate SaaS jargon, no empty web3 buzzwords (specifically banning the word "sovereign").

---

## 2. Visual Identity & Design Tokens

### 2.1 The Master Cybernetic Palette
| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg` | `#06080f` | Obsidian Deep Velvet background |
| `--bg-panel` | `rgba(10, 15, 26, 0.70)` | Frosted glass panel fill |
| `--bg-card` | `rgba(15, 22, 36, 0.75)` | Interactive card background |
| `--cyan` | `#00f0ff` | Primary Accent / Solid Button / Brand Accent |
| `--cyan-bright` | `#38bdf8` | High-energy hover state |
| `--cyan-glow` | `rgba(0, 240, 255, 0.40)` | Electric aura drop shadow |
| `--pink` | `#ec4899` | Secondary Accent / Cyber Magenta |
| `--pink-bright` | `#f472b6` | Header Subtitle / Accent highlights |
| `--violet` | `#a855f7` | Tertiary Accent / Secondary Button outline |
| `--emerald` | `#10b981` | System Status ONLINE indicator |
| `--text-main` | `#f8fafc` | Primary High-Contrast Headings |
| `--text-muted` | `#94a3b8` | Primary Body Copy |
| `--text-dim` | `#64748b` | Monospace Telemetry / Footers |

### 2.2 Typography Hierarchy
- **Display Headings**: `'Space Grotesk'`, sans-serif (weights: 600, 700). Letter-spacing: `-1.8px` for hero.
- **Body Text**: `'Plus Jakarta Sans'`, sans-serif (weight: 400, 500, line-height: 1.65).
- **Telemetry & Technical Specs**: `'JetBrains Mono'`, monospace (weights: 400, 600, 700).

### 2.3 Glassmorphism Invariants
- `backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);`
- Border: `1px solid rgba(0, 240, 255, 0.16)`
- Sub-surface gradient depth: `linear-gradient(180deg, rgba(15, 23, 42, 0.60), rgba(3, 7, 18, 0.70))`

---

## 3. Brandmark & Vector Geometry (`assets/twu-logo.svg`)

The TWU insignia is constructed entirely in pure SVG (48x48 viewport):
1. **Outer Boundary**: Rounded rectangle (squircle, `rx="12"`) with a multi-stop diagonal linear gradient border (`#00f0ff` $\to$ `#a855f7` $\to$ `#ec4899`) on `#070a14` obsidian.
2. **Master Interlocking Monogram**:
   - **T**: Electric Cyan horizontal crossbar (`M12 16H36`) with vertical stem descending to center node (`M24 16V26`).
   - **W**: Neon Magenta / Soft Violet geometric wings (`M13 21L19 33L24 23L29 33L35 21`).
   - **Luminous Node**: Dual-layer circular core (`cx="24" cy="23"`) with cyan blur filter and pure white diamond center representing local compute synthesis.

---

## 4. The 3D Spherical Celestial Observatory Engine

### 4.1 Coordinate Projection Pipeline
The celestial sphere wraps the user in an astronomical dome calculated via spherical coordinates $(R, \theta, \phi)$:
$$x = R \cos(\phi) \sin(\theta), \quad y = -R \sin(\phi), \quad z = R \cos(\phi) \cos(\theta)$$
- **Sphere Radius ($R$)**: Dynamically scaled to $\max(1200, \text{viewportWidth} \times 0.92)$.
- **Camera Rotation (Yaw Flow)**: Stately continuous precession ($\approx 360$ seconds per complete revolution).
- **Axial Tilt & Nutation**: Dual-frequency harmonic wobble:
  $$\text{Pitch} = 0.36 + 0.04\sin(t \times 0.015) + 0.02\cos(t \times 0.008)$$
  $$\text{Roll} = 0.04\cos(t \times 0.012) + 0.015\sin(t \times 0.006)$$
- **Gyro Parallax**: Subtle response to mouse coordinates for 3D depth perception.

### 4.2 The 31 Canonical Constellations
Constellations are mapped in authentic cyclical seasonal order:
- **Summer**: Lyra (Vega), Cygnus (Deneb), Aquila (Altair), Corona Borealis, Hercules, Ophiuchus, Scorpius, Sagittarius, Scutum.
- **Autumn**: Pegasus (Great Square with authentic galloping front legs), Andromeda, Cassiopeia, Cepheus, Pisces, Aries, Triangulum, Delphinus.
- **Winter**: Orion (Betelgeuse, Rigel, Belt), Canis Major (Sirius), Taurus (Aldebaran, Pleiades), Gemini (Castor & Pollux), Auriga (Capella), Canis Minor (Procyon), Lepus (with connected authentic ears and paws).
- **Spring**: Ursa Major (Big Dipper), Leo (Regulus, Sickle), Bootes (Arcturus, Kite), Virgo (Spica), Cancer, Corvus (with connected beak), Hydra.
- **Circumpolar Anchor**: Ursa Minor (Polaris North Star anchor), Draco (Dragon head & spinal arc).

### 4.3 Aesthetics Invariants
- **Zero In-Sky Text Labels**: Clean, silent, authentic astronomical appearance.
- **Holistic Fading**: Constellations fade in and out as single cohesive entities based on cosine depth curve $\alpha = 0.5 - 0.5\cos(\text{depth} \times \pi)$.
- **Shooting Stars**: Sparse, realistic meteors with multi-stop glowing ionization tails.

---

## 5. Defense-Grade Security & Anti-Abuse Architecture

### 5.1 Scraper-Proof Email Obfuscation
To protect `ethan@twu.software` from automated scrapers, email harvesters, and 1,000,000-burner bot attacks:
1. **DOM Bot-Trap**: The HTML template contains a hidden honeypot span:
   ```html
   <span id="email-label">ethan<span style="display:none;">-defend-bot-trap</span>@twu.software</span>
   ```
   Bots using naive regex scraping extract `ethan-defend-bot-trap@twu.software`, which immediately dumps into a discard honeypot and triggers automated IP firewalling.
2. **Runtime Assembly**: Legitimate human clicks assemble the clean address in memory only upon user interaction (`openDirectChannel` / `primeEmailLink`).

### 5.2 Content Security Policy (CSP)
Enforced via both `<meta>` tag and Edge `_headers`:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none';
```
- Disallows all external script injections.
- Forbids embedding in third-party iframes (`frame-ancestors 'none'`).
- Prevents form tampering (`form-action 'none'`).

### 5.3 Anti-Clickjacking Frame Buster
A fail-safe JavaScript guard executes in `<head>` before any DOM elements render:
```javascript
if (window.top !== window.self) {
  try {
    window.top.location.replace(window.self.location.href);
  } catch (e) {
    window.location.replace('about:blank');
  }
}
```

### 5.4 Edge Security Headers (`_headers`)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
- `Cross-Origin-Opener-Policy: same-origin`

---

## 6. The Capability Matrix Workstation Component

The interactive capability console (`#workstation`) provides a client-side state machine:
- **Channels**:
  1. `01 // BESPOKE`: Custom Internal Tools & Private Software
  2. `02 // PRIVATE AI`: Private On-Premise AI & Air-Gapped LLMs
  3. `03 // SYSTEMS & IT`: On-Site Systems Architecture & Mesa Triage
  4. `04 // WORKSHOPS`: Hands-On Tech Workshops & Community Training
- **State Transition Animation**: Fast 120ms fade-and-swap with zero layout shift.
- **Telemetry Indicators**: Dynamic station status, air-gap status, and zero cloud telemetry confirmation.

---

## 7. Autonomous Reproduction Protocol for Enki

To replicate or spin up new instances of this architecture across other projects, autonomous agents must adhere to the following invariants:

1. **Entity Verification**: Always check Arizona corporate filings; verify entity name is strictly `TWU LLC`.
2. **Zero Forbidden Words**: Reject the word *"sovereign"* in all copy, headings, meta tags, and internal variables. Use *"Private Software"*, *"Air-Gapped Infrastructure"*, or *"Independent Systems"*.
3. **No Unsanitized Phone Numbers**: Never publish personal cell numbers on the open web. Route all inquiries through the obfuscated direct channel or Matrix.
4. **Coordinate Integrity**: Verify constellation graphs form closed polygons or authentic sticks (no isolated floating boxes).
5. **Self-Contained Deployment**: Keep all CSS, SVG, and JavaScript self-contained in `index.html` to eliminate subresource failure modes.
