// 大别山生态密码 — 主入口 v4 (修复版)
// 新增：加载页面(#4)、静音按钮(#1)、知识测验页(#12)、语音导读
import "./style.css";
import { registerPage, navigateTo, createProgressBar } from "./utils/navigation.js";
import { initAudio, toggleMute, isMuted } from "./utils/audio.js";
import * as home from "./pages/home.js";
import * as explore from "./pages/explore.js";
import * as puzzle from "./pages/puzzle.js";
import * as crisis from "./pages/crisis.js";
import * as certificate from "./pages/certificate.js";
import * as geography from "./pages/geography.js";
import * as quiz from "./pages/quiz.js";

// 注册所有页面
registerPage("home", home);
registerPage("explore", explore);
registerPage("puzzle", puzzle);
registerPage("crisis", crisis);
registerPage("certificate", certificate);
registerPage("geography", geography);
registerPage("quiz", quiz);

// 创建底部进度条
document.body.appendChild(createProgressBar());

// ===== 静音按钮 (#1) =====
function createMuteButton() {
  const btn = document.createElement("button");
  btn.className = "mute-btn" + (isMuted() ? " muted" : "");
  btn.innerHTML = isMuted() ? "🔇" : "🔊";
  btn.setAttribute("aria-label", isMuted() ? "取消静音" : "静音");
  btn.addEventListener("click", () => {
    const muted = toggleMute();
    btn.innerHTML = muted ? "🔇" : "🔊";
    btn.className = "mute-btn" + (muted ? " muted" : "");
    btn.setAttribute("aria-label", muted ? "取消静音" : "静音");
  });
  document.body.appendChild(btn);
}

// ===== 语音导读按钮 (十) =====
let voiceEnabled = false;
let currentUtterance = null;

function createVoiceButton() {
  const btn = document.createElement("button");
  btn.className = "voice-btn";
  btn.innerHTML = "🔊";
  btn.setAttribute("aria-label", "语音导读");
  btn.addEventListener("click", () => {
    voiceEnabled = !voiceEnabled;
    btn.classList.toggle("active", voiceEnabled);
    btn.innerHTML = voiceEnabled ? "🗣️" : "🔊";
    btn.setAttribute("aria-label", voiceEnabled ? "关闭语音导读" : "开启语音导读");
    if (voiceEnabled) {
      speakCurrentPage();
    } else {
      window.speechSynthesis.cancel();
    }
  });
  document.body.appendChild(btn);
}

function speakCurrentPage() {
  if (!voiceEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  // 收集当前页面文字内容
  const app = document.getElementById("app");
  if (!app) return;
  const textParts = [];
  app.querySelectorAll("h1, h2, h3, p, .crisis-desc, .certificate-desc, .quiz-question-text").forEach(el => {
    const t = el.textContent.trim();
    if (t && t.length > 2 && t.length < 200) textParts.push(t);
  });

  if (textParts.length === 0) return;

  const text = textParts.join("。");
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "zh-CN";
  currentUtterance.rate = 0.9;
  currentUtterance.pitch = 1;
  window.speechSynthesis.speak(currentUtterance);
}

// 导出供页面调用
export function onNavigateToPage() {
  if (voiceEnabled) {
    setTimeout(speakCurrentPage, 800);
  }
}

// ===== 加载页面 (#4) =====
function showLoadingScreen() {
  return new Promise((resolve) => {
    const loadingTips = [
      "💡 大别山横跨安徽、湖北、河南三省，总面积约24000平方公里",
      "💡 大别山有3000多种植物、400多种鸟类",
      "💡 霍山石斛被誉为'中华仙草'，野生资源极其稀少",
      "💡 中华穿山甲一年能吃掉7000万只白蚁",
      "💡 金雕的视力是人类的8倍"
    ];
    const tip = loadingTips[Math.floor(Math.random() * loadingTips.length)];

    const loadingEl = document.createElement("div");
    loadingEl.className = "loading-screen";
    loadingEl.id = "loading-screen";
    loadingEl.innerHTML = `
      <div class="loading-logo">🌲</div>
      <div class="loading-title">大别山生态密码</div>
      <div class="loading-sub">探索安徽大别山森林生态系统</div>
      <div class="loading-bar">
        <div class="loading-bar-fill" id="loading-bar-fill"></div>
      </div>
      <div class="loading-tip">${tip}</div>
    `;
    document.body.appendChild(loadingEl);

    // 模拟加载进度
    const barFill = document.getElementById("loading-bar-fill");
    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        barFill.style.width = "100%";
        clearInterval(loadInterval);
        setTimeout(() => {
          loadingEl.classList.add("fade-out");
          setTimeout(() => {
            loadingEl.remove();
            resolve();
          }, 600);
        }, 400);
      } else {
        barFill.style.width = progress + "%";
      }
    }, 200);
  });
}

// ===== 启动应用 =====
async function startApp() {
  // 显示加载页面
  await showLoadingScreen();

  // 创建静音按钮
  createMuteButton();

  // 创建语音导读按钮
  createVoiceButton();

  // 解析 URL hash 决定初始页面
  const hash = window.location.hash.replace("#", "");
  const validPages = ["home", "geography", "explore", "puzzle", "crisis", "certificate", "quiz"];
  const initialPage = validPages.includes(hash) ? hash : "home";

  // 启动应用
  navigateTo(initialPage, true);

  // 全局点击初始化音频
  document.addEventListener("click", () => initAudio(), { once: true });
  document.addEventListener("touchstart", () => initAudio(), { once: true });
}

startApp();
