// SPA 导航模块 — 管理页面切换、进度条、浏览器历史
// 章节进度持久化到 sessionStorage

const pages = new Map();
let currentPage = null;
let currentPageId = null;

// 从 sessionStorage 恢复章节解锁状态
let unlockedChapters = 1;
try {
  const saved = sessionStorage.getItem("dabie-unlocked");
  if (saved) unlockedChapters = Math.max(1, parseInt(saved));
} catch (e) {}

export function registerPage(pageId, { init, destroy }) {
  pages.set(pageId, { init, destroy });
}

export function getUnlockedChapters() {
  return unlockedChapters;
}

export function unlockChapter(chapterNum) {
  if (chapterNum > unlockedChapters) {
    unlockedChapters = chapterNum;
    try { sessionStorage.setItem("dabie-unlocked", unlockedChapters); } catch (e) {}
    updateProgressBar();
    // 解锁动画：新解锁的步骤弹跳 + 闪光
    animateUnlock(chapterNum);
  }
}

// 强制解锁到指定章节（跳过中间章节）
export function forceUnlock(chapterNum) {
  unlockedChapters = chapterNum;
  try { sessionStorage.setItem("dabie-unlocked", unlockedChapters); } catch (e) {}
  updateProgressBar();
}

function animateUnlock(chapterNum) {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  const step = bar.querySelector('.progress-step[data-chapter="'+chapterNum+'"]');
  if (!step) return;
  // 弹跳
  step.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s";
  step.style.transform = "scale(1.3)";
  step.style.boxShadow = "0 0 12px rgba(196,155,63,0.6)";
  setTimeout(function() {
    step.style.transform = "";
    step.style.boxShadow = "";
    step.style.transition = "";
  }, 600);
}

export function getCurrentPage() {
  return currentPageId;
}

export async function navigateTo(pageId, pushState = true) {
  const page = pages.get(pageId);
  if (!page) {
    console.warn(`Page "${pageId}" not registered`);
    return;
  }

  // 销毁当前页面
  if (currentPage && pages.get(currentPageId)) {
    const prev = pages.get(currentPageId);
    if (prev.destroy) prev.destroy();
  }

  // 渲染新页面
  const app = document.getElementById("app");
  app.innerHTML = "";

  currentPageId = pageId;
  currentPage = page;
  await page.init(app);

  if (pushState) {
    history.pushState({ pageId }, "", `#${pageId}`);
  }

  updateProgressBar();
}

function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  const chapterMap = {
    home: 0,
    geography: 1,
    explore: 2,
    puzzle: 3,
    crisis: 4,
    certificate: 5
  };

  const steps = bar.querySelectorAll(".progress-step");
  const current = chapterMap[currentPageId] || 0;

  steps.forEach((step, i) => {
    step.classList.remove("unlocked", "active", "next");
    if (i <= unlockedChapters) {
      step.classList.add("unlocked");
    } else if (i === unlockedChapters + 1) {
      step.classList.add("next"); // 下一关：虚线边框 + 脉冲动画
    }
    if (i === current) {
      step.classList.add("active");
    }
  });
}

// 浏览器前进后退
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.pageId) {
    navigateTo(e.state.pageId, false);
  }
});

export function createProgressBar() {
  const bar = document.createElement("div");
  bar.id = "progress-bar";
  bar.className = "progress-bar";
  bar.innerHTML = `
    <div class="progress-step unlocked active" data-chapter="0" role="tab" aria-label="首页" tabindex="0">🏠</div>
    <div class="progress-step" data-chapter="1" role="tab" aria-label="大别山生态知识" tabindex="-1">🏔️</div>
    <div class="progress-step" data-chapter="2" role="tab" aria-label="森林探索" tabindex="-1">🔍</div>
    <div class="progress-step" data-chapter="3" role="tab" aria-label="食物链拼图" tabindex="-1">🧩</div>
    <div class="progress-step" data-chapter="4" role="tab" aria-label="危机抉择" tabindex="-1">⚠️</div>
    <div class="progress-step" data-chapter="5" role="tab" aria-label="守护者证书" tabindex="-1">🏆</div>
  `;

  bar.addEventListener("click", (e) => {
    const step = e.target.closest(".progress-step");
    if (!step) return;
    const chapter = parseInt(step.dataset.chapter);
    const chapterIds = ["home", "geography", "explore", "puzzle", "crisis", "certificate"];
    // 允许点击已解锁的章节，或者点击下一关（自动解锁）
    if (chapter <= unlockedChapters + 1 && chapterIds[chapter]) {
      if (chapter > unlockedChapters) {
        // 点击下一关时自动解锁
        unlockedChapters = chapter;
        try { sessionStorage.setItem("dabie-unlocked", unlockedChapters); } catch (e) {}
        updateProgressBar();
      }
      navigateTo(chapterIds[chapter]);
    }
  });

  return bar;
}
