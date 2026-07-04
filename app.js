
const screen = document.getElementById("screen");
const homeBtn = document.getElementById("homeBtn");

const DEFAULT_STATE = {
  settings: { questionCount: 10, timeLimit: 45, difficulty: "mixed" },
  history: [],
  review: []
};

let state = loadState();
let session = null;
let timerId = null;

function deepCopy(obj){ return JSON.parse(JSON.stringify(obj)); }
function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem("mensaShapeSpecialState"));
    return saved ? { ...deepCopy(DEFAULT_STATE), ...saved, settings: { ...DEFAULT_STATE.settings, ...(saved.settings || {}) } } : deepCopy(DEFAULT_STATE);
  } catch {
    return deepCopy(DEFAULT_STATE);
  }
}
function saveState(){ localStorage.setItem("mensaShapeSpecialState", JSON.stringify(state)); }
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

function pickQuestions(count, difficulty, category = null){
  let pool = QUESTION_BANK;
  if(category) pool = pool.filter(q => q.category === category);
  if(difficulty !== "mixed"){
    const d = Number(difficulty);
    pool = pool.filter(q => q.difficulty <= d);
  }
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}
function categoryStats(){
  const map = {};
  state.history.forEach(run => {
    run.answers.forEach(a => {
      if(!map[a.category]) map[a.category] = { total:0, correct:0, time:0 };
      map[a.category].total++;
      if(a.correct) map[a.category].correct++;
      map[a.category].time += a.time;
    });
  });
  return map;
}

function renderHome(){
  clearInterval(timerId);
  session = null;
  const runs = state.history.length;
  const recent = state.history.slice(-5);
  const avg = recent.length ? Math.round(recent.reduce((s, r) => s + r.scoreRate, 0) / recent.length) : 0;
  const total = QUESTION_BANK.length;
  screen.innerHTML = `
    <section class="card">
      <h2>図形苦手対策に特化</h2>
      <p class="note">
        この版は、図形が苦手な人のために
        <span class="kbd">回転</span>、
        <span class="kbd">反転</span>、
        <span class="kbd">図形行列</span>、
        <span class="kbd">塗り・個数・位置</span>
        だけを集中訓練できるように作っています。
      </p>
      <div class="stats">
        <div class="stat"><strong>${runs}</strong><span>演習回数</span></div>
        <div class="stat"><strong>${avg}%</strong><span>直近平均</span></div>
        <div class="stat"><strong>${total}</strong><span>収録問題</span></div>
      </div>
    </section>

    <section class="card menu-grid">
      <button onclick="startMode('basic')">基礎10問</button>
      <button onclick="startMode('mixed')">混合演習</button>
      <button onclick="startCategory('回転')">回転だけ</button>
      <button onclick="startCategory('反転')">反転だけ</button>
      <button onclick="startCategory('回転・反転')">回転・反転複合</button>
      <button onclick="startCategory('図形行列')">図形行列だけ</button>
      <button onclick="startCategory('規則発見')">規則発見だけ</button>
      <button onclick="startMode('weak')">弱点集中</button>
      <button onclick="renderReview()" class="secondary">復習リスト</button>
      <button onclick="renderAnalysis()" class="secondary">成績分析</button>
      <button onclick="renderSettings()" class="ghost">設定</button>
      <button onclick="renderLessons()" class="ghost">図形の見方講座</button>
    </section>

    <section class="card">
      <h3>おすすめの進め方</h3>
      <div class="lesson-list">
        <div class="lesson-item"><strong>1日目</strong> 回転だけ10問</div>
        <div class="lesson-item"><strong>2日目</strong> 反転だけ10問</div>
        <div class="lesson-item"><strong>3日目</strong> 図形行列だけ10問</div>
        <div class="lesson-item"><strong>4日目</strong> 復習リストだけ</div>
      </div>
    </section>
  `;
}

