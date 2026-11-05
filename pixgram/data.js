/* Pixgram — kurgusal sosyal ağ verisi (bütün hesaplar kurgudur) */
'use strict';
window.PX = {
  users: {
    kirkindidev: {
      name: 'Kırkindi Game Studio', avatar: 'moon', color: '#e7b04b', studio: true,
      bio: 'Samsun\'dan küçük, bağımsız bir oyun stüdyosu 🕯️\nYeni oyunumuz: SON TANIK: 23:17\nKurucular: @elisaidileskin + sessiz bir teknik ortak',
      followers: 1284, following: 37
    },
    elisaidileskin: {
      name: 'Elisa İdil Eskin', avatar: 'E', color: '#8a6bb0',
      bio: 'Anlatı tasarımcısı ✍️ @kirkindidev kurucu ortağı\nHikâyeler gece yazılır.',
      followers: 892, following: 214
    },
    'deniz.aral.qa': {
      name: 'Deniz Aral', avatar: 'D', color: '#b5654a',
      bio: 'QA @kirkindidev · bug avcısı 🐞', followers: 311, following: 190
    },
    'selinkoc.ses': {
      name: 'Selin Koç', avatar: 'S', color: '#5c7f6a',
      bio: 'Ses tasarımı · @kirkindidev 🎧', followers: 402, following: 260
    },
    'istanbul.oyun.bulusmasi': {
      name: 'İstanbul Oyun Geliştirici Buluşması', avatar: 'İ', color: '#3f6fb0',
      bio: 'Aylık buluşmalar, paneller, jam\'ler. Kadıköy.', followers: 5120, following: 88
    },
    kod_avcisi: {
      name: 'kod avcısı', avatar: 'K', color: '#4a8f8f',
      bio: 'CTF meraklısı. Her şeyin bir izi vardır.', followers: 57, following: 402
    }
  },

  posts: [
    { id: 'k1', user: 'kirkindidev', date: '2023-02-08', img: 'hello', likes: 64,
      caption: 'Merhaba dünya! 👋 Global Game Jam 2023\'te “Gece Vardiyası” takımında tanışan iki kişi, bir stüdyo: Kırkindi Game Studio.\nAnlatıdan @elisaidileskin, koddan… o kendini tanıtmayı pek sevmiyor 🙂',
      comments: [{ u: 'elisaidileskin', t: 'Sonunda! 🕯️' }] },
    { id: 'k2', user: 'kirkindidev', date: '2024-11-02', img: 'office', likes: 112,
      caption: 'Samsun Teknopark\'taki yeni ofisimiz. 3. kat — bütün binada en geç sönen ışık bizimki.',
      comments: [{ u: 'selinkoc.ses', t: 'Ses odası nerede ama 😅' }] },
    { id: 'k3', user: 'kirkindidev', date: '2026-03-15', img: 'gm', likes: 418,
      caption: 'SON TANIK: 23:17 gold master tamamlandı! 🎉 v0.23.17-gm yayıncımıza teslim edildi.\nO gece neler yaşandığını kurucu ortağımız @elisaidileskin anlatsın 👀',
      comments: [{ u: 'deniz.aral.qa', t: 'KRK-231 artık yok. Huzurluyum.' }, { u: 'kod_avcisi', t: 'neden 23:17?' }, { u: 'kirkindidev', t: '@kod_avcisi oyunu oynayınca anlayacaksın 🙂' }] },
    { id: 'k4', user: 'kirkindidev', date: '2026-03-16', img: 'notes', likes: 203,
      caption: 'Sürüm notları ve build geçmişini soranlar için: teknik ortağımız bütün kayıtları kodhane.dev\'deki kişisel hesabında tutuyor 🔧\nBiz sosyal medyayı seviyoruz, o derleyiciyi.',
      comments: [
        { u: 'kod_avcisi', t: 'Hesabın adı ne? kodhane\'de “kirkindi” aratınca organizasyon çıkıyor ama üyeler görünmüyor.' },
        { u: 'kirkindidev', t: '@kod_avcisi Organizasyonun üye listesi gizli, evet 🙂 Kendisi jam\'den beri aynı takma adı kullanıyor. Elisa\'nın arşivi iyi bir başlangıç.' }
      ] },
    { id: 'k5', user: 'kirkindidev', date: '2026-03-18', img: 'team', likes: 177,
      caption: 'QA\'mız @deniz.aral.qa ve ses tasarımcımız @selinkoc.ses olmasa bu oyun olmazdı. Teşekkürler ekip! 🖤',
      comments: [] },

    { id: 'e1', user: 'elisaidileskin', date: '2025-08-21', img: 'cake', likes: 96,
      caption: 'Kod ortağıma iyi ki doğdun! 🎂 Adının yazılmasını istemiyor, pastaya yalnızca baş harflerini yazdırabildik: M.K.\nBu yıl da build\'lerini gece atmaya devam et 🌙',
      comments: [{ u: 'deniz.aral.qa', t: 'Pasta 23:17\'de mi kesildi 😄' }, { u: 'elisaidileskin', t: '@deniz.aral.qa tabii ki' }] },
    { id: 'e2', user: 'elisaidileskin', date: '2026-02-05', img: 'badges', likes: 141,
      caption: 'Üç yıl önce bu hafta: Global Game Jam 2023, takım “Gece Vardiyası”. Kırkindi o hafta doğdu.\nYaka kartlarımızı hâlâ saklıyorum 🥹 Ortağım o günden beri aynı takma adı kullanıyor; değiştirmesi için yalvarmayı bıraktım. (Fotoğrafa yakından bakan anlar.)\n#ggj2023 #gecevardiyasi',
      comments: [
        { u: 'deniz.aral.qa', t: 'Kartımdaki “test” hâlâ en dürüst unvanım 😂' },
        { u: 'kod_avcisi', t: 'ortağını da etiketlesene' },
        { u: 'elisaidileskin', t: '@kod_avcisi Pixgram\'da yok ki 🙂 Bütün dijital hayatı kod siteleri. Hep kendi baş harflerini takma adının önüne ekler, imza gibi.' }
      ] },
    { id: 'e3', user: 'elisaidileskin', date: '2026-03-14', time: '23:44', img: 'panel', likes: 208,
      caption: 'İstanbul\'da gece panelindeyim, Samsun\'da ise biri saat 23:17\'de build atıyor. Tahmin edin kim 🙃',
      comments: [{ u: 'selinkoc.ses', t: 'NAS\'ta ilk ben gördüm 😎' }, { u: 'istanbul.oyun.bulusmasi', t: 'Harika bir paneldi, teşekkürler!' }] },
    { id: 'e4', user: 'elisaidileskin', date: '2026-03-20', img: 'keyart', likes: 330,
      caption: '“SON TANIK: 23:17” adı nereden geliyor diye soranlara: bir gecenin tek tarafsız tanığı bir sunucuydu. Gerisi oyunda. ✍️',
      comments: [] },

    { id: 'd1', user: 'deniz.aral.qa', date: '2026-03-15', img: 'bug', likes: 48,
      caption: 'Bir bug\'ı yayından önce yakalamak > her şey. KRK-231, seni unutmayacağım 🐞', comments: [] },
    { id: 's1', user: 'selinkoc.ses', date: '2026-03-14', time: '23:12', img: 'wave', likes: 61,
      caption: 'Final ses paketi yüklendi. Evden, pijamayla, saat 23:12 🎧', comments: [] },
    { id: 'i1', user: 'istanbul.oyun.bulusmasi', date: '2026-03-10', img: 'poster', likes: 220,
      caption: '14 Mart Cumartesi 22:30 · Gece Paneli: “Küçük stüdyoda hikâye anlatmak”. Konuşmacılarımızdan biri @elisaidileskin! Canlı yayında.',
      comments: [] }
  ]
};
