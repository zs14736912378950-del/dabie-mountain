// 第三章：危机抉择 — 情境分支选择（SVG场景插图版）
import gsap from "gsap";
import { navigateTo, unlockChapter } from "../utils/navigation.js";
import { scenarios } from "../data/scenarios.js";
import { getSceneSVG } from "../components/sceneIllustrations.js";
import { playClick, playSuccess, playError, playCelebration, playCrisisAmbience, stopAmbience } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";

let currentScenario = 0;
let ecoScore = 0;
let choicesMade = [];

export function init(container) {
  // 版本检测：场景总数变了就清进度
  const savedCount = sessionStorage.getItem("dabie-scenarioCount");
  if (savedCount !== null && parseInt(savedCount) !== scenarios.length) {
    try {
      sessionStorage.removeItem("dabie-crisisScenario");
      sessionStorage.removeItem("dabie-ecoScore");
      sessionStorage.removeItem("dabie-choices");
      sessionStorage.removeItem("dabie-scenarioCount");
    } catch(e) {}
  }
  try { sessionStorage.setItem("dabie-scenarioCount", scenarios.length); } catch(e) {}

  // 从 sessionStorage 恢复进度
  try {
    const savedScenario = sessionStorage.getItem("dabie-crisisScenario");
    const savedScore = sessionStorage.getItem("dabie-ecoScore");
    const savedChoices = sessionStorage.getItem("dabie-choices");
    if (savedScenario !== null) currentScenario = parseInt(savedScenario);
    if (savedScore !== null) ecoScore = parseInt(savedScore);
    if (savedChoices) choicesMade = JSON.parse(savedChoices);
  } catch (e) {
    currentScenario = 0; ecoScore = 0; choicesMade = [];
  }

  // 如果已经完成所有危机，直接跳到证书
  if (currentScenario >= scenarios.length) {
    playCelebration();
    unlockChapter(5);
    navigateTo("certificate");
    return;
  }

  container.innerHTML = `
    <div class="page">
      <div class="top-nav">
        <span class="top-nav-title">⚠️ 第三章 · 危机抉择</span>
      </div>
      <div id="crisis-main" class="crisis-page"></div>
    </div>
  `;

  renderScenario(container);

  // 播放危机氛围音
  playCrisisAmbience();

  // 小男孩引导
  showGuide("crisis", container, {
    dismiss: function() {}
  });
}

function saveProgress() {
  try {
    sessionStorage.setItem("dabie-crisisScenario", currentScenario);
    sessionStorage.setItem("dabie-ecoScore", ecoScore);
    sessionStorage.setItem("dabie-choices", JSON.stringify(choicesMade));
  } catch (e) {}
}

