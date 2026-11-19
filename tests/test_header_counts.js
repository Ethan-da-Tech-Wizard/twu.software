// tests/test_header_counts.js
//
// Guards against the header/comments of assets/site.js quoting a different number of constellations or
// particles than the code builds (they once said 31 and 950 while the code built 29 and 1,850).
// Run: node tests/test_header_counts.js
"use strict";

const assert = require("assert");
const { SOURCE } = require("./extract");

// Truth from the code: one `constellations.push({` per constellation, and the ambient particle loop bound.
const constellations = (SOURCE.match(/constellations\.push\(\{/g) || []).length;
const particles = Number(/for \(let i = 0; i < (\d+); i\+\+\) \{\s*\/\/ Uniform random pair/.exec(SOURCE)[1]);
assert.strictEqual(constellations, 29);
assert.strictEqual(particles, 1850);

// Every number the comments quote next to the words "constellations" / "particles" must match the code.
const comma = (n) => n.toLocaleString("en-US");
const quotedConstellations = [...SOURCE.matchAll(/\b(\d+)\s+(?:Authentic Multi-Star Geometric |CANONICAL GEOMETRIC |Flowing Geometric |)constellations/gi)].map((m) => Number(m[1]));
const quotedParticles = [...SOURCE.matchAll(/\b([\d,]+)\s+(?:ambient multi-depth twinkling |ambient |Ambient |random background )?(?:stardust )?(?:particles|stars)/gi)]
    .map((m) => Number(m[1].replace(/,/g, "")));
for (const n of quotedConstellations) assert.strictEqual(n, constellations, `comment says ${n} constellations, code builds ${constellations}`);
for (const n of quotedParticles) assert.strictEqual(n, particles, `comment says ${n} particles, code builds ${particles}`);
assert.ok(quotedConstellations.length >= 3, "expected the header to quote the constellation count");
assert.ok(quotedParticles.length >= 2, "expected the header to quote the particle count");
console.log(`PASS test_header_counts (${constellations} constellations, ${comma(particles)} particles)`);