function renderSettings(){
  const s = state.settings;
  screen.innerHTML = `
    <section class="card">
      <h2>設定</h2>
      <div class="grid">
        <label>問題数
          <select id="questionCount">
            ${[5,10,15,20,30].map(n => `<option value="${n}" ${s.questionCount == n ? "selected" : ""}>${n}問</option>`).join("")}
          </select>
        </label>
        <label>1問あたり制限時間
          <select id="timeLimit">
            ${[15,30,45,60,90].map(n => `<option value="${n}" ${s.timeLimit == n ? "selected" : ""}>${n}秒</option>`).join("")}
          </select>
        </label>
        <label>難易度
          <select id="difficulty">
            <option value="mixed" ${s.difficulty === "mixed" ? "selected" : ""}>混合</option>
            <option value="1" ${s.difficulty === "1" ? "selected" : ""}>初級まで</option>
            <option value="2" ${s.difficulty === "2" ? "selected" : ""}>中級まで</option>
            <option value="3" ${s.difficulty === "3" ? "selected" : ""}>上級まで</option>
            <option value="4" ${s.difficulty === "4" ? "selected" : ""}>最上級まで</option>
          </select>
        </label>
        <button onclick="saveSettings()">保存</button>
      </div>
    </section>
  `;
}
function saveSettings(){
  state.settings.questionCount = Number(document.getElementById("questionCount").value);
  state.settings.timeLimit = Number(document.getElementById("timeLimit").value);
  state.settings.difficulty = document.getElementById("difficulty").value;
  saveState();
  renderHome();
}

function startMode(mode){
  let questions = [];
  const count = state.settings.questionCount;
  if(mode === "basic"){
    const cats = ["回転", "反転", "図形行列"];
    questions = shuffle(
      cats.flatMap(c => pickQuestions(Math.ceil(count / cats.length), "2", c))
    ).slice(0, count);
  } else if(mode === "weak"){
    questions = pickWeakQuestions();
  } else {
    questions = pickQuestions(count, state.settings.difficulty);
  }
  startSession(mode, questions, null);
}
function startCategory(category){
  const questions = pickQuestions(state.settings.questionCount, state.settings.difficulty, category);
  startSession("category", questions, category);
}
function pickWeakQuestions(){
  const stats = categoryStats();
  const entries = Object.entries(stats).filter(([_, v]) => v.total >= 2);
  if(!entries.length) return pickQuestions(state.settings.questionCount, state.settings.difficulty);
  entries.sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
  const weakCategory = entries[0][0];
  return pickQuestions(state.settings.questionCount, state.settings.difficulty, weakCategory);
}
function startSession(mode, questions, category){
  session = {
    mode, category,
    questions,
    index: 0,
    answers: [],
    startTime: Date.now(),
    questionStartedAt: Date.now(),
    locked: false
  };
  renderQuestion();
}

function renderQuestion(){
  clearInterval(timerId);
  const q = session.questions[session.index];
  session.locked = false;
  session.questionStartedAt = Date.now();
  const max = session.mode === "speed" ? Math.min(30, state.settings.timeLimit) : state.settings.timeLimit;
  session.remaining = max;

  screen.innerHTML = `
    <section class="card">
      <div class="badges">
        <span class="badge">${session.index + 1}/${session.questions.length}</span>
        <span class="badge">${q.category}</span>
        <span class="badge">難度 ${q.difficulty}</span>
      </div>

      <div class="timer-wrap"><div id="timerBar" class="timer-bar"></div></div>
      <p class="note" id="timerText">残り ${max} 秒</p>

      <h2>${escapeHtml(q.prompt)}</h2>
      ${renderQuestionBody(q)}

      <div class="options">
        ${q.options.map((opt, i) => `<button class="option" id="op${i}" onclick="answerQuestion(${i})">${escapeHtml(opt)}</button>`).join("")}
      </div>

      <div id="feedback"></div>
    </section>
  `;

  startTimer(max);
}
function renderQuestionBody(q){
  if(q.type === "matrix"){
    return `<div class="shape-area"><div class="matrix">
      ${q.matrix.map(v => `<div class="cell ${v === "?" ? "missing" : ""}">${escapeHtml(v)}</div>`).join("")}
    </div></div>`;
  }
  if(q.display && q.display.includes(","))
    return `<div class="sequence">${escapeHtml(q.display)}</div>`;
  return `<div class="prompt-box">${escapeHtml(q.display)}</div>`;
}
function startTimer(max){
  const bar = document.getElementById("timerBar");
  const text = document.getElementById("timerText");
  timerId = setInterval(() => {
    const elapsed = Math.floor((Date.now() - session.questionStartedAt) / 1000);
    const remain = Math.max(0, max - elapsed);
    if(bar) bar.style.width = `${(remain / max) * 100}%`;
    if(text) text.textContent = `残り ${remain} 秒`;
    if(remain <= 0){
      clearInterval(timerId);
      if(!session.locked) answerQuestion(-1);
    }
  }, 250);
}

