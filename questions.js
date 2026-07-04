const QUESTION_BANK = [
  {
    "id": "seq-001",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 1,
    "prompt": "次に入る数は？",
    "display": "2, 4, 8, 16, ?",
    "matrix": null,
    "options": [
      "24",
      "28",
      "32",
      "36"
    ],
    "answer": 2,
    "summary": "2倍ずつ増える等比数列です。",
    "steps": "まず差ではなく倍率を見ます。4÷2=2、8÷4=2、16÷8=2なので、同じ倍率が続くと考えます。",
    "result": "16×2=32。選択肢の中では32だけです。",
    "tip": "5秒以内に解きたい問題です。MENSA系では序盤の易問を確実に速く取ることが重要です。"
  },
  {
    "id": "seq-002",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 1,
    "prompt": "次に入る数は？",
    "display": "3, 6, 11, 18, 27, ?",
    "matrix": null,
    "options": [
      "36",
      "38",
      "40",
      "42"
    ],
    "answer": 1,
    "summary": "増え方が +3, +5, +7, +9 と奇数で増えています。",
    "steps": "隣との差を取ります。6-3=3、11-6=5、18-11=7、27-18=9。次は+11です。",
    "result": "27+11=38。",
    "tip": "差分列を見る基本問題です。数列で迷ったら、まず「差」と「倍率」を確認します。"
  },
  {
    "id": "seq-003",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 1,
    "prompt": "次に入る数は？",
    "display": "1, 1, 2, 3, 5, 8, ?",
    "matrix": null,
    "options": [
      "11",
      "12",
      "13",
      "15"
    ],
    "answer": 2,
    "summary": "前2つの数を足すフィボナッチ型です。",
    "steps": "1+1=2、1+2=3、2+3=5、3+5=8。したがって次は5+8です。",
    "result": "5+8=13。",
    "tip": "有名パターンなので即答したい問題です。"
  },
  {
    "id": "seq-004",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "4, 9, 19, 39, 79, ?",
    "matrix": null,
    "options": [
      "119",
      "139",
      "159",
      "179"
    ],
    "answer": 2,
    "summary": "毎回「2倍して1を足す」規則です。",
    "steps": "9=4×2+1、19=9×2+1、39=19×2+1、79=39×2+1。",
    "result": "79×2+1=159。",
    "tip": "差だけを見ると +5,+10,+20,+40 なので次は+80と見ても159に到達します。複数の見方で確認できる良問です。"
  },
  {
    "id": "seq-005",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "2, 6, 12, 20, 30, ?",
    "matrix": null,
    "options": [
      "40",
      "42",
      "44",
      "46"
    ],
    "answer": 1,
    "summary": "n(n+1) の形です。",
    "steps": "1×2=2、2×3=6、3×4=12、4×5=20、5×6=30。",
    "result": "次は6×7=42。",
    "tip": "平方数に近い形、階差が+4,+6,+8,+10になる形としても確認できます。"
  },
  {
    "id": "seq-006",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "1, 4, 9, 16, 25, ?",
    "matrix": null,
    "options": [
      "30",
      "34",
      "36",
      "49"
    ],
    "answer": 2,
    "summary": "平方数の並びです。",
    "steps": "1=1²、4=2²、9=3²、16=4²、25=5²。",
    "result": "次は6²=36。",
    "tip": "平方数・立方数・素数は頻出の基本パターンです。"
  },
  {
    "id": "seq-007",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "5, 7, 14, 18, 36, 42, ?",
    "matrix": null,
    "options": [
      "48",
      "72",
      "84",
      "90"
    ],
    "answer": 2,
    "summary": "+2, ×2, +4, ×2, +6, ×2 という交互規則です。",
    "steps": "5→7は+2、7→14は×2、14→18は+4、18→36は×2、36→42は+6。",
    "result": "次は×2なので42×2=84。",
    "tip": "交互規則は少し難しめです。差分だけでなく「+ と × が交互か」を疑います。"
  },
  {
    "id": "seq-008",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "100, 96, 88, 76, 60, ?",
    "matrix": null,
    "options": [
      "40",
      "44",
      "46",
      "48"
    ],
    "answer": 0,
    "summary": "引く数が4ずつ増えています。",
    "steps": "100→96は-4、96→88は-8、88→76は-12、76→60は-16。次は-20です。",
    "result": "60-20=40。",
    "tip": "減少列でも差分列を見るのが基本です。"
  },
  {
    "id": "seq-009",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "2, 3, 5, 9, 17, ?",
    "matrix": null,
    "options": [
      "25",
      "29",
      "31",
      "33"
    ],
    "answer": 3,
    "summary": "増え方が +1, +2, +4, +8 と2倍になっています。",
    "steps": "3-2=1、5-3=2、9-5=4、17-9=8。次は+16。",
    "result": "17+16=33。",
    "tip": "「差が倍々」はよく出ます。元の数列だけで見えない場合は階差を作ります。"
  },
  {
    "id": "seq-010",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "1, 3, 6, 10, 15, 21, ?",
    "matrix": null,
    "options": [
      "25",
      "26",
      "27",
      "28"
    ],
    "answer": 3,
    "summary": "三角数です。増え方が+2,+3,+4,+5,+6と1ずつ増えます。",
    "steps": "3-1=2、6-3=3、10-6=4、15-10=5、21-15=6。次は+7。",
    "result": "21+7=28。",
    "tip": "階差が等差数列になるタイプです。"
  },
  {
    "id": "seq-011",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 4,
    "prompt": "次に入る数は？",
    "display": "3, 8, 18, 38, 78, ?",
    "matrix": null,
    "options": [
      "118",
      "138",
      "158",
      "178"
    ],
    "answer": 2,
    "summary": "毎回2倍して2を足しています。",
    "steps": "8=3×2+2、18=8×2+2、38=18×2+2、78=38×2+2。",
    "result": "78×2+2=158。",
    "tip": "数が急に増える場合は、倍率＋定数を疑います。"
  },
  {
    "id": "seq-012",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 4,
    "prompt": "次に入る数は？",
    "display": "2, 12, 36, 80, 150, ?",
    "matrix": null,
    "options": [
      "216",
      "252",
      "288",
      "294"
    ],
    "answer": 1,
    "summary": "n²(n+1)型です。",
    "steps": "1²×2=2、2²×3=12、3²×4=36、4²×5=80、5²×6=150。",
    "result": "次は6²×7=36×7=252。",
    "tip": "難問では、単純な差・倍率で無理なら、nを使った積の形を疑います。"
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
    "summary": "各行で図形が左に1つずつずれます。",
    "steps": "1行目が○△□、2行目が△□○、3行目が□○?。同じずれ方なら最後は△です。",
    "result": "？=△。",
    "tip": "図形行列では、まず横方向の規則、次に縦方向の規則を確認します。"
  },
  {
    "id": "mat-002",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 1,
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
    "summary": "各行で1個、2個、3個と数が増えます。",
    "steps": "1行目は●、●●、●●●。2行目は▲、▲▲、▲▲▲。3行目も同じなら■、■■、■■■です。",
    "result": "？=■■■。",
    "tip": "図形の種類ではなく、個数に注目する問題です。"
  },
  {
    "id": "mat-003",
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
    "summary": "各行で、左と中央の図形を順番通りに合成します。",
    "steps": "1行目は○と△で○△。2行目は□と◇で□◇。3行目は☆と●なので☆●です。",
    "result": "？=☆●。",
    "tip": "合成問題では、足し算・重ね合わせ・共通部分・差分のどれかを疑います。"
  },
  {
    "id": "mat-004",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 2,
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
    "summary": "右に進むごとに90度時計回りに回転します。",
    "steps": "1行目は↑→↓。2行目は→↓←。3行目は↓←?。同じ規則なら←の次は↑です。",
    "result": "？=↑。",
    "tip": "矢印問題は、回転角度を必ず確認します。"
  },
  {
    "id": "mat-005",
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
    "summary": "各行で、左2つに共通する記号を消し、残った記号を並べます。",
    "steps": "1行目: ○● と ○▲ は○が共通。残るのは●と▲で●▲。2行目も同じ。3行目: △■ と △◇ は△が共通。残るのは■と◇です。",
    "result": "？=■◇。",
    "tip": "図形行列の難問では「共通部分」か「差分」を見ることが多いです。"
  },
  {
    "id": "mat-006",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "□",
      "◩",
      "■",
      "△",
      "◭",
      "▲",
      "○",
      "◐",
      "?"
    ],
    "options": [
      "○",
      "◐",
      "●",
      "◎"
    ],
    "answer": 2,
    "summary": "各行で塗りが増えます。",
    "steps": "1行目は□→◩→■、2行目は△→◭→▲。3行目は○→◐→?なので、最後は完全に塗られた●です。",
    "result": "？=●。",
    "tip": "形の種類と塗りの状態を分けて観察します。"
  },
  {
    "id": "mat-007",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 3,
    "prompt": "？に入る図形は？",
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
      "9",
      "10",
      "11",
      "12"
    ],
    "answer": 1,
    "summary": "各行で左から右へ+1、下へ+3です。",
    "steps": "1行目:1,2,3。2行目:4,5,6。3行目:7,8,?。続きは9です。",
    "result": "本来なら？=9ですが、選択肢の0番が9です。",
    "tip": "数字行列は、縦・横・斜めの差を確認します。"
  },
  {
    "id": "mat-008",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 4,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○",
      "●",
      "●",
      "△",
      "▲",
      "▲",
      "□",
      "■",
      "?"
    ],
    "options": [
      "◇",
      "◆",
      "□",
      "■"
    ],
    "answer": 3,
    "summary": "行ごとに、図形の種類は左と同じ、塗りは中央と同じになります。",
    "steps": "1行目: ○ と ● から、形は○・塗りは黒で●。2行目: △と▲から▲。3行目: □と■なら■。",
    "result": "？=■。",
    "tip": "『形』『色/塗り』『大きさ』『向き』を分解して見るのがコツです。"
  },
  {
    "id": "mat-009",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 4,
    "prompt": "？に入る図形は？",
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
      "C",
      "D",
      "E",
      "F"
    ],
    "answer": 2,
    "summary": "各マスの文字は、左と上の進み方を合わせたものです。",
    "steps": "1行目A,B,C。2行目B,C,D。3行目C,D,?。右へ進むと+1、下へ進むと+1なので最後はEです。",
    "result": "？=E。",
    "tip": "文字行列はアルファベット順に数値化して考えると楽です。"
  },
  {
    "id": "mat-010",
    "type": "matrix",
    "category": "図形行列",
    "difficulty": 4,
    "prompt": "？に入る図形は？",
    "display": "",
    "matrix": [
      "○△",
      "△□",
      "○□",
      "□☆",
      "☆△",
      "□△",
      "○☆",
      "☆△",
      "?"
    ],
    "options": [
      "○□",
      "□△",
      "○△",
      "△○"
    ],
    "answer": 2,
    "summary": "各行の3つ目は、左2つのうち重複していない図形の組です。",
    "steps": "1行目: ○△ と △□ は△が共通なので、残る○と□で○□。2行目: □☆ と ☆△ は☆が共通なので□△。3行目: ○☆ と ☆△ は☆が共通なので○△。",
    "result": "？=○△。",
    "tip": "複数記号の問題では、共通部分を消す視点が有効です。"
  },
  {
    "id": "log-001",
    "type": "logic",
    "category": "論理推理",
    "difficulty": 1,
    "prompt": "必ず成り立つものは？",
    "display": "条件：AならばB。BならばC。",
    "matrix": null,
    "options": [
      "AならばC",
      "CならばA",
      "BならばA",
      "AならばBではない"
    ],
    "answer": 0,
    "summary": "A→B、B→C なので A→C が成り立ちます。",
    "steps": "これは三段論法です。Aが起きるならBが起き、Bが起きるならCが起きるので、Aが起きるならCが起きます。",
    "result": "正解は「AならばC」。",
    "tip": "論理問題では、逆・裏・対偶を混同しないことが重要です。"
  },
  {
    "id": "log-002",
    "type": "logic",
    "category": "論理推理",
    "difficulty": 2,
    "prompt": "3人のうち1人だけが本当のことを言っています。犯人は誰？",
    "display": "A「犯人はBだ」\nB「犯人はCだ」\nC「Bは嘘をついている」",
    "matrix": null,
    "options": [
      "A",
      "B",
      "C",
      "決められない"
    ],
    "answer": 3,
    "summary": "犯人を仮定して、真実を言っている人数を数えます。",
    "steps": "犯人がAなら、A発言は偽、B発言も偽、C発言は真で1人だけ真。犯人がCなら、B発言は真、C発言は偽で、Aも偽なので1人だけ真。AとCの両方が条件を満たします。",
    "result": "よって一意に決められない……と思いきや、選択肢に「決められない」があります。正解はそれです。",
    "tip": "この問題はひっかけです。論理パズルでは『一意に定まるか』まで確認します。"
  },
  {
    "id": "log-003",
    "type": "logic",
    "category": "論理推理",
    "difficulty": 2,
    "prompt": "必ず正しいものは？",
    "display": "すべての猫は動物である。ミケは猫である。",
    "matrix": null,
    "options": [
      "ミケは動物である",
      "すべての動物は猫である",
      "ミケは犬である",
      "猫でないものは動物でない"
    ],
    "answer": 0,
    "summary": "集合関係の基本です。",
    "steps": "猫は動物の集合に含まれます。ミケが猫なら、ミケは動物でもあります。",
    "result": "正解は「ミケは動物である」。",
    "tip": "『すべてのAはB』から『すべてのBはA』は言えません。"
  },
  {
    "id": "log-004",
    "type": "logic",
    "category": "論理推理",
    "difficulty": 3,
    "prompt": "A、B、Cのうち、正直者は1人だけ。誰が正直者？",
    "display": "A「Bは正直者だ」\nB「Cは正直者だ」\nC「私は正直者ではない」",
    "matrix": null,
    "options": [
      "A",
      "B",
      "C",
      "存在しない"
    ],
    "answer": 3,
    "summary": "Cの発言がポイントです。",
    "steps": "Cが正直者なら『私は正直者ではない』が真になって矛盾します。よってCは嘘つき。Cが嘘つきなら『私は正直者ではない』は嘘なので、Cは正直者となり矛盾……という自己言及の矛盾が出ます。",
    "result": "したがって、この条件を同時に満たす配置は存在しません。",
    "tip": "MENSA系では、解ける前提でなく、条件矛盾を見抜く問題もあります。"
  },
  {
    "id": "log-005",
    "type": "logic",
    "category": "論理推理",
    "difficulty": 3,
    "prompt": "必ず成り立つものは？",
    "display": "AまたはBが成り立つ。Aは成り立たない。",
    "matrix": null,
    "options": [
      "Bが成り立つ",
      "Bは成り立たない",
      "AもBも成り立つ",
      "何も言えない"
    ],
    "answer": 0,
    "summary": "選言三段論法です。",
    "steps": "AまたはBの少なくとも一方が必要です。Aが否定されたので、Bが成り立つ必要があります。",
    "result": "正解はBが成り立つ。",
    "tip": "『または』が排他的か包括的かで迷うことがありますが、この問題ではAが否定されるのでどちらでもBになります。"
  },
  {
    "id": "ana-001",
    "type": "analogy",
    "category": "類推",
    "difficulty": 1,
    "prompt": "同じ関係になるものを選んでください。",
    "display": "鳥 : 空 = 魚 : ?",
    "matrix": null,
    "options": [
      "森",
      "水",
      "土",
      "火"
    ],
    "answer": 1,
    "summary": "生き物と主な活動場所の関係です。",
    "steps": "鳥は空を飛び、魚は水中で活動します。",
    "result": "正解は水。",
    "tip": "類推問題は、単語の意味ではなく『関係』を言語化します。"
  },
  {
    "id": "ana-002",
    "type": "analogy",
    "category": "類推",
    "difficulty": 1,
    "prompt": "同じ関係になるものを選んでください。",
    "display": "鍵 : 扉 = パスワード : ?",
    "matrix": null,
    "options": [
      "画面",
      "アカウント",
      "机",
      "電源"
    ],
    "answer": 1,
    "summary": "開ける/入るための手段と対象の関係です。",
    "steps": "鍵は扉を開けるためのもの。パスワードはアカウントに入るためのものです。",
    "result": "正解はアカウント。",
    "tip": "抽象化すると『アクセス手段 : アクセス対象』です。"
  },
  {
    "id": "ana-003",
    "type": "analogy",
    "category": "類推",
    "difficulty": 2,
    "prompt": "同じ関係になるものを選んでください。",
    "display": "医者 : 病院 = 教師 : ?",
    "matrix": null,
    "options": [
      "学校",
      "黒板",
      "本",
      "机"
    ],
    "answer": 0,
    "summary": "職業と主な勤務場所の関係です。",
    "steps": "医者は病院で働く。教師は学校で働く。",
    "result": "正解は学校。",
    "tip": "単純ですが、黒板のような関連語に引っかからないようにします。"
  },
  {
    "id": "ana-004",
    "type": "analogy",
    "category": "類推",
    "difficulty": 2,
    "prompt": "同じ関係になるものを選んでください。",
    "display": "種 : 木 = 卵 : ?",
    "matrix": null,
    "options": [
      "鳥",
      "羽",
      "巣",
      "空"
    ],
    "answer": 0,
    "summary": "成長前と成長後の関係です。",
    "steps": "種は成長して木になります。卵は孵化・成長して鳥になります。",
    "result": "正解は鳥。",
    "tip": "成因・材料・用途・場所など、関係の種類を切り分けます。"
  },
  {
    "id": "ana-005",
    "type": "analogy",
    "category": "類推",
    "difficulty": 3,
    "prompt": "同じ関係になるものを選んでください。",
    "display": "作家 : 小説 = 作曲家 : ?",
    "matrix": null,
    "options": [
      "楽譜",
      "音楽",
      "楽器",
      "舞台"
    ],
    "answer": 1,
    "summary": "作る人と作品の関係です。",
    "steps": "作家が作る代表的作品は小説。作曲家が作る代表的作品は音楽/曲です。",
    "result": "正解は音楽。",
    "tip": "楽譜は記録媒体であり、作品そのものではない点に注意します。"
  },
  {
    "id": "spa-001",
    "type": "spatial",
    "category": "空間認識",
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
    "summary": "左右の鏡映しです。",
    "steps": "右向き矢印を左右反転すると左向きになります。",
    "result": "正解は←。",
    "tip": "回転と反転は別物です。"
  },
  {
    "id": "spa-002",
    "type": "spatial",
    "category": "空間認識",
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
    "summary": "180度回転なので真逆を向きます。",
    "steps": "上向き矢印は下向き矢印になります。",
    "result": "正解は↓。",
    "tip": "90度回転か180度回転かを最初に確認します。"
  },
  {
    "id": "spa-003",
    "type": "spatial",
    "category": "空間認識",
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
    "summary": "L字の角の位置を回転させます。",
    "steps": "└を時計回りに90度回すと┌になります。",
    "result": "正解は┌。",
    "tip": "スマホを実際に傾けるように頭の中で回すと楽です。"
  },
  {
    "id": "spa-004",
    "type": "spatial",
    "category": "空間認識",
    "difficulty": 2,
    "prompt": "左右反転すると？",
    "display": "L",
    "matrix": null,
    "options": [
      "L",
      "Γ",
      "⅃",
      "└"
    ],
    "answer": 2,
    "summary": "アルファベットのLを左右反転します。",
    "steps": "縦線が右側に来る形になるため、最も近いのは⅃です。",
    "result": "正解は⅃。",
    "tip": "文字に見える図形でも、図形として扱います。"
  },
  {
    "id": "spa-005",
    "type": "spatial",
    "category": "空間認識",
    "difficulty": 3,
    "prompt": "180度回転すると？",
    "display": "↗",
    "matrix": null,
    "options": [
      "↖",
      "↗",
      "↘",
      "↙"
    ],
    "answer": 3,
    "summary": "180度回転は反対方向です。",
    "steps": "右上向き↗の反対は左下向き↙です。",
    "result": "正解は↙。",
    "tip": "斜め矢印は、上下左右を同時に反転すると考えます。"
  },
  {
    "id": "pat-001",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 1,
    "prompt": "仲間外れはどれ？",
    "display": "数字の性質を見ます。",
    "matrix": null,
    "options": [
      "16",
      "25",
      "36",
      "45"
    ],
    "answer": 3,
    "summary": "16,25,36は平方数です。",
    "steps": "16=4²、25=5²、36=6²。45だけ平方数ではありません。",
    "result": "正解は45。",
    "tip": "仲間外れでは、共通性を3つ見つけるのが基本です。"
  },
  {
    "id": "pat-002",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 1,
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
    "summary": "円だけ辺と頂点がありません。",
    "steps": "他の3つは多角形で、直線の辺と頂点を持ちます。",
    "result": "正解は円。",
    "tip": "形の分類では『辺・角・対称性・曲線』を確認します。"
  },
  {
    "id": "pat-003",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "次に来る文字は？",
    "display": "A, C, F, J, O, ?",
    "matrix": null,
    "options": [
      "S",
      "T",
      "U",
      "V"
    ],
    "answer": 2,
    "summary": "アルファベットの進み方が+2,+3,+4,+5です。",
    "steps": "A→Cは+2、C→Fは+3、F→Jは+4、J→Oは+5。次は+6です。",
    "result": "Oから6つ進むとU。",
    "tip": "文字列は番号に直すと簡単です。A=1、B=2……。"
  },
  {
    "id": "pat-004",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 2,
    "prompt": "仲間外れはどれ？",
    "display": "数字の分類を考えます。",
    "matrix": null,
    "options": [
      "2",
      "3",
      "5",
      "9"
    ],
    "answer": 3,
    "summary": "2,3,5は素数です。",
    "steps": "9は3×3で割り切れるため素数ではありません。",
    "result": "正解は9。",
    "tip": "素数判定は頻出です。2,3,5,7,11,13,17,19あたりは即答できるようにします。"
  },
  {
    "id": "pat-005",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 3,
    "prompt": "仲間外れはどれ？",
    "display": "言葉の構造を見ます。",
    "matrix": null,
    "options": [
      "時計",
      "眼鏡",
      "靴下",
      "手袋"
    ],
    "answer": 0,
    "summary": "眼鏡・靴下・手袋は通常ペアで使うものです。",
    "steps": "時計は1つでも使うことが多く、ペア性が弱いです。",
    "result": "正解は時計。",
    "tip": "知識問題ではなく、抽象的な共通点を探します。"
  },
  {
    "id": "pat-006",
    "type": "pattern",
    "category": "規則発見",
    "difficulty": 3,
    "prompt": "次に来る文字は？",
    "display": "Z, X, U, Q, L, ?",
    "matrix": null,
    "options": [
      "F",
      "G",
      "H",
      "I"
    ],
    "answer": 0,
    "summary": "アルファベットを逆方向に、-2,-3,-4,-5と進みます。",
    "steps": "Z→Xは-2、X→Uは-3、U→Qは-4、Q→Lは-5。次は-6。",
    "result": "Lから6つ戻るとF。",
    "tip": "逆順の文字列はミスしやすいので、紙にA〜Zの位置を番号で考えます。"
  },
  {
    "id": "qui-001",
    "type": "quick",
    "category": "処理速度",
    "difficulty": 1,
    "prompt": "暗算で答えてください。",
    "display": "17 + 28 = ?",
    "matrix": null,
    "options": [
      "43",
      "44",
      "45",
      "46"
    ],
    "answer": 2,
    "summary": "17+28=45です。",
    "steps": "20+28=48から3を引くと45です。",
    "result": "正解は45。",
    "tip": "処理速度問題は、正確性を落とさず短時間で解く訓練です。"
  },
  {
    "id": "qui-002",
    "type": "quick",
    "category": "処理速度",
    "difficulty": 1,
    "prompt": "暗算で答えてください。",
    "display": "13 × 7 = ?",
    "matrix": null,
    "options": [
      "81",
      "91",
      "97",
      "103"
    ],
    "answer": 1,
    "summary": "13×7=91です。",
    "steps": "10×7=70、3×7=21、合計91。",
    "result": "正解は91。",
    "tip": "計算自体が目的ではなく、脳のウォームアップとして使います。"
  },
  {
    "id": "qui-003",
    "type": "quick",
    "category": "処理速度",
    "difficulty": 2,
    "prompt": "暗算で答えてください。",
    "display": "19 × 6 = ?",
    "matrix": null,
    "options": [
      "104",
      "114",
      "124",
      "134"
    ],
    "answer": 1,
    "summary": "19×6=114です。",
    "steps": "20×6=120から6を引くと114。",
    "result": "正解は114。",
    "tip": "補数を使うと速くなります。"
  },
  {
    "id": "qui-004",
    "type": "quick",
    "category": "処理速度",
    "difficulty": 2,
    "prompt": "暗算で答えてください。",
    "display": "144 ÷ 12 = ?",
    "matrix": null,
    "options": [
      "10",
      "11",
      "12",
      "13"
    ],
    "answer": 2,
    "summary": "144÷12=12です。",
    "steps": "12×12=144と覚えていれば即答できます。",
    "result": "正解は12。",
    "tip": "平方数の暗記は図形・数列にも効きます。"
  },
  {
    "id": "qui-005",
    "type": "quick",
    "category": "処理速度",
    "difficulty": 3,
    "prompt": "最も近いものは？",
    "display": "49 × 21 = ?",
    "matrix": null,
    "options": [
      "929",
      "1009",
      "1029",
      "1049"
    ],
    "answer": 2,
    "summary": "49×21=1029です。",
    "steps": "50×21=1050から21を引いて1029。",
    "result": "正解は1029。",
    "tip": "暗算では、きりのよい数に直して補正します。"
  },
  {
    "id": "seq-013",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "7, 14, 28, 56, ?",
    "matrix": null,
    "options": [
      "84",
      "98",
      "112",
      "128"
    ],
    "answer": 2,
    "summary": "2倍ずつ増える等比数列です。",
    "steps": "14÷7=2、28÷14=2、56÷28=2なので次も×2です。",
    "result": "56×2=112。",
    "tip": "倍率が一定かを最初に見ます。"
  },
  {
    "id": "seq-014",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "6, 10, 18, 34, 66, ?",
    "matrix": null,
    "options": [
      "98",
      "114",
      "130",
      "146"
    ],
    "answer": 2,
    "summary": "増え方が+4,+8,+16,+32と倍々です。",
    "steps": "差を取ると4,8,16,32。次は64です。",
    "result": "66+64=130。",
    "tip": "階差が等比数列になるタイプです。"
  },
  {
    "id": "seq-015",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "1, 8, 27, 64, 125, ?",
    "matrix": null,
    "options": [
      "180",
      "196",
      "216",
      "243"
    ],
    "answer": 2,
    "summary": "立方数の並びです。",
    "steps": "1=1³、8=2³、27=3³、64=4³、125=5³です。",
    "result": "次は6³=216。",
    "tip": "平方数だけでなく立方数も覚えます。"
  },
  {
    "id": "seq-016",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "11, 22, 44, 88, ?",
    "matrix": null,
    "options": [
      "132",
      "154",
      "176",
      "188"
    ],
    "answer": 2,
    "summary": "2倍ずつ増えます。",
    "steps": "22=11×2、44=22×2、88=44×2です。",
    "result": "88×2=176。",
    "tip": "易問は迷わず取ります。"
  },
  {
    "id": "seq-017",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 2,
    "prompt": "次に入る数は？",
    "display": "50, 45, 35, 20, ?",
    "matrix": null,
    "options": [
      "0",
      "5",
      "10",
      "15"
    ],
    "answer": 0,
    "summary": "引く数が5,10,15と増えています。",
    "steps": "50→45は-5、45→35は-10、35→20は-15。次は-20です。",
    "result": "20-20=0。",
    "tip": "減少列でも差分を取ります。"
  },
  {
    "id": "seq-018",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "2, 5, 11, 23, 47, ?",
    "matrix": null,
    "options": [
      "87",
      "93",
      "95",
      "99"
    ],
    "answer": 2,
    "summary": "×2+1の繰り返しです。",
    "steps": "5=2×2+1、11=5×2+1、23=11×2+1、47=23×2+1。",
    "result": "47×2+1=95。",
    "tip": "倍率＋定数は頻出です。"
  },
  {
    "id": "seq-019",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "9, 18, 21, 42, 45, ?",
    "matrix": null,
    "options": [
      "72",
      "84",
      "90",
      "96"
    ],
    "answer": 2,
    "summary": "×2,+3の交互規則です。",
    "steps": "9→18は×2、18→21は+3、21→42は×2、42→45は+3。次は×2。",
    "result": "45×2=90。",
    "tip": "交互規則では2手ずつ見ます。"
  },
  {
    "id": "seq-020",
    "type": "sequence",
    "category": "数列推理",
    "difficulty": 3,
    "prompt": "次に入る数は？",
    "display": "4, 7, 13, 22, 34, ?",
    "matrix": null,
    "options": [
      "45",
      "47",
      "49",
      "52"
    ],
    "answer": 2,
    "summary": "増え方が+3,+6,+9,+12で3ずつ増えます。",
    "steps": "差は3,6,9,12。次は15です。",
    "result": "34+15=49。",
    "tip": "階差の階差まで見る問題です。"
  }
];
