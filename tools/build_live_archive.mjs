import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(projectRoot, "docs");

const details = [
  {
    d: "1999-06-11", date: "1999年6月11日（金）", title: "Live in AX", venue: "Live in AX",
    admission: "1,500円（1ドリンク付き）",
    summary: "BLETHの初ライブ。観客は約30人。",
    performers: ["イエモンのコピー", "PARANOIA"], images: ["photo-01.jpg"]
  },
  {
    d: "1999-09-11", date: "1999年9月11日（土）", title: "BLETH主催ライブ", venue: "いせトピア",
    admission: "500円",
    summary: "BLETH初のホールライブ。観客は約300人。",
    performers: ["trance floor", "COMPREETS", "PARANOIA"], images: ["photo-01.jpg", "ticket-01.jpg"]
  },
  {
    d: "1999-12-11", date: "1999年12月11日（土）", title: "X'mas LIVE 1999", venue: "ハートプラザみその",
    admission: "1,000円",
    summary: "CEIXFLOUR主催のクリスマスイベント。会場を風船で飾った、1999年最後のライブ。",
    performers: ["Orange marmalade", "CEIXFLOUR"], images: ["photo-01.jpg", "ticket-01.jpg"]
  },
  {
    d: "2000-01-10", date: "2000年1月10日（月）", title: "成人式イベント", venue: "マリーナ河芸",
    admission: "無料", summary: "河芸町の成人式イベントにゲスト出演。",
    performers: [], images: ["photo-01.jpg"]
  },
  {
    d: "2000-03-26", date: "2000年3月26日（日）", title: "AMATEUR BAND FESTIVAL Vol.3", venue: "阿児アリーナ",
    admission: "600円", summary: "阿児アリーナのアマチュアバンドフェスティバルに出演。",
    performers: [], images: ["photo-01.jpg", "ticket-01.jpg"]
  },
  {
    d: "2000-04-01", date: "2000年4月1日（土）", title: "END OF A CENTURY GIG", venue: "三重県営サンアリーナ",
    admission: "800円", summary: "三重県営サンアリーナのサブアリーナでライブ。",
    performers: ["BAD PENGUIN", "Forever Groly", "Pott L'Ar"], images: ["photo-01.jpg", "ticket-01.jpg"]
  },
  {
    d: "2000-06-11", date: "2000年6月11日（日）", title: "初心に帰ろうLIVE", venue: "Live in AX",
    admission: "1,000円", summary: "BLETHの初ライブから1年。Live in AXで「初心に帰ろうLIVE」を開催。",
    performers: ["ラルクのコピー", "モロヘイヤ"], images: ["photo-01.jpg"]
  },
  {
    d: "2000-09-15", date: "2000年9月15日（金）", title: "END OF A CENTURY GIG", venue: "LIVEHOUSE QUESTION",
    admission: "500円", summary: "小さな会場を多くの観客が埋める、大きな盛り上がりのライブ。",
    performers: ["ラルクのコピー", "PULYSILA", "モロヘイヤ"], images: ["photo-01.jpg", "photo-02.jpg", "ticket-01.jpg"]
  },
  {
    d: "2000-12-23", date: "2000年12月23日（土）", title: "12th LIGHT MUSIC FESTIVAL", venue: "玉城町農村環境改善センター",
    admission: "1,000円",
    summary: "第15回国民文化祭・ひろしま2000協賛事業、第12回LIGHT MUSIC FESTIVAL。BLETHは予選を通過して出演。",
    performers: ["Shine☆", "すぴりっつ", "P・Yドリーム", "BILLIEE DROP", "EXCESS"],
    images: ["photo-01.jpg", "photo-02.jpg", "photo-03.jpg", "ticket-01.png"]
  },
  {
    d: "2001-01-13", date: "2001年1月13日（土）", title: "Live in AX", venue: "Live in AX",
    admission: "1,500円（1ドリンク付き）",
    summary: "PULYSILAのマンスリーライブに参加。ミスチルの楽曲を演奏。",
    performers: ["毒林檎", "PULYSILA"], images: ["photo-01.jpg"]
  },
  {
    d: "2001-03-03", date: "2001年3月3日（土）", title: "Live in AX", venue: "Live in AX",
    admission: "1,500円（1ドリンク付き）",
    summary: "PULYSILAのマンスリーライブに参加。GLAYの楽曲とBLETHの楽曲を含む6曲を演奏し、SHINEのAX最終ライブを見送る。",
    performers: ["Kuhnheit", "PULYSILA"], images: ["photo-01.jpg", "photo-02.jpg"]
  },
  {
    d: "2001-04-01", date: "2001年4月1日（日）", title: "LIVEHOUSE QUESTION", venue: "LIVEHOUSE QUESTION",
    admission: "800円", summary: "会場いっぱいの観客とともに盛り上がったライブ。",
    performers: ["ジュディマリのコピー", "Kuhnheit", "モロヘイヤ"],
    images: ["photo-01.jpg", "photo-02.jpg", "photo-03.jpg"]
  },
  {
    d: "2001-07-15", date: "2001年7月15日（日）", title: "河崎天皇祭", venue: "河崎町",
    admission: "無料", summary: "トラック上のステージでのBLETH単独ライブ。多くの来場者が集まる夏祭りでの公演です。",
    performers: [], images: ["photo-01.jpg", "photo-02.jpg"]
  },
  {
    d: "2001-08-01", date: "2001年8月1日（水）", title: "伊勢神宮夏祭り", venue: "伊勢神宮 外宮前",
    admission: "無料", summary: "夏祭りでのライブ。EXCESSと共演。",
    performers: ["EXCESS"], images: ["photo-01.jpg", "photo-02.jpg"]
  },
  {
    d: "2001-08-04", date: "2001年8月4日（土）", title: "美里村夏祭り", venue: "美里村",
    admission: "無料",
    summary: "K-Net（三重県軽音楽振興協議会）からの案内で、祭りのステージへ出演。会場全体が大きく盛り上がる。",
    performers: [], images: ["photo-01.jpg"]
  },
  {
    d: "2001-12-22", date: "2001年12月22日（土）", title: "13th LIGHT MUSIC FESTIVAL", venue: "玉城町農村環境改善センター",
    admission: "1,000円",
    summary: "第7回みえ県民文化祭の第13回LIGHT MUSIC FESTIVAL。BLETHは2年連続の出場となり、20分のステージを披露。",
    performers: ["玉城中学校吹奏楽部", "ブルース・カンパニー", "Tu.Doo.Pi.Doon", "BLUES CLOUD", "SCOOP", "EXCESS", "マリアエレナ"],
    images: ["photo-01.jpg", "photo-02.jpg", "photo-03.jpg", "photo-04.jpg"]
  }
];