function answerQuestion(choice){
  if(session.locked) return;
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
    if(!el) return;
    if(i === q.answer) el.classList.add("correct");
    if(i === choice && !correct) el.classList.add("wrong");
    el.disabled = true;
  });

  if(!correct && !state.review.includes(q.id)){
    state.review.push(q.id);
    saveState();
  }

  const fb = document.getElementById("feedback");
  fb.innerHTML = `
    <div class="feedback ${correct ? "good" : "bad"}">
      <strong>${correct ? "正解" : choice === -1 ? "時間切れ" : "不正解"}</strong><br>
      正解：<span class="kbd">${escapeHtml(q.options[q.answer])}</span>

      <div class="detail"><h4>答えの要点</h4><p>${escapeHtml(q.summary)}</p></div>
      <div class="detail"><h4>観察ポイント</h4><p>${escapeHtml(q.observe)}</p></div>
      <div class="detail"><h4>解き方</h4><p>${escapeHtml(q.solve)}</p></div>
      <div class="detail"><h4>本番メモ</h4><p>${escapeHtml(q.tip)}</p></div>
    </div>

    <div class="grid" style="margin-top:12px;">
      <button onclick="nextQuestion()">次へ</button>
      <button class="secondary" onclick="toggleReview('${q.id}')">${state.review.includes(q.id) ? "復習リストから外す" : "復習リストに追加"}</button>
    </div>
  `;
}

function toggleReview(id){
  if(state.review.includes(id)) state.review = state.review.filter(x => x !== id);
  else state.review.push(id);
  saveState();
  renderReview();
}

function nextQuestion(){
  session.index++;
  if(session.index >= session.questions.length) finishSession();
  else renderQuestion();
}
function finishSession(){
  const correct = session.answers.filter(a => a.correct).length;
  const total = session.answers.length;
  const scoreRate = Math.round((correct / total) * 100);
  const elapsed = Math.round((Date.now() - session.startTime) / 1000);

  const run = {
    date: new Date().toISOString(),
    mode: session.mode,
    category: session.category,
    correct,
    total,
    scoreRate,
    elapsed,
    answers: session.answers
  };
  state.history.push(run);
  if(state.history.length > 150) state.history = state.history.slice(-150);
  saveState();

  screen.innerHTML = `
    <section class="card">
      <h2>結果</h2>
      <div class="stats">
        <div class="stat"><strong>${correct}/${total}</strong><span>正解</span></div>
        <div class="stat"><strong>${scoreRate}%</strong><span>正答率</span></div>
        <div class="stat"><strong>${elapsed}s</strong><span>時間</span></div>
      </div>
      <p class="note">${resultAdvice(scoreRate)}</p>
      <div class="grid">
        <button onclick="renderHome()">ホームへ</button>
        <button class="secondary" onclick="renderReview()">復習リスト</button>
        <button class="secondary" onclick="renderAnalysis()">成績分析</button>
      </div>
    </section>
  `;
}
function resultAdvice(rate){
  if(rate >= 90) return "かなり良いです。次は制限時間を30秒にしても崩れないか確認してください。";
  if(rate >= 75) return "合格を狙える基礎があります。復習リストだけをもう1周すると安定しやすいです。";
  if(rate >= 60) return "まだ図形の見方が安定していません。回転・反転・図形行列を分野別で回してください。";
  return "今は難問より基礎です。まず『回転だけ』『反転だけ』で8割を安定させるのが優先です。";
}

