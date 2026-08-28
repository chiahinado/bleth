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
      <small>THE OFFICIAL ARCHIVE OF BLETH</small>
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

const footer = (prefix) => `<footer class="site-footer">
    <a class="footer-logo" href="${prefix}">BLETHLAND</a>
    <p>THE OFFICIAL ARCHIVE OF BLETH</p>
    <p>HISTORICAL ARCHIVE · LAST UPDATED 2004.08.29</p>
    <a href="#main">ページ上部へ戻る</a>
  </footer>`;

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
  <script src="${prefix}assets/js/main.js" defer></script>
  <script src="${prefix}assets/js/attractions.js" defer></script>
</head>
<body class="park-attraction-page ${bodyClass}">
  <a class="skip-link" href="#main">本文へ移動</a>
  ${header(prefix, current)}
  <main id="main">
${content}
  </main>
  ${footer(prefix)}
</body>
</html>`;

const hero = ({ number, title, caption, compact = false }) => `    <section class="page-hero attraction-hero${compact ? " attraction-hero--compact" : ""}">
      <p class="eyebrow">${escapeHtml(number)}</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(caption)}</p>
    </section>`;

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
    lyrics: [
      ["誰かの声に気付き　振り返るとあなたがいた", "新しい　いくつもの始まりが　今　心を染めてゆく", "あどけない声やしぐさに　引き寄せられてゆく二人", "すべてに　幸せを感じるとき　恋から愛に変わる"],
      ["ずっと抱きしめたい　夜明けまで何度も", "見つめてたい　心から愛しく思うよ"],
      ["そう　二人は出逢う　夢の中ででも　笑顔絶やさずに　愛していたい", "振り向くといつも　あなたがいるから　もう何もいらない"],
      ["伝わる優しさが胸に　深く刻み込まれてゆく", "何も迷う事なくこの時を　すべてが　あなたのために"],
      ["ずっと感じてたい　ぬくもりと優しさを", "愛してたい　無邪気なままの　笑顔を・・・"],
      ["今　二人が同じ道を選ぶなら　支え合いながら　歩んで行きたい", "生きていく事の　すばらしさの意味　二人で分かち合おう"],
      ["たとえ傷ついて　涙が零れても", "微笑みで　包み込んであげるから"],
      ["そう　二人は出逢う　夢の中ででも　笑顔絶やさずに　愛していたい", "振り向くといつも　あなたがいるから　もう何もいらない"],
    ],
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
    lyrics: [
      ["夏の薫りに心誘われ　会いたくなる　あなたへの鼓動", "波のしぶきも眩しい程に　見え隠れするあなたがいる", "砂に描いた二人の夢を　太陽が照らしだして", "このまま時がとまればいいと　二人は夏を追いかけてゆく"],
      ["今　心が熱く高ぶる程に　Ah　きらめいている", "Oh SummerSide", "ただ繰り返す波のリズムと共に駆け抜けてゆく", "二人の SummerSide"],
      ["夏のアルバム重ねる程に　思い募るひと夏の恋", "青く染まる　心と海も　届きそうな程近くに思う", "どこまでも続く水平線　足跡だけを残して", "新しい記憶に刻み込む　二人の夏は走り始めてく"],
      ["今　出逢いと別れを　繰り返す夏　ときめいている", "Oh SummerSide", "Ａｈ　感じてる　汗の流れと共に駆け出してゆく", "二人の SummerSide"],
      ["砂に描いた二人の夢を　太陽が照らしだして", "このまま時がとまればいいと　二人は夏を追いかけてゆく"],
      ["今　心が熱く高ぶる程に　Ａｈ　きらめいている", "Oh SummerSide", "ただ繰り返す波のリズムと共に駆け抜けてゆく", "二人の SummerSide"],
      ["今　出逢いと別れを　繰り返す夏　ときめいている", "Oh SummerSide", "Ａｈ　感じてる　汗の流れと共に駆け出してゆく", "二人の SummerSide"],
    ],
  },
  {
    slug: "first-memory",
    title: "first memory",
    writer: "SHO",
    audio: "first-memory.mp3",
    note: "SPECIAL THANKS：Kei（PULYSILA）",
    lyrics: [
      ["例えば振り返る想いでの　ささやかな　暮らしにふと　幸せを感じられたなら", "時が過ぎても「あの頃は」なんて　笑いとばせる", "今ならば過ちもまた　あの日のメモリー", "ありふれた言葉を並べてみるより　今いる自分を信じたい"],
      ["例えば今も胸に残る愛　寂しい秋のあのメロディー　口ずさむたび　せつなくて", "素顔の自分を見つめるたびに　消えない愛に照らされて", "行き先すら見失ってしまう", "今思えば伝えきれなかった愛に　手を差し伸べて　Ah", "思い返す今も…"],
      ["もっともっと素直でいたら　二人の隙間も口づけで埋めて", "どこまでも続く続いてゆく道は　やがて二人を包んでゆく　巡り逢うために"],
      ["すれ違ってゆくように季節は流れて　寂しさの夜を数えたら", "届かぬ想いがあなたに終りを告げて振り返る事すらできない", "もう一度抱いて…"],
      ["そしてそして　あなたの胸で眠りたい　何もかも全部捨てて", "だけど二人はもう　遠く遠く離れてゆく", "何度も心を重ねたけれど…"],
      ["ささやかな愛を　そっとそっと感じたいから　何も言わずに今だけは", "「誰を愛せばいい？」", "いつかいつか　わかりあえるさ　ねぇそうだろ？", "二人の Oh first memory"],
    ],
  },
  {
    slug: "free-way",
    title: "Free Way",
    writer: "SHO",
    lyrics: [
      ["たわいのない世の中で　かけずり廻ってる", "シャレたような生き方　決め込んでるのに", "ダサい洋服着込んで　イカレたように笑い飛ばして", "もっと上手に騙しておくれ"],
      ["Free Way you are so liceral and selfish", "このせつなさに孤独を感じて", "Free Way you are so liceral and selfish", "引き裂かれるほど強く互いを求め合う"],
      ["胸を叩く一言に　苛立ちさえ覚えた", "幾つかのすれ違い　やがてそれも糧となり", "全てがそれぞれの笑みに変われば"],
      ["Free Way you are so liceral and selfish", "いつかこの声がすべて届くように", "Free Way you are so liceral and selfish", "その優しさは時に人を傷つけた"],
      ["Free Way you are so liceral and selfish", "このせつなさに孤独を感じて", "Free Way you are so liceral and selfish", "引き裂かれるほど強く互いを求め合う"],
    ],
  },
  {
    slug: "say-yeah",
    title: "Say yeah!",
    writer: "SHO",
    lyrics: [
      ["後悔のしない生き方がしたいな", "やりきれない夜を過ごした日もあった", "人を傷つけて悔やんだりもした", "思いやる気持ちを忘れかけてた"],
      ["わがままな自分に嫌気がさしても", "迷わずに自分らしく生きていこう"],
      ["every day everybody say yeah!", "every day everybody", "涙が笑顔に変わるまで", "歌うよ everybody say yeah!"],
      ["戸惑う自分に嫌気がさしても", "やさしさ与え続けて生きていこう"],
      ["every day everybody say yeah!", "every day everybody", "涙が笑顔に変わるまで", "歌うよ everybody say yeah!", "every day everybody say yeah!"],
    ],
  },
  {
    slug: "cloudy",
    title: "CLOUDY",
    writer: "SHO",
    lyrics: [
      ["「今ではこの世はサビれた世界」どっかのニュースで流れてた", "寂しげな瞳をした大人たちの群　這い上がるために生き急ぐ", "誰かを求めて愛しても　社会のルールに引き裂かれ", "愛を知らない子供たちは　何を信じていくのだろう"],
      ["Ah　空に浮かぶ雲に乗って　何もかも忘れてただ自由に・・・", "Ah　空に舞う鳥のように　ただ風に吹かれて飛んでいきたい"],
      ["時代の夜明けに待ちくたびれて胸をあずけて眠ってた", "愛の深さに何ができるのか　伝えて欲しい今はただ"],
      ["Ah　奏でてくこの想いを　どこまでも歌に乗せて", "Ah　流れてく時間とともに　新しい扉を探してる"],
      ["Ah　空に浮かぶ雲に乗って　何もかも忘れてただ自由に・・・", "Ah　空に舞う鳥のように　ただ風に吹かれて飛んでいきたい"],
    ],
  },
  {
    slug: "namida-no-egao",
    title: "涙の笑顔",
    writer: "SHO",
    lyrics: [
      ["見つめるとそれだけで　抱きしめたくなるような", "涙の笑顔に心魅かれてく"],
      ["哀しい気持ちは　いつも心に嘘をついている", "逢いたいときでも　声でしか貴方に逢えない", "忘れたくても忘れられなくて", "やり場もないまま", "瞳閉じれば伝わるぬくもり", "今も浮かぶあの時"],
      ["変わらないいつまでも", "溢れ出した涙も　あの時のまま", "見つめるとそれだけで抱きしめたくなるような", "愛しさに愛が溢れてる"],
      ["やさしくする程　いつもこうして甘えてしまうの・・・", "いつしか互いに求め合う　愛を覚えた", "こらえきれなくてやりきれない夜に", "言葉もないまま", "好きだからこそ今愛を告げよう", "追いかけてくこの時"],
      ["移りゆく町並みの色褪せた景色も", "あの時のまま", "寄り添って歩いてく変わらないこの気持ちは", "こんなにも今　あなたを愛してる"],
      ["あなたを守れる強さを胸に秘めて", "これからも歩いて行けたら", "二度と逢えなくなるような", "そんな気持ちを振り払う", "その笑顔が愛しくて"],
      ["変わらないいつまでも", "溢れ出した涙も　あの時のまま", "見つめるとそれだけで抱きしめたくなるような", "愛しさに愛が溢れてる"],
      ["移りゆく町並みの色褪せた景色も", "あの時のまま", "寄り添って歩いてく変わらないこの気持ちは", "こんなにも今　あなたを愛してる"],
    ],
  },
  {
    slug: "precious",
    title: "Precious",
    writer: "SHO",
    lyrics: [
      ["One day　また何かが変わり始めようとしている", "夢と希望が踊る街へ飛び出してみた", "高鳴る想いだけが背中を押してくれるようで", "はばたくことさえたやすく思えた"],
      ["Sometimes　不安で自分を見失いそうになる", "そんな夜はなぜか「あの頃」を思い出す", "かけがえのない友の言葉を胸に・・・", "疲れ切った自分を励まし歩いていく"],
      ["You & I precious forever　誰にも譲れぬモノ", "一歩ずつ踏みしめて願いを刻み込んでいく", "You & I precious forever　信じて支えること", "言葉より大切なこの気持ちを"],
      ["You & I precious forever　追いかけていくモノ", "今　二度と戻れぬ旅に輝き探し求めて", "You & I precious forever　感じて伝わること", "未来に向かう人路は　Oh Endress road"],
    ],
  },
  {
    slug: "chikai",
    title: "誓い",
    writer: "Tatsuya",
    lyrics: [
      ["愛してますか？愛されていますか？", "その手の温もり感じていたい", "離れていても　そばにいれなくても", "灯火は一つ　そう誓います"],
      ["どんなに辛くても　君を守ります", "過去におきたすべては　二人のため", "ただいつもいつもよりも", "互いの距離や時間を大切に", "悲しさにつまずいても", "暖かあなたの笑顔に救われる", "いつまでもすれ違うことのない I miss you・・・"],
      ["叶わない夢は夢でしかない", "いつしか願いは届き", "二人に新しいもう一つの", "出逢いがすぐ訪れるよう"],
      ["ただいつもいつもよりも", "互いの絆の強さ感じていたい", "悲しさにつまずいても", "優しいあなたの言葉を忘れません"],
      ["あの頃の若い日々に誓った", "最後の約束思い出し", "電話での遠い声が", "今でも私の心に響きます", "一緒にいたいねいつまでも　あなたと・・・"],
      ["愛してますか？愛されていますか？", "リングに願う　そう誓いますと"],
    ],
  },
];

const musicCards = songs.map((song, index) => `        <article class="track-card">
          <p class="track-number">TRACK ${String(index + 1).padStart(2, "0")}</p>
          <h3>${escapeHtml(song.title)}</h3>
          <p class="track-credit">WORDS &amp; MUSIC：${escapeHtml(song.writer)}<br>ARRANGED：BLETH</p>
