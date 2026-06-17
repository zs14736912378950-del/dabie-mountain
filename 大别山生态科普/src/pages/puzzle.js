// 第二章：食物链拼图 — 拖拽排序
// 修复版：减少卡片数量到12张(#8)
import gsap from "gsap";
import { navigateTo, unlockChapter } from "../utils/navigation.js";
import { foodChainCards, correctChain, slotLabels } from "../data/foodchain.js";
import { playClick, playSuccess, playError, playPuzzleBGM, stopAmbience } from "../utils/audio.js";
import { showGuide, hideGuide } from "../components/guideBoy.js";

// 过滤卡片：只保留核心卡片 + 干扰项 (#8)
// 每个槽位保留1个正确选项 + 3个干扰项 + 2个额外选项 = 12张
const filteredCards = foodChainCards.filter(card => {
  // 保留所有正确卡片（每个槽位的核心选项）
  if (!card.isDistractor) {
    // 每个营养级只保留第一个正确选项
    const allowedIds = ["sun", "pine", "rabbit", "snake", "eagle", "mushroom", "soil"];
    return allowedIds.includes(card.id);
  }
  // 保留所有干扰项
  return true;
});

let slotCards = {};
let shuffledCards = [];
let cardsPlacedCount = 0; // 跟踪已放入槽位的卡片数

export function init(container) {
  slotCards = {};
  shuffledCards = shuffleArray([...filteredCards]);
  cardsPlacedCount = 0;

  container.innerHTML = `
    <div class="page">
      <div class="top-nav">
        <span class="top-nav-title">🧩 第二章 · 食物链拼图</span>
      </div>
      <div class="puzzle-area">
        <p style="text-align:center;font-size:var(--font-sm);color:var(--color-text-muted);margin-bottom:var(--space-sm)">
          把正确的物种拖放到对应的营养级槽位中，拼出一条完整的大别山食物链吧！
        </p>
        <div class="puzzle-source" id="puzzle-source"></div>
        <div class="puzzle-slots" id="puzzle-slots"></div>
        <div class="puzzle-actions">
          <button class="btn btn-outline btn-small" id="puzzle-reset">🔄 重置</button>
          <button class="btn btn-primary" id="puzzle-verify">✅ 验证答案</button>
        </div>
        <p id="puzzle-hint" style="text-align:center;font-size:var(--font-sm);color:var(--color-text-muted);margin-top:var(--space-sm);"></p>
      </div>
    </div>
  `;

  renderSourceCards(container);
  renderSlots(container);

  // 拼图重置和验证按钮
  container.querySelector("#puzzle-reset").addEventListener("click", () => {
    playClick();
    slotCards = {};
    cardsPlacedCount = 0;
    shuffledCards = shuffleArray([...foodChainCards]);
    refreshPuzzle(container);
  });
  container.querySelector("#puzzle-verify").addEventListener("click", () => {
    playClick();
    verifyPuzzle(container);
  });

  // 提示
  updateHint(container);

  // 播放拼图 BGM
  playPuzzleBGM();

  // 小男孩引导
  showGuide("puzzle", container, {
    hint: function() {
      playClick();
      // 显示提示：先找生产者
      showToast(container, "💡 提示：先找生产者（松针/草本/浆果），再找初级消费者！");
    },
    dismiss: function() {}
  });
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderSourceCards(container) {
  const source = container.querySelector("#puzzle-source");
  source.innerHTML = "";

  shuffledCards.forEach(card => {
    if (Object.values(slotCards).includes(card.id)) return;

    const el = document.createElement("div");
    el.className = "puzzle-card";
    el.draggable = true;
    el.dataset.cardId = card.id;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "拖拽 " + card.name + " 到对应营养级");
    el.setAttribute("tabindex", "0");
    el.innerHTML = `
      <span class="card-emoji">${card.emoji}</span>
      <span class="card-name">${card.name}</span>
    `;

    // 桌面端拖拽
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.id);
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => el.classList.remove("dragging"));

    // 移动端触摸拖拽（带阈值区分tap和drag）
    el.addEventListener("touchstart", (e) => onTouchStart(e, card, el), { passive: false });
    el.addEventListener("touchmove", (e) => onTouchMove(e, el), { passive: false });
    el.addEventListener("touchend", (e) => onTouchEnd(e, container), { passive: false });

    source.appendChild(el);
  });
}

// 移动端拖拽状态
let touchClone = null;
let touchCardId = null;
let touchStartEl = null;
let touchStartX, touchStartY;
let dragStarted = false;
const DRAG_THRESHOLD = 8; // px，超过此距离才认为开始拖拽

