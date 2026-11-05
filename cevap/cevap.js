/* Cevap formu — sunucusuz sürüm (GitHub Pages).
   Flag burada ŞİFRELİ durur (AES-GCM). Anahtar, girilen kullanıcı adından PBKDF2 ile türetilir;
   yalnızca doğru kullanıcı adı şifreyi çözebilir. Bu dosyada cevap ya da flag açık halde yoktur. */
'use strict';
(function () {
  const BOX = {
    salt: 'v1pPn++vRAlBWLEf9WYMxQ==',
    iv: 'YJ3g1cB4vY7deiw3',
    ct: 'feHJ+M/Z8ZXTkvMojcgTiNuZOr/d013YLXUo0LlBU8sPEmTu3tubk+SmujW1ksVdOwQ=',
    iterations: 250000
  };
  const DECOY_HASHES = [
    '9b97fba398c5fd508b4cc12e4008bea70c4930a1b06ab1e15be01d16eaa2107c',
    '25a2b0bab3aaedcdea9a0f5a4a20f53ec674edcb316f56c86d7bee08f3b8ab52'
  ];

  const f = document.getElementById('f');
  const r = document.getElementById('r');
  const go = document.getElementById('go');
  const triesEl = document.getElementById('tries');
  const enc = new TextEncoder();
  const unb64 = s => Uint8Array.from(atob(s), ch => ch.charCodeAt(0));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let tries = 0;

  function show(cls, html) { r.className = 'result show ' + cls; r.innerHTML = html; }

  async function sha256hex(s) {
    const d = await crypto.subtle.digest('SHA-256', enc.encode(s));
    return Array.from(new Uint8Array(d), b => b.toString(16).padStart(2, '0')).join('');
  }

  async function tryOpen(user) {
    const base = await crypto.subtle.importKey('raw', enc.encode(user), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: unb64(BOX.salt), iterations: BOX.iterations, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    try {
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(BOX.iv) }, key, unb64(BOX.ct));
      return new TextDecoder().decode(pt);
    } catch (e) { return null; }
  }

  f.addEventListener('submit', async e => {
    e.preventDefault();
    const n = document.getElementById('a').value.trim().replace(/^@+/, '').toLowerCase().slice(0, 64);
    if (!n) return;
    if (!window.crypto || !crypto.subtle) { show('bad', 'Tarayıcın şifre çözmeyi desteklemiyor. Güncel bir tarayıcı kullan.'); return; }
    go.disabled = true; go.textContent = 'Kontrol ediliyor…';
    try {
      tries++; triesEl.textContent = `Deneme: ${tries}`;
      if (DECOY_HASHES.includes(await sha256hex(n))) {
        show('decoy', '<b>Sahte flag.</b> Kaynak kodu okumak iyi bir refleks… ama bu bir tuzaktı. Soru bir flag değil, bir kullanıcı adı istiyor. Dijital izleri takip et.');
        return;
      }
      const flag = await tryOpen(n);
      if (flag) {
        show('ok', `<b>✓ Doğru kullanıcı adı. Son tanık seni doğruladı.</b><div class="flag">${esc(flag)}</div><p class="small">Bu flag'i CTF platformuna gönder.</p>`);
      } else {
        show('bad', '<b>✗</b> Bu kullanıcı adı doğrulanamadı. Kaynakları çapraz kontrol et.');
      }
    } finally {
      go.disabled = false; go.textContent = 'Doğrula';
    }
  });
})();
