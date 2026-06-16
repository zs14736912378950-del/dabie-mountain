// 第三章半：知识小测验 — 互动问答 (#12)
import gsap from "gsap";
import { navigateTo, unlockChapter } from "../utils/navigation.js";
import { playClick, playSuccess, playError, playCelebration } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";

// 测验题目数据
const quizQuestions = [
  {
    question: "大别山的最高峰叫什么？海拔多少米？",
    options: ["白马尖，1777米", "天柱峰，1489米", "黄山莲花峰，1864米", "泰山玉皇顶，1545米"],
    correct: 0,
    explanation: "大别山最高峰是白马尖，位于安徽省霍山县，海拔1777米。它是大别山的标志性山峰。"
  },
  {
    question: "霍山石斛被誉为什么？",
    options: ["植物界的大熊猫", "中华仙草", "活化石", "林中凤凰"],
    correct: 1,
    explanation: "霍山石斛被誉为'中华仙草'，是大别山最珍贵的药用植物之一，野生资源极其稀少，顶级的每克价格比黄金还贵！"
  },
  {
    question: "在食物链中，以下哪个是分解者？",
    options: ["金雕", "松针", "蘑菇", "野兔"],
    correct: 2,
    explanation: "蘑菇是真菌，在大别山生态系统中扮演分解者的角色。它们把枯死的动植物分解成养分回归土壤，是生态循环的关键环节。"
  },
  {
    question: "穿山甲一年大约能吃掉多少只白蚁？",
    options: ["100万只", "1000万只", "7000万只", "1亿只"],
    correct: 2,
    explanation: "一只穿山甲一年能吃掉约7000万只白蚁！它们是森林的'害虫克星'，默默守护着森林的健康。"
  },
  {
    question: "发现盗猎陷阱时，最正确的做法是？",
    options: ["独自拆除", "假装没看见", "立即报警并记录证据", "拍照发朋友圈"],
    correct: 2,
    explanation: "发现盗猎陷阱时应立即报警（拨打110），联系森林公安，并悄悄拍下照片和位置作为证据。森林公安会保护举报人的安全。"
  },
  {
    question: "大别山是哪两条河流的分水岭？",
    options: ["黄河与长江", "长江与淮河", "珠江与长江", "淮河与黄河"],
    correct: 1,
    explanation: "大别山是长江与淮河的分水岭，也是中国南北气候的过渡地带。这种独特的地理位置造就了丰富的生物多样性。"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

export function init(container) {
  currentQuestion = 0;
  score = 0;

  container.innerHTML = `
    <div class="page">
      <div class="top-nav">
        <span class="top-nav-title">📝 知识小测验</span>
      </div>
      <div class="quiz-area" id="quiz-area"></div>
    </div>
  `;

  renderQuestion(container);

  // 小男孩引导
  showGuide("quiz", container, {
    hint: function() {
      playClick();
      const q = quizQuestions[currentQuestion];
      showTooltip(container, "💡 提示：仔细想想" + q.explanation.substring(0, 30) + "...");
    },
    dismiss: function() {}
  });
}

function renderQuestion(container) {
  const area = container.querySelector("#quiz-area");
  if (!area) return;
  answered = false;

  if (currentQuestion >= quizQuestions.length) {
    showResult(container);
    return;
  }

  const q = quizQuestions[currentQuestion];
  const total = quizQuestions.length;

  area.innerHTML = `
    <div class="quiz-progress">第 ${currentQuestion + 1} / ${total} 题</div>
    <div class="quiz-question">
      <div class="quiz-question-text">${q.question}</div>
      <div class="quiz-options" id="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" role="radio" aria-checked="false">
            ${String.fromCharCode(65 + i)}. ${opt}
          </button>
        `).join("")}
      </div>
    </div>
  `;

  // 绑定选项点击
  area.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("pointerup", (e) => {
      e.preventDefault();
      if (answered) return;
      answered = true;
      const idx = parseInt(btn.dataset.index);
      handleAnswer(container, idx);
    });
  });

  // 入场动画
  gsap.from(".quiz-question", { opacity: 0, y: 20, duration: 0.4, ease: "power2.out" });
  gsap.from(".quiz-option", { opacity: 0, y: 10, duration: 0.3, stagger: 0.08, delay: 0.2, ease: "power2.out" });
}

function handleAnswer(container, selectedIdx) {
  const q = quizQuestions[currentQuestion];
  const area = container.querySelector("#quiz-area");
  const options = area.querySelectorAll(".quiz-option");

  options.forEach((opt, i) => {
    opt.classList.add("disabled");
    if (i === q.correct) opt.classList.add("correct");
    if (i === selectedIdx && i !== q.correct) opt.classList.add("wrong");
  });

  const isCorrect = selectedIdx === q.correct;
  if (isCorrect) {
    score += 10;
    playSuccess();
  } else {
    playError();
  }

  // 显示解析
  const explanation = document.createElement("div");
  explanation.className = "quiz-explanation";
  explanation.innerHTML = `<strong>${isCorrect ? "✅ 正确！" : "❌ 错误！正确答案是 " + String.fromCharCode(65 + q.correct)}</strong><br>${q.explanation}`;
  area.querySelector(".quiz-question").appendChild(explanation);

  // 下一题按钮
  const nextBtn = document.createElement("div");
  nextBtn.className = "quiz-next-btn";
  nextBtn.innerHTML = currentQuestion < quizQuestions.length - 1
    ? '<button class="btn btn-primary btn-small" id="quiz-next">👉 下一题</button>'
    : '<button class="btn btn-primary btn-small" id="quiz-next">🏆 查看结果</button>';
  area.appendChild(nextBtn);

  area.querySelector("#quiz-next").addEventListener("click", () => {
    playClick();
    currentQuestion++;
    renderQuestion(container);
  });

  gsap.from(explanation, { opacity: 0, y: 10, duration: 0.3, ease: "power2.out" });
}

function showResult(container) {
  const area = container.querySelector("#quiz-area");
  if (!area) return;

  const total = quizQuestions.length * 10;
  const percent = Math.round((score / total) * 100);
  let emoji, title, desc;

  if (percent >= 80) {
    emoji = "🌟"; title = "生态知识达人！"; desc = "你对大别山生态了如指掌，继续保持！";
  } else if (percent >= 60) {
    emoji = "🌿"; title = "生态知识学徒"; desc = "还不错！多了解一些大别山的知识，你会变得更厉害！";
  } else {
    emoji = "🌱"; title = "生态知识新手"; desc = "没关系，每次学习都是一次成长。再来一次吧！";
  }

  playCelebration();

  area.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-emoji">${emoji}</div>
      <div class="quiz-result-score">${title}</div>
      <div class="quiz-result-text">
        得分：${score} / ${total}（正确率 ${percent}%）<br><br>
        ${desc}
      </div>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-primary btn-small" id="quiz-retry">🔄 再来一次</button>
        <button class="btn btn-outline btn-small" id="quiz-next-chapter">👉 下一章</button>
      </div>
    </div>
  `;

  area.querySelector("#quiz-retry").addEventListener("click", () => {
    playClick();
    currentQuestion = 0;
    score = 0;
    renderQuestion(container);
  });

  area.querySelector("#quiz-next-chapter").addEventListener("click", () => {
    playClick();
    navigateTo("crisis");
  });

  gsap.from(".quiz-result", { opacity: 0, y: 30, duration: 0.5, ease: "power2.out" });
}

function showTooltip(container, message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  gsap.fromTo(toast, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
  gsap.to(toast, { opacity: 0, y: -10, duration: 0.3, delay: 3, onComplete: () => toast.remove() });
}

export function destroy() {
  hideGuide();
}
