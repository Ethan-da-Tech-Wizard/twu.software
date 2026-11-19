// tests/extract.js
//
// Purpose: lets node tests run the REAL functions from assets/site.js without a browser. site.js is a classic
// browser script (no exports) whose top level touches the canvas, so it cannot be require()d; this helper
// copies one `function name(...) { ... }` out of the source by brace matching and evaluates it in a vm sandbox
// that the test controls (fake celestial state, mouse, getSphereRadius...).
// Used by: tests/test_*.js. Run a test with `node tests/test_<name>.js` from the repo root.
// Limit: the function may only use globals the test supplies in `sandbox`.
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SOURCE = fs.readFileSync(path.join(__dirname, "..", "assets", "site.js"), "utf8");

/**
 * Extracts and evaluates one top-level (or indented) function from site.js.
 *
 * @param {string} name function name declared as `function name(`.
 * @param {object} sandbox globals the function can see.
 * @returns {Function} the evaluated function.
 */
function extract(name, sandbox) {
    const start = SOURCE.indexOf(`function ${name}(`);
    if (start < 0) throw new Error(`function ${name} not found in site.js`);
    let depth = 0;
    let i = SOURCE.indexOf("{", start);
    for (; i < SOURCE.length; i++) {
        if (SOURCE[i] === "{") depth++;
        else if (SOURCE[i] === "}" && --depth === 0) break;
    }
    const context = vm.createContext(sandbox);
    vm.runInContext(SOURCE.slice(start, i + 1), context);
    return context[name];
}

module.exports = { extract, SOURCE };