function renderReview(){
  const items = QUESTION_BANK.filter(q => state.review.includes(q.id));
  screen.innerHTML = `
    <section class="card">
      <h2>復習リスト</h2>
      ${items.length ? `
        <p class="note">間違えた問題が自動でここに入ります。</p>
        <div class="grid">
          ${items.map(q => `<button class="secondary" onclick="startSingle('${q.id}')">${q.category} / 難度${q.difficulty} / ${escapeHtml(q.prompt)}</button>`).join("")}
        </div>
        <button class="danger" style="margin-top:12px;width:100%;" onclick="clearReview()">復習リストを空にする</button>
      ` : `<p class="note">復習リストは空です。</p>`}
    </section>
  `;
}
function startSingle(id){
  const q = QUESTION_BANK.find(x => x.id === id);
  startSession("single", [q], null);
}
function clearReview(){
  if(confirm("復習リストを空にしますか？")){
    state.review = [];
    saveState();
    renderReview();
  }
}

function renderAnalysis(){
  const stats = categoryStats();
  const rows = Object.entries(stats).map(([cat, v]) => {
    const rate = Math.round((v.correct / v.total) * 100);
    const avg = Math.round(v.time / v.total);
    return `<div class="result-item"><span>${cat}</span><strong>${v.correct}/${v.total} (${rate}%) / 平均${avg}秒</strong></div>`;
  }).join("");

  screen.innerHTML = `
    <section class="card">
      <h2>成績分析</h2>
      ${rows ? `<div class="result-list">${rows}</div>` : `<p class="note">まだ演習データがありません。</p>`}
    </section>

    <section class="card">
      <h3>見るべき指標</h3>
      <p class="note">
        目標は <span class="kbd">各分野80%以上</span> かつ <span class="kbd">平均45秒以内</span> です。
        特に図形が苦手なら、回転・反転で迷っているうちは図形行列も不安定になりやすいです。
      </p>
      <button onclick="startMode('weak')">弱点集中を開始</button>
      <button class="danger" style="margin-top:10px;width:100%;" onclick="resetHistory()">履歴リセット</button>
    </section>
  `;
}
function resetHistory(){
  if(confirm("成績履歴を削除しますか？")){
    state.history = [];
    saveState();
    renderAnalysis();
  }
}

function renderLessons(){
  screen.innerHTML = `
    <section class="card">
      <h2>図形の見方講座</h2>
      <div class="lesson-list">
        <div class="lesson-item"><strong>1. まず分類する</strong> 回転か、反転か、図形行列か、個数変化かを最初の5秒で分類します。</div>
        <div class="lesson-item"><strong>2. 図形を分解する</strong> 形 / 向き / 塗り / 個数 / 位置 に分けて見ます。</div>
        <div class="lesson-item"><strong>3. 図形行列は横から</strong> まず1行目、次に1列目を見るだけでかなり絞れます。</div>
        <div class="lesson-item"><strong>4. 回転と反転を混同しない</strong> 回転は向きが回る、反転は鏡写しになる、です。</div>
        <div class="lesson-item"><strong>5. 45秒超えたら固執しない</strong> 本番では捨て問判断も重要です。</div>
      </div>
    </section>

    <section class="card">
      <h3>おすすめ順</h3>
      <p class="note">
        反転が苦手 → 「反転だけ」<br>
        向きが苦手 → 「回転だけ」<br>
        全体が苦手 → 「基礎10問」<br>
        3×3が苦手 → 「図形行列だけ」
      </p>
    </section>
  `;
}

homeBtn.addEventListener("click", renderHome);
renderHome();
