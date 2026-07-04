const screen = document.getElementById("screen");
const homeBtn = document.getElementById("homeBtn");

const DEFAULT_STATE = {
  history: [],
  settings: {
    mode: "normal",
    questionCount: 10,
    timeLimit: 45,
    difficulty: "mixed"
  }
};

let appState = loadState();
let session = null;
let timerId = null;

function loadState() {
  try {
    return JSON.parse(localStorage.getItem("mensaTrainerState")) || structuredClone(DEFAULT_STATE);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem("mensaTrainerState", JSON.stringify(appState));
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickQuestions(count, difficulty) {
  let pool = QUESTION_BANK;
  if (difficulty !== "mixed") {
    const d = Number(difficulty);
    pool = QUESTION_BANK.filter(q => q.difficulty <= d);
  }
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

function categoryStats(history) {
  const map = {};
  history.forEach(run => {
    run.answers.forEach(a => {
      if (!map[a.category]) map[a.category] = { total: 0, correct: 0 };
      map[a.category].total++;
      if (a.correct) map[a.category].correct++;
    });
  });
  return map;
}

function renderHome() {
  clearInterval(timerId);
  session = null;

  const totalRuns = appState.history.length;
  const recent = appState.history.slice(-5);
  const avg = recent.length
    ? Math.round(recent.reduce((s, r) => s + r.scoreRate, 0) / recent.length)
    : 0;

  screen.innerHTML = `
    <section class="card">
      <h2>合格を狙う訓練メニュー</h2>
      <p class="training-note">
        実際の試験問題の再現ではありません。上位2%系テストで必要になりやすい
        「規則発見・図形行列・数列・空間認識・処理速度」を鍛えるアプリです。
      </p>
      <div class="stats">
        <div class="stat"><strong>${totalRuns}</strong><span>演習回数</span></div>
        <div class="stat"><strong>${avg}%</strong><span>直近平均</span></div>
        <div class="stat"><strong>${QUESTION_BANK.length}</strong><span>収録問題</span></div>
      </div>
    </section>

    <section class="card menu-grid">
      <button onclick="startMode('normal')">通常演習</button>
      <button onclick="startMode('speed')">制限時間トレ</button>
      <button onclick="startMode('weak')">弱点集中</button>
      <button onclick="renderSettings()" class="secondary">設定</button>
      <button onclick="renderAnalysis()" class="secondary">成績分析</button>
      <button onclick="renderStudyGuide()" class="ghost">受験戦略</button>
    </section>

    <section class="card">
      <h3>今日の最低ノルマ</h3>
      <p class="training-note">
        まずは「10問だけ」でOKです。正解率よりも、間違えた問題の規則を説明できるかを重視してください。
      </p>
      <div class="badge-row">
        <span class="badge">10問演習</span>
        <span class="badge">ミス原因メモ</span>
        <span class="badge">制限時間あり</span>
      </div>
    </section>
  `;
}

function renderSettings() {
  const s = appState.settings;
  screen.innerHTML = `
    <section class="card">
      <h2>設定</h2>
      <div class="grid">
        <label>問題数
          <select id="questionCount">
            ${[5,10,15,20].map(n => `<option value="${n}" ${s.questionCount==n?'selected':''}>${n}問</option>`).join("")}
          </select>
        </label>
        <label>1問あたり制限時間
          <select id="timeLimit">
            ${[15,30,45,60,90].map(n => `<option value="${n}" ${s.timeLimit==n?'selected':''}>${n}秒</option>`).join("")}
          </select>
        </label>
        <label>難易度
          <select id="difficulty">
            <option value="mixed" ${s.difficulty==='mixed'?'selected':''}>混合</option>
            <option value="1" ${s.difficulty==='1'?'selected':''}>初級まで</option>
            <option value="2" ${s.difficulty==='2'?'selected':''}>中級まで</option>
            <option value="3" ${s.difficulty==='3'?'selected':''}>上級まで</option>
            <option value="4" ${s.difficulty==='4'?'selected':''}>超上級まで</option>
          </select>
        </label>
        <button onclick="saveSettings()">保存</button>
      </div>
    </section>
  `;
}

function saveSettings() {
  appState.settings.questionCount = Number(document.getElementById("questionCount").value);
  appState.settings.timeLimit = Number(document.getElementById("timeLimit").value);
  appState.settings.difficulty = document.getElementById("difficulty").value;
  saveState();
  renderHome();
}

function startMode(mode) {
  let questions;
  if (mode === "weak") {
    questions = pickWeakQuestions();
  } else {
    questions = pickQuestions(appState.settings.questionCount, appState.settings.difficulty);
  }

  session = {
    mode,
    questions,
    index: 0,
    answers: [],
    startTime: Date.now(),
    questionStartedAt: Date.now(),
    remaining: mode === "speed" ? Math.min(30, appState.settings.timeLimit) : appState.settings.timeLimit,
    locked: false
  };

  renderQuestion();
}

function pickWeakQuestions() {
  const stats = categoryStats(appState.history);
  const weak = Object.entries(stats)
    .filter(([_, v]) => v.total >= 2)
    .sort((a,b) => (a[1].correct/a[1].total) - (b[1].correct/b[1].total))[0];

  if (!weak) return pickQuestions(appState.settings.questionCount, appState.settings.difficulty);
  const weakCategory = weak[0];
  const weakPool = QUESTION_BANK.filter(q => q.category === weakCategory);
  const otherPool = QUESTION_BANK.filter(q => q.category !== weakCategory);
  return shuffle([...shuffle(weakPool).slice(0, 7), ...shuffle(otherPool).slice(0, 3)])
    .slice(0, appState.settings.questionCount);
}

function renderQuestion() {
  clearInterval(timerId);
  const q = session.questions[session.index];
  session.locked = false;
  session.questionStartedAt = Date.now();
  session.remaining = session.mode === "speed" ? Math.min(30, appState.settings.timeLimit) : appState.settings.timeLimit;

  screen.innerHTML = `
    <section class="card">
      <div class="badge-row">
        <span class="badge">${session.index + 1}/${session.questions.length}</span>
        <span class="badge">${q.category}</span>
        <span class="badge">難度 ${q.difficulty}</span>
      </div>
      <div class="timer-wrap"><div id="timerBar" class="timer-bar"></div></div>
      <p class="muted" id="timerText">残り ${session.remaining} 秒</p>
      <h2>${q.prompt}</h2>
      ${renderQuestionBody(q)}
      <div class="options">
        ${q.options.map((op, i) => `<button class="option" id="op${i}" onclick="answerQuestion(${i})">${escapeHtml(op)}</button>`).join("")}
      </div>
      <div id="feedback"></div>
    </section>
  `;

  startTimer();
}

function renderQuestionBody(q) {
  if (q.type === "matrix") {
    return `
      <div class="shape-area">
        <div class="matrix">
          ${q.matrix.map(v => `<div class="cell ${v==='?'?'missing':''}">${escapeHtml(v)}</div>`).join("")}
        </div>
      </div>
    `;
  }
  if (q.type === "sequence") {
    return `<div class="sequence">${escapeHtml(q.display)}</div>`;
  }
  return `<div class="problem">${escapeHtml(q.display)}</div>`;
}

function startTimer() {
  const max = session.remaining;
  const bar = document.getElementById("timerBar");
  const text = document.getElementById("timerText");
  timerId = setInterval(() => {
    const elapsed = Math.floor((Date.now() - session.questionStartedAt) / 1000);
    const remain = Math.max(0, max - elapsed);
    if (bar) bar.style.width = `${(remain / max) * 100}%`;
    if (text) text.textContent = `残り ${remain} 秒`;
    if (remain <= 0) {
      clearInterval(timerId);
      if (!session.locked) answerQuestion(-1);
    }
  }, 250);
}

function answerQuestion(choice) {
  if (session.locked) return;
  session.locked = true;
  clearInterval(timerId);

  const q = session.questions[session.index];
  const correct = choice === q.answer;
  const time = Math.round((Date.now() - session.questionStartedAt) / 1000);

  session.answers.push({
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    correct,
    choice,
    answer: q.answer,
    time
  });

  q.options.forEach((_, i) => {
    const el = document.getElementById(`op${i}`);
    if (!el) return;
    if (i === q.answer) el.classList.add("correct");
    if (i === choice && !correct) el.classList.add("wrong");
    el.disabled = true;
  });

  const feedback = document.getElementById("feedback");
  feedback.innerHTML = `
    <div class="feedback ${correct ? "good" : "bad"}">
      <strong>${correct ? "正解" : choice === -1 ? "時間切れ" : "不正解"}</strong><br>
      ${escapeHtml(q.explanation)}
    </div>
    <button style="margin-top:12px;width:100%;" onclick="nextQuestion()">次へ</button>
  `;
}

function nextQuestion() {
  session.index++;
  if (session.index >= session.questions.length) {
    finishSession();
  } else {
    renderQuestion();
  }
}

function finishSession() {
  const correct = session.answers.filter(a => a.correct).length;
  const total = session.answers.length;
  const scoreRate = Math.round((correct / total) * 100);
  const elapsed = Math.round((Date.now() - session.startTime) / 1000);

  const run = {
    date: new Date().toISOString(),
    mode: session.mode,
    correct,
    total,
    scoreRate,
    elapsed,
    answers: session.answers
  };

  appState.history.push(run);
  if (appState.history.length > 100) appState.history = appState.history.slice(-100);
  saveState();

  screen.innerHTML = `
    <section class="card">
      <h2>結果</h2>
      <div class="stats">
        <div class="stat"><strong>${correct}/${total}</strong><span>正解</span></div>
        <div class="stat"><strong>${scoreRate}%</strong><span>正答率</span></div>
        <div class="stat"><strong>${elapsed}s</strong><span>時間</span></div>
      </div>
      <p class="training-note">${getResultAdvice(scoreRate)}</p>
      <div class="grid">
        <button onclick="startMode('${session.mode}')">同じモードでもう一度</button>
        <button class="secondary" onclick="renderAnalysis()">成績分析を見る</button>
        <button class="ghost" onclick="renderHome()">ホームへ</button>
      </div>
    </section>
  `;
}

function getResultAdvice(rate) {
  if (rate >= 90) return "かなり良いです。次は制限時間を短くして、処理速度を上げてください。";
  if (rate >= 75) return "合格圏を狙える土台があります。間違えた問題の規則を言語化してください。";
  if (rate >= 60) return "まだ安定不足です。数列・図形行列の典型パターンを増やす段階です。";
  return "まずは初級〜中級で正答率80%以上を安定させてください。難問より基礎規則の反射速度が先です。";
}

function renderAnalysis() {
  const stats = categoryStats(appState.history);
  const rows = Object.entries(stats).map(([cat, v]) => {
    const rate = Math.round((v.correct / v.total) * 100);
    return `<div class="result-item"><span>${cat}</span><strong>${v.correct}/${v.total} (${rate}%)</strong></div>`;
  }).join("");

  screen.innerHTML = `
    <section class="card">
      <h2>成績分析</h2>
      ${rows ? `<div class="result-list">${rows}</div>` : `<p class="training-note">まだ演習データがありません。</p>`}
    </section>
    <section class="card">
      <h3>改善ルール</h3>
      <p class="training-note">
        正答率が低い分野を1つ選び、10問だけ集中してください。
        MENSA系の対策では「なんとなく解く」より「規則を短く説明できる」ことが重要です。
      </p>
      <button onclick="startMode('weak')">弱点集中を開始</button>
      <button class="danger" style="margin-top:10px;width:100%;" onclick="resetHistory()">履歴リセット</button>
    </section>
  `;
}

function resetHistory() {
  if (!confirm("成績履歴を削除しますか？")) return;
  appState.history = [];
  saveState();
  renderAnalysis();
}

function renderStudyGuide() {
  screen.innerHTML = `
    <section class="card">
      <h2>受験戦略</h2>
      <p class="training-note">
        目標は「全問正解」ではなく、短時間で解ける問題を確実に取り、難問に時間を吸われないことです。
      </p>
      <div class="result-list">
        <div class="result-item"><span>第1段階</span><strong>初級〜中級 80%</strong></div>
        <div class="result-item"><span>第2段階</span><strong>45秒/問</strong></div>
        <div class="result-item"><span>第3段階</span><strong>30秒/問</strong></div>
        <div class="result-item"><span>第4段階</span><strong>捨て問判断</strong></div>
      </div>
    </section>
    <section class="card">
      <h3>解く順番</h3>
      <p class="training-note">
        1. 5秒で規則の候補を出す<br>
        2. 20秒で検証する<br>
        3. 迷ったら選択肢から逆算する<br>
        4. 45秒超えて見えなければ飛ばす意識を持つ
      </p>
    </section>
    <section class="card">
      <h3>今後追加したい機能</h3>
      <p class="training-note">
        ・図形問題の自動生成<br>
        ・日別ノルマ通知<br>
        ・間違えた問題だけ復習<br>
        ・本番形式の模試モード<br>
        ・Androidアプリ化用Capacitor対応
      </p>
    </section>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

homeBtn.addEventListener("click", renderHome);
renderHome();
