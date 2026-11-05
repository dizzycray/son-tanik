/* SON TANIK: 23:17 — oyun motoru */
'use strict';

(function () {
  const D = window.GAME_DATA;
  const SAVE_KEY = 'sontanik_2317_save_v1';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const CONTRA_TOTAL = Object.values(D.characters).flatMap(c => c.statements).filter(s => s.contra).length;
  const KEY_LINKS = D.links.filter(l => l.key);

  /* ------------------------------------------------------------ durum */
  const fresh = () => ({
    room: 'ofis', evidence: ['mektup'], examined: {}, resolved: {}, links: [],
    talked: {}, hints: true, solved: false, seenIntro: false, seenTutorial: false
  });
  let S = fresh();

  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* depolama kapalı olabilir */ } }
  function load() {
    try { const raw = localStorage.getItem(SAVE_KEY); if (raw) return Object.assign(fresh(), JSON.parse(raw)); } catch (e) {}
    return null;
  }

  const has = id => S.evidence.includes(id);
  const linkKey = (a, b) => [a, b].sort().join('|');
  const resolvedCount = () => Object.keys(S.resolved).length;
  const keyLinksFound = () => KEY_LINKS.filter(l => S.links.includes(linkKey(l.a, l.b))).length;

  /* ------------------------------------------------------------ ekranlar */
  function show(id) {
    $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
    window.scrollTo(0, 0);
  }

  function toast(msg) {
    const t = $('#toast');
    t.innerHTML = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ------------------------------------------------------------ modal */
  let modalStack = [];
  function openModal(title, html, opts = {}) {
    $('#modal-title').textContent = title;
    $('#modal-body').innerHTML = html;
    const m = $('#modal');
    m.className = 'modal open' + (opts.wide ? ' wide' : '') + (opts.cls ? ' ' + opts.cls : '');
    m.setAttribute('aria-hidden', 'false');
    if (opts.onOpen) opts.onOpen($('#modal-body'));
    $('#modal-close').focus({ preventScroll: true });
  }
  function closeModal() {
    const m = $('#modal'); m.className = 'modal'; m.setAttribute('aria-hidden', 'true');
    $('#modal-body').innerHTML = '';
    window.removeEventListener('resize', drawStrings);
    refreshHud();
  }
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#modal').classList.contains('open')) closeModal(); });

  /* ------------------------------------------------------------ kanıt */
  function addEvidence(ids) {
    const added = [];
    ids.forEach(id => { if (!has(id)) { S.evidence.push(id); added.push(id); } });
    if (added.length) {
      save(); refreshHud();
      toast('<b>Kanıt eklendi:</b> ' + added.map(id => D.evidence[id].title).join(', '));
    }
    return added;
  }

  function evCard(id, extra = '') {
    const e = D.evidence[id];
    return `<button class="ev-card ${extra}" data-ev="${id}">
      <span class="ev-ico">${e.icon}</span>
      <span class="ev-meta"><b>${e.title}</b><small>${e.kind} · ${e.short}</small></span></button>`;
  }

  function showEvidence(id, back) {
    const e = D.evidence[id];
    openModal(e.title, `
      <div class="ev-detail">${e.html}</div>
      <div class="modal-actions">
        ${back ? '<button class="btn ghost small" data-back>← Envanter</button>' : ''}
        <button class="btn small" data-board>Kanıt panosuna git</button>
      </div>`, {
      onOpen: b => {
        const bb = $('[data-back]', b); if (bb) bb.onclick = openInventory;
        $('[data-board]', b).onclick = openBoard;
      }
    });
  }

  /* ------------------------------------------------------------ sahne */
  function renderScene() {
    const room = D.rooms[S.room];
    $('#scene').innerHTML = window.SCENES[S.room];
    $('#hud-room').textContent = room.name + ' · ' + room.time;
    $$('#scene .hs').forEach(g => {
      const hs = room.hotspots.find(h => h.id === g.dataset.id);
      if (!hs) return;
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', hs.label);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'title'); t.textContent = hs.label; g.prepend(t);
      if (S.examined[hs.id]) g.classList.add('done');
      g.addEventListener('click', () => examine(hs.id));
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); examine(hs.id); } });
    });
    $('#scene').classList.toggle('show-hints', !!S.hints);
    refreshHud();
  }

  function findHotspot(id) {
    for (const r of Object.values(D.rooms)) { const h = r.hotspots.find(x => x.id === id); if (h) return h; }
    return null;
  }

  function examine(id) {
    const hs = findHotspot(id);
    if (hs.requires && !has(hs.requires)) {
      openModal(hs.label, `<p class="narr locked">🔒 ${hs.lockedText}</p>`);
      return;
    }
    if (hs.goto) {
      S.examined[hs.id] = true; S.room = hs.goto; save();
      if (hs.text) toast(hs.text);
      renderScene();
      return;
    }
    S.examined[hs.id] = true;
    const added = addEvidence(hs.gives || []);
    const got = (hs.gives || []);
    openModal(hs.label, `
      <p class="narr">${hs.text}</p>
      ${got.length ? `<h4 class="sub">${added.length ? 'Envantere eklendi' : 'Zaten envanterde'}</h4>
      <div class="ev-list">${got.map(g => evCard(g)).join('')}</div>` : ''}`, {
      onOpen: b => $$('[data-ev]', b).forEach(c => c.onclick = () => showEvidence(c.dataset.ev))
    });
    save();
    const g = $(`#scene .hs[data-id="${id}"]`); if (g) g.classList.add('done');
  }

  function openHotspotList() {
    const room = D.rooms[S.room];
    openModal('İncelenebilir noktalar', `
      <p class="muted">${room.name}</p>
      <div class="hs-list">${room.hotspots.map(h => `
        <button class="hs-item ${S.examined[h.id] ? 'done' : ''}" data-hs="${h.id}">
          <span>${h.label}</span><small>${S.examined[h.id] ? 'incelendi' : (h.requires && !has(h.requires) ? 'kilitli' : 'yeni')}</small>
        </button>`).join('')}</div>`, {
      onOpen: b => $$('[data-hs]', b).forEach(x => x.onclick = () => { closeModal(); examine(x.dataset.hs); })
    });
  }

  /* ------------------------------------------------------------ envanter */
  function openInventory() {
    openModal('Envanter', `
      <p class="muted">${S.evidence.length} kanıt. Ayrıntı için bir karta dokun.</p>
      <div class="ev-list grid">${S.evidence.map(id => evCard(id)).join('')}</div>`, {
      wide: true,
      onOpen: b => $$('[data-ev]', b).forEach(c => c.onclick = () => showEvidence(c.dataset.ev, true))
    });
  }

  /* ------------------------------------------------------------ tanıklar */
  function portrait(c, big) {
    return `<div class="portrait ${big ? 'big' : ''}" style="--pc:${c.color}">
      <svg viewBox="0 0 100 120" aria-hidden="true"><circle cx="50" cy="44" r="24" fill="var(--pc)" opacity=".9"/><path d="M10 120 q40 -70 80 0z" fill="var(--pc)" opacity=".75"/></svg>
      <span>${c.initials}</span></div>`;
  }

  function openWitnesses() {
    openModal('Tanıklar', `
      <p class="muted">İfadeleri dinle. Bir ifade kanıtlarınla çelişiyorsa ya da doğrulanabiliyorsa, <b>Kanıt sun</b>.</p>
      <div class="wit-list">${Object.entries(D.characters).map(([k, c]) => {
        const tot = c.statements.filter(s => s.contra).length;
        const done = c.statements.filter(s => s.contra && S.resolved[s.id]).length;
        return `<button class="wit" data-w="${k}">${portrait(c)}
          <span class="wit-meta"><b>${c.name}</b><small>${c.role}</small>
          <em class="${done === tot ? 'ok' : ''}">${done}/${tot} ifade sınandı</em></span></button>`;
      }).join('')}</div>`, {
      wide: true,
      onOpen: b => $$('[data-w]', b).forEach(x => x.onclick = () => openWitness(x.dataset.w))
    });
  }

  function openWitness(key) {
    const c = D.characters[key];
    if (!S.talked[key]) {
      S.talked[key] = true;
      if (c.gives) addEvidence(c.gives);
      save();
    }
    openModal(c.name, `
      <div class="interro">
        <div class="interro-head">${portrait(c, true)}<div><b>${c.name}</b><small>${c.role}</small><p class="narr">${c.intro}</p></div></div>
        <ol class="stmts">${c.statements.map(s => {
          const r = S.resolved[s.id];
          return `<li class="stmt ${r ? 'resolved' : ''}" id="st-${s.id}">
            <p>“${s.text}”</p>
            ${r ? `<span class="tag ${s.verify ? 'green' : 'red'}">${s.verify ? 'DOĞRULANDI' : 'ÇELİŞKİ'}</span><p class="reveal">${s.resolved}</p>`
                : `<button class="btn tiny" data-present="${s.id}">Kanıt sun</button>`}
          </li>`;
        }).join('')}</ol>
        <div class="modal-actions"><button class="btn ghost small" data-back>← Tanık listesi</button></div>
      </div>`, {
      wide: true,
      onOpen: b => {
        $('[data-back]', b).onclick = openWitnesses;
        $$('[data-present]', b).forEach(x => x.onclick = () => presentPicker(key, x.dataset.present));
      }
    });
  }

  function presentPicker(key, sid) {
    const c = D.characters[key];
    const st = c.statements.find(s => s.id === sid);
    openModal('Kanıt sun', `
      <blockquote class="pick-q">${c.name}: “${st.text}”</blockquote>
      <p class="muted">Bu ifadeyi çürüten ya da doğrulayan kanıtı seç.</p>
      <div class="ev-list grid">${S.evidence.map(id => evCard(id)).join('')}</div>
      <div class="modal-actions"><button class="btn ghost small" data-back>← Vazgeç</button></div>`, {
      wide: true,
      onOpen: b => {
        $('[data-back]', b).onclick = () => openWitness(key);
        $$('[data-ev]', b).forEach(x => x.onclick = () => {
          if (st.contra === x.dataset.ev) {
            S.resolved[sid] = true; save();
            toast(st.verify ? '<b>İfade doğrulandı.</b>' : '<b>Çelişki yakalandı!</b>');
            openWitness(key);
          } else {
            x.classList.add('shake');
            setTimeout(() => x.classList.remove('shake'), 500);
            toast('Bu kanıt, bu ifadeyle doğrudan ilgili görünmüyor.');
          }
        });
      }
    });
  }

  /* ------------------------------------------------------------ kanıt panosu */
  let boardSel = null;
  function openBoard() {
    boardSel = null;
    const pins = S.evidence.filter(id => id !== 'servis_karti');
    const found = D.links.filter(l => S.links.includes(linkKey(l.a, l.b)));
    openModal('Kanıt panosu', `
      <p class="muted">İki kanıta sırayla dokun. Aralarında anlamlı bir bağ varsa kırmızı iple bağlanır ve bir çıkarım oluşur. Temel çıkarımlar: <b>${keyLinksFound()}/${KEY_LINKS.length}</b></p>
      ${KEY_LINKS.some(l => !has(l.a) || !has(l.b)) ? '<p class="warn">⚠ Bazı önemli kanıtlar henüz envanterinde yok. Panoyu kapatıp ofisteki işaretli yerleri ve sunucu odasını incele.</p>' : ''}
      <div class="cork" id="cork">
        <svg class="strings" id="strings"></svg>
        ${pins.map((id, i) => `<button class="pin" data-pin="${id}" style="--r:${((i * 37) % 7) - 3}deg">
          <i></i><span class="ev-ico">${D.evidence[id].icon}</span><b>${D.evidence[id].title}</b></button>`).join('')}
      </div>
      <div id="board-msg" class="board-msg" aria-live="polite"></div>
      <h4 class="sub">Çıkarımlar</h4>
      <ol class="deductions">${found.length ? found.map(l => `<li class="${l.key ? 'key' : ''}"><b>${l.title}</b><span>${l.text}</span></li>`).join('')
        : '<li class="empty">Henüz bağlantı kurulmadı.</li>'}</ol>`, {
      wide: true, cls: 'board-modal',
      onOpen: b => {
        $$('[data-pin]', b).forEach(p => p.onclick = () => pinClick(p.dataset.pin));
        requestAnimationFrame(drawStrings);
        window.addEventListener('resize', drawStrings);
      }
    });
  }

  function pinClick(id) {
    const msg = $('#board-msg');
    if (!boardSel) { boardSel = id; markSel(); msg.textContent = `“${D.evidence[id].title}” seçildi. Şimdi ikinci kanıtı seç.`; return; }
    if (boardSel === id) { boardSel = null; markSel(); msg.textContent = 'Seçim kaldırıldı.'; return; }
    const k = linkKey(boardSel, id);
    const link = D.links.find(l => linkKey(l.a, l.b) === k);
    const a = boardSel; boardSel = null;
    if (!link) {
      markSel();
      msg.innerHTML = `<span class="bad">Bu iki kanıt arasında anlamlı bir bağ kuramadın.</span>`;
      [a, id].forEach(x => { const el = $(`[data-pin="${x}"]`); el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 500); });
      return;
    }
    if (S.links.includes(k)) { markSel(); msg.textContent = 'Bu bağlantıyı zaten kurdun.'; return; }
    S.links.push(k); save(); refreshHud();
    toast('<b>Yeni çıkarım:</b> ' + link.title);
    openBoard();
    $('#board-msg').innerHTML = `<span class="good">✓ ${link.title}</span>`;
  }
  function markSel() { $$('[data-pin]').forEach(p => p.classList.toggle('sel', p.dataset.pin === boardSel)); }

  function drawStrings() {
    const cork = $('#cork'), svg = $('#strings');
    if (!cork || !svg) return;
    const cr = cork.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${cr.width} ${cork.scrollHeight}`);
    svg.style.height = cork.scrollHeight + 'px';
    const center = id => {
      const el = $(`[data-pin="${id}"] i`, cork); if (!el) return null;
      const r = el.getBoundingClientRect();
      return [r.left - cr.left + r.width / 2, r.top - cr.top + r.height / 2 + cork.scrollTop];
    };
    svg.innerHTML = S.links.map(k => {
      const [a, b] = k.split('|'); const p = center(a), q = center(b);
      if (!p || !q) return '';
      const mx = (p[0] + q[0]) / 2, my = Math.max(p[1], q[1]) + 30;
      return `<path d="M${p[0]} ${p[1]} Q${mx} ${my} ${q[0]} ${q[1]}"/>`;
    }).join('');
  }

  /* ------------------------------------------------------------ rapor */
  function openReport() {
    const needR = CONTRA_TOTAL - resolvedCount();
    const needL = KEY_LINKS.length - keyLinksFound();
    if (needR > 0 || needL > 0) {
      openModal('Dava raporu', `
        <p class="narr">Rapor yazmak için henüz yeterli dayanağın yok.</p>
        <ul class="checklist">
          <li class="${needR ? '' : 'ok'}">Sınanan ifadeler: ${resolvedCount()}/${CONTRA_TOTAL}</li>
          <li class="${needL ? '' : 'ok'}">Temel çıkarımlar: ${keyLinksFound()}/${KEY_LINKS.length}</li>
        </ul>
        <p class="muted">İpucu: Defterdeki hedeflere bak. Her temel çıkarım iki kanıtın birleşmesinden doğar.</p>`);
      return;
    }
    openModal('Dava raporu — Dosya #2317', `
      <form id="report" class="report">
        ${D.final.map((f, i) => `
          <fieldset><legend>${i + 1}. ${f.q}</legend>
          ${f.options.map((o, j) => `<label class="opt"><input type="radio" name="q${i}" value="${j}" required><span>${o}</span></label>`).join('')}
          </fieldset>`).join('')}
        <div id="report-msg" class="board-msg" aria-live="polite"></div>
        <div class="modal-actions"><button class="btn primary" type="submit">Raporu teslim et</button></div>
      </form>`, {
      wide: true,
      onOpen: b => $('#report', b).addEventListener('submit', ev => {
        ev.preventDefault();
        const fd = new FormData(ev.target);
        const wrong = D.final.filter((f, i) => Number(fd.get('q' + i)) !== f.correct).length;
        if (wrong) {
          $('#report-msg').innerHTML = `<span class="bad">Yayıncı raporu geri çevirdi: ${wrong} cevap kanıtlarla uyuşmuyor. Kanıtlarını tekrar gözden geçir.</span>`;
          return;
        }
        S.solved = true; save(); closeModal(); show('scr-end');
      })
    });
  }

  /* ------------------------------------------------------------ menü */
  function openMenu() {
    openModal('Menü', `
      <div class="menu-list">
        <button class="btn ghost" data-m="title">Başlık ekranı</button>
        <button class="btn ghost" data-m="help">Nasıl oynanır?</button>
        <button class="btn ghost" data-m="letter">Yayıncının mektubunu oku</button>
        ${S.solved ? '<button class="btn ghost" data-m="end">Sonuç ve CTF sorusu</button>' : ''}
        <button class="btn danger" data-m="reset">Oyunu sıfırla</button>
      </div>
      <p class="muted small">SON TANIK: 23:17 · v0.23.17-gm · © 2026 Kırkindi Game Studio (kurgusal). Bütün kişi ve kurumlar kurgudur.</p>`, {
      onOpen: b => $$('[data-m]', b).forEach(x => x.onclick = () => {
        const m = x.dataset.m;
        if (m === 'title') { closeModal(); show('scr-title'); initTitle(); }
        if (m === 'letter') showEvidence('mektup');
        if (m === 'help') openTutorial();
        if (m === 'end') { closeModal(); show('scr-end'); }
        if (m === 'reset') { S = fresh(); save(); closeModal(); show('scr-title'); initTitle(); }
      })
    });
  }

  /* ------------------------------------------------------------ HUD / hedefler */
  function refreshHud() {
    $('#badge-inv').textContent = S.evidence.length;
    $('#badge-wit').textContent = `${resolvedCount()}/${CONTRA_TOTAL}`;
    $('#badge-board').textContent = `${keyLinksFound()}/${KEY_LINKS.length}`;
    $('#btn-report').classList.toggle('ready', resolvedCount() === CONTRA_TOTAL && keyLinksFound() === KEY_LINKS.length);
    const ofisLeft = D.rooms.ofis.hotspots.filter(h => (h.gives || []).length && !S.examined[h.id]).length;
    const srvLeft = D.rooms.sunucu.hotspots.filter(h => (h.gives || []).length && !S.examined[h.id]).length;
    const objs = [
      [ofisLeft === 0, 'Ofisteki eşyaları incele', `Sarı kesikli çizgili yerlere tıkla. Kalan: ${ofisLeft} yer. Bulamazsan aşağıdaki “İncelenebilir noktalar” düğmesine bas.`],
      [has('servis_karti') && !!S.examined.h_sunucukapi, 'Sunucu odasına gir', 'Güvenlik masasındaki defteri oku, yanındaki çekmeceden kartı al, sonra SUNUCU kapısına tıkla.'],
      [srvLeft === 0, 'Sunucu odasındaki 3 kaydı topla', `Ekranlı dolap, sağdaki ağ paneli ve soldaki beyaz kâğıt. Kalan: ${srvLeft}. Bitince sol alttaki “← Açık ofis”.`],
      [resolvedCount() === CONTRA_TOTAL, `Tanıkları sorgula (${resolvedCount()}/${CONTRA_TOTAL})`, 'Üstteki ☺ Tanıklar → bir kişi seç → yalan gibi duran ifadede “Kanıt sun” → onu çürüten kanıtı seç.'],
      [keyLinksFound() === KEY_LINKS.length, `Panoda kanıtları bağla (${keyLinksFound()}/${KEY_LINKS.length})`, 'Üstteki ✣ Pano → birbirini açıklayan iki kanıta sırayla tıkla. Kırmızı ip çıkarsa doğru.'],
      [S.solved, 'Dava raporunu teslim et', 'Üstteki ✔ Rapor düğmesi sarı yanınca bas ve soruları cevapla.']
    ];
    const next = objs.findIndex(o => !o[0]);
    $('#objectives').innerHTML = objs.map(([ok, t, d], i) => `<li class="${ok ? 'ok' : ''}${i === next ? ' next' : ''}">${t}${i === next ? `<small>${d}</small>` : ''}</li>`).join('');
  }

  $$('.hud-btn').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.open;
    if (k === 'inventory') openInventory();
    if (k === 'witness') openWitnesses();
    if (k === 'board') openBoard();
    if (k === 'report') openReport();
    if (k === 'menu') openMenu();
  }));
  $('#btn-list').addEventListener('click', openHotspotList);
  $('#chk-hints').addEventListener('change', e => { S.hints = e.target.checked; save(); $('#scene').classList.toggle('show-hints', S.hints); });

  /* ------------------------------------------------------------ akış */
  function initTitle() {
    const saved = load();
    $('#btn-continue').hidden = !(saved && saved.seenIntro);
  }
  $('#btn-new').addEventListener('click', () => {
    S = fresh(); save();
    $('#intro-doc').innerHTML = D.evidence.mektup.html;
    show('scr-intro');
  });
  $('#btn-continue').addEventListener('click', () => {
    S = load() || fresh();
    startGame();
  });
  $('#btn-enter').addEventListener('click', () => { S.seenIntro = true; save(); startGame(); });
  $('#btn-back-game').addEventListener('click', startGame);

  function startGame() {
    show('scr-game');
    $('#chk-hints').checked = !!S.hints;
    renderScene();
    const sc = $('#scene-scroll'); sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2;
    if (!S.seenTutorial) { S.seenTutorial = true; save(); openTutorial(); }
  }

  function openTutorial() {
    openModal('Nasıl oynanır?', `
      <ol class="tut">
        <li><b>Eşyalara tıkla.</b> Sarı kesikli çizgili her yer incelenebilir. İncelediğin eşyalar kanıt olarak envantere eklenir.</li>
        <li><b>Sunucu odasına gir.</b> Kapı kilitli; anahtar kartı ofiste bir yerde.</li>
        <li><b>☺ Tanıklar:</b> Bir kişi seç. Yalan gibi duran ifadede <b>Kanıt sun</b> de ve onu çürüten kanıtı seç.</li>
        <li><b>✣ Pano:</b> Birbirini açıklayan iki kanıta sırayla tıkla. Doğruysa kırmızı iple bağlanır.</li>
        <li><b>✔ Rapor:</b> Düğme sarı yanınca bas, dört soruyu cevapla, dosyayı kapat.</li>
      </ol>
      <p class="muted">Takılırsan sağdaki <b>Dedektif defteri</b> sıradaki adımı her zaman gösterir.</p>
      <div class="modal-actions"><button class="btn primary" data-go>Anladım, başla</button></div>`, {
      onOpen: b => { $('[data-go]', b).onclick = closeModal; }
    });
  }

  initTitle();
})();