const timelineOnly = [
  { d: "2004-07-24", display: "2004.07.24–25", title: "SUZUKA 8HOURS 2004", venue: "鈴鹿サーキット コカ・コーラマルチステーション", note: "BLETH、ELIANA、SORTITA、JURASSIC" },
  { d: "2001-08-19", title: "白山町 星のライブ", venue: "白山町" },
  { d: "2002-03-09", title: "津市民音楽祭", venue: "津リージョンプラザ", note: "ゲスト出演" },
  { d: "2002-11-16", title: "HELLO FROM MIE", venue: "嬉野町ふるさと会館", note: "NHKラジオ公開生放送" },
  { d: "2002-11-28", title: "DRAGON MAGIC LIVE", venue: "渋谷表参道 ラパンエアロ" },
  { d: "2002-12-21", title: "14th LIGHT MUSIC FESTIVAL", venue: "嬉野町ふるさと会館", note: "三重県民文化祭" },
  { d: "2003-02-09", title: "LIVE AT NALU", venue: "LIVEHOUSE NALU" },
  { d: "2003-02-22", title: "LIVE AT M'AXA", venue: "M'AXA" },
  { d: "2003-03-30", title: "稲川淳二の怖い話とROCKLIVE", venue: "伊勢市観光文化会館" },
  { d: "2003-07-12", title: "SUPER SONIC SHOW", venue: "いせトピア" },
  { d: "2003-08-03", title: "2003 ミュージックジャンボリー", venue: "伊勢市観光文化会館" }
];

const detailMap = new Map(details.map((event) => [event.d, event]));
const events = [...details, ...timelineOnly]
  .map((event) => ({ ...event, detail: detailMap.has(event.d) }))
  .sort((a, b) => b.d.localeCompare(a.d));

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