function onTouchStart(e, card, el) {
  // 如果已经有一个拖拽进行中，忽略
  if (touchClone) return;
  touchCardId = card.id;
  touchStartEl = el;
  dragStarted = false;
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function onTouchMove(e, el) {
  if (!touchCardId) return;
  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // 阈值检测：移动超过阈值才开始拖拽
  if (!dragStarted && dist < DRAG_THRESHOLD) return;
  
  if (!dragStarted) {
    dragStarted = true;
    // 创建克隆
    touchClone = el.cloneNode(true);
    touchClone.style.position = "fixed";
    touchClone.style.zIndex = "2000";
    touchClone.style.opacity = "0.9";
    touchClone.style.pointerEvents = "none";
    touchClone.style.width = el.offsetWidth + "px";
    touchClone.style.height = el.offsetHeight + "px";
    touchClone.style.transform = "scale(1.1) rotate(3deg)";
    touchClone.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
    document.body.appendChild(touchClone);
    el.classList.add("dragging");
  }

  e.preventDefault();
  touchClone.style.left = (touch.clientX - 40) + "px";
  touchClone.style.top = (touch.clientY - 45) + "px";

  // 高亮下方槽位
  document.querySelectorAll(".puzzle-slot").forEach(s => s.classList.remove("drag-over"));
  const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
  const slot = elemBelow?.closest(".puzzle-slot");
  if (slot && !slot.classList.contains("filled")) {
    slot.classList.add("drag-over");
  }
}

function onTouchEnd(e, container) {
  if (!touchCardId) return;

  // 如果没开始拖拽（只是tap），不做任何事
  if (!dragStarted || !touchClone) {
    touchCardId = null;
    touchStartEl = null;
    return;
  }

  const touch = e.changedTouches[0];
  // 先隐藏克隆以便 elementFromPoint 能找到下方的slot
  touchClone.style.display = "none";
  const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
  touchClone.style.display = "";

  const slot = elemBelow?.closest(".puzzle-slot");
  if (slot && !slot.classList.contains("filled")) {
    const slotIndex = parseInt(slot.dataset.slot);
    slotCards[slotIndex] = touchCardId;
    cardsPlacedCount = Object.keys(slotCards).length;
    playClick();
    if (navigator.vibrate) navigator.vibrate(15);
    refreshPuzzle(container);
  }

  // 清理
  if (touchClone.parentNode) touchClone.parentNode.removeChild(touchClone);
  if (touchStartEl) touchStartEl.classList.remove("dragging");
  document.querySelectorAll(".puzzle-slot").forEach(s => s.classList.remove("drag-over"));
  touchClone = null;
  touchCardId = null;
  touchStartEl = null;
  dragStarted = false;
}

function renderSlots(container) {
  const slotsEl = container.querySelector("#puzzle-slots");
  const labels = slotLabels;
  slotsEl.innerHTML = "";

  labels.forEach((label, i) => {
    const slot = document.createElement("div");
    slot.className = "puzzle-slot";
    slot.dataset.slot = i;
    slot.innerHTML = `<span class="slot-label">${label}</span>`;

    if (slotCards[i]) {
      const card = foodChainCards.find(c => c.id === slotCards[i]);
      if (card) {
        slot.classList.add("filled");
        slot.innerHTML = `
          <span class="slot-label">${label}</span>
          <span class="card-emoji" style="font-size:28px">${card.emoji}</span>
          <span class="card-name" style="font-size:11px">${card.name}</span>
          <button class="slot-clear">✕</button>
        `;
        slot.querySelector(".slot-clear").addEventListener("click", (e) => {
          e.stopPropagation();
          delete slotCards[i];
          cardsPlacedCount = Object.keys(slotCards).length;
          playClick();
          refreshPuzzle(container);
        });
      }
    }

    // 桌面端 drop
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (!slot.classList.contains("filled")) slot.classList.add("drag-over");
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("drag-over");
      if (slot.classList.contains("filled")) return;
      const cardId = e.dataTransfer.getData("text/plain");
      slotCards[i] = cardId;
      cardsPlacedCount = Object.keys(slotCards).length;
      playClick();
      refreshPuzzle(container);
    });

    slotsEl.appendChild(slot);
  });
}

function refreshPuzzle(container) {
  renderSourceCards(container);
  renderSlots(container);
  updateHint(container);
}

