const quizForm = document.querySelector("[data-quiz]");
const quizResult = document.querySelector("[data-quiz-result]");

quizForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quizForm);
  const answered = ["nationality", "song", "copy"].every((name) => formData.has(name));

  if (!quizResult) return;

  quizResult.hidden = false;

  if (!answered) {
    quizResult.innerHTML = "<h2>あと少し</h2><p>3問すべて選んでから、もう一度判定してください。</p>";
    quizResult.focus();
    return;
  }

  const isCorrect = formData.get("nationality") === "japan"
    && formData.get("song") === "first-memory"
    && formData.get("copy") === "glay";

  quizResult.innerHTML = isCorrect
    ? "<h2>全問正解！</h2><p>BLETHLANDへの入園完了です。お好きなアトラクションへどうぞ。</p>"
    : "<h2>惜しい！</h2><p>答えを見直して、もう一度挑戦してみてください。</p>";
  quizResult.focus();
});

const fortuneButton = document.querySelector("[data-fortune-button]");
const fortuneResult = document.querySelector("[data-fortune-result]");
const fortunes = [
  ["大吉", "新しいメロディーに出会える日。気になった曲を最初から聴いてみよう。"],
  ["中吉", "いつもの景色に小さな発見あり。今日は少し遠回りが吉。"],
  ["小吉", "ゆっくり進めば調子が整う日。自分のテンポを大切に。"],
  ["音吉", "心に残る音が見つかる日。好きな一曲を誰かに伝えてみよう。"],
  ["旅吉", "新しい入口を選ぶと楽しい日。まだ見ていない展示へどうぞ。"],
  ["笑吉", "思いがけない一言が笑顔につながる日。気楽にいこう。"],
];

fortuneButton?.addEventListener("click", () => {
  if (!fortuneResult) return;

  const random = new Uint32Array(1);
  crypto.getRandomValues(random);
  const [title, message] = fortunes[random[0] % fortunes.length];

  fortuneResult.hidden = false;
  fortuneResult.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
  fortuneResult.focus();
});

const hauntedScene = document.querySelector("[data-haunted-scene]");
const hauntedButton = document.querySelector("[data-haunt-toggle]");
const hauntedMessage = document.querySelector("[data-haunt-message]");

hauntedButton?.addEventListener("click", () => {
  const isAwake = hauntedScene?.classList.toggle("is-awake") ?? false;
  hauntedButton.setAttribute("aria-pressed", String(isAwake));
  hauntedButton.textContent = isAwake ? "明かりをつける" : "明かりを消す";

  if (hauntedMessage) {
    hauntedMessage.textContent = isAwake
      ? "暗闇から、BLETHLANDのゴーストたちが現れました。"
      : "館内に明かりが戻りました。";
  }
});
