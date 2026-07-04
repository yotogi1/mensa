const screen = document.getElementById("screen");
const homeBtn = document.getElementById("homeBtn");

const DEFAULT_STATE = {
  history: [],
  settings: { mode: "normal", questionCount: 10, timeLimit: 45, difficulty: "mixed", showDetail: "always" },
  review: []
};

let appState = loadState();
let session = null;
let timerId = null;
let currentTab = "answer";

function structuredCloneSafe(obj){ return JSON.parse(JSON.stringify(obj)); }

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem("mensaTrainerProState"));
    return saved ? {...structuredCloneSafe(DEFAULT_STATE), ...saved, settings:{...DEFAULT_STATE.settings, ...(saved.settings||{})}} : structuredCloneSafe(DEFAULT_STATE);
  }catch{ return structuredCloneSafe(DEFAULT_STATE); }
}
function saveState(){ localStorage.setItem("mensaTrainerProState", JSON.stringify(appState)); }
function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }
function escapeHtml(str){ return String(str ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }

function pickQuestions(count, difficulty, category=null){
  let pool = QUESTION_BANK;
  if(category) pool = pool.filter(q=>q.category===category);
  if(difficulty !== "mixed"){
    const d = Number(difficulty);
    pool = pool.filter(q=>q.difficulty <= d);
  }
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

function categoryStats(history){
  const map = {};
  history.forEach(run => run.answers.forEach(a => {
    if(!map[a.category]) map[a.category]={total:0,correct:0,time:0};
    map[a.category].total++;
    if(a.correct) map[a.category].correct++;
    map[a.category].time += a.time || 0;
  }));
  return map;
}

function renderHome(){
  clearInterval(timerId); session=null;
  const totalRuns = appState.history.length;
  const recent = appState.history.slice(-5);
  const avg = recent.length ? Math.round(recent.reduce((s,r)=>s+r.scoreRate,0)/recent.length) : 0;
  const totalQuestions = QUESTION_BANK.length;
  screen.innerHTML = `
    <section class="card">
      <h2>合格用トレーニング</h2>
      <p class="note">
        問題数と解説を増やした版です。実際の入会テスト問題の再現ではなく、図形行列・数列・論理・空間認識・処理速度を鍛える練習アプリです。
      </p>
      <div class="stats">
        <div class="stat"><strong>${totalRuns}</strong><span>演習回数</span></div>
        <div class="stat"><strong>${avg}%</strong><span>直近平均</span></div>
        <div class="stat"><strong>${totalQuestions}</strong><span>収録問題</span></div>
      </div>
    </section>
    <section class="card menu-grid">
      <button onclick="startMode('normal')">通常演習</button>
      <button onclick="startMode('speed')">制限時間トレ</button>
      <button onclick="startMode('weak')">弱点集中</button>
      <button onclick="renderCategoryMenu()" class="secondary">分野別演習</button>
      <button onclick="renderReview()" class="secondary">復習リスト</button>
      <button onclick="renderAnalysis()" class="secondary">成績分析</button>
      <button onclick="renderSettings()" class="ghost">設定</button>
      <button onclick="renderStudyGuide()" class="ghost">受験戦略</button>
    </section>
    <section class="card">
      <h3>今日の進め方</h3>
      <p class="note">
        まず10問だけ解いてください。間違えたら「なぜその規則を見落としたか」まで確認します。
        正答率よりも、解説を読んだ後に自分の言葉で規則を説明できるかが重要です。
      </p>
      <div class="badge-row">
        <span class="badge">10問</span><span class="badge">1問45秒</span><span class="badge">ミスは復習</span><span class="badge">解説重視</span>
      </div>
    </section>`;
}

function renderCategoryMenu(){
  const cats = [...new Set(QUESTION_BANK.map(q=>q.category))];
  screen.innerHTML = `<section class="card"><h2>分野別演習</h2><div class="grid">
    ${cats.map(c=>`<button class="secondary" onclick="startCategory('${c}')">${c}（${QUESTION_BANK.filter(q=>q.category===c).length}問）</button>`).join("")}
  </div></section>`;
}
function startCategory(category){
  const count = appState.settings.questionCount;
  session = {mode:"category", category, questions:pickQuestions(count, appState.settings.difficulty, category), index:0, answers:[], startTime:Date.now(), questionStartedAt:Date.now(), remaining:appState.settings.timeLimit, locked:false};
  renderQuestion();
}

function renderSettings(){
  const s = appState.settings;
  screen.innerHTML = `<section class="card"><h2>設定</h2><div class="grid">
    <label>問題数
      <select id="questionCount">${[5,10,15,20,30,40].map(n=>`<option value="${n}" ${s.questionCount==n?"selected":""}>${n}問</option>`).join("")}</select>
    </label>
    <label>1問あたり制限時間
      <select id="timeLimit">${[15,30,45,60,90,120].map(n=>`<option value="${n}" ${s.timeLimit==n?"selected":""}>${n}秒</option>`).join("")}</select>
    </label>
    <label>難易度
      <select id="difficulty">
        <option value="mixed" ${s.difficulty==="mixed"?"selected":""}>混合</option>
        <option value="1" ${s.difficulty==="1"?"selected":""}>初級まで</option>
        <option value="2" ${s.difficulty==="2"?"selected":""}>中級まで</option>
        <option value="3" ${s.difficulty==="3"?"selected":""}>上級まで</option>
        <option value="4" ${s.difficulty==="4"?"selected":""}>超上級まで</option>
      </select>
    </label>
    <button onclick="saveSettings()">保存</button>
  </div></section>`;
}
function saveSettings(){
  appState.settings.questionCount = Number(document.getElementById("questionCount").value);
  appState.settings.timeLimit = Number(document.getElementById("timeLimit").value);
  appState.settings.difficulty = document.getElementById("difficulty").value;
  saveState(); renderHome();
}

function startMode(mode){
  let questions = mode==="weak" ? pickWeakQuestions() : pickQuestions(appState.settings.questionCount, appState.settings.difficulty);
  session = {mode, questions, index:0, answers:[], startTime:Date.now(), questionStartedAt:Date.now(), remaining:appState.settings.timeLimit, locked:false};
  renderQuestion();
}
function pickWeakQuestions(){
  const stats = categoryStats(appState.history);
  const weak = Object.entries(stats).filter(([_,v])=>v.total>=2).sort((a,b)=>(a[1].correct/a[1].total)-(b[1].correct/b[1].total))[0];
  if(!weak) return pickQuestions(appState.settings.questionCount, appState.settings.difficulty);
  const weakCat = weak[0];
  const weakPool = QUESTION_BANK.filter(q=>q.category===weakCat);
  const otherPool = QUESTION_BANK.filter(q=>q.category!==weakCat);
  return shuffle([...shuffle(weakPool).slice(0, Math.ceil(appState.settings.questionCount*.7)), ...shuffle(otherPool)]).slice(0, appState.settings.questionCount);
}

function renderQuestion(){
  clearInterval(timerId);
  const q = session.questions[session.index];
  session.locked=false; session.questionStartedAt=Date.now();
  session.remaining = session.mode==="speed" ? Math.min(30, appState.settings.timeLimit) : appState.settings.timeLimit;
  screen.innerHTML = `<section class="card">
    <div class="badge-row">
      <span class="badge">${session.index+1}/${session.questions.length}</span>
      <span class="badge">${q.category}</span>
      <span class="badge">難度 ${q.difficulty}</span>
    </div>
    <div class="timer-wrap"><div id="timerBar" class="timer-bar"></div></div>
    <p class="muted" id="timerText">残り ${session.remaining} 秒</p>
    <h2>${escapeHtml(q.prompt)}</h2>
    ${renderQuestionBody(q)}
    <div class="options">${q.options.map((op,i)=>`<button class="option" id="op${i}" onclick="answerQuestion(${i})">${escapeHtml(op)}</button>`).join("")}</div>
    <div id="feedback"></div>
  </section>`;
  startTimer();
}
function renderQuestionBody(q){
  if(q.type==="matrix"){
    return `<div class="shape-area"><div class="matrix">${q.matrix.map(v=>`<div class="cell ${v==="?"?"missing":""}">${escapeHtml(v)}</div>`).join("")}</div></div>`;
  }
  if(q.type==="sequence") return `<div class="sequence">${escapeHtml(q.display)}</div>`;
  return `<div class="problem">${escapeHtml(q.display)}</div>`;
}
function startTimer(){
  const max = session.remaining, bar = document.getElementById("timerBar"), text = document.getElementById("timerText");
  timerId = setInterval(()=>{
    const elapsed = Math.floor((Date.now()-session.questionStartedAt)/1000);
    const remain = Math.max(0, max-elapsed);
    if(bar) bar.style.width = `${(remain/max)*100}%`;
    if(text) text.textContent = `残り ${remain} 秒`;
    if(remain<=0){ clearInterval(timerId); if(!session.locked) answerQuestion(-1); }
  },250);
}
function answerQuestion(choice){
  if(session.locked) return;
  session.locked=true; clearInterval(timerId);
  const q = session.questions[session.index];
  const correct = choice===q.answer;
  const time = Math.round((Date.now()-session.questionStartedAt)/1000);
  session.answers.push({id:q.id, category:q.category, difficulty:q.difficulty, correct, choice, answer:q.answer, time});
  q.options.forEach((_,i)=>{
    const el=document.getElementById(`op${i}`); if(!el) return;
    if(i===q.answer) el.classList.add("correct");
    if(i===choice && !correct) el.classList.add("wrong");
    el.disabled=true;
  });
  if(!correct && !appState.review.includes(q.id)){ appState.review.push(q.id); saveState(); }
  const fb=document.getElementById("feedback");
  fb.innerHTML = `<div class="feedback ${correct?"good":"bad"}">
    <strong>${correct?"正解":choice===-1?"時間切れ":"不正解"}</strong><br>
    正解：<span class="kbd">${escapeHtml(q.options[q.answer])}</span>
    ${renderDetailedExplanation(q)}
  </div>
  <div class="grid" style="margin-top:12px;">
    <button onclick="nextQuestion()">次へ</button>
    <button class="secondary" onclick="toggleReview('${q.id}')">${appState.review.includes(q.id)?"復習リストから外す":"復習リストに追加"}</button>
  </div>`;
}
function renderDetailedExplanation(q){
  return `<div class="detail-box"><h4>答えの要点</h4><div class="explain">${escapeHtml(q.summary)}</div></div>
  <div class="detail-box"><h4>見つけ方</h4><div class="explain">${escapeHtml(q.steps)}</div></div>
  <div class="detail-box"><h4>計算・判断</h4><div class="explain">${escapeHtml(q.result)}</div></div>
  <div class="detail-box"><h4>本番での考え方</h4><div class="explain">${escapeHtml(q.tip)}</div></div>`;
}
function toggleReview(id){
  if(appState.review.includes(id)) appState.review = appState.review.filter(x=>x!==id);
  else appState.review.push(id);
  saveState();
  answerRefreshFeedback();
}
function answerRefreshFeedback(){ renderQuestion(); }

function nextQuestion(){
  session.index++;
  if(session.index>=session.questions.length) finishSession(); else renderQuestion();
}
function finishSession(){
  const correct=session.answers.filter(a=>a.correct).length,total=session.answers.length,rate=Math.round(correct/total*100),elapsed=Math.round((Date.now()-session.startTime)/1000);
  const run={date:new Date().toISOString(), mode:session.mode, category:session.category||null, correct,total,scoreRate:rate,elapsed,answers:session.answers};
  appState.history.push(run); if(appState.history.length>150) appState.history=appState.history.slice(-150); saveState();
  screen.innerHTML = `<section class="card"><h2>結果</h2>
    <div class="stats"><div class="stat"><strong>${correct}/${total}</strong><span>正解</span></div><div class="stat"><strong>${rate}%</strong><span>正答率</span></div><div class="stat"><strong>${elapsed}s</strong><span>時間</span></div></div>
    <p class="note">${getResultAdvice(rate)}</p>
    <div class="grid">
      <button onclick="startMode('${session.mode==='category'?'normal':session.mode}')">もう一度</button>
      <button class="secondary" onclick="renderReview()">復習リスト</button>
      <button class="secondary" onclick="renderAnalysis()">成績分析</button>
      <button class="ghost" onclick="renderHome()">ホーム</button>
    </div></section>`;
}
function getResultAdvice(rate){
  if(rate>=90) return "かなり良いです。次は制限時間を30秒にして、正答率80%以上を維持してください。";
  if(rate>=75) return "合格を狙う土台があります。間違えた問題を復習リストで潰してください。";
  if(rate>=60) return "まだ安定不足です。分野別演習で弱いカテゴリを集中して鍛えてください。";
  return "まずは難易度2までで80%以上を目標にしてください。難問より基本パターンの反射速度が先です。";
}
function renderReview(){
  const items = QUESTION_BANK.filter(q=>appState.review.includes(q.id));
  screen.innerHTML = `<section class="card"><h2>復習リスト</h2>
    ${items.length ? `<p class="note">間違えた問題・自分で追加した問題です。</p><div class="grid">${items.map(q=>`<button class="secondary" onclick="startSingle('${q.id}')">${q.category} / 難度${q.difficulty}：${escapeHtml(q.prompt)}</button>`).join("")}</div>` : `<p class="note">復習リストは空です。間違えると自動で追加されます。</p>`}
    ${items.length ? `<button class="danger" style="margin-top:12px;width:100%;" onclick="clearReview()">復習リストを空にする</button>` : ""}
  </section>`;
}
function startSingle(id){
  const q = QUESTION_BANK.find(x=>x.id===id);
  session = {mode:"single", questions:[q], index:0, answers:[], startTime:Date.now(), questionStartedAt:Date.now(), remaining:appState.settings.timeLimit, locked:false};
  renderQuestion();
}
function clearReview(){ if(confirm("復習リストを空にしますか？")){ appState.review=[]; saveState(); renderReview(); } }

function renderAnalysis(){
  const stats=categoryStats(appState.history);
  const rows=Object.entries(stats).map(([cat,v])=>{
    const rate=Math.round(v.correct/v.total*100), avg=Math.round(v.time/v.total);
    return `<div class="result-item"><span>${cat}</span><strong>${v.correct}/${v.total} ${rate}% / 平均${avg}秒</strong></div>`;
  }).join("");
  screen.innerHTML = `<section class="card"><h2>成績分析</h2>${rows?`<div class="result-list">${rows}</div>`:`<p class="note">まだ演習データがありません。</p>`}</section>
  <section class="card"><h3>判断基準</h3><p class="note">
    目標は「各分野80%以上」かつ「平均45秒以内」です。60%未満の分野は分野別演習で基礎パターンを固めてください。
  </p><button onclick="startMode('weak')">弱点集中を開始</button><button class="danger" style="margin-top:10px;width:100%;" onclick="resetHistory()">履歴リセット</button></section>`;
}
function resetHistory(){ if(confirm("成績履歴を削除しますか？")){ appState.history=[]; saveState(); renderAnalysis(); } }

function renderStudyGuide(){
  screen.innerHTML = `<section class="card"><h2>受験戦略</h2><p class="note">
    本番で重要なのは、ひらめきだけではなく「規則候補を素早く試す型」です。次の順番で見ます。
  </p>
  <div class="result-list">
    <div class="result-item"><span>数列</span><strong>差 → 倍率 → 交互 → n式</strong></div>
    <div class="result-item"><span>図形</span><strong>形・数・塗り・向き・位置</strong></div>
    <div class="result-item"><span>論理</span><strong>仮定して真偽を数える</strong></div>
    <div class="result-item"><span>空間</span><strong>回転と反転を分ける</strong></div>
  </div></section>
  <section class="card"><h3>45秒ルール</h3><p class="note">
    5秒で分類、20秒で規則検証、35秒で選択肢から逆算、45秒で見えなければ一旦捨てる。
    1問に固執して簡単な問題を落とすのが一番もったいないです。
  </p></section>
  <section class="card"><h3>1週間メニュー</h3><p class="note">
    1日目：数列20問<br>
    2日目：図形行列20問<br>
    3日目：論理・類推20問<br>
    4日目：空間認識20問<br>
    5日目：制限時間30秒で10問<br>
    6日目：復習リストのみ<br>
    7日目：混合模試20問
  </p></section>`;
}

homeBtn.addEventListener("click", renderHome);
renderHome();