function updateHint(container) {
  const hint = container.querySelector("#puzzle-hint");
  if (!hint) return;
  const placed = cardsPlacedCount;
  const total = slotLabels.length;
  if (placed === 0) hint.textContent = "💡 试试把卡片拖到下方槽位吧！";
  else if (placed < total) hint.textContent = `💡 已放置 ${placed}/${total} 张卡片，继续加油！`;
  else hint.textContent = "✅ 所有槽位已填满，点击验证答案按钮检查是否正确！";
}

function verifyPuzzle(container) {
  let allCorrect = true;
  let hasDistractor = false;
  let distractorName = "";
  const slotEls = container.querySelectorAll(".puzzle-slot");
  const totalSlots = slotLabels.length;

  slotEls.forEach((slot, i) => {
    slot.classList.remove("correct", "wrong");
    const cardId = slotCards[i];
    if (!cardId) { allCorrect = false; slot.classList.add("wrong"); return; }

    const card = foodChainCards.find(c => c.id === cardId);
    if (card.isDistractor) { allCorrect = false; hasDistractor = true; distractorName = card.name; slot.classList.add("wrong"); return; }
    if (!correctChain[i] || !correctChain[i].includes(cardId)) { allCorrect = false; slot.classList.add("wrong"); }
    else { slot.classList.add("correct"); }
  });

  if (hasDistractor) {
    showToast(container, "❌ " + distractorName + "不属于大别山食物链！把它放回卡片堆～");
    playError();
    gsap.to(slotEls, { x: [-5,5,-5,5,0], duration: 0.3, ease: "power2.inOut" });
    return;
  }

  if (allCorrect && cardsPlacedCount >= totalSlots) {
    playSuccess();
    unlockChapter(4);
    // 能量流动动画：槽位依次亮起 + 光点流动
    playEnergyFlowAnimation(container, slotEls);
  } else {
    playError();
    showToast(container, "❌ 有些位置不对哦，看看提示再试试！");
    gsap.to(slotEls, { x: [-5,5,-5,5,0], duration: 0.3, ease: "power2.inOut" });
  }
}

// 能量流动动画
function playEnergyFlowAnimation(container, slotEls) {
  const slotArr = Array.from(slotEls);
  const totalSlots = slotArr.length;
  let currentIdx = 0;

  // 依次亮起暖金色
  function lightUpNext() {
    if (currentIdx >= totalSlots) {
      // 所有槽位亮完，显示文字 + 跳转
      showToast(container, "✨ 这就是大别山的生命之网——牵一发而动全身");
      setTimeout(() => navigateTo("crisis"), 2000);
      return;
    }

    const slot = slotArr[currentIdx];
    gsap.to(slot, {
      boxShadow: "0 0 16px 4px #FBBF24",
      scale: 1.08,
      duration: 0.3,
      ease: "power2.out"
    });

    // 创建流动光点
    if (currentIdx < totalSlots - 1) {
      spawnFlowParticle(slot, slotArr[currentIdx + 1]);
    }

    currentIdx++;
    setTimeout(lightUpNext, 300);
  }

  setTimeout(lightUpNext, 500);
}

// 在两个槽位之间生成流动光点
function spawnFlowParticle(fromEl, toEl) {
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const particle = document.createElement("div");
  particle.style.cssText = "position:fixed;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#FBBF24,#F59E0B);box-shadow:0 0 8px #FBBF24;pointer-events:none;z-index:100;";
  particle.style.left = (fromRect.left + fromRect.width / 2) + "px";
  particle.style.top = (fromRect.top + fromRect.height / 2) + "px";
  document.body.appendChild(particle);

  gsap.to(particle, {
    left: toRect.left + toRect.width / 2,
    top: toRect.top + toRect.height / 2,
    duration: 0.25,
    ease: "power2.in",
    onComplete: () => particle.remove()
  });
}

function showToast(container, message) {
  const existing = container.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  gsap.fromTo(toast, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
  gsap.to(toast, { opacity: 0, y: -10, duration: 0.3, delay: 2.5, onComplete: () => toast.remove() });
}

export function destroy() {
  stopAmbience();
  hideGuide();
  // 清理触摸拖拽状态
  if (touchClone && touchClone.parentNode) {
    touchClone.parentNode.removeChild(touchClone);
  }
  touchClone = null;
  touchCardId = null;
  touchStartEl = null;
  touchStartX = 0;
  touchStartY = 0;
  dragStarted = false;
  // 清理拼图状态
  slotCards = {};
  shuffledCards = [];
  cardsPlacedCount = 0;
  // 注意：事件监听器会在 DOM 元素移除时自动清理
}
