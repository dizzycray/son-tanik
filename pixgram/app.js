/* Pixgram — kurgusal sosyal ağ (istemci tarafı yönlendirme) */
'use strict';
(function () {
  const { users, posts } = window.PX;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const trLower = s => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
  const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const fmtDate = (d, t) => { const [y, m, g] = d.split('-').map(Number); return `${g} ${MONTHS[m - 1]} ${y}${t ? ' · ' + t : ''}`; };

  /* ---------------- görseller (SVG) */
  const svg = (inner, bg = '#111') => `<svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" role="img"><rect width="1080" height="1080" fill="${bg}"/>${inner}</svg>`;
  const IMG = {
    hello: () => svg(`<circle cx="540" cy="460" r="200" fill="none" stroke="#e7b04b" stroke-width="14"/>
      <path d="M470 480 a110 110 0 1 0 160 -110 a90 90 0 1 1 -160 110z" fill="#e7b04b"/>
      <text x="540" y="790" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="92" fill="#e7b04b" letter-spacing="14">KIRKİNDİ</text>
      <text x="540" y="860" text-anchor="middle" font-family="Inter,sans-serif" font-size="40" fill="#c7a777" letter-spacing="16">GAME STUDIO · 2023</text>`, '#1a120e'),
    office: () => svg(`<rect y="680" width="1080" height="400" fill="#17130f"/><rect x="80" y="120" width="420" height="380" fill="#0d1626" stroke="#2c3a52" stroke-width="12"/>
      ${[0,1,2,3,4].map(i => `<rect x="${110+i*78}" y="${300+(i%2)*60}" width="50" height="${200-(i%2)*60}" fill="#0a101c"/><rect x="${125+i*78}" y="${330+(i%2)*60}" width="12" height="12" fill="#f2c46b"/>`).join('')}
      <rect x="560" y="560" width="440" height="30" fill="#3b2c22"/><rect x="680" y="420" width="220" height="140" fill="#0d2238" stroke="#2c3442" stroke-width="8"/>
      <ellipse cx="790" cy="560" rx="260" ry="90" fill="#6fb1ff" opacity=".1"/><text x="540" y="1000" text-anchor="middle" font-family="Inter,sans-serif" font-size="44" fill="#9aa3b0">SAMSUN TEKNOPARK · K3</text>`, '#141b26'),
    gm: () => svg(`<rect x="120" y="200" width="840" height="680" rx="30" fill="#0f1319" stroke="#e7b04b" stroke-width="6"/>
      <text x="540" y="360" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="70" fill="#e7b04b" letter-spacing="10">GOLD MASTER</text>
      <text x="540" y="470" text-anchor="middle" font-family="monospace" font-size="64" fill="#e6e2d8">v0.23.17-gm</text>
      <text x="540" y="560" text-anchor="middle" font-family="Courier New,monospace" font-size="54" fill="#e6e2d8">SON TANIK: 23:17</text>
      <text x="540" y="760" text-anchor="middle" font-family="Inter,sans-serif" font-size="36" fill="#9aa3b0">Kırkindi Game Studio · Mart 2026</text>`, '#07090d'),
    notes: () => svg(`<rect x="140" y="140" width="800" height="800" rx="20" fill="#0b1118"/>
      <g font-family="monospace" font-size="38" fill="#9fd6b0"><text x="190" y="240">CHANGELOG.md</text><text x="190" y="330" fill="#6b8aa8">## v0.23.17-gm</text>
      <text x="190" y="400">- fix: kayıt dosyası</text><text x="190" y="450">  bozulması (KRK-231)</text><text x="190" y="540" fill="#6b8aa8">## v0.23.16-rc</text><text x="190" y="610">- rc: bölüm 3</text>
      <text x="190" y="760" fill="#ffcf6b">→ kodhane.dev</text></g>`, '#05080c'),
    team: () => svg(`${[['D','#b5654a',320],['S','#5c7f6a',760]].map(([l,c,x]) => `<circle cx="${x}" cy="440" r="170" fill="${c}"/><text x="${x}" y="500" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="170" fill="#fff" opacity=".9">${l}</text>`).join('')}
      <text x="540" y="820" text-anchor="middle" font-family="Inter,sans-serif" font-size="58" fill="#e6e2d8">QA &amp; SES</text><text x="540" y="890" text-anchor="middle" font-family="Inter,sans-serif" font-size="36" fill="#9aa3b0">teşekkürler ekip</text>`, '#12161d'),
    cake: () => svg(`<ellipse cx="540" cy="820" rx="360" ry="60" fill="#2a1f19"/><rect x="220" y="520" width="640" height="300" rx="30" fill="#5a3726"/>
      <rect x="220" y="520" width="640" height="70" rx="30" fill="#f1ead8"/>${[340,440,540,640,740].map(x => `<rect x="${x-8}" y="420" width="16" height="100" fill="#e7b04b"/><ellipse cx="${x}" cy="405" rx="14" ry="24" fill="#ffcf6b"/>`).join('')}
      <text x="540" y="730" text-anchor="middle" font-family="Caveat,cursive" font-size="130" fill="#f1ead8">M.K.</text>`, '#0f0c0a'),
    badges: () => svg(`<rect width="1080" height="1080" fill="#3a2a1d"/>
      ${[['ELİSA', 'anlatı', '', 120, 170, -6], ['DENİZ', 'test', '', 600, 150, 5], ['M.', 'kod', 'takma ad: nightbuild', 330, 580, -2]].map(([n, r, nick, x, y, rot]) => `
      <g transform="rotate(${rot} ${x+180} ${y+130})"><rect x="${x}" y="${y}" width="360" height="260" rx="16" fill="#f4f1ea"/>
      <rect x="${x}" y="${y}" width="360" height="56" rx="16" fill="#1f3b70"/><rect x="${x}" y="${y+40}" width="360" height="16" fill="#1f3b70"/>
      <text x="${x+180}" y="${y+38}" text-anchor="middle" font-family="Inter,sans-serif" font-size="22" font-weight="700" fill="#fff" letter-spacing="3">GLOBAL GAME JAM 2023</text>
      <text x="${x+28}" y="${y+130}" font-family="Inter,sans-serif" font-weight="800" font-size="62" fill="#1c1c1c">${n}</text>
      <text x="${x+28}" y="${y+175}" font-family="Inter,sans-serif" font-size="28" fill="#555">takım: Gece Vardiyası · ${r}</text>
      ${nick ? `<text x="${x+28}" y="${y+228}" font-family="Caveat,cursive" font-size="34" fill="#1d3d8a">${nick}</text>` : ''}</g>`).join('')}
      <circle cx="900" cy="900" r="70" fill="#d8d2c6"/><circle cx="900" cy="900" r="52" fill="#3b2516"/>`, '#3a2a1d'),
    panel: () => svg(`<rect y="700" width="1080" height="380" fill="#0a0c12"/><rect x="200" y="560" width="680" height="40" fill="#2a2f3a"/>
      ${[330,540,750].map((x,i) => `<circle cx="${x}" cy="440" r="60" fill="${i===1?'#8a6bb0':'#3a4252'}"/><rect x="${x-70}" y="500" width="140" height="70" rx="30" fill="${i===1?'#8a6bb0':'#3a4252'}"/>`).join('')}
      <ellipse cx="540" cy="300" rx="420" ry="260" fill="#f3c66b" opacity=".08"/><text x="540" y="180" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="52" fill="#e6e2d8">GECE PANELİ</text>
      <text x="540" y="860" text-anchor="middle" font-family="monospace" font-size="44" fill="#e7b04b">● CANLI · 23:44</text>`, '#11141b'),
    keyart: () => svg(`<rect width="1080" height="1080" fill="#07090d"/><circle cx="540" cy="460" r="300" fill="#e7b04b" opacity=".06"/>
      <text x="540" y="500" text-anchor="middle" font-family="Courier New,monospace" font-size="140" fill="#e6e2d8">SON TANIK</text>
      <text x="540" y="640" text-anchor="middle" font-family="monospace" font-size="96" fill="#e7b04b" letter-spacing="30">23:17</text>
      <text x="540" y="900" text-anchor="middle" font-family="Inter,sans-serif" font-size="34" fill="#9aa3b0">Herkes bir şey gördü. Yalnızca biri yalan söylemedi.</text>`),
    bug: () => svg(`<ellipse cx="540" cy="560" rx="170" ry="230" fill="#b5654a"/><circle cx="540" cy="300" r="90" fill="#8a4a36"/>
      ${[-1,1].map(s => [380,520,660].map(y => `<line x1="${540+s*160}" y1="${y}" x2="${540+s*320}" y2="${y-60}" stroke="#8a4a36" stroke-width="22" stroke-linecap="round"/>`).join('')).join('')}
      <text x="540" y="960" text-anchor="middle" font-family="monospace" font-size="60" fill="#e6e2d8">KRK-231 ✓</text>`, '#14100e'),
    wave: () => svg(`${Array.from({ length: 60 }, (_, i) => { const h = 60 + Math.abs(Math.sin(i * .55) * 320) + (i % 5) * 18; return `<rect x="${60 + i * 16}" y="${540 - h / 2}" width="9" height="${h}" rx="4" fill="#5c7f6a"/>`; }).join('')}
      <text x="540" y="960" text-anchor="middle" font-family="monospace" font-size="48" fill="#9aa3b0">ses_paketi_final.zip</text>`, '#0d1310'),
    poster: () => svg(`<rect x="140" y="100" width="800" height="880" fill="#16243a"/><text x="540" y="260" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="72" fill="#fff">GECE PANELİ</text>
      <text x="540" y="340" text-anchor="middle" font-family="Inter,sans-serif" font-size="38" fill="#9fb7d9">Küçük stüdyoda hikâye anlatmak</text>
      <text x="540" y="560" text-anchor="middle" font-family="monospace" font-size="80" fill="#f3c66b">14 MART · 22:30</text><text x="540" y="860" text-anchor="middle" font-family="Inter,sans-serif" font-size="38" fill="#9fb7d9">Kadıköy · canlı yayın</text>`, '#0b1320')
  };

  /* ---------------- yardımcılar */
  const avatar = (h, size = 40) => {
    const u = users[h];
    const inner = u.avatar === 'moon'
      ? `<svg viewBox="0 0 40 40"><path d="M15 22 a10 10 0 1 0 12 -10 a8 8 0 1 1 -12 10z" fill="#1a120e"/></svg>`
      : `<span>${u.avatar}</span>`;
    return `<span class="av" style="--c:${u.color};--s:${size}px">${inner}</span>`;
  };
  function rich(text) {
    return esc(text)
      .replace(/@([a-z0-9_.]+[a-z0-9_])/gi, (m, h) => users[h] ? `<a href="#/u/${h}">@${h}</a>` : m)
      .replace(/kodhane\.dev/g, '<a href="../kodhane/" class="ext">kodhane.dev</a>')
      .replace(/(#[\wçğıöşüÇĞİÖŞÜ]+)/g, '<span class="tagx">$1</span>')
      .replace(/\n/g, '<br>');
  }
  const userPosts = h => posts.filter(p => p.user === h).sort((a, b) => b.date.localeCompare(a.date));

  /* ---------------- görünümler */
  function viewHome() {
    const feed = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    return `
      <section class="hero">
        <h1>Keşfet</h1>
        <p>Kullanıcı adı ya da isimle ara.</p>
        ${searchBox('')}
      </section>
      <h2 class="sec">Son paylaşımlar</h2>
      <div class="grid">${feed.map(tile).join('')}</div>`;
  }
  function searchBox(q) {
    return `<form class="search" id="sform" role="search"><input id="sq" type="search" placeholder="Pixgram'da ara…" value="${esc(q)}" aria-label="Ara" autocomplete="off"><button>Ara</button></form>`;
  }
  function viewSearch(q) {
    const n = trLower(q.replace(/^@/, ''));
    const res = n ? Object.keys(users).filter(h => trLower(h).includes(n) || trLower(users[h].name).includes(n)) : [];
    return `
      <section class="hero small">${searchBox(q)}</section>
      <h2 class="sec">“${esc(q)}” için ${res.length} hesap</h2>
      <div class="ulist">${res.length ? res.map(h => `
        <a class="urow" href="#/u/${h}">${avatar(h, 48)}<span><b>${h}</b><small>${esc(users[h].name)}</small></span></a>`).join('')
        : '<p class="empty">Eşleşen hesap yok. Pixgram yalnızca kullanıcı adı ve görünen adda arar.</p>'}</div>`;
  }
  function viewUser(h) {
    const u = users[h]; if (!u) return viewMissing();
    const ps = userPosts(h);
    return `
      <section class="profile">
        ${avatar(h, 96)}
        <div class="pinfo">
          <h1>${h}${u.studio ? ' <span class="badge" title="Stüdyo hesabı">✦</span>' : ''}</h1>
          <ul class="stats"><li><b>${ps.length}</b> gönderi</li><li><b>${u.followers.toLocaleString('tr')}</b> takipçi</li><li><b>${u.following}</b> takip</li></ul>
          <p class="pname">${esc(u.name)}</p>
          <p class="pbio">${rich(u.bio)}</p>
        </div>
      </section>
      <div class="grid">${ps.length ? ps.map(tile).join('') : '<p class="empty">Henüz gönderi yok.</p>'}</div>`;
  }
  function tile(p) {
    return `<a class="tile" href="#/p/${p.id}" aria-label="${esc(users[p.user].name)} gönderisi">${IMG[p.img]()}<span class="tmeta">♥ ${p.likes} · 💬 ${p.comments.length}</span></a>`;
  }
  function viewPost(id) {
    const p = posts.find(x => x.id === id); if (!p) return viewMissing();
    return `
      <article class="post">
        <button class="pimg" id="zoom" aria-label="Fotoğrafı büyüt">${IMG[p.img]()}<span class="zoomhint">⤢ büyüt</span></button>
        <div class="pside">
          <a class="phead" href="#/u/${p.user}">${avatar(p.user, 36)}<b>${p.user}</b></a>
          <div class="pcap"><p><a href="#/u/${p.user}"><b>${p.user}</b></a> ${rich(p.caption)}</p><time>${fmtDate(p.date, p.time)}</time></div>
          <ul class="comments">${p.comments.map(c => `
            <li>${avatar(c.u, 28)}<p><a href="#/u/${c.u}"><b>${c.u}</b></a> ${rich(c.t)}</p></li>`).join('') || '<li class="empty">Yorum yok.</li>'}</ul>
          <div class="pfoot">♥ ${p.likes} beğenme</div>
        </div>
      </article>`;
  }
  function viewMissing() { return `<p class="empty big">Bu sayfa mevcut değil. <a href="#/">Keşfet'e dön</a></p>`; }

  /* ---------------- yönlendirme */
  function route() {
    const h = decodeURIComponent(location.hash.slice(1) || '/');
    const parts = h.split('/').filter(Boolean);
    let html;
    if (parts[0] === 'u') html = viewUser(parts[1]);
    else if (parts[0] === 'p') html = viewPost(parts[1]);
    else if (parts[0] === 'ara') html = viewSearch(parts.slice(1).join('/'));
    else html = viewHome();
    $('#view').innerHTML = html;
    document.title = (parts[0] === 'u' && users[parts[1]] ? `${users[parts[1]].name} (@${parts[1]})` : 'Pixgram');
    const f = $('#sform');
    if (f) f.addEventListener('submit', e => { e.preventDefault(); const q = $('#sq').value.trim(); if (q) location.hash = '#/ara/' + encodeURIComponent(q); });
    const z = $('#zoom');
    if (z) z.addEventListener('click', () => { $('#lb-inner').innerHTML = z.querySelector('svg').outerHTML; $('#lb').classList.add('open'); });
    window.scrollTo(0, 0);
  }
  $('#lb').addEventListener('click', () => $('#lb').classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#lb').classList.remove('open'); });
  $('#topsearch').addEventListener('submit', e => { e.preventDefault(); const q = $('#tq').value.trim(); if (q) location.hash = '#/ara/' + encodeURIComponent(q); });
  window.addEventListener('hashchange', route);
  route();
})();
