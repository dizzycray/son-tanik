/* SON TANIK: 23:17 — sahne çizimleri (SVG) */
'use strict';

(function () {
  const defs = `
  <defs>
    <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151b26"/><stop offset="1" stop-color="#1d2533"/></linearGradient>
    <linearGradient id="gFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1714"/><stop offset="1" stop-color="#0c0b0a"/></linearGradient>
    <linearGradient id="gWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#1b2a44"/></linearGradient>
    <radialGradient id="gLamp" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#f3c66b" stop-opacity=".38"/><stop offset="1" stop-color="#f3c66b" stop-opacity="0"/></radialGradient>
    <radialGradient id="gScreen" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#6fb1ff" stop-opacity=".35"/><stop offset="1" stop-color="#6fb1ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="gVig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient>
    <pattern id="pRain" width="40" height="80" patternUnits="userSpaceOnUse"><line x1="10" y1="0" x2="4" y2="22" stroke="#9fb7d9" stroke-opacity=".25" stroke-width="1.4"/><line x1="30" y1="40" x2="24" y2="62" stroke="#9fb7d9" stroke-opacity=".18" stroke-width="1.2"/></pattern>
  </defs>`;

  const ofis = `
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Kırkindi ofisi, gece">
  ${defs}
  <rect width="1600" height="560" fill="url(#gWall)"/>
  <rect y="560" width="1600" height="340" fill="url(#gFloor)"/>
  <line x1="0" y1="560" x2="1600" y2="560" stroke="#2c3442" stroke-width="3"/>
  <!-- tavan lambası ışığı -->
  <ellipse cx="860" cy="560" rx="560" ry="360" fill="url(#gLamp)"/>

  <!-- PENCERE -->
  <g class="hs" data-id="h_pencere" tabindex="0">
    <rect x="60" y="90" width="360" height="340" rx="4" fill="url(#gWin)" stroke="#33405a" stroke-width="8"/>
    <g opacity=".85">
      <rect x="90" y="300" width="40" height="130" fill="#0a0f19"/><rect x="140" y="250" width="60" height="180" fill="#0d1422"/>
      <rect x="215" y="320" width="50" height="110" fill="#0a0f19"/><rect x="280" y="270" width="70" height="160" fill="#0e1625"/>
      <rect x="152" y="270" width="8" height="8" fill="#f2c46b"/><rect x="300" y="300" width="8" height="8" fill="#f2c46b"/><rect x="320" y="340" width="8" height="8" fill="#8fc0ff"/>
      <rect x="230" y="345" width="6" height="6" fill="#f2c46b"/>
    </g>
    <line x1="240" y1="90" x2="240" y2="430" stroke="#33405a" stroke-width="6"/>
    <rect class="hit" x="56" y="86" width="368" height="348" rx="6"/>
  </g>
  <clipPath id="cWin"><rect x="60" y="90" width="360" height="340"/></clipPath>
  <g clip-path="url(#cWin)" pointer-events="none"><rect x="60" y="10" width="360" height="420" fill="url(#pRain)" class="rain-anim"/></g>

  <!-- BEYAZ TAHTA -->
  <g class="hs" data-id="h_tahta" tabindex="0">
    <rect x="480" y="120" width="320" height="210" rx="4" fill="#c9cfd6" stroke="#59616e" stroke-width="6"/>
    <rect x="480" y="120" width="320" height="210" fill="#000" opacity=".35"/>
    <text x="500" y="160" font-family="Caveat,cursive" font-size="28" fill="#1f3b70">GM HAFTASI</text>
    <path d="M500 190 h170 M500 220 h220 M500 250 h150" stroke="#2a2a2a" stroke-width="4" stroke-linecap="round" opacity=".55"/>
    <path d="M500 290 h260" stroke="#b33a2c" stroke-width="5" stroke-linecap="round" opacity=".8"/>
    <rect x="720" y="150" width="50" height="50" fill="#e8c95a" transform="rotate(6 745 175)" opacity=".85"/>
    <rect class="hit" x="474" y="114" width="332" height="222" rx="6"/>
  </g>

  <!-- POSTER -->
  <g class="hs" data-id="h_poster" tabindex="0">
    <rect x="850" y="110" width="150" height="210" fill="#2a1d18" stroke="#0d0d0d" stroke-width="4"/>
    <circle cx="925" cy="180" r="38" fill="none" stroke="#e7b04b" stroke-width="3"/>
    <path d="M905 185 a20 20 0 1 0 30 -20 a16 16 0 1 1 -30 20z" fill="#e7b04b"/>
    <text x="925" y="255" text-anchor="middle" font-family="Inter" font-weight="700" font-size="18" fill="#e7b04b" letter-spacing="3">KIRKİNDİ</text>
    <text x="925" y="278" text-anchor="middle" font-family="Inter" font-size="10" fill="#c7a777" letter-spacing="3">GAME STUDIO</text>
    <rect class="hit" x="844" y="104" width="162" height="222"/>
  </g>

  <!-- SUNUCU ODASI KAPISI -->
  <g class="hs" data-id="h_sunucukapi" tabindex="0">
    <rect x="1060" y="150" width="160" height="410" fill="#202834" stroke="#3a4555" stroke-width="5"/>
    <rect x="1080" y="175" width="120" height="70" fill="#141a22"/>
    <text x="1140" y="218" text-anchor="middle" font-family="JetBrains Mono" font-size="15" fill="#7f8ea3">SUNUCU</text>
    <circle cx="1195" cy="360" r="6" fill="#999"/>
    <rect x="1232" y="315" width="28" height="44" rx="4" fill="#0f141b" stroke="#3a4555"/>
    <circle cx="1246" cy="330" r="5" class="led-red"/>
    <rect class="hit" x="1054" y="144" width="212" height="420"/>
  </g>

  <!-- GİRİŞ KAPISI + KARTLI GEÇİŞ -->
  <rect x="1400" y="140" width="170" height="420" fill="#1b222c" stroke="#3a4555" stroke-width="5"/>
  <rect x="1420" y="170" width="130" height="150" fill="#0c1118" opacity=".8"/>
  <text x="1485" y="250" text-anchor="middle" font-family="JetBrains Mono" font-size="14" fill="#55657a">ÇIKIŞ</text>
  <g class="hs" data-id="h_turnike" tabindex="0">
    <rect x="1330" y="300" width="44" height="72" rx="6" fill="#0f141b" stroke="#4b596c" stroke-width="3"/>
    <rect x="1338" y="312" width="28" height="18" fill="#1d4a2f"/>
    <circle cx="1352" cy="352" r="6" fill="#3ccf7a" opacity=".8"/>
    <rect class="hit" x="1318" y="290" width="68" height="94" rx="8"/>
  </g>

  <!-- MASA 1 (ELİSA) -->
  <g class="hs" data-id="h_masa1" tabindex="0">
    <rect x="90" y="610" width="440" height="26" fill="#3b2c22"/>
    <rect x="110" y="636" width="18" height="190" fill="#2a2019"/><rect x="492" y="636" width="18" height="190" fill="#2a2019"/>
    <rect x="230" y="500" width="170" height="104" rx="4" fill="#0e1218" stroke="#2c3442" stroke-width="5"/>
    <rect x="240" y="510" width="150" height="84" fill="#141c28"/>
    <text x="315" y="557" text-anchor="middle" font-family="JetBrains Mono" font-size="14" fill="#435069">🔒</text>
    <rect x="305" y="604" width="20" height="8" fill="#2c3442"/>
    <rect x="140" y="590" width="60" height="20" fill="#dcd2c0" opacity=".7"/>
    <rect class="hit" x="84" y="490" width="452" height="340"/>
  </g>

  <!-- MASA 2 (T. ORTAK) -->
  <ellipse cx="860" cy="560" rx="200" ry="90" fill="url(#gScreen)"/>
  <g class="hs" data-id="h_masa2" tabindex="0">
    <rect x="620" y="620" width="480" height="26" fill="#3b2c22"/>
    <rect x="640" y="646" width="18" height="190" fill="#2a2019"/><rect x="1062" y="646" width="18" height="190" fill="#2a2019"/>
    <rect x="760" y="480" width="210" height="130" rx="4" fill="#0e1218" stroke="#2c3442" stroke-width="5"/>
    <rect x="770" y="490" width="190" height="110" fill="#0d2238"/>
    <g font-family="JetBrains Mono" font-size="11" fill="#7fc3ff" opacity=".9">
      <text x="780" y="512">$ make gm</text><text x="780" y="530">tests ... ok</text><text x="780" y="548">signed: mk</text><text x="780" y="566">push v0.23.17-gm</text><text x="780" y="584">_</text>
    </g>
    <rect x="955" y="490" width="30" height="30" fill="#e8c95a" transform="rotate(8 970 505)"/>
    <rect x="855" y="610" width="20" height="10" fill="#2c3442"/>
    <!-- kupa -->
    <rect x="700" y="582" width="34" height="38" rx="4" fill="#d8d2c6"/><path d="M734 590 q16 8 0 22" stroke="#d8d2c6" stroke-width="5" fill="none"/>
    <rect x="696" y="614" width="46" height="8" fill="#f1ede4"/>
    <path d="M708 576 q6 -12 0 -22 M722 576 q6 -12 0 -22" stroke="#cfcfcf" stroke-width="2" fill="none" opacity=".35"/>
    <rect class="hit" x="614" y="470" width="372" height="370"/>
  </g>
  <!-- TELEFON -->
  <g class="hs" data-id="h_telefon" tabindex="0">
    <rect x="1000" y="588" width="80" height="34" rx="6" fill="#1a1d22" stroke="#3b414a" stroke-width="2"/>
    <rect x="1008" y="578" width="64" height="14" rx="7" fill="#24282f"/>
    <circle cx="1068" cy="606" r="5" class="led-blink"/>
    <rect class="hit" x="992" y="568" width="100" height="62" rx="6"/>
  </g>

  <!-- ÇÖP KUTUSU -->
  <g class="hs" data-id="h_cop" tabindex="0">
    <path d="M1110 720 h80 l-10 110 h-60z" fill="#2b2f36" stroke="#444b55" stroke-width="3"/>
    <circle cx="1135" cy="716" r="14" fill="#e6e1d6"/><circle cx="1160" cy="712" r="12" fill="#d7d1c4"/>
    <rect class="hit" x="1098" y="694" width="104" height="142"/>
  </g>

  <!-- GÜVENLİK MASASI -->
  <g class="hs" data-id="h_guvenlik" tabindex="0">
    <rect x="1250" y="640" width="320" height="30" fill="#2d3540"/>
    <rect x="1268" y="670" width="14" height="170" fill="#222932"/>
    <rect x="1310" y="608" width="110" height="34" fill="#4a3424" transform="rotate(-4 1365 625)"/>
    <line x1="1365" y1="606" x2="1365" y2="640" stroke="#2a1d15" stroke-width="3"/>
    <rect x="1450" y="600" width="70" height="40" rx="4" fill="#3a2f1f"/>
    <rect class="hit" x="1244" y="596" width="330" height="250"/>
  </g>
  <g class="hs" data-id="h_cekmece" tabindex="0">
    <rect x="1460" y="670" width="110" height="160" fill="#262d37" stroke="#3a4555" stroke-width="3"/>
    <rect x="1470" y="690" width="90" height="50" fill="#2d3540"/><rect x="1500" y="710" width="30" height="6" rx="3" fill="#8a96a8"/>
    <rect x="1470" y="755" width="90" height="50" fill="#2d3540"/><rect x="1500" y="775" width="30" height="6" rx="3" fill="#8a96a8"/>
    <rect class="hit" x="1454" y="664" width="122" height="172"/>
  </g>

  <rect width="1600" height="900" fill="url(#gVig)" pointer-events="none"/>
  <text x="1580" y="880" text-anchor="end" font-family="JetBrains Mono" font-size="16" fill="#e7b04b" opacity=".6" pointer-events="none">23:17</text>
</svg>`;

  const sunucu = `
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Sunucu odası">
  ${defs}
  <rect width="1600" height="900" fill="#0a0e14"/>
  <rect y="640" width="1600" height="260" fill="#0d1117"/>
  <g stroke="#141b25" stroke-width="2">${Array.from({length: 16}, (_, i) => `<line x1="${i*100}" y1="640" x2="${i*100 - 200}" y2="900"/>`).join('')}</g>
  <ellipse cx="760" cy="420" rx="520" ry="340" fill="#1d4f8a" opacity=".12"/>

  <!-- RACK 1 + İMZA LİSTESİ -->
  <g>
    <rect x="200" y="140" width="300" height="500" fill="#121820" stroke="#283241" stroke-width="5"/>
    ${Array.from({length: 10}, (_, i) => `<rect x="220" y="${165+i*45}" width="260" height="32" fill="#18202b"/><circle cx="460" cy="${181+i*45}" r="4" class="${i%3? 'led-green':'led-blink-g'}"/><circle cx="445" cy="${181+i*45}" r="4" fill="#2b74c9" opacity=".8"/>`).join('')}
  </g>
  <g class="hs" data-id="h_imza" tabindex="0">
    <rect x="236" y="420" width="120" height="150" fill="#e8e4d8" transform="rotate(-3 296 495)"/>
    <g transform="rotate(-3 296 495)" stroke="#6a6a6a" stroke-width="3"><line x1="250" y1="450" x2="340" y2="450"/><line x1="250" y1="475" x2="330" y2="475"/><line x1="250" y1="500" x2="335" y2="500"/><line x1="250" y1="525" x2="315" y2="525"/></g>
    <rect x="270" y="414" width="50" height="14" fill="#cfc9a8" opacity=".8" transform="rotate(-3 296 495)"/>
    <rect class="hit" x="226" y="404" width="142" height="178"/>
  </g>

  <!-- RACK 2 + KONSOL -->
  <g class="hs" data-id="h_rack" tabindex="0">
    <rect x="600" y="120" width="320" height="520" fill="#121820" stroke="#283241" stroke-width="5"/>
    <rect x="625" y="160" width="270" height="190" fill="#04090f" stroke="#2c3442" stroke-width="4"/>
    <g font-family="JetBrains Mono" font-size="13" fill="#59d68c">
      <text x="640" y="190">23:16:41 TEST ok</text><text x="640" y="214" fill="#ffcf6b">23:17:04 DELETE rc</text>
      <text x="640" y="238" fill="#ffcf6b">23:17:04 PUSH gm</text><text x="640" y="262">  imza=mk</text><text x="640" y="286">23:40:02 ssh exit</text><text x="640" y="320" class="cursor">█</text>
    </g>
    ${Array.from({length: 6}, (_, i) => `<rect x="620" y="${380+i*40}" width="280" height="28" fill="#18202b"/><circle cx="880" cy="${394+i*40}" r="4" class="led-green"/>`).join('')}
    <rect class="hit" x="594" y="114" width="332" height="532"/>
  </g>

  <!-- AĞ GEÇİDİ -->
  <g class="hs" data-id="h_vpn" tabindex="0">
    <rect x="1080" y="200" width="300" height="190" rx="6" fill="#161d27" stroke="#2c3442" stroke-width="4"/>
    <text x="1100" y="236" font-family="JetBrains Mono" font-size="15" fill="#8fb4e8">VPN-GW</text>
    ${Array.from({length: 8}, (_, i) => `<rect x="${1100+i*33}" y="300" width="24" height="18" fill="#0b0f15" stroke="#3a4555"/><circle cx="${1112+i*33}" cy="335" r="4" class="${i<3?'led-blink-g':'led-green'}"/>`).join('')}
    <rect x="1100" y="252" width="200" height="30" fill="#0b2033"/>
    <text x="1110" y="273" font-family="JetBrains Mono" font-size="13" fill="#7fc3ff">sessions: 3</text>
    <rect class="hit" x="1072" y="192" width="316" height="206"/>
  </g>

  <!-- GERİ -->
  <g class="hs" data-id="h_geri" tabindex="0">
    <rect x="40" y="740" width="230" height="90" rx="10" fill="#141b25" stroke="#e7b04b" stroke-opacity=".5" stroke-width="2"/>
    <text x="155" y="795" text-anchor="middle" font-family="Inter" font-weight="600" font-size="22" fill="#e7b04b">← Açık ofis</text>
    <rect class="hit" x="36" y="736" width="238" height="98" rx="12"/>
  </g>
  <rect width="1600" height="900" fill="url(#gVig)" pointer-events="none"/>
</svg>`;

  window.SCENES = { ofis, sunucu };
})();
