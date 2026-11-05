/* KodHane — kurgusal kod barındırma platformu */
'use strict';
(function () {
  const { accounts, repos } = window.KH;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const trLower = s => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
  const LANG = { Shell: '#89e051', Python: '#3572A5', 'C#': '#178600', Go: '#00ADD8', TypeScript: '#3178c6', 'Jupyter Notebook': '#DA5B0B', Markdown: '#083fa1', Kotlin: '#A97BFF' };
  const ident = h => { let x = 0; for (const c of h) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };

  function identicon(h, size) {
    const n = ident(h), hue = n % 360; let cells = '';
    for (let y = 0; y < 5; y++) for (let x = 0; x < 3; x++) if ((n >> (y * 3 + x)) & 1) {
      cells += `<rect x="${x}" y="${y}" width="1" height="1"/>` + (x < 2 ? `<rect x="${4 - x}" y="${y}" width="1" height="1"/>` : '');
    }
    return `<svg class="idn" style="width:${size}px;height:${size}px" viewBox="-0.5 -0.5 6 6"><rect x="-.5" y="-.5" width="6" height="6" fill="#eef1f4"/><g fill="hsl(${hue} 55% 50%)">${cells}</g></svg>`;
  }

  function repoCard(full) {
    const r = repos[full]; const [, name] = full.split('/');
    return `<a class="rcard" href="#/${full}"><b>${name}</b><p>${esc(r.desc)}</p>
      <span class="rmeta"><i style="background:${LANG[r.lang] || '#888'}"></i>${r.lang} · ★ ${r.stars} · güncellendi ${r.updated}</span></a>`;
  }

  function hoursChart(hours) {
    const max = Math.max(...hours);
    return `<div class="hours" aria-label="Saate göre commit dağılımı">${hours.map((v, i) =>
      `<span title="${String(i).padStart(2, '0')}:00 — ${v} commit" style="height:${Math.max(3, (v / max) * 100)}%"></span>`).join('')}</div>
      <div class="hours-axis"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>`;
  }

  /* ---------------- görünümler */
  function viewHome() {
    return `<section class="khero"><h1>Kod nerede, iz orada.</h1><p>KodHane'de kullanıcı, organizasyon ve depo ara.</p>
      <form class="ksearch" id="sform"><input id="sq" type="search" placeholder="Örn. kullanıcı adı, depo adı…" aria-label="Ara" autocomplete="off"><button>Ara</button></form></section>
      <section class="trend"><h2>Öne çıkan depolar</h2><div class="rgrid">${['nightbuild/nightly-runner', 'mertcan-dev/compose-ornekleri', 'kirkindi/son-tanik-presskit'].map(repoCard).join('')}</div></section>`;
  }

  function viewSearch(q) {
    const n = trLower(q.replace(/^@/, ''));
    const acc = Object.keys(accounts).filter(h => [h, accounts[h].name, accounts[h].bio].some(s => trLower(s).includes(n)));
    const rep = Object.keys(repos).filter(k => trLower(k.split('/')[1]).includes(n) || trLower(repos[k].desc).includes(n));
    return `<form class="ksearch inline" id="sform"><input id="sq" type="search" value="${esc(q)}" aria-label="Ara" autocomplete="off"><button>Ara</button></form>
      <h2 class="sh">Hesaplar <span>${acc.length}</span></h2>
      <div class="alist">${acc.length ? acc.map(h => { const a = accounts[h]; return `<a class="arow" href="#/${h}">${identicon(h, 44)}
        <span><b>${h}</b> <em>${a.type === 'org' ? 'organizasyon' : esc(a.name)}</em><small>${esc(a.bio)}</small><small class="loc">📍 ${esc(a.location)} · katılım ${a.joined}</small></span></a>`; }).join('')
        : '<p class="empty">Eşleşen hesap yok.</p>'}</div>
      <h2 class="sh">Depolar <span>${rep.length}</span></h2>
      <div class="rgrid">${rep.length ? rep.map(repoCard).join('') : '<p class="empty">Eşleşen depo yok.</p>'}</div>`;
  }

  function viewAccount(h) {
    const a = accounts[h]; if (!a) return viewMissing();
    const side = `<aside class="side">${identicon(h, 220)}
      <h1>${a.type === 'org' ? esc(a.name) : esc(a.name)}<small>${h}</small></h1>
      <p class="bio">${esc(a.bio)}</p>
      <ul class="facts">
        ${a.type === 'user' ? `<li>👥 <b>${a.followers}</b> takipçi · <b>${a.following}</b> takip</li>` : '<li>🏢 Organizasyon</li>'}
        <li>📍 ${esc(a.location)}</li>
        ${a.website ? `<li>🔗 <a href="${a.website.href}">${esc(a.website.label)}</a></li>` : ''}
        <li>🗓 Katılım: ${a.joined}</li>
      </ul></aside>`;
    return `<div class="acc">${side}<section class="main">
      ${a.type === 'org' ? `<div class="note">👥 ${esc(a.members)}</div>` : ''}
      <h2 class="sh">Depolar <span>${a.repos.length}</span></h2>
      <div class="rgrid">${a.repos.map(r => repoCard(h + '/' + r)).join('')}</div>
      ${a.hours ? `<h2 class="sh">Commit saatleri <span>son 12 ay</span></h2>${hoursChart(a.hours)}` : ''}
    </section></div>`;
  }

  function viewRepo(full) {
    const r = repos[full]; if (!r) return viewMissing();
    const [owner, name] = full.split('/');
    return `<div class="crumb">${identicon(owner, 22)} <a href="#/${owner}">${owner}</a> / <b>${name}</b></div>
      <p class="rdesc">${esc(r.desc)}</p>
      <div class="repo">
        <div>
        ${r.files ? `<section class="files"><h3>Dosyalar</h3><ul>${Object.keys(r.files).map(f => `<li><a href="#/${full}/f/${encodeURIComponent(f)}">📄 ${esc(f)}</a></li>`).join('')}</ul></section>` : ''}
        <section class="readme"><h3>README.md</h3><div class="md">${r.readme}</div></section>
        </div>
        <section class="commits"><h3>Commit geçmişi</h3><ol>${r.commits.map(([d, sha, msg]) =>
          `<li><code>${sha}</code><span>${esc(msg)}</span><time>${d}</time><small>${owner}</small></li>`).join('')}</ol></section>
      </div>`;
  }
  function viewFile(full, f) {
    const r = repos[full]; if (!r || !r.files || !(f in r.files)) return viewMissing();
    const [owner, name] = full.split('/');
    const lines = r.files[f].replace(/\n$/, '').split('\n');
    return `<div class="crumb">${identicon(owner, 22)} <a href="#/${owner}">${owner}</a> / <a href="#/${full}">${name}</a> / <b>${esc(f)}</b></div>
      <section class="readme code"><h3>${esc(f)} <span>${lines.length} satır</span></h3>
      <pre class="src">${lines.map((l, i) => `<span class="ln">${i + 1}</span>${esc(l)}`).join('\n')}</pre></section>`;
  }
  function viewMissing() { return `<p class="empty big">404 — Böyle bir hesap ya da depo yok. <a href="#/">Ana sayfa</a></p>`; }

  /* ---------------- yönlendirme */
  function route() {
    const h = decodeURIComponent(location.hash.slice(1) || '/');
    const p = h.split('/').filter(Boolean);
    let html;
    if (!p.length) html = viewHome();
    else if (p[0] === 'ara') html = viewSearch(p.slice(1).join('/'));
    else if (p.length === 1) html = viewAccount(p[0]);
    else if (p[2] === 'f') html = viewFile(p[0] + '/' + p[1], p.slice(3).join('/'));
    else html = viewRepo(p[0] + '/' + p[1]);
    $('#view').innerHTML = html;
    document.title = p.length && p[0] !== 'ara' ? `${p.join('/')} · KodHane` : 'KodHane';
    const f = $('#sform');
    if (f) f.addEventListener('submit', e => { e.preventDefault(); const q = $('#sq').value.trim(); if (q) location.hash = '#/ara/' + encodeURIComponent(q); });
    window.scrollTo(0, 0);
  }
  $('#topsearch').addEventListener('submit', e => { e.preventDefault(); const q = $('#tq').value.trim(); if (q) location.hash = '#/ara/' + encodeURIComponent(q); });
  window.addEventListener('hashchange', route);
  route();
})();
