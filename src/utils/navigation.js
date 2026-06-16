// SPA 导航模块 v4 (修复版)
// 新增：错误边界(#19)、键盘导航(#20)、返回按钮(#6)

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

  // 错误边界 (#19)
  try {
    await page.init(app);
  } catch (err) {
    console.error(`Page "${pageId}" init failed:`, err);
    app.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center;">
        <div style="font-size:48px;margin-bottom:16px;">🌲</div>
        <h2 style="font-size:20px;font-weight:700;color:#064E3B;margin-bottom:8px;">页面加载出错了</h2>
        <p style="font-size:14px;color:#6B7280;margin-bottom:20px;line-height:1.6;">
          抱歉，"${pageId}" 页面遇到了问题。<br>请尝试返回首页重新开始。
        </p>
        <button onclick="window.location.hash='';window.location.reload();" style="
          padding:12px 32px;border:3px solid #059669;border-radius:16px;
          background:#ECFDF5;color:#059669;font-size:15px;font-weight:600;
          cursor:pointer;font-family:inherit;
        ">🏠 返回首页</button>
      </div>
    `;
    return;
  }

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

// ===== 键盘导航支持 (#20) =====
function handleKeyboardNavigation(e) {
  // Enter 或 Space 触发按钮点击
  if (e.key === "Enter" || e.key === " ") {
    const target = e.target;
    if (target.classList.contains("progress-step") ||
        target.classList.contains("hotspot") ||
        target.tagName === "BUTTON") {
      e.preventDefault();
      target.click();
    }
  }

  // Escape 关闭知识卡片
  if (e.key === "Escape") {
    const overlay = document.getElementById("knowledge-card-overlay");
    if (overlay && overlay.style.display === "block") {
      const closeBtn = overlay.querySelector(".knowledge-card-close");
      if (closeBtn) closeBtn.click();
    }
  }

  // 左右箭头在探索页切换
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const scene = document.getElementById("explore-scene");
    if (scene) {
      // 模拟拖拽
      const event = new MouseEvent("mousedown", {
        clientX: e.key === "ArrowLeft" ? 200 : 100,
        clientY: 200
      });
      scene.dispatchEvent(event);
      setTimeout(() => {
        window.dispatchEvent(new MouseEvent("mouseup"));
      }, 100);
    }
  }
}

document.addEventListener("keydown", handleKeyboardNavigation);

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
