/* SON TANIK: 23:17 — oyun verisi
   Bu dosyada yalnızca oyun içi hikâye verisi bulunur. */
'use strict';

window.GAME_DATA = {

  /* ---------------------------------------------------------------- KANITLAR */
  evidence: {
    mektup: {
      title: 'Yayıncının soruşturma talebi',
      kind: 'Belge', icon: '✉',
      short: 'Kuzey Işık Yayıncılık, sabotaj şüphesiyle dosyayı sana gönderdi.',
      html: `
<div class="doc doc-letter">
  <div class="lh"><b>KUZEY IŞIK YAYINCILIK</b><span>İstanbul · yayin@kuzeyisik.example</span></div>
  <p class="right">15 Mart 2026, 02:10</p>
  <p><b>Konu:</b> Kırkindi Game Studio — 14 Mart gecesi build olayı</p>
  <p>Sayın araştırmacı,</p>
  <p>Birlikte çalıştığımız bağımsız ekip <b>Kırkindi Game Studio</b> (Samsun Teknopark, 3. kat), yayına iki gün kala oyununun ana sürümünü (gold master) bize teslim edecekti.</p>
  <p>Ancak <b>14 Mart 2026 Cumartesi gecesi saat 23:17'de</b>, stüdyonun build sunucusunda onaylanmış aday sürüm <b>silinmiş</b> ve yerine yeni bir build yüklenmiştir. Ofis o saatte resmî olarak kapalıydı.</p>
  <p>Gün içinde build'e itiraz eden test uzmanı <b>Deniz Aral</b>'dan şüpheleniyoruz. Bir sabotaj olup olmadığını, varsa kimin yaptığını öğrenmek istiyoruz.</p>
  <p><b>Tanıklar:</b> Kemal Ertürk (gece güvenliği), Deniz Aral (QA), Selin Koç (ses tasarımı), Elisa İdil Eskin (kurucu ortak).<br>
  Stüdyonun ikinci kurucu ortağı (teknik ortak) şehir dışında olduğunu bildirdiği için ifade vermemiştir.</p>
  <p>Ofis anahtarları güvenlik masasındadır.</p>
  <p class="sign">— Defne Uslu, Yapım Sorumlusu</p>
</div>`
    },

    turnike: {
      title: 'Turnike giriş–çıkış kaydı',
      kind: 'Belge', icon: '▤',
      short: 'Kartlı geçiş sisteminin 14 Mart dökümü.',
      html: `
<div class="doc doc-print">
  <div class="print-head">TEKNOPARK B BLOK · KAT 3 · KARTLI GEÇİŞ RAPORU<br><small>Tarih: 14.03.2026 · Cihaz: TRN-3A</small></div>
  <table>
    <tr><th>Saat</th><th>Kart</th><th>Kart sahibi</th><th>Yön</th></tr>
    <tr><td>18:05</td><td>#04</td><td>Selin Koç</td><td>ÇIKIŞ</td></tr>
    <tr><td>19:12</td><td>#01</td><td>Elisa İdil Eskin</td><td>ÇIKIŞ</td></tr>
    <tr><td>22:02</td><td>#02</td><td>KURUCU ORTAK (T)</td><td>ÇIKIŞ</td></tr>
    <tr><td>22:31</td><td>#05</td><td>Deniz Aral</td><td>ÇIKIŞ</td></tr>
    <tr><td>22:40</td><td>#G</td><td>Güvenlik</td><td>KAPI KİLİTLENDİ</td></tr>
    <tr class="mark"><td>23:02</td><td>#02</td><td>KURUCU ORTAK (T)</td><td>GİRİŞ</td></tr>
    <tr><td>23:41</td><td>#02</td><td>KURUCU ORTAK (T)</td><td>ÇIKIŞ</td></tr>
  </table>
  <p class="foot">Kartlar kişiye özeldir. (T) = teknik. Kart sahibi adları İK kaydında tutulur.</p>
</div>`
    },

    defter: {
      title: 'Güvenlik nöbet defteri',
      kind: 'Belge', icon: '✎',
      short: 'Kemal Ertürk\'ün el yazısıyla tuttuğu gece defteri.',
      html: `
<div class="doc doc-hand">
  <h4>NÖBET DEFTERİ — 14 Mart 2026 Cmt.</h4>
  <p>19:00 Nöbet devralındı. K. Ertürk</p>
  <p>22:31 Deniz Hn. çıktı.</p>
  <p>22:40 Son çıkış. Kat kapısı kilitlendi.</p>
  <p class="hl">23:00 Kat turu başladı (3. kat, 4. kat, otopark)</p>
  <p><s>3. katta ışık?</s></p>
  <p class="hl">23:28 Tur bitti. Olağan dışı durum yok.</p>
  <p>06:00 Nöbet teslim.</p>
  <p class="margin">Not: Sunucu odası servis kartı → masa çekmecesi</p>
</div>`
    },

    servis_karti: {
      title: 'Sunucu odası servis kartı',
      kind: 'Eşya', icon: '⎔',
      short: 'Sunucu odasının kapısını açar.',
      html: `
<div class="doc doc-card">
  <div class="keycard"><span>KIRKİNDİ</span><b>SERVİS</b><small>SUNUCU ODASI · K3</small></div>
  <p>Güvenlik masasının çekmecesinden aldın. Sunucu odasının kapısındaki okuyucuyu açar.</p>
</div>`
    },

    kupa_fis: {
      title: 'Masa 2: kupa ve kahve fişi',
      kind: 'Nesne', icon: '☕',
      short: 'Teknik ortağın masasında gece saatli bir kahve fişi.',
      html: `
<div class="doc doc-object">
  <p><b>Masa 2</b> — masada isimlik yok; monitörün kenarında yalnızca <b>“T. ORTAK”</b> yazan bir etiket var.</p>
  <p>Kupanın üzerinde “Ctrl+Z hayatımda yok” yazıyor. Dibinde kurumamış kahve var.</p>
  <div class="receipt">
    <b>GECE KUŞU KAHVE</b><br>Atakum / Samsun<br>--------------------------<br>
    14.03.2026 &nbsp;&nbsp; <b>22:51</b><br>1x Filtre kahve (büyük) &nbsp; 85,00<br>
    --------------------------<br>TEŞEKKÜRLER, İYİ GECELER
  </div>
  <p class="muted">Fiş kupanın altına sıkışmış. Kahve 22:51'de alınmış — biri gece bu masada oturmuş.</p>
</div>`
    },

    postit: {
      title: 'Monitördeki yapışkan not',
      kind: 'Nesne', icon: '▢',
      short: 'Masa 2 monitöründe kısa bir not.',
      html: `
<div class="doc doc-object">
  <div class="postit">KRK-231<br>→ bu gece düzelt.<br>GM'ye girmeden!<br><span>— mk</span></div>
  <p class="muted">Not, masa 2'nin monitörüne yapıştırılmış. İmza: <b>mk</b>.</p>
</div>`
    },

    bilet: {
      title: 'Buruşturulmuş hata bileti (KRK-231)',
      kind: 'Belge', icon: '⚑',
      short: 'Çöp kutusundan çıkan, hata takip sisteminin çıktısı.',
      html: `
<div class="doc doc-ticket">
  <div class="tk-head"><b>KRK-231</b><span class="pill red">KRİTİK</span></div>
  <h4>Bölüm 3'te kaydedince kayıt dosyası bozuluyor</h4>
  <dl>
    <dt>Açan</dt><dd>Deniz Aral (QA)</dd>
    <dt>Oluşturulma</dt><dd>14.03.2026 <b>22:47</b></dd>
    <dt>Kaynak</dt><dd><b>Mobil uygulama</b></dd>
    <dt>Atanan</dt><dd>mk</dd>
    <dt>Durum</dt><dd>Açık</dd>
  </dl>
  <p>Adımlar: Bölüm 3 → arşiv odası → kaydet → oyunu kapat → yükle. Kayıt dosyası 0 bayt. RC build'de %100 tekrar ediyor. <b>Bu haliyle GM'ye gitmemeli.</b></p>
  <p class="handnote">repro ✓ 23:09</p>
  <p class="foot">Yazdırıldı: 14.03.2026 23:06 · YAZICI-K3 · kullanıcı: mk</p>
</div>`
    },

    tahta: {
      title: 'Yayın takvimi panosu',
      kind: 'Nesne', icon: '▦',
      short: 'Beyaz tahtadaki teslim planı.',
      html: `
<div class="doc doc-board">
  <h4>GOLD MASTER HAFTASI</h4>
  <ul>
    <li>13 Mar — RC build + QA turu ✓</li>
    <li><b>14 Mar — RC son kontrol (Deniz)</b></li>
    <li>15 Mar 09:00 — GM teslim → Kuzey Işık</li>
    <li>15 Mar — duyuru: Pixgram <b>@kirkindidev</b></li>
  </ul>
  <p class="red-ink">KURAL: Build'leri sadece imzalı anahtar atar!</p>
</div>`
    },

    poster: {
      title: 'Stüdyo posteri',
      kind: 'Nesne', icon: '▣',
      short: 'Kırkindi Game Studio\'nun kuruluş posteri.',
      html: `
<div class="doc doc-poster">
  <div class="poster-art"><span>KIRKİNDİ</span><small>GAME STUDIO</small></div>
  <p>“Bir jam gecesinde iki kişiydik. <b>Gece Vardiyası</b> takımı olarak Global Game Jam 2023'te tanıştık; stüdyo o hafta kuruldu.”</p>
  <p class="muted">Posterin altında iki imza var: biri okunaklı (“Elisa İ. E.”), diğeri yalnızca bir karalama ve küçük bir ay çizimi.</p>
</div>`
    },

    telesekreter: {
      title: 'Masa 2 telesekreter kaydı',
      kind: 'Ses', icon: '☎',
      short: 'Masa hattına 23:21\'de bırakılmış sesli mesaj.',
      html: `
<div class="doc doc-voice">
  <div class="vm-head"><span class="led"></span> 1 YENİ MESAJ · Masa hattı 302 · 14.03.2026 <b>23:21</b></div>
  <div class="wave"></div>
  <p class="quote">“Ortak? Ofiste misin? Selin NAS'ta yeni bir build gördüğünü yazdı, saat 23:17 diyor. Cep telefonunu açmıyorsun… Panelden çıkınca tekrar ararım.”</p>
  <p class="muted">Arayan: Elisa İdil Eskin (cep)</p>
</div>`
    },

    imza: {
      title: 'Build imzalama yetki tablosu',
      kind: 'Belge', icon: '⚿',
      short: 'Sunucu dolabının kapağındaki lamine liste.',
      html: `
<div class="doc doc-print">
  <div class="print-head">KIRKİNDİ BUILD SUNUCUSU · İMZA YETKİLERİ</div>
  <table>
    <tr><th>Anahtar</th><th>Rol</th><th>Yetki</th></tr>
    <tr class="mark"><td>mk</td><td>Kurucu ortak — teknik</td><td>RC / GM imzalama, silme</td></tr>
    <tr><td>eie</td><td>Kurucu ortak — anlatı</td><td>Okuma</td></tr>
    <tr><td>daral</td><td>QA</td><td>Okuma, test tetikleme</td></tr>
    <tr><td>skoc</td><td>Ses</td><td>NAS yükleme</td></tr>
  </table>
  <p class="foot">GM imzası yalnızca <b>mk</b> anahtarıyla atılabilir. Anahtar donanım belirteci kartla birlikte taşınır.</p>
</div>`
    },

    sunucu_log: {
      title: 'Build sunucusu kaydı',
      kind: 'Dijital', icon: '⌨',
      short: 'Build sunucusunun 14 Mart gecesi olay günlüğü.',
      html: `
<div class="doc doc-term">
<pre>$ journalctl -u kirkindi-build --since "2026-03-14 21:30"
<span class="d">21:58:12</span> PUSH   v0.23.16-rc   commit 9c1e0b4  imza=mk  "rc: bölüm 3 kayıt akışı"
<span class="d">22:47:30</span> TICKET KRK-231 açıldı (kaynak=mobil, açan=daral)
<span class="d">23:03:55</span> SSH    oturum açıldı  kullanıcı=mk  kaynak=ofis-ws-02 (10.0.3.12)
<span class="d">23:16:41</span> TEST   save_corruption_regression ... <span class="ok">GEÇTİ</span>
<span class="hl"><span class="d">23:17:04</span> DELETE v0.23.16-rc   neden="KRK-231 — hatalı RC"</span>
<span class="hl"><span class="d">23:17:04</span> PUSH   v0.23.17-gm   commit <b>a3f2317</b>  imza=<b>mk</b>
         "fix: kayıt dosyası bozulması (KRK-231) — gold master"</span>
<span class="d">23:40:02</span> SSH    oturum kapandı kullanıcı=mk
</pre>
</div>`
    },

    vpn_log: {
      title: 'VPN bağlantı kaydı',
      kind: 'Dijital', icon: '⇄',
      short: 'Uzaktan bağlantılar ve NAS yüklemeleri.',
      html: `
<div class="doc doc-term">
<pre>KIRKİNDİ-VPN · 14.03.2026 · uzak oturumlar
kullanıcı  başlangıç  bitiş   kaynak              işlem
skoc       <b>23:08</b>      <b>23:12</b>   ev (Atakum, ev ağı)  NAS ← ses_paketi_final.zip
eie        23:19      23:20   İstanbul (otel ağı)  NAS dizin listeleme
daral      —          —       14 Mart'ta uzak oturum yok
mk         —          —       (yerel ağda: ofis-ws-02)
</pre>
<p class="muted">NAS listesi 23:19 itibarıyla: SON_TANIK_v0.23.17-gm.pak (23:17) · ses_paketi_final.zip (23:11)</p>
</div>`
    },

    elisa_panel: {
      title: 'Elisa\'nın panel programı',
      kind: 'Belge', icon: '◷',
      short: 'Elisa İstanbul\'da canlı yayında konuşmacıydı.',
      html: `
<div class="doc doc-letter">
  <div class="lh"><b>İSTANBUL OYUN GELİŞTİRİCİ BULUŞMASI</b><span>14 Mart 2026 · Kadıköy</span></div>
  <p><b>22:30 – 00:10 · Gece Paneli (canlı yayın)</b><br>“Küçük stüdyoda hikâye anlatmak”</p>
  <p>Konuşmacılar: Elisa İdil Eskin (Kırkindi Game Studio) ve diğerleri</p>
  <p class="muted">Ekte: 20:30 Samsun → İstanbul uçuş kartı. Elisa o saatte Samsun'da olamaz.</p>
</div>`
    }
  },

  /* ---------------------------------------------------------------- ODALAR */
  rooms: {
    ofis: {
      name: 'Kırkindi Game Studio — Açık ofis',
      time: '15 Mart 2026 · 03:12',
      hotspots: [
        { id: 'h_tahta', label: 'Beyaz tahta', gives: ['tahta'],
          text: 'Tahtada gold master haftasının planı var. Kırmızı kalemle altı çizilmiş bir kural dikkatini çekiyor.' },
        { id: 'h_poster', label: 'Duvardaki poster', gives: ['poster'],
          text: 'Stüdyonun kuruluş posteri. Altında iki imza var; biri okunmuyor.' },
        { id: 'h_pencere', label: 'Pencere', gives: [],
          text: 'Yağmur camı dövüyor. Karşıdaki otoparkta yalnızca güvenlik kulübesinin ışığı yanıyor. Burada işe yarar bir şey yok — ama 3. katın ışığı dışarıdan rahatça görülebiliyor.' },
        { id: 'h_masa1', label: 'Masa 1 (Elisa)', gives: [],
          text: 'Elisa\'nın masası düzenli. Ekranda kilit ekranı, takvimde “14 Mar — İstanbul paneli ✈ 20:30” yazıyor. Bu masada gece kimse çalışmamış.' },
        { id: 'h_masa2', label: 'Masa 2 (T. Ortak)', gives: ['kupa_fis', 'postit'],
          text: 'Monitörün kenarında “T. ORTAK” etiketi. Kupada kurumamış kahve, altına sıkışmış bir fiş ve ekranda yapışkan bir not var. Bilgisayar hâlâ sıcak.' },
        { id: 'h_telefon', label: 'Masa telefonu', gives: ['telesekreter'],
          text: 'Masa 2\'deki telefonun kırmızı ışığı yanıp sönüyor. Telesekreteri dinliyorsun.' },
        { id: 'h_cop', label: 'Çöp kutusu', gives: ['bilet'],
          text: 'Kâğıt yığınının arasında buruşturulmuş bir hata bileti çıktısı var. Üzerinde el yazısıyla bir not.' },
        { id: 'h_guvenlik', label: 'Güvenlik masası', gives: ['defter'],
          text: 'Kemal Ertürk\'ün masası. Nöbet defteri açık bırakılmış. Bir satırın üstü çizilmiş.' },
        { id: 'h_cekmece', label: 'Masa çekmecesi', gives: ['servis_karti'], requires: 'defter',
          lockedText: 'Çekmece kapalı. Neyi aradığını bilmeden karıştırmak istemiyorsun — önce nöbet defterine bak.',
          text: 'Defterdeki nota göre çekmeceyi açıyorsun: sunucu odasının servis kartı burada.' },
        { id: 'h_turnike', label: 'Kartlı geçiş okuyucu', gives: ['turnike'],
          text: 'Kapıdaki okuyucunun servis menüsünden günün kayıtlarını yazdırıyorsun.' },
        { id: 'h_sunucukapi', label: 'Sunucu odası kapısı', goto: 'sunucu', requires: 'servis_karti',
          lockedText: 'Kapı kilitli. Okuyucu bir servis kartı bekliyor.',
          text: 'Servis kartını okutuyorsun. Kilit yeşile döndü.' }
      ]
    },
    sunucu: {
      name: 'Sunucu odası',
      time: '15 Mart 2026 · 03:20',
      hotspots: [
        { id: 'h_rack', label: 'Build sunucusu ekranı', gives: ['sunucu_log'],
          text: 'Rack\'teki konsol hâlâ açık. Build servisinin günlüğünü görüntülüyorsun. Gecenin tek tarafsız tanığı bu makine.' },
        { id: 'h_vpn', label: 'Ağ geçidi paneli', gives: ['vpn_log'],
          text: 'VPN ağ geçidinin yönetim ekranında gece boyunca kimin dışarıdan bağlandığı görünüyor.' },
        { id: 'h_imza', label: 'Dolap kapağındaki liste', gives: ['imza'],
          text: 'Dolabın kapağına lamine bir tablo bantlanmış: build imzalama yetkileri.' },
        { id: 'h_geri', label: 'Açık ofise dön', goto: 'ofis', text: '' }
      ]
    }
  },

  /* ---------------------------------------------------------------- KARAKTERLER */
  characters: {
    kemal: {
      name: 'Kemal Ertürk', role: 'Gece güvenliği · 58', color: '#7a8b99', initials: 'KE',
      intro: 'Yorgun, kollarını kavuşturmuş. “Ben işimi yaparım evladım.”',
      statements: [
        { id: 'k1', text: '22:40\'ta son çıkışı yaptırdım, kat kapısını kendim kilitledim.' },
        { id: 'k2', text: 'Gece boyunca kapının başındaydım. Gözümü bile kırpmadım.',
          contra: 'defter', resolved: 'Defteri görünce omuzları düşüyor. “Tamam… 23:00\'te tura çıktım, yarım saat sürdü. Kapı o arada boştu. Yazınca başım yanar sandım.”' },
        { id: 'k3', text: 'Kimse içeri girmedi. Girse görürdüm.',
          contra: 'turnike', resolved: '“23:02, kart #02… O ortağın kartı. Ben turdaydım, görmedim. Döndüğümde 3. katta ışık yanıyordu; deftere yazıp sildim. Patronlardan biriyse karışmak istemedim.”' }
      ]
    },
    deniz: {
      name: 'Deniz Aral', role: 'QA test uzmanı', color: '#b5654a', initials: 'DA',
      intro: 'Telefonunu elinde çeviriyor. “Beni suçladıklarını biliyorum.”',
      statements: [
        { id: 'd1', text: 'Gün içinde RC build\'de kritik bir kayıt hatası buldum, söyledim ama kimse yayını erteletmek istemedi.' },
        { id: 'd2', text: '22:30 gibi çıktım ve bir daha ofise dönmedim.' },
        { id: 'd3', text: 'O hatayı sisteme kaydetmedim bile. Uğraşmadım, eve gittim.',
          contra: 'bilet', resolved: '“…Peki. Otobüste telefondan açtım, 22:47\'de. Söylemedim çünkü yayıncı zaten ‘işi yavaşlatan’ beni sanıyor. Ama bakın — kaynak mobil. Ofiste değildim.”' }
      ]
    },
    selin: {
      name: 'Selin Koç', role: 'Ses tasarımcısı', color: '#5c7f6a', initials: 'SK',
      intro: 'Kulaklığı boynunda. Sakin ama dikkatli konuşuyor.',
      statements: [
        { id: 's1', text: 'Saat 18:00 gibi ofisten çıktım, akşam evden çalıştım.' },
        { id: 's2', text: '23:10 civarı final ses paketini evden NAS\'a yükledim. Ofise hiç gitmedim.',
          contra: 'vpn_log', verify: true, resolved: 'VPN kaydı Selin\'i doğruluyor: 23:08–23:12 arası ev ağından bağlı, yalnızca ses paketini yüklemiş. İfade tutarlı.' },
        { id: 's3', text: 'Yükleme biterken NAS\'ta yeni bir build belirdi, saati 23:17\'ydi. Hemen Elisa\'ya yazdım.' }
      ]
    },
    elisa: {
      name: 'Elisa İdil Eskin', role: 'Kurucu ortak · anlatı', color: '#8a6bb0', initials: 'EİE',
      intro: 'Görüntülü aramada, İstanbul\'daki otel odasından bağlanıyor. “Ne olduysa öğrenmek istiyorum.”',
      gives: ['elisa_panel'],
      statements: [
        { id: 'e1', text: 'O gece İstanbul\'daydım, 22:30\'da başlayan panelde konuşmacıydım.' },
        { id: 'e2', text: 'Ortağım 22:00 gibi çıktığını, gece ofiste olmayacağını söylemişti.' },
        { id: 'e3', text: 'Selin\'in mesajından sonra ortağımı aradım; ofiste olduğuna dair hiçbir iz yok.',
          contra: 'telesekreter', resolved: '“Masa hattını aradığımı unutmuşum… Telefon ofisteydi ve mesaj dinlenmemiş. Demek gerçekten oradaydı.” Biraz susuyor. “Ortağım görünmez olmayı sever. Adını ben vermeyeyim; izini sürerseniz bulursunuz.”' }
      ]
    }
  },

  /* ---------------------------------------------------------------- KANIT PANOSU */
  links: [
    { a: 'turnike', b: 'kupa_fis', key: true, title: 'Kart #02 geri döndü',
      text: 'Kart #02 (KURUCU ORTAK – T) 22:02\'de çıkıp 23:02\'de geri girmiş. Masa 2\'deki kahve fişi 22:51 tarihli: teknik ortak kahvesini alıp ofise dönmüş.' },
    { a: 'defter', b: 'turnike', key: true, title: 'Kapı neden boştu',
      text: 'Güvenlik 23:00–23:28 arası turdaydı. 23:02 girişini görmemesi bundan; “kimse girmedi” ifadesi gözleme değil varsayıma dayanıyor.' },
    { a: 'bilet', b: 'sunucu_log', key: true, title: 'Sabotaj değil, kurtarma',
      text: 'Deniz\'in 22:47\'de açtığı KRK-231, 23:17\'deki build\'in commit mesajında düzeltilmiş. Silinen sürüm hatalı RC; yerine düzeltilmiş GM gelmiş.' },
    { a: 'imza', b: 'postit', key: true, title: '“mk” kimdir',
      text: 'GM imzalama yetkisi yalnızca mk anahtarında; mk = teknik kurucu ortak. Masa 2\'deki not da “— mk” imzalı.' },
    { a: 'sunucu_log', b: 'kupa_fis', key: false, title: 'ofis-ws-02 = Masa 2',
      text: 'SSH oturumu ofis-ws-02\'den açılmış: masa 2\'deki iş istasyonu. Build ofisin içinden atılmış.' },
    { a: 'vpn_log', b: 'telesekreter', key: false, title: 'Alarm zinciri',
      text: 'Selin 23:11\'de yeni build\'i NAS\'ta gördü, Elisa 23:19\'da NAS\'ı kontrol etti ve 23:21\'de ortağının masa hattını aradı.' },
    { a: 'bilet', b: 'postit', key: false, title: 'Bilet kime atanmıştı',
      text: 'KRK-231 “mk”ye atanmış ve 23:06\'da mk kullanıcısıyla 3. kattaki yazıcıdan basılmış. Not: “bu gece düzelt.”' },
    { a: 'elisa_panel', b: 'telesekreter', key: false, title: 'Elisa uzaktaydı',
      text: 'Elisa 22:30–00:10 canlı yayındaydı; 23:21 araması cep telefonundan. Build\'i o atamazdı (anahtarında yalnızca okuma yetkisi var).' }
  ],

  /* ---------------------------------------------------------------- FİNAL RAPORU */
  final: [
    { q: '23:17\'de build\'i sunucuya kim gönderdi?',
      options: ['Kemal Ertürk', 'Deniz Aral', 'Selin Koç', 'Elisa İdil Eskin', 'Kart #02 sahibi — teknik kurucu ortak (mk)'],
      correct: 4 },
    { q: '23:17\'de sunucuda gerçekte ne oldu?',
      options: ['Onaylı build sabote edilip silindi', 'Hatalı RC silindi, KRK-231 düzeltilmiş GM yüklendi', 'Sunucu arızalandı, build kendiliğinden silindi'],
      correct: 1 },
    { q: 'Hangi tanık ifadesinde gerçeği saklamıştı?',
      options: ['Kemal — tur sırasında kapıda olmadığını sakladı', 'Selin — aslında ofisteydi', 'Elisa — İstanbul\'a hiç gitmedi'],
      correct: 0 },
    { q: 'Dosyanın “son tanığı” kim/ne?',
      options: ['Güvenlik görevlisi', 'Build sunucusunun kaydı', 'Elisa\'nın telefonu'],
      correct: 1 }
  ]
};
