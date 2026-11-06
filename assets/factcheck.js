(function () {
  var sum = document.getElementById('fc-summary'), wrap = document.getElementById('fc-groups');
  if (!sum || !wrap) return;
  var LABEL = { VERIFIED: 'MATCHED', PLAN: 'PLAN', UNVERIFIED: 'NOT YET MATCHED', FAILED: 'FAILED', STALE: 'STALE' };
  fetch('/claims.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    sum.textContent = d.verified + ' matched to company records · ' + d.plan + ' plans (not claims of fact) · ' + d.unverified + ' not yet matched to a record · ' + d.failed + ' failed · checked ' + d.checked;
    var groups = {};
    d.claims.forEach(function (c) { (groups[c.topic || 'Other'] = groups[c.topic || 'Other'] || []).push(c); });
    Object.keys(groups).sort().forEach(function (topic) {
      var sec = document.createElement('section'); sec.className = 'fc-group';
      var h = document.createElement('h2'); h.textContent = topic; sec.appendChild(h);
      var ul = document.createElement('ul'); ul.className = 'fc-list';
      groups[topic].forEach(function (c) {
        var li = document.createElement('li'), tag = document.createElement('span');
        tag.className = 'fc-tag ' + (c.status === 'VERIFIED' ? 'ok' : c.status === 'PLAN' ? 'plan' : 'warn');
        tag.textContent = LABEL[c.status] || c.status;
        li.appendChild(tag); li.appendChild(document.createTextNode(c.claim));
        var src = document.createElement('span'); src.className = 'src'; src.textContent = c.source; li.appendChild(src);
        ul.appendChild(li);
      });
      sec.appendChild(ul); wrap.appendChild(sec);
    });
  }).catch(function () {
    sum.textContent = '';
    sum.appendChild(document.createTextNode('The log could not be loaded. '));
    var a = document.createElement('a'); a.href = '/claims.json'; a.textContent = 'Open claims.json directly'; sum.appendChild(a);
  });
})();