${song.audio ? '          <span class="track-badge">AUDIO AVAILABLE</span>\n' : ""}          <a class="park-button" href="${song.slug}/">楽曲の詳細を見る</a>
        </article>`).join("\n");

const musicIndex = page({
  title: "MUSIC",
  description: "BLETHの9曲を、歌詞・クレジット・当時のコメント・音源とともに紹介します。",
  prefix: "../",
  current: "music",
  bodyClass: "music-page",
  content: `${hero({ number: "ATTRACTION 03", title: "MUSIC", caption: "楽曲・歌詞・音源" })}
    <section class="park-intro section-shell" aria-labelledby="music-intro-title">
      <p class="section-kicker">BLETH SONG ARCHIVE</p>
      <h2 id="music-intro-title">楽曲をたどる</h2>
      <p class="section-lead">BLETHの楽曲を、歌詞、クレジット、当時のコメントとともに紹介します。公開音源のある楽曲は各ページで再生できます。</p>
    </section>
    <section class="track-section section-shell" aria-labelledby="track-list-title">
      <div class="section-heading">
        <p class="section-kicker">9 SONGS</p>
        <h2 id="track-list-title">TRACK LIST</h2>
      </div>
      <div class="track-grid">
${musicCards}
      </div>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">BLETHLANDへ戻る</a></nav>`,
});