function renderScenario(container) {
  const main = container.querySelector("#crisis-main");
  const scenario = scenarios[currentScenario];
  if (!scenario) return;

  // 场景图片：优先本地照片，回退 SVG
  var sceneSvg = getSceneSVG(scenario.id);
  var sceneImgHtml = '<div class="crisis-scene-wrap">'
    + '<img src="' + (scenario.image || '') + '" alt="' + scenario.title + '" '
    + 'style="width:100%;display:block;border-radius:var(--radius-lg);" '
    + 'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">'
    + '<div style="display:none">' + sceneSvg + '</div>'
    + '</div>';

  main.innerHTML = `
    <div class="crisis-progress">
      <span class="crisis-progress-label">危机 ${currentScenario + 1}/${scenarios.length}</span>
      <div class="eco-score-bar"><div class="eco-score-fill" style="width:${Math.max(0, Math.min(100, 50 + ecoScore))}%"></div></div>
      <span class="eco-score-text">生态值: ${ecoScore}</span>
    </div>
    ${sceneImgHtml}
    <div class="crisis-content">
      <h2 class="crisis-title">${scenario.title}</h2>
      <p class="crisis-desc">${scenario.description}</p>
      <div class="crisis-choices" role="radiogroup" aria-label="选择应对方案">
        ${scenario.choices.map((ch, i) => `
          <button class="crisis-choice-btn" data-choice="${i}" role="radio" aria-checked="false" aria-label="选项${i+1}: ${ch.text}">${ch.text}</button>
        `).join("")}
      </div>
    </div>
  `;

  // 使用 pointerup 替代 click（H5 移动端更可靠，不会与 GSAP 冲突）
  main.querySelectorAll(".crisis-choice-btn").forEach(btn => {
    btn.addEventListener("pointerup", (e) => {
      e.preventDefault();
      const choiceIdx = parseInt(btn.dataset.choice);
      const choice = scenario.choices[choiceIdx];
      playClick();
      // 选中高亮动画
      btn.style.borderColor = "var(--color-accent)";
      btn.style.background = "rgba(196,155,63,0.08)";
      btn.style.transform = "scale(0.97)";
      // 其他按钮淡出
      main.querySelectorAll(".crisis-choice-btn").forEach((other, j) => {
        if (j !== choiceIdx) gsap.to(other, { opacity: 0.4, duration: 0.2 });
      });
      setTimeout(() => showResult(container, scenario, choice, choiceIdx), 300);
    });
  });

  // 入场动画（只动画具体元素，不动画父容器）
  var sceneEl = main.querySelector(".crisis-scene-svg");
  if (sceneEl) gsap.from(sceneEl, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
  gsap.from(main.querySelector(".crisis-title"), { opacity: 0, y: 15, duration: 0.4, delay: 0.15, ease: "power2.out" });
  gsap.from(main.querySelector(".crisis-desc"), { opacity: 0, y: 15, duration: 0.4, delay: 0.25, ease: "power2.out" });
  gsap.fromTo(main.querySelectorAll(".crisis-choice-btn"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, delay: 0.35, ease: "power2.out" });
}

function showResult(container, scenario, choice, choiceIdx) {
  const main = container.querySelector("#crisis-main");
  ecoScore += choice.score;
  choicesMade.push({
    scenario: scenario.title,
    choice: choice.text,
    result: choice.result.title,
    score: choice.score
  });

  saveProgress();

  const scoreClass = choice.score >= 0 ? "score-positive" : "score-negative";
  const scoreSign = choice.score >= 0 ? "+" : "";
  var resultSvg = getSceneSVG(choice.result.image);

  // 结果图片：优先本地照片，回退 SVG
  var resultImgHtml = '<div class="crisis-scene-wrap">'
    + '<img src="' + (choice.result.image || '') + '" alt="' + choice.result.title + '" '
    + 'style="width:100%;display:block;border-radius:var(--radius-lg);" '
    + 'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">'
    + '<div style="display:none">' + resultSvg + '</div>'
    + '</div>';

  main.innerHTML = `
    <div class="crisis-progress">
      <span class="crisis-progress-label">危机 ${currentScenario + 1}/${scenarios.length}</span>
      <div class="eco-score-bar"><div class="eco-score-fill" style="width:${Math.max(0, Math.min(100, 50 + ecoScore))}%"></div></div>
      <span class="eco-score-text">生态值: ${ecoScore}</span>
    </div>
    <div class="crisis-result">
      ${resultImgHtml}
      <h2 class="crisis-result-title">${choice.result.title}</h2>
      <p class="crisis-result-desc">${choice.result.description}</p>
      <div class="crisis-score-change ${scoreClass}">生态值 ${scoreSign}${choice.score}</div>
      <button class="btn btn-primary" id="crisis-next">
        ${currentScenario < scenarios.length - 1 ? "👉 下一个危机" : "🏆 查看我的证书"}
      </button>
    </div>
  `;

  if (choice.score > 0) playSuccess(); else playError();

  // 结果页面入场动画
  gsap.from(".crisis-result", { opacity: 0, y: 30, duration: 0.5, ease: "power2.out" });
  gsap.from(".crisis-result-title", { opacity: 0, y: 15, duration: 0.4, delay: 0.15, ease: "power2.out" });
  gsap.from(".crisis-score-change", { opacity: 0, scale: 0.8, duration: 0.4, delay: 0.3, ease: "back.out(1.4)" });

  // 按钮事件
  const nextBtn = main.querySelector("#crisis-next");
  if (nextBtn) {
    nextBtn.addEventListener("pointerup", (e) => {
      e.preventDefault();
      playClick();
      currentScenario++;
      saveProgress();

      if (currentScenario >= scenarios.length) {
        playCelebration();
        unlockChapter(5);
        try { sessionStorage.removeItem("dabie-crisisScenario"); } catch (e) {}
        navigateTo("certificate");
      } else {
        renderScenario(container);
      }
    });
  }
}

export function destroy() {
  stopAmbience();
  hideGuide();
  // 保留 ecoScore 和 choicesMade（已在 sessionStorage 中）
}