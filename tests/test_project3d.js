// tests/test_project3d.js
//
// Regression test for project3D's roll rotation: sinR was computed with Math.cos, which turned the intended
// slight twist into a ~45 degree turn plus ~1.41x scale. A real rotation preserves distance from the centre;
// the test checks that on a point with no yaw/pitch/parallax. Run: node tests/test_project3d.js
"use strict";

const assert = require("assert");
const { extract } = require("./extract");

/** Projects (x,y,z) with the given roll and returns the screen offset from the centre (cx,cy). */
function offset(x, y, z, roll) {
    const cx = 500, cy = 400;
    const sandbox = {
        celestialYaw: 0,
        celestialPitch: 0,
        celestialRoll: roll,
        // Pointer exactly at the centre so the parallax term (smooth - centre) * 0.04 is zero.
        mouse: { smoothX: cx, smoothY: cy },
        getSphereRadius: () => 1000,
        Math,
    };
    const p = extract("project3D", sandbox)(x, y, z, cx, cy);
    return { dx: p.sx - cx, dy: p.sy - cy, scale: p.scale };
}

// Scenario 1: with roll = 0 the picture must be untouched (x stays x, y stays y). The bug gave (x - y, x + y).
let o = offset(100, 0, 0, 0);
assert.ok(Math.abs(o.dx - 100) < 1e-9 && Math.abs(o.dy) < 1e-9, `roll 0 must be identity, got ${o.dx}, ${o.dy}`);

// Scenario 2: the shipped roll (0.04 rad) moves the point by a ~2.3 degree turn at the same distance.
o = offset(100, 0, 0, 0.04);
assert.ok(Math.abs(Math.hypot(o.dx, o.dy) - 100) < 1e-9, `rotation must preserve length, got ${Math.hypot(o.dx, o.dy)}`);
assert.ok(Math.abs(o.dy - 100 * Math.sin(0.04)) < 1e-9, "y offset must equal x * sin(roll)");

// Scenario 3: a larger roll still preserves length (general rotation, not a special case of small angles).
o = offset(60, 80, 0, 0.5);
assert.ok(Math.abs(Math.hypot(o.dx, o.dy) - 100) < 1e-9);

console.log("PASS test_project3d");