await write("music/index.html", musicIndex);

for (const [index, song] of songs.entries()) {
  const previous = index > 0 ? songs[index - 1] : null;
  const next = index < songs.length - 1 ? songs[index + 1] : null;
  const lyrics = song.lyrics.map((stanza) => `          <p>${stanza.map(escapeHtml).join("<br>\n")}</p>`).join("\n");
  const audio = song.audio ? `<section class="song-meta park-panel">
          <p class="section-kicker">AUDIO</p>
          <h2>音源</h2>
          <audio class="song-player" controls preload="metadata">
            <source src="../../assets/audio/music/${song.audio}" type="audio/mpeg">
            お使いのブラウザは音声再生に対応していません。
          </audio>
        </section>` : "";
  const comment = song.comment ? `<section class="song-comment park-panel">
          <p class="section-kicker">ARCHIVE COMMENT</p>
          <h2>当時のコメント</h2>
          <blockquote>${song.comment.map(escapeHtml).join("<br>")}</blockquote>
        </section>` : "";
  const html = page({
    title: `${song.title} | MUSIC`,
    description: `BLETH「${song.title}」の歌詞・クレジット${song.audio ? "・音源" : ""}。`,
    prefix: "../../",
    current: "music",
    bodyClass: "music-page",
    content: `${hero({ number: `MUSIC · TRACK ${String(index + 1).padStart(2, "0")}`, title: song.title, caption: "LYRICS & CREDIT", compact: true })}
    <div class="song-content section-shell">
      <aside class="song-sidebar">
        <section class="song-meta park-panel">
          <p class="section-kicker">CREDIT</p>
          <h2>クレジット</h2>
          <dl>
            <div><dt>WORDS &amp; MUSIC</dt><dd>${escapeHtml(song.writer)}</dd></div>
            <div><dt>ARRANGED</dt><dd>BLETH</dd></div>
${song.note ? `            <div><dt>ARCHIVE NOTE</dt><dd>${escapeHtml(song.note)}</dd></div>\n` : ""}          </dl>
        </section>
${[audio, comment].filter(Boolean).map((block) => `        ${block}\n`).join("")}      </aside>
      <section class="lyrics-panel park-panel" aria-labelledby="lyrics-title">
        <p class="section-kicker">LYRICS</p>
        <h2 id="lyrics-title">歌詞</h2>
        <div class="lyrics-text">
${lyrics}
        </div>
      </section>
    </div>
    <nav class="song-pager section-shell" aria-label="楽曲ページ">
      ${previous ? `<a href="../${previous.slug}/">前の楽曲<br>${escapeHtml(previous.title)}</a>` : "<span></span>"}
      <a class="song-pager-home" href="../">MUSICへ戻る</a>
      ${next ? `<a href="../${next.slug}/">次の楽曲<br>${escapeHtml(next.title)}</a>` : "<span></span>"}
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
  return `      <section class="show-year park-panel" aria-labelledby="shows-${year}">
        <div class="show-year-heading"><h2 id="shows-${year}">${year}</h2><p>${yearShows.length} RECORDS</p></div>
        <ol class="show-list">
${yearShows.map((show) => `          <li class="show-card">
            <time datetime="${show.d}">${show.display}</time>
            <div><h3>${escapeHtml(show.title)}</h3><p>${escapeHtml(show.venue)} · ${escapeHtml(show.detail)}</p></div>
${show.live ? `            <a href="../live/${show.live}/">写真記録を見る</a>\n` : ""}          </li>`).join("\n")}
        </ol>
      </section>`;
}).join("\n");

const showsIndex = page({
  title: "SHOWS",
  description: "BLETHLANDに掲載された2000年から2004年の公演情報を年代別に紹介します。",
  prefix: "../",
  current: "shows",
  bodyClass: "shows-page",
  content: `${hero({ number: "ATTRACTION 04", title: "SHOWS", caption: "公演記録" })}
    <section class="park-intro section-shell" aria-labelledby="shows-intro-title">
      <p class="section-kicker">SHOW RECORDS</p>
      <h2 id="shows-intro-title">公演案内の記録</h2>
      <p class="section-lead">BLETHLANDに掲載された公演情報を、年代別に紹介します。</p>
      <p class="archive-policy"><strong>ARCHIVE NOTE</strong><br>このページは当時掲載された公演情報のアーカイブです。現在の開催予定やチケット販売を案内するものではありません。</p>
    </section>
    <div class="shows-archive section-shell">
${showSections}
      <p class="shows-note">1999年から2003年までのライブ写真と詳細記録は、<a class="text-link" href="../live/">LIVE ARCHIVE</a>でご覧いただけます。</p>
    </div>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">BLETHLANDへ戻る</a></nav>`,
});

await write("shows/index.html", showsIndex);

const extrasIndex = page({
  title: "EXTRAS",
  description: "クイズ、おみくじ、お化け屋敷など、BLETHLANDならではの企画を楽しめる特別展示です。",
  prefix: "../",
  current: "extras",
  bodyClass: "extras-page",
  content: `${hero({ number: "ATTRACTION 05", title: "EXTRAS", caption: "特別展示" })}
    <section class="park-intro section-shell" aria-labelledby="extras-intro-title">
      <p class="section-kicker">SPECIAL AREA</p>
      <h2 id="extras-intro-title">遊びと特別企画</h2>
      <p class="section-lead">クイズ、おみくじ、展示など、BLETHLANDならではの企画をお楽しみください。</p>
    </section>
    <section class="extras-guide section-shell" aria-labelledby="extras-guide-title">
      <div class="section-heading"><p class="section-kicker">PARK SIDE</p><h2 id="extras-guide-title">EXTRA ATTRACTIONS</h2></div>
      <div class="extras-grid">
        <article class="extra-card extra-card--quiz">
          <p class="section-kicker">CHALLENGE</p><h3>BLETH QUIZ</h3><p class="card-caption">BLETHクイズ</p>
          <p>旧BLETHLANDの入園クイズを、3問のブラウザ内ゲームとして再構築しました。</p>
          <a class="park-button" href="quiz/">クイズに挑戦する</a>
        </article>
        <article class="extra-card extra-card--fortune">
          <p class="section-kicker">TODAY'S TICKET</p><h3>BLETHLAND FORTUNE</h3><p class="card-caption">おみくじ</p>
          <p>個人情報の入力なしで、その日のBLETHLAND運勢を1枚引けます。</p>
          <a class="park-button" href="fortune/">おみくじを引く</a>
        </article>
        <article class="extra-card extra-card--haunted">
          <p class="section-kicker">NIGHT RIDE</p><h3>HAUNTED HOUSE</h3><p class="card-caption">お化け屋敷</p>
          <p>新しく描き起こしたCSSアートと光の演出で楽しむ、小さなお化け屋敷です。</p>
          <a class="park-button" href="haunted-house/">お化け屋敷に入る</a>
        </article>
        <article class="extra-card extra-card--hold">
          <p class="section-kicker">HISTORICAL EXHIBIT</p><h3>SPECIAL EXHIBIT</h3><p class="card-caption">GLAYコピーバンド企画</p>
          <p>全国のGLAYコピーバンドを紹介する企画が、BLETHLAND内に設けられていました。</p>
          <span class="archive-status">展示準備中</span>
        </article>
      </div>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">BLETHLANDへ戻る</a></nav>`,
});

await write("extras/index.html", extrasIndex);

const quizPage = page({
  title: "BLETH QUIZ | EXTRAS",
  description: "旧BLETHLANDの入園クイズを再構築した、3問のブラウザ内クイズです。",
  prefix: "../../",
  current: "extras",
  bodyClass: "quiz-page",
  interactive: true,
  content: `${hero({ number: "EXTRAS · CHALLENGE", title: "BLETH QUIZ", caption: "BLETHクイズ", compact: true })}
    <section class="park-intro interactive-shell section-shell" aria-labelledby="quiz-intro-title">
      <p class="section-kicker">ENTRANCE CHALLENGE</p><h2 id="quiz-intro-title">3問に挑戦</h2>
      <p class="section-lead">旧BLETHLANDの入園クイズを、当時の題材を残して遊びやすく再構築しました。</p>
      <p class="archive-policy">回答内容と結果は保存・送信されません。</p>
    </section>
    <section class="interactive-section interactive-shell section-shell">
      <form class="quiz-form park-panel" data-quiz>
        <fieldset class="quiz-question"><legend>Q1. BLETHのメンバーの国籍は？</legend><div class="answer-list"><label><input type="radio" name="nationality" value="japan">日本</label><label><input type="radio" name="nationality" value="uk">イギリス</label></div></fieldset>
        <fieldset class="quiz-question"><legend>Q2. BLETHの楽曲は？</legend><div class="answer-list"><label><input type="radio" name="song" value="pure-soul">pure soul</label><label><input type="radio" name="song" value="first-memory">first memory</label></div></fieldset>
        <fieldset class="quiz-question"><legend>Q3. BLETHがコピーしていたアーティストは？</legend><div class="answer-list"><label><input type="radio" name="copy" value="ccb">C-C-B</label><label><input type="radio" name="copy" value="glay">GLAY</label></div></fieldset>
        <button class="park-button" type="submit">結果を見る</button>
      </form>
      <div class="interactive-result" data-quiz-result role="status" tabindex="-1" hidden></div>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">EXTRASへ戻る</a></nav>`,
});

await write("extras/quiz/index.html", quizPage);

const fortunePage = page({
  title: "BLETHLAND FORTUNE | EXTRAS",
  description: "個人情報を入力せず、ブラウザ内だけで楽しめるBLETHLANDのおみくじです。",
  prefix: "../../",
  current: "extras",
  bodyClass: "fortune-page",
  interactive: true,
  content: `${hero({ number: "EXTRAS · TODAY'S TICKET", title: "BLETHLAND FORTUNE", caption: "おみくじ", compact: true })}
    <section class="park-intro interactive-shell section-shell" aria-labelledby="fortune-intro-title">
      <p class="section-kicker">ONE DAY TICKET</p><h2 id="fortune-intro-title">今日の一枚</h2>
      <p class="section-lead">ボタンを押すと、BLETHLANDから今日の運勢チケットが届きます。</p>
      <p class="archive-policy">生年月日などの入力は不要です。抽選結果は保存・送信されません。</p>
    </section>
    <section class="interactive-section interactive-shell section-shell">
      <div class="fortune-machine">
        <span class="fortune-sign">BLETHLAND FORTUNE</span><br>
        <button class="park-button" type="button" data-fortune-button>おみくじを引く</button>
        <div class="fortune-ticket" data-fortune-result role="status" tabindex="-1" hidden></div>
      </div>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">EXTRASへ戻る</a></nav>`,
});

await write("extras/fortune/index.html", fortunePage);

const hauntedPage = page({
  title: "HAUNTED HOUSE | EXTRAS",
  description: "新しいCSSアートと光の演出で再構築した、BLETHLANDのお化け屋敷です。",
  prefix: "../../",
  current: "extras",
  bodyClass: "haunted-page",
  interactive: true,
  content: `${hero({ number: "EXTRAS · NIGHT RIDE", title: "HAUNTED HOUSE", caption: "お化け屋敷", compact: true })}
    <section class="park-intro interactive-shell section-shell" aria-labelledby="haunted-intro-title">
      <p class="section-kicker">AFTER DARK</p><h2 id="haunted-intro-title">夜のBLETHLANDへ</h2>
      <p class="section-lead">明かりを消すと、静かな館の住人たちが姿を現します。</p>
    </section>
    <section class="interactive-section interactive-shell section-shell">
      <div class="haunted-wrap">
        <div class="haunted-scene" data-haunted-scene>
          <div class="haunted-house-art" aria-hidden="true">
            <span class="house-body"></span><span class="house-tower"></span><span class="house-door"></span>
            <span class="house-window house-window--one"></span><span class="house-window house-window--two"></span><span class="house-window house-window--three"></span>
          </div>
          <span class="css-ghost css-ghost--one" aria-hidden="true"></span><span class="css-ghost css-ghost--two" aria-hidden="true"></span>
        </div>
        <div class="haunted-controls">
          <button class="park-button" type="button" aria-pressed="false" data-haunt-toggle>明かりを消す</button>
          <p data-haunt-message>館の窓には、まだ明かりが灯っています。</p>
        </div>
      </div>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">EXTRASへ戻る</a></nav>`,
});

await write("extras/haunted-house/index.html", hauntedPage);

const fanclubPage = page({
  title: "I LOVE BLETH",
  description: "BLETHLANDで案内していたファンクラブ「I LOVE BLETH」の特典と入会案内を紹介する歴史展示です。",
  prefix: "../",
  current: "fanclub",
  bodyClass: "fanclub-page",
  content: `${hero({ number: "SIDE GATE 01", title: "I LOVE BLETH", caption: "FAN CLUB ARCHIVE" })}
    <section class="park-intro section-shell" aria-labelledby="fanclub-intro-title">
      <p class="section-kicker">HISTORICAL FAN CLUB</p>
      <h2 id="fanclub-intro-title">ファンクラブについて</h2>
      <p class="section-lead">BLETHLANDで案内していたファンクラブ「I LOVE BLETH」の資料を展示しています。</p>
      <p class="archive-policy"><strong>ARCHIVE NOTE</strong><br>このページからの入会受付は行っていません。当時の特典や入会案内を、歴史資料として紹介しています。</p>
    </section>
    <section class="side-gate-archive section-shell" aria-labelledby="fanclub-benefits-title">
      <div class="fanclub-gate park-panel">
        <p class="section-kicker">WELCOME TO</p>
        <h2>I ♥ BLETH</h2>
        <p class="gate-caption">OFFICIAL FAN CLUB ARCHIVE</p>
      </div>
      <div class="section-heading">
        <p class="section-kicker">MEMBER BENEFITS</p>
        <h2 id="fanclub-benefits-title">当時の特典</h2>
      </div>
      <div class="benefit-grid">
        <article class="benefit-card"><p class="benefit-number">01</p><h3>ライブ情報</h3><p>BLETHのライブ情報を、登録した携帯メールへいち早く届ける案内がありました。</p></article>
        <article class="benefit-card"><p class="benefit-number">02</p><h3>バースデーカード</h3><p>本登録会員の誕生日に、BLETHからバースデーカードを届ける特典がありました。</p></article>
        <article class="benefit-card"><p class="benefit-number">03</p><h3>チケット優先案内</h3><p>本登録会員を対象に、ライブチケットを優先的に購入できる案内がありました。</p></article>
      </div>
      <section class="archive-process park-panel" aria-labelledby="fanclub-entry-title">
        <p class="section-kicker">HOW IT WORKED</p><h2 id="fanclub-entry-title">当時の入会案内</h2>
        <ol>
          <li>ライブ会場で申込用紙を受け取る。</li>
          <li>必要事項を記入し、会場の応募箱へ入れる。</li>
          <li>確認後に本登録となり、特典案内を受け取る。</li>
        </ol>
      </section>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">BLETHLANDへ戻る</a></nav>`,
});

await write("fanclub/index.html", fanclubPage);

const linksPage = page({
  title: "LINKS",
  description: "BLETHLANDの旧リンク集とサイトバナーを、個人情報やリンク切れURLを除いて再構成した歴史展示です。",
  prefix: "../",
  current: "links",
  bodyClass: "links-page",
  content: `${hero({ number: "SIDE GATE 02", title: "LINKS", caption: "関連リンク" })}
    <section class="park-intro section-shell" aria-labelledby="links-intro-title">
      <p class="section-kicker">PARK DIRECTORY</p>
      <h2 id="links-intro-title">リンクゲート</h2>
      <p class="section-lead">BLETHLANDに設けられていたリンク集とサイトバナーを、歴史展示として再構成しています。</p>
    </section>
    <section class="side-gate-archive section-shell" aria-labelledby="links-status-title">
      <div class="link-status park-panel">
        <div class="link-status-sign" aria-hidden="true">CURRENT<br>LINKS</div>
        <div><p class="section-kicker">LINK STATUS</p><h2 id="links-status-title">現在掲載している関連リンクはありません</h2><p>旧リンク先はそのまま再掲載せず、現在の所有者と内容を確認できたものだけを掲載します。</p></div>
      </div>
      <section class="archive-process park-panel" aria-labelledby="link-history-title">
        <p class="section-kicker">LAST UPDATED 2003.10.19</p><h2 id="link-history-title">旧リンク集の構成</h2>
        <div class="link-history">
          <article><h3>おともだちサイト</h3><p>BLETHの友人や音楽仲間の個人サイト。</p></article>
          <article><h3>おともだちバンド</h3><p>交流のあったバンドやコピーバンド。</p></article>
          <article><h3>アマチュアバンド</h3><p>各地で活動していたバンドのサイト。</p></article>
          <article><h3>GLAY系サイト</h3><p>GLAYを中心に扱うファンサイト。</p></article>
        </div>
      </section>
      <section class="banner-museum park-panel" id="banners" aria-labelledby="banner-title">
        <p class="section-kicker">BANNER MUSEUM</p><h2 id="banner-title">BLETHLAND バナー</h2>
        <p>旧サイトに用意されていた4種類のバナーを、現在のBLETHLANDの色と看板表現で再構成しました。</p>
        <div class="banner-gallery">
          <article class="banner-specimen"><div class="banner-art banner-art--motion"><span>BLETHLAND</span></div><h3>NO.01 · MOTION</h3><p>動きのある遊園地サイン。</p></article>
          <article class="banner-specimen"><div class="banner-art"><span>BLETHLAND</span></div><h3>NO.02 · CLASSIC</h3><p>青空を基調にした静止サイン。</p></article>
          <article class="banner-specimen"><div class="banner-art banner-art--pink"><span>BLETH</span></div><h3>NO.03 · BAND</h3><p>バンド名を主役にしたコンパクト版。</p></article>
          <article class="banner-specimen"><div class="banner-art banner-art--night"><span>B! LAND</span></div><h3>NO.04 · NIGHT</h3><p>旧バナーの遊び心を夜のパークカラーで再解釈。</p></article>
        </div>
      </section>
    </section>
    <nav class="page-return section-shell" aria-label="ページ移動"><a class="text-link" href="../">BLETHLANDへ戻る</a></nav>`,
});

await write("links/index.html", linksPage);

const notFoundPage = page({
  title: "404",
  description: "BLETHLAND内でページが見つからなかったときの案内ページです。",
  prefix: "/bleth/",
  current: "",
  bodyClass: "not-found-page",
  content: `${hero({ number: "LOST IN BLETHLAND", title: "404", caption: "ページが見つかりません", compact: true })}
    <section class="lost-and-found section-shell">
      <div class="lost-gate park-panel">
        <div class="lost-signpost" aria-hidden="true"><span class="direction-sign direction-sign--home">BLETHLAND GATE</span><span class="direction-sign direction-sign--park">ATTRACTIONS</span></div>
        <p class="section-kicker">LOST &amp; FOUND</p>
        <h2>道に迷ったようです</h2>
        <p>お探しのページは移動したか、現在のBLETHLANDには存在しません。正面ゲートかアトラクション案内から、もう一度お進みください。</p>
        <div class="lost-actions"><a class="park-button" href="/bleth/">正面ゲートへ戻る</a><a class="park-button" href="/bleth/#attractions">アトラクションを見る</a></div>
      </div>
    </section>`,
});

await write("404.html", notFoundPage);

console.log(`Park sections generated: ${songs.length + 9} pages`);
