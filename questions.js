const QUESTION_BANK = [
  {
    "id": "rot-001",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度時計回りに回転すると？",
    "display": "↑",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 1,
    "summary": "矢印は向きだけを見ればよい基本問題です。",
    "observe": "元の向きは上。時計回りに90度なので右に向きます。",
    "solve": "↑ → →。",
    "tip": "回転問題は『90度か180度か』『時計回りか反時計回りか』を最初に確認します。"
  },
  {
    "id": "rot-002",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度時計回りに回転すると？",
    "display": "←",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 0,
    "summary": "左向き矢印を時計回りに90度回すと上向きになります。",
    "observe": "左から時計回りに回すと上です。",
    "solve": "← → ↑。",
    "tip": "上下左右の矢印は、頭の中で十字を描くと迷いにくいです。"
  },
  {
    "id": "rot-003",
    "type": "spatial",
    "category": "回転",
    "difficulty": 2,
    "prompt": "180度回転すると？",
    "display": "→",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 3,
    "summary": "180度回転は真反対の向きになります。",
    "observe": "右向きの反対は左向きです。",
    "solve": "→ → ←。",
    "tip": "180度回転は『逆向き』と覚えると速いです。"
  },
  {
    "id": "rot-004",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度反時計回りに回転すると？",
    "display": "↗",
    "matrix": null,
    "options": [
      "↗",
      "↖",
      "↙",
      "↘"
    ],
    "answer": 1,
    "summary": "斜め矢印も90度ずつ回します。",
    "observe": "右上を反時計回りに90度回すと左上です。",
    "solve": "↗ → ↖。",
    "tip": "斜めは『上下』と『左右』を同時に動かして考えます。"
  },
  {
    "id": "rot-005",
    "type": "spatial",
    "category": "回転",
    "difficulty": 2,
    "prompt": "180度回転すると？",
    "display": "↙",
    "matrix": null,
    "options": [
      "↗",
      "↖",
      "↙",
      "↘"
    ],
    "answer": 0,
    "summary": "180度回転なので反対側の斜めになります。",
    "observe": "左下の反対は右上です。",
    "solve": "↙ → ↗。",
    "tip": "斜め矢印は、上下左右が全部反転すると考えると速いです。"
  },
  {
    "id": "spa-006",
    "type": "spatial",
    "category": "回転・反転",
    "difficulty": 2,
    "prompt": "90度時計回りに回転すると？",
    "display": "└",
    "matrix": null,
    "options": [
      "┌",
      "┐",
      "┘",
      "└"
    ],
    "answer": 0,
    "summary": "角の位置を回転させる問題です。",
    "observe": "└を時計回りに90度回すと┌になります。",
    "solve": "└ → ┌。",
    "tip": "角の図形は『どの角に開いているか』を見ると整理しやすいです。"
  },
  {
    "id": "spa-007",
    "type": "spatial",
    "category": "回転・反転",
    "difficulty": 2,
    "prompt": "180度回転すると？",
    "display": "┌",
    "matrix": null,
    "options": [
      "┌",
      "┐",
      "┘",
      "└"
    ],
    "answer": 2,
    "summary": "180度回転は上下左右が入れ替わります。",
    "observe": "┌の反対側は┘です。",
    "solve": "┌ → ┘。",
    "tip": "角図形は実際に指でなぞるイメージが有効です。"
  },
  {
    "id": "spa-008",
    "type": "spatial",
    "category": "回転・反転",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "Γ",
    "matrix": null,
    "options": [
      "Γ",
      "⅃",
      "L",
      "┘"
    ],
    "answer": 1,
    "summary": "鏡映しなので左右だけが反転します。",
    "observe": "Γの縦線が右に移る形を選びます。",
    "solve": "Γ → ⅃。",
    "tip": "反転は回転と違い、上下は変わらず左右だけ入れ替わります。"
  },
  {
    "id": "ref-001",
    "type": "spatial",
    "category": "反転",
    "difficulty": 1,
    "prompt": "左右反転すると？",
    "display": "→",
    "matrix": null,
    "options": [
      "→",
      "←",
      "↑",
      "↓"
    ],
    "answer": 1,
    "summary": "左右反転は鏡写しです。",
    "observe": "右向きは左向きになります。",
    "solve": "→ → ←。",
    "tip": "回転ではなく鏡映しである点を意識します。"
  },
  {
    "id": "ref-002",
    "type": "spatial",
    "category": "反転",
    "difficulty": 1,
    "prompt": "左右反転すると？",
    "display": "↑",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 0,
    "summary": "上向き矢印は左右反転しても上向きのままです。",
    "observe": "左右が入れ替わっても上下方向は変わりません。",
    "solve": "↑ → ↑。",
    "tip": "反転で変わらない図形を見抜けると速くなります。"
  },
  {
    "id": "ref-003",
    "type": "spatial",
    "category": "反転",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "↘",
    "matrix": null,
    "options": [
      "↙",
      "↖",
      "↗",
      "↘"
    ],
    "answer": 0,
    "summary": "右下向きは左右反転で左下向きです。",
    "observe": "下方向はそのまま、右だけ左に変わります。",
    "solve": "↘ → ↙。",
    "tip": "斜めの反転は『左右だけ反転』を徹底します。"
  },
  {
    "id": "ref-004",
    "type": "spatial",
    "category": "反転",
    "difficulty": 2,
    "prompt": "上下反転すると？",
    "display": "↗",
    "matrix": null,
    "options": [
      "↗",
      "↘",
      "↙",
      "↖"
    ],
    "answer": 1,
    "summary": "上下反転は上下だけが逆になります。",
    "observe": "右上向きは右下向きになります。",
    "solve": "↗ → ↘。",
    "tip": "反転の軸を見落とすと事故ります。『左右反転か上下反転か』を先に読みます。"
  },
  {
    "id": "mat-001",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 1,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○",
      "△",
      "□",
      "△",
      "□",
      "○",
      "□",
      "○",
      "?"
    ],
    "options": [
      "○",
      "△",
      "□",
      "◇"
    ],
    "answer": 1,
    "summary": "各行が左に1つずつずれています。",
    "observe": "1行目は○△□、2行目は△□○、3行目は□○?です。",
    "solve": "同じずれ方なら最後は△です。",
    "tip": "まず1行目だけを観察し、次に2行目との関係を見るのが基本です。"
  },
  {
    "id": "mat-002",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 1,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "↑",
      "→",
      "↓",
      "→",
      "↓",
      "←",
      "↓",
      "←",
      "?"
    ],
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 0,
    "summary": "右に進むごとに90度時計回りです。",
    "observe": "1行目は↑→↓、2行目は→↓←、3行目は↓←?。",
    "solve": "←の次は↑なので、正解は↑です。",
    "tip": "図形行列では『右方向の規則』を最初に見ます。"
  },
  {
    "id": "mat-003",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 2,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "●",
      "●●",
      "●●●",
      "▲",
      "▲▲",
      "▲▲▲",
      "■",
      "■■",
      "?"
    ],
    "options": [
      "■",
      "■■",
      "■■■",
      "■■■■"
    ],
    "answer": 2,
    "summary": "各行で個数が1個、2個、3個と増えています。",
    "observe": "3行目も■、■■、?と並ぶので最後は3個です。",
    "solve": "？=■■■。",
    "tip": "形より個数変化が主役の問題です。"
  },
  {
    "id": "mat-004",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 2,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○",
      "◐",
      "●",
      "△",
      "◭",
      "▲",
      "□",
      "◨",
      "?"
    ],
    "options": [
      "□",
      "◧",
      "■",
      "◩"
    ],
    "answer": 2,
    "summary": "各行で『白 → 半分塗り → 全部塗り』の変化です。",
    "observe": "3行目は□、◨、?なので最後は完全に塗られた■に相当する選択肢です。",
    "solve": "最も対応するのは■です。",
    "tip": "図形は『形』『塗り』を分けて見ると急に簡単になります。"
  },
  {
    "id": "mat-005",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 2,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○",
      "△",
      "○△",
      "□",
      "◇",
      "□◇",
      "☆",
      "●",
      "?"
    ],
    "options": [
      "☆●",
      "●☆",
      "☆☆",
      "●●"
    ],
    "answer": 0,
    "summary": "各行で左と中央の図形をそのまま合成しています。",
    "observe": "1行目は○と△で○△、2行目は□と◇で□◇。",
    "solve": "3行目は☆と●なので☆●です。",
    "tip": "合成系では『足し算』『差分』『共通部分』のどれかを疑います。"
  },
  {
    "id": "mat-006",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○●",
      "○▲",
      "●▲",
      "□◆",
      "□★",
      "◆★",
      "△■",
      "△◇",
      "?"
    ],
    "options": [
      "■◇",
      "△■",
      "△◇",
      "■△"
    ],
    "answer": 0,
    "summary": "各行で左2つの共通記号を消し、残りを並べています。",
    "observe": "△■ と △◇ では△が共通なので消えます。",
    "solve": "残りは■と◇なので■◇です。",
    "tip": "難しめの図形行列は『共通部分を消す』発想が効きます。"
  },
  {
    "id": "mat-007",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る文字は？",
    "display": "",
    "matrix": [
      "A",
      "B",
      "C",
      "B",
      "C",
      "D",
      "C",
      "D",
      "?"
    ],
    "options": [
      "D",
      "E",
      "F",
      "G"
    ],
    "answer": 1,
    "summary": "右へ1つ進むごとにアルファベットが1つ進みます。",
    "observe": "1行目A,B,C。2行目B,C,D。3行目C,D,?です。",
    "solve": "Dの次はEなので正解はEです。",
    "tip": "図形だけでなく文字行列も『位置変化』の問題として処理します。"
  },
  {
    "id": "mat-008",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "◇",
      "◆",
      "◇",
      "□",
      "■",
      "□",
      "△",
      "▲",
      "?"
    ],
    "options": [
      "△",
      "▲",
      "◇",
      "■"
    ],
    "answer": 1,
    "summary": "各行の左と右は同じ形、中央だけ塗りが変わっています。",
    "observe": "3行目は△、▲、? なので右は再び△です。",
    "solve": "正解は△。",
    "tip": "左右対称パターンは頻出です。"
  },
  {
    "id": "mat-009",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 4,
    "prompt": "？に入る数字は？",
    "display": "",
    "matrix": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "?"
    ],
    "options": [
      "8",
      "9",
      "10",
      "11"
    ],
    "answer": 1,
    "summary": "単純な連番です。",
    "observe": "左から右へ、上から下へ1ずつ増えています。",
    "solve": "8の次は9です。",
    "tip": "易問を素早く取る練習も必要です。"
  },
  {
    "id": "mat-010",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 4,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "↗",
      "→",
      "↘",
      "↑",
      "○",
      "↓",
      "↖",
      "←",
      "?"
    ],
    "options": [
      "↗",
      "↘",
      "↙",
      "↖"
    ],
    "answer": 2,
    "summary": "上下左右・斜めの向きが対称に配置されています。",
    "observe": "中央の○を基準に見ると、上段は右上・右・右下。下段は左上・左・? になるので最後は左下です。",
    "solve": "正解は↙です。",
    "tip": "対称配置は中心から見る癖をつけると崩れません。"
  },
  {
    "id": "pat-001",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 1,
    "prompt": "次に来る図形は？",
    "display": "○, ◐, ●, ?",
    "matrix": null,
    "options": [
      "○",
      "◐",
      "●",
      "◎"
    ],
    "answer": 0,
    "summary": "塗りが白→半分→黒→白…と循環しています。",
    "observe": "塗りの段階が3つで1周しています。",
    "solve": "●の次は○です。",
    "tip": "塗り問題は『白/半塗り/黒』の段階を意識します。"
  },
  {
    "id": "pat-002",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 1,
    "prompt": "次に来る図形は？",
    "display": "△, □, ○, △, □, ?",
    "matrix": null,
    "options": [
      "○",
      "△",
      "□",
      "◇"
    ],
    "answer": 0,
    "summary": "形が△→□→○の3種類で循環しています。",
    "observe": "3つで1セットと見ると分かります。",
    "solve": "□の次は○です。",
    "tip": "形だけが動くのか、塗りも動くのかを切り分けます。"
  },
  {
    "id": "pat-003",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "仲間外れはどれ？",
    "display": "図形の性質を見ます。",
    "matrix": null,
    "options": [
      "正三角形",
      "正方形",
      "正五角形",
      "円"
    ],
    "answer": 3,
    "summary": "円だけ辺と頂点を持ちません。",
    "observe": "他の3つは多角形です。",
    "solve": "よって円が仲間外れです。",
    "tip": "仲間外れは3つの共通性を言語化できるかが勝負です。"
  },
  {
    "id": "pat-004",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "次に来る図形は？",
    "display": "↑, ↑, →, →, ↓, ↓, ?",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 3,
    "summary": "同じ向きが2回ずつ出て、時計回りに進んでいます。",
    "observe": "↑↑の次に→→、その次に↓↓なので、その次は←←です。",
    "solve": "正解は←です。",
    "tip": "個数と向きが複合している問題です。"
  },
  {
    "id": "pat-005",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 3,
    "prompt": "次に来る図形は？",
    "display": "□, □□, □□□, □□□□, ?",
    "matrix": null,
    "options": [
      "□□",
      "□□□",
      "□□□□",
      "□□□□□"
    ],
    "answer": 3,
    "summary": "個数が1つずつ増えています。",
    "observe": "1個、2個、3個、4個の次は5個です。",
    "solve": "正解は□□□□□。",
    "tip": "個数系は最速で取りたい分野です。"
  },
  {
    "id": "rot-gen-01",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度時計回りに回転すると？",
    "display": "↑",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 1,
    "summary": "時計回りに90度進む基本回転です。",
    "observe": "↑ から時計回りに1つ進んだ向きを選びます。",
    "solve": "↑ → →。",
    "tip": "矢印回転は10問単位で反射的に解けるまで回すと安定します。"
  },
  {
    "id": "rot180-gen-01",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "180度回転すると？",
    "display": "↑",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 2,
    "summary": "180度回転は真反対です。",
    "observe": "↑ の真反対を選びます。",
    "solve": "↑ → ↓。",
    "tip": "180度回転は『逆向き』と即答できるようにします。"
  },
  {
    "id": "rot-gen-02",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度時計回りに回転すると？",
    "display": "→",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 2,
    "summary": "時計回りに90度進む基本回転です。",
    "observe": "→ から時計回りに1つ進んだ向きを選びます。",
    "solve": "→ → ↓。",
    "tip": "矢印回転は10問単位で反射的に解けるまで回すと安定します。"
  },
  {
    "id": "rot180-gen-02",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "180度回転すると？",
    "display": "→",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 3,
    "summary": "180度回転は真反対です。",
    "observe": "→ の真反対を選びます。",
    "solve": "→ → ←。",
    "tip": "180度回転は『逆向き』と即答できるようにします。"
  },
  {
    "id": "rot-gen-03",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度時計回りに回転すると？",
    "display": "↓",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 3,
    "summary": "時計回りに90度進む基本回転です。",
    "observe": "↓ から時計回りに1つ進んだ向きを選びます。",
    "solve": "↓ → ←。",
    "tip": "矢印回転は10問単位で反射的に解けるまで回すと安定します。"
  },
  {
    "id": "rot180-gen-03",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "180度回転すると？",
    "display": "↓",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 0,
    "summary": "180度回転は真反対です。",
    "observe": "↓ の真反対を選びます。",
    "solve": "↓ → ↑。",
    "tip": "180度回転は『逆向き』と即答できるようにします。"
  },
  {
    "id": "rot-gen-04",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "90度時計回りに回転すると？",
    "display": "←",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 0,
    "summary": "時計回りに90度進む基本回転です。",
    "observe": "← から時計回りに1つ進んだ向きを選びます。",
    "solve": "← → ↑。",
    "tip": "矢印回転は10問単位で反射的に解けるまで回すと安定します。"
  },
  {
    "id": "rot180-gen-04",
    "type": "spatial",
    "category": "回転",
    "difficulty": 1,
    "prompt": "180度回転すると？",
    "display": "←",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 1,
    "summary": "180度回転は真反対です。",
    "observe": "← の真反対を選びます。",
    "solve": "← → →。",
    "tip": "180度回転は『逆向き』と即答できるようにします。"
  },
  {
    "id": "ref-diag-01",
    "type": "spatial",
    "category": "反転",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "↗",
    "matrix": null,
    "options": [
      "↗",
      "↖",
      "↙",
      "↘"
    ],
    "answer": 1,
    "summary": "左右だけを入れ替える反転です。",
    "observe": "↗ の上下方向は保ち、左右だけ反転します。",
    "solve": "↗ → ↖。",
    "tip": "斜めは『上下はそのまま・左右だけ反転』と分解します。"
  },
  {
    "id": "ref-diag-02",
    "type": "spatial",
    "category": "反転",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "↘",
    "matrix": null,
    "options": [
      "↗",
      "↖",
      "↙",
      "↘"
    ],
    "answer": 2,
    "summary": "左右だけを入れ替える反転です。",
    "observe": "↘ の上下方向は保ち、左右だけ反転します。",
    "solve": "↘ → ↙。",
    "tip": "斜めは『上下はそのまま・左右だけ反転』と分解します。"
  },
  {
    "id": "ref-diag-03",
    "type": "spatial",
    "category": "反転",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "↙",
    "matrix": null,
    "options": [
      "↗",
      "↖",
      "↙",
      "↘"
    ],
    "answer": 3,
    "summary": "左右だけを入れ替える反転です。",
    "observe": "↙ の上下方向は保ち、左右だけ反転します。",
    "solve": "↙ → ↘。",
    "tip": "斜めは『上下はそのまま・左右だけ反転』と分解します。"
  },
  {
    "id": "ref-diag-04",
    "type": "spatial",
    "category": "反転",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "↖",
    "matrix": null,
    "options": [
      "↗",
      "↖",
      "↙",
      "↘"
    ],
    "answer": 0,
    "summary": "左右だけを入れ替える反転です。",
    "observe": "↖ の上下方向は保ち、左右だけ反転します。",
    "solve": "↖ → ↗。",
    "tip": "斜めは『上下はそのまま・左右だけ反転』と分解します。"
  },
  {
    "id": "mat-extra-01",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 2,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "▲",
      "■",
      "●",
      "■",
      "●",
      "▲",
      "●",
      "▲",
      "?"
    ],
    "options": [
      "▲",
      "■",
      "●",
      "◆"
    ],
    "answer": 1,
    "summary": "各行が左に1つずつずれている問題です。",
    "observe": "1行目→2行目→3行目と循環しています。",
    "solve": "最後は■です。",
    "tip": "図形行列は『横規則』『縦規則』『対称』の順に確認すると取りこぼしが減ります。"
  },
  {
    "id": "mat-extra-02",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 2,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "1",
      "3",
      "5",
      "2",
      "4",
      "6",
      "3",
      "5",
      "?"
    ],
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "answer": 0,
    "summary": "各行で+2ずつ増えています。",
    "observe": "3行目は3,5,? なので次は7です。",
    "solve": "正解は7です。",
    "tip": "図形行列は『横規則』『縦規則』『対称』の順に確認すると取りこぼしが減ります。"
  },
  {
    "id": "mat-extra-03",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○",
      "○○",
      "○○○",
      "○",
      "○○",
      "○○○",
      "○",
      "○○",
      "?"
    ],
    "options": [
      "○",
      "○○",
      "○○○",
      "○○○○"
    ],
    "answer": 2,
    "summary": "どの行も1個、2個、3個です。",
    "observe": "3行目も同じです。",
    "solve": "最後は○○○です。",
    "tip": "図形行列は『横規則』『縦規則』『対称』の順に確認すると取りこぼしが減ります。"
  },
  {
    "id": "mat-extra-04",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "↖",
      "↑",
      "↗",
      "←",
      "○",
      "→",
      "↙",
      "↓",
      "?"
    ],
    "options": [
      "↘",
      "↗",
      "↙",
      "↖"
    ],
    "answer": 0,
    "summary": "方位の完全配置です。",
    "observe": "中央を基準に八方向が埋まるので欠けているのは右下です。",
    "solve": "正解は↘です。",
    "tip": "図形行列は『横規則』『縦規則』『対称』の順に確認すると取りこぼしが減ります。"
  },
  {
    "id": "seqshape-001",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "次に来る図形は？",
    "display": "○, △, ○, △, ○, ?",
    "matrix": null,
    "options": [
      "○",
      "△",
      "□",
      "◇"
    ],
    "answer": 1,
    "summary": "○と△が交互に出ています。",
    "observe": "単純な交互パターンです。",
    "solve": "次は△です。",
    "tip": "交互パターンは易問なので取りこぼし厳禁です。"
  },
  {
    "id": "seqshape-002",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "次に来る図形は？",
    "display": "↑, →, ↓, ←, ↑, ?",
    "matrix": null,
    "options": [
      "↑",
      "→",
      "↓",
      "←"
    ],
    "answer": 1,
    "summary": "90度時計回りに回り続けています。",
    "observe": "上→右→下→左→上…と循環します。",
    "solve": "次は→です。",
    "tip": "連続回転は頭の中でコンパスを描くと安定します。"
  },
  {
    "id": "seqshape-003",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "次に来る図形は？",
    "display": "□, ■, □, ■, □, ?",
    "matrix": null,
    "options": [
      "□",
      "■",
      "△",
      "▲"
    ],
    "answer": 1,
    "summary": "白と黒が交互です。",
    "observe": "形は同じで塗りだけが交互に切り替わっています。",
    "solve": "次は■です。",
    "tip": "塗り変化は形変化と分けて考えます。"
  },
  {
    "id": "seqshape-004",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "次に来る図形は？",
    "display": "△, ◭, ▲, △, ◭, ?",
    "matrix": null,
    "options": [
      "△",
      "◭",
      "▲",
      "▼"
    ],
    "answer": 2,
    "summary": "白→半塗り→黒の3段階が循環しています。",
    "observe": "最初の3つが1セットです。",
    "solve": "次は▲です。",
    "tip": "3段階循環を見抜けると図形問題がかなり楽になります。"
  },
  {
    "id": "seqshape-005",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "仲間外れはどれ？",
    "display": "図形の共通性を見ます。",
    "matrix": null,
    "options": [
      "□",
      "◇",
      "△",
      "○"
    ],
    "answer": 3,
    "summary": "○だけ角がありません。",
    "observe": "他の3つは多角形で頂点があります。",
    "solve": "よって○が仲間外れです。",
    "tip": "仲間外れは『3つの共通点』を先に探します。"
  }
];
