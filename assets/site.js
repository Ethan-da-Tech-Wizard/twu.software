
    // ============================================================================
    // CELESTIAL OBSERVATORY ENGINE (TWU LLC)
    // ============================================================================
    // • 31 Authentic Multi-Star Geometric Constellations flowing in seasonal sequence:
    //     SUMMER -> AUTUMN -> WINTER -> SPRING -> SUMMER ...
    // • Random initial season on each page load.
    // • 100% UNLABELED IN SKY: Pure, serene celestial aesthetics (no text labels in sky).
    // • Interactive HUD card appears ONLY when user hovers directly over an asterism.
    // • 950 ambient multi-depth twinkling stardust particles with full scroll parallax.
    // • Defense-grade Sanctuary Shield: mathematically 0.0 opacity across hero text and cards.
    // • Shooting stars / cosmic meteors engine.

    const canvas = document.getElementById('space-canvas');
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let mouse = { x: -1000, y: -1000, targetX: 0, targetY: 0, smoothX: 0, smoothY: 0 };
    let lastTime = performance.now();
    let scrollY = window.scrollY || 0;

    // Completely random celestial starting angle on each session (0 to 2*PI)
    let celestialYaw = Math.random() * Math.PI * 2.0;
    let targetYaw = null;
    let celestialPitch = 0.36;
    let celestialRoll = 0.04;
    let timeAccumulator = 0.0;

    // Star Colors: The Master Triad Spectra (Gold, Emerald Green, Rose Pink & Diamond White)
    const STAR_COLORS = [
      { r: 240, g: 245, b: 255 },  // 0: Celestial Starlight White (Rigel, Sirius, Deneb)
      { r: 254, g: 240, b: 138 },  // 1: Warm Electrum Gold (Vega, Capella)
      { r: 251, g: 191, b: 36 },   // 2: Solar Amber Gold (Betelgeuse, Arcturus)
      { r: 255, g: 255, b: 255 },  // 3: Diamond White (Polaris, Castor)
      { r: 52,  g: 211, b: 153 },  // 4: Celestial Aurora Emerald (Mintaka, Bellatrix)
      { r: 251, g: 113, b: 133 },  // 5: Nebula Rose Pink (Antares Core)
      { r: 244, g: 63,  b: 94 }    // 6: Deep Rose Magenta (Alphecca)
    ];

    function getSphereRadius() {
      return Math.max(1200, (width || 1440) * 0.92);
    }

    // ============================================================================
    // 31 CANONICAL GEOMETRIC CONSTELLATIONS (Ordered by Astronomical Seasons)
    // Summer (225°-305°) -> Autumn (315°-35°) -> Winter (45°-125°) -> Spring (135°-215°)
    // ============================================================================
    function build3DConstellations() {
      const constellations = [];
      const R = getSphereRadius();

      function sc(thetaDeg, phiDeg, r = R) {
        const t = (thetaDeg * Math.PI) / 180;
        const p = (phiDeg * Math.PI) / 180;
        const cosT = Math.cos(t), sinT = Math.sin(t);
        const cosP = Math.cos(p), sinP = Math.sin(p);
        return {
          x: r * cosP * sinT,
          y: -r * sinP,
          z: r * cosP * cosT,
          // Tangent vectors on the celestial sphere:
          ux: cosT,
          uy: 0,
          uz: -sinT,
          vx: -sinP * sinT,
          vy: -cosP,
          vz: -sinP * cosT
        };
      }

      // --------------------------------------------------------------------------
      // ☀️ SUMMER CONSTELLATIONS (Theta: 220° - 310°)
      // --------------------------------------------------------------------------
      // 1. LYRA (Vega diamond harp)
      constellations.push({
        id: 1, season: "SUMMER", center: sc(232, 46),
        stars: [
          { dx: 0,   dy: -48, dz: 0, r: 5.2, pulse: 0.0, color: 1, name: "Vega" },
          { dx: -24, dy: -18, dz: 0, r: 2.8, pulse: 1.3, color: 0, name: "Epsilon Lyrae" },
          { dx: -32, dy: 28,  dz: 0, r: 3.0, pulse: 2.5, color: 0, name: "Sheliak" },
          { dx: 14,  dy: 36,  dz: 0, r: 3.1, pulse: 3.7, color: 3, name: "Sulafat" },
          { dx: 22,  dy: -12, dz: 0, r: 2.7, pulse: 4.9, color: 0, name: "Delta Lyrae" }
        ],
        lines: [[0, 1], [0, 4], [1, 2], [2, 3], [3, 4], [1, 4]],
        label: "LYRA", desc: "The Celestial Harp · Vega Sapphire Anchor"
      });

      // 2. CYGNUS (The Northern Cross)
      constellations.push({
        id: 2, season: "SUMMER", center: sc(250, 44),
        stars: [
          { dx: 0,   dy: -56, dz: 0, r: 4.8, pulse: 0.1, color: 0, name: "Deneb" },
          { dx: 0,   dy: -6,  dz: 0, r: 3.6, pulse: 1.4, color: 0, name: "Sadr" },
          { dx: 0,   dy: 58,  dz: 0, r: 3.2, pulse: 2.7, color: 2, name: "Albireo" },
          { dx: -58, dy: 6,   dz: 0, r: 3.3, pulse: 3.9, color: 0, name: "Gienah" },
          { dx: 58,  dy: -18, dz: 0, r: 3.2, pulse: 5.1, color: 0, name: "Delta Cygni" }
        ],
        lines: [[0, 1], [1, 2], [3, 1], [1, 4]],
        label: "CYGNUS", desc: "The Swan · Deneb Supergiant & Albireo"
      });

      // 3. AQUILA (Altair Wingspan)
      constellations.push({
        id: 3, season: "SUMMER", center: sc(268, 26),
        stars: [
          { dx: 0,   dy: -12, dz: 0, r: 4.8, pulse: 0.3, color: 3, name: "Altair" },
          { dx: -22, dy: -32, dz: 0, r: 3.0, pulse: 2.1, color: 2, name: "Tarazed" },
          { dx: 22,  dy: 8,   dz: 0, r: 2.9, pulse: 3.9, color: 0, name: "Alshain" },
          { dx: -68, dy: 16,  dz: 0, r: 2.8, pulse: 4.8, color: 0, name: "Delta Aql" },
          { dx: 64,  dy: -42, dz: 0, r: 2.8, pulse: 1.5, color: 0, name: "Zeta Aql" },
          { dx: 14,  dy: 52,  dz: 0, r: 2.7, pulse: 2.9, color: 0, name: "Theta Aql" }
        ],
        lines: [[1, 0], [0, 2], [3, 1], [4, 1], [2, 5], [3, 0], [4, 0]],
        label: "AQUILA", desc: "The Celestial Eagle · Altair Diamond Wingspan"
      });

      // 4. HERCULES (The Keystone)
      constellations.push({
        id: 4, season: "SUMMER", center: sc(242, 52),
        stars: [
          { dx: -26, dy: -36, dz: 0, r: 3.4, pulse: 0.2, color: 0, name: "Eta Her" },
          { dx: 24,  dy: -40, dz: 0, r: 3.3, pulse: 1.6, color: 2, name: "Zeta Her" },
          { dx: 36,  dy: 24,  dz: 0, r: 3.5, pulse: 2.8, color: 0, name: "Epsilon Her" },
          { dx: -18, dy: 30,  dz: 0, r: 3.2, pulse: 4.0, color: 3, name: "Pi Her" },
          { dx: -54, dy: -68, dz: 0, r: 3.0, pulse: 5.1, color: 0, name: "Kornephoros" },
          { dx: 48,  dy: 72,  dz: 0, r: 3.1, pulse: 0.9, color: 0, name: "Sarin" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [2, 5]],
        label: "HERCULES", desc: "The Keystone Quadrangle · Great Globular Cluster M13"
      });

      // 5. SCORPIUS (Antares Heart + J-Hook Stinger)
      constellations.push({
        id: 5, season: "SUMMER", center: sc(286, -38),
        stars: [
          { dx: -24, dy: -42, dz: 0, r: 5.2, pulse: 0.1, color: 2, name: "Antares" },
          { dx: -48, dy: -66, dz: 0, r: 3.0, pulse: 1.3, color: 0, name: "Graffias" },
          { dx: -54, dy: -46, dz: 0, r: 3.1, pulse: 2.4, color: 0, name: "Dschubba" },
          { dx: -2,  dy: -18, dz: 0, r: 2.9, pulse: 3.6, color: 0, name: "Larawag" },
          { dx: 24,  dy: 12,  dz: 0, r: 3.0, pulse: 4.8, color: 0, name: "Sargas" },
          { dx: 46,  dy: 44,  dz: 0, r: 2.8, pulse: 5.9, color: 0, name: "Shaula Hook" },
          { dx: 64,  dy: 24,  dz: 0, r: 3.4, pulse: 0.7, color: 0, name: "Shaula Stinger" },
          { dx: 52,  dy: 8,   dz: 0, r: 2.8, pulse: 1.8, color: 3, name: "Lesath" }
        ],
        lines: [[1, 2], [2, 0], [0, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
        label: "SCORPIUS", desc: "Ruby Supergiant Antares · The Celestial Scorpion"
      });

      // 6. SAGITTARIUS (Canonical 8-Star Teapot)
      constellations.push({
        id: 6, season: "SUMMER", center: sc(304, -36),
        stars: [
          { dx: -46, dy: 14,  dz: 0, r: 3.6, pulse: 0.3, color: 0, name: "Alnasl (Spout Tip)" },
          { dx: -18, dy: -12, dz: 0, r: 3.2, pulse: 1.5, color: 0, name: "Kaus Media" },
          { dx: 18,  dy: -42, dz: 0, r: 3.5, pulse: 2.7, color: 2, name: "Kaus Borealis (Lid)" },
          { dx: 48,  dy: -16, dz: 0, r: 3.4, pulse: 3.8, color: 0, name: "Nunki" },
          { dx: 54,  dy: 18,  dz: 0, r: 3.2, pulse: 4.9, color: 0, name: "Ascella" },
          { dx: 22,  dy: 38,  dz: 0, r: 3.4, pulse: 0.6, color: 0, name: "Kaus Australis" },
          { dx: -14, dy: 34,  dz: 0, r: 3.1, pulse: 1.8, color: 0, name: "Arkab" },
          { dx: 72,  dy: -2,  dz: 0, r: 2.9, pulse: 2.9, color: 3, name: "Tau Sgr (Handle)" }
        ],
        lines: [[0, 1], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1], [3, 7], [4, 7]],
        label: "SAGITTARIUS", desc: "The Archer · Canonical 8-Star Teapot Asterism"
      });

      // 7. OPHIUCHUS (The Serpent Bearer)
      constellations.push({
        id: 7, season: "SUMMER", center: sc(278, 16),
        stars: [
          { dx: 0,   dy: -52, dz: 0, r: 4.0, pulse: 0.2, color: 0, name: "Rasalhague" },
          { dx: -42, dy: -12, dz: 0, r: 3.1, pulse: 1.4, color: 2, name: "Cebalrai" },
          { dx: -48, dy: 34,  dz: 0, r: 3.0, pulse: 2.6, color: 0, name: "Yed Prior" },
          { dx: 44,  dy: 28,  dz: 0, r: 3.2, pulse: 3.8, color: 0, name: "Sabik" },
          { dx: 38,  dy: -18, dz: 0, r: 2.9, pulse: 5.0, color: 3, name: "Marfik" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
        label: "OPHIUCHUS", desc: "The Serpent Bearer · Rasalhague Zenith Guardian"
      });

      // --------------------------------------------------------------------------
      // 🍂 AUTUMN CONSTELLATIONS (Theta: 315° - 35°)
      // --------------------------------------------------------------------------
      // 8. PERSEUS (Mirfak & Algol Demon Star)
      constellations.push({
        id: 8, season: "AUTUMN", center: sc(330, 42),
        stars: [
          { dx: 0,   dy: -24, dz: 0, r: 4.5, pulse: 0.1, color: 3, name: "Mirfak" },
          { dx: -34, dy: 16,  dz: 0, r: 3.6, pulse: 1.4, color: 1, name: "Algol" },
          { dx: -18, dy: -56, dz: 0, r: 2.8, pulse: 2.6, color: 0, name: "Gamma Per" },
          { dx: 34,  dy: -42, dz: 0, r: 2.9, pulse: 3.8, color: 0, name: "Eta Per" },
          { dx: 28,  dy: 12,  dz: 0, r: 3.0, pulse: 5.0, color: 0, name: "Atik" },
          { dx: 46,  dy: 44,  dz: 0, r: 2.7, pulse: 0.8, color: 0, name: "Menkib" }
        ],
        lines: [[2, 0], [0, 3], [0, 1], [0, 4], [4, 5]],
        label: "PERSEUS", desc: "Alpha Persei & Algol Demon Star · Perseus Hero Arc"
      });

      // 9. CASSIOPEIA (Royal 'W' Throne)
      constellations.push({
        id: 9, season: "AUTUMN", center: sc(348, 56),
        stars: [
          { dx: -74, dy: -8,  dz: 0, r: 3.6, pulse: 0.2, color: 0, name: "Caph" },
          { dx: -36, dy: 18,  dz: 0, r: 4.4, pulse: 1.5, color: 2, name: "Schedar" },
          { dx: 0,   dy: -18, dz: 0, r: 3.9, pulse: 2.7, color: 0, name: "Navi" },
          { dx: 38,  dy: 12,  dz: 0, r: 3.4, pulse: 3.9, color: 0, name: "Ruchbah" },
          { dx: 72,  dy: -24, dz: 0, r: 3.2, pulse: 5.1, color: 3, name: "Segin" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
        label: "CASSIOPEIA", desc: "The Queen's Throne · Schedar Golden Amber Core"
      });

      // 10. ANDROMEDA (Princess Figure)
      constellations.push({
        id: 10, season: "AUTUMN", center: sc(4, 38),
        stars: [
          { dx: -48, dy: -38, dz: 0, r: 4.4, pulse: 0.3, color: 3, name: "Alpheratz" },
          { dx: -12, dy: -12, dz: 0, r: 3.9, pulse: 1.6, color: 2, name: "Mirach" },
          { dx: 36,  dy: 18,  dz: 0, r: 3.7, pulse: 2.8, color: 0, name: "Almach" },
          { dx: -24, dy: 28,  dz: 0, r: 2.8, pulse: 3.9, color: 0, name: "Mu And" },
          { dx: 18,  dy: -44, dz: 0, r: 2.7, pulse: 5.0, color: 0, name: "Upsilon And" }
        ],
        lines: [[0, 1], [1, 2], [1, 3], [0, 4]],
        label: "ANDROMEDA", desc: "The Chained Maiden · Mirach Golden Giant & Almach"
      });

      // 11. PEGASUS (The Winged Horse)
      constellations.push({
        id: 11, season: "AUTUMN", center: sc(22, 36),
        stars: [
          { dx: -48, dy: -42, dz: 0, r: 4.2, pulse: 0.0, color: 0, name: "Alpheratz" },
          { dx: 44,  dy: -46, dz: 0, r: 3.9, pulse: 1.2, color: 2, name: "Scheat" },
          { dx: 48,  dy: 38,  dz: 0, r: 3.8, pulse: 2.4, color: 0, name: "Markab" },
          { dx: -46, dy: 36,  dz: 0, r: 3.7, pulse: 3.6, color: 0, name: "Algenib" },
          { dx: 92,  dy: 52,  dz: 0, r: 3.0, pulse: 4.8, color: 0, name: "Homam" },
          { dx: 128, dy: 16,  dz: 0, r: 3.3, pulse: 0.6, color: 3, name: "Enif" },
          { dx: 78,  dy: -72, dz: 0, r: 3.1, pulse: 1.9, color: 0, name: "Matar" },
          { dx: 108, dy: -94, dz: 0, r: 2.8, pulse: 3.2, color: 3, name: "Pi Pegasi" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [1, 6], [6, 7]],
        label: "PEGASUS", desc: "The Winged Horse · Great Square, Galloping Limbs & Enif"
      });

      // 12. ARIES (The Ram)
      constellations.push({
        id: 12, season: "AUTUMN", center: sc(36, 18),
        stars: [
          { dx: -28, dy: -12, dz: 0, r: 4.0, pulse: 0.5, color: 2, name: "Hamal" },
          { dx: 0,   dy: 4,   dz: 0, r: 3.4, pulse: 1.8, color: 0, name: "Sheratan" },
          { dx: 22,  dy: 18,  dz: 0, r: 2.9, pulse: 3.1, color: 3, name: "Mesarthim" },
          { dx: 44,  dy: 8,   dz: 0, r: 2.6, pulse: 4.4, color: 0, name: "41 Arietis" }
        ],
        lines: [[0, 1], [1, 2], [2, 3]],
        label: "ARIES", desc: "The Ram · Hamal Golden Beacon"
      });

      // 13. PISCES (The V-Ribbon)
      constellations.push({
        id: 13, season: "AUTUMN", center: sc(12, 10),
        stars: [
          { dx: 0,   dy: 38,  dz: 0, r: 3.6, pulse: 0.4, color: 0, name: "Alrescha (Knot)" },
          { dx: -38, dy: 14,  dz: 0, r: 2.8, pulse: 1.7, color: 0, name: "Western Fish" },
          { dx: -72, dy: -8,  dz: 0, r: 3.0, pulse: 3.0, color: 3, name: "Circlet" },
          { dx: 28,  dy: 4,   dz: 0, r: 2.7, pulse: 4.2, color: 0, name: "Torcular" },
          { dx: 54,  dy: -24, dz: 0, r: 2.9, pulse: 5.5, color: 0, name: "Northern Fish" }
        ],
        lines: [[2, 1], [1, 0], [0, 3], [3, 4]],
        label: "PISCES", desc: "The Two Fishes · Alrescha Celestial Knot"
      });

      // --------------------------------------------------------------------------
      // ❄️ WINTER CONSTELLATIONS (Theta: 45° - 125°)
      // --------------------------------------------------------------------------
      // 14. TAURUS & THE PLEIADES (V-Horns + 7 Sisters)
      constellations.push({
        id: 14, season: "WINTER", center: sc(48, -38),
        stars: [
          { dx: -22, dy: 12,  dz: 0, r: 4.8, pulse: 0.6, color: 2, name: "Aldebaran" },
          { dx: 44,  dy: -44, dz: 0, r: 3.2, pulse: 1.9, color: 0, name: "Elnath" },
          { dx: 26,  dy: 38,  dz: 0, r: 2.9, pulse: 3.2, color: 0, name: "Tianguan" },
          { dx: -42, dy: 0,   dz: 0, r: 2.8, pulse: 4.0, color: 0, name: "Hyades" },
          { dx: -88, dy: -36, dz: 0, r: 3.9, pulse: 4.5, color: 0, name: "Alcyone" },
          { dx: -98, dy: -28, dz: 0, r: 2.7, pulse: 5.2, color: 3, name: "Maia" },
          { dx: -82, dy: -46, dz: 0, r: 2.7, pulse: 1.1, color: 1, name: "Electra" },
          { dx: -76, dy: -24, dz: 0, r: 2.6, pulse: 2.3, color: 3, name: "Merope" }
        ],
        lines: [[0, 1], [1, 3], [3, 0], [0, 2], [4, 5], [5, 6], [6, 7], [7, 4]],
        label: "TAURUS", desc: "The Bull & Seven Sisters · Aldebaran Fiery Eye"
      });

      // 15. AURIGA (Capella Pentagon)
      constellations.push({
        id: 15, season: "WINTER", center: sc(62, 44),
        stars: [
          { dx: 0,   dy: -52, dz: 0, r: 4.8, pulse: 0.4, color: 2, name: "Capella" },
          { dx: -40, dy: -22, dz: 0, r: 3.1, pulse: 1.8, color: 0, name: "Menkalinan" },
          { dx: -46, dy: 36,  dz: 0, r: 2.9, pulse: 3.1, color: 0, name: "Hassaleh" },
          { dx: 22,  dy: 48,  dz: 0, r: 3.0, pulse: 4.5, color: 0, name: "Alnath" },
          { dx: 38,  dy: -12, dz: 0, r: 2.9, pulse: 5.7, color: 3, name: "Mahasim" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
        label: "AURIGA", desc: "The Charioteer · Capella Golden Beacon"
      });

      // 16. ORION (The Hunter - 8-Star Masterwork)
      constellations.push({
        id: 16, season: "WINTER", center: sc(76, -34),
        stars: [
          { dx: -54, dy: -70, dz: 0, r: 4.8, pulse: 0.0, color: 2, name: "Betelgeuse" },
          { dx: 54,  dy: -64, dz: 0, r: 3.3, pulse: 1.2, color: 0, name: "Bellatrix" },
          { dx: -24, dy: -6,  dz: 0, r: 3.0, pulse: 2.4, color: 0, name: "Alnitak" },
          { dx: 0,   dy: -4,  dz: 0, r: 3.1, pulse: 3.1, color: 3, name: "Alnilam" },
          { dx: 24,  dy: -2,  dz: 0, r: 3.0, pulse: 4.0, color: 0, name: "Mintaka" },
          { dx: -44, dy: 74,  dz: 0, r: 3.2, pulse: 5.1, color: 0, name: "Saiph" },
          { dx: 58,  dy: 80,  dz: 0, r: 5.0, pulse: 0.5, color: 0, name: "Rigel" },
          { dx: 2,   dy: -98, dz: 0, r: 2.5, pulse: 1.8, color: 3, name: "Meissa" }
        ],
        lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [0, 7], [1, 7], [5, 6]],
        label: "ORION", desc: "Betelgeuse Supergiant · Rigel Sapphire Anchor"
      });

      // 17. CANIS MAJOR (Sirius Diamond Hound)
      constellations.push({
        id: 17, season: "WINTER", center: sc(94, -42),
        stars: [
          { dx: 0,   dy: -44, dz: 0, r: 5.5, pulse: 0.2, color: 0, name: "Sirius" },
          { dx: -28, dy: -14, dz: 0, r: 2.9, pulse: 1.5, color: 0, name: "Mirzam" },
          { dx: 18,  dy: 12,  dz: 0, r: 3.0, pulse: 2.7, color: 0, name: "Wezen" },
          { dx: 36,  dy: 38,  dz: 0, r: 2.9, pulse: 3.8, color: 0, name: "Aludra" },
          { dx: -12, dy: 44,  dz: 0, r: 3.0, pulse: 4.9, color: 0, name: "Adhara" },
          { dx: -34, dy: 28,  dz: 0, r: 2.6, pulse: 1.1, color: 3, name: "Furud" }
        ],
        lines: [[0, 1], [0, 2], [2, 3], [2, 4], [4, 5]],
        label: "CANIS MAJOR", desc: "Sirius · Brightest Star in Night Sky"
      });

      // 18. CANIS MINOR (Procyon)
      constellations.push({
        id: 18, season: "WINTER", center: sc(102, 6),
        stars: [
          { dx: 0,   dy: -18, dz: 0, r: 4.6, pulse: 0.3, color: 3, name: "Procyon" },
          { dx: 28,  dy: 22,  dz: 0, r: 2.8, pulse: 2.0, color: 0, name: "Gomeisa" },
          { dx: -22, dy: 16,  dz: 0, r: 2.5, pulse: 3.5, color: 0, name: "Epsilon CMi" }
        ],
        lines: [[0, 1], [1, 2], [2, 0]],
        label: "CANIS MINOR", desc: "Procyon Beacon · Lesser Dog"
      });

      // 19. GEMINI (Castor & Pollux The Twins)
      constellations.push({
        id: 19, season: "WINTER", center: sc(112, 36),
        stars: [
          { dx: -26, dy: -68, dz: 0, r: 4.2, pulse: 0.3, color: 3, name: "Castor" },
          { dx: 26,  dy: -62, dz: 0, r: 4.4, pulse: 1.1, color: 2, name: "Pollux" },
          { dx: -32, dy: -18, dz: 0, r: 2.8, pulse: 2.3, color: 0, name: "Mebsuta" },
          { dx: 22,  dy: -12, dz: 0, r: 2.9, pulse: 3.4, color: 0, name: "Wasat" },
          { dx: -44, dy: 46,  dz: 0, r: 2.9, pulse: 4.6, color: 0, name: "Tejat" },
          { dx: -20, dy: 52,  dz: 0, r: 2.8, pulse: 5.2, color: 0, name: "Propus" },
          { dx: 18,  dy: 48,  dz: 0, r: 3.0, pulse: 0.8, color: 0, name: "Alhena" },
          { dx: 42,  dy: 38,  dz: 0, r: 2.7, pulse: 1.9, color: 3, name: "Alzirr" }
        ],
        lines: [[0, 2], [2, 4], [4, 5], [1, 3], [3, 6], [6, 7], [0, 1], [2, 3]],
        label: "GEMINI", desc: "Castor & Pollux · Twin Celestial Guardians"
      });

      // 20. LEPUS (The Hare)
      constellations.push({
        id: 20, season: "WINTER", center: sc(82, -48),
        stars: [
          { dx: -14, dy: -12, dz: 0, r: 3.8, pulse: 0.4, color: 2, name: "Arneb" },
          { dx: 16,  dy: -16, dz: 0, r: 3.4, pulse: 1.8, color: 0, name: "Nihal" },
          { dx: 34,  dy: 14,  dz: 0, r: 2.9, pulse: 3.1, color: 0, name: "Gamma Lep" },
          { dx: -10, dy: 18,  dz: 0, r: 2.8, pulse: 4.3, color: 3, name: "Delta Lep" },
          { dx: -38, dy: 6,   dz: 0, r: 3.0, pulse: 1.2, color: 0, name: "Zeta Lep" },
          { dx: -32, dy: -38, dz: 0, r: 3.2, pulse: 2.5, color: 3, name: "Mu Lep (Ear)" },
          { dx: -48, dy: -32, dz: 0, r: 2.9, pulse: 3.8, color: 0, name: "Lambda Lep (Ear)" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 0], [0, 5], [4, 6]],
        label: "LEPUS", desc: "The Hare · Arneb Golden Core & Celestial Ears"
      });

      // --------------------------------------------------------------------------
      // 🌸 SPRING CONSTELLATIONS (Theta: 135° - 215°)
      // --------------------------------------------------------------------------
      // 21. LEO (The Lion Sickle + Regulus)
      constellations.push({
        id: 21, season: "SPRING", center: sc(138, 34),
        stars: [
          { dx: -32, dy: 24,  dz: 0, r: 4.8, pulse: 0.5, color: 0, name: "Regulus" },
          { dx: -18, dy: -14, dz: 0, r: 3.2, pulse: 1.6, color: 2, name: "Algieba" },
          { dx: -34, dy: -42, dz: 0, r: 2.9, pulse: 2.7, color: 0, name: "Adhafera" },
          { dx: -14, dy: -66, dz: 0, r: 2.8, pulse: 3.8, color: 3, name: "Ras Elased" },
          { dx: 18,  dy: -52, dz: 0, r: 2.7, pulse: 4.9, color: 0, name: "Al Jabbah" },
          { dx: 36,  dy: -4,  dz: 0, r: 3.1, pulse: 0.8, color: 0, name: "Zosma" },
          { dx: 68,  dy: 12,  dz: 0, r: 3.5, pulse: 2.0, color: 3, name: "Denebola" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1], [1, 5], [5, 6], [6, 0]],
        label: "LEO", desc: "Heart of the Lion · Regulus Alpha Leonis"
      });

      // 22. URSA MAJOR (The Big Dipper Pointer)
      constellations.push({
        id: 22, season: "SPRING", center: sc(156, 54),
        stars: [
          { dx: 52,  dy: -28, dz: 0, r: 4.0, pulse: 0.0, color: 3, name: "Dubhe" },
          { dx: 54,  dy: 12,  dz: 0, r: 3.8, pulse: 1.2, color: 0, name: "Merak" },
          { dx: 12,  dy: 18,  dz: 0, r: 3.3, pulse: 2.4, color: 0, name: "Phecda" },
          { dx: 8,   dy: -22, dz: 0, r: 3.5, pulse: 3.5, color: 0, name: "Megrez" },
          { dx: -38, dy: -32, dz: 0, r: 3.8, pulse: 4.6, color: 0, name: "Alioth" },
          { dx: -74, dy: -42, dz: 0, r: 3.6, pulse: 5.7, color: 3, name: "Mizar" },
          { dx: -112, dy: -70, dz: 0, r: 3.9, pulse: 1.0, color: 0, name: "Alkaid" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
        label: "URSA MAJOR", desc: "The Great Bear · Dubhe & Merak Pointers to Polaris"
      });

      // 23. VIRGO (Spica Sapphire)
      constellations.push({
        id: 23, season: "SPRING", center: sc(174, -36),
        stars: [
          { dx: 0,   dy: 38,  dz: 0, r: 5.0, pulse: 0.4, color: 0, name: "Spica" },
          { dx: -46, dy: -12, dz: 0, r: 3.1, pulse: 1.5, color: 2, name: "Porrima" },
          { dx: -68, dy: -48, dz: 0, r: 3.0, pulse: 2.6, color: 0, name: "Vindemiatrix" },
          { dx: -18, dy: -36, dz: 0, r: 2.9, pulse: 3.7, color: 0, name: "Minelauva" },
          { dx: 38,  dy: -18, dz: 0, r: 2.8, pulse: 4.8, color: 0, name: "Heze" },
          { dx: 58,  dy: 14,  dz: 0, r: 2.7, pulse: 5.9, color: 3, name: "Spica South" }
        ],
        lines: [[0, 1], [1, 3], [3, 2], [3, 4], [4, 0], [0, 5]],
        label: "VIRGO", desc: "Spica Sapphire Beacon · Alpha Virginis"
      });

      // 24. BOÖTES (Arcturus Diamond Kite)
      constellations.push({
        id: 24, season: "SPRING", center: sc(192, 40),
        stars: [
          { dx: 0,   dy: 46,  dz: 0, r: 5.0, pulse: 0.1, color: 2, name: "Arcturus" },
          { dx: -38, dy: 6,   dz: 0, r: 3.1, pulse: 1.3, color: 0, name: "Muphrid" },
          { dx: 36,  dy: 2,   dz: 0, r: 3.2, pulse: 2.4, color: 0, name: "Izar" },
          { dx: 22,  dy: -42, dz: 0, r: 2.9, pulse: 3.5, color: 0, name: "Seginus" },
          { dx: -16, dy: -56, dz: 0, r: 3.1, pulse: 4.6, color: 3, name: "Nekkar" },
          { dx: -32, dy: -24, dz: 0, r: 2.8, pulse: 5.7, color: 0, name: "Rho Boo" }
        ],
        lines: [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 1], [0, 3]],
        label: "BOÖTES", desc: "Golden Giant Arcturus · The Celestial Diamond Kite"
      });

      // 25. CORONA BOREALIS (The Northern Crown Tiara)
      constellations.push({
        id: 25, season: "SPRING", center: sc(210, 50),
        stars: [
          { dx: 0,   dy: 12,  dz: 0, r: 4.4, pulse: 0.2, color: 1, name: "Alphecca" },
          { dx: -28, dy: -4,  dz: 0, r: 2.9, pulse: 1.4, color: 0, name: "Nusakan" },
          { dx: -48, dy: -26, dz: 0, r: 2.7, pulse: 2.6, color: 3, name: "Theta CrB" },
          { dx: 26,  dy: -2,  dz: 0, r: 3.0, pulse: 3.8, color: 0, name: "Gamma CrB" },
          { dx: 46,  dy: -22, dz: 0, r: 2.8, pulse: 5.0, color: 0, name: "Delta CrB" },
          { dx: 56,  dy: -44, dz: 0, r: 2.6, pulse: 0.9, color: 3, name: "Epsilon CrB" }
        ],
        lines: [[2, 1], [1, 0], [0, 3], [3, 4], [4, 5]],
        label: "CORONA BOREALIS", desc: "The Northern Crown · Alphecca Violet Gem"
      });

      // 26. CORVUS (The Celestial Crow)
      constellations.push({
        id: 26, season: "SPRING", center: sc(182, -46),
        stars: [
          { dx: -24, dy: -20, dz: 0, r: 3.4, pulse: 0.5, color: 0, name: "Gienah" },
          { dx: 26,  dy: -16, dz: 0, r: 3.5, pulse: 1.7, color: 2, name: "Kraz" },
          { dx: 20,  dy: 24,  dz: 0, r: 3.3, pulse: 3.0, color: 0, name: "Algorab" },
          { dx: -28, dy: 18,  dz: 0, r: 3.2, pulse: 4.3, color: 3, name: "Minkar" },
          { dx: -54, dy: -2,  dz: 0, r: 3.0, pulse: 2.1, color: 0, name: "Alchiba (Beak)" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [3, 4]],
        label: "CORVUS", desc: "The Celestial Crow · Diamond Sail & Alchiba Beak"
      });

      // --------------------------------------------------------------------------
      // ★ CIRCUMPOLAR ZENITH (All-Year Anchors)
      // --------------------------------------------------------------------------
      // 27. POLARIS & URSA MINOR (True North Little Dipper)
      constellations.push({
        id: 27, season: "POLARIS", center: sc(0, 80),
        stars: [
          { dx: 0,   dy: -48, dz: 0, r: 5.8, pulse: 0.0, color: 3, name: "Polaris" },
          { dx: 18,  dy: -18, dz: 0, r: 2.8, pulse: 1.4, color: 0, name: "Yildun" },
          { dx: 36,  dy: 12,  dz: 0, r: 2.9, pulse: 2.7, color: 0, name: "Anwar" },
          { dx: 16,  dy: 42,  dz: 0, r: 3.0, pulse: 3.9, color: 0, name: "Ahfa" },
          { dx: -24, dy: 44,  dz: 0, r: 3.7, pulse: 5.1, color: 2, name: "Kochab" },
          { dx: -28, dy: 18,  dz: 0, r: 3.5, pulse: 0.8, color: 0, name: "Pherkad" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2]],
        label: "POLARIS", desc: "True North Celestial Anchor · Alpha Ursae Minoris"
      });

      // 28. DRACO (The Dragon's Crest)
      constellations.push({
        id: 28, season: "POLARIS", center: sc(260, 68),
        stars: [
          { dx: -18, dy: -22, dz: 0, r: 3.6, pulse: 0.3, color: 2, name: "Eltanin" },
          { dx: 22,  dy: -24, dz: 0, r: 3.4, pulse: 1.6, color: 0, name: "Rastaban" },
          { dx: 28,  dy: 16,  dz: 0, r: 3.0, pulse: 2.9, color: 3, name: "Grumium" },
          { dx: -14, dy: 24,  dz: 0, r: 2.9, pulse: 4.1, color: 0, name: "Kuma" },
          { dx: 64,  dy: 36,  dz: 0, r: 2.9, pulse: 1.8, color: 0, name: "Gianfar" }
        ],
        lines: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4]],
        label: "DRACO", desc: "The Dragon's Head · Eltanin Supergiant & Spinal Arc"
      });

      // 29. CEPHEUS (The King's House)
      constellations.push({
        id: 29, season: "POLARIS", center: sc(320, 72),
        stars: [
          { dx: 0,   dy: -44, dz: 0, r: 3.6, pulse: 0.2, color: 3, name: "Alderamin" },
          { dx: -34, dy: -8,  dz: 0, r: 3.2, pulse: 1.5, color: 0, name: "Alfirk" },
          { dx: 34,  dy: -8,  dz: 0, r: 3.1, pulse: 2.8, color: 2, name: "Errai" },
          { dx: 24,  dy: 36,  dz: 0, r: 3.0, pulse: 4.0, color: 0, name: "Zeta Cep" },
          { dx: -24, dy: 36,  dz: 0, r: 2.9, pulse: 5.3, color: 0, name: "Delta Cep" }
        ],
        lines: [[0, 1], [0, 2], [1, 4], [2, 3], [4, 3]],
        label: "CEPHEUS", desc: "The King · House of Cepheus Celestial Pentagram"
      });

      return constellations;
    }

    let CONSTELLATIONS_3D = build3DConstellations();

    // ============================================================================
    // 1,850 AMBIENT STARDUST PARTICLES (Rich, Multi-Color Cosmic Field)
    // ============================================================================
    let ambient3D = [];
    function initAmbient3D() {
      ambient3D = [];
      const R = getSphereRadius();
      for (let i = 0; i < 1850; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = (v - 0.5) * Math.PI * 0.98;
        const r = R * (0.45 + Math.random() * 0.90);
        ambient3D.push({
          x: r * Math.cos(phi) * Math.sin(theta),
          y: r * Math.sin(phi),
          z: r * Math.cos(phi) * Math.cos(theta),
          r: 0.65 + Math.random() * 2.2,
          pulse: Math.random() * 6.28,
          pulseSpeed: 0.008 + Math.random() * 0.024,
          color: Math.floor(Math.random() * STAR_COLORS.length)
        });
      }
    }

    // ============================================================================
    // COSMIC METEORS & SHOOTING STARS ENGINE
    // ============================================================================
    let meteors = [];
    function maybeSpawnMeteor() {
      if (Math.random() < 0.024 && meteors.length < 3) {
        const startX = Math.random() * width;
        const startY = Math.random() * height * 0.40;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35;
        const speed = 750 + Math.random() * 550;
        meteors.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: 90 + Math.random() * 120,
          life: 1.0,
          decay: 0.75 + Math.random() * 0.55
        });
      }
    }

    function updateAndDrawMeteors(dt) {
      maybeSpawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.life -= m.decay * dt;

        if (m.life <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.vx / 600) * m.length;
        const tailY = m.y - (m.vy / 600) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(251, 191, 36, 0)');
        grad.addColorStop(0.40, `rgba(16, 185, 129, ${m.life * 0.65})`);
        grad.addColorStop(0.80, `rgba(251, 113, 133, ${m.life * 0.85})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.life * 0.98})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ============================================================================
    // 3D SPHERICAL PROJECTION PIPELINE
    // ============================================================================
    function project3D(x, y, z, cx, cy) {
      const fov = 850;

      // 1. Continuous Serene Yaw Flow (Summer -> Autumn -> Winter -> Spring -> Summer)
      const cosY = Math.cos(celestialYaw);
      const sinY = Math.sin(celestialYaw);
      const x1 = x * cosY + z * sinY;
      const y1 = y;
      const z1 = -x * sinY + z * cosY;

      // 2. Earth Axial Tilt & Nutation
      const cosP = Math.cos(celestialPitch);
      const sinP = Math.sin(celestialPitch);
      const x2 = x1;
      const y2 = y1 * cosP - z1 * sinP;
      const z2 = y1 * sinP + z1 * cosP;

      // 3. Precession Wave (Roll)
      const cosR = Math.cos(celestialRoll);
      const sinR = Math.cos(celestialRoll);
      const x3 = x2 * cosR - y2 * sinR;
      const y3 = x2 * sinR + y2 * cosR;
      const z3 = z2;

      // 4. Subtle Parallax Gyro
      const gyroX = x3 + (mouse.smoothX - cx) * 0.04;
      const gyroY = y3 + (mouse.smoothY - cy) * 0.04;
      const depth = z3 + fov;

      if (depth < 80.0) return null;

      const scale = fov / depth;
      const sx = cx + gyroX * scale;
      const sy = cy + gyroY * scale;

      const R = getSphereRadius();
      const alpha = Math.max(0.0, Math.min(1.0, (z3 + R * 0.45) / (R * 1.05)));

      return { sx, sy, scale, alpha, z: z3 };
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameRequested = false;
    function scheduleFrame() {
      if (frameRequested || document.hidden || reduceMotion.matches) return;
      frameRequested = true;
      requestAnimationFrame(function () { frameRequested = false; renderCanvas(); });
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) scheduleFrame(); });

    function initCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      CONSTELLATIONS_3D = build3DConstellations();
      initAmbient3D();
    }

    // ============================================================================
    // MAIN RENDER LOOP
    // ============================================================================
    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeAccumulator += dt;

      // Camera Yaw Progression (Continuous Flow: Summer -> Autumn -> Winter -> Spring -> Summer)
      if (targetYaw !== null) {
        let diff = targetYaw - celestialYaw;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        celestialYaw += diff * 4.2 * dt;
        if (Math.abs(diff) < 0.005) {
          celestialYaw = targetYaw;
          targetYaw = null;
        }
      } else {
        // Stately continuous orbital flow (~360s per full cycle)
        celestialYaw += 0.018 * dt;
        if (celestialYaw >= 6.28318) celestialYaw -= 6.28318;
      }

      // Organic dual-frequency nutation & precession
      celestialPitch = 0.36 + 0.04 * Math.sin(timeAccumulator * 0.015) + 0.02 * Math.cos(timeAccumulator * 0.008);
      celestialRoll = 0.04 * Math.cos(timeAccumulator * 0.012) + 0.015 * Math.sin(timeAccumulator * 0.006);

      mouse.smoothX += (mouse.targetX - mouse.smoothX) * 0.05;
      mouse.smoothY += (mouse.targetY - mouse.smoothY) * 0.05;

      const cx = width * 0.5;
      const cy = height * 0.36 - (scrollY * 0.08);

      // Deep Cosmic Gold, Emerald & Rose Nebula Background Gases
      const bgGrad1 = ctx.createRadialGradient(cx - 360, cy - 180, 100, cx - 360, cy - 180, 950);
      bgGrad1.addColorStop(0, 'rgba(245, 158, 11, 0.038)');
      bgGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGrad1;
      ctx.fillRect(0, 0, width, height);

      const bgGrad2 = ctx.createRadialGradient(cx + 420, cy + 220, 100, cx + 420, cy + 220, 1000);
      bgGrad2.addColorStop(0, 'rgba(16, 185, 129, 0.028)');
      bgGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGrad2;
      ctx.fillRect(0, 0, width, height);

      const bgGrad3 = ctx.createRadialGradient(cx, cy + 380, 80, cx, cy + 380, 800);
      bgGrad3.addColorStop(0, 'rgba(244, 63, 94, 0.025)');
      bgGrad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGrad3;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw 1,850 Ambient Stardust Particles (Vibrant Multi-Color Field Behind All Menus)
      for (let i = 0; i < ambient3D.length; i++) {
        const a = ambient3D[i];
        a.pulse += a.pulseSpeed;
        if (a.pulse > 6.28) a.pulse -= 6.28;

        const proj = project3D(a.x, a.y, a.z, cx, cy);
        if (proj && proj.alpha > 0.03) {
          const color = STAR_COLORS[a.color];
          const twinkle = 0.80 + 0.40 * Math.sin(a.pulse);
          const r = Math.max(0.85, a.r * proj.scale * twinkle);
          const starAlpha = Math.min(0.96, proj.alpha * (0.62 + 0.38 * Math.sin(a.pulse)));

          // Soft radiant corona for prominent background stars
          if (r > 1.8 && starAlpha > 0.25) {
            const glowR = r * 3.4;
            const grad = ctx.createRadialGradient(proj.sx, proj.sy, 0, proj.sx, proj.sy, glowR);
            grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${starAlpha * 0.50})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(proj.sx, proj.sy, glowR, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${starAlpha})`;
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Update and Draw Shooting Stars
      updateAndDrawMeteors(dt);

      // 3. Render 31 Flowing Geometric Constellations (Seamless Behind All Menus & Sections)
      for (let c = 0; c < CONSTELLATIONS_3D.length; c++) {
        const con = CONSTELLATIONS_3D[c];
        const center = con.center;

        const projectedStars = [];
        let avgZ = 0;
        let avgX = 0;
        let avgY = 0;

        for (let s = 0; s < con.stars.length; s++) {
          const star = con.stars[s];
          const wx = center.x + star.dx * center.ux + star.dy * center.vx;
          const wy = center.y + star.dx * center.uy + star.dy * center.vy;
          const wz = center.z + star.dx * center.uz + star.dy * center.vz;

          const proj = project3D(wx, wy, wz, cx, cy);
          if (proj) {
            star.pulse += 0.020;
            if (star.pulse > 6.28) star.pulse -= 6.28;

            projectedStars.push({ ...proj, star });
            avgZ += proj.z;
            avgX += proj.sx;
            avgY += proj.sy;
          }
        }

        // Must have all or virtually all stars projected
        if (projectedStars.length < con.stars.length - 1 || projectedStars.length < 2) continue;
        avgZ /= projectedStars.length;
        avgX /= projectedStars.length;
        avgY /= projectedStars.length;

        const R = getSphereRadius();

        // Smooth Celestial Depth Alpha — Wide FOV to bring multiple constellations into view
        const depthNorm = Math.max(0.0, Math.min(1.0, (avgZ + R * 0.65) / (R * 1.30)));
        const depthFade = 0.5 - 0.5 * Math.cos(depthNorm * Math.PI);
        if (depthFade < 0.015) continue;

        const conAlpha = depthFade;
        if (conAlpha < 0.025) continue;

        // Draw Constellation Connection Lines (Pure, elegant, luminous 1.45px)
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.45;
        for (let l = 0; l < con.lines.length; l++) {
          const [iA, iB] = con.lines[l];
          const pA = projectedStars[iA];
          const pB = projectedStars[iB];
          if (pA && pB) {
            ctx.beginPath();
            ctx.moveTo(pA.sx, pA.sy);
            ctx.lineTo(pB.sx, pB.sy);

            if (con.season === "WINTER") {
              ctx.strokeStyle = `rgba(254, 240, 138, ${conAlpha * 0.90})`;
            } else if (con.season === "SPRING") {
              ctx.strokeStyle = `rgba(52, 211, 153, ${conAlpha * 0.88})`;
            } else if (con.season === "SUMMER") {
              ctx.strokeStyle = `rgba(251, 191, 36, ${conAlpha * 0.90})`;
            } else if (con.season === "AUTUMN") {
              ctx.strokeStyle = `rgba(251, 113, 133, ${conAlpha * 0.90})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${conAlpha * 0.90})`;
            }
            ctx.stroke();
          }
        }

        // Draw Constellation Stars (Pure, spherical luminous coronas)
        for (let s = 0; s < projectedStars.length; s++) {
          const p = projectedStars[s];
          const star = p.star;

          const color = STAR_COLORS[star.color] || STAR_COLORS[0];
          const r = Math.max(1.2, star.r * p.scale * (0.85 + 0.3 * Math.sin(star.pulse)));
          const starAlpha = Math.min(1.0, conAlpha * 1.15);

          // Soft Glowing Radial Corona for Primary Stars
          if (star.r >= 3.2 && starAlpha > 0.12) {
            const glowR = r * 4.6;
            const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, glowR);
            grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${starAlpha * 0.78})`);
            grad.addColorStop(0.35, `rgba(${color.r}, ${color.g}, ${color.b}, ${starAlpha * 0.25})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, glowR, 0, Math.PI * 2);
            ctx.fill();
          }

          // Solid Star Core
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${starAlpha})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(1.2, r), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      scheduleFrame();
    }

    // Window & Viewport Listeners
    window.addEventListener('resize', function () { initCanvas(); if (reduceMotion.matches) renderCanvas(); });
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY || 0;
    });
    window.addEventListener('mousemove', e => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    });
    // Direct channel controller (builds the mailto address at click time)
    function getCleanAddress() {
      const u = 'ethan';
      const d = 'twu.software';
      return u + '@' + d;
    }

    function primeEmailLink(el) {
      if (el && !el.dataset.primed) {
        el.href = 'mailto:' + getCleanAddress();
        el.dataset.primed = 'true';
      }
    }

    function openDirectChannel(e) {
      if (e) e.preventDefault();
      const addr = getCleanAddress();
      const label = document.getElementById('email-label');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).catch(() => {});
      }
      if (label) {
        label.textContent = 'Copied to clipboard · Launching mail...';
        setTimeout(() => {
          label.textContent = 'ethan@twu.software';
        }, 3200);
      }
      window.location.href = 'mailto:' + addr;
    }

    // ============================================================================
    // CAPABILITY MATRIX WORKSTATION CONTROLLER
    // ============================================================================
    const CAPABILITIES = [
      {
        channel: "Custom software",
        tag: "Services · Custom software",
        title: "Custom Internal Tools",
        body: "Internal tools built around how your operation actually runs, for example scheduling, inventory and client registries, designed to work offline first. There is no paid client work yet; source code and documentation would be delivered under the terms of your agreement.",
        badges: ["Local-native", "Offline-first", "Source per agreement"],
        specs: [
          { key: "EXECUTION RUNTIME", val: "Local native / offline-capable", color: "cyan" },
          { key: "DATA RESIDENCY", val: "On-premise by default", color: "green" },
          { key: "RECURRING FEES", val: "No per-seat licensing (offer)", color: "green" },
          { key: "SOURCE CODE", val: "Per your agreement", color: "violet" }
        ],
        actionText: "Discuss a project →",
        actionLink: "#contact"
      },
      {
        channel: "Private AI (prototype)",
        tag: "Services · Private AI (prototype)",
        title: "Private On-Premise AI",
        body: "We have working prototypes: a local agent that runs a 20B-parameter open-weight model on a laptop with an 8 GB GPU by splitting layers between CPU and GPU, and a document search tool designed to show the source page behind each answer. They are prototypes, not delivered products. We will say plainly what a model can and cannot do on your hardware before you commit.",
        badges: ["Prototype", "Runs locally", "Designed offline-first"],
        specs: [
          { key: "INFERENCE ENGINE", val: "Local GPU / CPU split", color: "cyan" },
          { key: "CLOUD DEPENDENCY", val: "Designed to run offline", color: "green" },
          { key: "API BILLING", val: "Designed with no per-token fees", color: "green" },
          { key: "ANSWER TRACE", val: "Designed to show source page", color: "violet" }
        ],
        actionText: "Discuss private AI →",
        actionLink: "#contact"
      },
      {
        channel: "On-site IT",
        tag: "Services · On-site IT",
        title: "On-Site Systems & IT in Mesa",
        body: "Hands-on engineering for real machines: workstation hardware troubleshooting, local networks, automated backups, and Linux and multi-machine maintenance for small businesses and offices. There are no paying IT customers yet. We document each change so it can be repeated and checked.",
        badges: ["Mesa and East Valley", "Hands-on", "Documented changes"],
        specs: [
          { key: "SERVICE AREA", val: "Mesa & Phoenix East Valley", color: "cyan" },
          { key: "HARDWARE", val: "Hardware troubleshooting", color: "green" },
          { key: "BACKUPS", val: "Automated backup setup", color: "green" },
          { key: "CHANGE RECORD", val: "Documented changes", color: "violet" }
        ],
        actionText: "Ask about on-site IT →",
        actionLink: "#contact"
      },
      {
        channel: "Workshops",
        tag: "Services · Workshops",
        title: "Workshops & Community Training",
        body: "Practical technical education that demystifies computers and AI: spotting phishing, protecting personal financial data, and making your own small tools. No classes have been delivered yet; a first set is in discussion with a local library and nothing is booked.",
        badges: ["Hands-on", "In person", "Beginner-friendly"],
        specs: [
          { key: "FORMAT", val: "In-person, hands-on", color: "cyan" },
          { key: "CURRICULUM", val: "Scam defense & local AI", color: "green" },
          { key: "AUDIENCE", val: "Beginners, students & seniors", color: "green" },
          { key: "PREREQUISITES", val: "No experience required", color: "violet" }
        ],
        actionText: "Ask about workshops →",
        actionLink: "#contact"
      }
    ];

    let currentCapabilityIndex = 0;
    function selectCapability(index) {
      if (index < 0 || index >= CAPABILITIES.length) return;
      currentCapabilityIndex = index;

      const items = document.querySelectorAll('.cap-item');
      items.forEach((item, i) => {
        const pill = item.querySelector('.cap-status-pill');
        if (i === index) {
          item.classList.add('active'); item.setAttribute('aria-pressed','true');
          if (pill) pill.textContent = 'VIEWING';
        } else {
          item.classList.remove('active'); item.setAttribute('aria-pressed','false');
          if (pill) pill.textContent = 'OFFERED';
        }
      });

      const pane = document.getElementById('inspector');
      if (pane) {
        pane.classList.add('swapping');
        setTimeout(() => {
          const cap = CAPABILITIES[index];
          const wsModId = document.getElementById('ws-module-id');
          const insTag = document.getElementById('ins-tag');
          const insTitle = document.getElementById('ins-title');
          const insBody = document.getElementById('ins-body');
          const insBadges = document.getElementById('ins-badges');
          const insSpecs = document.getElementById('ins-specs');
          const insAction = document.getElementById('ins-action');

          if (wsModId) wsModId.textContent = cap.channel;
          if (insTag) insTag.textContent = cap.tag;
          if (insTitle) insTitle.textContent = cap.title;
          if (insBody) insBody.textContent = cap.body;

          if (insBadges) {
            insBadges.innerHTML = cap.badges.map(b => `<span class="ins-chip">${b}</span>`).join('');
          }

          if (insSpecs) {
            insSpecs.innerHTML = cap.specs.map(s => `
              <div>
                <div class="spec-key">${s.key}</div>
                <div class="spec-val ${s.color}">${s.val}</div>
              </div>
            `).join('');
          }

          if (insAction) {
            insAction.textContent = cap.actionText;
            insAction.href = cap.actionLink;
          }

          pane.classList.remove('swapping');
        }, 120);
      }
    }

    // Launch Engine
    initCanvas();
    renderCanvas();

    // ---- Event wiring (no inline handlers; keeps the CSP free of 'unsafe-inline' for scripts)
    document.querySelectorAll('.cap-item').forEach(function (el) {
      el.addEventListener('click', function () { selectCapability(parseInt(el.dataset.index, 10)); });
      el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); el.setAttribute('aria-pressed', el.classList.contains('active') ? 'true' : 'false'); el.setAttribute('aria-controls', 'inspector');
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCapability(parseInt(el.dataset.index, 10)); } });
    });
    (function () {
      var btn = document.getElementById('contact-email-btn');
      if (!btn) return;
      btn.addEventListener('click', openDirectChannel);
      btn.addEventListener('mouseenter', function () { primeEmailLink(btn); });
      btn.addEventListener('focus', function () { primeEmailLink(btn); });
      btn.setAttribute('role', 'button');
      btn.addEventListener('touchstart', function () { primeEmailLink(btn); }, { passive: true });
    })();

    // ---- Receipts: this page audits itself from /claims.json (same origin)
    (function () {
      var list = document.getElementById('receipts-list'), sum = document.getElementById('receipts-summary');
      if (!list || !sum) return;
      var LABEL = { VERIFIED: 'MATCHED', PLAN: 'PLAN', UNVERIFIED: 'NOT YET MATCHED', FAILED: 'FAILED', STALE: 'STALE' };
      fetch('claims.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
        sum.textContent = d.verified + ' statements matched to company records by script · ' + d.plan + ' plans (not claims of fact) · ' + d.unverified + ' not yet matched to a record, labeled · ' + d.failed + ' failed · checked ' + d.checked;
        var frag = document.createDocumentFragment();
        d.claims.slice(0, 80).forEach(function (c) {
          var li = document.createElement('li'), tag = document.createElement('span');
          tag.className = 'tag ' + (c.status === 'VERIFIED' ? 'ok' : c.status === 'PLAN' ? 'plan' : 'warn');
          tag.textContent = LABEL[c.status] || c.status;
          li.appendChild(tag);
          var tp = document.createElement('span'); tp.className = 'topic'; tp.textContent = c.topic || ''; li.appendChild(tp);
          li.appendChild(document.createTextNode(c.claim));
          var src = document.createElement('span'); src.className = 'src'; src.textContent = c.source; li.appendChild(src);
          frag.appendChild(li);
        });
        list.appendChild(frag);
        if (d.claims.length > 80) { var more = document.createElement('li'); more.textContent = 'Showing 80 of ' + d.claims.length + '. See claims.json for the full list.'; list.appendChild(more); }
      }).catch(function () {
        sum.textContent = '';
        sum.appendChild(document.createTextNode('The log could not be loaded. '));
        var a = document.createElement('a'); a.href = 'claims.json'; a.textContent = 'Open claims.json directly'; sum.appendChild(a);
      });
    })();