const header = (prefix, liveHref) => `<header class="site-header is-scrolled" data-header>
    <a class="site-logo" href="${prefix}" aria-label="BLETHLAND トップ">
      <span>BLETHLAND</span>
      <small>THE OFFICIAL SITE OF BLETH</small>
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="global-menu" data-menu-button>
      <span>MENU</span>
    </button>
    <nav class="global-menu" id="global-menu" aria-label="メインメニュー" data-menu>
      <a href="${liveHref}" aria-current="page">LIVE</a>
      <a href="${prefix}members/">MEMBERS</a>
      <a href="${prefix}music/">MUSIC</a>
      <a href="${prefix}extras/">EXTRAS</a>
      <a href="${prefix}haunted-house/">HAUNTED HOUSE</a>
    </nav>
  </header>`;

const years = [...new Set(events.map((event) => event.d.slice(0, 4)))];
const timeline = years.map((year) => {
  const items = events.filter((event) => event.d.startsWith(year));
  return `<section class="timeline-year" aria-labelledby="year-${year}">
          <h2 id="year-${year}">${year}</h2>
          <div class="timeline-list">
${items.map((event) => `            <article class="timeline-item">
              <time datetime="${event.d}">${event.display || event.d.replaceAll("-", ".")}</time>
              <div>
                <h3>${escapeHtml(event.title)}</h3>
                <p>${escapeHtml(event.venue)}${event.note ? ` · ${escapeHtml(event.note)}` : ""}</p>
              </div>
              ${event.detail ? `<a href="${event.d}/" aria-label="${escapeHtml(event.title)}の詳細を見る">詳細を見る</a>` : "<span>公演情報</span>"}
            </article>`).join("\n")}
          </div>
        </section>`;
}).join("\n\n");

const liveIndex = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="BLETHのライブ情報を、日付・会場・写真とともに紹介します。">
  <meta name="theme-color" content="#eef9ff">
  <title>LIVE | BLETHLAND</title>
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/live.css">
  <link rel="stylesheet" href="../assets/css/park-theme.css">
  <script src="../assets/js/main.js" defer></script>
</head>
<body class="live-page">
  <a class="skip-link" href="#main">本文へ移動</a>
  ${header("../", "./")}
  <main id="main">
    <section class="page-hero live-hero">
      <p class="eyebrow">ATTRACTION 01</p>
      <h1>LIVE</h1>
      <p>ライブ情報</p>
    </section>
    <section class="live-upcoming section-shell" aria-labelledby="next-live-title">
      <p class="section-kicker">NEXT LIVE</p>
      <h2 id="next-live-title">これからの予定</h2>
      <div class="no-live-schedule"><strong>現在、ライブの予定はありません。</strong></div>
    </section>
    <section class="live-intro section-shell" aria-labelledby="live-history-title">
      <p class="section-kicker">LIVE HISTORY</p>
      <h2 id="live-history-title">これまでのライブ</h2>
      <p class="section-lead">これまでのライブを、日付・会場・写真とともに紹介します。</p>
      <p class="archive-count">1999–2004 · 27 EVENTS · 16 PHOTO PAGES</p>
    </section>
    <div class="timeline section-shell">
${timeline}
    </div>
    <nav class="page-return section-shell" aria-label="ページ移動">
      <a class="text-link" href="../">BLETHLANDへ戻る</a>
    </nav>
  </main>
</body>
</html>`;

const imageCaption = (event, file, photoIndex, photoTotal) => {
  if (file.startsWith("ticket")) return "チケット";
  return photoTotal > 1 ? `ライブ写真 ${photoIndex}` : "ライブ写真";
};

for (const [index, event] of details.entries()) {
  const previous = index > 0 ? details[index - 1] : null;
  const next = index < details.length - 1 ? details[index + 1] : null;
  const photoTotal = event.images.filter((file) => file.startsWith("photo")).length;
  let photoIndex = 0;
  const performers = event.performers.length ? `<section class="event-panel">
          <p class="section-kicker">LINEUP</p>
          <h2>出演</h2>
          <ul class="performer-list">
