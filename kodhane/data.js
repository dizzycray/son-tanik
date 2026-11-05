/* KodHane — kurgusal kod barındırma platformu verisi (bütün hesaplar kurgudur) */
'use strict';
window.KH = {
  accounts: {
    nightbuild: {
      type: 'org', name: 'NightBuild CI', joined: '2019-04-02', location: 'İnternet',
      bio: 'Açık kaynak projeler için gece derleme botu. İnsan değildir. 🤖',
      members: 'Bot hesabıdır; bireysel üye yok.',
      repos: ['nightly-runner', 'action-nightbuild']
    },
    'nightbuild-tr': {
      type: 'user', name: 'Murat Kılınç', joined: '2025-06-12', location: 'İzmir', followers: 12, following: 64,
      bio: 'Veri bilimi öğrencisi · Python · kahve',
      hours: [0,0,0,0,0,0,0,0,2,6,9,11,8,10,12,9,7,5,3,2,1,1,0,0],
      repos: ['kaggle-notlari', 'telegram-hava-botu']
    },
    'mk-nightbuild': {
      type: 'user', name: 'Mert K.', joined: '2023-02-07', location: 'Samsun', followers: 41, following: 9,
      bio: 'Bir oyun stüdyosunun sessiz yarısı. Build\'ler gece atılır. 🌙',
      website: { label: 'nightbuild.dev', href: '../nightbuild/' },
      hours: [1,0,0,0,0,0,0,0,0,1,2,2,1,2,3,3,4,5,6,8,10,14,19,27],
      repos: ['gece-derleyici', 'ggj23-gece-vardiyasi', 'asal-saat', 'dotfiles']
    },
    kirkindi: {
      type: 'org', name: 'Kırkindi Game Studio', joined: '2023-02-10', location: 'Samsun',
      bio: 'Samsun\'dan bağımsız bir oyun stüdyosu.',
      website: { label: 'Pixgram: @kirkindidev', href: '../pixgram/#/u/kirkindidev' },
      members: 'Bu organizasyonun üye listesi gizlidir.',
      repos: ['son-tanik-presskit']
    },
    'mertcan-dev': {
      type: 'user', name: 'Mertcan Yılmaz', joined: '2021-09-30', location: 'Bursa', followers: 230, following: 120,
      bio: 'Android geliştirici. Kotlin ❤️',
      hours: [0,0,0,0,0,0,0,1,4,8,10,9,6,8,9,8,6,4,2,1,1,0,0,0],
      repos: ['compose-ornekleri']
    }
  },

  repos: {
    'mk-nightbuild/gece-derleyici': {
      desc: 'Küçük stüdyolar için imzalı build hattı: test → imzala → yayınla.', lang: 'Shell', stars: 18, updated: '2026-03-14',
      files: {
        'Makefile': `test:\n\t./scripts/test.sh\n\nsign: test\n\t./scripts/sign.sh\n\ngm: sign\n\t./scripts/publish.sh --channel gm\n`,
        'scripts/sign.sh': `#!/usr/bin/env bash
# gece-derleyici · imza adımı
# Yalnızca yetkili donanım anahtarı (mk) ile imzalar.
set -euo pipefail

# NOT(mk): CI'daki eski test anahtarı. Yayından önce silinecekti, unutmuşum.
TEST_FLAG="SONTANIK{mk_gece_build_23_17}"

KEY_ID="\${KEY_ID:-mk}"
BUILD="\${1:?build dosyası gerekli}"

if [[ "\$KEY_ID" != "mk" ]]; then
  echo "imza reddedildi: yetkisiz anahtar (\$KEY_ID)" >&2
  exit 1
fi

sha256sum "\$BUILD" > "\$BUILD.sha256"
gpg --local-user "\$KEY_ID" --detach-sign "\$BUILD"
echo "imzalandı: \$BUILD (\$(date +%H:%M))"
`,
        'scripts/test.sh': `#!/usr/bin/env bash
set -euo pipefail
./engine/run-tests --suite regression
./engine/run-tests --suite save_corruption_regression   # KRK-231
`
      },
      readme: `<h2>gece-derleyici</h2>
<p>Stüdyomuzun build hattı. Her sürüm testten geçmeden imzalanmaz, imzasız sürüm yayına çıkmaz.</p>
<pre>make test   # regresyon testleri
make sign   # donanım anahtarıyla imza (yalnızca yetkili anahtar)
make gm     # gold master</pre>
<p>Bu araçla çıkan sürümlerin tam listesi portfolyomda: <a href="../nightbuild/#surumler">nightbuild.dev</a></p>`,
      commits: [
        ['2026-03-14 23:15', '6d2e918', 'gm: KRK-231 regresyon testini zorunlu yap'],
        ['2026-03-14 21:51', '4b7c3a0', 'rc: bölüm 3 kayıt akışı'],
        ['2026-02-27 23:02', '51d0aa7', 'sign: anahtar belirteci kontrolü'],
        ['2025-11-03 00:41', '0be2213', 'ilk sürüm']
      ]
    },
    'mk-nightbuild/ggj23-gece-vardiyasi': {
      desc: 'Global Game Jam 2023 oyunumuz. 48 saat, üç kişi, bir gece vardiyası.', lang: 'C#', stars: 27, updated: '2023-02-05',
      readme: `<h2>Gece Vardiyası (GGJ 2023)</h2>
<p>Global Game Jam 2023'te 48 saatte yapılan küçük bir gizem oyunu.</p>
<h3>Takım</h3>
<ul><li>Elisa İdil Eskin — anlatı</li><li>Deniz Aral — test</li><li>ben — kod</li></ul>
<p>Bu jam'den sonra bir stüdyo kurduk. Gerisi <a href="../nightbuild/#projeler">portfolyoda</a>.</p>`,
      commits: [
        ['2023-02-05 15:00', 'f00d123', 'jam teslimi'],
        ['2023-02-04 23:17', '2317aaa', 'gece bölümü eklendi']
      ]
    },
    'mk-nightbuild/asal-saat': {
      desc: '23:17 neden güzel bir saat? İki asal, bir zamanlayıcı.', lang: 'Python', stars: 6, updated: '2024-06-11',
      readme: `<h2>asal-saat</h2><p>Saat:dakika ikilisinin ikisi de asal olduğunda bildirim gönderen küçük bir araç. 23:17 favorim.</p>
<pre>$ python asal_saat.py
23:17 → 23 asal, 17 asal ✓</pre>`,
      commits: [['2024-06-11 23:17', '7e1c0d2', 'ilk sürüm']]
    },
    'mk-nightbuild/dotfiles': {
      desc: 'Terminal ayarlarım.', lang: 'Shell', stars: 2, updated: '2025-12-30',
      readme: `<h2>dotfiles</h2><p>zsh, tmux ve editör ayarları. Karanlık tema, her zaman.</p>`,
      commits: [['2025-12-30 22:58', 'c0ffee1', 'tmux: durum çubuğuna saat']]
    },
    'nightbuild/nightly-runner': {
      desc: 'Açık kaynak projeler için zamanlanmış gece derlemeleri.', lang: 'Go', stars: 1240, updated: '2026-10-30',
      readme: `<h2>nightly-runner</h2><p>Depolarınızı her gece 03:00 UTC'de derleyen bot. İnsan müdahalesi yoktur.</p>`,
      commits: [['2026-10-30 03:00', 'b07b07b', 'chore: otomatik sürüm']]
    },
    'nightbuild/action-nightbuild': {
      desc: 'nightly-runner için iş akışı eklentisi.', lang: 'TypeScript', stars: 310, updated: '2026-09-14',
      readme: `<h2>action-nightbuild</h2><p>Bir satırla gece derlemesi ekleyin.</p>`,
      commits: [['2026-09-14 03:00', 'b07b07c', 'chore: bağımlılık güncellemesi']]
    },
    'nightbuild-tr/kaggle-notlari': {
      desc: 'Kaggle yarışma notlarım.', lang: 'Jupyter Notebook', stars: 3, updated: '2026-05-02',
      readme: `<h2>kaggle-notlari</h2><p>Titanic'ten başlayıp ev fiyatlarına uzanan defterler.</p>`,
      commits: [['2026-05-02 14:20', '1a2b3c4', 'ev fiyatları: özellik mühendisliği']]
    },
    'nightbuild-tr/telegram-hava-botu': {
      desc: 'İzmir için hava durumu botu.', lang: 'Python', stars: 1, updated: '2025-07-01',
      readme: `<h2>telegram-hava-botu</h2><p>Her sabah 08:00'de İzmir hava durumunu gönderir.</p>`,
      commits: [['2025-07-01 09:12', '9f8e7d6', 'ilk sürüm']]
    },
    'kirkindi/son-tanik-presskit': {
      desc: 'SON TANIK: 23:17 basın kiti.', lang: 'Markdown', stars: 9, updated: '2026-03-16',
      readme: `<h2>SON TANIK: 23:17 — Basın kiti</h2>
<p>Kırkindi Game Studio'nun hikâye tabanlı dedektiflik oyunu.</p>
<h3>Künye</h3>
<ul><li>Anlatı ve yönetim: Elisa İdil Eskin (kurucu ortak)</li><li>Teknik yönetim ve build: kurucu ortak — <i>adının yazılmamasını rica etti</i></li><li>QA: Deniz Aral</li><li>Ses: Selin Koç</li></ul>
<p>Sürüm: v0.23.17-gm · 14 Mart 2026. Ayrıntılı sürüm geçmişi teknik ortağımızın kişisel sayfasındadır.</p>`,
      commits: [['2026-03-16 10:05', 'pk00001', 'basın kiti']]
    },
    'mertcan-dev/compose-ornekleri': {
      desc: 'Jetpack Compose örnekleri.', lang: 'Kotlin', stars: 88, updated: '2026-08-08',
      readme: `<h2>compose-ornekleri</h2><p>Liste, gezinme ve animasyon örnekleri.</p>`,
      commits: [['2026-08-08 11:40', 'aa11bb2', 'animasyon örneği']]
    }
  }
};
