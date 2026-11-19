// tests/test_licensing_header.js
//
// Guards the "Purpose:" block in the header comment of licensing.html: it once described MIT / dual licensing
// while the page is the automated-access (scraping / AI training) notice. Run: node tests/test_licensing_header.js
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "licensing.html"), "utf8");
const header = /^<!--([\s\S]*?)-->/.exec(html)[1];
const purpose = /Purpose:([\s\S]*)$/.exec(header)[1].replace(/\s+/g, " "); // collapse line wraps

// Scenario 1: the purpose says what the page is about (automated access, scraping, AI training, a written license).
for (const word of [/automated access/i, /scraping/i, /AI\s+training/i, /written license/i]) {
    assert.ok(word.test(purpose), `Purpose block should mention ${word}`);
}

// Scenario 2: it may only mention MIT/dual licensing to say the page does NOT grant them.
if (/MIT|dual-?licens/i.test(purpose)) {
    assert.ok(/NOT a software license page/.test(purpose), "MIT/dual mentioned without disclaiming it");
}
assert.ok(!/Clarifies open-source MIT terms/i.test(purpose), "old misleading sentence must be gone");

// Scenario 3: the visible page really is about automated access (so the header and body agree).
assert.ok(/<h1>Automated Access and/.test(html));

console.log("PASS test_licensing_header");