${event.performers.map((name) => `            <li>${escapeHtml(name)}</li>`).join("\n")}
          </ul>
        </section>` : "";
  const gallery = event.images.map((file) => {
    if (file.startsWith("photo")) photoIndex += 1;
    const caption = imageCaption(event, file, photoIndex, photoTotal);
    const publicFile = `${event.d}-${file}`;
    return `          <figure>
            <a href="../../assets/images/live/${publicFile}" target="_blank" rel="noopener">
              <img src="../../assets/images/live/${publicFile}" loading="lazy" alt="${escapeHtml(event.title)}の${caption}">
            </a>
            <figcaption>${caption}</figcaption>
          </figure>`;
  }).join("\n");
  const pager = `<nav class="event-pager" aria-label="ライブ詳細ページ">
        ${previous ? `<a href="../${previous.d}/"><span>PREVIOUS</span>${escapeHtml(previous.date)}</a>` : "<span></span>"}
        <a class="archive-return" href="../">LIVEへ戻る</a>
        ${next ? `<a class="next-event" href="../${next.d}/"><span>NEXT</span>${escapeHtml(next.date)}</a>` : "<span></span>"}
      </nav>`;
  const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(event.date)} ${escapeHtml(event.title)}のライブ情報。">
  <meta name="theme-color" content="#eef9ff">
  <title>${escapeHtml(event.title)} | LIVE | BLETHLAND</title>
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../assets/css/main.css">
  <link rel="stylesheet" href="../../assets/css/live.css">
  <link rel="stylesheet" href="../../assets/css/park-theme.css">
  <script src="../../assets/js/main.js" defer></script>
</head>
<body class="live-detail-page">
  <a class="skip-link" href="#main">本文へ移動</a>
  ${header("../../", "../")}
  <main id="main">
    <nav class="breadcrumb section-shell" aria-label="パンくず">
      <a href="../../">BLETHLAND</a><span aria-hidden="true">/</span>
      <a href="../">LIVE</a><span aria-hidden="true">/</span>
      <span>${escapeHtml(event.date)}</span>
    </nav>
    <header class="event-hero section-shell">
      <p class="eyebrow">LIVE</p>
      <time datetime="${event.d}">${escapeHtml(event.date)}</time>
      <h1>${escapeHtml(event.title)}</h1>
      <p class="event-venue">${escapeHtml(event.venue)}</p>
    </header>
    <div class="event-content section-shell">
      <section class="event-panel event-summary">
        <p class="section-kicker">LIVE REPORT</p>
        <h2>ライブレポート</h2>
        <p>${escapeHtml(event.summary)}</p>
      </section>
      <section class="event-panel event-info">
        <p class="section-kicker">EVENT INFO</p>
        <h2>公演情報</h2>
        <dl>
          <div><dt>DATE</dt><dd>${escapeHtml(event.date)}</dd></div>
          <div><dt>VENUE</dt><dd>${escapeHtml(event.venue)}</dd></div>
          <div><dt>ADMISSION</dt><dd>${escapeHtml(event.admission)}</dd></div>
        </dl>
      </section>
${performers ? `      ${performers}\n` : ""}      <section class="event-gallery" aria-labelledby="gallery-title">
        <div class="section-heading">
          <p class="section-kicker">PHOTO</p>
          <h2 id="gallery-title">写真・資料</h2>
        </div>
        <div class="gallery-grid">
${gallery}
        </div>
        <p class="image-note">小さな画像は、原寸を基準に掲載しています。</p>
      </section>
      ${pager}
    </div>
  </main>
</body>
</html>`;
  await write(`live/${event.d}/index.html`, html);
}

await write("live/index.html", liveIndex);

