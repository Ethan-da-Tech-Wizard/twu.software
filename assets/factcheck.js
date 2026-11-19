// ==============================================================================
// Program: factcheck.js
// Programmer: Ethan-da-Tech-Wizard
// Last Modified: November 18, 2026
// Purpose: Interactive fact-checking ledger viewer and verification claim search utility.
// ==============================================================================

// How this file fits the site: loaded (deferred) only by fact-check.html. It fetches /claims.json (the machine-written audit
// of every factual statement on the site) and renders it into #fc-summary (one status line) and #fc-groups (one section per topic).
// No other script calls it and it exposes nothing globally: everything is wrapped in an immediately-invoked function so the
// variables below cannot collide with other scripts.
// Input: claims.json = {verified, plan, unverified, failed, checked, claims:[{claim, status, topic, source}]}.
// Status values: VERIFIED (matched to company records), PLAN (a plan, not a statement of fact), UNVERIFIED, FAILED, STALE.
// Security: all text is inserted with textContent / createTextNode, never innerHTML, so claim text cannot inject markup.
// Style note: ES5 syntax (var, function) is used on purpose so the page works in very old browsers.
(function () {
  // Look up the two mount points; the script quietly does nothing if it is included on a page that lacks them.
  var sum = document.getElementById('fc-summary'), wrap = document.getElementById('fc-groups');
  if (!sum || !wrap) return;

  // Maps raw status codes to the wording shown to readers. The softer "NOT YET MATCHED" avoids implying that an unmatched statement is false.
  var LABEL = { VERIFIED: 'MATCHED', PLAN: 'PLAN', UNVERIFIED: 'NOT YET MATCHED', FAILED: 'FAILED', STALE: 'STALE' };

  // no-cache makes the browser revalidate, so a freshly regenerated claims.json is shown instead of a stale copy. A non-2xx answer is turned into an error so it takes the same path as a network failure (the catch block at the end).
  fetch('/claims.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    // Summary line with counts and the date of the last automated check.
    sum.textContent = d.verified + ' matched to company records · ' + d.plan + ' plans (not claims of fact) · ' + d.unverified + ' not yet matched to a record · ' + d.failed + ' failed · checked ' + d.checked;

    // Group claims by topic: `groups` maps topic name -> array of claims; claims without a topic go under "Other".
    var groups = {};
    d.claims.forEach(function (c) { (groups[c.topic || 'Other'] = groups[c.topic || 'Other'] || []).push(c); });

    // Sorted alphabetically so the page order is stable between runs. For each topic: a <section class="fc-group"> with an <h2> and a <ul class="fc-list">.
    Object.keys(groups).sort().forEach(function (topic) {
      var sec = document.createElement('section'); sec.className = 'fc-group';
      var h = document.createElement('h2'); h.textContent = topic; sec.appendChild(h);
      var ul = document.createElement('ul'); ul.className = 'fc-list';
      groups[topic].forEach(function (c) {
        var li = document.createElement('li'), tag = document.createElement('span');

        // Colour class: green for VERIFIED, gold for PLAN, rose for everything else (so UNVERIFIED, FAILED and STALE all look like warnings).
        tag.className = 'fc-tag ' + (c.status === 'VERIFIED' ? 'ok' : c.status === 'PLAN' ? 'plan' : 'warn');

        // Fall back to the raw status text if a new status appears that LABEL does not know yet.
        tag.textContent = LABEL[c.status] || c.status;
        li.appendChild(tag); li.appendChild(document.createTextNode(c.claim));

        // Source line (where the claim appears or what record it was checked against), styled small and monospace by .src.
        var src = document.createElement('span'); src.className = 'src'; src.textContent = c.source; li.appendChild(src);
        ul.appendChild(li);
      });
      sec.appendChild(ul); wrap.appendChild(sec);
    });

  // Any failure (network, HTTP error, invalid JSON) ends here: show a plain message and a link to the raw file instead of an empty page.
  }).catch(function () {
    sum.textContent = '';
    sum.appendChild(document.createTextNode('The log could not be loaded. '));
    var a = document.createElement('a'); a.href = '/claims.json'; a.textContent = 'Open claims.json directly'; sum.appendChild(a);
  });
})();
