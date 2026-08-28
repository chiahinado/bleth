import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const write = async (relativePath, content) => {
  const target = path.join(docsRoot, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
};

const currentAttr = (current, key) => current === key ? ' aria-current="page"' : "";

const header = (prefix, current) => `<header class="site-header is-scrolled" data-header>
    <a class="site-logo" href="${prefix}" aria-label="BLETHLAND トップ">
      <span>BLETHLAND</span>
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="global-menu" data-menu-button>
      <span>MENU</span>
    </button>
    <nav class="global-menu" id="global-menu" aria-label="メインメニュー" data-menu>
      <a href="${prefix}live/"${currentAttr(current, "live")}>LIVE ARCHIVE</a>
      <a href="${prefix}members/"${currentAttr(current, "members")}>MEMBERS</a>
      <a href="${prefix}music/"${currentAttr(current, "music")}>MUSIC</a>
      <a href="${prefix}shows/"${currentAttr(current, "shows")}>SHOWS</a>
      <a href="${prefix}extras/"${currentAttr(current, "extras")}>EXTRAS</a>
    </nav>
  </header>`;


const page = ({ title, description, prefix, current, bodyClass, content, interactive = false }) => `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#eef9ff">
  <title>${escapeHtml(title)} | BLETHLAND</title>
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/css/main.css">
  <link rel="stylesheet" href="${prefix}assets/css/attractions.css">
  <link rel="stylesheet" href="${prefix}assets/css/polish.css">
  <script src="${prefix}assets/js/main.js" defer></script>
  <script src="${prefix}assets/js/attractions.js" defer></script>
</head>
<body class="park-attraction-page ${bodyClass}">
  <a class="skip-link" href="#main">本文へ移動</a>
  ${header(prefix, current)}
  <main id="main">
${content}
  </main>
</body>
</html>`;

const hero = ({ number, title, caption = "", compact = false }) => `    <section class="page-hero attraction-hero${compact ? " attraction-hero--compact" : ""}">
      <p class="eyebrow">${escapeHtml(number)}</p>
      <h1>${escapeHtml(title)}</h1>
${caption ? `      <p>${escapeHtml(caption)}</p>\n` : ""}    </section>`;

const songs = [
  {
    slug: "for-you",
    title: "for you…",
    writer: "SHO",
    audio: "for-you.mp3",
    comment: [
      "別れの歌しか書けなかった僕が結婚式でも歌えるような歌を書いた！",
      "この歌の主人公にもなった女の子に喜んでもらえたし、なによりもこれからこの歌を聴いた人が幸せを感じたり「いい歌だね」って言ってもらえたら嬉しい。",
    ],
    note: "MIDI作成：CAOLIN",
  },
  {
    slug: "summer-side",
    title: "Summer Side",
    writer: "SHO",
    audio: "summer-side.mp3",
    comment: [
      "とにかく夏らしい雰囲気と勢いを出したくて書いた一曲。",
      "この曲を簡単に言うと気持ちはいつも夏側（なつっかわ）。恋する時も楽しい時も夏らしい気分でいこう！",
    ],
  },
  {
    slug: "first-memory",
    title: "first memory",
    writer: "SHO",
    audio: "first-memory.mp3",
    note: "SPECIAL THANKS：Kei（PULYSILA）",
  },
  {
    slug: "free-way",
    title: "Free Way",
    writer: "SHO",
  },
  {
    slug: "say-yeah",
    title: "Say yeah!",
    writer: "SHO",
  },
  {
    slug: "cloudy",
    title: "CLOUDY",
    writer: "SHO",
  },
  {
    slug: "namida-no-egao",
    title: "涙の笑顔",
    writer: "SHO",
  },
  {
    slug: "precious",
    title: "Precious",
    writer: "SHO",
  },
  {
    slug: "chikai",
    title: "誓い",
    writer: "Tatsuya",
  },
];

const musicCards = songs.map((song, index) => `        <a class="track-card" href="${song.slug}/">
          <p class="track-number">TRACK ${String(index + 1).padStart(2, "0")}</p>
          <h3>${escapeHtml(song.title)}</h3>
${song.audio ? '          <span class="track-badge">AUDIO</span>\n' : ""}          <span class="track-arrow" aria-hidden="true">↗</span>
        </a>`).join("\n");

const musicIndex = page({
  title: "MUSIC",
  description: "BLETH MUSIC — 9 TRACKS.",
  prefix: "../",
  current: "music",
  bodyClass: "music-page",
  content: `${hero({ number: "ATTRACTION 03", title: "MUSIC" })}
    <section class="track-section section-shell" aria-labelledby="track-list-title">
      <div class="section-heading">
        <p class="section-kicker">09 SONGS</p>
        <h2 id="track-list-title">TRACKS</h2>
      </div>
      <div class="track-grid">
${musicCards}
      </div>
    </section>`,
});

await write("music/index.html", musicIndex);

for (const [index, song] of songs.entries()) {
  const previous = index > 0 ? songs[index - 1] : null;
  const next = index < songs.length - 1 ? songs[index + 1] : null;
  const audio = song.audio ? `<section class="song-meta park-panel">
          <p class="panel-label">AUDIO</p>
          <audio class="song-player" controls preload="metadata">
            <source src="../../assets/audio/music/${song.audio}" type="audio/mpeg">
            お使いのブラウザは音声再生に対応していません。
          </audio>
        </section>` : "";
  const comment = song.comment ? `<section class="song-comment park-panel">
          <p class="panel-label">COMMENT</p>
          <blockquote>${song.comment.map(escapeHtml).join("<br>")}</blockquote>
        </section>` : "";
  const html = page({
    title: `${song.title} | MUSIC`,
    description: `BLETH「${song.title}」のクレジット${song.audio ? "・音源" : ""}。`,
    prefix: "../../",
    current: "music",
    bodyClass: "music-page",
    content: `${hero({ number: `TRACK ${String(index + 1).padStart(2, "0")}`, title: song.title, compact: true })}
    <div class="song-content section-shell">
      <aside class="song-sidebar">
        <section class="song-meta park-panel">
          <p class="panel-label">CREDITS</p>
          <dl>
            <div><dt>WORDS &amp; MUSIC</dt><dd>${escapeHtml(song.writer)}</dd></div>
            <div><dt>ARRANGED</dt><dd>BLETH</dd></div>
${song.note ? `            <div><dt>NOTE</dt><dd>${escapeHtml(song.note)}</dd></div>\n` : ""}          </dl>
        </section>
${[audio, comment].filter(Boolean).map((block) => `        ${block}\n`).join("")}      </aside>
    </div>
    <nav class="song-pager section-shell" aria-label="楽曲ページ">
      ${previous ? `<a href="../${previous.slug}/"><small>← PREV</small><strong>${escapeHtml(previous.title)}</strong></a>` : "<span></span>"}
      <a class="song-pager-home" href="../">MUSIC</a>
      ${next ? `<a href="../${next.slug}/"><small>NEXT →</small><strong>${escapeHtml(next.title)}</strong></a>` : "<span></span>"}
    </nav>`,
  });
  await write(`music/${song.slug}/index.html`, html);
}

const shows = [
  { d: "2004-10-03", display: "2004.10.03", title: "第3回 三重ミュージックジャンボリー", venue: "伊勢市観光文化会館", detail: "BLETHほか全16グループ · 入場無料" },
  { d: "2004-09-12", display: "2004.09.12", title: "NALU LIVE", venue: "live studio NALU", detail: "BLETHほか全4バンド · 18:00 START · 500円" },
  { d: "2004-07-24", display: "2004.07.24–25", title: "SUZUKA 8HOURS 2004", venue: "鈴鹿サーキット コカ・コーラマルチステーション", detail: "BLETH、ELIANA、SORTITA、JURASSIC" },
  { d: "2003-08-03", display: "2003.08.03", title: "2003 ミュージックジャンボリー", venue: "伊勢市観光文化会館", detail: "BLETHほか全23グループ · 入場無料" },
  { d: "2003-07-12", display: "2003.07.12", title: "SUPER SONIC SHOW 1st summer presentation", venue: "いせトピア", detail: "BLETH、EXCESS、HEAVEN'S OUT、MARENKYES、RAINBOW" },
  { d: "2003-03-30", display: "2003.03.30", title: "稲川淳二の怖い話とROCK LIVE", venue: "伊勢市観光文化会館", detail: "司会：稲川淳二 · 全席自由／無料" },
  { d: "2003-02-22", display: "2003.02.22", title: "LIVE AT M'AXA", venue: "M'AXA", detail: "剛兵太、BLETH、PULYSILA · 1,500円（1ドリンク）" },
  { d: "2003-02-09", display: "2003.02.09", title: "LIVE AT NALU", venue: "Live House NALU", detail: "S.H.R、暇人、PURUTNYUM、RAINBOW、BLETH" },
  { d: "2002-12-21", display: "2002.12.21", title: "14th LIGHT MUSIC FESTIVAL", venue: "嬉野町ふるさと会館", detail: "三重県民文化祭 · 前売1,000円／当日1,200円" },
  { d: "2002-11-28", display: "2002.11.28", title: "DRAGON MAGIC LIVE", venue: "東京・渋谷表参道 ラ・パン・エ・アロ", detail: "マジックワンコーポレーション主催" },
  { d: "2002-11-16", display: "2002.11.16", title: "HELLO FROM MIE", venue: "嬉野町ふるさと会館", detail: "NHKラジオ公開生放送" },
  { d: "2002-03-09", display: "2002.03.09", title: "津市民音楽祭", venue: "津リージョンプラザ", detail: "ゲスト出演" },
  { d: "2001-12-22", display: "2001.12.22", title: "13th LIGHT MUSIC FESTIVAL", venue: "玉城町農村環境改善センター", detail: "三重県民文化祭 · 前売1,000円／当日1,200円", live: "2001-12-22" },
  { d: "2001-08-19", display: "2001.08.19", title: "白山町 星のライブ", venue: "白山町", detail: "BLETHほか全6バンド · 19:00 START" },
  { d: "2001-08-04", display: "2001.08.04", title: "美里村 村おこしライブ", venue: "美里村", detail: "19:00 START · 無料", live: "2001-08-04" },
  { d: "2001-08-01", display: "2001.08.01", title: "伊勢神宮 外宮前 夏祭り", venue: "伊勢神宮 外宮前", detail: "BLETH、EXCESS · 19:00 START · 無料", live: "2001-08-01" },
  { d: "2001-07-15", display: "2001.07.15", title: "河崎町 天王祭", venue: "河崎町", detail: "BLETH · 19:30 START · 無料", live: "2001-07-15" },
  { d: "2001-04-01", display: "2001.04.01", title: "LIVEHOUSE QUESTION", venue: "LIVEHOUSE QUESTION", detail: "前売800円／当日1,000円", live: "2001-04-01" },
  { d: "2001-03-03", display: "2001.03.03", title: "Live in AX", venue: "Live in AX", detail: "BLETH、SHINE、PULYSILA、Kuhnheit · 1,500円", live: "2001-03-03" },
  { d: "2001-01-13", display: "2001.01.13", title: "Live in AX", venue: "Live in AX", detail: "毒林檎、BLETH、PULYSILA · 1,500円", live: "2001-01-13" },
  { d: "2000-12-23", display: "2000.12.23", title: "12th LIGHT MUSIC FESTIVAL", venue: "玉城町農村環境改善センター", detail: "三重県民文化祭 · 前売1,000円／当日1,200円", live: "2000-12-23" },
];

const showYears = [...new Set(shows.map((show) => show.d.slice(0, 4)))];
const showSections = showYears.map((year) => {
  const yearShows = shows.filter((show) => show.d.startsWith(year));
  return `      <section class="show-year" aria-labelledby="shows-${year}">
        <div class="show-year-heading"><h2 id="shows-${year}">${year}</h2><p>${yearShows.length} RECORDS</p></div>
        <ol class="show-list">
${yearShows.map((show) => `          <li class="show-card">
            <time datetime="${show.d}">${show.display}</time>
            <div><h3>${escapeHtml(show.title)}</h3><p>${escapeHtml(show.venue)} · ${escapeHtml(show.detail)}</p></div>
${show.live ? `            <a href="../live/${show.live}/">PHOTO ↗</a>\n` : ""}          </li>`).join("\n")}
        </ol>
      </section>`;
}).join("\n");

const showsIndex = page({
  title: "SHOWS",
  description: "BLETH SHOWS — 2000–2004.",
  prefix: "../",
  current: "shows",
  bodyClass: "shows-page",
  content: `${hero({ number: "ATTRACTION 04", title: "SHOWS" })}
    <section class="next-show section-shell" aria-labelledby="next-show-title">
      <p class="section-kicker">NEXT SHOW</p>
      <h2 id="next-show-title">NO SCHEDULE</h2>
    </section>
    <div class="shows-archive section-shell">
${showSections}
    </div>`,
});

await write("shows/index.html", showsIndex);

const extrasIndex = page({
  title: "EXTRAS",
  description: "BLETHLAND EXTRAS.",
  prefix: "../",
  current: "extras",
  bodyClass: "extras-page",
  content: `${hero({ number: "ATTRACTION 05", title: "EXTRAS" })}
    <section class="extras-guide section-shell" aria-labelledby="extras-guide-title">
      <div class="section-heading"><p class="section-kicker">04 CONTENTS</p><h2 id="extras-guide-title">EXTRA ATTRACTIONS</h2></div>
      <div class="extras-grid">
        <article class="extra-card extra-card--quiz">
          <p class="section-kicker">CHALLENGE</p><h3>BLETH QUIZ</h3><p class="card-caption">BLETHクイズ</p>
          <span class="archive-status">CLOSED</span>
        </article>
        <article class="extra-card extra-card--fortune">
          <p class="section-kicker">TODAY'S TICKET</p><h3>BLETHLAND FORTUNE</h3><p class="card-caption">おみくじ</p>
          <span class="archive-status">CLOSED</span>
        </article>
        <article class="extra-card extra-card--haunted">
          <p class="section-kicker">NIGHT RIDE</p><h3>HAUNTED HOUSE</h3><p class="card-caption">お化け屋敷</p>
          <span class="archive-status">CLOSED</span>
        </article>
        <article class="extra-card extra-card--hold">
          <p class="section-kicker">SPECIAL</p><h3>GLAY COPY BAND</h3><p class="card-caption">全国コピーバンド</p>
          <span class="archive-status">CLOSED</span>
        </article>
      </div>
    </section>`,
});

await write("extras/index.html", extrasIndex);

const quizPage = page({
  title: "BLETH QUIZ | EXTRAS",
  description: "BLETHLANDのクイズは現在休止中です。",
  prefix: "../../",
  current: "extras",
  bodyClass: "quiz-page",
  interactive: true,
  content: `${hero({ number: "EXTRAS", title: "BLETH QUIZ", compact: true })}
    <section class="closed-screen section-shell" aria-label="CLOSED"><strong>CLOSED</strong><a href="../">← EXTRAS</a></section>`,
});

await write("extras/quiz/index.html", quizPage);

const fortunePage = page({
  title: "BLETHLAND FORTUNE | EXTRAS",
  description: "BLETHLANDのおみくじは現在休止中です。",
  prefix: "../../",
  current: "extras",
  bodyClass: "fortune-page",
  interactive: true,
  content: `${hero({ number: "EXTRAS", title: "BLETHLAND FORTUNE", compact: true })}
    <section class="closed-screen section-shell" aria-label="CLOSED"><strong>CLOSED</strong><a href="../">← EXTRAS</a></section>`,
});

await write("extras/fortune/index.html", fortunePage);

const hauntedPage = page({
  title: "HAUNTED HOUSE | EXTRAS",
  description: "BLETHLANDのお化け屋敷は現在休止中です。",
  prefix: "../../",
  current: "extras",
  bodyClass: "haunted-page",
  interactive: true,
  content: `${hero({ number: "EXTRAS", title: "HAUNTED HOUSE", compact: true })}
    <section class="closed-screen section-shell" aria-label="CLOSED"><strong>CLOSED</strong><a href="../">← EXTRAS</a></section>`,
});

await write("extras/haunted-house/index.html", hauntedPage);

const fanclubPage = page({
  title: "I LOVE BLETH",
  description: "BLETH OFFICIAL FAN CLUB — I LOVE BLETH.",
  prefix: "../",
  current: "fanclub",
  bodyClass: "fanclub-page",
  content: `${hero({ number: "SIDE GATE 01", title: "I LOVE BLETH" })}
    <section class="side-gate-archive section-shell" aria-labelledby="fanclub-benefits-title">
      <div class="fanclub-gate park-panel">
        <p class="section-kicker">WELCOME TO</p>
        <h2>I ♥ BLETH</h2>
        <p class="gate-caption">OFFICIAL FAN CLUB</p>
      </div>
      <div class="section-heading">
        <p class="section-kicker">MEMBER BENEFITS</p>
        <h2 id="fanclub-benefits-title">BENEFITS</h2>
      </div>
      <div class="benefit-grid">
        <article class="benefit-card"><p class="benefit-number">01</p><h3>LIVE NEWS</h3><p>ライブ情報を携帯メールへ。</p></article>
        <article class="benefit-card"><p class="benefit-number">02</p><h3>BIRTHDAY CARD</h3><p>誕生日にBLETHからカードを。</p></article>
        <article class="benefit-card"><p class="benefit-number">03</p><h3>TICKET</h3><p>ライブチケットの優先案内。</p></article>
      </div>
      <section class="archive-process park-panel" aria-labelledby="fanclub-entry-title">
        <p class="section-kicker">JOIN</p><h2 id="fanclub-entry-title">ENTRY</h2>
        <ol>
          <li>ライブ会場で申込用紙を受け取る。</li>
          <li>必要事項を記入し、会場の応募箱へ入れる。</li>
          <li>確認後に本登録となり、特典案内を受け取る。</li>
        </ol>
      </section>
    </section>`,
});

await write("fanclub/index.html", fanclubPage);

const linksPage = page({
  title: "LINKS",
  description: "BLETHLAND LINKS & SITE BANNERS.",
  prefix: "../",
  current: "links",
  bodyClass: "links-page",
  content: `${hero({ number: "SIDE GATE 02", title: "LINKS" })}
    <section class="side-gate-archive section-shell" aria-labelledby="links-status-title">
      <div class="link-status park-panel">
        <div class="link-status-sign" aria-hidden="true">LINKS</div>
        <div><p class="section-kicker">DIRECTORY</p><h2 id="links-status-title">NO LINKS</h2></div>
      </div>
      <section class="banner-museum park-panel" id="banners" aria-labelledby="banner-title">
        <p class="section-kicker">FOR YOUR SITE</p><h2 id="banner-title">SITE BANNERS</h2>
        <div class="banner-gallery">
          <article class="banner-specimen"><div class="banner-art banner-art--motion"><span>BLETHLAND</span></div><h3>NO.01 · MOTION</h3></article>
          <article class="banner-specimen"><div class="banner-art"><span>BLETHLAND</span></div><h3>NO.02 · CLASSIC</h3></article>
          <article class="banner-specimen"><div class="banner-art banner-art--pink"><span>BLETH</span></div><h3>NO.03 · BAND</h3></article>
          <article class="banner-specimen"><div class="banner-art banner-art--night"><span>B! LAND</span></div><h3>NO.04 · NIGHT</h3></article>
        </div>
      </section>
    </section>`,
});

await write("links/index.html", linksPage);

const notFoundPage = page({
  title: "404",
  description: "404 — LOST IN BLETHLAND.",
  prefix: "/bleth/",
  current: "",
  bodyClass: "not-found-page",
  content: `${hero({ number: "LOST IN BLETHLAND", title: "404", compact: true })}
    <section class="lost-and-found section-shell">
      <div class="lost-gate park-panel">
        <div class="lost-signpost" aria-hidden="true"><span class="direction-sign direction-sign--home">BLETHLAND GATE</span><span class="direction-sign direction-sign--park">PARK MAP</span></div>
        <p class="section-kicker">LOST &amp; FOUND</p>
        <h2>WRONG TURN.</h2>
        <div class="lost-actions"><a class="park-button" href="/bleth/">PARK MAP</a></div>
      </div>
    </section>`,
});

await write("404.html", notFoundPage);

console.log(`Park sections generated: ${songs.length + 9} pages`);