const liveCss = `.live-hero {
  background:
    radial-gradient(circle at 82% 24%, rgba(255, 107, 138, 0.3), transparent 22rem),
    linear-gradient(145deg, #07111f, #4a1830);
}

.live-hero > p:last-child {
  color: var(--pink);
}

.live-upcoming {
  padding-block: 90px 38px;
}

.live-upcoming h2,
.live-intro h2 {
  margin: 0;
  font-size: clamp(2.35rem, 6vw, 4.8rem);
  line-height: 1;
  letter-spacing: -0.045em;
}

.no-live-schedule {
  margin-top: 30px;
  padding: clamp(24px, 4vw, 38px);
  color: var(--ink);
  background: #fff5c9;
  border: 3px solid #ffd15d;
  border-radius: 24px;
  box-shadow: 0 7px 0 #a06a18;
  font-size: clamp(1rem, 2.4vw, 1.35rem);
}

.live-intro {
  padding-block: 56px 54px;
}

.live-intro h2 {
  color: var(--paper);
}

.live-intro .section-lead {
  margin-inline: 0;
}

.archive-count {
  margin: 30px 0 0;
  color: var(--pink);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.13em;
}

.timeline {
  padding-bottom: 100px;
}

.timeline-year {
  display: grid;
  grid-template-columns: minmax(120px, 0.28fr) 1fr;
  gap: clamp(28px, 6vw, 86px);
  padding: 46px 0;
  border-top: 1px solid var(--line);
}

.timeline-year > h2 {
  position: sticky;
  top: calc(var(--header-height) + 28px);
  align-self: start;
  margin: 0;
  color: var(--pink);
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 0.9;
  letter-spacing: -0.065em;
}

.timeline-list {
  display: grid;
}

.timeline-item {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 24px;
  min-height: 108px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.timeline-item:first-child {
  border-top: 1px solid var(--line);
}

.timeline-item time,
.timeline-item > span {
  color: var(--paper-muted);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.09em;
}

.timeline-item h3 {
  margin: 0;
  font-size: clamp(1.1rem, 2.4vw, 1.7rem);
  line-height: 1.25;
}

.timeline-item p {
  margin: 7px 0 0;
  color: var(--paper-muted);
  font-size: 0.86rem;
}

.timeline-item > a {
  padding: 8px 13px;
  color: var(--ink);
  background: var(--pink);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 900;
  text-decoration: none;
}

.page-return {
  padding-bottom: 120px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: calc(var(--header-height) + 34px);
  color: var(--paper-muted);
  font-size: 0.72rem;
}

.breadcrumb a {
  text-underline-offset: 3px;
}

.event-hero {
  padding-block: 64px 48px;
  border-bottom: 1px solid var(--line);
}

.event-hero time {
  display: block;
  margin-top: 22px;
  color: var(--pink);
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.13em;
}

.event-hero h1 {
  max-width: 820px;
  margin: 15px 0 0;
  font-size: clamp(2.2rem, 5vw, 4.8rem);
  line-height: 0.98;
  letter-spacing: -0.045em;
  overflow-wrap: anywhere;
}

.event-venue {
  margin: 28px 0 0;
  color: var(--paper-muted);
  font-size: clamp(1rem, 2vw, 1.25rem);
}

.event-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  padding-block: 70px 120px;
}

.event-panel,
.event-gallery {
  padding: clamp(26px, 4vw, 44px);
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.035);
}

.event-panel h2,
.event-gallery h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.event-panel > p:last-child {
  margin: 28px 0 0;
  color: var(--paper-muted);
}

.event-info dl {
  display: grid;
  margin: 28px 0 0;
}

.event-info dl div {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.event-info dt {
  color: var(--pink);
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.event-info dd {
  margin: 0;
}

.performer-list {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.performer-list li {
  padding: 8px 12px;
  color: var(--paper-muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.82rem;
}

.event-gallery {
  grid-column: 1 / -1;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  margin-top: 34px;
}

.gallery-grid figure {
  min-height: 250px;
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  margin: 0;
  padding: 24px 20px 14px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: #050c16;
}

.gallery-grid a {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

.gallery-grid img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.38);
}

.gallery-grid figcaption {
  margin-top: 16px;
  color: var(--paper-muted);
  font-size: 0.72rem;
}

.image-note {
  margin: 20px 0 0;
  color: var(--paper-muted);
  font-size: 0.76rem;
}

.event-pager {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
  margin-top: 34px;
}

.event-pager > a {
  color: var(--paper);
  font-size: 0.78rem;
  text-decoration: none;
}

.event-pager > a > span {
  display: block;
  color: var(--pink);
  font-size: 0.6rem;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.event-pager .archive-return {
  padding: 10px 15px;
  color: var(--ink);
  background: var(--pink);
  border-radius: 999px;
  font-weight: 900;
}

.next-event {
  text-align: right;
}

@media (max-width: 760px) {
  .timeline-year {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .timeline-year > h2 {
    position: static;
  }

  .timeline-item {
    grid-template-columns: 1fr auto;
    gap: 10px 16px;
  }

  .timeline-item time {
    grid-column: 1 / -1;
  }

  .timeline-item > div {
    min-width: 0;
  }

  .event-content {
    grid-template-columns: 1fr;
  }

  .event-gallery {
    grid-column: auto;
  }

  .event-pager {
    grid-column: auto;
    grid-template-columns: 1fr 1fr;
  }

  .event-pager .archive-return {
    grid-column: 1 / -1;
    grid-row: 1;
    text-align: center;
  }

  .event-pager > span {
    display: none;
  }
}

@media (max-width: 480px) {
  .timeline-item {
    min-height: 128px;
  }

  .timeline-item > a,
  .timeline-item > span {
    align-self: end;
  }

  .event-info dl div {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
`;

await write("assets/css/live.css", liveCss);
console.log(`LIVE generated: 1 index + ${details.length} detail pages`);
