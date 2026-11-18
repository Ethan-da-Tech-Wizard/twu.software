/*
 * Program: twu.software - factcheck.js
 * Programmer: Ethan-da-Tech-Wizard (written with Claude, an AI assistant)
 * Last Modified: 2026-11-18
 * Purpose: Loads /claims.json and builds the fact-check page, showing a summary line and the claims grouped by topic with a status tag and source for each.
 */

// Wrapped in a function so our variables stay private and do not leak onto the page's global scope.
(function () {
  // Find the summary line and the container for the claim groups (ids come from fact-check.html).
  var sum = document.getElementById('fc-summary'), wrap = document.getElementById('fc-groups');
  // If this page does not have those elements, there is nothing to fill, so stop quietly.
  if (!sum || !wrap) return;
  // Maps the status codes used in claims.json to friendlier text shown to visitors.
  var LABEL = { VERIFIED: 'MATCHED', PLAN: 'PLAN', UNVERIFIED: 'NOT YET MATCHED', FAILED: 'FAILED', STALE: 'STALE' };
  // Download the claims file (no-cache so visitors always see the newest log), check it loaded, then parse it as JSON.
  fetch('/claims.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    // Write the one-line summary of how many claims are in each status.
    sum.textContent = d.verified + ' matched to company records · ' + d.plan + ' plans (not claims of fact) · ' + d.unverified + ' not yet matched to a record · ' + d.failed + ' failed · checked ' + d.checked;
    // Group the claims by topic; a claim with no topic goes under 'Other'.
    var groups = {};
    // For each claim, make sure its topic's list exists, then add the claim to it.
    d.claims.forEach(function (c) { (groups[c.topic || 'Other'] = groups[c.topic || 'Other'] || []).push(c); });
    // Build one section per topic, in alphabetical order.
    Object.keys(groups).sort().forEach(function (topic) {
      // Create the section box and its heading.
      var sec = document.createElement('section'); sec.className = 'fc-group';
      var h = document.createElement('h2'); h.textContent = topic; sec.appendChild(h);
      // Create the bulleted list that will hold this topic's claims.
      var ul = document.createElement('ul'); ul.className = 'fc-list';
      // Add one list item per claim.
      groups[topic].forEach(function (c) {
        // Each item has a colored status tag; matched = ok, plan = plan, anything else = warn style.
        var li = document.createElement('li'), tag = document.createElement('span');
        tag.className = 'fc-tag ' + (c.status === 'VERIFIED' ? 'ok' : c.status === 'PLAN' ? 'plan' : 'warn');
        tag.textContent = LABEL[c.status] || c.status;
        // Add the tag, the claim text, then a small span naming the source (textContent is used, so text is never treated as HTML).
        li.appendChild(tag); li.appendChild(document.createTextNode(c.claim));
        var src = document.createElement('span'); src.className = 'src'; src.textContent = c.source; li.appendChild(src);
        ul.appendChild(li);
      });
      // Put the finished list in the section and the section on the page.
      sec.appendChild(ul); wrap.appendChild(sec);
    });
  // If the download or parsing failed, show a helpful message instead of an empty page.
  }).catch(function () {
    sum.textContent = '';
    sum.appendChild(document.createTextNode('The log could not be loaded. '));
    // Offer a link so the visitor can open the raw file themselves.
    var a = document.createElement('a'); a.href = '/claims.json'; a.textContent = 'Open claims.json directly'; sum.appendChild(a);
  });
})();
